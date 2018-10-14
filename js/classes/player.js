export class Player{

    constructor(cell, playerId){
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
    
    // fonction du joueur start turn qui aura besoin de la grille (donc a appeler dans game)
    // rajouter un event listener au click (conseillé jquery onclick pour être plus pratique a enlever)
    // ce click va prendre un callback
    // mettre à jour les informations (la case)
    // ensuite passer au tour suivant mais si on rappelle la case on va se retrouver avec les cases précédentes avec toujours un event listener
    // nettoyer les cases après le callback 
    
    // faire une methode de joueur pour s'occupper du déplacement
    // comme le tour est cyclique, utiliser le modulo, quand tu es au joueur 0 pour avoir le joueur
    // le modulo aura toujours la valeur qu'on lui aura donné avant ça reviendra toujours à 0 automatiquement
    // une fois arrivé à 4 on fait plus 1 pour revenir à 0 et alors revenir au joueur 0 

    startTurn(difficulty, grid){
        console.log(this.cell);
        let accessiblesCells = grid.getAccessiblesCells( 3, this.cell);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).addClass('accessible');
            $(possibility.td).on('click', () => {
                this.move(possibility, accessiblesCells);
            });
        }
    }

    move(target, accessiblesCells){
        this.cell = target; 
        this.cell.td.append(this.htmlElement);
        for (let i = 0; i < accessiblesCells.length; i++){
            let possibility = accessiblesCells[i];
            $(possibility.td).removeClass('accessible');
            $(possibility.td).off();
        }
    }
}