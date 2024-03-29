(window => {
	const {
		screen: { width, height },
		navigator: { language },
		location,
		localStorage,
		document,
		history,
	} = window;
	const { hostname, pathname, search } = location;
	const { currentScript } = document;

	if (!currentScript) return;

	const _data = 'data-';
	const _false = 'false';
	const attr = currentScript.getAttribute.bind(currentScript);
	const website = attr(_data + 'website-id');
	const hostUrl = attr(_data + 'host-url');
	const autoTrack = attr(_data + 'auto-track') !== _false;
	const domain = attr(_data + 'domains') || '';
	const domains = domain.split(',').map(n => n.trim());
	const root = hostUrl
		? hostUrl.replace(/\/$/, '')
		: currentScript.src.split('/').slice(0, -1).join('/');
	const endpoint = `${root}/api/send`;
	const screen = `${width}x${height}`;
	const eventRegex = /data-umami-event-([\w-_]+)/;
	const eventNameAttribute = _data + 'umami-event';
	const delayDuration = 300;

	/* Helper functions */

	const hook = (_this, method, callback) => {
		const orig = _this[method];

		return (...args) => {
			callback.apply(null, args);

			return orig.apply(_this, args);
		};
	};

	const getPath = url => {
		try {
			return new URL(url).pathname;
		} catch (e) {
			return url;
		}
	};

	const getPayload = () => ({
		website,
		hostname,
		screen,
		language,
		title: document.title,
		url: currentUrl,
		referrer: currentRef,
	});

	/* Tracking functions */

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const webVitals = () => {
		/** @type {PerformanceNavigationTiming?} */
		const vitals = (performance && performance.getEntriesByType('navigation')[0]) || {};

		// Vitals via https://github.com/GoogleChrome/web-vitals/tree/main/src

		/**
		 *
		 * @param {keyof PerformanceNavigationTiming} a
		 * @param {(keyof PerformanceNavigationTiming)?} b
		 * @returns
		 */
		const sanity = (a, b) =>
			Math.max(vitals[a] - (vitals[b] || 0) - vitals.activationStart, 0) || null;
		const cope = key => sanity(key + 'End', key + 'Start');

		let lcp = 0;
		PerformanceObserver &&
			new PerformanceObserver(list => {
				const entries = list.getEntries();
				lcp = entries[entries.length - 1].renderTime || 0;
			}).observe({ type: 'largest-contentful-paint', buffered: true });

		let cls = 0;
		PerformanceObserver &&
			new PerformanceObserver(entryList => {
				for (const entry of entryList.getEntries()) {
					if (!entry.hadRecentInput) {
						cls += entry.value;
					}
				}
			}).observe({ type: 'layout-shift', buffered: true });

		return {
			// https://developers.cloudflare.com/analytics/web-analytics/understanding-web-analytics/page-load-time-summary/
			load: sanity('loadEventEnd'),
			dns: cope('domainLookup'),
			tcp: cope('connect'),
			// The time elapsed between making an HTTP request and receiving the first byte of the response.
			request: sanity('responseStart', 'requestStart'),
			// Download time
			response: sanity('responseEnd', 'responseStart'),
			// How long it took to render the page
			processing: sanity('domComplete', 'domInteractive'),
			// this is basically request + stalled time but does stalled time really matter
			ttfp: sanity('responseStart'),
			cls,
			lcp,
		};
	};

	const trackingDisabled = () =>
		(localStorage && localStorage.getItem('umami.disabled')) ||
		(domain && !domains.includes(hostname));

	const handlePush = (state, title, url) => {
		if (!url) return;

		currentRef = currentUrl;
		currentUrl = getPath(url.toString());

		if (currentUrl !== currentRef) {
			setTimeout(track, delayDuration);
		}
	};

	const handleClick = () => {
		const trackElement = el => {
			const attr = el.getAttribute.bind(el);
			const eventName = attr(eventNameAttribute);

			if (eventName) {
				const eventData = {};

				el.getAttributeNames().forEach(name => {
					const match = name.match(eventRegex);

					if (match) {
						eventData[match[1]] = attr(name);
					}
				});

				return track(eventName, eventData);
			}
			return Promise.resolve();
		};

		const callback = e => {
			const findATagParent = (rootElem, maxSearchDepth) => {
				let currentElement = rootElem;
				for (let i = 0; i < maxSearchDepth; i++) {
					if (currentElement.tagName === 'A') {
						return currentElement;
					}
					currentElement = currentElement.parentElement;
					if (!currentElement) {
						return null;
					}
				}
				return null;
			};

			const el = e.target;
			const anchor = el.tagName === 'A' ? el : findATagParent(el, 10);

			if (anchor) {
				const { href, target } = anchor;
				const external =
					target === '_blank' ||
					e.ctrlKey ||
					e.shiftKey ||
					e.metaKey ||
					(e.button && e.button === 1);
				const eventName = anchor.getAttribute(eventNameAttribute);

				if (eventName && href) {
					if (!external) {
						e.preventDefault();
					}
					return trackElement(anchor).then(() => {
						if (!external) location.href = href;
					});
				}
			} else {
				trackElement(el);
			}
		};

		document.addEventListener('click', callback, true);
	};

	const send = (payload, type = 'event') => {
		if (trackingDisabled()) return;
		const headers = {
			'Content-Type': 'application/json',
		};
		if (typeof cache !== 'undefined') {
			headers['x-umami-cache'] = cache;
		}
		return fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify({ type, payload }),
			headers,
		})
			.then(res => res.text())
			.then(text => (cache = text))
			.catch(() => {}); // no-op, gulp error
	};

	const track = (obj, data) => {
		if (typeof obj === 'string') {
			return send({
				...getPayload(),
				name: obj,
				data: typeof data === 'object' ? data : undefined,
			});
		} else if (typeof obj === 'object') {
			return send(obj);
		} else if (typeof obj === 'function') {
			return send(obj(getPayload()));
		}
		return send(getPayload());
	};

	const identify = data => send({ ...getPayload(), data }, 'identify');

	/* Start */

	if (!window.umami) {
		window.umami = {
			track,
			identify,
		};
	}

	let currentUrl = `${pathname}${search}`;
	let currentRef = document.referrer;
	let cache;
	let initialized;

	if (autoTrack && !trackingDisabled()) {
		history.pushState = hook(history, 'pushState', handlePush);
		history.replaceState = hook(history, 'replaceState', handlePush);
		handleClick();

		const init = () => {
			if (document.readyState === 'complete' && !initialized) {
				track();
				initialized = true;
			}
		};

		document.addEventListener('readystatechange', init, true);

		init();
	}
})(window);
