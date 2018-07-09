import React, { Component } from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './login.css';
const cookies = new Cookies();


class Login extends Component {    
    constructor(props) {
        super(props);
        this.state = {error: ''}
    }

    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired,
        };
    }
    
    static path = "/login";

    handleLogin(e) {
        e.preventDefault();
        let that = this;
        
        const { email, password, keepme } = this.refs;
        console.log(email.value + "\n" + password.value + "\n" + keepme.checked);

        if (keepme.checked === true) {
            cookies.set('useremail', email.value, { path: '/' });
        } else {
            cookies.remove('useremail');
        }
        

        axios.post('http://globalbit.co.il/front-end-assignment/login.php', {
            "email": email.value,
            "password": password.value
        })
            .then(function (response) {
                console.log(response);
                cookies.set('login', 1, { path: '/' });
                that.context.router.replace('/'); 
            })
            .catch(function (error) {
                console.log(error); 
                cookies.remove('login');                
                that.setState({
                    error: error.message
                });

                //cookies.set('login', 1, { path: '/' });
                //that.context.router.replace('/'); 
            });
        
    }

    render() {
        const { error } = this.state;
        const useremail = cookies.get('useremail');
        
        return (
            <section>
                <div id="login">              
                    <h1 className="wraper-header">Sign in with Flatkit Account</h1>
                   
                    <form className="form-horizontal" onSubmit={this.handleLogin.bind(this)}>
                        <div className="form-group">
                            <div className="col-sm-12 col-xs-12">
                                <input placeholder="Email" value={useremail} name='email' ref='email' type="text" className="form-control" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12 col-xs-12">
                                <input placeholder="Password" name='password' ref='password' type="password" className="form-control" required pattern=".{6,}" title="Six or more characters" />
                            </div>
                        </div>                   
                        <div className="checkbox">
                            <div className="col-sm-12 col-xs-12">
                                <label>
                                    <input ref='keepme' type="checkbox" value="0" /> Keep me signed in
                                    </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12 col-xs-12 text-center">
                                <button className="btn btn-lg" type="submit">Sign in</button>
                                <p className='error-message'>{error}</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="bottom-link">
                        <Link to='/forgot'>Forgot password?</Link>
                </div>
                <div className="bottom-link">
                    <label>Do not have an account?</label>&nbsp;<Link to='/'>Sign up</Link>
               </div>
            </section>
            );       
    }
}

export default Login;
