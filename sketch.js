let points = []

let nx = 0;
let ny = 0;

let nv = 0.001;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let nv = random(0.0005, 0.001)

  angleMode(DEGREES)

  const centerX = width / 2
  const centerY = height / 2
  const radius14 = width / 2.5
  const radius23 = width + random(-100, 100);

  for (let i = 0; i < 360; i += 0.1) {

    let p1 = {
      x: centerX + radius14 * cos(i),
      y: centerY + radius14 * sin(i),
    };
    let p4 = {
      x: centerX - radius14 * cos(i + 10),
      y: centerY - radius14 * sin(i + 10),
    };

    let offset = abs(centerX - radius23);
    let angle2 = noise(nx, ny) * 360;

    const mag = 1

    nx += nv;
    ny += nv;
    let p2 = {
      x: centerX + offset * cos(i + angle2),
      y: centerY + offset * sin(i + angle2),
      vx: random(-mag * cos(i + angle2), mag * cos(i + angle2)),
      vy: random(-mag * sin(i + angle2), mag * cos(i + angle2)),
    };
    let p3 = {
      x: centerX - offset * cos(i + angle2),
      y: centerY - offset * sin(i + angle2),
    };

    let p = {
      p1: p1,
      p2: p2,
      p3: p3,
      p4: p4,
    };
    points.push(p);
  }

}

function draw() {
  background(20);

  stroke(255);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let p of points) {

    let p1 = p.p1;
    let p2 = p.p2;
    let p3 = p.p3;
    let p4 = p.p4;

    // fill('red')
    // circle(p1.x, p1.y, 5);

    // fill('green')
    // circle(p2.x, p2.y, 5);

    // fill('blue')
    // circle(p3.x, p3.y, 5);

    // fill('yellow')
    // circle(p4.x, p4.y, 5);

    let hyp2 = dist(p2.x, p2.y, centerX, centerY);
    let hyp3 = dist(p3.x, p3.y, centerX, centerY);
    let angleP2ToCenter = atan2(p2.y - centerY, p2.x - centerX);
    let angleP3ToCenter = atan2(p3.y - centerY, p3.x - centerX);

    let newX2 = cos(angleP2ToCenter + 1) * hyp2 + centerX;
    let newY2 = sin(angleP2ToCenter + 1) * hyp2 + centerY;

    let newX3 = cos(angleP3ToCenter - 1) * hyp3 + centerX;
    let newY3 = sin(angleP3ToCenter - 1) * hyp3 + centerY;

    p2.x = newX2;
    p2.y = newY2;

    p3.x = newX3;
    p3.y = newY3;


    noFill();
    stroke(255, 5);
    bezier(p1.x, p1.y, p3.x, p3.y, p2.x, p2.y, p4.x, p4.y)
  }
}
