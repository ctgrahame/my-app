export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export function genCoordinatesArray(squareIndex){
  let row = 3;
  let column = 3;
  let arr = [];
  for( let c = 0; c < column ; c++){
    for( let r = 0; r < row; r++){
      arr.push({c, r});
    }
  }
  return arr[squareIndex];  
}