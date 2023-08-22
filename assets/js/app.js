/**
 * Theme Name: MAIN12 VR
 * Theme URI:
 * Version: 2.5.19
 * Description: Main12 VR
 * Author: Juan C Botero
 * Author URI: https://www.main12.com
 *
 * @format
 * @name VR_ACC
 * @by MAIN12 LLC
 * @date 04-05-2023
 */
const activationURL = 'https://script.google.com/macros/s/AKfycbyDQ3gBu4Lu8EvGeAq4xHu3xVIYfFbj6bdBKPJpqlrSHchaWIJQE33lrHcx8jktk6Qa/exec';
const packagesJSON = './assets/js/packages.json';

let quickActivation = [1, 2, 3, 2, 1];
let fullActivation = [1, 3, 2, 3, 3, 1];
let Cashier = [3, 3, 3, 3, 3];

let proces = quickActivation;
let current_menu = 'home';
let previus_menu;
let new_player = false;

function int_menu(val) {
	let next_menu;
	switch (val) {
		case 0:
			next_menu = 'home';
			break;
		case 1:
			next_menu = 'Rooms';
			break;
		case 2:
			next_menu = 'Tasks';
			break;
		case 3:
			next_menu = 'pay-method';
			break;
		case 4:
			next_menu = 'resume';
			break;
		case 5:
			next_menu = 'success';
			break;
		case 6:
			next_menu = 'failure';
			break;
		case 7:
			next_menu = 'processing';
			break;

		case 8:
			next_menu = 'gest_info';
			break;
		case 9:
			next_menu = '';
			break;

		case 10:
			next_menu = 'dashboard';
			break;

		default:
			next_menu = val;
			break;
	}
	return next_menu;
}

function set_menu(val) {
	if (isloggedin()) {
		let next_menu = int_menu(val);

		if (current_menu !== next_menu) {
			const next_element = document.getElementById(next_menu);
			const current_element = document.getElementById(current_menu);
			current_element.classList.add('hidden');
			setTimeout(function () {
				current_element.style.display = 'none';

				next_element.style.display = 'block';
				next_element.classList.remove('hidden');
				previus_menu = current_menu;
				current_menu = next_menu;
				console.log(`Current menu: ${current_menu}`);
				window.location.hash = current_menu;
			}, 400);
			updateResults();
		} else {
			updateResults();
		}
	}
}

function set_next(val) {
	new_player ? set_menu(4) : set_menu(val);
}

function set_operation(value) {
	let operation = value;
	console.log(`home: ${operation}`);
	if (operation === 0) {
		set_menu(1);
	} else {
		alert('Esta opcion aun no esta disponible, pero no te preocupes que estamos trabajando en ello.');
	}
}

async function start_game() {
	// set_menu('processing');
	// waitForUserAndGetData();
	buildRooms();
	set_menu(1);
}

function updateResults() {
	buildRooms();
}

function edit(val) {
	new_player = true;
	set_menu(val);
}

async function confirm() {
	submitFlag = true;
	console.log('==========FORM HAS BEAN SUBMITED==========');

	Activation.seller = User.id;

	console.log(Activation);
	if (isloggedin()) {
		submitFun();
	}
}

function back() {
	set_menu(0);
}
function forward() {
	set_menu(3);
}

let submitFlag;
async function submitFun() {
	set_menu('processing');
	// document.getElementById('loadder').style.display = 'block';
	let data = await SendActivation({
		key: User.key,
		username: User.name,
		userid: User.id,
		bid: User.bid,
		location: 'Iberostar Dominicana',

		package: Activation.package,
		machine: Activation.machine,
		payment: Activation.payment,
		players: Activation.players,
		tokenValue: Activation.value,
		subtotal: Activation.subtotal,
		discount: 0,
		invoiceValue: Activation.subtotal,

		guest_name: document.getElementById('client_name').value,
		guest_lastname: document.getElementById('client_lastName').value,
		guest_email: document.getElementById('client_email').value,
		guest_room: document.getElementById('client_room').value,
		guest_hotel: document.getElementById('hotel').value,
	});

	console.log(data);

	if (data.status === 200) {
		set_menu(5);
	} else {
		set_menu(6);
	}

	return data;
}
