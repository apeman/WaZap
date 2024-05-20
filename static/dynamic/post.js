
function createPostBody() {
	let html = `<section id="pics">gfdgbfh</section><section id="vids">gfdgbfh</section>`;
	document.getElementById("main").innerHTML = html;
	var url = new URL(window.location.href);
	var c = url.searchParams.get("postid");
	console.log(c);
	getPost(c)
}

async function getPost(postid) {
	//~ var urlforpost = "//atapi-vatapi.onrender.com/post?postid="+postid;
    //~ try {
      //~ const response = await fetch(urlforpost, {
        //~ method: "GET",
      //~ });
      //~ const result = await response.text();
      //~ console.log("Success:", result);
      //~ const obj = JSON.parse(result);
//      //~ renderPixcs(obj.postname,obj.postcount,obj.posttype);
      renderPixcs(postid,"1");
//      //~ afterUpload(obj.postname);
    //~ } catch (error) {
      //~ console.error("Error:", error);
    //~ }
}
  
  
  function renderPixcs(postname, count) {
      var gl = document.getElementById('vids');
      var ul = document.getElementById('pics');
	  console.log(postname);
	  if (postname.charAt(0) == "i") {
		for(var i=0;i<count;i++){
			var li = document.createElement('li');
			li.setAttribute('class',"PostPreviewImageView_image_item__dzD2P");
			var img = document.createElement('img');
			img.setAttribute('class',"PostPreviewImageView_post_image__zLzXH");
			img.src = "//atapi-vatapi.onrender.com/image/" + postname + "_" + (i+1) + ".png";
			li.appendChild(img);
			ul.appendChild(li);
		  }
			setClass(ul, count);
	  } else {
		  var vid = document.createElement('video');
		  vid.setAttribute('class',"PostPreviewImageView_post_image__zLzXH");
		  vid.src = "//atapi-vatapi.onrender.com/video/" + postname + "_" + "1.mp4";
		  vid.autoplay = false;
		  vid.controls = true;
		  vid.loop = true;
		  vid.poster = "//atapi-vatapi.onrender.com/image/" + postname + "_1.jpg";
		  gl.appendChild(vid);
	  }
  };
  
  
  async function setClass(ul,count) {
      console.log(count);
      switch (count) {
          case 1 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-one__-6MMx");
              break;
          }
          case 2 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-two__WP8GL");
              break;
          }
          case 3 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-three__HLsVN");
              break;
          }
          case 4 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-four__fYIRN");
              break;
          }
          case 5 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-five__RZvWx");
              break;
          }
          case 6 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-six__Ds3aG");
              break;
          }
          case 7 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-seven__65gnj");
              break;
          }
          case 8 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-eight__SoycA");
              break;
          }
          case 9 : {
              ul.setAttribute('class',"PostPreviewImageView_preview_image_wrap__Q29V8 PostPreviewImageView_-artist__WkyUA PostPreviewImageView_-bottom_radius__Mmn-- PostPreviewImageView_-nine__Hsd7g");
              break;
          }
      }
  }
  