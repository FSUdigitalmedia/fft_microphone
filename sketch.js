function setup() {
  createCanvas(400,400);
  noStroke();

  mic = new p5.AudioIn();
  mic.start();
    
  fft = new p5.FFT();
  fft.setInput(mic); 
  
  amp = new p5.Amplitude();
  amp.setInput(mic);
}

function draw() {
  background(125);

  fft.analyze();

  // overall volume
  fill("black");
  let level = amp.getLevel();
  // map the value to a better range for drawingg the rectangle...
  let levelHeight = map(level, 0,1, 10,300);
  // add a text label (the nf function formats the number with 2 decimal places)
  text("vol:\n"+nf(level,2,2), 10, 16);
  rect(10,40,40,levelHeight);

  // lows
  fill("darkred");
  // let low = fft.getEnergy(100,300); // specific frequencies
  let low = fft.getEnergy("bass");     // or a string (eg: bass, mid, treble)
  let lowHeight = map(low, 0,255, 10,300);
  text("low:\n"+nf(low,2,2), 60, 16);
  rect(60,40,40,lowHeight);

  if (low > 200) console.log("BASSSSSSS!"); // check for an extra high level of bass

  // mids  
  fill("darkgreen");
  // let mid = fft.getEnergy(900,1100);
  let mid = fft.getEnergy("mid");
  let midHeight = map(mid, 0,255, 10,300);
  text("mid:\n"+nf(mid,2,2), 110, 16);
  rect(110,40,40,midHeight);

  // highs
  fill("darkblue");
  // let high = fft.getEnergy(1500,2500);
  let high = fft.getEnergy("treble");
  let highHeight = map(high, 0,255, 10,300);
  text("high:\n"+nf(high,2,2), 160, 16);
  rect(160,40,40,highHeight);
  
}
