$('.resultRow tbody tr td').css('background-color', 'yellow');
var articleLinks = [];
var articleLink = '';
var active = true;
$('#issueList').prepend('<div style="background:#9fff32;" id="clickAllLinks"><a style="font-size: 16px; line-height:16px; font-weight: bold; color: red;" href="#">Click Me To Got All Emails</a></div>');
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

$('.resultRow').each( function() {
	$(this).find('tbody tr td').find('a:first').css('color','blue').live('click',function(event) {
		$(this).css('color', 'orange');	
		articleLink = $(this).attr('href');
		articleLinks.push(articleLink);
		console.log('articleLink: ' + articleLink);
		event.stopPropagation();
		event.preventDefault();	
		self.port.emit("articleLink", articleLink);
	});
});
	
$('.resultRow').each( function() {
	;
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

});

/* find the anchor and click them */
function anchorClicker() {
	$('.resultRow').each( function() {
		$(this).find('tbody tr td').find('a:first').each( function() {
			var $anchor = $(this);
			$(this).css({'border':'1px solid black'});
			setTimeout(function() {
				$anchor.trigger('click');
			}, 1000);
		});
	});
}

