import React from 'react';
import styles from './Board.module.css';
import calculateWinner from './calculateWinner';

function Square(props) {
    return (
        <button className={styles.square}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
    
    renderSquare(i) {
        return (
            <Square
            value = {this.state.squares[i]}
            onClick={()=> this.handleClick(i)}
            />
        );
    }
    render() {
        let status;
        const winner = calculateWinner(this.state.squares);
        if(winner) {
            status = 'Выиграл ' + winner;
            this.state = {
                squares: Array(9).fill(null),
            }
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div>
                <div className={styles.status}>{status}</div>
                <div className={styles.board__row}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={styles.board__row}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={styles.board__row}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
