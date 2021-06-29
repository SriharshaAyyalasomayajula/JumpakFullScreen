

let poses;
let detector;
let video;
let videoloaded=false;
let predictions = [];
var unityLoaded = false;

function setup() {
 
 // const video = document.getElementById('#videoElement');
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
 
 //video = document.getElementById('video'); 
 starts();
}


function draw() {
if(videoloaded==true){
 if(unityLoaded==true){
      if(detector!=undefined)
      {
    start();
  }
  }
}

    
}

async function myfunctions() {
// video = document.getElementById('video');
   detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
   if(video!=undefined && videoloaded==true)
    poses = await detector.estimatePoses(video);
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
// video = document.getElementById('video');
if(unityLoaded==true){
   poses = await detector.estimatePoses(video);

   predictions=poses;
      //console.log(predictions);
      for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];

      for (let j = 0; j < prediction.keypoints.length; j += 1) {

      keypoint = prediction.keypoints[j];


  one.handposeValues[keypoint.name] =   {x:keypoint.x, y:keypoint.y};

//console.log(one.handposeValues);

      }
      }


      jsonString = JSON.stringify(one.handposeValues);
       window.unityInstance.SendMessage('Json_Import', 'TestJson',jsonString);
     //console.log("done");
     }

}

function start() {
  return myfunction();
}

// Call start
(async() => {
    await start();
  })();
