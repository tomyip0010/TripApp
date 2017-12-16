const swappable = new Swappable.default(document.getElementsByClassName('schedule-activity-blocks')[0], {
  draggable: 'li',
});

swappable.on('swappable:start', () => console.log('swappable:start'))
swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
swappable.on('swappable:stop', () => console.log('swappable:stop'));

if($('#new-activity-type').text().length > 0){
  if($('#new-activity-type').text() === 'Hotel'){
    //console.log('new event is hotel..');
    let days = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
    let newHotelName =  $('.new-activity-name').text();
    let newHoteAddress = $('.new-activity-location').text();
    let newCheckIn = $('.new-activity-hotel-check-in').text();
    let newCheckInDay = days[new Date(newCheckIn).getDay()-1];
    let newCheckOut = $('.new-activity-hotel-check-out').text();
    let newCheckOutDay = days[new Date(newCheckOut).getDay()-1];
    let newNoOfNights = (new Date(newCheckOut).getTime() - new Date(newCheckIn).getTime()) /(1000*60*60*24);
    let checkInContainer = `.activity-section-${newCheckIn}-${newCheckInDay}`;
    //console.log('new check in >>'+newCheckIn);
    //console.log('new check out >>'+newCheckOut);
    //console.log('new no of nights >>'+newNoOfNights);
    let newSwappableActivity = `
      <li class="list-group-item swappable-block">
        <div class="row">
            <div class="col-xs-8">
                <h5>Hotel</h5>
            </div>
            <div class="col-xs-4">
                <i class="fa fa-times fa-1x"></i>
            </div>
        </div>
        <p>${newHotelName}</p>
        <p>${newHoteAddress}</p>
      </li>
    `
    for(let i=0; i<newNoOfNights; i++){
      $(`${checkInContainer}`).find('ul').append(newSwappableActivity);
      checkInContainer = checkInContainer.next('ul');
    }
    //$('#new-activity-details').find('p').empty();
    //$('#new-activity-type').empty();
  }
}