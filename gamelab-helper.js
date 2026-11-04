// Game Lab helper: lets code written in code.org Game Lab run in a normal browser.
// You do not need to change this file. Put your Game Lab code in game.js.
var __gameCode = "";

function preload() {
  // 1. Read game.js as text
  var request = new XMLHttpRequest();
  request.open("GET", "game.js", false);
  request.send();
  __gameCode = request.responseText;
  // 2. Find every setAnimation("name") and load animations/name.png
  var animations = p5.prototype._predefinedSpriteAnimations = {};
  var found = __gameCode.match(/setAnimation(Each)?\(\s*["'][^"']+["']/g) || [];
  found.forEach(function (piece) {
    var name = piece.split(/["']/)[1];
    if (animations[name]) return;
    var file = findPicture("animations/" + name);
    if (file) animations[name] = loadAnimation(file);
  });
}

// Look for name.png, then name.jpg, then name.jpeg
function findPicture(path) {
  var endings = [".png", ".jpg", ".jpeg"];
  for (var i = 0; i < endings.length; i++) {
    var check = new XMLHttpRequest();
    check.open("HEAD", path + endings[i], false);
    check.send();
    if (check.status === 200) return path + endings[i];
  }
  showError("Missing picture: put " + path + ".png (or .jpg) in your project folder.");
  return null;
}

function showError(message) {
  var box = document.getElementById("errors");
  if (box) box.textContent = box.textContent + " " + message;
}

function setup() {
  createCanvas(400, 400);
  try {
    (0, eval)(__gameCode + "\n//# sourceURL=game.js");
  } catch (error) {
    showError("Error in game.js: " + error.message);
    throw error;
  }
}

// Game Lab commands that p5.play does not have
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var __sounds = {};
function playSound(file, loop) {
  stopSound(file);
  var audio = new Audio(file);
  audio.loop = !!loop;
  audio.play();
  __sounds[file] = audio;
}
function stopSound(file) {
  if (file === undefined) { Object.keys(__sounds).forEach(stopSound); return; }
  if (__sounds[file]) { __sounds[file].pause(); delete __sounds[file]; }
}
function playSpeech(words) {
  if (window.speechSynthesis) speechSynthesis.speak(new SpeechSynthesisUtterance(words));
}
function showMobileControls() {}
