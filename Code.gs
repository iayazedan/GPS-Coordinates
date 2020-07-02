// custom menu
function onOpen() {
 var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lat And Lng').addItem('Get Lat & Lng', 'LatLng').addToUi();
}
function LatLng() {
  //Gets the active sheet, Range and cell.
  var ss = SpreadsheetApp.getActiveSheet();
  var rng = ss.getDataRange();
  var cs = rng.getValues();
  
  // array To store the data 
  var latitude = [];
  var longitude = [];
  
  // get the address from google sheet & use Google geocoder API
  for (var i = 1; i < cs.length; i++) {
    var address = cs[i][0];
    var geocoder = Maps.newGeocoder().geocode(address);
    var results = geocoder.results[0];
 
    var lat = lng = 0;
    if (results) {
      lat = results.geometry.location.lat;
      lng = results.geometry.location.lng;
    }
   
    latitude.push([lat]);
    longitude.push([lng]);
  }
   // add the latitude and longitude to your sheet
  ss.getRange('B2').offset(0, 0, latitude.length).setValues(latitude);
  ss.getRange('C2').offset(0, 0, longitude.length).setValues(longitude);
}
