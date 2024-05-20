async function uploadMultiple(formData) {
    try {
      const response = await fetch("//atapi-vatapi.onrender.com/picup", {
        method: "POST",
        body: formData,
      });
      const result = await response.text();
      console.log("Success:", result);
      const obj = JSON.parse(result);
      //~ renderPixcs(obj.postname,obj.postcount,obj.posttype);
      afterUpload(obj.postname);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  //~ async function setClass(ul,count) {
      //~ console.log(count);
      //~ switch (count) {
          //~ case 1 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-one__-6MMx");
              //~ break;
          //~ }
          //~ case 2 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-two__WP8GL");
              //~ break;
          //~ }
          //~ case 3 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-three__HLsVN");
              //~ break;
          //~ }
          //~ case 4 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-four__fYIRN");
              //~ break;
          //~ }
          //~ case 5 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-five__RZvWx");
              //~ break;
          //~ }
          //~ case 6 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-six__Ds3aG");
              //~ break;
          //~ }
          //~ case 7 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-seven__65gnj");
              //~ break;
          //~ }
          //~ case 8 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-eight__SoycA");
              //~ break;
          //~ }
          //~ case 9 : {
              //~ ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-nine__Hsd7g");
              //~ break;
          //~ }
      //~ }
  //~ }
  
  //~ function renderPixcs(postname, count, type) {
      //~ var ul = document.getElementById('vids');
      //~ var gl = document.getElementById('pics');
      //~ setClass(ul, count);
      //~ for(var i=0;i<count;i++){
          //~ var li = document.createElement('li');
          //~ li.setAttribute('class',"PostPreviewImageView_image_item__dzD2P");
          //~ if (type == "image") {
				//~ var img = document.createElement('img');
				//~ img.setAttribute('class',"PostPreviewImageView_post_image__zLzXH");
				//~ img.src = "//atapi-vatapi.onrender.com/image/" + postname + "_" + (i+1) + ".png";
				//~ li.appendChild(img);
				//~ ul.appendChild(li);
          //~ } else {
              //~ var vid = document.createElement('video');
              //~ vid.setAttribute('class',"PostPreviewImageView_post_image__zLzXH");
              //~ vid.src = "//atapi-vatapi.onrender.com/video/" + postname + "_" + (i+1) + ".mp4";
              //~ vid.autoplay = false;
              //~ vid.controls = true;
              //~ vid.loop = true;
              //~ vid.poster = "//atapi-vatapi.onrender.com/image/" + postname + "_1.jpg";
              //~ li.appendChild(vid);
			  //~ gl.appendChild(li);
          //~ }
      //~ }
  //~ };
  
//   function createBody() {
//       window.history.pushState("object or string", "Upload", "/upload");
//       let html = ``
//       html += `<form><input id="inptfile" type="file" accept="image/*.video/*" multiple  required /><br><div id='upbtn' onclick="uploadnow();" style="display:none;width:4rem;height:4rem;background:#ccc;">Upload</div></form><div id="preview"></div>`;
//       document.getElementById("main").innerHTML = html;
//   document.getElementById("inptfile").addEventListener("change", btnVis);
//   }
  
  
  function btnVis() {
          //~ var x = document.getElementById("fname");
          //~ x.value = x.value.toUpperCase();
          document.getElementById('upbtn').style.display = "block";
          document.getElementById('preview').innerHTML = `<div class="FeedArtistLayoutView_main__r0yQj artist"><div style="aspect-ratio: 706.99 / 588.89; content-visibility: auto; contain-intrinsic-size: 706.99px 588.89px;"><ul id="pics"></ul></div></div>`;
      }
  
  async function uploadnow() {
      document.getElementById('upbtn').style.display = "none";
      const formData = new FormData();
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
          uploadMultiple(formData);
      };
      xhr.send(null);
  }
  
  
  function afterUpload(postid) {
	var gl = document.getElementById('pics');
	var post = document.createElement('a');
    //~ vid.setAttribute('class',"PostPreviewImageView_post_image__zLzXH");
    post.setAttribute('target',"_blank");
    post.setAttribute('rel'," noopener noreferrer");
    post.href = "/post?postid=" + postid;
    //~ vid.poster = "//atapi-vatapi.onrender.com/image/" + postid + "_1.jpg";
	post.innerHTML = "Open Link in new tab"
	gl.appendChild(post);
  }
  
  