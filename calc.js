// easier to do logs with a base of SQRT2
function logSqrt2(val) {
  return Math.log(val) / Math.log(Math.SQRT2)
}

function calculateAperture(gn, iso, flashPower, distance) {
  var isoMod = -(Math.log(iso/100.0,2))
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 

}

function calculateDistance(gn, aperture, iso, flashPower) {
  // transmute ISO, flash power, and aperture into raw stops 
  var iso_mod = -(Math.log(iso/100.0,2))
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 
  var apMod = logSqrt2(aperture)


}

function calculateFlashPower(gn, aperture, iso, distance) {
  var iso_mod = -(Math.log(iso/100.0,2))
  
}

function calculateISO(gn, aperture, flashPower, distance) {
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 

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
