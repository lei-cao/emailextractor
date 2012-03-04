const widgets = require("widget");
const data = require('self').data;
const tabs = require("tabs");
const pageMod = require("page-mod");
const pageWorkers = require("page-worker");
const simpleStorage = require('simple-storage');
const panels = require('panel');

var extractorIsOn = false;

if (!simpleStorage.storage.emailLists)
	simpleStorage.storage.emailLists = [];

if (!simpleStorage.storage.journalTitles)
	simpleStorage.storage.journalTitles = [];

	
function handleEmails(emailList, journalInfo) {
	var newEmailList = new EmailList(emailList, journalTitle);
	simpleStorage.storage.emailLists.push(newEmailList);
	console.log('stored');
}

function EmailList(emailList, journalTitle) {
	this.emailList = emailList;
	this.journalTitle = journalTitle;
}

function toggleActivation() {
	extractorIsOn = !extractorIsOn;
	return extractorIsOn;
}

function getEmailFromLink(link) {
	pageWorkers.Page({
		contentURL: link,
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
						data.url('emailExtractor.js')],
		contentScriptWhen: "ready",
		onMessage: function(message) {
			console.log('Have Got The Email: ' + message);
			handleEmails(message[0], message[1]);
		}
	});
}
exports.main = function() {
	var widget = widgets.Widget({
		id: 'toggle-switch',
		label: 'EmailExtractor',
		contentURL: data.url('widget/pencil-off.png'),
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
			require('tabs').open(message);
		}
	});
	
	pageMod.PageMod({
		include: ["*.elsevier.com"],
		contentScriptWhen: 'ready',
		contentScriptFile: [data.url('jquery-1.6.2.min.js'),
							data.url('articleLinksReader.js')],
		onAttach: function(worker) {
			worker.postMessage(extractorIsOn);
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
	console.log("The add-on is running.");
}


