// ==UserScript==
// @name         IMDB: Custom List Header Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add custom list button to Header.
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

	const customListPath = '/list/ls542149947/';
	const customListTitle = 'Movies and Shows Archive';

	const addCustomListButtonToHeader = () => {
		const watchlistElements = document.getElementsByClassName('imdb-header__watchlist-button');

		if (watchlistElements.length > 0) {
			const watchlist = watchlistElements[0];
			const watchlistClone = watchlist.cloneNode(true);
			const watchlistCloneLink = watchlistClone.children[0];

			watchlist.insertAdjacentElement('afterend', watchlistClone);
			watchlistCloneLink.setAttribute('href', customListPath);
			watchlistCloneLink.children[1].innerHTML = customListTitle;

			clearInterval(interval);
		} else {
			console.log('Watchlist element not found.');
			attempts++;

			if (attempts === maxAttempts) {
				clearInterval(interval);
			}
		}
	};

	const interval = setInterval(addCustomListButtonToHeader, 500);
})();
