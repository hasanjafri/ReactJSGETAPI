import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Recorder from 'opus-recorder';

class WAVRecorder extends Component {
    constructor(props){
        super(props);
        this.rec = null;
    }

    onStop = () => {
        console.log("hey");
        this.rec.stop();
    };

    onStart = () => {
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
                xhr.onload = function () {
                // do something to response
                console.log(this.responseText);
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
            console.log("scott");
        });
        let rec = this.rec;
        this.rec.initStream()
            .then(function() {
                rec.start();
            });
        console.log("yo")
    };

    render() {
        return(
        <div>
            <RaisedButton primary={true} label="Start" className="buttons-style" onClick={this.onStart}/>
            <RaisedButton primary={true} label="Stop" className="buttons-style" onClick={this.onStop}/>
        </div> 
    )};
}

export default WAVRecorder;