var $userArray = [];
var $userInfo = '';
var $nameEmail = '';
var articleTitle = ''
var keywords = 'keywords:';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());
var $authorTd = $('table.Contact');

console.log('extracting: ' + $('title').text().trim());

var articleTitle = $('div.Heading1').text();


if($('table.Contact').length && $('table.Contact').text() != '' ) {
	$('table.Contact').each( function() {
		
		var $authorInfoObj = $(this).find('tbody tr td:eq(1)');
		$authorInfoOrig = $authorInfoObj.html();
		$authorInfoObj.find('strong:contains("Corresponding")').remove();
		$authorInfoObj.find('strong:contains("Email")').replaceWith('__');
		$authorInfo = $authorInfoObj.text().replace('__', '<br/>').trim();
		//$authorInfo.replace(/(Corresponding author)\W/gi, ' ');
		//$authorInfo.toString().replace(';;', '<br/>');
		$authorInfo += '<br/><br/>';
		console.log($authorInfo);
		/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
		message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
		self.postMessage([$authorInfo,['springer',document.location.toString()],articleTitle,'','keywords','journalTitle','categories']);
	});
} else if ($('li.contributor').length) {
	articleTitle = $('div.text h1').text();	
	journalTitle = $('h2:contains("About This Journal") + dl > dt:contains("Title") + dd').text();
	categories = $('dt:contains("Collection") + dd').text();
	console.log('ArticleTitle: ', articleTitle);
	console.log('JournalTitle: ', journalTitle);
	console.log('Categories: ', categories);
	
	/* Authors */
	$('li.contributor:contains("@")').each( function() {
		$(this).find('.affiliations').replaceWith('_-_');
		authorInfo = $(this).text().replace('_-_', '<br/>') + '<br/><br/>';
		self.postMessage([authorInfo,['springer',document.location.toString()],articleTitle,'','keywords',journalTitle,categories]);
		console.log('authorInfo: ', authorInfo);
	});
}
self.postMessage("finish");


	

