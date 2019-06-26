

var APIKey = "6b269d570dc5d194b8aea5ab4d50e05b"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Dallas,Texas&units=imperial&appid=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        console.log(iconurl);

        $("#icon").html(response.name + " " + Math.round(response.main.temp) + "&#8457;");
        $('#wicon').attr('src', iconurl);
        $('#mintemp').html("Low temp: " + parseInt(response.main.temp_min) + "&#8457;");

    });










