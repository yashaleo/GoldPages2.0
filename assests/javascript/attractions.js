var map = null;

function initMap() {
  var location = new Object();
  navigator.geolocation.getCurrentPosition(function(pos) {
    location.lat = pos.coords.latitude;
    location.long = pos.coords.longitude;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: location.lat, lng: location.long },
      zoom: 15
    });
    getAttractions(location);
  });
}

function getAttractions(location) {
  var resLocation = new google.maps.LatLng(location.lat, location.long);
  var request = {
    location: resLocation,
    radius: "1500",
    type: ["amusement_park, aquarium, art_gallery, beauty_salon, casino, movie_theater, museum, night_club, shopping_mall, spa, zoo"]
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results);
      var place = results[i];
      var price = createPrice(place.price_level);
      var content = `<h3>${place.name}</h3>
            <h4>${place.vicinity}</h4>
            <p>Prices:${price}</br>
            Rating: ${place.rating}`;

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });

      var infowindow = new google.maps.InfoWindow({
        content: content
      });

      bindInfoWindow(marker, map, infowindow, content);
      marker.setMap(map);
    }
  }
}

function bindInfoWindow(marker, map, infowindow, html) {
  marker.addListener("click", function() {
    infowindow.setContent(html);
    infowindow.open(map, this);
  });
}

function createPrice(level) {
  if (level != "" && level != null) {
    var out = "";
    for (var x = 0; x < level; x++) {
      out += "$";
    }
    return out;
  } else {
    return "?";
  }
}