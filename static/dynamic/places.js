function createPlacesBody() {
	window.history.pushState("object or string", "Places", "/place/new");
	let html = `<form>
		<input id="inptfile" type="file" accept="image/*.video/*" multiple/><br>
		<input type="text" name="nameofplace" placeholder="nameofplace" id="nameofplace" required/>
		<input type="text" name="category" placeholder="category" id="category" required/>
		<input type="text" name="address" placeholder="address" id="address" required/>
		<input type="text" name="openingtime" placeholder="openingtime" id="openingtime" required/>
		<input type="text" name="closingtime" placeholder="closingtime" id="closingtime" required/>
		<input type="text" name="phonenumber" placeholder="phonenumber" id="phonenumber" required/>
		<input type="text" name="website" placeholder="website" id="website" required/>
		<input type="text" name="instagaram" placeholder="instagaram" id="instagaram" required/>
		<input type="text" name="about" placeholder="about" id="about" required/>
		<input type="text" name="facilities" placeholder="facilities" id="facilities" required/>
		<input type="text" name="paymentmethod" placeholder="paymentmethod" id="paymentmethod" required/>
		<input type="text" name="keyword" placeholder="keyword" id="keyword" required/>
		<div id='upbtn' onclick="uploadnow();" style="width:4rem;height:4rem;background:#ccc;">Upload</div>
	</form>
	<div id="preview"></div>`;
	document.getElementById("main").innerHTML = html;
document.getElementById("inptfile").addEventListener("change", myFunction);
}

	
function myFunction() {
		//~ var x = document.getElementById("fname");
		//~ x.value = x.value.toUpperCase();
		document.getElementById('upbtn').style.display = "block";
		//document.getElementById('preview').innerHTML = `<div class="FeedArtistLayoutView_main__r0yQj artist"><div style="aspect-ratio: 706.99 / 588.89; content-visibility: auto; contain-intrinsic-size: 706.99px 588.89px;"><ul id="pics"></ul></div></div>`;
	}
	
async function uploadnow() {
	var kwd = document.getElementById('keyword').value;
	if (kwd == "") {alert("what is the title");return};
	var pmt = document.getElementById('paymentmethod').value;
	if (pmt == "") {alert("what is the title");return};
	var fcl = document.getElementById('facilities').value;
	if (fcl == "") {alert("what is the title");return};
	var abt = document.getElementById('about').value;
	if (abt == "") {alert("what is the title");return};
	var ins = document.getElementById('instagaram').value;
	if (ins == "") {alert("what is the title");return};
	var web = document.getElementById('website').value;
	if (web == "") {alert("what is the title");return};
	var phn = document.getElementById('phonenumber').value;
	if (phn == "") {alert("what is the title");return};
	var cls = document.getElementById('closingtime').value;
	if (cls == "") {alert("what is the title");return};
	var opt = document.getElementById('openingtime').value;
	if (opt == "") {alert("what is the title");return};
	var adr = document.getElementById('address').value;
	if (adr == "") {alert("what is the title");return};
	var cat = document.getElementById('category').value;
	if (cat == "") {alert("what is the title");return};
	var nop = document.getElementById('nameofplace').value;
	if (nop == "") {alert("what is the title");return};

	document.getElementById('upbtn').style.display = "none";
	const formData = new FormData();
	
		formData.append("keyword", kwd);
		formData.append("paymentmethod", pmt);
		formData.append("facilities", fcl);
		formData.append("about", abt);
		formData.append("instagaram", ins);
		formData.append("website", web);
		formData.append("phonenumber", phn);
		formData.append("openingtime", cls);
		formData.append("closingtime", opt);
		formData.append("address", adr);
		formData.append("category", cat);
		formData.append("nameofplace", nop);
	const fileField = document.querySelector('input[type="file"][multiple]');
	//formData.append("key", "whatever");
	//~ formData.append("file", fileField.files[0]);
	for (const [i, photo] of Array.from(fileField.files).entries()) {
		formData.append(`file`, photo);
	}
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "//atapi-vatapi.onrender.com/csrf", true);
	xhr.onload = () => {
		formData.append("csrftoken", xhr.responseText);
		uploadPlace(formData);
	};
	xhr.send(null);
}


async function uploadPlace(formData) {
  try {
    const response = await fetch("//atapi-vatapi.onrender.com/place/new", {
      method: "POST",
      body: formData,
    });
    const result = await response.text();
    console.log("Success:", result);
	const obj = JSON.parse(result);
	renderPlace(obj.nameofplace,obj.address,obj.category,obj.closingtime,obj.openingtime,obj.phonenumber,obj.instagaram,obj.website,obj.facilities,obj.about,obj.paymentmethod,obj.keyword);
	//~ afterUpload(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

//~ function afterUpload(html) {
	//~ document.getElementById("main").innerHTML = html;
//~ }

function renderPlace(nameofplace,address,category,closingtime,openingtime,phonenumber,instagaram,website,facilities,about,paymentmethod,keyword) {
	document.getElementById("main").innerHTML = "<p>"+"<br>"+nameofplace+"<br>"+address+"<br>"+category+"<br>"+closingtime+"<br>"+openingtime+"<br>"+phonenumber+"<br>"+instagaram+"<br>"+website+"<br>"+facilities+"<br>"+about+"<br>"+paymentmethod+"<br>"+keyword+"</p>";
};
