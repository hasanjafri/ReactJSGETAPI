import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

import MoviesGallery from './components/MoviesGallery.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies_genre: null
    }
  }

  onQuery = () => {
    this.setState({ movies_genre: 99 })
  }

  onReset = () => {
    this.setState({ movies_genre: null })
  }

  render() {
    const { movies_genre } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Nemo UI</h1>
          <RaisedButton primary={true} label="Query" className="header_buttons" onClick={this.onQuery}/>
          <RaisedButton secondary={true} label="Reset" className="header_buttons" onClick={this.onReset}/>
        </header>
        <MoviesGallery movies_genre={movies_genre}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
