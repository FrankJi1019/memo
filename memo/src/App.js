import React from 'react';
import Login from './components/Login';
import Main from './components/Main';
import './App.css';

class App extends React.Component {
  
  state = {
    username: ''
  }

  login = username => {
    this.setState({username})
  }

  render() {
    return (
      <div className='App'>
        {this.state.username === '' ? <Login login={this.login} /> : <Main username={this.state.username} />}
      </div>
    )
  }

}

export default App;
