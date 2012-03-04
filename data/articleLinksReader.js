$('#left_content_box').css('background-color', 'yellow');
var articleLinks = [];
var articleLink = '';
var active = true;
$('.floatBoxLeft').prepend('<div style="background:#9fff32;" id="clickAllLinks"><a style="font-size: 16px; line-height:16px; font-weight: bold; color: red;" href="#">Click Me To Got All Emails</a></div>');
self.on('message', function onMessage(activation) {
	active = activation;
});
/*$('#left_content_box ol li b a').each( function() {
	$(this).css({'color':'red', 'font-size':'15px'});
	
	articleLink = $(this).attr('href');
	alert(articleLink);
	articleLinks.push(articleLink);
	//tabs.open($(this).attr('href'));
	$(this).html('hihi');
});*/

self.port.emit("journalTitle", [$('#journalTitle h2').text(),document.location.toString()]);
$('.floatBoxLeft .topFloatBoxWrapper ul.top li a').each( function() {
	if ($(this).text().trim() == 'Issues') {
		$(this).css({'color':'red'});
		self.port.emit('hasIssues', 1);
	} else {
		self.port.emit('hasIssues', 0);
	}
});
$('#left_content_box').find('a').live('click',function(event) {
	$(this).css({'color':'red'});	
	articleLink = $(this).attr('href');
	articleLinks.push(articleLink);
	console.log('articleLink: ' + articleLink);
	event.stopPropagation();
	event.preventDefault();	
	self.port.emit("articleLink", articleLink);
});
//self.port.emit("articleLinks", articleLinks);
/*var trigger = function($a) {
	$a.trigger('mouseenter');
	//alert('setTimeout');
}
$('#left_content_box').find('a').each( function() {
	setTimeout(trigger($(this)), 500);
});
*/
$('#clickAllLinks').live('click', function() {
	
	if (!active) {
		console.log('unactive');
		return;
	}
	console.log('active');
	$(this).css({'background':'yellow'});
	anchorClicker();
	
	/* Automaticly click Most Downloaded and retrive the content */
	$('#subTabs a').each( function() {
		if ($(this).text().trim() == 'Most Downloaded') {
			$(this).trigger('click');
			setTimeout(function() {
				anchorClicker();
			}, 5000);
		}
		
	});
});

/* find the anchor and click them */
function anchorClicker() {
	$('#left_content_box').find('a').each( function() {
		var $anchor = $(this);
		$(this).css({'border':'1px solid black'});
		setTimeout(function() {
			$anchor.trigger('click');
		}, 1000);
	});
}

//alert('fuck');