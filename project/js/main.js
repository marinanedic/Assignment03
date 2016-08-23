var topscores = [
                  // {
                  //   "name": "Player 1",
                  //   "score": "##",
                  // },
                  // {
                  //   "name": "Player 2",
                  //   "score": "##",
                  // },
                  // {
                  //   "name": "Player 3",
                  //   "score": "##",
                  // },
                ];

              var $leaderboard = $('<li><span class="name"> Player Name </span><span class="score"> Score </span></li>');
//Timer
var seconds = -1;
var clock;


var doscore = function() {

	// Clear the page
	$('.scores').empty();

	// Put them in order
	topscores.sort(function (a, b) {
	  if (a.score > b.score) {
	    return -1;
	  }
	  if (a.score < b.score) {
	    return 1;
	  }
	  // a must be equal to b
	  return 0;
	});

	// Add to page
	$.each(topscores, function(index, item) {

	  var $onescore = $leaderboard.clone().appendTo('.scores');

	  $onescore.find('.name').text(item.name);
	  $onescore.find('.score').text(item.score);

	});
};







var speed = 10;
var goup = false;
var timer;
var score = 0;

$('.start').click(function() {

	$('.start').hide().text("TRY AGAIN?");
	$('.gameover').hide();
	$('.stage').show();
	$('.PlayerName').hide();
	restart();
	timer = setInterval(game, speed);

});

//score + 


var restart = function() {
	$('.enemies').removeAttr('style');
	$('#marina').removeAttr('style');
	$('.nicks').removeAttr('style');
	$('.bestscore').hide();
	
	
	if (timer) {
		topscores.push({"name": $(".PlayerName").val(), "score": " - " + seconds});
		doscore();
	}
	seconds = -1;
	getTime();
};




var game = function() {

	// move the nicks
	$('.nicks').css('left', '-=1px').each(function() {
		if (parseInt($(this).css('left')) <= -($('.stage').width() + $(this).width()))
			$(this).css('left', '+=1500px')

	});

	// gravity of the playa
	if (goup)
		$('#marina').css('top', '-=1.5px');
	else
		$('#marina').css('top', '+=1.5px');

	if (((parseInt($('#marina').css('top')) + $('#marina').height()) > $('.stage').height() || parseInt($('#marina').css('top')) < 0)) {
		gameover();
	}


	var overlap = $("#marina").collision( ".nicks");
	if (overlap.length) {
		// a collision has occured
		console.log(overlap);
		gameover();
	}
		
	// Increase speed as the game goes on
	//speed++;

};


// Main timeline

// i pressed a key
$(document).keydown(function() {

	// 32 == spacebar
	if (event.which == 32) {
		goup = true;
	}
});

// i released a key
$(document).keyup(function() {

	// 32 == spacebar
	if (event.which == 32) {
		goup = false;
	}
});

// GAME OVER
var gameover = function() {

	console.log(topscores);



	// Bring up some kind of whatever
	clearInterval(timer);
	clearInterval(clock);
	// seconds = 0;
	$('.gameover').show();
	$('.start').show();
	$('.bestscore').show();
	$('.PlayerName').show();
	$('.nicks').removeAttr('style');
	$('.Player').removeAttr('style');
	$('.stage').removeAttr('style');
};



var getTime = function() {

	seconds++;
	$('.showval').html("SCORE:" + seconds);
};

getTime(); // <-- Call once to show the time immediately


$('.start').click(function() {

	// Update the time every 1000ms thereafter (every 1 second)
	clock = setInterval(getTime, 1000);
});









//<input type="text" class="???">

// seconds           //<-- score
// $('???').val()    //<-- name

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
