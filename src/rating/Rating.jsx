import React from 'react';
import styles from './rating.module.css';
import Title from './title/Title';
import { NavLink } from 'react-router-dom';
import Item from './item/Item';
import firebase from 'firebase/compat';



const Rating = ({handleLogOut}) => {
    
    const data = [];

    const db = firebase.database().ref('users/');
    db.on('value', (snapshot) => {
        const arr = snapshot.val();
        Object.keys(arr).map(item => data.push(arr[item]))
    });
    function sortData(data) {
        return data.sort((a, b) => a.score < b.score ? 1 : -1);
    }
    sortData(data);

    let i = 1;
    const element = data.map((item, index) => {
        const { name, score } = item;
        while (index < 10) {
            return <Item number={i++} avatar='img/User.png' name={name} score={score} />
        }
    })
    
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.box}>
                    <NavLink to='/Game' className={styles.link}>Play again</NavLink>
                    <NavLink to='/' className={styles.link} onClick={handleLogOut}>Log out</NavLink>
                </div>
                <Title />
                <ul className={styles.list}>
                    {element}
                </ul>
            </div>
        </div>
    )  
};

export default Rating;

