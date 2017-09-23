import React from 'react';
import { Square } from './Square.jsx';
import { find } from 'lodash';

export class Board extends React.Component {
    renderSquare(id) {
        return (
            <Square
                key={id}
                value={this.props.squares[id]}
                onClick={() => this.props.onClick(id)}
                finished={this.props.finished} />
        );
    }

    renderRow(baseId) {
        return (
            <div key={baseId} className="row">
                {[...Array(3)].map((_, i) => (this.renderSquare(baseId + i)))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {[...Array(3)].map((_, i) => (this.renderRow(i * 3)))}
            </div>
        );
    }
}
