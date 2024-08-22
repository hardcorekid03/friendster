import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYR26v12SqRU0xbSFq5qdHeQQKpbl9JX4",
  authDomain: "friendster-image.firebaseapp.com",
  projectId: "friendster-image",
  storageBucket: "friendster-image.appspot.com",
  messagingSenderId: "500625387256",
  appId: "1:500625387256:web:0a5aba16075b029e0f150d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
