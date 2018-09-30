export class Weapon{

    constructor(cell, type){
        // voir stack(shuffle) ou array.sort() avec une fonction d'ordre aléatoire
        // pour selectionner une case pas proche du joueur: splice pour enlever deux élément d'un sous tableau, puis arme enlever 4 élément
        
        this.cell =  cell; 
        this.type = type;
        this.htmlElement = $(`<div class="weapon" id="weapon${this.type}"></div>`);
        cell.td.append(this.htmlElement);
        
        switch(this.type){
            case 0: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/dagger.png")');
                break;
            case 1: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/hammer.png")');
                break;
            case 2: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/sword.png")');
                break;
            case 3: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/spear.png")');
                break;
            default: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/sword.png")');
        }

    }
}