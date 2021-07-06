
let videoElement = document.querySelector("video")
let recordButton =document.querySelector(".inner-record");
let recordingState =false;
let mideaRecorder;
let zoomIn =document.querySelector(".zoomIn");
let zoomOut =document.querySelector(".zoomOut");


// let downloadButton =document.querySelector("#download");
let capturePhoto =document.querySelector(".inner-capture");

let filters =document.querySelectorAll(".filter");
let filterSelected ="none";


let minZoom=1;
let maxZoom =3.1;
let currentZoom =1;



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

    // downloadButton.addEventListener("click",function(){
    //     aTag.click();
    // })

    aTag.click();
  
};

mideaRecorder.onstop =function(){
    console.log("inside on stop");
};


recordButton.addEventListener("click",function(){
          if(recordingState){
              //already recording is going on 
              //stop the recording 
              mideaRecorder.stop();
              
              recordingState =false;
              recordButton.classList.remove("animate-record");
          }
          else{
                  // start the video recording 
                  mideaRecorder.start();
                 
                  recordingState =true;

                  recordButton.classList.add("animate-record");
          }
});


capturePhoto.addEventListener("click",function(){
    //canvas 
    capturePhoto.classList.add("animate-capture")
          
      setTimeout(function(){
        capturePhoto.classList.remove("animate-capture")
      },1000);


    let canvas =document.createElement("canvas");
    canvas.width = 640;   //video widht
    canvas.height =480  // video height


    let ctx =canvas.getContext("2d");
    ctx.drawImage(videoElement,0,0);

    if(filterSelected!="none"){
  ctx.fillStyle = filterSelected;
  ctx.fillRect(0,0,canvas.width,canvas.height);
    }


    //download canvas as an image 
    let aTag =document.createElement("a");
    aTag.download =`image${Date.now()}.jpg`;
    aTag.href = canvas.toDataURL("image/jpg");
    aTag.click();

});



})();



for(let i=0; i<filters.length;i++){

    filters[i].addEventListener("click",function(e){
        let currentFiltersSelected = e.target.style.backgroundColor;

        if(currentFiltersSelected==""){

            if(document.querySelector(".filter-div")){
                document.querySelector(".filter-div").remove();
                filterSelected ="none";
                return;
            }
        }

          if(filterSelected==currentFiltersSelected){
              return;
          }

          let filterDiv =document.createElement("div");
          filterDiv.classList.add("filter-div");
          filterDiv.style.backgroundColor =currentFiltersSelected;

          if(filterSelected=="none"){
              document.body.append(filterDiv);
        
             
          }
          else{
              document.querySelector(".filter-div").remove();
              document.body.append(filterDiv);
             
              
              

          }
          filterSelected =currentFiltersSelected;
    });
}



zoomIn.addEventListener("click",function(){

    if(currentZoom+0.1>maxZoom){
        return;

    }
    currentZoom = currentZoom+0.1;

    videoElement.style.transform= `scale(${currentZoom})`;
});

zoomOut.addEventListener("click",function(){

    if(currentZoom-0.1<minZoom){
        return;

    }
    currentZoom = currentZoom-0.1;

    videoElement.style.transform= `scale(${currentZoom})`;
});




