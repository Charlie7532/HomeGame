/** @format */

function generateTaskList(taskArray) {
	const container = document.createElement('div');
	container.classList.add('c_box_content', 'row');

	// Iterate over categories in the task array
	const CollapsibleContainer = document.createElement('ul');
	CollapsibleContainer.classList.add('collapsible');
	container.appendChild(CollapsibleContainer);

	for (const category of new Set(taskArray.map((task) => task.category))) {
		const categoryTasks = taskArray.filter((task) => task.category === category);

		const categoryCollapsible = document.createElement('li');
		const categoryHeader = document.createElement('div');
		const categoryBadge = document.createElement('span');
		const categoryBody = document.createElement('div');
		const taskCollection = document.createElement('ul');

		// categoryCollapsible.classList.add('collapsible');
		categoryHeader.classList.add('collapsible-header');
		categoryBody.classList.add('collapsible-body');
		categoryBadge.classList.add('badge');

		categoryHeader.innerHTML = `
        <style> .collapsible{border-left: solid red 10px} </style>
        <i class="material-icons" style="color:${categoryTasks[0].category.color || '#26a69a'}">${categoryTasks[0].category.icon || 'blur_circular'}</i>
        ${category}
        <span class="badge">${categoryTasks.length}</span>
      `;

		taskCollection.classList.add('collection');

		for (const task of categoryTasks) {
			const taskItem = document.createElement('li');
			const taskIcon = document.createElement('i');
			const taskTitle = document.createElement('span');
			const taskMax = document.createElement('p');
			const taskPoints = document.createElement('a');

			taskItem.classList.add('collection-item', 'avatar');
			taskIcon.classList.add('material-icons', 'circle');
			taskTitle.classList.add('title');
			taskPoints.classList.add('secondary-content', 'point-text');

			taskIcon.style.backgroundColor = task.color || '#26a69a';
			taskIcon.textContent = task.icon || 'check';
			taskTitle.textContent = task.name;
			taskMax.textContent = `Max per day ${task.max.day || '-'}`;
			taskPoints.textContent = `+${task.points[0] || 0}`;

			taskItem.onclick = function () {
				set_task(task.id);
			};

			taskItem.appendChild(taskIcon);
			taskItem.appendChild(taskTitle);
			taskItem.appendChild(taskMax);
			taskItem.appendChild(taskPoints);

			taskCollection.appendChild(taskItem);
		}

		categoryBody.appendChild(taskCollection);
		categoryCollapsible.appendChild(categoryHeader);
		categoryCollapsible.appendChild(categoryBody);

		CollapsibleContainer.appendChild(categoryCollapsible);
	}
	return container;
}

function displayTasksByRoom(data, roomIdOrName = null) {
	const room = data.rooms.find((room) => room.id === roomIdOrName || room.name === roomIdOrName);

	if (!room) {
		console.log(`Room with ID or name '${roomIdOrName}' not found.`);
		return;
	}

	const tasksContainer = document.getElementById('tasks-container');

	// Clear existing content using innerHTML
	tasksContainer.innerHTML = '';

	// Generate and display the task list for the specified room
	const filteredTasks = data.tasks.filter((task) => task.room.includes(room.name));
	tasksContainer.appendChild(generateTaskList(filteredTasks));

	// Reinitialize collapsible elements
	M.Collapsible.init(tasksContainer.querySelector('.collapsible'), {
		accordion: false,
	});

	// displayTasksByRoom(test_data, 'Master Bedroom')
}

function set_task(task_id) {
	console.log('selected task', task_id);
	set_menu(5);
}
