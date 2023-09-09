d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let names = data["names"]
  let metadata = data["metadata"]
  let samples = data["samples"]

  function setNames(names) {
    d3.select("#selDataset").html(null);
    let counter = 0;
    names.forEach(element => {
      d3.select("#selDataset").append("option").attr("value", counter++).text(element)
    });
  }


  function init() {

    //Grab ID corresponding to object.
    let id = parseInt(d3.select("#selDataset").property("value"))


    //Set Metadata in demographic info field.
    for (const [key, value] of Object.entries(metadata[id])) {
      d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
    }



    let trace1 = {
      x: samples[id]["sample_values"].slice(0, 10).reverse(),
      y: samples[id]["otu_ids"].slice(0, 10).map(element => "OTU " + String(element)).reverse(),
      hovertext: samples[id]["otu_labels"].slice(0, 10).reverse(),
      type: 'bar',
      orientation: "h"
    };
    let trace2 = {
      x: samples[id]["otu_ids"],
      y: samples[id]["sample_values"],
      text: samples[id]["otu_labels"],
      mode: 'markers',
      marker: {
        size: samples[id]["sample_values"],
        color: samples[id]["otu_ids"],
      },

    };

    let data = [trace1];
    let data2 = [trace2]
    let data3 = [trace3]
    let layout = {
      title: "Top Ten OTU ID's",
      autosize: true,
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true }
    };
    let layout2 = {
      autosize: true,
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true }
    };
    
    Plotly.newPlot("bar", data, layout);
    Plotly.newPlot("bubble", data2, layout2)
  }

  setNames(names)
  init()
  d3.selectAll("#selDataset").on("change", () => {
    init();
  });
})