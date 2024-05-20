
    //~ var pinput = document.getElementById("photomodal");
    //~ pinput.addEventListener('paste', pasteHandler);
    //~ var whatever = document.getElementById('whatever');
    //~ function pasteHandler(e){    //e:  ClipboardEvent
        //~ if(e.clipboardData){
            //~ var items = e.clipboardData.items;
                //~ for(var i=0;i<4;i++){
                    //~ if(items[i].kind == 'file' && items[i].type.indexOf('image') > -1){
                        //~ var blob = items[i].getAsFile();
                        //~ var reader = new FileReader();
                        //~ reader.readAsDataURL(blob);
                        //~ reader.onload = function (event) {
                            //~ var image = new Image();
                            //~ image.src = event.target.result;
                            //~ image.width = 250; // a fake resize
                            //~ whatever.appendChild(image);
                        //~ };
                    //~ }
                //~ }
        //~ }
    //~ };

document.addEventListener("DOMContentLoaded", function(){
function getStats() {
	k = document.getElementById('myimageFile');
	a = k.files[0].size;
	b = k.files[0].name;
	c = k.files[0].lastModified;
	lbr = "<br>"
	s = document.getElementById('stats');
	s.appendChild(document.createTextNode(a));
	s.appendChild(document.createTextNode(lbr));
	s.appendChild(document.createTextNode(b));
	s.appendChild(document.createTextNode(lbr));
	s.appendChild(document.createTextNode(c));
	}
/*
const form = document.getElementById("new_document_attachment");
const fileInput = document.getElementById("myimageFile");

window.addEventListener('paste', e => {
  fileInput.files = e.clipboardData.files;
  getStats();
  
});*/

});
function fdhsfgdhj(){
  var x = document.getElementById("myimageFile");  
  var txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        txt += "<article class='filePreviewCon'>";
        var file = x.files[i];
        if ('size' in file) {
		if (file.size > 2*1024*1024) {
			window.alert("Size too big, select file smaller than 2 MB");
			x.files.splice(i, 1);
		} else {
			const formData = new FormData();
			formData.append("myfile", file);
			uploadMultiple(formData);
			togglePhotoModal();
			txt += "<img class='previewImg' src='"+ URL.createObjectURL(file) +"'/></article>";
		  }
        }
      }
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files.";
    } else {
      txt += "The files property is not supported by your browser!";
      txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
	document.getElementById("whatever").innerHTML = txt;
}

	function GetImageStats(img) {
		var w = img.naturalWidth;
		var h = img.naturalHeight;
		console.log("NEW IMAGE width", w);
		console.log("NEW IMAGE height: ", h);
		document.getElementById('df').innerHTML = w+"_"+h;
	}
	
function removeExtension(filename){
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}
/*
function getTags(str) {
	document.getElementById('inp').value =  str.split(/[ ,]+/).filter(Boolean);
	return str.split(/[ ,]+/).filter(Boolean);
}
*/
function playMe(video) {
//    video.play();
	                    if (video.paused) {   // play the file, and display pause symbol 
                        video.play(); 
                        button.textContent = "||"; 
                    } else {              // pause the file, and display play symbol   
                        video.pause(); 
                        button.textContent = ">"; 
                    } 
}

function getTags(str) {
	var cleanedStr =  str.split(/[ ,]+/).filter(Boolean);
//	str.split(/[ ,]+/).filter(Boolean);
	document.getElementById('inp').value = cleanedStr.splice(0,5).join(",");
    return 
}

function hideSubmit() {
	document.getElementById("sbmt").style.display = "none";
    return 
}

function hideSuubmit() {
	document.getElementById("submt").style.display = "none";
    return 
}

function myFunction(){
  var x = document.getElementById("myVidFile");  
  var txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        txt += "<article class='filePreviewCon'><section class='filedesc' ><strong>" + (i+1) + ". </strong><br>";
        var file = x.files[i];
        if ('name' in file) {
          txt += "<span>Name: </span><input class='inp' type='text' name='title' value='" + removeExtension(file.name) + "'><br><span>Tags: </span><input class='inp' id='inp' type='text' onfocus='getTags(this.value);' name='tags' value='' onfocusout='getTags(this.value)'><br>";
        }
        if ('size' in file) {
		if (file.size > 10*1024*1024) {
			window.alert("Size too big, select file smaller than 10 MB");
			x.files.splice(i, 1);
		} else {
			const formData = new FormData();
			formData.append("myfile", file);
			uploadMultiple(formData);
			toggleVideoModal();
			txt += "size: " + formatBytes(file.size) + " bytes <br><div id='vidupbtn' style='width:4rem;height:4rem;background:#ccc;'>Upload</div><br></section><video onmouseover='this.play();' onmouseout='this.pause();' onclick='playMe(this)' class='previewImg' src='"+ URL.createObjectURL(file) +"'></video></article>";
		  }
        }
      }
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files.";
    } else {
      txt += "The files property is not supported by your browser!";
      txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
	document.getElementById("demo").innerHTML = txt;
}

function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}

	//~ const noContext = document.getElementById("noContextMenu");
	//~ noContext.addEventListener("contextmenu", (e) => {
	//~ e.preventDefault();
	//~ });
	
var photomodal = document.getElementById("photomodal");
var videomodal = document.getElementById("videomodal");
var closeButton = document.querySelector(".close-button");

var photoTrigger = document.getElementById("form_i");
var videoTrigger = document.getElementById("form_v");

function togglePhotoModal() {
  photomodal.classList.toggle("show-modal");
}
function toggleVideoModal() {
  videomodal.classList.toggle("show-modal");
}
photoTrigger.addEventListener("click", togglePhotoModal);
videoTrigger.addEventListener("click", toggleVideoModal);

//window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
  if (event.target === photomodal) {
    togglePhotoModal();
  }
  if (event.target === videomodal) {
    toggleVideoModal();
  }
}
