function initialize(){
	coolIDEObj = ace.edit(editorName);
	coolIDEObj.getSession().setMode("ace/mode/java");
	coolIDEObj.setTheme("ace/theme/eclipse");
	// try to get websocet server connection;
	getConnection();
}