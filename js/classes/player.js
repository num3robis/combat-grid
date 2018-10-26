import { Weapon } from "./weapon";

export class Player{

    constructor(cell, playerId){
        this.cell =  cell; 
        this.playerId = playerId;
        this.weapon = new Weapon(4);
        this.healthPoints = 100;
        this.htmlElement = $(`<div class="player" id="player${this.playerId}"></div>`);
        cell.td.append(this.htmlElement);

        switch(this.playerId){
            case 0: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/angelBlueC.png")'); 
                break;
            case 1: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/angelRed.png")'); 
                break;
            case 2: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/angelOrange.png")');
                break;
            case 3: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/angelSilver.png")');
                break;
            default:                
            $(this.htmlElement).css('background-image', 'url("../../../ressources/angelBlueC.png")'); 
        }
    }  
     
    isAdjacent(cell){
        return this.cell.isAdjacent(cell);
    }

    startTurn(difficulty, grid){
        console.log(this.cell);
        let accessiblesCells = grid.getAccessiblesCells( 3, this.cell);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).addClass('accessible');
            $(possibility.td).on('click', () => {
                this.move(possibility, accessiblesCells);
                grid.players[(this.playerId + 1) % grid.players.length].startTurn(difficulty, grid); 
            });
        }
    }

    move(target, accessiblesCells){
        this.cell.player = null;
        target.player = this;
        this.cell = target; 
        this.cell.td.append(this.htmlElement);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).removeClass('accessible');
            $(possibility.td).off();
        }
    }
}