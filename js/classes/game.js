import { Grid } from "./grid.js";

export class Game {

    constructor(){

        // Waiting to chose how many player will play and then initialize the game
        $("#startButton").on("click", () => {
            if($("#twoPlayers").is(":checked")) {
                $("#start").hide();
                let grid = new Grid(8,8);
                grid.generateGrid();  
                grid.initGrid(2,6);
                grid.players[0].startTurn(grid); 
            }
            if($("#threePlayers").is(":checked")) {
                $("#start").hide();
                let grid = new Grid(8,8);
                grid.generateGrid();  
                grid.initGrid(3,6);
                grid.players[0].startTurn(grid); 
            }
            if($("#fourPlayers").is(":checked")) {
                $("#start").hide();
                let grid = new Grid(8,8);
                grid.generateGrid();  
                grid.initGrid(4,6);
                grid.players[0].startTurn(grid); 
            }
        });
    }  
}