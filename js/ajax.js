function LoadSyncPost() {
	var name = document.getElementById("name2Txt").value;
	var password = document.getElementById("pass2Txt").value;
	var data = "userName=" + name + "&" + "password=" + password;
	var localRequest = new XMLHttpRequest();
	
	localRequest.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
	localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	localRequest.send(data);
	
	if(localRequest.status == 200) {
		var dataDiv = document.getElementById("data4Div");
		
		var responseJson = JSON.parse(localRequest.responseText);
		
		if (responseJson.result == "valid") {
			var loginData = responseJson.userName + " " + responseJson.timestamp;
			localStorage.setItem("cs2550timestamp", loginData);
			window.open("gamegrid.html", "_blank");
		}
		else {
			dataDiv.innerHTML = "Username and/or password is incorrect";
		}
	}
}