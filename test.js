// Usage of the module
var test = require('./index.js');

// Constructor for simple Person class
function Person(firstName, lastName, email, phoneNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
}


// Call function to retrive JSON data from CSV file
test.parseToJSON('./input.csv', 'utf8', function(err, data){
    // Parse retrieved json string to object
    jsonData = JSON.parse(data);

    // Map JSON objects to Persons
    var people = [];
    for (var i = 0; i < jsonData.length; i++) {
        people[i] = new Person(jsonData[i].firstName, jsonData[i].lastName, jsonData[i].email, jsonData[i].phoneNumber);
    }

    console.log(people);
});

// Call function on file with no header info in file and non-default seperator
test.parseToJSON('./input_noHead.csv', 'utf8', function(err, data){
    console.log('Test without headers')
    console.log(JSON.parse(data));
}, ['fornavn', 'efternavn', 'email', 'telefonnr'], ';');
