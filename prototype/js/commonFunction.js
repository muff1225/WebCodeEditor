function getConnection() {
    ws = new WebSocket(webServerName);
    ws = null;
    ws.onmessage = function(evt) {
        $("#msg").append("<p>"+evt.data+"</p>");
        console.log("message arrivaled");
        if("" == evt.data) {
      	  return;
        }
        var splitOri = evt.data.split(",");
        if(null == splitOri);
        var splitStr = splitOri[0].split("=");
        if(null != splitStr[1].match(new RegExp(getPackageEvent, "i"))) {
      	  console.log("package get success");
      	  return;
        }
        if(null != splitStr[1].match(new RegExp(insertEvent, "i"))) {
      	  serversideFlg = true;
      	  var offset = splitOri[1].split("=")[1];
      	  var text = decodeURIComponent(splitOri[2].split("=")[1]);
      	  var row = decodeURIComponent(splitOri[3].split("=")[1]);
      	  var column = decodeURIComponent(splitOri[4].split("=")[1]);
      	  var object = {'row': row, 'column' : column};
      	  coolIDEObj.getSession().getDocument().insert(object, text);
      	  console.log("insert event success:" + text);
      	  serversideFlg = false;
      	  return;
        }
        if(null != splitStr[1].match(new RegExp(deleteEvent, "i"))) {
      	  serversideFlg = true;
      	  var offset = splitOri[1].split("=")[1];
      	  var text = decodeURIComponent(splitOri[2].split("=")[1]);
      	  var row = decodeURIComponent(splitOri[3].split("=")[1]);
      	  var column = decodeURIComponent(splitOri[4].split("=")[1]);

      	  var str =  new String(text);
      	  coolIDEObj.getSession().getDocument().removeInLine(row,column, eval(column) + eval(text.length));
      	  console.log("delete event success:" + text);
         	  serversideFlg = false;
      	  return;
        }
        if(null != splitStr[1].match(new RegExp(getFileEvent, "i"))) {
      	  serversideFlg = true;
      	  var text = decodeURIComponent(splitOri[1].split("=")[1]);
      	  coolIDEObj.setValue(text);
      	  $().toastmessage( 'showNoticeToast', 'You got a new file!!' );
      	  console.log("file get event success:" + text);
      	  serversideFlg = false;
      	  return;
        }

        if(null != splitStr[1].match(new RegExp(deleteLineEvent, "i"))) {
      	  serversideFlg = true;
      	  var row = decodeURIComponent(splitOri[3].split("=")[1]);
      	  var removerow = eval(row) + 1;
      	  coolIDEObj.getSession().getDocument().removeLines(removerow, removerow);
      	  console.log("delete row event success:" + removerow);
      	  serversideFlg = false;
        }
      };

      ws.onclose = function() {
        console.log("event=socket closed");
        ws = null;
      };

      ws.onopen = function() {
      	console.log("socket start")
      	ws.send("event=hello server");
      };

  	console.log(ws);

}