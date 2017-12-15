import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

class Recorder extends Component {
    constructor(props) {
      super(props);
      this.state = {
        record: false
    }
  
  }
   
  startRecording = () => {
    this.setState({
      record: true
    });
  }
  
  stopRecording = () => {
    this.setState({
      record: false
    });
  }
  
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);

    var reader = new window.FileReader();
    reader.readAsDataURL(recordedBlob.blob);
    reader.onloadend = function() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5000/vp', true);
      xhr.onload = function () {
          // do something to response
          console.log(this.responseText);
      };
      var formData = new FormData()
      formData.append("household_id", 3);
      formData.append("audio", recordedBlob.blob)
      xhr.send(formData)
      //xhr.send('household_id=3&audio='+reader.result); 
    }
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          width={160}
          height={25}
          audioBitsPerSecond={8000}/>
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
      </div>
    );
  }
}

export default Recorder;