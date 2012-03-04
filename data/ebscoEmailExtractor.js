var $userArray = [];
var articleTitle = ''
var $articleFrom = 'ebsco';
var keywords = 'keywords:';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());
var authorInfoOrig = '';
var $authorAnchors = '';
var $authorArr = [];

console.log('extracting: ' + $('title').text().trim());

$articleTitle = $('title').text().trim();
$articleFrom = $('#citationFields dt:contains("来源") + dd').text();
$authorObj = $('#citationFields dt:contains("作者") + dd');

/* If the author is connexted by ; and there is 作者地址*/
if ($authorObj.text().match(/@/gi) && $('#citationFields dt:contains("作者地址")') != null) {
	$authorArr = $authorObj.text().trim().split(';');
	
	$authorAddressObj = $('#citationFields dt:contains("作者地址") + dd');
	email = $authorAddressObj.find('span:last').text();
	if (email.match(/@/gi) && $authorArr[0] != null && $authorArr[0] != '') {
		/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
		authorEmailLists = $authorArr[0] + '<br/>' + email + '<br/><br/>';
		self.postMessage([authorEmailLists,['ebsco',document.location.toString()], articleTitle,'','keywords','journalTitle','categories']);
	}
}

if ($authorObj.text().match(/@/gi)) {
	console.log('hiih');
	$authorObj.find('sup').remove();


	$authorObj.find('br').replaceWith(';');
	var $emailCite = $authorObj.find('cite:contains("@")');
	$emailCite.replaceWith('_-_' + $emailCite.text().trim());

	$authorArr = $authorObj.text().split(';');

	for (var i = 0; i<$authorArr.length; i++) {
		if($authorArr[i].match(/@/gi)) {
			authorEmailLists = $authorArr[i].replace('_-_', '<br/>') + '<br/><br/>';
			/* message[0]: authorName+email; message[1]:articleLink; message[2]:articleTitle; message[3]:The user Info orig; message[4]:keywords;*/
			//authorEmailLists = $authorArr[0] + '<br/>' + email + '<br/><br/>';
			self.postMessage([authorEmailLists,['ei',document.location.toString()], articleTitle,'','']);
		}
	}
	
} else {
    console.log('fk');
}




self.postMessage("finish");