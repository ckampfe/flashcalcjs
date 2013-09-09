function calculateAperture(gn, iso, flashPower, distance) {
  
}

function calculateDistance(gn, aperture, iso, flashPower) {

}

function calculateFlashPower(gn, aperture, iso, distance) {

}

function calculateISO(gn, aperture, flashPower, distance) {

}

// EXPERIMENTING TO GET FAMILIAR
function checker() {
  // vars are equal to the value in the form field
  var ap = document.getElementById('apinput').value;
  var iso = document.getElementById('isoinput').value; 
  var gn = document.getElementById('gninput').value;

  // write the variable to the specified id. 
  document.getElementById("apvalue").innerHTML = ap;
  document.getElementById("isovalue").innerHTML = iso; 
  document.getElementById("gnvalue").innerHTML = gn;
  
  // elements is an array containing all of the values that are not GN
  var elements = document.getElementsByName('notgn');

  // base text variable
  var textyText = "";
  
  // loop to put each element of the non-gns array in a string, within newline separation
  for(i=0; i<elements.length; i++) {
    textyText += (elements[i].id + ": " + elements[i].value + "<br />");
  } 
  
  // write textyText (formerly an array, now a newline separated string) to the testing nongns id element 
  document.getElementById("nongns").innerHTML = textyText
}

checker()
