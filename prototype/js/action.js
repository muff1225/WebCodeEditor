function getAll(){
	ws.send("event=" + getPackageEvent);
}
function getOneFile() {
	ws.send("event=" + getFileEvent + ",val=" + encodeURIComponent($("#testFile").text()));
}

function changeEditor(e) {
	if(serversideFlg != true) {
		if(null == ws) {
			//getConnection();
			if(null == ws) return;
		}
		var changeEvent = null;
		if(e.data.action == "removeText") {
			changeEvent = deleteEvent;
		} else if (e.data.action == "insertText") {
			changeEvent = insertEvent;
		} else if (e.data.action == "removeLines") {
			changeEvent = deleteLineEvent;
		}
		ws.send("event=" + changeEvent + ",offset=" + coolIDEObj.getSession().getDocument().positionToIndex(coolIDEObj.selection.getCursor(), 0) + ",val=" + encodeURIComponent(e.data.text) + ",row=" + encodeURIComponent(coolIDEObj.getCursorPosition().row) + ",column=" + encodeURIComponent(coolIDEObj.getCursorPosition().column));
		console.log("e.data.action:" + e.data.action + " e.data.text:" + e.data.text);
		console.log(coolIDEObj.getSession().getDocument().positionToIndex(coolIDEObj.selection.getCursor(), 0));
	} else {
	}
}


function setTextValue() {
	coolIDEObj.setValue("test");
}