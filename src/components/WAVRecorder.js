import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Recorder from 'opus-recorder';

class WAVRecorder extends Component {
    constructor(props){
        super(props);
        this.rec = null;
    }

    onStop = () => {
        console.log("Stopped recording...");
        this.rec.stop();
        this.props.onRenderGallery();
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
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            console.log(xhr.response);
                            console.log(xhr.responseText);
                        }
                    }
                }
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