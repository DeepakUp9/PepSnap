
let videoElement = document.querySelector("video")
let recordButton =document.querySelector("#record");
let recordingState =false;
let mideaRecorder;

let downloadButton =document.querySelector("#download");
let capturePhoto =document.querySelector("#capture");





(async function () {
    // let constraint ={ video : true ,  audio:true };
    let constraint ={ video : true  };

    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
    videoElement.srcObject= mediaStream;

    mideaRecorder =new MediaRecorder(mediaStream);
    mideaRecorder.onstart =function () {
        console.log("insidem on start");
        
    };

    mideaRecorder.ondataavailable = function (e){
        console.log("inside on data available");

    console.log(e.data);
     videObject = new Blob ([e.data], {type :"video/mp4" });
    console.log(videObject);

    let VideioUrl = URL.createObjectURL(videObject);

    let aTag =document.createElement("a");

    aTag.download =`Video${Date.now()}.mp4`;
    aTag.href =VideioUrl;

    downloadButton.addEventListener("click",function(){
        aTag.click();
    })
  
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


capturePhoto.addEventListener("click",function(){
    //canvas 
    let canvas =document.createElement("canvas");
    canvas.width = 640;   //video widht
    canvas.height =480  // video height


    let ctx =canvas.getContext("2d");

    ctx.drawImage(videoElement,0,0);

    //download canvas as an image 
    let aTag =document.createElement("a");
    aTag.download =`image${Date.now()}.jpg`;
    aTag.href = canvas.toDataURL("image/jpg");
    aTag.click();

});



})();
