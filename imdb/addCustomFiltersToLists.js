// ==UserScript==
// @name         IMDB: Custom List Filters
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add custom filters to lists on load.
// @author       Alex Brodnicki
// @match        https://www.imdb.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imdb.com
// @updateURL    https://raw.githubusercontent.com/apbrodnicki/userscripts/refs/heads/main/imdb/addCustomFiltersToLists.js
// @downloadURL  https://raw.githubusercontent.com/apbrodnicki/userscripts/refs/heads/main/imdb/addCustomFiltersToLists.js
// @grant        none
// ==/UserScript==

/**
* On page load of a list, the url will update with custom filters and reload.
*/
(function() {
	'use strict';

	// 'list path': 'query parameter filters'
	const listsWithFilters = {
		'user/ur188698730/watchlist': '?sort=release_date%2Casc&view=detailed', // Watchlist
		'list/ls542149947': '?sort=my_ratings%2Cdesc&view=detailed', // Movies and Shows Archive
		'list/ls542228347': '?sort=release_date%2Casc&view=detailed' // Booby
	};

	for (const list in listsWithFilters) {
		if (window.location.pathname.includes(list) && !window.location.href.includes(listsWithFilters[list])) {
			window.location.href = window.location.origin + window.location.pathname + listsWithFilters[list];
		}
	}
})();
