document.getElementById("calcbutton").onclick = control;
outputWriter("<br />");

// CONTROL LOGIC

function control() {
  
  // reset the result/error line
  outputWriter("<br />");

  // get the value of GN 
  var gn = document.getElementById('gninput').value;

  // error if no GN
  if ( !gn ) {
    outputWriter("Error: please enter a Guide Number.");
    console.log("Error: please enter a Guide Number.");
    return;
  }

  // get the other values, if GN passes
  var ap = document.getElementById('apinput').value,
  iso = document.getElementById('isoinput').value, 
  fp = eval(document.getElementById('fpinput').value),
  dist = document.getElementById('distinput').value;

  // checks to see that exactly 1 non-Guide Number field is left blank 
  if ( (!ap && (!iso || !fp || !dist)) || (!iso && (!fp || !dist)) || (!fp && !dist) || (ap && iso && fp && dist) ) {
    console.log("Error: please leave only one field blank.");
    outputWriter("Error: please leave exactly one non-GN field blank.");
    return;
  } else if ( !ap ) {
    // round to tenths
    outputWriter("F/" + Math.round(calculateAperture(gn, iso, fp, dist) * 10) / 10);
  } else if ( !dist ) {
    // round to nearest integer 
    outputWriter(Math.round(calculateDistance(gn, ap, iso, fp)) + " ft.");
  } else if ( !fp ) {
    // round to hundredths 
    outputWriter("FP = " + Math.round(calculateFlashPower(gn, ap, iso, dist) * 100) / 100);
  } else if ( !iso ) {
    // round to nearest integer
    outputWriter("ISO = " + Math.round(calculateISO(gn, ap, fp, dist)));
  } else {
    outputWriter("Unknown error occurred; please try again.");
    console.log("Unknown error occurred in calculate method.");
  }
}

// HELPERS

// write results to page
function outputWriter(value) {
  document.getElementById('result').innerHTML = value;
}

// these two are necessary for converting specific inputs into raw EV stops. 
function logSqrt2(val) {
  return Math.log(val) / Math.log(Math.SQRT2);
}

function logBase2(val) {
  return Math.log(val) / Math.log(2);
}

// MATH

function calculateAperture(gn, iso, flashPower, dist) {
  var isoMod = logBase2(iso/100),
  fpMod = -(logBase2(Math.pow(flashPower, -1)));
  
  var ev = Math.pow(Math.SQRT2, (isoMod + fpMod)),
  ap = Math.round(((gn / dist) * ev) * 100) / 100;

  return ap;
}

function calculateDistance(gn, aperture, iso, flashPower) {
  var isoMod = -(logBase2(iso/100.0)),
  fpMod = logBase2(Math.pow(flashPower, -1.0)),
  apMod = logSqrt2(aperture);

  var ev = Math.pow(Math.SQRT2, (isoMod + apMod + fpMod)),
  dist = Math.round(gn / ev);

  return dist;
}

function calculateFlashPower(gn, aperture, iso, dist) {
  var isoMod = -(logBase2(iso/100.0)),
  apMod = logSqrt2(aperture);

  var fpMod = -(logSqrt2(gn / dist) - (isoMod + apMod)),
  flashPower = Math.pow(2, fpMod);

  // needs error if flashPower is greater than 1; "you broke physics!", or something similar

  return flashPower;
}

function calculateISO(gn, aperture, flashPower, dist) {
  var fpMod = logBase2(Math.pow(flashPower, -1.0)), 
  apMod = logSqrt2(aperture);
  
  var isoMod = -(logSqrt2(gn / dist)) + (fpMod + apMod),
  iso = Math.pow(2, isoMod) * 100; 
  
  return iso;
}
