$('#records_chunks').css('background-color', 'yellow');
var articleLinks = [];
var articleLink = '';
var active = true;
$('#records_chunks').prepend('<div style="background:#9fff32;" id="clickAllLinks"><a style="font-size: 16px; line-height:16px; font-weight: bold; color: red;" href="#">Click Me To Got All Emails</a></div>');

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

/* Get The journal title URL and the volume*/
self.port.emit("journalTitle", ['ebsco',document.location.toString()]);


$('td.summary_data').each(function() {
	$(this).find('a:first').css({'color':'green'}).live('click',function(event) {

		$(this).css({'color':'red', 'background' : 'white'})
		/* article Title */
		//var articleTitle = $(this).text();
		//console.log('articleTitle: ' + articleTitle);
		//self.port.emit("articleTitle", articleTitle);
		event.stopPropagation();
		event.preventDefault();		
		/* article Link */
		$(this).css({'color':'red'});	
		articleLink = 'http://apps.webofknowledge.com' + $(this).attr('href');
		articleLinks.push(articleLink);
		console.log('articleLink: ' + articleLink);

		self.port.emit("articleLink", articleLink);
	});
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
	$(this).css({'background':'white'});
	anchorClicker();
	
	/* Automaticly click Most Downloaded and retrive the content */

});

/* find the anchor and click them */
function anchorClicker() {
	$('td.summary_data').each( function() {
		$anchor = $(this).find('a:first').css({'border':'1px solid black'});
		//setTimeout(function() {
			$anchor.trigger('click');
		//}, 1000);
	});
}