/*******************************************************************************
 * Copyright (c) 2014-2015 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 ******************************************************************************/
scout.Tooltip = function() {
  scout.Tooltip.parent.call(this);

  this.text;
  this.arrowPosition;
  this.arrowPositionUnit;
  this.windowPaddingX;
  this.windowPaddingY;
  this.origin;
  this.$anchor;
  this.autoRemove;
  this.cssClass;
  this.tooltipPosition;
  this.scrollType;
  this.htmlEnabled;
  this.$content;
  this._addEventSupport();
};
scout.inherits(scout.Tooltip, scout.Widget);

/**
 * <ul>
 * <li>options.text - either a String or a function which returns a String.</li>
 * </ul>
 */
scout.Tooltip.prototype._init = function(options) {
  scout.Tooltip.parent.prototype._init.call(this, options);

  this.text = options.text || '';
  this.arrowPosition = options.arrowPosition !== undefined ? options.arrowPosition : 25;
  this.arrowPositionUnit = options.arrowPositionUnit || '%';
  this.windowPaddingX = options.windowPaddingX !== undefined ? options.windowPaddingX : 10;
  this.windowPaddingY = options.windowPaddingY !== undefined ? options.windowPaddingY : 5;
  this.origin = options.origin;
  this.$anchor = options.$anchor;
  this.autoRemove = options.autoRemove !== undefined ? options.autoRemove : true;
  this.cssClass = options.cssClass;
  this.tooltipPosition = options.position || 'top';
  this.scrollType = options.scrollType || 'remove';
  this.htmlEnabled = options.htmlEnabled !== undefined ? options.htmlEnabled : false;
};

scout.Tooltip.prototype._render = function($parent) {
  // Auto-detect parent
  $parent = $parent || (this.$anchor && this.$anchor.closest('.desktop'));
  // Remember parent (necessary for detach helper)
  this.$parent = $parent;

  this.$container = $parent
    .appendDiv('tooltip')
    .hide()
    .data('tooltip', this);

  if (this.cssClass) {
    this.$container.addClass(this.cssClass);
  }

  this.$arrow = this.$container.appendDiv('tooltip-arrow');
  this.$content = this.$container.appendDiv('tooltip-content');
  this._renderText();
  this.$container.show();

  if (this.autoRemove) {
    // Every user action will remove the tooltip
    this._mousedownHandler = this._onDocumentMousedown.bind(this);
    this._keydownHandler = this._onDocumentKeydown.bind(this);
    $(document).on('mousedown', this._mousedownHandler);
    $(document).on('keydown', this._keydownHandler);
  }

  if (this.$anchor) {
    if (this.scrollType === 'position') {
      this._scrollHandler = this.position.bind(this);
    } else if (this.scrollType === 'remove') {
      this._scrollHandler = this.remove.bind(this);
    }
    if (this._scrollHandler) {
      scout.scrollbars.onScroll(this.$anchor, this._scrollHandler);
    }
  }
};

scout.Tooltip.prototype._postRender = function() {
  this.position();
};

scout.Tooltip.prototype._remove = function() {
  $(document).off('mousedown', this._mousedownHandler);
  $(document).off('keydown', this._keydownHandler);
  if (this._scrollHandler) {
    scout.scrollbars.offScroll(this._scrollHandler);
    this._scrollHandler = null;
  }
  scout.Tooltip.parent.prototype._remove.call(this);
};

scout.Tooltip.prototype.setText = function(text) {
  this.text = text;
  if (this.rendered) {
    this._renderText();
    this.position();
  }
};

scout.Tooltip.prototype._renderText = function() {
  var text = this.text;
  if (this.htmlEnabled) {
    this.$content.html(text);
  } else {
    // use nl2br to allow tooltips with line breaks
    this.$content.html(scout.strings.nl2br(scout.strings.removeAmpersand(text)));
  }
};

scout.Tooltip.prototype.position = function() {
  var top, left, arrowSize, overlapX, overlapY, x, y, origin,
    tooltipWidth, tooltipHeight, arrowDivWidth, arrowPosition, inView;

  if (this.origin) {
    origin = this.origin;
    x = origin.x;
  } else {
    origin = this.$anchor && scout.graphics.offsetBounds(this.$anchor);
    x = origin.x + origin.width / 2;
  }
  y = origin.y;

  if (!this.autoRemove) {
    // Sticky tooltip must only be visible if the location where the tooltip points is in view
    inView = scout.scrollbars.isLocationInView(origin, this.$anchor.scrollParent());
    this.$container.setVisible(inView);
  }

  arrowDivWidth = this.$arrow.outerWidth();
  // Arrow is a div rotated by 45 deg -> visible height is half the div
  arrowSize = scout.Tooltip.computeHypotenuse(arrowDivWidth) / 2;

  tooltipHeight = this.$container.outerHeight();
  tooltipWidth = this.$container.outerWidth();

  // Compute actual arrow position if position is provided in percentage
  arrowPosition = this.arrowPosition;
  if (this.arrowPositionUnit === '%') {
    arrowPosition = tooltipWidth * this.arrowPosition / 100;
  }

  top = y - tooltipHeight - arrowSize;
  left = x - arrowPosition;
  overlapX = left + tooltipWidth + this.windowPaddingX - this.$anchor.getWindow().width();
  overlapY = top - this.windowPaddingY;

  // Move tooltip to the left until it gets fully visible
  if (overlapX > 0) {
    left -= overlapX;
    arrowPosition = x - left;
  }

  // Move tooltip to the bottom, arrow on top
  this.$arrow.removeClass('arrow-top arrow-bottom');
  if (this.tooltipPosition === 'bottom' || overlapY < 0) {
    this.$arrow.addClass('arrow-top');
    top = y + origin.height + arrowSize;
  } else {
    this.$arrow.addClass('arrow-bottom');
  }

  // Make sure arrow is never positioned outside of the tooltip
  arrowPosition = Math.min(arrowPosition, this.$container.outerWidth() - arrowSize);
  arrowPosition = Math.max(arrowPosition, arrowSize);
  this.$arrow.cssLeft(arrowPosition);
  this.$container
    .cssLeft(left)
    .cssTop(top);
};

scout.Tooltip.prototype._onDocumentMousedown = function(event) {
  if (!this.rendered) {
    return false;
  }
  if (this._isMousedownOutside(event)) {
    this._onMousedownOutside(event);
  }
};

scout.Tooltip.prototype._isMousedownOutside = function(event) {
  var $target = $(event.target),
    targetWidget = scout.Widget.getWidgetFor($target);

  // Only remove the tooltip if the click is outside of the container or the $anchor (= status icon)
  // Also ignore clicks if the tooltip is covert by a glasspane
  return !this.isOrHasWidget(targetWidget) &&
    (this.$anchor && !this.$anchor.isOrHas($target[0])) &&
    !this.session.focusManager.isElementCovertByGlassPane(this.$container[0]);
};

/**
 * Method invoked once a mouse down event occurs outside the tooltip.
 */
scout.Tooltip.prototype._onMousedownOutside = function() {
  this.remove();
};

scout.Tooltip.prototype._onDocumentKeydown = function(event) {
  this.remove();
};

/* --- STATIC HELPERS ------------------------------------------------------------- */

/**
 * @memberOf scout.Tooltip
 */
scout.Tooltip.computeHypotenuse = function(x) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(x, 2));
};
