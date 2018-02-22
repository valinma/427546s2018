var clickTimes=0,
xc,yc,R1,R2,
drawingSurfaceImageData;
function saveDrawingSurface() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function drawingCenter(event)
{
    var canvas=document.getElementById("myCanvas");
    var context=canvas.getContext("2d");
    var bbox = canvas.getBoundingClientRect();
    clickTimes+=1;
    if(clickTimes) 
    {
        xc = event.clientX;
        yc = event.clientY;
        xc = xc - bbox.left * (canvas.width / bbox.width);
        yc = yc - bbox.top * (canvas.height / bbox.height);
        context.fillStyle = "orange";
        context.fillRect(xc, yc,4,4);
        var imgData = context.getImageData(xc, yc,4,4);
        context.putImageData(imgData, xc, yc);
    }
    saveDrawingSurface();
}
function drawingPixels(xc, yc, x, y)
{
    var canvas=document.getElementById("myCanvas");
    var context=canvas.getContext("2d");
    var bbox = canvas.getBoundingClientRect();
    context.fillStyle = "orange";
    context.fillRect(xc,yc,4,4);
    var imgData = context.getImageData(xc,yc,4,4);
    addx = xc + x;
    minusx = xc - x;
    addy = yc + y;
    minusy = yc - y;
    context.putImageData(imgData, addx, addy);
    context.putImageData(imgData, addx, minusy);
    context.putImageData(imgData, minusx, addy);
    context.putImageData(imgData, minusx, minusy);
}
function drawingEllipse(event)
{
    var canvas=document.getElementById("myCanvas");
    var context=canvas.getContext("2d");
    R1 = parseInt((document.getElementById("r1")).value);
    R2 = parseInt((document.getElementById("r2")).value);
    x = 0;
    y = R2;
    Rx2 = Math.pow(R1,2);
    Ry2 = Math.pow(R2,2);
    twoRx2 = 2*Rx2;
    twoRy2 = 2*Ry2;
    dx = 0;
    dy = twoRx2*y;
    d = Ry2 - Rx2*R2 + Rx2*0.25 + 0.5;
    drawingPixels(xc,yc,x,y);
    while(dx < dy){
        x++;
        dx = dx + twoRy2;
        if(d<0){
            d = d + Ry2 + dx;
        }else{
            dy = dy - twoRx2;
            d = d + Ry2 + dx - dy;
            y--;
        }
        drawingPixels(xc,yc,x,y);
    }
    d = Ry2*Math.pow((x + 0.5),2) + Rx2*Math.pow((y - 1),2) - Rx2*Ry2 + 0.5;
    while(y > 0){
        y--;
        dy = dy - twoRx2;
        if(d > 0){
            d = d + Rx2 - dy;
        }else{
            x++;
            dx = dx + twoRy2;
            d = d + Rx2 - dy + dx;
        }
        drawingPixels(xc,yc,x,y);
    }
    saveDrawingSurface();
}
function eraseAll(event) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawingSurface();
}