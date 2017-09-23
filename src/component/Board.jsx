import React from 'react';
import { Square } from './Square.jsx';
import { find } from 'lodash';

export class Board extends React.Component {
    constructor() {
        super();
        this.state = this.init();
    }

    init() {
        return {
            squares: Array(9).fill(undefined),
            player: 'X',
            winner: '',
            finished: false
        };
    }

    handleClick(id) {
        if (this.state.squares[id]) {
            return;
        }

        let newSquares = this.state.squares.slice();
        let newPlayer = this.nextPlayer(this.state.player);

        newSquares[id] = this.state.player;

        let winner = this.checkWinner(newSquares);

        this.setState({
            squares: newSquares,
            player: newPlayer,
            winner: winner,
            finished: !!winner
        });
    }

    checkWinner(squares) {
        let states = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let winningState = find(
            states,
            state => !!state[0] && squares[state[0]] == squares[state[1]] && squares[state[1]] == squares[state[2]]
        );

        if (!winningState) {
            return '';
        }

        return squares[winningState[0]];
    }

    nextPlayer(state) {
        return state === 'X' ? 'O' : 'X';
    }

    reset() {
        this.setState(this.init());
    }

    renderSquare(id) {
        return (
            <Square value={this.state.squares[id]}
                onClick={() => this.handleClick(id)}/>
        );
    }

    renderRow(baseId) {
        return (
            <div className="row">
                {[...Array(3)].map((_, i) => (this.renderSquare(baseId + i)))}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Current Player: {this.state.player}</h1>
                <h1>Next Player: {this.nextPlayer(this.state.player)}</h1>
                <h1>Winner is: {this.state.winner}</h1>
                <button onClick={() => this.reset()}>Reset</button>
                {[...Array(3)].map((_, i) => (this.renderRow(i * 3)))}
            </div>
        );
    }
}
