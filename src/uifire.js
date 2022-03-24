import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBvYeBg6NlwI_SjnBqsGipGzco72GKXJzw",
    authDomain: "medical-diary-e24bd.firebaseapp.com",
    projectId: "medical-diary-e24bd",
    storageBucket: "medical-diary-e24bd.appspot.com",
    messagingSenderId: "993449709460",
    appId: "1:993449709460:web:608cd9a144c9aaf2590981"
};

firebase.initializeApp(firebaseConfig);

export default firebase