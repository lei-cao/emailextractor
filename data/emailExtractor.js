var $userArray = [];
var $userInfo = '';
var $nameEmail = '';
var articleTitle = ''
var keywords = 'keywords:';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());

console.log('extracting: ' + $('title').text().trim());

if ( $('div.articleTitle') != null && $('div.articleTitle').text() != '' ) {
	articleTitle = $('div.articleTitle').html();
}
	
var $authorInfoOrig = '';//$('#authAnchors > p strong').html();
var $authorAnchors = $('#authAnchors > p strong');


$authorAnchors.find('a[rel!="nofollow"]').remove();
$authorAnchors.find('sup').remove();
$authorAnchors.find('a[href*="@"]').each( function() {
	$(this).replaceWith($(this).attr('href'));
});
$authorAnchors.text($authorAnchors.text().replace(/ and/gi, ',').replace(/ MD,/gi, '').replace(/ PhD,/gi, '').replace(/ MPH/gi, '').replace(/PhD/gi, '').replace(/MD/gi, ''));

if($authorAnchors.html() != null && $authorAnchors.html() != '' ) {
	$userArray = $authorAnchors.html().split(',');

	for (var i = 0; i < $userArray.length; i++) {
		if ($userArray[i] != '' && $userArray[i].toString().match(/@/gi)) {
			$nameEmail = $userArray[i].replace(/mailto:/gi, '<br/>') + '<br/><br/>';
			self.postMessage([$nameEmail.toString(),['elsevier',document.location.toString()],articleTitle,$authorInfoOrig.toString(),keywords,$('#ddJrnl b').text(),'categories']);

		}
	}
	
}

self.postMessage("finish");

// html entities encoder
function htmlencode(str)
{
    return str.replace(/[&<>"']/g, function(tt) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[tt] + ";";
    });
}
//alert($nameEmail);

	

