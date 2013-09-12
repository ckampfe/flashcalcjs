function checker() {
  // vars are equal to the value in the form field
  var gn = document.getElementById('gninput').value,
  ap = document.getElementById('apinput').value,
  iso = document.getElementById('isoinput').value, 
  dist = document.getElementById('distinput').value;

  
  // elements is an array containing all of the values that are not GN
  var elements = document.getElementsByName('notgn');

  // base text variable
  var textyText = "";
  
  // loop to put each element of the non-gns array in a string, within newline separation
  for ( i = 0; i < elements.length; i++ ) {
    textyText += (elements[i].id + ": " + elements[i].value + "<br />");
  } 
  
  // write textyText (formerly an array, now a newline separated string) to the testing nongns id element 
  document.getElementById("nongns").innerHTML = textyText
}




function logSqrt2(val) {
  return Math.log(val) / Math.log(Math.SQRT2);
}

function logBase2(val) {
  return Math.log(val) / Math.log(2);
}

// confirmed working, output is similar to Ruby version
function calculateAperture(gn, iso, flashPower, dist) {
  var isoMod = logBase2(iso/100);
  var fpMod = -(logBase2(Math.pow(flashPower, -1)));
  
  var ev = Math.pow(Math.SQRT2, (isoMod + fpMod));
  var ap = Math.round(((gn / dist) * ev) * 100) / 100;
  return ap;
}

// confirmed working, output is similar to Ruby version
function calculateDistance(gn, aperture, iso, flashPower) {
  var isoMod = -(logBase2(iso/100.0));
  var fpMod = logBase2(Math.pow(flashPower, -1.0));
  var apMod = logSqrt2(aperture);

  var ev = Math.pow(Math.SQRT2, (isoMod + apMod + fpMod));
  var dist = Math.round(gn / ev);
  return dist;
}

// apparently working, needs more tests and rounding
// needs logic to throw error if fp is larger than 1
function calculateFlashPower(gn, aperture, iso, dist) {
  var isoMod = -(logBase2(iso/100.0));
  var apMod = logSqrt2(aperture);

  var fpMod = -(logSqrt2(gn / dist) - (isoMod + apMod));
  var flashPower = Math.pow(2, fpMod);
  
  return flashPower;
}

// not yet working
// maybe logic to round to the nearest 1/3 stop?
function calculateISO(gn, aperture, flashPower, dist) {
  var fpMod = logBase2(Math.pow(flashPower, -1.0)); 
  var apMod = logSqrt2(aperture);
  
  var isoMod = -(logSqrt2(gn / dist)) + (fpMod + apMod);
  var iso = Math.pow(2, isoMod) * 100 
 
  return iso
}
