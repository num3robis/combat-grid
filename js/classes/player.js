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
        $(this.weapon.htmlElement).appendTo($(`#player-card-${this.playerId} .card-body`));
    }  
    
    // Compare adjacent cell with the cell of the player
    isAdjacent(cell){
        return this.cell.isAdjacent(cell);
    }

    // Initiate the first turn to begin the game
    startTurn(grid){
        let accessiblesCells = grid.getAccessiblesCells( 3, this.cell);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).addClass('accessible');
            $(possibility.td).on('click', () => {
                let playersList = grid.players;
                let fight = false;
                this.move(possibility, accessiblesCells);
                // Checking if any player is near, if he is, start fighting 
                for (let i = 0; i < playersList.length; i++){
                    if(this.isAdjacent(playersList[i].cell)){
                        this.fight(playersList[i], grid);
                        fight = true;
                    }
                }
                // If case of a fight just ended, take the next player to start his turn
                if(!fight){
                    let currentTurn = grid.players.indexOf(this);
                    grid.players[(currentTurn + 1) % grid.players.length].startTurn(grid); 
                }
            });
        }
    }

    // Move player and deal with the case where he lands on a weapon
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

    // Managing the combat situation as a whole, calling methods for each specific part
    fight(player, grid){
        console.log("toto")
        $(`#fighting-buttons-${this.playerId}`).removeAttr("hidden");
        $(`#fighting-buttons-${this.playerId} .attack`).off('click').on('click', function(){
            this.attack(player);
            this.nextFightTurn(player, grid, this);
        }.bind(this));
        $(`#fighting-buttons-${this.playerId} .defense`).off('click').on('click', function(){
            this.defense = true;
            this.nextFightTurn(player, grid, this);
        }.bind(this));
    }

    // Substracting health points for the attacked player, and on his interface
    attack(attackedPlayer){
        attackedPlayer.healthPoints -= attackedPlayer.defense ? this.weapon.damagePoints / 2: this.weapon.damagePoints;
        if(attackedPlayer.defense){
            attackedPlayer.defense = false;
            this.weapon.damagePoints * 2;
        }
        $(`.healthPoints-${attackedPlayer.playerId}`).replaceWith(
            `<span class="healthPoints-${attackedPlayer.playerId}">${attackedPlayer.healthPoints}</span>`);
    }

    // Preparing next attack, or next turn if the player is dead, or the end of the game if there is only one fighter left
    nextFightTurn(nextPlayer, grid, attackingPlayer){
        $(`#fighting-buttons-${this.playerId}`).attr("hidden", true);
        if(nextPlayer.healthPoints > 0 && this.healthPoints > 0){
            nextPlayer.fight(this, grid);
        }else{
            $(`.healthPoints-${nextPlayer.playerId}`).replaceWith(
                `<span class="healthPoints-${nextPlayer.playerId}">0</span>`);
            $(nextPlayer.htmlElement).remove();
            grid.players.splice(grid.players.indexOf(nextPlayer),1);
            $(`#fighting-buttons-${nextPlayer.playerId}`).attr("hidden", true);
            nextPlayer.cell.player = null;
            if(grid.players.length == 1){
                window.alert(`Player ${attackingPlayer.playerId} won`);
            }else{
                let currentTurn = grid.players.indexOf(this);
                grid.players[(currentTurn + 1) % grid.players.length].startTurn(grid);
            }
            
        }
    }
}