function fileSelected(file) {

  //if (file.type == "text") {
    begin(file.data);
  //} else {
    //createP("Error: Please select a .vtt or .txt file.");
  //}
}

function setup() {
  noCanvas();

  // add browse button
  createFileInput(fileSelected);
}

function begin(data){

  console.log(data);

  var filtered_data;

  filtered_data = data;

  filtered_data = filtered_data.replace(/WEBVTT\n/g,"");
  filtered_data = filtered_data.replace(/WEBVTT\r\n/g,"");

  filtered_data = filtered_data.replace(/NOTE duration:.*\n/g,"");
  filtered_data = filtered_data.replace(/NOTE duration:.*\r\n/g,"");

  filtered_data = filtered_data.replace(/NOTE language:.*\n/g,"");
  filtered_data = filtered_data.replace(/NOTE language:.*\r\n/g,"");

  filtered_data = filtered_data.replace(/NOTE Confidence:.+\d/g,"");

  filtered_data = filtered_data.replace(/NOTE recognizability.+\d/g,"");

  filtered_data = filtered_data.replace(/\n.+-.+-.+-.+-.+/g,"");
  filtered_data = filtered_data.replace(/\r\n.+-.+-.+-.+-.+/g,"");

  filtered_data = filtered_data.replace(/\n.+ --> .+\n/g,"");
  filtered_data = filtered_data.replace(/\r\n.+ --> .+\r\n/g,"");

  filtered_data = filtered_data.replace(/.\n. --> .+\n/g,"");
  filtered_data = filtered_data.replace(/.\r\n. --> .+\r\n/g,"");

  // removes whitespace
  filtered_data = filtered_data.replace(/\n+/,"");
  filtered_data = filtered_data.replace(/\r\n+/,"");

  filtered_data = filtered_data.replace(/^ /g,"");

  createP(filtered_data);
}
