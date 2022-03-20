class Grass {  
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul(){
        const newCell = random(this.chooseCell(0));
        if (this.multiplay >= 5 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1], 1)
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.muplitplay = 0;
        }
        this.multiplay++;
    }

} 


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;

        this.directions = [];
    }

    getCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    chooseCell(character) {
        this.getCordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    
    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);
        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 2;
            grassEaterArr.push(new GrassEater(newX, newY));
            this.energy = 1;
        }
    }
    
    eat() {
        var found = this.chooseCell(1);
        const newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 15) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 2;

            matrix[this.y] [this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }


    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }


}

class Manster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 60;

        this.directions = [];
    }

    getCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    chooseCell(character) {
        this.getCordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    
    mul() {
        var found = this.chooseCell(1);
        var newCell = random(found);
        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;
            mansterArr.push(new Manster(newX, newY));
            this.energy = 1;
        }
    }
    
    eat() {
        var found = this.chooseCell(2 || 4);
        const newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul();
            }
        }
        else {
            this.move();
        }
        
    }


    move() {
        var found = this.chooseCell(0 || 1);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;

            matrix[this.y] [this.x] = 0 || 1;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < -0) {
            this.die();
        }
    }

    die() {
        for (var i in mansterArr) {
            if (this.x == mansterArr[i].x && this.y == mansterArr[i].y) {
                mansterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }

}


class Whoter { 
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul(){
        const newCell = random(this.chooseCell(0));
        if (this.multiplay >= 75 && newCell) {
            const newWhoter = new Whoter(newCell[0], newCell[1], 4)
            whoterArr.push(newWhoter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.muplitplay = 0;
        }
        this.multiplay++;
    }

} 



class Lava { 
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul(){
        const newCell = random(this.chooseCell(0 || 1 || 2 || 3 || 4));
        if (this.multiplay >= 60 && newCell) {
            const newLava = new Lava(newCell[0], newCell[1], 5)
            lavaArr.push(newLava);
            matrix[newCell[1]][newCell[0]] = 5;
            this.muplitplay = 0;
        }
        this.multiplay++;
    }



} 