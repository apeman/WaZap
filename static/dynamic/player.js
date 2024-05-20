/*************************************************************************************/
				/*
		<!--&#10008;-->
		<!--&#10004;-->
		window.addEventListener('contextmenu', (event) => {event.preventDefault();alert('mouse right-click is prevented');});
*/
/*************************************************************************************/
		var angle = 0;
		var flip = false;
		var blend = false;
		var hotkeysEnabled = true;
		var vidd = document.getElementsByTagName("video")[0];
	 window.addEventListener("keypress", function(e) {
		if(e.key==="," && hotkeysEnabled) {
             vidd.currentTime -= 1/12; 
		};
		if(e.key==="." && hotkeysEnabled) {
             vidd.currentTime += 1/12; 
		};
		if(e.key==="c" && vidd.playbackRate < 3.0 && hotkeysEnabled) {
			vidd.playbackRate += .25; 
			//document.getElementById("curSpeed").textContent = parseFloat(vidd.playbackRate).toFixed(2);
		};
		if(e.key==="x" && hotkeysEnabled) {
			vidd.playbackRate = 1;
			//document.getElementById("curSpeed").textContent = parseFloat(vidd.playbackRate).toFixed(2);
		};
		if(e.key==="z" && vidd.playbackRate > 0.25 && hotkeysEnabled) {
			try{vidd.playbackRate -= .25;} catch(err){vidd.playbackRate = 0.25}
			//document.getElementById("curSpeed").textContent = parseFloat(vidd.playbackRate).toFixed(2);
		};
		if(e.key==="b" && hotkeysEnabled) {
			setVol(-.1);
		};
		if(e.key==="n" && hotkeysEnabled) {
			setVol(.1);
		};
		if(e.key==="m" && hotkeysEnabled) {
			mute();
		};
		if(e.key==="r" && hotkeysEnabled) {
			if (angle != 360) {
				angle = angle+90; 
				var vdsclX =  vidd.videoHeight/vidd.videoWidth;
				var vdsclY = vidd.videoWidth/vidd.videoHeight;
				var vdscale =  Math.min(vdsclX, vdsclY);
				if (vidd.videoHeight > vidd.videoWidth) {vdscale =  Math.max(vdsclX, vdsclY)};
				vidd.style.transform = "rotate("+ angle +"deg) scale("+ vdscale +")";
			} 
			if (angle == 360) {
				angle = 0;
				vidd.style.transform = "rotate(0deg) scale(1)";
			}
			if (angle == 180) {
				angle = 180;
				vidd.style.transform = "rotate(180deg) scale(1)";
			}
		};
//~ 		if(e.key==="v" && vidd.playbackRate > 0.25 && hotkeysEnabled) {
//~ 			video.paused ? video.play() : video.pause();
//~ 		};
		if(e.key==="v"  && hotkeysEnabled) {
			vidd.paused ? vidd.play() : vidd.pause();
		};
		if(e.key==="h" && hotkeysEnabled) {
			if (!flip) { 
				vidd.style.transform = "scaleX(-1)";
				flip = true; 
			} else { 
				vidd.style.transform = "scaleX(1)";
				flip = false; 
			}
		};}, false);
		
          function setVol(value) {
            var vol = vidd.volume;
            vol += value;
            //  test for range 0 - 1 to avoid exceptions
            if (vol >= 0 && vol <= 1) {
              // if valid value, use it
              vidd.volume = vol;
            } else {
              // otherwise substitute a 0 or 1
              vidd.volume = (vol < 0) ? 0 : 1;
            }
          };

/*************************************************************************************/
var QS = function (el) {
    return document.querySelector(el);
};

var durationBar = QS('.play-duration-bar');

QS('#mainVid').addEventListener('timeupdate', function (e) {

    var total = ((e.target.currentTime / e.target.duration) * 100);

    durationBar.style.width = total + '%';
})

QS('.play-duration').addEventListener('mousedown', function (e) {

    var rect = e.currentTarget.getBoundingClientRect(),
        offsetX = e.clientX - rect.left,
        offsetY = e.clientY - rect.top;

    var fraction = (offsetX / e.currentTarget.clientWidth);

    var video = QS('#mainVid');

    video.currentTime = video.duration *  fraction;

    //durationBar.style.width = (fraction * 100) + '%';
});

/*************************************************************************************/
/*
document
  .getElementById("to_focus")
  .addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "z") {
      // Do Something, may be an 'Undo' operation
    }
});
*//*
var video = document.getElementById('mainVid');

document.onkeypress = function(e) {
    if ( (e || window.event).keyCode === 32  ) {
        video.paused ? video.play() : video.pause();
    }
};
*/


function disableHotkeys(){hotkeysEnabled=false}
function enableHotkeys(){hotkeysEnabled=true}
