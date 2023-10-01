$(document).ready(function () {
  let checkedAmenities = [];

  // Select all amenity input checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    // Verify if the checkbox is checked or not
    if ($(this).is(':checked')) {
      checkedAmenities.push({ data_amenity_id: amenityId, data_amenity_name: amenityName });
    } else {
      // If unchecked, remove the amenity that matches the Id
      checkedAmenities = checkedAmenities.filter(function (amenity) {
        return amenity.data_amenity_id !== amenityId;
      });
    }

    // Update the <h4> tag with the list of amenities
    const amenitiesList = checkedAmenities.map(function (amenity) {
      return amenity.data_amenity_name;
    }).join(', ');

    $('.amenities h4').text('Amenities: ' + amenitiesList);

    // Check the state of checkedAmenities
    console.log('Checked Amenities:', checkedAmenities);
  });
});
$.get("http://0.0.0.0:5001/api/v1/status/", data => {
    if (data.status == "OK") {
      $('DIV#api_status').addClass("available");
    } else {
      $('DIV#api_status').removeClass("available");
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
              }));
            }
});
