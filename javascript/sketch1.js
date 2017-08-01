p5.disableFriendlyErrors = true;
var size, streams = [], s;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  size = 50;
  

  for(j = 0; j < (width/size)*4; j++) {
    streams[j] = new Stream(round(random(10, 30)), j * size, random(5, 20));
    streams[j].initialize();
  }
}

function draw() {
  background(0);

  for(j = 0; j < streams.length; j++) {
    streams[j].update();
    streams[j].show();
  }
}

function Stream(length, x, speed) {
  this.x = x, this.y, this.speed = speed, this.size = speed * 3, this.length = length;
  this.symbols = [];

  this.initialize = function() {
    this.symbols.splice(0, this.symbols.length);
    this.y = random(this.length*-10*this.size, this.length*-1*this.size);
    for(i = 0; i < this.length; i++) {
      this.symbols[i] = new Symbol(this.x, this.y + i * this.size, 0, map(i, 0, this.length, 0, 255), 0);
    }
  }

  this.show = function() {
    textSize(this.size);
    for(i = 0; i < this.symbols.length; i++) {
      this.symbols[i].show();
    }
  }

  this.update = function() {
    if(random(0, 1) < 0.5) {
      this.symbols[floor(random(0, this.symbols.length - 1))].randomize();
    }

    for(i = 0; i < this.symbols.length; i++) {
      this.symbols[i].y += speed;
    }

    if(this.symbols[0].y > height) {
      this.initialize();
    }
  }
}

function Symbol(x, y, r, g, b) {
  this.character = String.fromCharCode(0x30A0 + round(random(0, 96)));
  this.x = x, this.y = y;
  this.r = r, this.g = g, this.b = b;

  this.show = function() {
    fill(this.r, this.g, this.b);
    text(this.character, this.x, this.y);
  }

  this.randomize = function() {
    this.character = String.fromCharCode(0x30A0 + round(random(0, 96)));
  }
}