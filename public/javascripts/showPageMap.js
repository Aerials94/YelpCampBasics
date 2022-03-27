
  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'cluster-map', // container ID
  style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
  center: campgroundData.geometry.coordinates, 
  zoom: 6 // starting zoom
  });

const marker1 = new mapboxgl.Marker()
.setLngLat(campgroundData.geometry.coordinates)
.addTo(map)
.setPopup(
  new mapboxgl.Popup({offset: 25})
  .setHTML(
    `<h3>${campgroundData.title}</h3><p>${campgroundData.location}`
  )
)

console.log(campgroundData.geometry.coordinates)