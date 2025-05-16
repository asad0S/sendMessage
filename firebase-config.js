// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyD86yq1Sh_dQva54J7CHrl9aPxmmucgHaA",
    authDomain: "profile-messenger-fc66d.firebaseapp.com",
    databaseURL: "https://profile-messenger-fc66d-default-rtdb.firebaseio.com",
    projectId: "profile-messenger-fc66d",
    storageBucket: "profile-messenger-fc66d.firebasestorage.app",
    messagingSenderId: "553692170512",
    appId: "1:553692170512:web:8eb2b04f7f5fb70dadbd95",
    measurementId: "G-MZZ49LQPFQ"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);
  