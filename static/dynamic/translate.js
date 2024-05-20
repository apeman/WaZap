//<form id="newTranslate" ><input id="ogtext" type="text" name="trns" required /><br><div id='upbtn' onclick="CreateNewTranslateNow();" style="width:4rem;height:4rem;background:#ccc;">Translate</div></form> <p id="preview"></p>
function createTranslateBody() {
	window.history.pushState("object or string", "Translate", "/translate");
	let html = ``
	html += `<section class="flexh">
		<div class="left">
			<div class="flexh">
				<span class="lng" id="oglen">Japanese</span>
				<button onclick="SwapLangsNow();">Swap</button>
			</div>
			<textarea id="ogtext" type="text" name="trns" required ></textarea>
			<div class="flexh">
				<div class="flexh">
					<button onclick="SpeakNewTranslateNow();">Speak</button>
					<button onclick="CopyNewTranslateNow();">Copy</button>
					<button onclick="CreateNewTranslateNow();">Translate</button>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="flexh">
				<span class="lng" id="reslen">Urdu</span>
			</div>
			<textarea id="restext" type="text" name="trns" required ></textarea>
			<div class="flexh">
				<div class="flexh">
					<button onclick="SpeakNewTranslateNow();">Speak</button>
					<button onclick="CopyNewTranslateNow();">Copy</button>
				</div>
			</div>
		</div>
		</section>`;
	document.getElementById("main").innerHTML = html;
}

async function SpeakNewTranslateNow() {
	
}

async function CopyNewTranslateNow() {
	
}

async function SwapLangsNow() {
	var oglen = document.getElementById("oglen").innerText;
	var reslen = document.getElementById("reslen").innerText;
	var tmp = oglen;
	oglen = document.getElementById("reslen").innerText;
	reslen = tmp;
}



async function CreateNewTranslateNow() {
	//document.getElementById('upbtn').style.display = "none";
	var og = document.getElementById('ogtext').value;
	const formData = new FormData();
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "//atapi-vatapi.onrender.com/csrf", true);
	xhr.onload = () => {
		formData.append("csrftoken", xhr.responseText);
		formData.append("trns", og);
		SendNewEvtReq(formData);
	};
	xhr.send(null);
}

async function SendNewEvtReq(formData) {
  try {
    const response = await fetch("//atapi-vatapi.onrender.com/translate", {
      method: "POST",
      body: formData,
    });
    const result = await response.text();
    console.log("Success:", result);
	const obj = JSON.parse(result);
	document.getElementById('restext').value = obj.translated;
	//~ alert(obj.translated,obj.lang);
	//~ afterUpload(result);
  } catch (error) {
    console.error("Error:", error);
  }
}



function myFunction() {
	document.getElementById('upbtn').style.display = "block";
}

