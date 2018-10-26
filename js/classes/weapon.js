export class Weapon{

    constructor(type){
        // voir stack(shuffle) ou array.sort() avec une fonction d'ordre aléatoire
        // pour selectionner une case pas proche du joueur: splice pour enlever deux élément d'un sous tableau, puis arme enlever 4 élément
        
        // gérer le constructeur 
        this.type = type;
        this.damagePoints = 10;
        this.htmlElement = $(`<div class="weapon" id="weapon${this.type}"></div>`);
        
        
        //ajouter un argument dans le constructeur avec backbground image plutot que le type 
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
            case 4: 
            //ajouter fist
            default: 
                $(this.htmlElement).css('background-image', 'url("../../../ressources/sword.png")');
        }
        
    }
    //methode place en cell (avec argument cell), cell.td.append sera dans cette methode
    placeOnCell(cell) {
        cell.td.append(this.htmlElement);
    }

    // faire placeOnPlayer puis l'appeler dans le constructeur de player, ne pas oublier de mettre à) joueur les liens entre cases armes et joueurs
}