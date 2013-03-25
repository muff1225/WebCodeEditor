function eventAttach() {
	$(window).load(function(){
		coolIDEObj.getSession().on('change', function(e) {
			changeEditor(e);
		});
	});
}