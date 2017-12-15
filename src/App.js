import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import VolumeOffIcon from 'material-ui/svg-icons/av/volume-off';
import VolumeOnIcon from 'material-ui/svg-icons/av/volume-up';
import './App.css';

//import Recorder from './components/Recorder.js';
import WAVRecorder from './components/WAVRecorder.js'
import firebase from './database/firebase.js';

import MoviesGallery from './components/MoviesGallery.js';

const styles = {
  radioButton: {
    marginBottom: 16
  },
  radioButtonLabel: {
    color: '#ffffff'
  },
  radioButtonUnchecked: {
    color: '#ffffff'
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
  
  render() {
    const { movies_genre } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <header className="App-header moveWith">
          <h1 className="App-title">Welcome to the Nemo UI</h1>
        </header>
        <table className="tableWidth">
          <tbody>
              <tr className="moveWith sideBarPosition">
                <td>
                  <RadioButtonGroup className="usersTopLeft" name="Speakers" defaultSelected="SpeakerO" labelPosition='right'>
                  <RadioButton value="SpeakerO" label="Dashboard" style={styles.radioButton} labelStyle={styles.radioButtonLabel} checkedIcon={<VolumeOnIcon/>}/>
                  <RadioButton value="Speaker1" label="Hasan" style={styles.radioButton} labelStyle={styles.radioButtonLabel} iconStyle={styles.radioButtonUnchecked} disabled={true} uncheckedIcon={<VolumeOffIcon/>}/>
                  <RadioButton value="Speaker2" label="Ryan" style={styles.radioButton} labelStyle={styles.radioButtonLabel} iconStyle={styles.radioButtonUnchecked} disabled={true} uncheckedIcon={<VolumeOffIcon/>}/>
                  <RadioButton value="Speaker3" label="Marcio" style={styles.radioButton} labelStyle={styles.radioButtonLabel} iconStyle={styles.radioButtonUnchecked} disabled={true} uncheckedIcon={<VolumeOffIcon/>}/>
                  <RadioButton value="Speaker4" label="Cedric" style={styles.radioButton} labelStyle={styles.radioButtonLabel} iconStyle={styles.radioButtonUnchecked} disabled={true} uncheckedIcon={<VolumeOffIcon/>}/>
                  </RadioButtonGroup>
                  
                  <WAVRecorder/>
                </td>
              </tr>
          </tbody>
        </table>
		    <div className="moviesPosition">
          <MoviesGallery movies_genre={movies_genre}/>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
