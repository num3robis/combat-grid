export class Player{

    constructor( cell, playerId){
        this.cell =  cell; 
        this.playerId = playerId;
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
}