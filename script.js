import { Effect } from "./ASCIIEffect.js"

let video = document.createElement('video')
navigator.mediaDevices.getUserMedia({video:true}).then( function(stream){
    const ctx = myCanvas.getContext('2d')
    video.srcObject = stream
    video.play()
    video.onloadeddata = e=>{
        myCanvas.width = video.videoWidth
        myCanvas.height= video.videoHeight

    }
    let effect = new Effect()
    animate()
    function animate(){
        ctx.clearRect(0,0,myCanvas.width, myCanvas.height)
        effect.draw( ctx, video , myCanvas)
        requestAnimationFrame(animate)
    }
})