import { Grid } from "./grid.js";

export class Game {

    constructor(difficulty){
        let grid = new Grid(8,8);
        this.difficulty = difficulty;
        grid.generateGrid();  
        grid.initGrid(4,6);
        grid.players[0].startTurn(difficulty, grid); 
    }  
}