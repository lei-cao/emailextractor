self.on("message", function onMessage(storedEmailLists) {
	var emailLists = $('#email-lists');
	var titleHtml = '';
	emailLists.empty();
	storedEmailLists[1].forEach(function(storedEmailList) {
		titleHtml = $('#template .journalTitle').clone();
		titleHtml.find('.url').text(storedEmailList[0])
								   .attr('href', storedEmailList[1]);
		titleHtml.find('.url').bind('click', function(event) {
			event.stopPropagation();
			event.preventDefault();
			self.postMessage(storedEmailList.journalURL);
		});

		emailLists.append(titleHtml);
	});
	storedEmailLists[0].forEach(function(storedEmailList) {
		var emailHtml = $('#template .email-details').clone();
		emailHtml.find('.email-list')
							 .html(storedEmailList.emailList);
		titleHtml.after(emailHtml);
	});

});
