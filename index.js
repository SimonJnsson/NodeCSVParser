// Author: Simon Jønsson
var fs = require('fs');

function Person(firstName, lastName, email, phoneNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
}

// Export the function to allow for asynchronous callback
// Once the file has been loaded and processed the data will be passed
module.exports = function(callback){
    fs.readFile('./input.csv', 'utf8', function (error,data) {
      // If an error occours when reading file
      if (error) {
        // Abort and log the error
        return console.log(err);
      }

      // Get data from file and split on newlines
      var linesInCSV = data.trim().split('\r\n');

      // Get headers in file
      var headers = linesInCSV[0];

      // Remove headers from data
      var linesWithoutHeader = linesInCSV.slice(1);

      var Persons = [];

      linesWithoutHeader.forEach(function(item){
         // Split the data in each line
         var personInfo = item.split(',');
         // Create a new Person object with appropiate data fromt the line and push to Persons array
         //Persons.push(new Person(personInfo[0], personInfo[1], personInfo[2], personInfo[3]));
         Persons.push(personInfo);
      });

      // Parse the Persons array to JSON
      jsonData = JSON.stringify(Persons);

      // Do callback with data and any error
      callback(error, jsonData);
    });
}
