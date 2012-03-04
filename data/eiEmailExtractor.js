var $userArray = [];
var articleTitle = ''
var keywords = 'keywords:';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());
var authorInfoOrig = '';
var $authorAnchors = '';

console.log('extracting: ' + $('title').text().trim());

$articleTitle = $('td span b:contains("Title")').parent().parent().parent().text();

if($('a:contains("@")') != null && $('a:contains("@")') != '') {
	 $('a:contains("@")').each( function() {
		$authorEmailLists = $(this).parent().text().replace('(', '<br/>').replace(')','<br/><br/>').trim();
		console.log($authorEmailLists);
		/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
		self.postMessage([$authorEmailLists,['ei',document.location.toString()], articleTitle,'','keywords','journalTitle','categories']);
	});
}

self.postMessage("finish");