import React from 'react';
import styles from './Button.module.css';
import { NavLink } from 'react-router-dom';

const Button = ({text, finishGame}) => {
    return (
        <NavLink className={styles.game__link} to='Rating' onClick={finishGame}>{text}</NavLink>
    )
};

export default Button;

