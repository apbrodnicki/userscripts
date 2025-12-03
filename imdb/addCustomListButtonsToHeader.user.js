// ==UserScript==
// @name         IMDB: Custom List Header Buttons
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Add custom list buttons to Header.
// @author       Alex Brodnicki
// @match        https://www.imdb.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @updateURL    https://github.com/apbrodnicki/userscripts/raw/refs/heads/main/imdb/addCustomListButtonToHeader.user.js
// @downloadURL  https://github.com/apbrodnicki/userscripts/raw/refs/heads/main/imdb/addCustomListButtonToHeader.user.js
// @grant        none
// ==/UserScript==

/**
* Duplicate the Watchlist button from the Header and set to a custom list.
*/
(function() {
	'use strict';

	let attempts = 0;
	const maxAttempts = 5;

	// 'Button text': 'link'
	const customHeaderButtons = {
		'Movies and Shows Archive': '/list/ls542149947/',
		'Check-ins': '/user/ur188698730/checkins/',
		'Cinema': '/list/ls4157850798/'
	};

	// Clone Watchlist button and add to the right
	const addCustomListButtonToHeader = () => {
		const watchlistElements = document.getElementsByClassName('imdb-header__watchlist-button');

		if (watchlistElements.length > 0) {
			const watchlist = watchlistElements[0];

			for (const headerButton in customHeaderButtons) {
				const watchlistClone = watchlist.cloneNode(true);
				const watchlistCloneLink = watchlistClone.children[0];

				watchlist.insertAdjacentElement('afterend', watchlistClone);
				watchlistCloneLink.setAttribute('href', customHeaderButtons[headerButton]);
				watchlistCloneLink.children[1].innerHTML = headerButton;
			}

			clearInterval(interval);
		} else {
			console.log('Watchlist element not found.');
			attempts++;

			if (attempts === maxAttempts) {
				clearInterval(interval);
			}
		}
	};

	// Expand search dropdown to accommodate for extra buttons
	const expandSearchDropdownWidth = () => {
		const searchDropdown = document.getElementById('react-autowhatever-navSuggestionSearch');

		if (searchDropdown) {
			searchDropdown.style.width = '225%';
		}
	}

	const interval = setInterval(addCustomListButtonToHeader, 500);
	expandSearchDropdownWidth();
})();
