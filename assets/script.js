$('.set-trip').pickmeup_twitter_bootstrap();

$(document).on('click', '#login-btn',(e) => {
    $('#user-section').empty().html($(`
        <span class="glyphicon glyphicon-remove close"></span>
        <h3 class="form-title text-center">LOGIN</h3>
        
        <div class="text-center" id="social-login">
            <a class="btn btn-primary" href="/auth/facebook" id="fb-login">f FACEBOOK</a>
        </div>

        <hr>

        <form class="form-horizontal" name="login" method="POST" action="/login">   
            <div class="form-group">
                <label for="email" class="control-label">Email: </label>
                <input type="email" name="username" class="form-control">
            </div>

            <div class="form-group">
                <label for="password" class="control-label">Password: </label>
                <input type="password" name="password" class="form-control">
            </div>
                
            <div class="form-group text-center">
                <input type="submit" value="Login" class="btn btn-default">
            </div>
        </form>
        <a class="signup-btn">Not yet a member?Sign up here</a>
    `))
    if (!$('#user-section').hasClass("show-active")) {
        $('#user-section').addClass("show-active")
    }
})

$(document).on('click','.close', (e) => {
    $('#user-section').removeClass("show-active")
})

$(document).on('click', '.signup-btn',(e) => {
    $('#user-section').empty().html($(`
        <span class="glyphicon glyphicon-remove close"></span>
        <h3 class="form-title text-center">SIGN UP</h3>
        <form class="form-horizontal" name="signup" method="POST" action="/user">
            <div class="form-group">
                <label for="username" class="control-label">Username: </label>
                <input type="text" name="username" class="form-control">
            </div>

            <div class="form-group">
                <label for="email" class="control-label">Email: </label>
                <input type="email" name="email" class="form-control">
            </div>

            <div class="form-group">
                <label for="password" class="control-label">Password: </label>
                <input type="password" name="password" class="form-control">
            </div>

            <div class="form-group">
                <label for="password" class="control-label">Password confirmation: </label>
                <input type="password" name="password_confirmation" class="form-control">
            </div>
                
            <div class="form-group text-center">
                <input type="submit" value="Register" class="btn btn-default">
            </div>
        </form>
    `))
    if (!$('#user-section').hasClass("show-active")) {
        $('#user-section').addClass("show-active")
    }
})

$('#trip-date').on('click',function(e){
    let start = $('#start-date').val();
    let end = $('#end-date').val();
    let numberOfDays = ((new Date(end).getTime() - new Date(start).getTime()) / (1000*60*60*24)) + 1;
    let days = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
    $('.section-one').css('display' , 'none');
    $('#trip-schedule').css('display', 'inline');
    $('#travel-dates').append(` ${start} 〜 ${end}`);
    for(let i=0; i<numberOfDays; i++){
        let wholeDate = new Date(new Date(start).getTime() + i*1000*60*60*24);
        let month = wholeDate.getMonth()+1;
        let date = wholeDate.getDate();
        let day = days[wholeDate.getDay()];
        $('.trip-container-box').append(`
            <div id="trip-container${i}">
                <h4>${month}-${date}-${day}</h4>
                <div class="trip-container">
                    <div class="btn-cointainer">
                        <button class="btn btn-primary select-hotel">Hotel</button>
                        <button class="btn btn-primary select-transportation">Transportation</button>
                        <button class="btn btn-primary select-locations">Locations</button>
                    </div>
                </div>
            </div>
        `)
    }
})

$(document).on('click','.select-hotel',function(e){

})