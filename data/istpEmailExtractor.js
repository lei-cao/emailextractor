var $userArray = [];
var $articleTitle = ''
var $articleFrom = 'ebsco';
var $keywords = '';
var $subject = '';
//var authorInfoOrig = htmlencode($('#authAnchors p strong').html());
var authorInfoOrig = '';
var $authorAnchors = '';
var $emailsArr  = [];
var $authorsArr = [];

console.log('extracting: ' + $('title').text().trim());

$articleTitle = $('td.FullRecTitle').text();
$articleFrom = $('span.FR_label:contains("Source:") + value').text();
$keywords = $('span.FR_label:contains("Author Keywords:")').empty().parent().text().trim(); 
$subject = $('span.FR_label:contains("Subject Category:")').empty().parent().text().trim(); 

$('span.FR_label:contains("Author(s):")').parent().find('a').remove();
$authorsStr = $('span.FR_label:contains("Author(s):")').empty().parent().text().replace(/\(/gi, '').replace(/\)/gi, '').trim();
if ($('span.FR_label:contains("E-mail Address:")') != null && $('span.FR_label:contains("E-mail Address:")') != '') {
	$emailsStr = $('span.FR_label:contains("E-mail Address:")').empty().parent().text().trim();
	$emailsArr = $emailsStr.split(',');
	$authorsArr = $authorsStr.split(';');
}



/* If the authors no. is equal emails */
if ($emailsArr.length > 0) {
	for (var i = 0; i < $emailsArr.length; i++) {
		var $emailAuthor = $authorsArr[i].trim() + '<br/>' + $emailsArr[i].trim() + '<br/><br/>';
		/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
		console.log($emailAuthor);
		self.postMessage([$emailAuthor,['istp' + $articleFrom,document.location.toString()], $articleTitle, $keywords, 'journalTitle', $subject]);
	}
}

self.postMessage("finish");