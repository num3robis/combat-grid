import { Weapon } from './weapon.js'; 

export class Player {

    constructor( cell, playerId ){
        this.cell =  cell; 
        this.playerId = playerId;
        this.weapon = new Weapon("weapon0", 10);
        this.healthPoints = 100;
        this.defense = false;
        this.dead = false;
        this.htmlElement = $(`<div class="player player${this.playerId}" id="player${this.playerId}"></div>`);
        cell.td.append(this.htmlElement);
        console.log(this.weapon.htmlElement);
        $(this.weapon.htmlElement).appendTo($(`#player-card-${this.playerId} .card-body`));
    }  
     
    isAdjacent(cell){
        return this.cell.isAdjacent(cell);
    }

    startTurn(grid){
        console.log(this.cell);
        let accessiblesCells = grid.getAccessiblesCells( 3, this.cell);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).addClass('accessible');
            $(possibility.td).on('click', () => {
                let playersList = grid.players;
                let fight = false;
                this.move(possibility, accessiblesCells); 
                for (let i = 0; i < playersList.length; i++){
                    if(this.isAdjacent(playersList[i].cell)){
                        this.fight(playersList[i], grid);
                        fight = true;
                    }
                }
                if(!fight){
                    let currentTurn = grid.players.indexOf(this);
                    grid.players[(currentTurn + 1) % grid.players.length].startTurn(grid); 
                }
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

    fight(player, grid){
        console.log(this.playerId)
        $(`#fighting-buttons-${this.playerId}`).removeAttr("hidden");
        $(`#fighting-buttons-${this.playerId} .attack`).off('click').on('click', function(){
            console.log("cc tu veux voir mon arme");
            this.attack(player);
            this.nextFightTurn(player, grid);
        }.bind(this));
        $(`#fighting-buttons-${this.playerId} .defense`).off('click').on('click', function(){
            this.defense = true;
            this.nextFightTurn(player, grid);
        }.bind(this));
    }

    attack(attackedPlayer){
        attackedPlayer.healthPoints -= this.defense? this.weapon.damagePoints / 2: this.weapon.damagePoints;
        $(`.healthPoints-${attackedPlayer.playerId}`).replaceWith(
            `<span class="healthPoints-${attackedPlayer.playerId}">${attackedPlayer.healthPoints}</span>`);
    }

    nextFightTurn(nextPlayer, grid){
        $(`#fighting-buttons-${this.playerId}`).attr("hidden", true);
        if(nextPlayer.healthPoints > 0 && this.healthPoints > 0){
            nextPlayer.fight(this, grid);
        }else{
            console.log(`Le joueur ${nextPlayer.playerId} est mooooooort !!!`);
            $(nextPlayer.htmlElement).remove();
            grid.players.splice(grid.players.indexOf(nextPlayer),1);
            $(`#fighting-buttons-${nextPlayer.playerId}`).attr("hidden", true);
            nextPlayer.cell.player = null;
            let currentTurn = grid.players.indexOf(this);
            grid.players[(currentTurn + 1) % grid.players.length].startTurn(grid);
        }
    }
}