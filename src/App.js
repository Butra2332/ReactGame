import React from 'react';
import Register from './register/Register';
import Game from './gameField/Game';
import Rating from './rating/Rating';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebase from 'firebase/compat';
import { rerenderTree } from './index';

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            hasAccount: false,
            success: false,
            score: 0,
        }
    };
    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSignUp = () => {
        const {name, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(name, password)
        .then(respons => {
            alert('Вы успешно зарегистрированы! Войдите в свой аккаунт')
            this.setState({
                score: 0,
            })
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            firebase.database().ref('users/' + uid).set({
                name: name,
                score: this.state.score,
            });
        })
        .catch(error => {
            switch(error.code) {
                case 'auth/email-alredy-in-use': 
                alert('Данный email уже используется')
                break;
                case 'auth/user-not-found': 
                alert('Пользователь не найден')
                break;
                case 'auth/invalid-email': 
                alert('Введите корректный email')
                break;
                case 'auth/weak-password': 
                alert('Не надежный пароль')
                break;
                case 'auth/user-disabled': 
                alert('Пользователь заблокирован')
                break;
                default: alert(error.message)  
            }
        })
    }
    handleLogin = () => {
        const { name, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(name, password)
            .then(respons => {
                const user = firebase.auth().currentUser;
                const db = firebase.database().ref('users/' + user.uid);
                db.on('value', (snapshot) => {
                    const data = snapshot.val();
                    this.setState({
                        success: true,
                        name: data.name,
                        score: data.score,
                    })
                })
                setTimeout(rerenderTree, 500)
            })
            .catch(error => {
                this.setState({
                    success: false
                })
                switch (error.code) {
                    case 'auth/email-alredy-in-use':
                        alert('Данный email уже используется')
                        break;
                    case 'auth/user-not-found':
                        alert('Пользователь не найден, пройдите регистрацию')
                        break;
                    case 'auth/invalid-email':
                        alert('Введите корректный email')
                        break;
                    case 'auth/weak-password':
                        alert('Не надежный пароль')
                        break;
                    case 'auth/user-disabled':
                        alert('Пользователь заблокирован')
                        break;
                    default: alert(error.message)
                }
            })
    }
    handleLogOut = () => {
        firebase.auth().signOut();
        this.setState({
            success: false
        })
    }
    SignUptoggle = () => {
        this.setState(
            { hasAccount: true }
        )
    }
    LogIntoggle = () => {
        this.setState(
            { hasAccount: false }
        )
    }
    
    render() { 
        const { hasAccount, name, success, score } = this.state;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Register onChangeInput={this.onChangeInput}
                                                                        handleLogin={this.handleLogin}
                                                                        handleSignUp={this.handleSignUp}
                                                                        SignUptoggle={this.SignUptoggle}
                                                                        LogIntoggle={this.LogIntoggle}
                                                                        hasAccount={hasAccount}
                                                                        success={success}
                            />} />
                        <Route path="/Game" render={() => <Game name={name} score={score} />} />
                        <Route path="/Rating" render={() => <Rating handleLogOut={this.handleLogOut}/>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;



