import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './App.css';

import MoviesGallery from './components/MoviesGallery.js';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies_genre: null
    }
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
		<table class="tableWidth lightgray-background">
			<tr>
				<td class="usersTopLeft">
					<RadioButtonGroup name="Users" defaultSelected="UserO">
					<RadioButton value="UserO" label="Other" style={styles.radioButton} disabled={true}/>
					<RadioButton value="User0" label="User0" style={styles.radioButton} disabled={true}/>
					<RadioButton value="User1" label="User1" style={styles.radioButton} disabled={true}/>
					<RadioButton value="User2" label="User2" style={styles.radioButton} disabled={true}/>
					<RadioButton value="User3" label="User3" style={styles.radioButton} disabled={true}/>
					</RadioButtonGroup>
				</td>
				<td><MoviesGallery movies_genre={movies_genre}/></td>
			</tr>
		</table>
		<div class="sidePadding"></div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
