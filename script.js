
let videoElement = document.querySelector("video")
let recordButton =document.querySelector("#record");
let recordingState =false;
let mideaRecorder;



(async function () {
    let constraint ={ video : true };

    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
    videoElement.srcObject= mediaStream;

    mideaRecorder =new MediaRecorder(mediaStream);
    mideaRecorder.onstart =function () {
        console.log("insidem on start");
        
    };

    mideaRecorder.ondataavailable = function (e){
        console.log("inside on data available");
    console.log(e.data);
    let videObject = new Blob ([e.data], {type :"video/mp4" });
    console.log(videObject);
};

mideaRecorder.onstop =function(){
    console.log("inside on stop");
};


recordButton.addEventListener("click",function(){
          if(recordingState){
              //already recording is going on 
              //stop the recording 
              mideaRecorder.stop();
              recordButton.innerHTML="Record Video";
              recordingState =false;
          }
          else{
                  // start the video recording 
                  mideaRecorder.start();
                  recordButton.innerHTML="Recording....";
                  recordingState =true;
          }
});

})();
