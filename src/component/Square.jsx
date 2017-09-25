import React from 'react';

export function Square(props) {
    return (
        <button key={props.identifier} className="square" onClick={props.onClick} disabled={props.disabled}>
            { props.value }
        </button>
    )
}
