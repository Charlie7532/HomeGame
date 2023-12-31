/** @format */
const GameURL = 'https://script.google.com/macros/s/AKfycbzbR2DM1dtKeCkAN3bO-uU5mbr1lGSy6U07VypZSHBcZgVrp0tfyQt1vUYxOh5PuJ1Y/exec';

let gameData;

let gameASN;
const bypass = true;

let try_counter=0;

async function callGame(obj) {
	let url = GameURL;
	url += `?key=${obj.key}`;
	url += `&u=${obj.userid}`;
	url += `&t=${obj.taskid}`;
	url += `&r=${obj.roomid}`;
	url += `&s=${obj.userid_from}`;
	console.log('Printing URL: ', url);

	const result = await fetch(url);
	const R = result.json().then((data) => {
		gameASN = data.data;

		console.log('answuer data: ', data);
		if (data.status == 200) {
			set_menu('success');
		} else {
			console.log('error: ', data.error);

			if (try_counter<3){
				console.log("trying again automatically..");
				console.log("counter: ",try_counter)
				try_counter++;
				tryAgain();
			}else if (try_counter>=3){
				try_counter=0;
				set_menu('failure');
			}
		}
	});

	console.log('get Data:', R);
	return R;
}

function tryAgain() {
	console.log("trying again...")
	callGame(gameData);
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
	if (isloggedin()) {
		userDefined = true;
		getGameData(User.key);
	} else if (!userDefined) {
		console.log('wating for user to be defined...');
		setTimeout(waitForUserAndGetData, 500); // Check every 100 milliseconds
	}
}
