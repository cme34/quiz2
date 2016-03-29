(function() {
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.
	
	$('.display').hide();
	var keepButtonCreated = false;
	
	$mouseover = $('.mouse-over');
	$click     = $('.click');
	$submit    = $('form');
	$timeout   = $('.timeout');
	$button    = $('.get');

	var lastValue = document.cookie.split(';');
	if (lastValue != "") {
		$('form').append('<p class="last-value">Last value: ' + lastValue + '</p>');
		$('.last-value').insertAfter('form');
		document.cookie = "";
	}
	
	$mouseover.on('mouseover', function() {
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});

	$click.on('click', function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});

	$submit.on('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut('slow');
			});
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	$button.on('click', function() {
		$.ajax({
			url: 'http://www.mattbowytz.com/simple_api.json?data=quizData',
			success: function(result) {
				$('.display').show();
				$('.display').empty();
				$button.empty();
				$button.append('Change It');
				
				var value = Math.floor(Math.random() * result['data'].length);
				$('.display').append('<p class>' + result['data'][value] + '</p>');
				
				if (!keepButtonCreated) {
					keepButtonCreated = true;
					$('.get').append('<button class="keep">Keep It</button>');
					$('.keep').insertAfter('.get');
				}
				
				$('.keep').on('click', function() {
					document.cookie = result['data'][value];
				});
			}
		});
	});
	
	$(document).on('ready', function() {
		setTimeout(function() {
			$timeout.fadeOut('slow');
		}, 1000);
	});
})();