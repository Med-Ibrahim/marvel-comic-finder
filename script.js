console.log("hello world");

var apikey = "00537d582b02f7731553775d9828a593";
var privatekey = "368f499ee7ad6cf5f62d9cbcedd3fdfd2801c9fc";
var timestamp = Date.now();
var hash = md5(timestamp + privatekey + apikey);
var offset = "0";
var limit = "10";
var url = '?ts=' + timestamp + '&apikey=' + apikey + '&hash=' + hash + '&limit=' + limit;
var defaulturl = url;
var offset = 0;
var totalResults = 0;

function createTableRow(data, dataIndex, tableBody) {
	var newTableRow = document.createElement("tr");
	var rowThumbnailColumn = document.createElement("td");
	var rowTitleAndDescriptionColumn = document.createElement("td");
	var thumbnailImage = document.createElement("img");
	var title = document.createElement("h3");
	var descr = document.createElement("p");
	var thumbUrl = "";

	// get character thumbnail
	if (data.data.results[dataIndex].characters.items.length > 0) {
		var characterUrl = data.data.results[dataIndex].characters.items[0].resourceURI + '?ts=' 
		+ timestamp + '&apikey=' + apikey + '&hash=' + hash;
		var charRequest = new XMLHttpRequest();
		charRequest.open('GET', characterUrl);
		charRequest.onload = function() {
			var characterData = JSON.parse(this.response);
			if (charRequest.status == 200) {
				thumbUrl = characterData.data.results[0].thumbnail.path + "/standard_medium" + "." + 
				characterData.data.results[0].thumbnail.extension;

				// add thumbnail to column
				thumbnailImage.setAttribute("class", "img-fluid");
				thumbnailImage.setAttribute("src", thumbUrl);
				thumbnailImage.setAttribute("alt", "Image caption");

			} else {
				console.log('could not retrieve character thumbnail');
				// add thumbnail to column
				thumbnailImage.setAttribute("class", "img-fluid");
				thumbnailImage.setAttribute("alt", "Character image not available");
			}
		}
		charRequest.send();

	} else {
		thumbnailImage = document.createElement("p");
		thumbnailImage.innerHTML = "Character image not available";

	}

	rowThumbnailColumn.append(thumbnailImage);


	// add title and desc to column
	title.innerHTML = data.data.results[dataIndex].title + "<br>";
	descr.innerHTML = data.data.results[dataIndex].description;
	rowTitleAndDescriptionColumn.append(title);
	rowTitleAndDescriptionColumn.append(descr);

	newTableRow.append(rowThumbnailColumn);
	newTableRow.append(rowTitleAndDescriptionColumn);

	tableBody.append(newTableRow);
}

function removeTableRows(tableBody) {
	tableBody.parentNode.removeChild(tableBody);

}


function search(){

	var request = new XMLHttpRequest();
	url = defaulturl + '&offset=' + offset;
	if(document.getElementById("searchBar").value != ""){
		url += "&titleStartsWith=" + document.getElementById("searchBar").value;
		console.log(url);
	}
	//Title Filter
	if(!(document.getElementById('titleFilter').value == "")) {
		url += ("&title=" + document.getElementById('titleFilter').value);
	}
	//Start Year Filter
	if(!(document.getElementById('startYearFilter').value == "")) {
		url += ("&startYear=" + document.getElementById('startYearFilter').value);
	}
	//Format Filter
	if(!(document.getElementById('formatFilter').value == "")) {
		url += ("&format=" + document.getElementById('formatFilter').value);
	}
	//Sort
	if(!(document.getElementById('sortFilter').value == "")) {
		if(document.getElementById('sortFilter').value == "titleAscending")
			url += ("&orderBy=title");
		else if (document.getElementById('sortFilter').value == "titleDescending")
			url += ("&orderBy=title-");
		else if (document.getElementById('sortFilter').value == "issueAscending")
			url += ("&orderBy=issueNumber");
		else if (document.getElementById('sortFilter').value == "issueDescending")
			url += ("&orderBy=issueNumber-");
	}
	request.open('GET', 'https://gateway.marvel.com/v1/public/comics' + url);

	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "t-body");
	document.getElementById("comic-table").append(tbody);

	request.onload = function() {
		var data = JSON.parse(this.response);

		if (request.status == 200) {

			console.log(data);
			totalResults = data.data.total;
			document.getElementById("results").removeAttribute("hidden");
			document.getElementById("resultCount1").innerHTML = totalResults + " results, shown 10 at a time.";
			document.getElementById("resultCount2").innerHTML = totalResults + " results, shown 10 at a time.";
			checkButtons();
			for (var i = 0; i < data.data.count; i++) {
				createTableRow(data, i, tbody);
			}

			

		}
		else 
			console.log('error');
	}

	request.send();


	return;
}

function scrollToLeft() {
	console.log(offset + ", " + totalResults);
	if (offset > 0) {
		offset -= 10;
		removeTableRows(document.getElementById("t-body"));
		search();
	}
}

function scrollToRight() {
	console.log(offset + ", " + totalResults);
	if (offset + 10 < totalResults) {
		offset += 10;
		removeTableRows(document.getElementById("t-body"));
		search();
	}
}

function searchGo(){
	offset = 0;
	removeTableRows(document.getElementById("t-body"));
	search();

}

function checkButtons(){
	if(offset==0){
		document.getElementById("leftArrow1").setAttribute("disabled", "true");
		document.getElementById("leftArrow2").setAttribute("disabled", "true");
	}
	else{
		document.getElementById("leftArrow1").removeAttribute("disabled");
		document.getElementById("leftArrow2").removeAttribute("disabled");
	}
	if(offset+10 > totalResults){
		document.getElementById("rightArrow1").setAttribute("disabled", "true");
		document.getElementById("rightArrow2").setAttribute("disabled", "true");	

	}
	else{
		document.getElementById("rightArrow1").removeAttribute("disabled");
		document.getElementById("rightArrow2").removeAttribute("disabled");
	}
}


