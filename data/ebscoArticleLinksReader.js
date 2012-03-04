$('.result-list').css('background-color', 'yellow');
var articleLinks = [];
var articleLink = '';
var active = true;
$('.result-list').prepend$('body').prepend('<div style="background:#9fff32;" id="clickAllLinks"><a style="font-size: 16px; line-height:16px; font-weight: bold; color: red;" href="#">Click Me To Got All Emails</a></div>');

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

$('span.title-link-wrapper a').each( function() {
	$(this).replaceWith('<a class="articleLinkToGet" href="' + $(this).attr('href') + '">' + $(this).text() + '</a>');
});
$('a.articleLinkToGet').attr('onclick', '').unbind('click').css({'color':'green', 'background' : 'white'}).live('click',function(event) {
	event.stopPropagation();
	event.preventDefault();	
	/* article Title */
	var articleTitle = $(this).text();
	console.log('articleTitle: ' + articleTitle);
	self.port.emit("articleTitle", articleTitle);
	
	/* article Link */
	$(this).css({'color':'red', 'background':'white'});	
	articleLink = $(this).attr('href');
	articleLinks.push(articleLink);
	console.log('articleLink: ' + articleLink);

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
	$(this).css({'background':'white'});
	anchorClicker();
	
	/* Automaticly click Most Downloaded and retrive the content */

});

/* find the anchor and click them */
function anchorClicker() {
	$('a.articleLinkToGet').each( function() {
		$anchor = $(this).css({'border':'1px solid black', 'background': 'orange'});
		//setTimeout(function() {
			$anchor.trigger('click');
		//}, 1000);
	});
}

//alert('fuck');