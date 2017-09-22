import React from 'react';
import { Square } from './Square.jsx';

export class Board extends React.Component {
    constructor() {
        super();
        this.state = this.init();
    }

    init() {
        return {
            squares: Array(9).fill(undefined),
            player: 'X',
            winner: ''
        };
    }

    handleClick(id) {
        if (this.state.squares[id]) {
            return;
        }

        let newSquares = this.state.squares.slice();
        let newPlayer = this.nextPlayer(this.state.player);

        newSquares[id] = this.state.player;

        this.setState({
            squares: newSquares,
            player: newPlayer
        });
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
                <button onClick={() => this.reset()}>Reset</button>
                {[...Array(3)].map((_, i) => (this.renderRow(i * 3)))}
            </div>
        );
    }
}
