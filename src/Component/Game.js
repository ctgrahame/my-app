import React from 'react';
import Board from '../Component/Board';
import '../index.css';
import {calculateWinner} from '../calc';
import {genCoordinatesArray} from '../calc';


class Game extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      coordinates: [{c:0, r:0}],
      activeIndex: null
    }

  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares)||squares[i]){
        return;
    }

    const coordinates = this.state.coordinates.slice();
    const coords = genCoordinatesArray(i);
    coordinates.push(coords);
            
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      coordinates: coordinates,
     
    });
  }

  jumpsTo(step){
    if(step===0){
      this.setState({
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        coordinates: [{c:null, r:null}],
        activeIndex: null
      })
    } else {
      this.setState({
        stepNumber : step,
        xIsNext: ( step % 2 === 0),
        activeIndex: step
      });
    }

  }


  render() {
      
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const coord = this.state.coordinates;
      const active = this.state.activeIndex;
      
      const moves = history.map(( step, move )=>{
        const desc = move ? 'Go to move #' + move+ ' (  R' + coord[move].c + ', C' + coord[move].r + ' )' : 'Go to game start';
        
        return (
          <li key={move}>
            <button className={ active === move ? 'active' : null } onClick={()=>{ this.jumpsTo(move) } } >{desc}</button>
          </li>
          )
      })

      let status;

      if(winner){
        status = 'Winner is: ' + winner;
      } else {
        status = 'Next player is '+ (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={ current.squares } onClick={ (i)=> this.handleClick(i) } />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            
            <ol >{ moves }</ol>
            
          </div>
        </div>
      );
    }
  }

  export default Game;