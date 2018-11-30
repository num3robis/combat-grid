export class Weapon {

    constructor( imgClass, damagePoints ){
        // voir stack(shuffle) ou array.sort() avec une fonction d'ordre aléatoire
        // pour selectionner une case pas proche du joueur: splice pour enlever deux élément d'un sous tableau, puis arme enlever 4 élément
        
        // gérer le constructeur 
        this.imgClass = imgClass;
        this.damagePoints = damagePoints;
        this.htmlElement = $(`<div class="weapon ${imgClass}"></div>`);
    }
    //methode place en cell (avec argument cell), cell.td.append sera dans cette methode
    placeOnCell(cell) {
        cell.td.append(this.htmlElement);
        cell.weapon = this;
    }

    // faire placeOnPlayer puis l'appeler dans le constructeur de player, ne pas oublier de mettre à) joueur les liens entre cases armes et joueurs
    placeOnPlayer(player) {
        $(player.cell.weapon.htmlElement).appendTo($(`#player-card-${player.playerId} .card-body`));
        $(player.weapon.htmlElement).appendTo($(player.cell.td));
        $(player.weapon.htmlElement).hide();
        let weaponPlayer = player.weapon;
        player.weapon = this;
        player.cell.weapon = weaponPlayer;
    }
}