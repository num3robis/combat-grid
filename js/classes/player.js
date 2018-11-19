import { Weapon } from './weapon.js'; 

export class Player {

    constructor( cell, playerId ){
        this.cell =  cell; 
        this.playerId = playerId;
        this.weapon = new Weapon("weapon0", 10);
        this.healthPoints = 100;
        this.defense = false;
        this.htmlElement = $(`<div class="player player${this.playerId}" id="player${this.playerId}"></div>`);
        cell.td.append(this.htmlElement);
        console.log(this.weapon.htmlElement);
        $(this.weapon.htmlElement).appendTo($(`#player-card-${this.playerId} .card-body`));
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
                grid.players[(this.playerId) % grid.players.length].startTurn(difficulty, grid); 
            });
        }
    }

    move(target, accessiblesCells){
        this.cell.player = null;
        target.player = this;
        if(this.cell.weapon){
            this.cell.weapon.htmlElement.show();
        }
        this.cell = target; 
        this.cell.td.append(this.htmlElement);
        if(this.cell.weapon){
            this.cell.weapon.placeOnPlayer(target.player);
        }
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).removeClass('accessible');
            $(possibility.td).off();
        }
    }
}