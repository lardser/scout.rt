/*
 * Copyright (c) 2010-2020 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
import {FocusManagerSpecHelper, FormSpecHelper} from '../../src/testing/index';
import {FocusRule, focusUtils, scout} from '../../src/index';

/* global FocusManagerSpecHelper */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe('scout.FocusManager', () => {
  let session, formHelper, focusHelper, focusManager;

  beforeEach(() => {
    setFixtures(sandbox());
    jasmine.Ajax.install();
    session = sandboxSession();
    focusManager = session.focusManager;
    formHelper = new FormSpecHelper(session);
    focusHelper = new FocusManagerSpecHelper();
    jasmine.clock().install();
    uninstallUnloadHandlers(session);
  });

  afterEach(() => {
    session = null;
    jasmine.Ajax.uninstall();
    jasmine.clock().uninstall();
  });

  function createDivWithTwoInputs() {
    let $container = session.$entryPoint.makeDiv();
    $container.appendElement('<input type="text" value="input1" class="input1">');
    $container.appendElement('<input type="text" value="input2" class="input2">');
    return $container;
  }

  describe('isSelectableText', () => {

    it('must return true for disabled text-fields', () => {
      let $textField = $('<input>')
        .attr('type', 'text')
        .attr('disabled', 'disabled');
      expect(focusUtils.isSelectableText($textField)).toBe(true);
    });

  });

  describe('validateFocus', () => {

    it('When nothing else is focusable, focus must be on the Desktop (=sandbox)', () => {
      focusManager.validateFocus();
      let sandbox = $('#sandbox')[0];
      expect(document.activeElement).toBe(sandbox);
    });

    describe('with forms:', () => {

      let form;
      beforeEach(() => {
        form = formHelper.createFormWithFields(session.desktop, false, 4);
        form.render();
      });

      afterEach(() => {
        form.destroy();
        form = null;
      });

      /**
       * Because form is not a dialog, it does not install its own focus-context
       * but uses the focus-context of the Desktop (=sandbox) instead.
       */
      it('Focus-context must install listeners on its $container', () => {
        expect(focusHelper.handlersRegistered(session.$entryPoint)).toBe(true);
      });

      it('Focus must be on the 1st form-field when form is rendered', () => {
        let $firstField = form.rootGroupBox.fields[0].$field;
        expect($firstField).toBeFocused();
      });

      it('FocusContext must remember the last focused element', () => {
        let $secondField = form.rootGroupBox.fields[1].$field;
        $secondField.focus();
        expect($secondField).toBeFocused();

        expect(focusManager._findActiveContext().lastValidFocusedElement).toBe($secondField[0]);
      });

      it('A new FocusContext must be created when a form is opened as dialog', () => {
        let $secondField = form.rootGroupBox.fields[1].$field;
        $secondField.focus(); // must be remembered by focus-context

        let sandboxContext = focusManager._findActiveContext();
        expect(sandboxContext.$container).toBe(session.$entryPoint);

        let dialog = formHelper.createFormWithFields(session.desktop, true, 2);
        dialog.render();

        expect(focusManager._focusContexts.length).toBe(2);

        let dialogContext = focusManager._findActiveContext();
        expect(dialogContext.$container).toBe(dialog.$container);

        // focus-context must install handlers on form $container
        expect(focusHelper.handlersRegistered(dialog.$container)).toBe(true);

        // must remember last focused field of first focus-context
        expect(sandboxContext.lastValidFocusedElement).toBe($secondField[0]);
      });

      it('Must focus another valid field if the focused field is removed', () => {
        let $firstField = form.rootGroupBox.fields[0].$field,
          $secondField = form.rootGroupBox.fields[1].$field;

        expect($firstField).toBeFocused();
        $firstField.remove();
        expect($secondField).toBeFocused();
      });

      it('Must focus another valid field if the focused field is hidden', () => {
        let $firstField = form.rootGroupBox.fields[0].$field,
          $secondField = form.rootGroupBox.fields[1].$field;

        expect($firstField).toBeFocused();
        $firstField.setVisible(false);
        expect($secondField).toBeFocused();
      });

    });

  });

  describe('activateFocusContext', () => {

    it('activates the context of the given $container and restores its focus', () => {
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      let $container2 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container1);
      expect(document.activeElement).toBe($container1.children('.input1')[0]);

      focusManager.installFocusContext($container2);
      focusManager.requestFocus($container2.children('.input2'));
      expect(document.activeElement).toBe($container2.children('.input2')[0]);

      focusManager.activateFocusContext($container1);
      expect(document.activeElement).toBe($container1.children('.input1')[0]);

      focusManager.activateFocusContext($container2);
      expect(document.activeElement).toBe($container2.children('.input2')[0]);

      focusManager.uninstallFocusContext($container1);
      focusManager.uninstallFocusContext($container2);
    });

  });

  describe('requestFocus', () => {
    it('focuses the given element', () => {
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container1);

      focusManager.requestFocus($container1.children('.input1'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);

      focusManager.uninstallFocusContext($container1);
    });

    it('activates the context of the element if the element to focus is not in the active context', () => {
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      let $container2 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container1);
      focusManager.installFocusContext($container2);

      focusManager.requestFocus($container1.children('.input1'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container1[0]);

      focusManager.requestFocus($container2.children('.input2'));
      expect(document.activeElement).toBe($container2.children('.input2')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container2[0]);

      focusManager.uninstallFocusContext($container1);
      focusManager.uninstallFocusContext($container2);
    });

    it('does nothing if the element cannot be focused', () => {
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      let $container2 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container1);
      focusManager.installFocusContext($container2);

      focusManager.requestFocus($container1.children('.input1'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container1[0]);

      // Container2 is covered by a glass pane -> requesting focus on a covered element should do nothing
      let glassPane = scout.create('GlassPane', {
        parent: session.desktop
      });
      glassPane.render($container2);
      focusManager.requestFocus($container2.children('.input2'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container1[0]);

      focusManager.uninstallFocusContext($container1);
      focusManager.uninstallFocusContext($container2);
    });

    it('activates the correct context', () => {
      let $input0 = session.$entryPoint.appendElement('<input type="text" class="input0">');
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      let $container2 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext(session.$entryPoint);
      focusManager.installFocusContext($container1);
      focusManager.installFocusContext($container2);

      focusManager.requestFocus($input0);
      expect(document.activeElement).toBe($input0[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe(session.$entryPoint[0]);

      focusManager.requestFocus($container1.children('.input1'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container1[0]);

      focusManager.requestFocus($container2.children('.input2'));
      expect(document.activeElement).toBe($container2.children('.input2')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container2[0]);

      focusManager.uninstallFocusContext(session.$entryPoint);
      focusManager.uninstallFocusContext($container1);
      focusManager.uninstallFocusContext($container2);
    });
  });

  describe('registerGlassPaneTarget', () => {
    it('removes the focus if the active element will be covered by the glass pane', () => {
      let $container1 = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container1);

      focusManager.requestFocus($container1.children('.input1'));
      expect(document.activeElement).toBe($container1.children('.input1')[0]);
      expect(focusManager._findActiveContext().$container[0]).toBe($container1[0]);

      // GlassPane will cover the active element -> blur it and focus desktop
      let glassPane = scout.create('GlassPane', {
        parent: session.desktop
      });
      glassPane.render($container1);
      expect(document.activeElement).toBe(session.$entryPoint[0]);

      // Destroy glass pane -> restore focus
      glassPane.destroy();
      expect(document.activeElement).toBe($container1.children('.input1')[0]);

      focusManager.uninstallFocusContext($container1);
    });
  });

  describe('evaluateFocusRule', () => {
    it('should find first focusable element', () => {
      let $container = createDivWithTwoInputs().appendTo(session.$entryPoint);
      focusManager.installFocusContext($container);
      let input1 = $container.children('.input1')[0];
      let input2 = $container.children('.input2')[0];

      expect(focusManager.evaluateFocusRule($container, FocusRule.NONE)).toBe(null);
      expect(focusManager.evaluateFocusRule($container, FocusRule.AUTO)).toBe(input1);
      expect(focusManager.evaluateFocusRule($container, FocusRule.PREPARE)).toBe(input1);
      expect(focusManager.evaluateFocusRule($container, null)).toBe(input1);
      expect(focusManager.evaluateFocusRule($container, 'invalid-rule')).toBe('invalid-rule');
      expect(focusManager.evaluateFocusRule($container, input2)).toBe(input2);
    });
  });

  describe('focusNextTabbable', () => {

    it('selects text content on focus', () => {
      let $container = session.$entryPoint.appendDiv();
      let $input1 = $container.appendElement('<input type="text" value="lorem">');
      let $input2 = $container.appendElement('<input type="text" value="ipsum">');
      let $input3 = $container.appendElement('<textarea>dolor</textarea>');
      let $input4 = $container.appendElement('<div contenteditable="true" tabindex="0">magna</div>');

      focusManager.installFocusContext($container);
      focusManager.requestFocus($input1[0]);
      expect(document.activeElement).toBe($input1[0]);
      // Text not selected initially
      expect(document.activeElement.selectionStart).toBe(0);
      expect(document.activeElement.selectionEnd).toBe(0);

      focusManager.focusNextTabbable(document.activeElement);
      expect(document.activeElement).toBe($input2[0]);
      // Text selected (because of selectText=true in #focusNextTabbable)
      expect(document.activeElement.selectionStart).toBe(0);
      expect(document.activeElement.selectionEnd).toBe(5);

      focusManager.focusNextTabbable(document.activeElement);
      expect(document.activeElement).toBe($input3[0]);
      // No text selected (element is not a simple <input> field)
      expect(document.activeElement.selectionStart).toBe(0);
      expect(document.activeElement.selectionEnd).toBe(0);

      focusManager.focusNextTabbable(document.activeElement);
      expect(document.activeElement).toBe($input4[0]);
      // No text selected (not a HTMLInputField, therefore no 'selectionStart' property)
      expect(document.activeElement.selectionStart).toBe(undefined);
      expect(document.activeElement.selectionEnd).toBe(undefined);
      expect(document.getSelection().getRangeAt(0).startOffset).toBe(0);
      expect(document.getSelection().getRangeAt(0).endOffset).toBe(0);

      focusManager.focusNextTabbable(document.activeElement);
      expect(document.activeElement).toBe($input1[0]);
      // TExt selected (because of selectText=true in #focusNextTabbable)
      expect(document.activeElement.selectionStart).toBe(0);
      expect(document.activeElement.selectionEnd).toBe(5);
    });
  });
});
