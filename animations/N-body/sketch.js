const NUMMOVERS = 4;

let movers = [];
let sun;

let t = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    canvasSettings();
    sun = new Mover(x = 0, y = 0, vx = 0, vy = 0, m = 1000);
    createMovers();
}

const createMovers = () => {

    const posLst = [
        createVector(0, 0),
        createVector(width / 2, height / 2),
        createVector(width, height),
        createVector(width, 0),
    ]

    for (let i = 0; i < NUMMOVERS; i++) {
        let pos = p5.Vector.random2D();
        // let pos = posLst[i];
        let vel = pos.copy();
        vel.setMag(random(5, 30));
        pos.setMag(random(100, 150));
        vel.rotate(PI / 2);
        let m = random(100, 100);
        movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
    }
}

const canvasSettings = () => {
    frameRate(60);
    colorMode(HSB);
    pixelDensity(1);
    rectMode(CENTER);
    strokeWeight(8);
}

function drawGradAt(x, y, endx, endy, t) {
    let grad = drawingContext.createLinearGradient(
        x, y, endx, endy
    );
    grad.addColorStop(0, color(t % 360, 100, 100, 100));
    grad.addColorStop(0.3, color((t + 30) % 360, 70, 70, 100));

    drawingContext.strokeStyle = grad;
    drawingContext.fillStyle = grad;
}

function draw() {
    background(0, 0.15);
    translate(width / 2, height / 2);
    beginShape();
    for (const mover of movers) {
        sun.attract(mover);
        for (const other of movers) {
            if (mover !== other) {
                mover.attract(other);
            }
            drawGradAt(mover.pos.x, mover.pos.y,
                other.pos.x, other.pos.y, t);
            line(mover.pos.x, mover.pos.y,
                other.pos.x, other.pos.y);

        }
    }
    endShape();

    for (let mover of movers) {
        mover.update();
        drawGradAt(mover.pos.x, mover.pos.y,
            mover.r, mover.r, t);
        mover.show();
    }

    t += 1;
    t = t % 360;
}