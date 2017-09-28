import React from 'react';
import { Board } from './Board.jsx';
import { last, find } from 'lodash';

import classes from './Game.scss';

export class Game extends React.Component {
    constructor() {
        super();

        this.state = this.init();
    }

    init() {
        return {
            history: [{
                squares: Array(9).fill(undefined),
                player: 'X',
                prevMove: -1
            }],
            disabled: false,
            winner: '',
            historyToRender: 0
        };
    }

    getPosition(move) {
        if (move === -1) {
            return '';
        }

        let row = parseInt(move / 3) + 1;
        let column = move - (row - 1) * 3 + 1;

        return `(${row}, ${column})`;
    }

    otherPlayer(state) {
        return state === 'X' ? 'O' : 'X';
    }

    renderHistory() {
        return (
            <div>
                {this.state.history.slice(1).map((state, i) => {
                    return (
                        <button key={i} onClick={() => this.travelTo(i + 1)} className={classes.gameHistory}>
                            Player {this.otherPlayer(state.player)} made a move at {this.getPosition(state.prevMove)}
                        </button>
                    )
                })}
            </div>
        );
    }

    travelTo(i) {
        if (i < 0 || i >= this.state.history.length) {
            return;
        }

        let disabled = !!this.state.winner || i !== this.state.history.length - 1;

        this.setState(Object.assign({}, this.state, { historyToRender: i, disabled: disabled }));
    }

    handleClick(id) {
        let state = last(this.state.history);
        if (state.squares[id]) {
            return;
        }

        let newSquares = state.squares.slice();
        let newPlayer = this.otherPlayer(state.player);

        newSquares[id] = state.player;

        let winner = this.checkWinner(newSquares);
        let newHistory = this.state.history.slice();
        let historyToRender = this.state.historyToRender + 1;

        newHistory.push({
            squares: newSquares,
            player: newPlayer,
            prevMove: id
        });

        this.setState(Object.assign({}, this.state, {
            history: newHistory,
            winner: winner,
            disabled: !!winner,
            historyToRender: historyToRender
        }));
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
            state => squares[state[0]] && squares[state[0]] === squares[state[1]] && squares[state[1]] === squares[state[2]]
        );

        if (!winningState) {
            return '';
        }

        return squares[winningState[0]];
    }

    reset() {
        this.setState(this.init());
    }

    render() {
        let stateToRender = this.state.history[this.state.historyToRender];

        return (
            <div className={classes.gameContainer}>
                <div className={classes.game}>
                    <div>Current player is: {stateToRender.player}</div>
                    <div>Winner is: {this.state.winner}</div>
                    <button onClick={() => this.reset()}>Restart</button>
                    <Board player={stateToRender.player}
                        squares={stateToRender.squares}
                        disabled={this.state.disabled}
                        onClick={id => this.handleClick(id)} />
                </div>
                <div>
                    {this.renderHistory()}
                </div>
            </div>
        )
    }
}
