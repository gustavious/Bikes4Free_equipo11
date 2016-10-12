//MAPA
var map;

function initMap() {
    var centro = { lat: 4.6103989, lng: -74.0780595 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: centro
    });
}