import { Grid } from "./grid.js";

export class Game {

    constructor(difficulty){

        let board = new Grid(8,8);
        this.difficulty = difficulty;
        board.generateGrid();  
        board.initGrid(4,4,6);
    }  
}