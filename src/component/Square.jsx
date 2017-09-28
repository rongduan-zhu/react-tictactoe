import React from 'react';
import classes from './Square.scss';

export function Square(props) {
    return (
        <button key={props.identifier} className={classes.square} onClick={props.onClick} disabled={props.disabled}>
            { props.value }
        </button>
    )
}
