/** @format */
const GameURL ='https://script.google.com/macros/s/AKfycbzbR2DM1dtKeCkAN3bO-uU5mbr1lGSy6U07VypZSHBcZgVrp0tfyQt1vUYxOh5PuJ1Y/exec';

let gameData;

let gameASN;
const bypass = true;

async function callGame(obj) {
	let url = GameURL;
	url += `?key=${obj.key}`;
	url += `&u=${obj.userid}`;
	url += `&t=${obj.taskid}`;
	url += `&r=${obj.roomid}`;
	url += `&s=${obj.userid_from}`;
	console.log("Printing URL: ", url);

	const result = await fetch(url);
	const R = result.json().then((data) => {
		gameASN = data.data;
		set_menu(5);
	});

	console.log('get Data:', R);
	return R;
}

async function TEST() {
	callGame({
		key: 'FULL001',
		userid: 'P001',
		taskid: 'T12042',
		roomid: 'R001',
		userid_from: 'P002',
	});
}

async function getGameData(key) {
	let url = GameURL;
	url += bypass ? `?key=FULL001` : `?key=${key}`;

	const result = await fetch(url);
	const R = result.json().then((data) => {
		gameData = data.data;
	});

	console.log('get Data:', R);
	return R;
}

let userDefined = false;

function waitForUserAndGetData() {
	if (typeof User !== 'undefined' && User !== null) {
		userDefined = true;
		getGameData(User.key);
	} else if (!userDefined) {
		console.log('wating for user to be defined...');
		setTimeout(waitForUserAndGetData, 500); // Check every 100 milliseconds
	}
}

// Call the function to start waiting for User to be defined
// waitForUserAndGetData();
