var clickTimes=0,
xc,yc,xe,ye,
drawingSurfaceImageData;
function saveDrawingSurface() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function drawingCircle(event)
{
    var canvas=document.getElementById("myCanvas");
    var context=canvas.getContext("2d");
    var bbox = canvas.getBoundingClientRect();
    clickTimes+=1;
    if(clickTimes % 2 == 1) 
    {
        xc = event.clientX;
        yc = event.clientY;
        xc = xc - bbox.left * (canvas.width / bbox.width);
        yc = yc - bbox.top * (canvas.height / bbox.height);        
        context.fillStyle = "blue";
        context.fillRect(xc,yc,3,3);
        var imgData = context.getImageData(xc,yc,3,3);
        context.putImageData(imgData, xc, yc);
    }
    if(clickTimes % 2 == 0) 
    {
        xe = event.clientX;
        ye = event.clientY;
        xe = xe - bbox.left * (canvas.width / bbox.width);
        ye = ye - bbox.top * (canvas.height / bbox.height);
        context.fillStyle = "blue";
        context.fillRect(xe,ye,3,3);
        var imgData = context.getImageData(xe,ye,3,3);
        context.putImageData(imgData, xe, ye);
        R = parseInt(Math.sqrt(Math.pow((xe-xc),2) + Math.pow((ye-yc),2)));
        x = 0;
        y = R;
        d = 1.25 - R;
        while(x < y)
        {
            if(d < 0)
            {
                d = d + 2*x + 3;
            }else{
                d = d + 2*(x - y) + 5;
                y--;
            }
            x++;
            context.putImageData(imgData, parseInt(x + xc),parseInt(y + yc));
            context.putImageData(imgData, parseInt(y + xc),parseInt(x + yc));
            context.putImageData(imgData, parseInt((-x) + xc),parseInt((-y) + yc));
            context.putImageData(imgData, parseInt((-y) + xc),parseInt((-x) + yc));
            context.putImageData(imgData, parseInt(x + xc),parseInt((-y) + yc));
            context.putImageData(imgData, parseInt((-y) + xc),parseInt(x + yc));
            context.putImageData(imgData, parseInt((-x) + xc),parseInt(y + yc));
            context.putImageData(imgData, parseInt(y + xc),parseInt((-x) + yc));
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