// ==UserScript==
// @name         IMDB: Custom List Filters
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Add custom filters to lists on load.
// @author       Alex Brodnicki
// @match        https://www.imdb.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @updateURL    https://github.com/apbrodnicki/userscripts/raw/refs/heads/main/imdb/addCustomFiltersToLists.user.js
// @downloadURL  https://github.com/apbrodnicki/userscripts/raw/refs/heads/main/imdb/addCustomFiltersToLists.user.js
// @grant        none
// ==/UserScript==

/**
* On page load of a list, the url will update with custom filters and reload.
*/
(function() {
	'use strict';

	// 'list path': 'query parameter filters'
	const listsWithFilters = {
		'user/ur188698730/watchlist': '?sort=date_added%2Casc&view=detailed', // Watchlist
		'user/ur188698730/ratings': '?sort=my_ratings%2Cdesc&view=detailed', // Ratings
		'user/ur188698730/checkins' : '?sort=release_date%2Casc&view=detailed', // Check-ins
		'list/ls542149947': '?sort=my_ratings%2Cdesc&view=detailed', // Movies and Shows Archive
		'list/ls542228347': '?sort=date_added%2Casc&view=detailed', // Booby
		'list/ls595577082': '?sort=alpha%2Casc&view=detailed', // Favorite People Archive
		'list/ls4157850798': '?sort=release_date%2Casc&view=detailed' // Cinema
	};

	for (const list in listsWithFilters) {
		if (window.location.pathname.includes(list) && !window.location.href.includes(listsWithFilters[list])) {
			window.location.href = window.location.origin + window.location.pathname + listsWithFilters[list];
		}
	}
})();
