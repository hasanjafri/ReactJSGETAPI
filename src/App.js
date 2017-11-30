import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import MoviesGallery from './components/MoviesGallery.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Nemo UI</h1>
        </header>
        <MoviesGallery movies_genre={28}></MoviesGallery>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
