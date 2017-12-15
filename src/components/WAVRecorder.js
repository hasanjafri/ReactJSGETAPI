import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Recorder from 'opus-recorder';
import firebase from '../database/firebase.js';

class WAVRecorder extends Component {
    constructor(props){
        super(props);
        this.rec = null;
    }

    get_movies_by_speaker = (speaker_id) => {
        var speaker_genre = this.state.household_speakers[speaker_id].genre_id;
        var moccast_id = this.state.household_speakers[speaker_id].speaker_id;
        var speaker_name = this.state.household_speakers[speaker_id].name;
        this.props.onRenderGallery(speaker_genre, moccast_id, speaker_name);        
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

    onStop = () => {
        console.log("Stopped recording...");
        this.rec.stop();
    };

    onStart = () => {
        var self = this;
        this.rec = new Recorder({
            encoderPath: "./waveWorker.min.js",
            mediaTrackConstraints: {sampleRate: 8000}
        });
        this.rec.addEventListener("dataAvailable", function (e) {
            var recordedBlob = new Blob([e.detail], {type: 'audio/wav'});
            var reader = new window.FileReader();
            reader.readAsDataURL(recordedBlob);
            reader.onloadend = function() {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:5000/vp', true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var res = JSON.parse(xhr.responseText);
                        var speaker_id = res.SpeakerId.slice(-1);
                        self.get_movies_by_speaker(speaker_id);
                    }
                };               
                var formData = new FormData()
                formData.append("household_id", "moccast-household-3");
                formData.append("audio", recordedBlob)
                xhr.send(formData)
            //xhr.send('household_id=3&audio='+reader.result); 
            }
        });
        this.rec.addEventListener("streamError", function (e) {
            console.log(e);
        });
        this.rec.addEventListener("streamReady", function(e) {
            console.log("Stream is ready...");
        });
        let rec = this.rec;
        this.rec.initStream()
            .then(function() {
                rec.start();
            });
        console.log("Starting to record...")
    };

    render() {
        return(
        <div>
            <RaisedButton primary={true} label="Query" className="buttons-style" onClick={this.onStart}/>
            <RaisedButton secondary={true} label="Stop" className="buttons-style" onClick={this.onStop}/>
        </div> 
    )};
}

export default WAVRecorder;