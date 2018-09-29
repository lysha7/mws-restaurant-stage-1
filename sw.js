const staticCache = 'offline-cache-v1';

self.addEventListener('fetch', function(event) {
	// Respond to requests with response from cache if available, or fetch from network if not available
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
		// Add any new responses from the network into the cache
		.then(function(response) {
			return caches.open(staticCache)
			.then(function(cache) {
				cache.put(event.request.url, response.clone());
				return response;
			});
		})
	);
});