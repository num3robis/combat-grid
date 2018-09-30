import { Cell } from './cell.js';
import { Player } from './player.js';
import { Weapon } from './weapon.js'; 

export class Grid {

    constructor ( width , height ) {
        this.height = height;
        this.width = width;
        this.players = [];
        this.weapons = [];
    }
    
    generateGrid(){   

        //Table creation
        $("body").append("<table id=\"frame\"></table>");

        let grid = [];
        for (var i = 0; i < this.height; i++) {
            grid[i] = [];
            //Line creation
            let tr = $("<tr class='row'></tr>");
            $("#frame").append(tr);
            for (var j = 0; j < this.width; j++) {
                //Cell creation
                grid[i].push(new Cell(i, j, tr));
            }; 
            this.grid = grid;
        }return grid;
    };

    initGrid(players, weapons, obstacles){

        // Loop with all the positions available
        let randomGrid = []; 
        for (var i = 0; i < this.height; i++){
            for (var j = 0; j < this.width; j++){
                randomGrid.push([i,j]);                
            }
        }

        // Creation of a random grid to place x players, walls and weapons
        this.shuffle(randomGrid);

        // Start of a loop to place players
        for (let i = 0; i < players; i ++){
            // Need to find a cell, for now null
            let cell = null;
            // Let's loop on the array to find a cell not near a player!! YAY    
            for (let j = 0; j < randomGrid.length; j++){
                // Take a cell, in the randomGrid
                let otherCell = this.grid[randomGrid[j][0]][randomGrid[j][1]];
                let isAdjacent = false;
                //Now let's loop again to check if this cell is near another player
                for (let k = 0; k < i; k++){
                    // use of method to check if near another playah
                    if(this.players[k].isAdjacent(otherCell)){
                        // if true let's end this RIGHT NOW !!! 
                        isAdjacent = true;
                        break;
                    }  
                }
                // if adjacent if false then this cell isn't near another playah
                if(!isAdjacent){
                    // Fill cell with this really interesting cell
                    cell = otherCell;
                    // Delete this finally not so interesting cell
                    randomGrid.splice(j,1);
                    // Can break since we found DA ONE
                    break;
                }
            }
            // Create new player
            this.players.push(new Player(cell, i));
            // Now, loop for all players, watch out for because if i got 99 players cell can be null
        }
        
        // faire des fonctions avec des places qui ne sont pas adjacentes 
        // ligne 56 (meme 54 si on est foufou) à 63, est-ce que cette cellule est déjà placé (arg: cell)

        for (let i = 0; i < obstacles; i++){
            let o = this.grid[randomGrid[i][0]][randomGrid[i][1]];
            let htmlElement = $(`<div class="obstacle" ></div>`);
            o.td.append(htmlElement);
        }

        randomGrid.splice(0 , obstacles);

        for (let i = 0; i < weapons; i++){
            let w = this.grid[randomGrid[i][0]][randomGrid[i][1]];
            this.weapons.push(new Weapon(w, i));
        }        
    }
    // methode dans players
    // dans le callback du click qui déclenche le tour du joueur suivant
    // faire en parametres le nombre de cases sur lesquelles on peut se promener (on peut souvent se poser cette question )
    // chercher en fonction de la place ou se situe la case et faire des calculs en soustractions et additions
    // on peut boucler dans chaque direction de 0 à N 
    // si c'est x qui n'existe pas, en dessous de zero ou en dessous il faut s'arreter la (break)
    // deuxiè-me condition si il y a un mur
    // quatre boucle dans chaque direction moyen de factoriser
    // décider de -n à n dans la boucle, en ignorant zéro (qui est la case sur laquelle est le joueur)
    // une fois ce tableau de case accessible, stocker, et boucler sur chaque élément la classe css de la couleur occupée
    // retourner sur ce tableau pour supprimer les event listener et les couleurs pour éviter que le joueur puisse aller sur
    // les cases de l'adversaires, en gros réinitialiser le tableau 

    shuffle(tab) {
        for (let i = tab.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp =tab[i];
            tab[i] = tab[j];
            tab[j] = temp;
        }
        return tab;
    }

    checkAdjacentPlayer(player, randomTab){
        for (let i = 0; i < randomTab.length; i++){
            for(let i = 0; i < randomTab.lenght; i++){
                let toto = player.isAdjacent(randomTab[i+1]);
                if (toto === true){
                    return [randomTab[i].x,randomTab[i].y]
                }
            }
        }
        return false
    }

    killAdjacentPlayer(tab){
        
    }
}