document.getElementById("calcbutton").onclick = checker;

function checker() {
  
  // reset the result/error line
  document.getElementById('result').innerHTML = ""

  // get the value of each field
  var gn = document.getElementById('gninput').value,
  ap = document.getElementById('apinput').value,
  iso = document.getElementById('isoinput').value, 
  fp = document.getElementById('fpinput').value,
  dist = document.getElementById('distinput').value;

  // error if no GN
  if ( !gn ) {
    console.log("Error: please enter a Guide Number.");
    document.getElementById('result').innerHTML = "Error: please enter a Guide Number.";
    return;
  }

  // checks to see that exactly 1 non-Guide Number field is left blank 
  // seems to work, will test more
  if ( (!ap && (!iso || !fp || !dist)) || (!iso && (!fp || !dist)) || (!fp && !dist) || (ap && iso && fp && dist) ) {
    console.log("Error: please leave only one field blank.");
    document.getElementById('result').innerHTML = "Error: please leave exactly one field blank, not including Guide Number.";
    return;
  }
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
  var isoMod = logBase2(iso/100);
  var fpMod = -(logBase2(Math.pow(flashPower, -1)));
  
  var ev = Math.pow(Math.SQRT2, (isoMod + fpMod));
  var ap = Math.round(((gn / dist) * ev) * 100) / 100;
  return ap;
}

function calculateDistance(gn, aperture, iso, flashPower) {
  var isoMod = -(logBase2(iso/100.0));
  var fpMod = logBase2(Math.pow(flashPower, -1.0));
  var apMod = logSqrt2(aperture);

  var ev = Math.pow(Math.SQRT2, (isoMod + apMod + fpMod));
  var dist = Math.round(gn / ev);
  return dist;
}

function calculateFlashPower(gn, aperture, iso, dist) {
  var isoMod = -(logBase2(iso/100.0));
  var apMod = logSqrt2(aperture);

  var fpMod = -(logSqrt2(gn / dist) - (isoMod + apMod));
  var flashPower = Math.pow(2, fpMod);
  
  return flashPower;
}

function calculateISO(gn, aperture, flashPower, dist) {
  var fpMod = logBase2(Math.pow(flashPower, -1.0)); 
  var apMod = logSqrt2(aperture);
  
  var isoMod = -(logSqrt2(gn / dist)) + (fpMod + apMod);
  var iso = Math.pow(2, isoMod) * 100 
 
  return iso
}
