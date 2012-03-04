var {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
const widgets = require("widget");
const data = require('self').data;
const tabs = require("tabs");
const pageMod = require("page-mod");
const pageWorkers = require("page-worker");
const simpleStorage = require('simple-storage');
const panels = require('panel');
const clipboard = require('clipboard');
const Request = require('request').Request;
const xhr = require('xhr');

var contextMenu = require("context-menu");
var insertIntoDB = 'on';
var extractorIsOn = true;
var linkReaders = [];
var hasIssues = 0;

if (!simpleStorage.storage.emailLists)
	simpleStorage.storage.emailLists = [];

if (!simpleStorage.storage.journalTitles)
	simpleStorage.storage.journalTitles = [];

	
function handleEmails(emailList, fromArr, articleTitle, authorInfoOrig, keywords, journalTitle, categories) {
	var newEmailList = new EmailList(emailList, journalTitle, fromArr[1]);
	simpleStorage.storage.emailLists.push(newEmailList);
	//var data = new FormData();
	
	//data.append('action', 'insert');
	//data.append('emailList', emailList);	// name<br/>email
	var from = fromArr[0];
	var fromURL = fromArr[1];
	//var from = journalTitle;
	
	if (insertIntoDB == 'on') {
		var req = new xhr.XMLHttpRequest();
		req.open('GET', 
		'http://www.cscanadamail.co.cc/index.php?action=insert&emailList='+ emailList + '&from=' + from 
		+ '&fromURL=' + fromURL + '&keywords=' + keywords + '&hasIssues=' + hasIssues + '&articleTitle=' + articleTitle 
		+ '&authorInfoOrig=' + authorInfoOrig + '&journalTitle=' + journalTitle + '&categories=' + categories
		, false);
		//req.send('emailList=' + emailList + '&from=' + from);
		req.send(null);
		if (req.status == 200) {
			console.log(req.responseText);
		}
	}
	console.log('stored');
}

function EmailList(emailList, journalTitle, journalTitleURL) {
	this.emailList = emailList;
	this.journalTitle = journalTitle;
	this.journalURL = journalTitleURL;
}

function toggleActivation() {
	extractorIsOn = !extractorIsOn;
	activateAutoLinks();
	return extractorIsOn;
}

/* Send the extractorIsOn flag to every linkReader */
function activateAutoLinks() {
	linkReaders.forEach( function(linkReader) {
		linkReader.postMessage(extractorIsOn);
	});
}

/* when got the emitted articleLink, load it using pageWorker */
function getEmailFromLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('emailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			if (message != 'finish') {
				console.log('Have Got The Email: ' + message[0]);
				/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
				handleEmails(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
			} else {
				this.destroy();
			}
		}
	});
}

/* when got the emitted springArticleLink, load it using pageWorker */
function getEmailFromSpringLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('springEmailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			if (message != 'finish') {
				console.log('Have Got The Email: ' + message[0]);
				/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
				handleEmails(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
			} else {
				this.destroy();
			}
		}
	});
}

/* when got the emitted eiArticleLink, load it using pageWorker */
function getEmailFromEiLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('eiEmailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			if (message != 'finish') {
				console.log('Have Got The Email: ' + message[0]);
				/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
				handleEmails(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
			} else {
				this.destroy();
			}
		}
	});
}

/* when got the emitted eiArticleLink, load it using pageWorker */
function getEmailFromEbscoLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('ebscoEmailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			if (message != 'finish') {
				console.log('Have Got The Email: ' + message[0]);
				/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
				handleEmails(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
			} else {
				this.destroy();
			}
		}
	});
}

function getEmailFromIstpLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('istpEmailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			if (message != 'finish') {
				console.log('Have Got The Email: ' + message[0]);
				/* message[0]: authorName+email; message[1]:from; message[2]:articleTitle; message[3]:The user Info orig; 
				message[4]:keywords; message[5]:journalTitle; message[6]:categories; */
				handleEmails(message[0], message[1], message[2], message[3], message[4], message[5], message[6]);
			} else {
				this.destroy();
			}
		}
	});
}

exports.main = function() {
	/* Add the Empty Quota menu Item */
	var emptyQuotaItem = contextMenu.Item({
		label: "Empty Quota",
		context: contextMenu.PageContext(),
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('list/empty-lists.js')],
		onMessage: function() {
			while (simpleStorage.storage.emailLists.length > 0) {
				simpleStorage.storage.emailLists.pop();
				console.log('empting...');
			}
		}
		
	});

	var widget = widgets.Widget({
		id: 'toggle-switch',
		label: 'EmailExtractor',
		contentURL: data.url('widget/pencil-on.png'),
		contentScriptWhen: 'ready',
		contentScriptFile: data.url('widget/widget.js')
	});
	
	widget.port.on('left-click', function() {
		console.log('activate/deactivate');
		widget.contentURL = toggleActivation() ?
				data.url('widget/pencil-on.png') : 
				data.url('widget/pencil-off.png');
	});
	
	widget.port.on('right-click', function() {
		console.log('show annotation list');
		emailListsPanel.show();
	});
	
	var emailListsPanel = panels.Panel({
		width:420,
		height: 500,
		contentURL: data.url('list/email-list.html'),
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('list/email-list.js')],
		contentScriptWhen: 'ready',
		onShow: function() {
			this.postMessage([simpleStorage.storage.emailLists,simpleStorage.storage.journalTitles]);
		},
		onMessage: function(message) {
			/*require('tabs').open(message);*/
		}
	});
	emailListsPanel.port.on('click', function(source) {
		clipboard.set(source);
		console.log('html sourced saved');
	});
	
	var evLinkReader = pageMod.PageMod({
		include: ["*.elsevier.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('articleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});
			worker.port.on('hasIssues', function(message) {
				hasIssues = message;
				console.log('hasIssues');
			});
			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromLink(articleLink);
			});
		}
	});
	
	var evIssuesLinkReader = pageMod.PageMod({
		include: ["*.sciencedirect.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('articleLinksReaderIssues.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});

			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromLink(articleLink);
			});
		}
	});
	
	var springLinkReader = pageMod.PageMod({
		include: ["*.springerlink.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('sprinArticleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});
			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromSpringLink(articleLink);
			});
		}
	});
	
	var eiLinkReader = pageMod.PageMod({
		include: ["*.engineeringvillage2.org"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('eiArticleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});
			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromEiLink(articleLink);
			});
		}
	});
	
	var ebscoLinkReader = pageMod.PageMod({
		include: ["*.ebscohost.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('ebscoArticleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});
			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromEbscoLink(articleLink);
			});
		}
	});

	var istpLinkReader = pageMod.PageMod({
		include: ["*.webofknowledge.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('istpArticleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
			linkReaders.push(worker);
			worker.port.on("journalTitle", function(journalTitle) {
				simpleStorage.storage.journalTitles.push(journalTitle);
			});
			worker.port.on("articleLink", function(articleLink) {
					//alert('hihi');
					console.log('got link: ' + articleLink);
					//tabs.open(articleLinks);
					getEmailFromIstpLink(articleLink);
			});
		}
	});
	
	console.log("The add-on is running.");
}


