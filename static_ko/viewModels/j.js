
class ContactsModel {
  constructor(contacts) {
    this.contacts = ko.observableArray(ko.utils.arrayMap(contacts, (contact) => {
      return { firstName: contact.firstName, lastName: contact.lastName, phones: ko.observableArray(contact.phones) };
    }));
    this.lastSavedJson = ko.observable('');
  }

  removeContact(contact) {
    this.contacts.remove(contact);
  }

  addContact() {
    this.contacts.push({
      firstName: '',
      lastName: '',
      phones: ko.observableArray()
    });
  }

  addPhone(contact) {
    contact.phones.push({
      type: '',
      number: ''
    });
  }

  removePhone(phone) {
    $.each(this.contacts(), () => { this.phones.remove(phone); });
  }

  save() {
    this.lastSavedJson(JSON.stringify(ko.toJS(this.contacts), null, 2));
  }
}

var initialData = [
  { firstName: "Danny", lastName: "LaRusso", phones: [
      { type: "Mobile", number: "(555) 121-2121" },
      { type: "Home", number: "(555) 123-4567"}
    ]
  },
  { firstName: "Sensei", lastName: "Miyagi", phones: [
      { type: "Mobile", number: "(555) 444-2222" },
      { type: "Home", number: "(555) 999-1212"}
    ]
  }
];

$(document).ready(function() {
  const xViewModel = new ContactsModel(initialData);
  ko.applyBindings(xViewModel, document.getElementById('jj'));
});