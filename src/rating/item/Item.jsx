import React from 'react';
import styles from './Item.module.css';

const Item = ({number, avatar, name, score}) => {
    return (
        <li className={styles.item}>
            <div className={styles.number}>{number}</div>
            <div className={styles.box}>
                <div className={styles.img}>
                    <img className={styles.images} src={avatar} />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.point}>{score}</div>
        </li>
    )
};

export default Item;

