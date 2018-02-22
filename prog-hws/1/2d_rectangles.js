var clickTimes=0,
xs,ys,xe,ye,
drawingSurfaceImageData;
function saveDrawingSurface() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function drawingRectangles(event)
{
    var canvas=document.getElementById("myCanvas");
    var context=canvas.getContext("2d");
    var bbox = canvas.getBoundingClientRect();
    clickTimes+=1;
    if(clickTimes % 2 == 1) 
    {
        xs = event.clientX;
        ys = event.clientY;
        xs = xs - bbox.left * (canvas.width / bbox.width);
        ys = ys - bbox.top * (canvas.height / bbox.height);
        context.fillStyle = "cornflowerblue";
        context.fillRect(xs,ys,7,7);
        var imgData = context.getImageData(xs,ys,7,7);
        context.putImageData(imgData, xs, ys);
    }
    if(clickTimes % 2 == 0) 
    {
        xe = event.clientX;
        ye = event.clientY;
        xe = xe - bbox.left * (canvas.width / bbox.width);
        ye = ye - bbox.top * (canvas.height / bbox.height);
        context.fillStyle = "cornflowerblue";
        context.fillRect(xe,ye,7,7);
        var imgData = context.getImageData(xe,ye,7,7);
        k=(ye-ys)/(xe-xs);
        if(xs < xe){
          X_min = xs;
          X_max = xe;
        }else{
          X_min = xe;
          X_max = xs;
        }
        if(ys < ye){
          Y_min = ys;
          Y_max = ye;
        }else{
          Y_min = ye;
          Y_max = ys;
        }
        for(x = X_min; x < X_max ; x++)
        {
            context.putImageData(imgData, x, ys);
            context.putImageData(imgData, x, ye);
        }
        for(y = Y_min; y < Y_max ; y++)
        {
            context.putImageData(imgData, xs, y);
            context.putImageData(imgData, xe, y);
        }
    }
    saveDrawingSurface();
}
function eraseAll(event) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawingSurface();
}