export class Weapon {

    constructor( imgClass, damagePoints ){
        this.imgClass = imgClass;
        this.damagePoints = damagePoints;
        this.htmlElement = $(`<div class="weapon ${imgClass}"></div>`);
    }

    // Put weapon on a cell
    placeOnCell(cell) {
        cell.td.append(this.htmlElement);
        cell.weapon = this;
    }

    // Placing a weapon in his inventory, in the interface and in his hand
    placeOnPlayer(player) {
        $(player.cell.weapon.htmlElement).appendTo($(`#player-card-${player.playerId} .card-body`));
        $(player.weapon.htmlElement).appendTo($(player.cell.td));
        $(player.weapon.htmlElement).hide();
        let weaponPlayer = player.weapon;
        player.weapon = this;
        player.cell.weapon = weaponPlayer;
    }
}