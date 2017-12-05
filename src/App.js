import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './App.css';

import firebase from './database/firebase.js';

import MoviesGallery from './components/MoviesGallery.js';

const styles = {
  radioButton: {
    marginBottom: 16
  },
};

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
          speaker_id: household_speakers[item].speaker_id,
          genre_id: household_speakers[item].genre_id
        });
      }
      this.setState({
        household_speakers: speaker_info
      });
    });
  }

  onQuery = () => {
    this.setState({ movies_genre: 16 })
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
		<table class="tableWidth">
			<tr>
				<td class="usersTopLeft">
          <tr>
					  <RadioButtonGroup name="Speakers" defaultSelected="UserO" labelPosition='right'>
					    <RadioButton value="UserO" label="Dashboard" style={styles.radioButton} labelStyle={{color: '#000000'}}/>
					    <RadioButton value="User0" label="Hasan" style={styles.radioButton} labelStyle={{color: '#000000'}} disabled={true}/>
					    <RadioButton value="User1" label="Ryan" style={styles.radioButton} labelStyle={{color: '#000000'}} disabled={true}/>
					    <RadioButton value="User2" label="Marcio" style={styles.radioButton} labelStyle={{color: '#000000'}} disabled={true}/>
					    <RadioButton value="User3" label="Cedric" style={styles.radioButton} labelStyle={{color: '#000000'}} disabled={true}/>
					  </RadioButtonGroup>
          </tr>
          <tr>
            <h1>hey</h1>
          </tr>
				</td>
				<td>
          <MoviesGallery movies_genre={movies_genre}/>
        </td>
			</tr>
		</table>
		<div class="sidePadding"></div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
