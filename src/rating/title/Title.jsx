import React from 'react';
import styles from './Title.module.css';

const Title = (props) => {
    return (
        <div className={styles.title}>
            <p className={styles.text}>Number</p>
            <p className={styles.text}>Player Profile</p>
            <p className={styles.text}>Points</p>
        </div>
    )
};


export default Title;

