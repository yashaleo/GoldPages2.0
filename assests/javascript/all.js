var map = null;

function initMap() {
  var location = new Object();
  navigator.geolocation.getCurrentPosition(function(pos) {
    location.lat = pos.coords.latitude;
    location.long = pos.coords.longitude;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: location.lat, lng: location.long },
      zoom: 13
    });
    getAll(location);
  });
}

function getAll(location) {
  var resLocation = new google.maps.LatLng(location.lat, location.long);
  var request = {
    location: resLocation,
    radius: "4000",
    type: ["restaurant, lodging, lodging, amusement_park, aquarium, art_gallery, beauty_salon, casino, movie_theater, museum, night_club, shopping_mall, spa, zoo"]
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var infowindow = new google.maps.InfoWindow({
      content: ""
    });
    for (var i = 0; i < results.length; i++) {
      console.log(results);
      var place = results[i];
      if (place.rating < 4.0 || !place.rating) {
        continue;
      }
      var price = createPrice(place.price_level);

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: "https://maps.google.com/mapfiles/kml/pal4/icon39.png",
        title: place.name,
        vicinity: place.vicinity,
        price: price,
        rating: place.rating
      });

      google.maps.event.addListener(marker, "click", function() {
        // console.log(this);
        infowindow.close();
        infowindow.setContent(`<h3>${this.title}</h3>
            <h4>${this.vicinity}</h4>
            <p>Prices:${this.price}</br>
            Rating: ${this.rating}`);
        infowindow.open(map, this);
      });

      marker.setMap(map);
    }
  }
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
