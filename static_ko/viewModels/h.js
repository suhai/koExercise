
(function () {
  function getColumnsForScaffolding(data) {
    if ((typeof data.length !== 'number') || data.length === 0) {
      return [];
    }
    var columns = [];
    for (var propertyName in data[0]) {
      columns.push({ headerText: propertyName, rowText: propertyName });
    }
    return columns;
  }

  ko.simpleGrid = {
    viewModel: function (configuration) {
      this.data = configuration.data;
      this.currentPageIndex = ko.observable(0);
      this.pageSize = configuration.pageSize || 5;
      this.columns = configuration.columns || getColumnsForScaffolding(ko.unwrap(this.data));

      this.itemsOnCurrentPage = ko.computed(function () {
        var startIndex = this.pageSize * this.currentPageIndex();
        return ko.unwrap(this.data).slice(startIndex, startIndex + this.pageSize);
      }, this);

      this.maxPageIndex = ko.computed(function () {
        return Math.ceil(ko.unwrap(this.data).length / this.pageSize) - 1;
      }, this);
    }
  };

  // Templates used to render the grid
  var templateEngine = new ko.nativeTemplateEngine();

  templateEngine.addTemplate = function(templateName, templateMarkup) {
    document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
  };

  templateEngine.addTemplate("ko_simpleGrid_grid", "\
                  <table class=\"ko-grid\" cellspacing=\"0\">\
                      <thead>\
                          <tr data-bind=\"foreach: columns\">\
                             <th data-bind=\"text: headerText\"></th>\
                          </tr>\
                      </thead>\
                      <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
                         <tr data-bind=\"foreach: $parent.columns\">\
                             <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                          </tr>\
                      </tbody>\
                  </table>");
  templateEngine.addTemplate("ko_simpleGrid_pageLinks", "\
                  <div class=\"ko-grid-pageLinks\">\
                      <span>Page:</span>\
                      <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                             <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                          </a>\
                      <!-- /ko -->\
                  </div>");

  // The "simpleGrid" binding
  ko.bindingHandlers.simpleGrid = {
    init: function() {
      return { 'controlsDescendantBindings': true };
    },
    // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
    update: function (element, viewModelAccessor, allBindings) {
      var viewModel = viewModelAccessor();

      // Empty the element
      while(element.firstChild)
        ko.removeNode(element.firstChild);

      // Allow the default templates to be overridden
      var gridTemplateName = allBindings.get('simpleGridTemplate') || "ko_simpleGrid_grid",
          pageLinksTemplateName = allBindings.get('simpleGridPagerTemplate') || "ko_simpleGrid_pageLinks";

      // Render the main grid
      var gridContainer = element.appendChild(document.createElement("DIV"));
      ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

      // Render the page links
      var pageLinksContainer = element.appendChild(document.createElement("DIV"));
      ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
    }
  };
})();
/** The above was copied and pasted */


class PagedGridModel {
  constructor(items) {
    this.items = ko.observableArray(items);

    this.addItem = () => {
      this.items.push({ name: 'Null item', sales: 0, price: 10 });
    };

    this.sortByName = () => {
      this.items.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
    };

    this.jumpToFirstPage = function() {
      this.gridViewModel.currentPageIndex(0);
    };

    this.gridViewModel = new ko.simpleGrid.viewModel({
      data: this.items,
      columns: [
        { headerText: 'Item Name', rowText: 'name' },
        { headerText: 'Sales Count', rowText: 'sales' },
        { headerText: 'Price', rowText: function (item) { return '$' + item.price.toFixed(2); } }
      ],
      pageSize: 4
    });
  }
}

const initialData = [
  { name: 'Elephant', sales: 352, price: 75.95 },
  { name: 'Coyote', sales: 89, price: 190.00 },
  { name: 'Giraffe', sales: 152, price: 25.00 },
  { name: 'Babboon', sales: 10, price: 99.95 },
  { name: 'Impala', sales: 20, price: 6350 },
  { name: 'Porcupine', sales: 39450, price: 0.35 },
  { name: 'Octopus', sales: 420, price: 1.50 }
];

$(document).ready(function() {
  const viewModel = new PagedGridModel(initialData);
  ko.applyBindings(viewModel, document.getElementById('hh'));
});