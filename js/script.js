$(function(){
  var url = 'https://restcountries.eu/rest/v2/name/';
  var countriesList = $('#countries');
  function searchCountries(){
    var countryName = $('#country-name').val();
    if (!countryName.length) countryName = 'Poland';
    $.ajax({
      dataType: "json",
      url: url + countryName,
      success: showCountriesList
    });
  }

  function showCountriesList(resp){
    countriesList.empty();

    resp.forEach(function(item) {
      $('<li>').text(item.name + ', capital: ' + item.capital).appendTo(countriesList);
    })
  }

  $('#search').on('click', searchCountries);
}
