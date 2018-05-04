/*!
 * Eclipse Scout
 * https://eclipse.org/scout/
 *
 * Copyright (c) BSI Business Systems Integration AG. All rights reserved.
 * Released under the Eclipse Public License v1.0
 * http://www.eclipse.org/legal/epl-v10.html
 */
// protects $ and undefined from being redefined by another library
(function(scout, $, undefined) {
  __include("jquery/jquery-scout.js");
  __include("jquery/jquery-scout-selectors.js");
  __include("scout/main.js");
  __include("scout/App.js");
  __include("scout/ErrorHandler.js");
  __include("scout/RemoteApp.js");
  __include("scout/Extension.js");
  __include("scout/TypeDescriptor.js");
  __include("scout/ObjectFactory.js");
  __include("scout/objectFactories.js");
  __include("scout/widget/LoadingSupport.js");
  __include("scout/session/ModelAdapter.js");
  __include("scout/widget/Widget.js");
  __include("scout/widget/widgets.js");
  __include("scout/widget/Composite.js");
  __include("scout/widget/NullWidget.js");
  __include("scout/widget/NullWidgetAdapter.js");
  // Basic utilities
  __include("scout/util/arrays.js");
  __include("scout/util/Call.js");
  __include("scout/util/EventDelegator.js");
  __include("scout/util/dates.js");
  __include("scout/util/defaultValues.js");
  __include("scout/util/events.js");
  __include("scout/util/DetachHelper.js");
  __include("scout/util/Device.js");
  __include("scout/util/DoubleClickSupport.js");
  __include("scout/util/dragAndDrop.js");
  __include("scout/util/Event.js");
  __include("scout/util/EventSupport.js");
  __include("scout/util/fonts.js");
  __include("scout/util/icons.js");
  __include("scout/util/inspector.js");
  __include("scout/util/locales.js");
  __include("scout/logging/logging.js");
  __include("scout/logging/NullLogger.js");
  __include("scout/util/mimeTypes.js");
  __include("scout/util/models.js");
  __include("scout/util/numbers.js");
  __include("scout/util/objects.js");
  __include("scout/util/polyfills.js");
  __include("scout/util/promises.js");
  __include("scout/util/Range.js");
  __include("scout/util/Status.js");
  __include("scout/util/strings.js");
  __include("scout/util/styles.js");
  __include("scout/util/TreeSet.js");
  __include("scout/util/URL.js");
  __include("scout/util/filters.js");
  __include("scout/util/hAlign.js");
  __include("scout/util/aggregation.js");
  __include("scout/util/webstorage.js");
  __include("scout/util/cookies.js");
  // Lookup calls
  __include("scout/lookup/LookupCall.js");
  __include("scout/lookup/LookupRow.js");
  __include("scout/lookup/RemoteLookupCall.js");
  __include("scout/lookup/RemoteLookupRequest.js");
  __include("scout/lookup/StaticLookupCall.js");
  __include("scout/lookup/HierarchicalLookupResultBuilder.js");
  // Code
  __include("scout/code/Code.js");
  __include("scout/code/CodeType.js");
  __include("scout/code/codes.js");
  __include("scout/code/CodeLookupCall.js"); // requires LookupCall.js
  // Session related
  __include("scout/session/AjaxCall.js");
  __include("scout/session/BackgroundJobPollingSupport.js");
  __include("scout/session/BusyIndicator.js");
  __include("scout/session/RemoteEvent.js");
  __include("scout/session/Locale.js");
  __include("scout/session/PropertyChangeEventFilter.js");
  __include("scout/session/Reconnector.js");
  __include("scout/session/ResponseQueue.js");
  __include("scout/session/Session.js");
  __include("scout/session/UserAgent.js");
  __include("scout/session/WidgetEventTypeFilter.js");
  // Basic layout
  __include("scout/layout/graphics.js");
  __include("scout/layout/AbstractLayout.js");
  __include("scout/layout/HtmlComponent.js");
  __include("scout/layout/LayoutConstants.js");
  __include("scout/layout/LayoutValidator.js");
  __include("scout/layout/logicalgrid/LogicalGrid.js");
  __include("scout/layout/logicalgrid/LogicalGridConfig.js");
  __include("scout/layout/logicalgrid/LogicalGridData.js");
  __include("scout/layout/logicalgrid/LogicalGridLayout.js");
  __include("scout/layout/logicalgrid/LogicalGridLayoutConfig.js");
  __include("scout/layout/logicalgrid/LogicalGridLayoutInfo.js");
  __include("scout/layout/logicalgrid/AbstractGrid.js");
  __include("scout/layout/logicalgrid/HorizontalGrid.js");
  __include("scout/layout/logicalgrid/VerticalSmartGrid.js");
  __include("scout/layout/logicalgrid/matrix/LogicalGridMatrix.js");
  __include("scout/layout/logicalgrid/matrix/LogicalGridMatrixCell.js");
  __include("scout/layout/logicalgrid/matrix/LogicalGridMatrixCursor.js");
  __include("scout/layout/logicalgrid/matrix/HorizontalGridMatrix.js");
  __include("scout/layout/logicalgrid/matrix/VerticalGridMatrix.js");
  __include("scout/layout/ColumnLayout.js");
  __include("scout/layout/NullLayout.js");
  __include("scout/layout/RowLayout.js");
  __include("scout/layout/SingleLayout.js");
  __include("scout/layout/flexbox/FlexboxLayout.js");
  __include("scout/layout/flexbox/FlexboxLayoutData.js");
  // SimpleTabBox
  __include("scout/tabbox/SimpleTabBoxController.js");
  __include("scout/tabbox/SimpleTabBox.js");
  __include("scout/tabbox/SimpleTabBoxLayout.js");
  __include("scout/tabbox/SimpleTabViewContentLayout.js");
  // Keystroke handling
  __include("scout/keystroke/keys.js");
  __include("scout/keystroke/Key.js");
  __include("scout/keystroke/keyStrokeModifier.js");
  __include("scout/keystroke/VirtualKeyStrokeEvent.js");
  __include("scout/keystroke/KeyStrokeManager.js");
  __include("scout/keystroke/KeyStrokeContext.js");
  __include("scout/keystroke/InputFieldKeyStrokeContext.js");
  __include("scout/keystroke/KeyStroke.js");
  __include("scout/keystroke/RangeKeyStroke.js");
  __include("scout/keystroke/ContextMenuKeyStroke.js");
  __include("scout/keystroke/ClickActiveElementKeyStroke.js");
  __include("scout/keystroke/FocusAdjacentElementKeyStroke.js");
  __include("scout/keystroke/CloseKeyStroke.js");
  __include("scout/keystroke/AbortKeyStroke.js");
  __include("scout/keystroke/TabItemKeyStroke.js");
  // Misc. elements
  __include("scout/accordion/Accordion.js");
  __include("scout/accordion/AccordionAdapter.js");
  __include("scout/boxbuttons/BoxButtons.js");
  __include("scout/carousel/Carousel.js");
  __include("scout/carousel/CarouselLayout.js");
  __include("scout/cell/Cell.js");
  __include("scout/collapsehandle/CollapseHandle.js");
  __include("scout/focus/FocusManager.js");
  __include("scout/focus/FocusContext.js");
  __include("scout/focus/focusUtils.js");
  __include("scout/focus/focusRule.js");
  __include("scout/glasspane/DeferredGlassPaneTarget.js");
  __include("scout/glasspane/GlassPaneRenderer.js");
  __include("scout/iframe/IFrame.js");
  __include("scout/scrollbar/Scrollbar.js");
  __include("scout/scrollbar/scrollbars.js");
  __include("scout/splitter/Splitter.js");
  __include("scout/text/DateFormat.js");
  __include("scout/text/DecimalFormat.js");
  __include("scout/text/TextMap.js");
  __include("scout/text/texts.js");
  __include("scout/tooltip/Tooltip.js");
  __include("scout/tooltip/tooltips.js");
  __include("scout/tooltip/WidgetTooltip.js");
  __include("scout/action/Action.js");
  __include("scout/action/ActionAdapter.js");
  __include("scout/action/ActionKeyStroke.js");
  __include("scout/box/Box.js");
  __include("scout/popup/Popup.js");
  __include("scout/popup/PopupLayout.js");
  __include("scout/popup/PopupWithHead.js");
  __include("scout/popup/PopupWithHeadLayout.js");
  __include("scout/popup/SinglePopupLayout.js");
  __include("scout/popup/MobilePopup.js");
  __include("scout/popup/MobilePopupLayout.js");
  __include("scout/popup/TouchPopup.js");
  __include("scout/popup/TouchPopupLayout.js");
  __include("scout/datepicker/DatePicker.js");
  __include("scout/datepicker/DatePickerPopup.js");
  __include("scout/datepicker/DatePickerPopupLayout.js");
  __include("scout/datepicker/DatePickerTouchPopup.js");
  __include("scout/datepicker/DatePickerTouchPopupLayout.js");
  __include("scout/group/Group.js");
  __include("scout/group/GroupAdapter.js");
  __include("scout/group/GroupLayout.js");
  __include("scout/group/keystrokes/GroupToggleCollapseKeyStroke.js");
  __include("scout/image/Icon.js");
  __include("scout/image/IconDesc.js");
  __include("scout/image/Image.js");
  __include("scout/image/ImageLayout.js");
  __include("scout/notification/Notification.js");
  __include("scout/notification/NotificationAdapter.js");
  __include("scout/menu/menus.js");
  __include("scout/menu/Menu.js");
  __include("scout/menu/EllipsisMenu.js");
  __include("scout/menu/MenuAdapter.js");
  __include("scout/menu/MenuKeyStroke.js");
  __include("scout/menu/MenuExecKeyStroke.js");
  __include("scout/menu/MenuItemsOrder.js");
  __include("scout/menu/ContextMenuPopup.js");
  __include("scout/menu/ContextMenuPopupLayout.js");
  __include("scout/menu/menuNavigationKeyStrokes.js");
  __include("scout/menu/ButtonAdapterMenu.js");
  __include("scout/menu/form/field/FormFieldMenu.js");
  __include("scout/menu/form/field/FormFieldMenuAdapter.js");
  __include("scout/menu/menubox/MenuBox.js");
  __include("scout/menu/menubox/MenuBoxLayout.js");
  __include("scout/menu/menubar/MenuBar.js");
  __include("scout/menu/menubar/MenuBarLayout.js");
  __include("scout/menu/menubar/MenuBarLeftKeyStroke.js");
  __include("scout/menu/menubar/MenuBarRightKeyStroke.js");
  __include("scout/menu/menubar/MenuBarPopup.js");
  __include("scout/menu/menubar/MenubarBox.js");
  __include("scout/menu/menubar/MenubarBoxLayout.js");
  __include("scout/calendar/Calendar.js");
  __include("scout/calendar/CalendarAdapter.js");
  __include("scout/calendar/CalendarComponent.js");
  __include("scout/calendar/CalendarComponentAdapter.js");
  __include("scout/calendar/CalendarListComponent.js");
  __include("scout/calendar/CalendarLayout.js");
  __include("scout/calendar/CalendarModeMenu.js");
  __include("scout/calendar/CalendarModesMenu.js");
  __include("scout/calendar/DateRange.js");
  __include("scout/calendar/YearPanel.js");
  __include("scout/lifecycle/Lifecycle.js");
  __include("scout/planner/Planner.js");
  __include("scout/planner/PlannerAdapter.js");
  __include("scout/planner/PlannerHeader.js");
  __include("scout/planner/PlannerLayout.js");
  __include("scout/planner/PlannerMenuItemsOrder.js");
  __include("scout/filechooser/FileChooser.js");
  __include("scout/filechooser/FileChooserAdapter.js");
  __include("scout/filechooser/FileChooserController.js");
  __include("scout/filechooser/FileInput.js");
  __include("scout/router/Route.js");
  __include("scout/router/router.js");
  __include("scout/slider/Slider.js");
  __include("scout/slider/SliderAdapter.js");
  __include("scout/slider/SliderLayout.js");
  // Form
  __include("scout/form/Form.js");
  __include("scout/form/FormAdapter.js");
  __include("scout/form/FormGrid.js");
  __include("scout/form/FormLayout.js");
  __include("scout/form/FormMenu.js");
  __include("scout/form/FormMenuAdapter.js");
  __include("scout/form/FormMenuPopup.js");
  __include("scout/form/FormMenuPopupLayout.js");
  __include("scout/form/lifecycle/FormLifecycle.js");
  __include("scout/form/lifecycle/CancelMenu.js");
  __include("scout/form/lifecycle/CloseMenu.js");
  __include("scout/form/lifecycle/OkMenu.js");
  __include("scout/form/lifecycle/ResetMenu.js");
  __include("scout/form/lifecycle/SaveMenu.js");
  __include("scout/form/DialogLayout.js");
  // Table
  __include("scout/table/Table.js");
  __include("scout/table/TableAdapter.js");
  __include("scout/table/TableRow.js");
  __include("scout/table/TableMatrix.js");
  __include("scout/table/TableFooter.js");
  __include("scout/table/TableFooterLayout.js");
  __include("scout/table/TableInfoFilterTooltip.js");
  __include("scout/table/TableInfoLoadTooltip.js");
  __include("scout/table/TableInfoSelectionTooltip.js");
  __include("scout/table/TableHeader.js");
  __include("scout/table/TableHeaderMenu.js");
  __include("scout/table/TableHeaderMenuLayout.js");
  __include("scout/table/TableHeaderMenuGroup.js");
  __include("scout/table/TableHeaderMenuButton.js");
  __include("scout/table/TableHeaderMenuButtonKeyStroke.js");
  __include("scout/table/TableLayout.js");
  __include("scout/table/TableSelectionHandler.js");
  __include("scout/table/TableRowDetail.js");
  __include("scout/table/TableTooltip.js");
  __include("scout/table/TableUpdateBuffer.js");
  __include("scout/table/columns/comparators.js");
  __include("scout/table/columns/Column.js");
  __include("scout/table/columns/ColumnOptimalWidthMeasurer.js");
  __include("scout/table/columns/AlphanumericSortingStringColumn.js"); // requires Column.js
  __include("scout/table/columns/BeanColumn.js"); // requires Column.js
  __include("scout/table/columns/BooleanColumn.js"); // requires Column.js
  __include("scout/table/columns/DateColumn.js"); // requires Column.js
  __include("scout/table/columns/IconColumn.js"); //requires Column.js
  __include("scout/table/columns/NumberColumn.js"); //requires Column.js
  __include("scout/table/columns/SmartColumn.js"); // requires Column.js
  __include("scout/table/controls/TableControl.js");
  __include("scout/table/controls/TableControlAdapter.js");
  __include("scout/table/controls/TableControlAdapterMenu.js"); // requires FormMenu and TableControl
  __include("scout/table/controls/AggregateTableControl.js"); // requires TableControl.js
  __include("scout/table/controls/AggregateTableControlAdapter.js");
  __include("scout/table/controls/FormTableControl.js"); // requires TableControl.js
  __include("scout/table/controls/FormTableControlAdapter.js");
  __include("scout/table/controls/FormTableControlLayout.js");
  __include("scout/table/editor/CellEditorPopup.js");
  __include("scout/table/editor/CellEditorPopupLayout.js");
  __include("scout/table/editor/CellEditorCancelEditKeyStroke.js");
  __include("scout/table/editor/CellEditorCompleteEditKeyStroke.js");
  __include("scout/table/editor/CellEditorTabKeyStroke.js");
  __include("scout/table/keystrokes/AbstractTableNavigationKeyStroke.js");
  __include("scout/table/keystrokes/TableControlCloseKeyStroke.js");
  __include("scout/table/keystrokes/TableCopyKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationCollapseKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationExpandKeyStroke.js");
  __include("scout/table/keystrokes/TableSelectAllKeyStroke.js");
  __include("scout/table/keystrokes/TableStartCellEditKeyStroke.js");
  __include("scout/table/keystrokes/TableRefreshKeyStroke.js");
  __include("scout/table/keystrokes/TableToggleRowKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationUpKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationDownKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationHomeKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationEndKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationPageUpKeyStroke.js");
  __include("scout/table/keystrokes/TableNavigationPageDownKeyStroke.js");
  __include("scout/table/keystrokes/TableFocusFilterFieldKeyStroke.js");
  __include("scout/table/userfilter/TableFilter.js");
  __include("scout/table/userfilter/TableUserFilter.js");
  __include("scout/table/userfilter/CollapsedRowsFilter.js");
  __include("scout/table/userfilter/ColumnUserFilter.js");
  __include("scout/table/userfilter/DateColumnUserFilter.js");
  __include("scout/table/userfilter/NumberColumnUserFilter.js");
  __include("scout/table/userfilter/TextColumnUserFilter.js");
  __include("scout/table/userfilter/TableTextUserFilter.js");
  // TimePicker
  __include("scout/timepicker/TimePicker.js");
  __include("scout/timepicker/TimePickerPopup.js");
  __include("scout/timepicker/TimePickerPopupLayout.js");
  __include("scout/timepicker/TimePickerTouchPopup.js");
  __include("scout/timepicker/TimePickerTouchPopupLayout.js");
  // Tree
  __include("scout/tree/Tree.js");
  __include("scout/tree/TreeAdapter.js");
  __include("scout/tree/TreeNode.js");
  __include("scout/tree/TreeLayout.js");
  __include("scout/tree/LazyNodeFilter.js");
  __include("scout/tree/TreeBreadcrumbFilter.js");
  __include("scout/tree/keystrokes/AbstractTreeNavigationKeyStroke.js");
  __include("scout/tree/keystrokes/TreeSpaceKeyStroke.js");
  __include("scout/tree/keystrokes/TreeNavigationUpKeyStroke.js");
  __include("scout/tree/keystrokes/TreeNavigationDownKeyStroke.js");
  __include("scout/tree/keystrokes/TreeNavigationEndKeyStroke.js");
  __include("scout/tree/keystrokes/TreeCollapseAllKeyStroke.js");
  __include("scout/tree/keystrokes/TreeCollapseOrDrillUpKeyStroke.js");
  __include("scout/tree/keystrokes/TreeExpandOrDrillDownKeyStroke.js");
  // Compact Tree
  __include("scout/tree/CompactTree.js");
  __include("scout/tree/CompactTreeNode.js");
  __include("scout/tree/keystrokes/AbstractCompactTreeControlKeyStroke.js");
  __include("scout/tree/keystrokes/CompactTreeUpKeyStroke.js");
  __include("scout/tree/keystrokes/CompactTreeDownKeyStroke.js");
  __include("scout/tree/keystrokes/CompactTreeLeftKeyStroke.js");
  __include("scout/tree/keystrokes/CompactTreeRightKeyStroke.js");
  // Basics for form fields
  __include("scout/form/fields/fields.js");
  __include("scout/form/fields/AppLinkKeyStroke.js");
  __include("scout/form/fields/FormField.js");
  __include("scout/form/fields/FormFieldAdapter.js");
  __include("scout/form/fields/FormFieldLayout.js");
  __include("scout/form/fields/SimpleLoadingSupport.js");
  __include("scout/form/fields/StatusMenuMapping.js");
  __include("scout/form/fields/StatusMenuMappingAdapter.js");
  __include("scout/form/fields/GridData.js");
  __include("scout/form/fields/CompositeField.js");
  __include("scout/form/fields/CompositeFieldAdapter.js");
  __include("scout/form/fields/ValueField.js");
  __include("scout/form/fields/ValueFieldAdapter.js");
  __include("scout/form/fields/BasicField.js");
  __include("scout/form/fields/BasicFieldAdapter.js");
  __include("scout/form/fields/WidgetField.js");
  __include("scout/form/fields/WidgetFieldAdapter.js");
  __include("scout/form/fields/WidgetFieldLayout.js");
  __include("scout/form/FormController.js");
  // Basics for message boxes
  __include("scout/messagebox/MessageBox.js");
  __include("scout/messagebox/MessageBoxAdapter.js");
  __include("scout/messagebox/MessageBoxController.js");
  __include("scout/messagebox/MessageBoxes.js");
  __include("scout/messagebox/MessageBoxLayout.js");
  // Form fields (A-Z)
  __include("scout/form/fields/accordionfield/AccordionField.js");
  __include("scout/form/fields/accordionfield/AccordionFieldAdapter.js");
  __include("scout/form/fields/beanfield/BeanField.js");
  __include("scout/form/fields/beanfield/BeanFieldAdapter.js");
  __include("scout/form/fields/browserfield/BrowserField.js");
  __include("scout/form/fields/browserfield/BrowserFieldAdapter.js");
  __include("scout/form/fields/button/Button.js");
  __include("scout/form/fields/button/ButtonLayout.js");
  __include("scout/form/fields/button/ButtonAdapter.js");
  __include("scout/form/fields/button/ButtonKeyStroke.js");
  __include("scout/form/fields/calendarfield/CalendarField.js");
  __include("scout/form/fields/calendarfield/CalendarFieldAdapter.js");
  __include("scout/form/fields/carousel/CarouselField.js");
  __include("scout/form/fields/checkbox/CheckBoxField.js");
  __include("scout/form/fields/checkbox/CheckBoxFieldAdapter.js");
  __include("scout/form/fields/checkbox/CheckBoxToggleKeyStroke.js");
  __include("scout/form/fields/clipboardfield/ClipboardField.js");
  __include("scout/form/fields/clipboardfield/ClipboardFieldAdapter.js");
  __include("scout/form/fields/colorfield/ColorField.js");
  __include("scout/form/fields/colorfield/ColorFieldAdapter.js");
  __include("scout/form/fields/datefield/DateField.js");
  __include("scout/form/fields/datefield/DateFieldAdapter.js");
  __include("scout/form/fields/datefield/DateTimeCompositeLayout.js");
  __include("scout/form/fields/filechooserbutton/FileChooserButton.js");
  __include("scout/form/fields/filechooserbutton/FileChooserButtonAdapter.js");
  __include("scout/form/fields/filechooserfield/FileChooserField.js");
  __include("scout/form/fields/filechooserfield/FileChooserFieldAdapter.js");
  __include("scout/form/fields/filechooserfield/FileChooserFieldBrowseKeyStroke.js");
  __include("scout/form/fields/filechooserfield/FileChooserFieldDeleteKeyStroke.js");
  __include("scout/form/fields/groupbox/GroupBox.js");
  __include("scout/form/fields/groupbox/GroupBoxGridConfig.js");
  __include("scout/form/fields/groupbox/GroupBoxAdapter.js");
  __include("scout/form/fields/groupbox/GroupBoxLayout.js");
  __include("scout/form/fields/groupbox/GroupBoxMenuItemsOrder.js");
  __include("scout/form/fields/htmlfield/HtmlField.js");
  __include("scout/form/fields/htmlfield/HtmlFieldAdapter.js");
  __include("scout/form/fields/imagefield/ImageField.js");
  __include("scout/form/fields/imagefield/ImageFieldAdapter.js");
  __include("scout/form/fields/imagefield/ImageFieldLayout.js");
  __include("scout/form/fields/labelfield/LabelField.js");
  __include("scout/form/fields/labelfield/LabelFieldAdapter.js");
  __include("scout/form/fields/listbox/ListBox.js");
  __include("scout/form/fields/listbox/ListBoxAdapter.js");
  __include("scout/form/fields/listbox/ListBoxLayout.js");
  __include("scout/form/fields/numberfield/NumberField.js");
  __include("scout/form/fields/numberfield/NumberFieldAdapter.js");
  __include("scout/form/fields/numberfield/Calculator.js");
  __include("scout/form/fields/placeholder/PlaceholderField.js");
  __include("scout/form/fields/placeholder/PlaceholderFieldAdapter.js");
  __include("scout/form/fields/plannerfield/PlannerField.js");
  __include("scout/form/fields/plannerfield/PlannerFieldAdapter.js");
  __include("scout/form/fields/radiobutton/RadioButton.js");
  __include("scout/form/fields/radiobutton/RadioButtonLayout.js");
  __include("scout/form/fields/radiobutton/RadioButtonAdapter.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroup.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroupAdapter.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroupGridConfig.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroupLayoutConfig.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroupLeftKeyStroke.js");
  __include("scout/form/fields/radiobutton/RadioButtonGroupRightKeyStroke.js");
  __include("scout/form/fields/radiobutton/RadioButtonKeyStroke.js");
  __include("scout/form/fields/sequencebox/SequenceBox.js");
  __include("scout/form/fields/sequencebox/SequenceBoxGridConfig.js");
  __include("scout/form/fields/sequencebox/SequenceBoxLayoutConfig.js");
  __include("scout/form/fields/sequencebox/SequenceBoxAdapter.js");
  __include("scout/form/fields/slider/SliderField.js");
  __include("scout/form/fields/smartfield/SmartField.js");
  __include("scout/form/fields/smartfield/SmartFieldAdapter.js");
  __include("scout/form/fields/smartfield/SmartFieldLayout.js");
  __include("scout/form/fields/smartfield/SmartFieldCancelKeyStroke.js");
  __include("scout/form/fields/smartfield/SmartFieldPopup.js");
  __include("scout/form/fields/smartfield/SmartFieldTouchPopup.js");
  __include("scout/form/fields/smartfield/SmartFieldPopupLayout.js");
  __include("scout/form/fields/smartfield/SmartFieldMultiline.js");
  __include("scout/form/fields/smartfield/SmartFieldMultilineAdapter.js");
  __include("scout/form/fields/smartfield/SmartFieldMultilineLayout.js");
  __include("scout/form/fields/smartfield/ProposalField.js");
  __include("scout/form/fields/smartfield/ProposalFieldAdapter.js");
  __include("scout/form/fields/smartfield/ProposalTreeNode.js");
  __include("scout/form/fields/smartfield/ProposalChooser.js");
  __include("scout/form/fields/smartfield/ProposalChooserLayout.js");
  __include("scout/form/fields/smartfield/TableProposalChooser.js");
  __include("scout/form/fields/smartfield/TreeProposalChooser.js");
  __include("scout/form/fields/splitbox/SplitBox.js");
  __include("scout/form/fields/splitbox/SplitBoxAdapter.js");
  __include("scout/form/fields/splitbox/SplitBoxCollapseKeyStroke.js");
  __include("scout/form/fields/splitbox/SplitBoxFirstCollapseKeyStroke.js");
  __include("scout/form/fields/splitbox/SplitBoxSecondCollapseKeyStroke.js");
  __include("scout/form/fields/splitbox/SplitBoxLayout.js");
  __include("scout/form/fields/stringfield/StringField.js");
  __include("scout/form/fields/stringfield/StringFieldLayout.js");
  __include("scout/form/fields/stringfield/StringFieldAdapter.js");
  __include("scout/form/fields/stringfield/StringFieldEnterKeyStroke.js");
  __include("scout/form/fields/stringfield/StringFieldCtrlEnterKeyStroke.js");
  __include("scout/form/fields/tabbox/TabBox.js");
  __include("scout/form/fields/tabbox/TabAreaLeftKeyStroke.js");
  __include("scout/form/fields/tabbox/TabAreaRightKeyStroke.js");
  __include("scout/form/fields/tabbox/TabBoxAdapter.js");
  __include("scout/form/fields/tabbox/TabBoxHeaderLayout.js");
  __include("scout/form/fields/tabbox/TabBoxHeader.js");
  __include("scout/form/fields/tabbox/TabArea.js");
  __include("scout/form/fields/tabbox/TabAreaLayout.js");
  __include("scout/form/fields/tabbox/TabBoxLayout.js");
  __include("scout/form/fields/tabbox/TabItem.js");
  __include("scout/form/fields/tabbox/TabItemAdapter.js");
  __include("scout/form/fields/tabbox/TabItemLayout.js");
  __include("scout/form/fields/tablefield/TableField.js");
  __include("scout/form/fields/tablefield/TableFieldAdapter.js");
  __include("scout/form/fields/tagfield/TagChooserPopup.js");
  __include("scout/form/fields/tagfield/TagChooserPopupLayout.js");
  __include("scout/form/fields/tagfield/TagField.js");
  __include("scout/form/fields/tagfield/TagFieldAdapter.js");
  __include("scout/form/fields/tagfield/TagFieldCancelKeyStroke.js");
  __include("scout/form/fields/tagfield/TagFieldEnterKeyStroke.js");
  __include("scout/form/fields/tagfield/TagFieldDeleteKeyStroke.js");
  __include("scout/form/fields/tagfield/TagFieldNavigationKeyStroke.js");
  __include("scout/form/fields/tagfield/TagFieldOpenPopupKeyStroke.js");
  __include("scout/form/fields/tagfield/TagFieldLayout.js");
  __include("scout/form/fields/tagfield/TagFieldContainerLayout.js");
  __include("scout/form/fields/tagfield/TagOverflowPopup.js");
  __include("scout/form/fields/tilefield/TileField.js");
  __include("scout/form/fields/tilefield/TileFieldAdapter.js");
  __include("scout/form/fields/treebox/TreeBox.js");
  __include("scout/form/fields/treebox/TreeBoxAdapter.js");
  __include("scout/form/fields/treebox/TreeBoxLayout.js");
  __include("scout/form/fields/treefield/TreeField.js");
  __include("scout/form/fields/treefield/TreeFieldAdapter.js");
  __include("scout/form/fields/wizard/WizardProgressField.js");
  __include("scout/form/fields/wizard/WizardProgressFieldAdapter.js");
  __include("scout/form/fields/wizard/WizardProgressFieldLayout.js");
  __include("scout/form/fields/wrappedform/WrappedFormField.js");
  __include("scout/form/fields/wrappedform/WrappedFormFieldAdapter.js");
  // TagBar
  __include("scout/tagbar/TagBar.js");
  __include("scout/tagbar/TagBarLayout.js");
  // TileGrid
  __include("scout/tile/Tile.js");
  __include("scout/tile/TileAdapter.js");
  __include("scout/tile/TileGrid.js");
  __include("scout/tile/TileGridAdapter.js");
  __include("scout/tile/TileGridGridConfig.js");
  __include("scout/tile/TileGridLayout.js");
  __include("scout/tile/TileGridLayoutConfig.js");
  __include("scout/tile/TileGridSelectionHandler.js");
  __include("scout/tile/accordion/TileAccordion.js");
  __include("scout/tile/accordion/TileAccordionAdapter.js");
  __include("scout/tile/accordion/TileAccordionSelectionHandler.js");
  __include("scout/tile/keystrokes/TileGridSelectKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectAllKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectLeftKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectRightKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectDownKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectUpKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectFirstKeyStroke.js");
  __include("scout/tile/keystrokes/TileGridSelectLastKeyStroke.js");
  __include("scout/tile/RemoteTileFilter.js");
  __include("scout/tile/WidgetTile.js");
  __include("scout/tile/WidgetTileAdapter.js");
  __include("scout/tile/PlaceholderTile.js");
  __include("scout/tile/fields/FormFieldTile.js");
  __include("scout/tile/fields/FormFieldTileAdapter.js");
  __include("scout/tile/fields/button/TileButton.js");
  __include("scout/tile/fields/tablefield/TileTableField.js");
  // Desktop
  __include("scout/desktop/Desktop.js");
  __include("scout/desktop/DesktopAdapter.js");
  __include("scout/desktop/DesktopKeyStroke.js");
  __include("scout/desktop/DesktopLogo.js");
  __include("scout/desktop/DesktopLayout.js");
  __include("scout/desktop/DesktopTabBoxController.js");
  __include("scout/desktop/PopupWindow.js");
  __include("scout/desktop/OpenUriHandler.js");
  __include("scout/desktop/bench/DesktopBench.js");
  __include("scout/desktop/bench/BenchColumn.js");
  __include("scout/desktop/bench/layout/BenchRowLayoutData.js");
  __include("scout/desktop/bench/layout/BenchColumnLayoutData.js");
  __include("scout/desktop/bench/DesktopTabSelectKeyStroke.js");
  __include("scout/desktop/desktoptab/DisableBrowserTabSwitchingKeyStroke.js");
  __include("scout/desktop/header/DesktopHeader.js");
  __include("scout/desktop/header/HeaderTabBoxController.js");
  __include("scout/desktop/header/DesktopHeaderLayout.js");
  __include("scout/desktop/navigation/DesktopNavigation.js");
  __include("scout/desktop/navigation/DesktopNavigationHandle.js");
  __include("scout/desktop/navigation/DesktopNavigationLayout.js");
  __include("scout/desktop/navigation/ShrinkNavigationKeyStroke.js");
  __include("scout/desktop/navigation/EnlargeNavigationKeyStroke.js");
  __include("scout/desktop/notification/DesktopNotification.js");
  __include("scout/desktop/notification/DesktopNotificationAdapter.js");
  __include("scout/desktop/notification/OfflineDesktopNotification.js");
  __include("scout/desktop/popupblocker/PopupBlockerHandler.js");
  __include("scout/desktop/popupblocker/PopupBlockerDesktopNotification.js");
  __include("scout/desktop/toolbox/DesktopToolBox.js");
  __include("scout/desktop/viewbutton/ViewButton.js");
  __include("scout/desktop/viewbutton/ViewButtonAdapter.js");
  __include("scout/desktop/viewbutton/ViewButtonBox.js");
  __include("scout/desktop/viewbutton/ViewButtonBoxLayout.js");
  __include("scout/desktop/viewbutton/ViewMenuOpenKeyStroke.js");
  __include("scout/desktop/viewbutton/ViewMenuPopup.js");
  __include("scout/desktop/viewbutton/ViewMenuPopupLayout.js");
  __include("scout/desktop/viewbutton/ViewMenuTab.js");
  __include("scout/desktop/outline/pages/Page.js");
  __include("scout/desktop/outline/pages/PageWithNodes.js");
  __include("scout/desktop/outline/pages/PageWithTable.js");
  __include("scout/desktop/outline/pages/PageTileButton.js");
  __include("scout/desktop/outline/pages/PageTileGrid.js");
  __include("scout/desktop/outline/pages/PageTileGridSelectKeyStroke.js");
  __include("scout/desktop/outline/pages/AutoLeafPageWithNodes.js");
  __include("scout/tabbox/SimpleTab.js");
  __include("scout/desktop/desktoptab/DesktopTab.js"); // requires SimpleTab.js
  __include("scout/tabbox/SimpleTabArea.js");
  __include("scout/tabbox/SimpleTabAreaLayout.js");
  __include("scout/desktop/outline/DetailTableTreeFilter.js");
  __include("scout/desktop/outline/Outline.js");
  __include("scout/desktop/outline/OutlineAdapter.js");
  __include("scout/desktop/outline/OutlineMediator.js");
  __include("scout/desktop/outline/OutlineLayout.js");
  __include("scout/desktop/outline/OutlineViewButton.js"); // requires ViewButton.js
  __include("scout/desktop/outline/OutlineViewButtonAdapter.js");
  __include("scout/desktop/outline/PageLayout.js");
  __include("scout/desktop/outline/SearchOutline.js");
  __include("scout/desktop/outline/SearchOutlineAdapter.js");
  __include("scout/desktop/outline/SearchOutlineLayout.js");
  __include("scout/desktop/outline/navigation/NavigateButton.js"); // requires Menu.js
  __include("scout/desktop/outline/navigation/NavigateDownButton.js");
  __include("scout/desktop/outline/navigation/NavigateUpButton.js");
  __include("scout/desktop/outline/keystrokes/OutlineKeyStrokeContext.js");
  __include("scout/desktop/outline/keystrokes/OutlineNavigateToTopKeyStroke.js");
  __include("scout/desktop/outline/overview/OutlineOverview.js");
  __include("scout/desktop/outline/overview/TileOutlineOverview.js");
  __include("scout/desktop/outline/overview/TileOutlineOverviewLayout.js");
  // More misc. elements
  __include("scout/desktop/DesktopFormController.js");
  __include("scout/table/FilterFieldsGroupBox.js"); // requires GroupBox.js
  __include("scout/resizable/Resizable.js");
} (window.scout = window.scout || {}, jQuery)); //NOSONAR
