import React from 'react';
import styles from './Game.module.css';
import Button from './buttons/Button';
import Board from './Board/Board';
import firebase from 'firebase/compat';
import { rerenderTree } from '../index';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            score: this.props.score,
        }
    }

    newGame = () => {
        let count = this.state.score;
        ++count;
        this.setState({
            score: count,
        })
    }

    finishGame = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        firebase.database().ref('users/' + uid).set({
            name: this.state.name,
            score: this.state.score,
        });
        setTimeout(rerenderTree, 500)
    }
    render() {
        return (
            <div className={styles.game}>
                <div className={styles.wrapper}>
                    <div className={styles.game__board}>
                        <div className={styles.game__box}>
                            <div className={styles.game__img}>
                                <img className={styles.game__images} src='img/User.png'></img>
                            </div>
                            <div className={styles.game__current}>{`${this.props.name} ${this.state.score}-я игра`}</div>
                        </div>
                        <Board/>
                    </div>
                    <div className={styles.game__info}>
                        <p className={styles.game__title}>The game</p>
                        <button className={styles.game__link} onClick={this.newGame}>New game</button>
                        <Button text='Finish game' finishGame={this.finishGame}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Game;

