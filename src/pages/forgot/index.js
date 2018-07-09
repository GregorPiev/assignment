import React, { Component } from 'react';
import { Link } from 'react-router';
import './forgot.css';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const useremail = cookies.get('useremail');


class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:''
        }
    }
    static path = "/forgot";

    handleForgot(e) {
        e.preventDefault();
        let that = this;
        const email = this.refs.email.value;

        axios.post('http://globalbit.co.il/front-end-assignment/forgot-password.php', {
            "email": email            
        })
            .then(function (response) {
                console.log(response);
                cookies.set('login', 1, { path: '/' });
                that.context.router.replace('home');
            })
            .catch(function (error) {
                console.log(error);
                cookies.remove('login');
                that.setState({
                    error: error.message
                });
            });
       
    }

    render() {
        const { error } = this.state;
        return (
            <section>
                <div id="forgot">
                    <h1 className="wraper-header">Forgot your password?</h1>
                    <article>
                        Enter your email address below and we will
                        send you instructions on how to change your
                        password
                    </article>

                    <form className="form-horizontal" onSubmit={this.handleForgot.bind(this)}>
                        <div className="form-group">
                            <div className="col-sm-12 col-xs-12">
                                <input placeholder="Your email" name='email' ref='email' type="text" value={useremail} className="form-control" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                            </div>
                        </div>                        
                        <div className="form-group">
                            <div className="col-sm-12 col-xs-12 text-center">
                                <button className="btn btn-lg" type="submit">Send</button>
                                <p className='error-message'>{error}</p>
                            </div>
                        </div>
                    </form>
                </div>               
                <div className="bottom-link">
                    <label>Return to</label>&nbsp;<Link to="/">Sign in</Link>
                </div>
            </section>
        );
    }
}

export default Forgot;
