// map.js
console.log("Map script loaded");

// Check if required variables are available
if (typeof mapToken === 'undefined' || !mapToken) {
    console.error('Map token is not defined');
    document.getElementById('map').innerHTML = '<p class="text-danger">Map configuration error: Token not found</p>';
} else if (typeof listing === 'undefined' || !listing) {
    console.error('Listing data is not defined');
    document.getElementById('map').innerHTML = '<p class="text-danger">Map configuration error: Listing data not found</p>';
} else if (!listing.coordinates || !Array.isArray(listing.coordinates) || listing.coordinates.length !== 2) {
    console.error('Invalid coordinates:', listing.coordinates);
    document.getElementById('map').innerHTML = '<p class="text-danger">No location data available for this listing.</p>';
} else {
    // Initialize the map
    mapboxgl.accessToken = mapToken;
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: listing.coordinates, // [longitude, latitude]
        zoom: 10
    });

    // Add marker
    const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(listing.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h6>${listing.title}</h6><p>${listing.location}</p>`)
        )
        .addTo(map);

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());
}