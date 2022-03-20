var matrix = []; 

var side = 20;
var grassArr = [];
var grassEaterArr = [];
var mansterArr = [];
var whoterArr = [];
var lavaArr = [];

function generator(grass, grassEater, manster, whoter, lava, matrixSize) {
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push([0]);
        }
    }
    for (let i = 0; i < grass; i++) {
        const x = Math.round(Math.random() * (matrixSize -1));
        const y = Math.round(Math.random() * (matrixSize -1));
        matrix[y][x] = 1;
        grassArr.push(new Grass(x, y));
    }
    for (let i = 0; i < grassEater; i++) {
        const x = Math.round(Math.random() * (matrixSize -1));
        const y = Math.round(Math.random() * (matrixSize -1));
        matrix[y][x] = 2;
        grassEaterArr.push(new GrassEater(x, y));
    }
    for (let i = 0; i < manster; i++) {
        const x = Math.round(Math.random() * (matrixSize -1));
        const y = Math.round(Math.random() * (matrixSize -1));
        matrix[y][x] = 3;
        mansterArr.push(new Manster(x, y));
    }
    for (let i = 0; i < whoter; i++) {
        const x = Math.round(Math.random() * (matrixSize -1));
        const y = Math.round(Math.random() * (matrixSize -1));
        matrix[y][x] = 4;
        whoterArr.push(new Whoter(x, y));
    }
    for (let i = 0; i < lava; i++) {
        const x = Math.round(Math.random() * (matrixSize -1));
        const y = Math.round(Math.random() * (matrixSize -1));
        matrix[y][x] = 5;
        lavaArr.push(new Lava(x, y));
    }
}


function setup() {
    frameRate(5)
    generator(80, 15, 5, 1, 1, 40)
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1))
            }
        }
    }
    console.log(grassArr);
}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#4287f5");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in mansterArr) {
        mansterArr[i].eat();
    }
    for (var i in whoterArr) {
        whoterArr[i].mul();
    }
    for (var i in lavaArr) {
        lavaArr[i].mul();
    }
}


