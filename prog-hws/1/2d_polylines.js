var canvas=document.getElementById('canvas'),
context=canvas.getContext('2d'),
clickTimes=0,
imageData,
p = {},
rubberbandRect = {},
dragging = false,
x0,x1,y0,y1;
function drawingLine(xs,ys,xe,ye)
{
    context.fillStyle = "gold";
    context.fillRect(xe,ye,6,6);
    var imgData = context.getImageData(xe,ye,6,6);
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

    if(0<k&&k<1) 
    {
        dx = X_max - X_min;
        dy = Y_max - Y_min;
        d = 2 * dy - dx;
        incE = 2 * dy;
        incNE = 2 * (dy - dx);
        x = X_min;
        y = Y_min;
        while (x < X_max) 
        {
            if (d <= 0) 
            {
                d = d + incE;
                x = x + 1;
            }else {
                d = d + incNE;
                x = x + 1;
                y = y + 1;
            }
            context.putImageData(imgData, x, y);
        }
    }
    if(k>1) 
    {
        dx = X_max - X_min;
        dy = Y_max - Y_min;
        d = dy - 2 * dx;
        incN = (-2) * dx;
        incNE = 2 * (dy - dx);
        x = X_min;
        y = Y_min;
        while (y < Y_max) 
        {
            if (d > 0) 
            {
                d = d + incN;
                y = y + 1;
            }else {
                d = d + incNE;
                x = x + 1;
                y = y + 1;
            }
            context.putImageData(imgData, x, y);
        }
    }
    if(k<(-1))
    {
        dx = X_max - X_min;
        dy = Y_min - Y_max;
        d =  dy + 2*dx;
        incS = 2 * dx;
        incSE = 2 * (dy + dx);
        x = X_min;
        y = Y_max;
        while (y > Y_min) 
        {
            if (d < 0) 
            {
                d = d + incS;
                y = y - 1;
            }else {
                d = d + incSE;
                x = x + 1;
                y = y - 1;
            }
            context.putImageData(imgData, x, y);
        }
    }
    if((-1)<k&&k<0)
    {
        dx = X_max - X_min;
        dy = Y_min - Y_max;
        d =  dy + 2*dx;
        incE = 2 * dy;
        incSE = 2 * (dy + dx);
        x = X_min;
        y = Y_max;
        while (x < X_max) 
        {
            if (d > 0) 
            {
                d = d + incE;
                x=x+1;
            }else {
                d = d + incSE;
                x = x + 1;
                y = y - 1;
            }
            context.putImageData(imgData, x, y);
        }
    }    
}
// Rubber bands.......................................................
function updateRubber(loc) {
    rubberbandRect.width = Math.abs(loc.x - x1);
    rubberbandRect.height = Math.abs(loc.y - y1);
    if (loc.x > x1) rubberbandRect.left = x1;
    else rubberbandRect.left = loc.x;
    if (loc.y > y1) rubberbandRect.top = y1;
    else rubberbandRect.top = loc.y;
}
function updateRubberband(loc) {
    updateRubber(loc);
    p.x = loc.x;
    p.y = loc.y;
    drawingLine(x1,y1,p.x,p.y);
}

function saveDrawingSurface() {
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreDrawingSurface() {
    context.putImageData(imageData, 0, 0);
}
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height) };
}
function eraseAll(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawingSurface();
    clickTimes = 0;
    p = {};
}
// Canvas event handlers..............................................
canvas.onmousedown = function (e) {
    clickTimes += 1;
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault(); // Prevent cursor change
    x1 = loc.x;
    y1 = loc.y;
    dragging = true;
    if(clickTimes == 1){
        x0 = x1;
        y0 = y1;        
    }
    if(clickTimes == 2){
        drawingLine(x0,y0,x1,y1);
    }
    x1 = p.x;
    y1 = p.y;
    saveDrawingSurface();
};
canvas.onmousemove = function (e) {
    var loc;
    if (dragging) {
        e.preventDefault(); // Prevent selections
        loc = windowToCanvas(e.clientX, e.clientY);
        restoreDrawingSurface();
        updateRubberband(loc);
    }
};
canvas.onmouseup = function (e) {
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    dragging = false;
};