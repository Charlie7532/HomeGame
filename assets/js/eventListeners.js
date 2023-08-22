/**
 * Theme Name: MAIN12 VR Event Listeners
 * Theme URI:
 * Version: 4.0.2
 * Description: Main12 VR
 * Author: Juan C Botero
 * Author URI: https://www.main12.com
 *
 * @format
 * @name VR_ACC
 * @by MAIN12 LLC
 * @date 04-05-2023
 */

document.addEventListener('DOMContentLoaded', function () {
	var instancesFormSelect = M.FormSelect.init(document.querySelectorAll('select'));
	var instancesModal = M.Modal.init(document.querySelectorAll('.modal'),{
		opacity:1,
		dismissible:false,
	});
	var instancesCollapsible = M.Collapsible.init(document.querySelectorAll('.collapsible'));
	var instancesSidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'));
	var instance = M.Tabs.init(document.querySelectorAll('.tabs-swipe-demo'), { swipeable: true, responsiveThreshold: Infinity });
	var instance = M.Carousel.init({
		fullWidth: true,
		indicators: true,
	});

	getGameData('FULL001');
	isloggedin();
});
async function makeAPICall(url) {
	const result = await fetch(url);
	result.json().then((data) => {
		printResults(data.drivers);
		document.getElementById('loadder').style.display = 'none';
	});
}
