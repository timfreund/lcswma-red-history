//Slideshow

function slideSwitch() {
    var $active = $('#slideshow div.active');

    if ( $active.length == 0 ) $active = $('#slideshow div:last');

    var $next =  $active.next().length ? $active.next()
        : $('#slideshow div:first');

    $active.addClass('last-active');
        
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 0, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 5000 );
});


/*function slideSwitch() {
    var $active = $('#slideshow div.active');

    if ( $active.length == 0 ) $active = $('#slideshow div:last');

    var $next =  $active.next().length ? $active.next()
        : $('#slideshow div:first');

    $active.addClass('last-active');
        
    $next.css({opacity: 0.0})
        .addClass('active')
        .css({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 5000 );
});*/

// No Idea
function csn(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

//Dashbaord Values

function displayValues(){
//Parse Text file, turn lines into array, distribute values to proper display DOM elements.

$.get('getfile.cfm', function(data) {    
    
	var theValues = new Array();
  	theValues = data.split("<br>");	
	
	$('span#windytd').html(theValues[2]); // Slide 13
	$('span#windoutput').html(theValues[3]); //Slide 12 
	$('span#windco2').html(theValues[4]); //Slide 14
	$('span#windgallons').html(theValues[5]); //Slide 11
	$('span#windhomes').html(theValues[7]);	//Slide 10
	$('span#gasytd').html(theValues[9]);	
	$('span#gasoutput').html(theValues[10]); //Slide 1
	$('span#gasco2').html(theValues[11]); //Slide 2
	$('span#gashomes').html(theValues[14]); //Slide 3
	$('span#gasmethane').html(theValues[16]); //Slide 5
	$('span#gassteam').html(theValues[17]); //Slide 4
	$('span#wteoutput').html(theValues[21]); //Slide 8 
	$('span#wteco2').html(theValues[22]); //Slide 7 (2)
	$('span#wtehomes').html(theValues[23]); //Slide 6
	$('span#wtewaste').html(theValues[24]); //Slide 7 (1)
	$('span#wteytd').html(theValues[20]); //Slide 9
	$('span#solaroutput').html(theValues[27]); //Slide 17
	$('span#solarytd').html(theValues[28]);
	$('span#solarhomes').html(theValues[29]); //Slide 15
	$('span#solarco2').html(theValues[30]);	//Slide 16
	
	//Harrisburg
	$('span#hbgytd').html(theValues[33].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbgoutput').html(theValues[34].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbgco2').html(theValues[35].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbghomes').html(theValues[36].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbgwastehour').html(theValues[37].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbgwasteday').html(theValues[38].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	$('span#hbgwasteytd').html(theValues[39].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));	
	
	var ht1 = theValues[7];
	var ht1 = ht1.replace(/,/g, "");
	var ht1 = parseInt(ht1);
	
	var ht2 = theValues[14];
	var ht2 = ht2.replace(/,/g, "");
	var ht2 = parseInt(ht2);
	
	var ht3 = theValues[23];
	var ht3 = ht3.replace(/,/g, "");
	var ht3 = parseInt(ht3);
	
	var ht4 = theValues[29];
	var ht4 = ht4.replace(/,/g, "");
	var ht4 = parseInt(ht4);
	
	var fullHomes = ht1 + ht2 + ht3 + ht4;
		
	$('span#homestotal').html(csn(fullHomes));
});

}

//Initialize function to display values.
$(document).ready(function(){
	displayValues();		
});

//Loop function, update every 60 seconds.
setInterval(function() {
    displayValues();
}, 60000);


//Slide for TV Facilities
$(document).ready(function(){
	
	slideUp = function(){		
	
			var slideUl = $('.facSlide ul');
			var firstLi = $('.facSlide ul li:first');
			var lastLi = $('.facSlide ul li:last');
			var defTop = -255;			
			
			$(slideUl).animate({marginTop: defTop + "px"}, 12000, "linear", function(){
				$(lastLi).after($(firstLi));
				$(slideUl).css("margin-top", "0px"),slideUp();
				
			});		
	
	};
	
	slideUp();
	
	//Mobile Scroll Prompt
	
	$('.lookDown').fadeIn(1500);
	
	fadeLook = function(){
		$('.lookDown').fadeOut(1500);
	}
	
	$(window).scroll(function(){
		fadeLook();
	});
	
	//setTimeout(function(){fadeLook();},10000);
	
});

//News Ticker

/*$(function(){
    $('.scroller').marquee();
});*/



