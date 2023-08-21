/** @format */

function generateRoomCards(roomArray) {
	const container = document.createElement('div');
	container.classList.add('c_box_content', 'row');

	for (const room of roomArray) {
		const cardContainer = document.createElement('div');
		cardContainer.classList.add('col', 's6', 'm6', 'l4');
		cardContainer.id = room.id;

		const card = document.createElement('div');
		card.classList.add('card', 'hoverable');

		const cardImage = document.createElement('div');
		cardImage.classList.add('card-image', 'waves-effect', 'waves-block', 'waves-light');
		cardImage.onclick = () => set_room(room.id);
		cardImage.href = `#room=${room.id}`;

		const img = document.createElement('img');
		img.src = room.icon;
		img.alt = 'placeholder';
		img.style.width = '100%';

		cardImage.appendChild(img);

		const cardContent = document.createElement('div');
		cardContent.classList.add('card-content');
		cardContent.style.backgroundColor = room.color;
		cardContent.style.borderRadius = '0 0 12px 12px';

		const cardTitle = document.createElement('span');
		cardTitle.classList.add('card-title', 'activator', 'truncate');
		cardTitle.textContent = room.name;

		cardContent.appendChild(cardTitle);

		card.appendChild(cardImage);
		card.appendChild(cardContent);

		cardContainer.appendChild(card);

		container.appendChild(cardContainer);
	}

	return container;
}

function set_room(roomId) {
	console.log('Room selected:', roomId);
	set_menu(2);
	displayTasksByRoom(gameData, roomId);
}

function buildRooms() {
	const containerElement = document.getElementById('rooms-container');

	// Remove existing elements inside the container
	while (containerElement.firstChild) {
		containerElement.removeChild(containerElement.firstChild);
	}

	// Append new room cards
	containerElement.appendChild(generateRoomCards(gameData.rooms));
}
