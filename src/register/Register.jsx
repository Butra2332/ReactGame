import React from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="register">
                <div className={styles.form}>
                    <input onChange={this.props.onChangeInput}
                        name='name'
                        type='text'
                        placeholder='Login'
                        className={styles.register__name}
                    />
                    <input onChange={this.props.onChangeInput}
                        name="password"
                        type='text'
                        placeholder='Password'
                        className={styles.register__name}
                    />
                    {this.props.hasAccount ? (
                        <>
                            <Link onClick={this.props.handleLogin}
                                className={styles.link}
                                to={this.props.success ? "/Game" : "/"}>
                                Sign in
                            </Link>
                            <p>Don't have an account? <span className={styles.span} onClick={this.props.LogIntoggle}> Sign up</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={this.props.handleSignUp} className={styles.link} >
                                Sign up
                            </button>
                            <p>Have an account?<span className={styles.span} onClick={this.props.SignUptoggle}> Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        )
    }
};
export default Register;


