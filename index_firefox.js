<!DOCTYPE html>
<html>
<head>






  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Unity WebGL Player | PoseNet</title>
  <link rel="shortcut icon" href="favicon.ico">
   <link rel="stylesheet" href="style.css">
   <script>
var x;
var testObject ;
var jsonString ;

var  unityGame;


</script>
<script src="/p5.min.js"></script>
<script src="/tfjs-core"></script>
<script src="/tfjs-converter"></script>
<script src="/tfjs-backend-webgl"></script>
<script src="/pose-detection"></script>
  <script src="sketch_firefox.js"></script>
<!--<script src="Exercise.  js"></script> -->

<!--<script src="Yoga.js"></script>-->

<meta charset="utf-8" />
 <video autoplay="true" id="videoElement" hidden>

  </video>

</head>
<body>





  <div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas"></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-mobile-warning">
      WebGL builds are not supported on mobile devices.
    </div>
    <div id="unity-footer">
      <div id="unity-webgl-logo"></div>
      <div id="unity-fullscreen-button"></div>
      <div id="unity-build-title">PoseNet</div>
    </div>
  </div>

  <script>
    var buildUrl = "";
    var loaderUrl = buildUrl + "/Webgl.loader.js";
    var config = {
      dataUrl: buildUrl + "/Webgl.data",
      frameworkUrl: buildUrl + "/Webgl.framework.js",
      codeUrl: buildUrl + "/Webgl.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "PoseNet",
      productVersion: "0.1",
    };
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var fullscreenButton = document.querySelector("#unity-fullscreen-button");
    var mobileWarning = document.querySelector("#unity-mobile-warning");
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
      mobileWarning.style.display = "block";
      setTimeout(() => {
        mobileWarning.style.display = "none";
      }, 5000);
    } else {
      canvas.style.width = "640px";
      canvas.style.height = "480px";
    }
    loadingBar.style.display = "block";
    var script = document.createElement("script");
    script.src = loaderUrl;

    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
	  unityGame = unityInstance;
window.unityInstance = unityInstance;
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
  </script>


</body>
</html>
