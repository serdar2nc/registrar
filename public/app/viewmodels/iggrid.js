define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'infra-core', 'infra-lob', 'infra-ext-ds', 'infra-ext-grid'], function (sys, http, app, ko) {
    
    return {
        data: ko.observableArray([]),
		buttonText: "Update!",
		labelText: "Hit the button to update the model 'desc' value of the first record with the value of 'some custom description & watch out the grid!",
		buttonClick: function () {
			// update data (the model for the IGnite Grid)
			this.data()[0].desc("some custom description");
		},
        activate: function () {
            if (this.data().length > 0) {
                return;
            }
			function Item(id, desc, productName, createdDate) {
				return {
					 id: ko.observable(id),
					 desc: ko.observable(desc),
					 productName: ko.observable(productName),
					 createdDate: ko.observable(createdDate)
				};
			};
			var myData = [
				new Item(1, "Best Italian bread", "Bread", new Date(2013, 10, 5, 1)),
				new Item(2, "Quaker oats for your taste", "Old Fashioned Quaker Oats", new Date(2012, 10, 5, 2)),
				new Item(3, "peeled and processed", "Canned tomatoes", new Date(2010, 10, 5, 2)),
				new Item(4, "The best tuna from Norway", "Canned Tuna", new Date(1999, 10, 5, 5)),
				new Item(5, "Greek olive oil", "Olive oil", new Date(2013, 10, 5, 5)),
				new Item(6, "heated beverage", "Hot chocolate", new Date(2011, 10, 5, 8)),
				new Item(7, "black beans from Guatemala", "Beans", new Date(2005, 10, 5, 6)),
				new Item(8, "Green Equador bananas", "Bananas", new Date(2004, 10, 5, 5)),
				new Item(9, "raw avocado", "Avocados", new Date(2004, 10, 5, 5)),
				new Item(10, "brown sugar from the Netherlands", "Brown sugar", new Date(2013, 10, 5, 4)),
				new Item(11, "Peru 100% cocoa", "Cocoa", new Date(2013, 10, 5, 4)),
				new Item(12, "Bulgarian natural honey", "Honey", new Date(2012, 10, 5, 9))
			];
            return this.data(myData);
        }
    };
});