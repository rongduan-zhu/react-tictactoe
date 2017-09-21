import React from 'react';
import { Square } from './Square.jsx';

export class Board extends React.Component {
    renderSquare(id) {
        return (
            <Square value={id} />
        );
    }

    renderRow(baseId) {
        return (
            <div className="row">
                {[...new Array(3)].map((_, i) => (this.renderSquare(baseId + i)))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {[...new Array(3)].map((_, i) => (this.renderRow(i * 3)))}
            </div>
        );
    }
}
