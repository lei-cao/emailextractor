var $authorAnchors = $('#authAnchors p strong');
$authorAnchors.find('a[rel!="nofollow"]').remove();
$authorAnchors.find('sup').remove();

$authorAnchors.find('a[rel="nofollow"]').each(function() {	
	$(this).replaceWith($(this).attr('href').toString().replace('mailto:', ';<br/>'));
});
$authorAnchors.html($authorAnchors.html().replace(/,/gi, '<br/><br/>').replace('and', '<br/><br/>'));
var authorAnchorsStr = $authorAnchors.toString().replace('<br/>', 'mailto:');

/*
var $userArray = $authorAnchors.toString().split(',', 1);
$userArray.each(function() {
	
	if ( var $emailAnchor = $(this).find('a[rel="nofollow"]')) {
		$emailAnchor.replaceWith($(this).attr('href').toString().replace('mailto:', '<br/>'));
	} else {
		$(this) = '';
	}
}
var userInfo = '';
$userArray.each(function() {
	userInfo = userInfo + $(this).html() + '<br/><br/>';
});*/




var email = $('#authAnchors p').html();
if (email != '') {
	postMessage(email);
}
