document.getElementById("calcbutton").onclick = checker;

function checker() {
  
  // reset the result/error line
  outputWriter("");

  // get the value of each field
  var gn = document.getElementById('gninput').value,
  ap = document.getElementById('apinput').value,
  iso = document.getElementById('isoinput').value, 
  fp = document.getElementById('fpinput').value,
  dist = document.getElementById('distinput').value;

  // error if no GN
  if ( !gn ) {
    outputWriter("Error: please enter a Guide Number.");
    console.log("Error: please enter a Guide Number.");
    return 0;
  }

  // checks to see that exactly 1 non-Guide Number field is left blank 
  // seems to work, will test more
  if ( (!ap && (!iso || !fp || !dist)) || (!iso && (!fp || !dist)) || (!fp && !dist) || (ap && iso && fp && dist) ) {
    console.log("Error: please leave only one field blank.");
    outputWriter("Error: please leave exactly one field blank, not including Guide Number.");
    return 0;
  } else if ( !ap ) {
    calculateAperture(gn, iso, fp, dist);
  } else if ( !dist ) {
    calculateDistance(gn, ap, iso, fp);
  } else if ( !fp ) {
    calculateFlashPower(gn, ap, iso, dist); 
  } else if ( !iso ) {
    calculateISO(gn, ap, fp, dist);
  } else {
    console.log("Unknown error occurred in calculate method.");
  }
}

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


// four exposure calculations
function calculateAperture(gn, iso, flashPower, dist) {
  var isoMod = logBase2(iso/100),
  fpMod = -(logBase2(Math.pow(flashPower, -1)));
  
  var ev = Math.pow(Math.SQRT2, (isoMod + fpMod)),
  ap = Math.round(((gn / dist) * ev) * 100) / 100;

  outputWriter(ap);
}

function calculateDistance(gn, aperture, iso, flashPower) {
  var isoMod = -(logBase2(iso/100.0)),
  fpMod = logBase2(Math.pow(flashPower, -1.0)),
  apMod = logSqrt2(aperture);

  var ev = Math.pow(Math.SQRT2, (isoMod + apMod + fpMod)),
  dist = Math.round(gn / ev);

  outputWriter(dist);
}

function calculateFlashPower(gn, aperture, iso, dist) {
  var isoMod = -(logBase2(iso/100.0)),
  apMod = logSqrt2(aperture);

  var fpMod = -(logSqrt2(gn / dist) - (isoMod + apMod)),
  flashPower = Math.pow(2, fpMod);
  
  outputWriter(flashPower);
}

function calculateISO(gn, aperture, flashPower, dist) {
  var fpMod = logBase2(Math.pow(flashPower, -1.0)), 
  apMod = logSqrt2(aperture);
  
  var isoMod = -(logSqrt2(gn / dist)) + (fpMod + apMod),
  iso = Math.pow(2, isoMod) * 100; 
  
  outputWriter(iso);
}
