// SCOUT GUI
// (c) Copyright 2013-2014, BSI Business Systems Integration AG
//

__include("jquery-scout.js");
// protects $ and undefined from being redefined by another library
(function(scout, $, undefined) {
__include("main.js");
__include("util/arrays.js");
__include("util/EventSupport.js");
__include("util/KeystrokeManager.js");
__include("util/ModelAdapter.js");
__include("util/NullAdapter.js");
__include("util/ObjectFactory.js");
__include("util/Device.js");
__include("util/helpers.js");
__include("util/numbers.js");
__include("util/strings.js");
__include("util/URL.js");
__include("session/Session.js");
__include("session/Event.js");
__include("session/Locale.js");
__include("session/UserAgent.js");
__include("session/Reconnector.js");
__include("datamodel/DataModel.js");
__include("table/Table.js");
__include("table/MobileTable.js");
__include("table/TableHeader.js");
__include("table/TableFooter.js");
__include("table/TableHeaderMenu.js");
__include("table/TableKeystrokeAdapter.js");
__include("table/TableSelectionHandler.js");
__include("table/control/TableControl.js");
__include("table/control/ChartTableControl.js");
__include("table/control/ChartTableControlMatrix.js");
__include("table/control/GraphTableControl.js");
__include("table/control/MapTableControl.js");
__include("table/control/AnalysisTableControl.js");
__include("tree/Tree.js");
__include("desktop/BaseDesktop.js");
__include("desktop/MobileDesktop.js");
__include("desktop/MobileDesktopToolButtons.js");
__include("desktop/DesktopKeystrokeAdapter.js");
__include("desktop/DesktopNavigation.js");
__include("desktop/Outline.js");
__include("desktop/OutlineViewButton.js");
__include("desktop/BreadCrumbNavigation.js");
__include("menu/Menu.js");
__include("menu/menus.js");
__include("form/Form.js");
__include("messagebox/MessageBox.js");
__include("messagebox/MessageBoxModelAdapter.js");
__include("form/fields/FormField.js");
__include("form/fields/ValueField.js");
__include("form/fields/button/Button.js");
__include("form/fields/checkbox/CheckBoxField.js");
__include("form/fields/numberfield/NumberField.js");
__include("form/fields/stringfield/StringField.js");
__include("form/fields/groupbox/GroupBox.js");
__include("form/fields/sequencebox/SequenceBox.js");
__include("form/fields/tablefield/TableField.js");
__include("form/fields/treefield/TreeField.js");
__include("form/fields/tabbox/TabBox.js");
__include("scrollbar/Scrollbar.js");
__include("text/DecimalFormat.js");
__include("text/DateFormat.js");
__include("util/mobileObjectFactories.js");
}(window.scout = window.scout || {}, jQuery));
