var NowMoment = moment();
var currentDate = NowMoment.format(" M / D / YYYY ");

// This .on("click") function will trigger the AJAX Call
$("#city-submit").on("submit", displayCityInfo);
// this function is running the ajax calls, displaying the results in format
function displayCityInfo(event) {
  if (event) event.preventDefault();

  const searchButtonCity = $("#city-input").val();
  let cityName = null;
  if (searchButtonCity) {
    cityName = searchButtonCity;
  } else if ($(this).attr("data-name")) {
    cityName = $(this).attr("data-name");
  }

  // setting API Key for specific query
  var apiKey = "&appid=95cf54f7d36ce72c2810b5fda5b06674";
  //  setting query URL for five day forecast
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // setting lat and lon variables to that we can call the currentQueryURL
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    // setting current queryURL, retrieves today's data and next 7 days
    var currentQueryURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      apiKey;
    // requesting the JSON object for the current data and next 7 days
    $.ajax({
      url: currentQueryURL,
      method: "GET",
    }).then(function (weatherResponse) {
      console.log(weatherResponse);

      let icon = weatherResponse.current.weather[0].icon;
      // converting the data for ICON to an image
      let iconIMG =
        "<img src=http://openweathermap.org/img/w/" + icon + ".png>";
      // retrieve results for City, current date and icon append to the appropriate div
      $(".city-display").html(response.city.name + currentDate + iconIMG);
      // retrieve results for current Humidity and append to the appropriate div and append to html
      $(".humidity").html(
        " Humidity: " + weatherResponse.current.humidity + "%"
      );
      // retrieve results for current Wind Speed and append to the appropriate div
      $(".wind-speed").html(
        " Wind Speed: " + weatherResponse.current.wind_speed.toFixed(1)
      );
      // set current tempF variable to the results of the conversion of the kalvin within the object
      var tempF = (weatherResponse.current.temp - 273.15) * 1.8 + 32;
      // apply termerature text to html
      $(".temp").text("Temperature (F) " + tempF.toFixed(1));
      // retrieve results for current UV-Index and append to the appropriate div
      $("#uvi").html(weatherResponse.current.uvi);

      function timeConverter(timestamp, option) {
        var a = new Date(timestamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes().toString();
        min = min.padStart(2, "0");
        const formatDate = date + " " + month + " " + year;
        const formatTime = hour + ":" + min;

        console.log(typeof formatTime);
        if (option === "time") {
          return formatTime;
        }
        if (option === "date") {
          return formatDate;
        }

        return {
          date: formatDate,
          time: formatTime,
        };
      }
      console.log(timeConverter(weatherResponse.current.sunrise, "time"));
      console.log(timeConverter(weatherResponse.current.sunset, "time"));

      var newDiv = $("<div>");
      newDiv.addClass("card border-primary mb-3" style="max-width: 18rem;");
      var newHeader = $("<div>");
      newHeader.addClass("card-header");
      var newBody = $("<div>");
      newBody.addClass("card-body text-primary");
      var newTitle = $("<h5>");
      newTitle.addClass("card-title");
      var newText = $("<p>");
      newTitle.addClass("card-text");

      // creating new card to hold weather data
      newDiv.append(newHeader);
      newDiv.append(newBody);
      newBody.append(newTitle);
      newBody.append(newText);
    });
  });
}
