/* easier to do logs with a base of SQRT2
via this post: http://stackoverflow.com/questions/3019278/any-way-to-specify-the-base-of-math-log-in-javascript */
function logSqrt2(val) {
  return Math.log(val) / Math.log(Math.SQRT2)
}

// should work
function calculateAperture(gn, iso, flashPower, distance) {
  var isoMod = -(Math.log(iso/100.0,2))
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 
  
  var ev = Math.pow(Math.SQRT2, (isoMod + fpMod)) 
  var ap = ((gn / dist) * ev)
  return ap
}

// should work
function calculateDistance(gn, aperture, iso, flashPower) {
  var isoMod = -(Math.log(iso/100.0,2))
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 
  var apMod = logSqrt2(aperture)

  var ev = Math.pow(Math.SQRT2, (isoMod + apMod + fpMod))
  var dist = gn / ev
  return dist
}

// not yet working
// needs logic to throw exception if fp is larger than 1
function calculateFlashPower(gn, aperture, iso, distance) {
  var iso_mod = -(Math.log(iso/100.0,2))
  var apMod = logSqrt2(aperture)
  
   
}

// not yet working
// maybe logic to round to the nearest 1/3 stop?
function calculateISO(gn, aperture, flashPower, distance) {
  var fpMod = Math.log(Math.pow(flashPower, -1.0)) 
  var apMod = logSqrt2(aperture)

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
