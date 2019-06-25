// Hiding zip code form and submit button.
$(".md-form").hide();

// When restaurant button is clicked, zip code box reappears.
var restaurantClicked = $(document).on("click", ".restaurant", function () {
  console.log("restaurant button was clicked");
  $(".restaurant").addClass('animated tada')
  // $(".md-form").show();
});

// When hotels button is clicked, zip code box reappears.
var hotelClicked = $(document).on("click", ".hotel", function () {
  console.log("hotels button was clicked");
  $(".hotel").addClass('animated tada')
  // $(".md-form").show();
});

// When attractions button is clicked, zip code box reappears.
var attractionsClicked = $(document).on("click", ".attractions", function () {
  console.log("attractions button was clicked");
  $(".attractions").addClass('animated tada')
  // $(".md-form").show();
});

// When all button is clicked,  zip code box reappears.
var allClicked = $(document).on("click", ".all", function () {
  console.log("all button was clicked");
  $(".all").addClass('animated tada')
  // $(".md-form").show();
});

// Submit Button
// $(document).on("click", ".btn", function () {
//   console.log("submit button clicked");
// });

var map = null;

function initMap() {
  var location = new Object();
  navigator.geolocation.getCurrentPosition(function (pos) {
    location.lat = pos.coords.latitude;
    location.long = pos.coords.longitude;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: location.lat, lng: location.long },
      zoom: 15
    });
    getRestaurants(location);
  });
}

function getRestaurants(location) {
  var resLocation = new google.maps.LatLng(location.lat, location.long);
  var request = {
    location: resLocation,
    radius: "1500",
    type: ["restaurant"]
  };
  service = new google.maps.places.PlaceService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results);
      var place = results[i];
      var price = createPriace(place.price_level);
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
  marker.addListener("click", function () {
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


