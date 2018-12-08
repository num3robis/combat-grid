import { Cell } from './cell.js';
import { Player } from './player.js';
import { Weapon } from './weapon.js'; 

export class Grid {

    constructor (width, height) {
        this.height = height;
        this.width = width;
        this.players = [];
        this.weapons = [new Weapon("weapon1" , 15), 
        new Weapon("weapon2", 25),
        new Weapon("weapon3", 20), 
        new Weapon("weapon4", 22)]; 
    }
    
    generateGrid(){   

        //Table creation
        $(".container").append("<table id=\"frame\"></table>");

        let grid = [];
        for (var i = 0; i < this.height; i++) {
            grid[i] = [];
            //Line creation
            let tr = $("<tr class='row'></tr>");
            $("#frame").append(tr);
            for (var j = 0; j < this.width; j++) {
                //Cell creation
                grid[i].push(new Cell(i, j, tr));
            }; 
            this.grid = grid;
        }return grid;
    }

    initGrid(players, obstacles){

        // Loop with all the positions available
        let randomGrid = []; 
        for (var i = 0; i < this.height; i++){
            for (var j = 0; j < this.width; j++){
                randomGrid.push([i,j]);                
            }
        }

        // Creation of a random grid to place x players, walls and weapons
        this.shuffle(randomGrid);

        // Start of a loop to place players
        for (let i = 0; i < players; i ++){
            // Need to find a cell, for now null
            let cell = null;
            // Let's loop on the array to find a cell not near a player!! 
            for (let j = 0; j < randomGrid.length; j++){
                // Take a cell, in the randomGrid
                let otherCell = this.grid[randomGrid[j][0]][randomGrid[j][1]];
                let isAdjacent = false;
                //Now let's loop again to check if this cell is near another player
                for (let k = 0; k < i; k++){
                    // use of method to check if near another player
                    if(this.players[k].isAdjacent(otherCell)){
                        // if true let's end the loop 
                        isAdjacent = true;
                        break;
                    }  
                }
                //if false then this cell isn't near another player
                if(!isAdjacent){
                    // Fill cell with this really interesting cell
                    cell = otherCell;
                    // Delete this finally not so interesting cell
                    randomGrid.splice(j,1);
                    // Can break since we found the one we need
                    break;
                }
            }
            // Create new player
            let player = new Player(cell, i + 1);

            // Interface creation
            $(`<div id="player-card-${i + 1}" class="card" style="width: 18rem;">
            <div class="card-body">
              <h3 class="card-title">Player ${i + 1}</h3>
              <p><span class="healthPoints-${player.playerId}">${player.healthPoints}</span>/100</p>
              <div hidden id="fighting-buttons-${i+1}">
                <button class="btn btn-primary attack">Attack</button>
                <button class="btn btn-primary defense">Defend</button>
              </div>
            </div>
            </div>`).appendTo("#interface");
            $(player.weapon.htmlElement).appendTo($(`#player-card-${player.playerId} .card-body`));
            this.players.push(player);
            cell.player = player;
        }

        // Obstacles
        for (let i = 0; i < obstacles; i++){
            let o = this.grid[randomGrid[i][0]][randomGrid[i][1]];
            o.accessible = false;
            let htmlElement = $(`<div class="obstacle"></div>`);
            o.td.append(htmlElement);
        }

        // Remove non-accessibles cells because of the obstacles from the grid
        randomGrid.splice(0 , obstacles);

        // Weapons
        for (let i = 0; i < this.weapons.length; i++){
            let w = this.grid[randomGrid[i][0]][randomGrid[i][1]];
            this.weapons[i].placeOnCell(w);
        }
    }

    // Shuffling Method
    shuffle(tab) {
        for (let i = tab.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp =tab[i];
            tab[i] = tab[j];
            tab[j] = temp;
        }
        return tab;
    }
    
    // Checking where the player can go
    getAccessiblesCells(numberPossible, playerCell) {

        let result = [];
        
        // loop looking up
        for(var i = 1; i < numberPossible+1; i++){
            if(playerCell.y-i < 0){
                break;
            }
            let checkedCell = this.grid[playerCell.x][playerCell.y-i];
            if(!checkedCell.accessible || checkedCell.player != null){
                break;
            }
            result.push(checkedCell);
        }

        // loop looking down
        for(var i = 1; i < numberPossible+1; i++){
            if(playerCell.y+i >= this.height){
                break;
            }
            let checkedCell = this.grid[playerCell.x][playerCell.y+i];
            if(!checkedCell.accessible || checkedCell.player != null){
                break;
            }
            result.push(checkedCell);
        }

        // loop looking left
        for(var i = 1; i < numberPossible+1; i++){
            if(playerCell.x-i < 0){
                break;
            }
            let checkedCell = this.grid[playerCell.x-i][playerCell.y];
            if(!checkedCell.accessible || checkedCell.player != null){
                break;
            }
            result.push(checkedCell);
        }

        // loop looking right
        for(var i = 1; i < numberPossible+1; i++){
            if(playerCell.x+i >= this.width){
                break;
            }
            let checkedCell = this.grid[playerCell.x+i][playerCell.y];
            if(!checkedCell.accessible || checkedCell.player != null){
                break;
            }
            result.push(checkedCell);
        }
        // array with all accessibles cells around a selected cell
        return result;
    }     
}                 
