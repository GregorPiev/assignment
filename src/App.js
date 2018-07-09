import React, { Component } from 'react';
import routers from './routers';
import './App.css';

class App extends Component {     
  render() {
      return (
          <div className="container">
              <div className="row">                  
                  <main>
                      {routers }
                  </main>                  
              </div>
          </div>
    );
  }
}

export default App;
