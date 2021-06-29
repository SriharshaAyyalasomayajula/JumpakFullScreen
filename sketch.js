let poses;
let detector;
let video;
let videoloaded=false;
let predictions = [];
function setup() {
  // video = document.querySelector("#videoElement");
  // video.onloadeddata = function() {
  //   alert("Browser has loaded the current frame");
  //   starts();
  // };

  const constraints = {
    width: {min: 640, ideal: 640},
    height: {min: 480, ideal: 480},
    advanced: [
      {width: 640, height: 480},
      {aspectRatio: 1.333}
    ]
  };
  video = document.querySelector("#videoElement");
  	video.onloadeddata = (event) => {
    videoloaded=true;
  };
  if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true,constraints })
      .then(function (stream) {


            video.srcObject = stream;

          // Do something with the track such as using the Image Capture API.
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });

  }

  starts();
}

function draw() {
  // video.onloadeddata = function() {
  //   alert("Browser has loaded the current frame");
  //   start();
  // };
  if(detector!=undefined && video!=undefined && videoloaded==true)
  {
    start();
  }
}

async function myfunctions() {
   detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
   if(detector!=undefined && video!=undefined && videoloaded==true){
     poses = await detector.estimatePoses(video);
   }
   // video.onloadeddata = async function() {
   //   alert("Browser has loaded the current frame");
   //   poses = await detector.estimatePoses(video);
   // };
}

function starts() {
  return myfunctions();
}

// Call start
(async() => {
  await starts();
})();
  let keypoint;
  var jsonString ;
  let one ={handposeValues: { one :{ x:0, y:0,z:0}}};

async function myfunction() {
    if(detector!=undefined && videoloaded==true){
      poses = await detector.estimatePoses(video);

      predictions=poses;
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.keypoints.length; j += 1) {
          keypoint = prediction.keypoints[j];
          one.handposeValues[keypoint.name] =   {x:keypoint.x, y:keypoint.y};
        }
      }
      if(unityLoaded==true){
        jsonString = JSON.stringify(one.handposeValues);
        window.unityInstance.SendMessage('Json_Import', 'TestJson',jsonString);
      }
    }
    else{
      starts();
    }
}

function start() {
    // if(unityLoaded==true){
      return myfunction();
    // }
}

// Call start
(async() => {
    await start();
  })();
