/**
 * Theme Name: Script LogIn
 * Theme URI:
 * Version: 1.1.5
 * Description: Main12 VR
 * Author: Juan C Botero
 * Author URI: https://www.main12.com
 *
 * @format
 * @name VR_ACC
 * @by MAIN12 LLC
 * @date 04-05-2023
 */
let User;
const userLoginURL = 'https://script.google.com/macros/s/AKfycbw3ZkiJNPZOut4CVULJ_aY5j1jQkUJehQzM6P5gf4ot05YSADBVerbdGsavSMad-uTTQg/exec';

function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}

function isloggedin() {
	var logIn = M.Modal.getInstance(document.getElementById('login'));
	if (User) {
		console.log('Logged In');
		logIn.close();
		document.getElementById('btn-login').style.display = 'none';
		return true;
	} else {
		console.log('Opening Login form');
		logIn.open();
		return false;
	}
}

async function getUser(userID, password) {
	document.getElementById('login_load').style.display = 'block';
	document.getElementById('wronfPass').style.display = 'none';

	let logURL = userLoginURL;
	logURL += `?id=${userID}`;
	logURL += `&pass=${password}`;
	var Data = await fetch(logURL);
	Data.json().then((data) => {
		document.getElementById('login_load').style.display = 'none';

		console.log('User Data:', data);
		User = data.user;
		if (!data.status) {
			document.getElementById('wronfPass').style.display = 'flex';
		} else {
			document.getElementById('wronfPass').style.display = 'none';

			// const token = data.token; 
			// setCookie('user_token', token, 1);
		}
		isloggedin();
		if (submitFlag) {
			submitFun();
		}
	});
}

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('==========LOG IN HAS BEAN SUBMITED==========');
	let userID = document.getElementById('userID').value;
	let password = document.getElementById('pass').value;
	getUser(userID, password);
});
