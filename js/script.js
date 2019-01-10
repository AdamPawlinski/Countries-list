$(function(){

  // establishing API connection and request

  var url = 'https://restcountries.eu/rest/v2/name/';
  var countriesList = $('#countries');
  function searchCountries(){
    var countryName = $('#country-name').val();
    if (!countryName.length) countryName = 'Poland';
    $('.list').attr('style', 'display:block');
    $.ajax({
      dataType: "json",
      url: url + countryName,
      success: showCountriesList,
      statusCode: {
        404: exception()
      }
    });
  }

  // rendering countries list as the response for request; data divided to thousands and millions 
    
  function showCountriesList(resp){
    countriesList.empty();
    var population = '';           
    resp.forEach(function(item) {   
      population = item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");        
      countriesList.append(
        '<table class="country-table">' +
          '<caption>' + item.name + '</caption>' +
          '<thead>' +
            '<td>region</td><td>capital</td><td>population</td><td>flag</td>' +
          '</thead>' +          
          '<tr>' +
            '<td>' + item.subregion + '</td><td>' + item.capital + '</td><td>' + population + '</td><td><img src="' + item.flag + '" class="flag"></td>' +
          '</tr>' +
        '</table>'
      )
    })
  }     

  function exception() {
    countriesList.empty();
    $('.list > h2').attr('style', 'display:none');
    countriesList.append("<h3>There's no such country on the list</h3>");
  }

  // firing searching on click or enter

  $('#search').on('click', searchCountries);
  $('#country-name').on('keydown', function(event) {
    if (event.which === 13)
    searchCountries();
  });
});
