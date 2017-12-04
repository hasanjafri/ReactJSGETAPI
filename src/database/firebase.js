import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC_3MWYK6PGnWf7g2sZQgOpOrxdpJg-mTw",
    authDomain: "nemo-ui.firebaseapp.com",
    databaseURL: "https://nemo-ui.firebaseio.com",
    projectId: "nemo-ui",
    storageBucket: "nemo-ui.appspot.com",
    messagingSenderId: "1015577887362"
};

firebase.initializeApp(config);
export default firebase;