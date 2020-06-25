/** * 
 * @file fb-signup.js 
 * this file is to signup
 * */

/**
 * Handles the sign up button press.
 * Add user's information to Firebase's authentication center.
 */
function handleSignUp() {
    // get elements
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirm = document.getElementById('confirm').value;
	var name = document.getElementById('name').value;

    /* Wrong Form */
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
    }
    if (password != confirm) {
        alert('Wrong password & Confirm password');
        return;
    }

    //Sign out if signed in
	if(firebase.auth().currentUser){
		// LOGOUT
        firebase.auth().signOut();
        console.log("current user sign out.");
	}

	// Sign in with email and pass.
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

        // Password is weak
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
    }).then(function (data) { // Init userprofile
        console.log("create auth");

        //Update user's name
		data.user.updateProfile({
			displayName: name
		}).then(function() {
			// Update successful
            console.log("User update Success.");
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
			window.location = "index.html";
		}).catch(function(error) {
			// Error happened
			alert(error);
		});
    });
}

/**
 * initApp handles setting up UI event listeners
 * Initialize Firebase authentication
 */
function initApp() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
		} else {
		}
	});

	// Other init
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
}

window.onload = function () {
	initApp();
};