// Author: Simon Jønsson

var fs = require('fs');

module.exports = {
    /* Method for reading and parsing CSV file to JSON
        path: path to csv file
        encoding: type of encoding in CSV
        callback: callback method
        headers: headers to use if none present in CSV, default null
        seperator: symbol to use for cell seperation, default ','
        lineDelimiter: string used to indicate new line in CSV, default '\r\n'
    */
    parseToJSON: function(path, encoding, callback, headers = null, seperator = ',', lineDelimiter = '\r\n'){
        fs.readFile(path.toString(), encoding, function (error,data) {
          // If an error occours when reading file
          if (error) {
            // Abort and log the error
            return console.log(err);
          }

          // Get data from file and split on newlines
          var linesInCSV = data.trim().split(lineDelimiter);

          // Get headers in file if none supplied
          if(headers == null){
              headers = linesInCSV[0].split(seperator);
              linesInCSV = linesInCSV.slice(1);
          }

          var objects = [];

          for (var i = 0; i < linesInCSV.length; i++) {
              var currLine = linesInCSV[i].split(seperator);
              var currObj = {};
              for (var j = 0; j < currLine.length; j++) {
                  currObj[headers[j]] = currLine[j];
              }

              objects.push(currObj);
          }

          // Parse the data to JSON
          jsonData = JSON.stringify(objects);

          // Do callback with data and any error
          callback(error, jsonData);
        });
    }
}
