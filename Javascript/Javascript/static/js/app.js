// from data.js
var tableData = data;

// YOUR CODE HERE!

// add table to html page

var tablebody = d3.select("tbody")

function buildtable(data){
    // clear out any existing data
    tablebody.html("");  
    // loop through data

    for (var i = 0; i < data.length; i++){
        // add new rows of data for each ufo sighting
        var container = tablebody.append("tr");
        // go through all of the dictionary properties
        var values = Object.values(data[i]);
        for (var j = 0; j < values.length; j++){
            var columndata = container.append("td");
            columndata.text(values[j]);
        }
    }    
}

// write a data/time search function for the user input

function handleClick() {
    console.log("handle click fired")

    // Prevent the form from refreshing the page
    d3.event.preventDefault();
  
    // Grab the datetime value from the filter
    var date = d3.select("#datetime").property("value");
    let filteredData = tableData;
  
    // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    }
  
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildtable(filteredData);
  }
  
  // Attach an event to listen for the form button
  d3.selectAll("#filter-btn").on("click", handleClick);
  

// execute buildtable 
buildtable(tableData)