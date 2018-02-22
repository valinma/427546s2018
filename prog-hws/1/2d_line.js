var canvas=document.getElementById('canvas'),
context=canvas.getContext('2d'),
clickTimes=0,
imageData,
start = {},
rubberbandRect = {},
dragging = false;
function drawingLine(xs,ys,xe,ye)
{
    context.fillStyle = "red";
    context.fillRect(xs,ys,2,2);
    var imgData = context.getImageData(xs,ys,2,2);
    context.putImageData(imgData,xs,ys);
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
    rubberbandRect.width = Math.abs(loc.x - start.x);
    rubberbandRect.height = Math.abs(loc.y - start.y);
    if (loc.x > start.x) rubberbandRect.left = start.x;
    else rubberbandRect.left = loc.x;
    if (loc.y > start.y) rubberbandRect.top = start.y;
    else rubberbandRect.top = loc.y;
}
function updateRubberband(loc) {
    updateRubber(loc);
    drawingLine(start.x,start.y,loc.x,loc.y);
}
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height) };
}
function saveDrawingSurface() {
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreDrawingSurface() {
    context.putImageData(imageData, 0, 0);
}
function eraseAll(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawingSurface();
    clickTimes = 0;
}

// Canvas event handlers..............................................
canvas.onmousedown = function (e) {
    clickTimes += 1;
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault(); // Prevent cursor change
    start.x = loc.x;
    start.y = loc.y;
    context.fillStyle = "red";
    context.fillRect(start.x, start.y,2,2);
    var imageData = context.getImageData(start.x, start.y,2,2);
    dragging = true;
    if(clickTimes % 2 == 1){
        context.putImageData(imageData, start.x, start.y);
    }
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