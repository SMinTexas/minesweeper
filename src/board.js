export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
       		this._numberOfTiles = (numberOfRows * numberOfColumns);
       		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
       		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
       		};  //constructor

		get playerBoard() {
			return this._playerBoard;
		}; //getter

		get bombBoard() {
			return this._bombBoard;
		}; //getter

       		flipTile(rowIndex, columnIndex) {
       			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
          			console.log('This tile has already been flipped!');
          			return;
          		}
          		else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
				this._playerBoard[rowIndex][columnIndex] = 'B';
          		}
          		else {
            			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
          		}
          		this._numberOfTiles--;
       		};//flipTile

  		getNumberOfNeighborBombs(rowIndex, columnIndex) {
     			let neighborOffsets = [
       				[-1, -1],
       				[-1, 0],
       				[-1, 1],
       				[0, -1],
       				[0, 1],
       				[1, -1],
       				[1, 0],
       				[1, 1]
     			];
 
     			const numberOfRows = this._bombBoard.length;
     			const numberOfColumns = this._bombBoard[0].length;
     			let numberOfBombs = 0;
     			neighborOffsets.forEach(offset => {
       				const neighborRowIndex = rowIndex + offset[0];
       				const neighborColumnIndex = columnIndex + offset[1];
       				if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
         				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
           					numberOfBombs++;
         				};
       				};
     			});
 
    			return numberOfBombs;
  			};//getNumberOfNeighborBombs

		hasSafeTiles() {
			return (this._numberOfTiles !== this._numberOfBombs);	
		};//hasSafeTiles

  		print() { 
    			console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  		};//print

  		static generatePlayerBoard(numberOfRows, numberOfColumns) {
    			this._board = [];
    			for(let i = 0; i < numberOfRows; i++) {
      				let row =[];
      				for (let j = 0; j < numberOfColumns; j++) {
        				row.push(' ');
      				};
      				this._board.push(row);
    			};
    			return this._board;
  		};//generatePlayerBoard

  		static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    			this._board = [];
    			for (let i = 0; i < numberOfRows; i++) {
       				let row = [];
       				for (let j = 0; j < numberOfColumns; j++) {
          				row.push(null);
       				};
       				this._board.push(row);
    			};    			
			let numberOfBombsPlaced = 0;
    			while (numberOfBombsPlaced < numberOfBombs) {
      				let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      				let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      				if (this._board[randomRowIndex][randomColumnIndex] !== 'B') {
        				this._board[randomRowIndex][randomColumnIndex] = 'B';
           				numberOfBombsPlaced++;
      				};
    			};
    			return this._board;
  		};//generateBombBoard

}  //Board class

