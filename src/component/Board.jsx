import React from 'react';
import { Square } from './Square.jsx';
import { find } from 'lodash';
import classes from './Board.scss';

export class Board extends React.Component {
    renderSquare(id) {
        return (
            <Square
                key={id}
                value={this.props.squares[id]}
                onClick={() => this.props.onClick(id)}
                disabled={this.props.disabled} />
        );
    }

    renderRow(baseId) {
        return (
            <div key={baseId} className={classes.row}>
                {[...Array(3)].map((_, i) => (this.renderSquare(baseId + i)))}
            </div>
        )
    }

    render() {
        return (
            <div className={classes.board}>
                {[...Array(3)].map((_, i) => (this.renderRow(i * 3)))}
            </div>
        );
    }
}
