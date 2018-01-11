/**
 * This is a class that a user the ability to create, edit/update, view, and/or delete hobbies.
 */
class HobbyViewModel {
  constructor() {
    this.hobbies = ko.observableArray();
    this.hobbyInputName = ko.observable();
    this.hobbyInputCategory = ko.observable();
    this.hobbyInputFrequency = ko.observable();
    this.selectedHobbies = ko.observableArray();
    this.updatableHobby = ko.observable(false);
    this.updateHobbyId = ko.observable();
    this.hobbyCategories = ko.observableArray([
      'Outdoors',
      'Indoors',
      'Water Sports',
      'E-Games',
      'Board Games',
      'Card Games'
    ]);
  }

	editableHobby() {
    return ko.computed(() => (this.selectedHobbies().length > 0));
  }

	addHobby() {
		const hobbyName = $('#hobbyName').val();
		const hobbyCategory = $('#hobbyCategory').val();
		const frequency = $('#frequency').val();

		this.hobbies.push({
			hobbyName,
			hobbyCategory,
			frequency
		});

		$.ajax({
			url: 'http://localhost:8080/hobbies',
			data: JSON.stringify({
				"hobbyName": hobbyName,
				"hobbyCategory": hobbyCategory,
				"frequency": frequency
			}),
			type: "POST",
			contentType: 'application/json',
			success: data => console.log('Hobby Added...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	updateHobby() {
		const id = this.updateHobbyId;
		const hobbyName = $('#hobbyName').val();
		const hobbyCategory = $('#hobbyCategory').val();
		const frequency = $('#frequency').val();

		this.hobbies.remove(item => (item._id == id));
		this.hobbies.push({
			hobbyName,
			hobbyCategory,
			frequency
		});

		$.ajax({
			url: `http://localhost:8080/hobbies/${id}`,
			data: JSON.stringify({
				"hobbyName": hobbyName,
				"hobbyCategory": hobbyCategory,
				"frequency": frequency
			}),
			type: "PUT",
			contentType: 'application/json',
			success: data => console.log('Hobby Updated...'),
			error: (xhr, status, err) => console.log(err)
		});
	}

	editSelectedHobby() {
    this.updateHobbyId = this.selectedHobbies()[0]._id;
    const currHobby = this.selectedHobbies()[0];
    const { hobbyName, hobbyCategory, frequency } = currHobby;

		this.updatableHobby(true);
		this.hobbyInputName(hobbyName);
		this.hobbyInputCategory(hobbyCategory);
		this.hobbyInputFrequency(frequency);
	}

	deleteSelectedHobby() {
		$.each(this.selectedHobbies(), (index, value) => {
			const id = this.selectedHobbies()[index]._id;
			$.ajax({
				url: `http://localhost:8080/hobbies/${id}`,
				type: 'DELETE',
				async: true,
				success: data => console.log('Hobby Removed...'),
				error: (xhr, status, err) => console.log(err)
			});
    });

		this.hobbys.removeAll(this.selectedHobbies());
		this.selectedHobbies.removeAll();
	}
}