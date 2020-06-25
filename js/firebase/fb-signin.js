/** * 
 * @file fb-signin.js 
 * this file is to signup
 * */

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // SIGN OUT
        firebase.auth().signOut();
    }
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

<<<<<<< HEAD
		if (email.length < 4) {
			alert('ï¿½Ì¸ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Ô·ï¿½ï¿½ï¿½ï¿½Ö¼ï¿½ï¿½ï¿½.');
			return;
		}
		if (password.length < 4) {
			alert('ï¿½ï¿½Ð¹ï¿½È£ï¿½ï¿½ ï¿½Ô·ï¿½ï¿½ï¿½ï¿½Ö¼ï¿½ï¿½ï¿½.');
			return;
		}
=======
    if (email.length < 4) {
        alert('ÀÌ¸ÞÀÏÀ» ÀÔ·ÂÇØÁÖ¼¼¿ä.');
        return;
    }
    if (password.length < 4) {
        alert('ºñ¹Ð¹øÈ£¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.');
        return;
    }
>>>>>>> 5b19f34c098811e516c2e9837547c6074a57b5e8

    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        window.location = "./index.html";

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

<<<<<<< HEAD
			if (errorCode === 'auth/wrong-password') {
				alert('ï¿½ß¸ï¿½ï¿½ï¿½ ï¿½Ð½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Ô´Ï´ï¿½.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
	}
=======
        if (errorCode === 'auth/wrong-password') {
            alert('Àß¸øµÈ ÆÐ½º¿öµå ÀÔ´Ï´Ù.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
>>>>>>> 5b19f34c098811e516c2e9837547c6074a57b5e8
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
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