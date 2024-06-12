 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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
 const auth = getAuth(app);

 // Sign-in function
 window.signIn = function() {
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const text_display = document.getElementById('login_text')
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       var user = userCredential.user;
     })
     .catch((error) => {
      text_display.style = 'font-size: 1rem; color: red';
      text_display.innerHTML = "Login Failed! Please verify your login credentials!";
     });

     auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        text_display.innerHTML = "Login Successful!";
        
        // Pause for 3 seconds (3000 milliseconds) before redirecting
        setTimeout(
          window.location.href = 'index.html'
        , 5000); // 3000 milliseconds = 3 seconds
      } else {
        // User is signed out
      }
    })}
