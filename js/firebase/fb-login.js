/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// SIGN OUT
		firebase.auth().signOut();
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		if (email.length < 4) {
			alert('이메일을 입력해주세요.');
			return;
		}
		if (password.length < 4) {
			alert('비밀번호를 입력해주세요.');
			return;
		}

		// Sign in with email and pass.
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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
}

//////////////////////////////////////////////////////////////////////
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
	// [START sendemailverification]
	firebase.auth().currentUser.sendEmailVerification().then(function () {
		// Email Verification sent!
		// [START_EXCLUDE]
		alert('Email Verification Sent!');
		// [END_EXCLUDE]
	});
	// [END sendemailverification]
}

function sendPasswordReset() {
	var email = document.getElementById('email').value;
	// [START sendpasswordemail]
	firebase.auth().sendPasswordResetEmail(email).then(function () {
		// Password Reset Email Sent!
		// [START_EXCLUDE]
		alert('Password Reset Email Sent!');
		// [END_EXCLUDE]
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// [START_EXCLUDE]
		if (errorCode == 'auth/invalid-email') {
			alert(errorMessage);
		} else if (errorCode == 'auth/user-not-found') {
			alert(errorMessage);
		}
		console.log(error);
		// [END_EXCLUDE]
	});
	// [END sendpasswordemail];
}
////////////////////////////////////////////////////////////////////////

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
			alert("email: " + email + "uid: " + uid);
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