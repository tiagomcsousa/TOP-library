var firebaseConfig = {
    apiKey: "AIzaSyDkFWJ4F1AgXdb1nuVaUt5T2Ihk87bM4mA",
    authDomain: "top-library-b04a4.firebaseapp.com",
    projectId: "top-library-b04a4",
    storageBucket: "top-library-b04a4.appspot.com",
    messagingSenderId: "937710027242",
    appId: "1:937710027242:web:8d89f93072c64c4a8db293",
    measurementId: "G-0S8S879QNM"
};
// Initialize Firebase
var defaultApp = firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'main.html',

};
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);