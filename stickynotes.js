status1 = "";
results1 = [];

function preload() {
    img = loadImage('Sticky_Notes.jpeg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    results1 = results;
}

function draw() {
    image(img, 0, 0, 380, 380);
    if (status1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);
        for(i = 0; i < results1.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("object_img").innerHTML = "Number of objects in the image: 4";
            document.getElementById("num_objects").innerHTML = "Number of objects detected: " + results1.length;
            fill(r, g, b);
            percent = floor(results1[i].confidence * 100);
            text(results1[i].label + " " + percent + "%", results1[i].x + 15, results1[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(results1[i].x, results1[i].y, results1[i].width, results1[i].height);
        }
    }
}