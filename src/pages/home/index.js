import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const login = cookies.get('login');


class Home extends Component{
    
    static path = "/";
    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired,
        };
    }
    componentDidMount() {
        !login ? (this.context.router.replace('login')) : ''; 
    }
   
    

    render() {
        return (
            <div id="home">
                <h1 className='wraper-header'>Hello World</h1>
            </div>
       );
    }
}
export default Home;