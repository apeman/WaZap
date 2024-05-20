var API_URL = "//atapi-vatapi.onrender.com";
window.onload=function(){
	ChangeLoc();
	if (IsLoggedIn() == false) {
		document.getElementById("login").addEventListener("click", LoginFn);
		document.getElementById("signup").addEventListener("click", SignUp);
	} else {
		document.getElementById("totranslate").addEventListener("click", loadTranslate);
		document.getElementById("toupload").addEventListener("click", loadUpload);
		document.getElementById("toevents").addEventListener("click", loadEvents);
		document.getElementById("toplaces").addEventListener("click", loadPlaces);
	}
}

function ChangeLoc() {
	console.log(window.location.pathname)
	if (window.location.pathname == "/post") {
		loadPost();
	}
}

let html = `<main id="toor"></main>`;

let loginPage = `<form class="login_box" method="post" action="/login"><label for="username">User name</label><br><input type="text" id="username" name="username" required autocomplete="on"><br><label for="password">Password</label><br><input type="password" id="password" name="password" required><br><br><div class="footer"><div class="bar_tool"><div style="width:4rem;height:4rem;background:#ccc;" id="loginsubmit">Login</div></div></div></form>`;

let signupPage = `<form class="signup_box" method="post" action="/signup"><label for="name">User name</label><br><input type="text" id="username" name="username" required><br><label for="password">Password</label><br><input type="password" id="password" name="password" required><br><br><div class="footer"><div class="bar_tool"><div style="width:4rem;height:4rem;background:#ccc;" id="signupsubmit">Sign Up</div></div></div></form>`;


document.getElementById("root").innerHTML = html;

let footer = ``

if (IsLoggedIn() != true){
	document.getElementById("toor").innerHTML = `<nav class="links"><a id="signup"><strong>Register</strong></a><a id="login"><strong>Login</strong></a></nav><section class="about" id="main"><h1>Aespa</h1><p>What do you believe in ..?</p></section>`;
} else {
	document.getElementById("toor").innerHTML = `<nav class="links"><a href="/" id="home"><strong>Home</strong></a><a id='toupload'><strong>Upload</strong></a><a id='toevents'><strong>Events</strong></a><a id='toplaces'><strong>Places</strong></a><a id='totranslate'><strong>Translate</strong></a><a id="logout"><strong>Logout</strong></a></nav><section class="about" id="main"><h1>Aespa</h1><p id='demo'>What do you believe in ..?</p></section>${footer}`;
	document.getElementById("logout").addEventListener("click", Logout);
} 


////////////////////////// render Functions end ////////////////////////////

async function testForm() {
	const formData = new FormData();
	formData.append("username", "ningning");
	var reqMethod = "POST"
	var URL = API_URL+"/res"
	var res = await httpRequest(formData, reqMethod,URL);
	console.log("res.tr : ", res.translated);
	console.log("res.lng : ", res.lang);
}

function loadScript(filename,callback){
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.onload = callback;
  fileref.setAttribute("src", filename);
  if (typeof fileref!="undefined"){
    document.getElementsByTagName("head")[0].appendChild(fileref)
  }
}


async function httpRequest(formData, reqMethod,URL) {
  try {
    const response = await fetch(URL, {
      method: reqMethod,
      body: formData,
    });
    const result = await response.text();
	const obj = JSON.parse(result);
	return (obj);
  } catch (error) {
    console.error("Error:", error);
  }
}
//	const obj = JSON.parse(result);


////////////////////////// load functions start ////////////////////////////

function loadTranslate() {
	loadScript('/static/dynamic/translate.js',function(){
		console.log('done loading Translate.js');
		createTranslateBody();
		ChangeLoc();
	});
}

function loadPlaces() {
	loadScript('/static/dynamic/places.js',function(){
		console.log('done loading places.js');
		createPlacesBody();
		ChangeLoc();
	});
}

function loadUpload() {
		window.history.pushState("object or string", "Upload", "/upload");
	loadScript('/static/dynamic/extra.js',function(){
		console.log('done loading extra.js');
	});
	CreatePostModal();
	loadScript('/static/dynamic/upload.js',function(){
		console.log('done loading upload.js');
		ChangeLoc();
		//~ createBody();
	});
}

function loadPost() {
	loadScript('/static/dynamic/post.js',function(){
		createPostBody() 
		console.log('done loading post.js');
	});
}

function loadEvents() {
	loadScript('/static/dynamic/events.js',function(){
		console.log('done loading');
		createNewEventForm();
		ChangeLoc();
	});
}


function myDemoFunction() {
	document.getElementById("main").innerHTML = "YOU CLICKED ME!";
}

////////////////////////// load functions end ////////////////////////////




////////////////////////// login start ////////////////////////////


function showLogout() {
  var x = document.getElementById("logout");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function LoginFn() {
	//~ loadScript('/static/dynamic/login.js',function(){
	//~ console.log('done loading');
	document.getElementById("main").innerHTML = loginPage;
	document.getElementById("loginsubmit").addEventListener("click", apiRequestSET);
	//~ });
}

function SignUp() {
	document.getElementById("main").innerHTML = signupPage;
	document.getElementById("signupsubmit").addEventListener("click", Register);
}
	
function Register() {
	let unaem = document.getElementById('username').value;
	let psswd = document.getElementById('password').value;
	const formData = new FormData();
	formData.append("username", unaem);
	formData.append("password", psswd);
	const xhr = new XMLHttpRequest();
	var resp = "";
	xhr.open("POST", "/signup", true);
	xhr.onload = () => {
		resp = xhr.responseText;
		console.log(resp);
		if (resp == "200") {
			//~ location.reload();
			//~ window.location = "/login";
			LoginFn();
		} else {
			alert("user already exists");
		}
	};
	xhr.send(formData);
}

function apiRequestSET() {
	let unaem = document.getElementById('username').value;
	let psswd = document.getElementById('password').value;
	const formData = new FormData();
	formData.append("username", unaem);
	formData.append("password", psswd);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/login", true);
	xhr.onload = () => {
			//~ document.getElementById("demo").innerH	TML = xhr.responseText;
			SaveToSessionStorage("webtoken",xhr.responseText)
			SaveToLocalStorage("webtoken",xhr.responseText)
			location.reload();
	};
	xhr.send(formData);
	// xhr.send('string');
	// xhr.send(new Blob());
	// xhr.send(new Int8Array());
	// xhr.send(document);
}

function SaveToSessionStorage(key,value) {
	sessionStorage.setItem(key, value);
	let personName = sessionStorage.getItem(key);
	//~ document.getElementById("demo").innerHTML = personName;
}

function IsLoggedIn() {
	if (localStorage.getItem("webtoken") != null) {
		return true;
	}
	return false;
}

function SaveToLocalStorage(key,value) {
	localStorage.setItem(key, value);
	let personName = localStorage.getItem(key);
	//~ document.getElementById("demo").innerHTML = personName;
}


function Logout() {
	//~ window.history.pushState("object or string", "Upload", "/upload");
	sessionStorage.removeItem("webtoken");
	localStorage.removeItem("webtoken");
	location.reload();
	delete_cookie("exampleCookie")
	const xhr = new XMLHttpRequest();
	xhr.open("DELETE", "/logout", true);
	xhr.onload = () => {
		window.location = "/";
		location.reload();
	};
	xhr.send(null);
	//~ window.location.reload();
}
function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
////////////////////////// login ends ////////////////////////////

////////////////////////// upload starts ////////////////////////////

async function CreatePostModal() {
	var other =`<div class="wttFd g77C_">
   <ul>
      <li>
         <button id="form_i" class="FOqaP" aria-label="Photo">
            <span class="ADK9v">
               <svg xmlns="http://www.w3.org/2000/svg" height="35" width="40" role="presentation" style="--icon-color-primary:RGB(var(--red));">
                  <use href="#managed-icon__posts-photo"></use>
               </svg>
            </span>
            Photo
         </button>
      </li>
      <li>
         <button id="form_v" class="FOqaP" aria-label="Video">
            <span class="ADK9v">
               <svg xmlns="http://www.w3.org/2000/svg" height="35" width="40" role="presentation" style="--icon-color-primary:RGB(var(--purple))">
                  <use href="#managed-icon__posts-video"></use>
               </svg>
            </span>
            Video
         </button>
      </li>
   </ul>
</div>
<div id="pics"></div>
<div id="photomodal" class="modal">
  <div class="modal-content">
		<header>
		<h2>Photo</h2>
		<button class="close-button" onclick="togglePhotoModal();">Close</button>
		</header>
		<form class="upform" enctype="multipart/form-data"  id="new_document_attachment">
		<input type="file" name="imgfile" id="myimageFile" onchange="fdhsfgdhj()" accept="image/jpg,image/jpeg,image/png" multiple size="4" required />
		<input type="text" value="" name="caption" placeholder="caption"/>
		<input type="text" value="" name="alttext" placeholder="Alt Text"/>
		<input type="text" value="" name="location" placeholder="Location"/>
		<input type="text" value="" name="hashtags" placeholder="hashtags"/>
		<div id='upbtn' onclick="togglePhotoModal();uploadnow();" style="width:4rem;height:4rem;background:#ccc;">Upload</div>
		<span id="ifilewarning"></span>
		</form>
		<section id="noContextMenu"></section>
		<section class="view">
		<p id="df"></p>
		<div class="previewContainer" id="whatever"></div>
		</section>
  </div>
</div>
<div id="vids"></div>
<div id="videomodal" class="modal">
  <div class="modal-content">
	<header>
		<h2>Video</h2>
		<button class="close-button" onclick="toggleVideoModal();">Close</button>
	</header>
	<form class="upform" enctype="multipart/form-data">
		<input type="file" name="vidfile" id="myVidFile" onchange="myFunction()" accept="video/*">
		<span id="filewarning"></span>
		<div class="previewContainer" id="demo"></div>
	</form>
  </div>
</div><aside style="display:none;"><svg id="managed-icon__posts-photo" fill="var(--icon-color-primary, #b4b4b4)" viewBox="0 0 17 15"><path d="M14.6 1h-2.7l-.6-1h-6l-.6 1H2.4C1.1 1 0 2 0 3.3v9.3C0 13.9 1.1 15 2.4 15h12.2c1.3 0 2.4-1.1 2.4-2.4V3.3C17 2 15.9 1 14.6 1zM8.3 13.1c-2.9 0-5.2-2.3-5.2-5.1s2.3-5.1 5.2-5.1c2.9 0 5.2 2.3 5.2 5.1s-2.3 5.1-5.2 5.1zm5.9-8.3c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1c0 .6-.5 1.1-1.1 1.1zm-10 3.1c0 1.2.5 2.2 1.3 3 0-.2 0-.4-.1-.6 0-2.2 1.8-4 4.1-4 1.1 0 2 .4 2.8 1.1-.3-2-2-3.4-4-3.4-2.2-.1-4.1 1.7-4.1 3.9z" /></svg><svg id="managed-icon__posts-video" fill="var(--icon-color-primary, #b4b4b4)" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0417 1.94485C9.78645 2.27502 9.21355 2.27502 8.95834 1.94485C8.04391 0.761823 6.61092 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10H14C16.7614 10 19 7.76142 19 5C19 2.23858 16.7614 0 14 0C12.3891 0 10.9561 0.761823 10.0417 1.94485ZM6 4C6 5.10457 5.10457 6 4 6C3.44772 6 3 6.44771 3 7C3 7.55228 3.44772 8 4 8C6.20914 8 8 6.20914 8 4C8 3.44772 7.55229 3 7 3C6.44772 3 6 3.44772 6 4ZM15 4C15 5.10457 14.1046 6 13 6C12.4477 6 12 6.44771 12 7C12 7.55228 12.4477 8 13 8C15.2091 8 17 6.20914 17 4C17 3.44772 16.5523 3 16 3C15.4477 3 15 3.44772 15 4ZM2 14C2 12.3431 3.34315 11 5 11H15C16.5789 11 17.8729 12.2197 17.9912 13.7683L20.382 12.5729C22.0442 11.7418 24 12.9506 24 14.809V18.191C24 20.0494 22.0442 21.2582 20.382 20.4271L18 19.2361V20C18 21.6569 16.6569 23 15 23H5C3.34314 23 2 21.6569 2 20V14Z"></path>
</svg></aside>`;
		document.getElementById("main").innerHTML = other;
		//document.getElementById("loginsubmit").addEventListener("click", apiRequestSET);
	//~ });
}

let userProfile = `
	<img src='/userpic/{{ .UserPic }}.png'>
	<button>Edit Profile</button><br>
	<span>{{ .Name }}</span><br>
	<span>{{ .Username }}</span><br>
	<span>{{ .About }}</span><br>
	<span>Followers</span><span>Following</span><br><hr>

<div class="wraperdaper">
   <div class="slidepanels">
{{range .Vids}}
      <div id="cycler" class="cycler">
         <a href="/v/{{.}}"><img src='/poster/{{.}}.png'></a>
      </div>
{{end}}
   </div>
</div>`;

////////////////////////// upload ends ////////////////////////////
//~location.reload();

//~ var script = document.createElement('script');
//~ script.onload = function () {
    //~ createBody();
//~ };
//~ script.src = "/static/dynamic/upload.js";

//~ document.head.appendChild(script);
