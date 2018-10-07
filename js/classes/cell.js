export class Cell {

    constructor (rowIndex, colIndex, trDaddy ) {
        this.row = rowIndex;
        this.col = colIndex;
        this.trDaddy = trDaddy;   
        this.accessible = true;
        this.player = null;     
        let td = $(`<td class="cell" data-row="${this.row}" data-col="${this.col}"></td>`);
        this.td = td;
        $(trDaddy).append(td);
        this.x = this.row;
        this.y = this.col;
    }

    isAdjacent(cell){
        if(this.x === cell.x ){
            return this.y === cell.y+1 || this.y ===  cell.y-1;
        }else if(this.y===cell.y){
            return this.x=== cell.x+1 || this.x === cell.x-1;
        }
        return false;
    }
}