var scale, tiles = [], activators = [];

p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  scale = 30;

  for(i = 0; i <= round(width/scale); i++) {
    var t = [];
    for(j = 0; j <= round(height/scale); j++) {
      t.push(new Tile(i * scale, j * scale));
      t[j].randomize();
    }
    tiles.push(t);
  }

  for(i = 0; i < width/scale; i++) {
    activators.push(new Activator());
  }
}

function draw() {
  for(i = 0; i < activators.length; i++) {
    activators[i].update();
  }

  background(0);

  for(i = 0; i < 25; i++) {
    tiles[round(random(0, width/scale))][round(random(0, height/scale))].randomize();
  }

  for(i = 0; i <= round(width/scale); i++) {
    for(j = 0; j <= round(height/scale); j++) {
      tiles[i][j].update();
      tiles[i][j].show();
    }
  }

  //console.log(frameRate());
}

function Activator() {
  this.j = round(random(-200, 0));
  this.i = round(random(0, width/scale));

  this.update = function() {
    this.j++;
    if(this.j > height/scale) {
      this.j = round(random(-200, 0));
      this.i = round(random(0, width/scale));
    }
    if(this.j >= 0 && this.j <= height/scale) tiles[this.i][this.j].activate();
  }
}

function Tile(x, y)  {
  this.x = x;
  this.y = y;
  this.character;
  this.activated = this.fading1 = this.fading2 = false;
  this.red = this.green = this.blue = 0;
  this.addFactor1 = 100, this.addFactor2 = 100, this.addFactor3 = 10;

  this.randomize = function() {
    this.character = String.fromCharCode(0x30A0 + round(random(0, 96)));
  }

  this.show = function() {
    if(this.activated) {
      textSize(scale*0.7);
      fill(this.red, this.green, this.blue);
      text(this.character, this.x, this.y);
    }
  }

  this.activate = function() {
    this.activated = true;
  }

  this.update = function() {
    if(this.activated) {
      if(this.fading1 == false) {
        this.red = constrain(this.red + this.addFactor1, 0, 255);
        this.green = constrain(this.green + this.addFactor1, 0, 255);
        this.blue = constrain(this.blue + this.addFactor1, 0, 255);

        if(this.red == 255) this.fading1 = true;
      } else if(this.fading2 == false) {
        this.red = constrain(this.red - this.addFactor2, 0, 255);
        this.blue = constrain(this.blue - this.addFactor2, 0, 255);

        if(this.red == 0) this.fading2 = true;
      } else {
        this.green = constrain(this.green - this.addFactor3, 0, 255);
        if(this.green == 0) this.activated = this.fading1 = this.fading2 = false;
      }
    }
  }
}

