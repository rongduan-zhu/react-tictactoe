import React from 'react';
import { Board } from './Board.jsx';
import { last, find } from 'lodash';

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
            winner: ''
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
                        <div key={i}>
                            Player {this.otherPlayer(state.player)} made a move at {this.getPosition(state.prevMove)}
                        </div>
                    )
                })}
            </div>
        );
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

        newHistory.push({
            squares: newSquares,
            player: newPlayer,
            prevMove: id
        });

        this.setState(Object.assign({}, this.state, { history: newHistory, winner: winner }));
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
        let currentState = last(this.state.history);

        return (
            <div>
                <div>
                    <div>Current player is: {currentState.player}</div>
                    <div>Winner is: {this.state.winner}</div>
                    <button onClick={() => this.reset()}>Restart</button>
                    <Board player={currentState.player}
                        squares={currentState.squares}
                        finished={!!this.state.winner}
                        onClick={id => this.handleClick(id)} />
                </div>
                <div>
                    {this.renderHistory()}
                </div>
            </div>
        )
    }
}
