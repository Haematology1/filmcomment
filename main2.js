// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signOut, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsvPCmIwEm0eXtwonDAmoLuvgqZc7G_lU",
  authDomain: "film-comments-20b3b.firebaseapp.com",
  projectId: "film-comments-20b3b",
  storageBucket: "film-comments-20b3b.appspot.com",
  messagingSenderId: "909788738173",
  appId: "1:909788738173:web:24cab6efebf856a2e0f714",
  measurementId: "G-G9H0980711"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function signOutUser() {
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';  // Redirect to login page
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
}

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    
  });

// Monitor auth state changes
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';  // Redirect to login page if not authenticated
  }
});
