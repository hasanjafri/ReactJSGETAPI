import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

import firebase from './database/firebase.js';

import MoviesGallery from './components/MoviesGallery.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies_genre: null
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('Speakers');
    itemsRef.on('value', (snapshot) => { 
      let household_speakers = snapshot.val();
      let speaker_info = [];
      for (let item in household_speakers){
        speaker_info.push({
          name: item,
          speaker_id: household_speakers[item]
        });
      }
      this.setState({
        household_speakers: speaker_info
      });
    });
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
        <div className="movies-gallery">
          <MoviesGallery movies_genre={movies_genre}/>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
