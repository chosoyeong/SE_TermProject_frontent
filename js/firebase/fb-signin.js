/** * 
 * @file fb-signin.js 
 * this file is to signup
 * */

/**
 * Handles the sign in button press.
 * Verify users through Firebase's authentication center
 */
function toggleSignIn() {
    //Sign out if another user is signed in
    if (firebase.auth().currentUser) {
        // SIGN OUT
        firebase.auth().signOut();
    }

    //get elements
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //not entered
    if (email.length < 4) {
        alert('이메일을 입력해주세요.');
        return;
    }
    if (password.length < 4) {
        alert('비밀번호를 입력해주세요.');
        return;
    }

    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        window.location = "./index.html";

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('잘못된 패스워드 입니다.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

/**
 * initApp
 * handles setting up UI event listeners and registering Firebase auth listeners:
 */
function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // Alert message when logged in
            //alert("email: " + email + "uid: " + uid);
        } else {
            // User is signed out.

        }

    });

    // Other init
    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function () {
    initApp();
};