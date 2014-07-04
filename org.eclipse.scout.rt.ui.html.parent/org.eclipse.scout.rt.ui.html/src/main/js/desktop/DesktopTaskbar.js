// SCOUT GUI
// (c) Copyright 2013-2014, BSI Business Systems Integration AG

scout.DesktopTaskbar = function(desktop) {
  this.desktop = desktop;
  this.$div;
  this.$formThumbs;
  this.formThumbsMap = {};
  this.toolButtons = desktop.session.getOrCreateModelAdapters(desktop.toolButtons, this); //FIXME CGU move to desktop which extends ModelAdapter?
};

scout.DesktopTaskbar.prototype.render = function($desktop) {
  this.$div = $desktop.appendDiv(undefined, 'desktop-taskbar');

  for (var i = 0; i < this.toolButtons.length; i++) {
    this.toolButtons[i].render(this.$div);
  }

  this.$formThumbs = this.$div.appendDiv(undefined, 'form-thumbnails');
};

scout.DesktopTaskbar.prototype.getToolButtonForForm = function(form) {
  for (var i = 0; i < this.toolButtons.length; i++) {
    if (this.toolButtons[i].form === form) {
      return this.toolButtons[i];
    }
  }
};

scout.DesktopTaskbar.prototype.formActivated = function(form) {
  var toolButton = this.getToolButtonForForm(form);
  if (toolButton) {
    toolButton._setSelected(true);
    return;
  }

  var $formThumb = this.formThumbsMap[form.id];

  $formThumb.selectOne();
  this.unselectToolButtons();
};

scout.DesktopTaskbar.prototype.formAdded = function(form) {
  var that = this;
  var toolButton = this.getToolButtonForForm(form);
  if (toolButton) {
    toolButton._setSelected(true);
    return;
  }

  var $formThumb = this.$formThumbs.appendDiv(undefined, 'form-thumbnail taskbar-item', form.title);
  this.formThumbsMap[form.id] = $formThumb;
  $formThumb.attr('data-icon', '\uf096');
  $formThumb.on('click', onFormThumbClick);
  $formThumb.selectOne();
  this.unselectToolButtons();

  function onFormThumbClick() {
    var $button = $(this),
      selected = !$button.isSelected();

    $button.select(selected);

    that.formOfClickedButton = form;
    that.buttonSelected(form, selected);
    that.formOfClickedButton = null;
  }
};

scout.DesktopTaskbar.prototype.formRemoved = function(form) {
  var toolButton = this.getToolButtonForForm(form);
  if (toolButton) {
      toolButton._setSelected(false);
    return;
  }

  var $formThumb = this.formThumbsMap[form.id];
  delete this.formThumbsMap[form.id];
  $formThumb.remove();
};

scout.DesktopTaskbar.prototype.formDisabled = function(form) {
  var toolButton, $formThumb;
  toolButton = this.getToolButtonForForm(form);
  if (toolButton) {
    $formThumb = toolButton.$container;
  } else {
    $formThumb = this.formThumbsMap[form.id];
  }

  $formThumb.addClass('disabled');
};

scout.DesktopTaskbar.prototype.formEnabled = function(form) {
  var toolButton, $formThumb;
  toolButton = this.getToolButtonForForm(form);
  if (toolButton) {
    $formThumb = toolButton.$container;
  } else {
    $formThumb = this.formThumbsMap[form.id];
  }

  $formThumb.removeClass('disabled');
};

scout.DesktopTaskbar.prototype.toolButtonSelected = function(toolButton, selected) {
  this.buttonSelected(toolButton.form, selected);

  if (selected) {
    this.unselectToolButtons(toolButton);
    this.$formThumbs.children().select(false);
  }
};

scout.DesktopTaskbar.prototype.buttonSelected = function(form, selected) {
  if (!form) {
    return;
  }

  if (selected) {
    if (form.minimized) {
      this.desktop.maximizeForm(form);
    }
    this.desktop.activateForm(form);
  } else {
    //minimize the form if the already selected button is clicked again
    if (form === this.formOfClickedButton && !form.minimized) {
      this.desktop.minimizeForm(form);
    }
  }
};

scout.DesktopTaskbar.prototype.unselectToolButtons = function(toolButton) {
  for (var i = 0; i < this.toolButtons.length; i++) {
    var otherToolButton = this.toolButtons[i];
    if (otherToolButton !== toolButton) {
      otherToolButton._setSelected(false);
    }
  }
};
