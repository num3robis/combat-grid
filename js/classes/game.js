import { Grid } from "./grid.js";


export class Game {

    constructor(difficulty){
        let grid = new Grid(8,8);
        this.difficulty = difficulty;
        grid.generateGrid();  
        grid.initGrid(4,4,6);
        grid.players[1].startTurn(difficulty, grid);        
        $('button').click(function(){
            console.log(this);
        }.bind(this));
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
}