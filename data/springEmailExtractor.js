var $userArray = [];
var $userInfo = '';
var $nameEmail = '';
var articleTitle = ''
var keywords = 'keywords:';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());
var $authorTd = $('table.Contact');

console.log('extracting: ' + $('title').text().trim());

if ($('li.contributor').length) {
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


	

