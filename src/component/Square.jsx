import React from 'react';

export function Square(props) {
    return (
        <button key={props.identifier} className="square" onClick={props.onClick} disabled={props.finished}>
            { props.value }
        </button>
    )
}
