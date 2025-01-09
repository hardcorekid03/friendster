import { initializeApp } from "firebase/app";
import {config_apiKey , config_authDomain, config_projectId,config_storageBucket,config_messagingSenderId ,config_appId } from "./config.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config_apiKey,
  authDomain: config_authDomain,
  projectId: config_projectId,
  storageBucket: config_storageBucket,
  messagingSenderId: config_messagingSenderId,
  appId: config_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
