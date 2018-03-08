var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d'),
    ratio = document.getElementById('ratio'),
    inputPrimitive = document.getElementById('inputPrimitive'),
    iterations = document.getElementById("iterations"),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    deg = Math.PI / 180;

function lineFractal(c, n, x, y, len, r) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    leg(n);
    c.restore();
    function leg(n) {
        var j, k, angle;
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        }
        else {
            c.scale(1/r, 1/r);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(0 * deg);
            leg(n - 1);
            c.rotate(120 * deg);
            leg(n - 1);
            if(r > 2){
                angle = 240;
                for(k = 6 ; k <= 2*r ;){
                    c.rotate(0 * deg);
                    leg(n - 1);
                    j = k/2;
                    if (j % 2 == 1){
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 240;
                    }
                    else{
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 120;
                    }
                    k = k + 2;
                }
            }
        }
        c.restore();
        c.translate(len, 0);
    }
}

function polylineFractal(c, n, x, y, len, r, an) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    c.rotate(an * deg);
    leg(n);
    c.restore();
    function leg(n) {
        var j, k, angle;
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        }
        else {
            c.scale(1/r, 1/r);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(0 * deg);
            leg(n - 1);
            c.rotate(120 * deg);
            leg(n - 1);
            if(r > 2){
                angle = 240;
                for(k = 6 ; k <= 2*r ;){
                    c.rotate(0 * deg);
                    leg(n - 1);
                    j = k/2;
                    if (j % 2 == 1){
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 240;
                    }
                    else{
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 120;
                    }
                    k = k + 2;
                }
            }
        }
        c.restore();
        c.translate(len, 0);
    }
}
function circleFractal(c, n, x, y, len, r)
{
    var a_deg = 180/r,
        len_cos = len*Math.cos(a_deg*deg),
        len_sin = len*Math.sin(a_deg*deg);
    if(r == 1 || n == 0)
    {
        c.beginPath();
        c.arc(x,y,len,0*deg,360*deg,false);
        c.stroke();
        c.restore();
    }else{
        a_deg = 180/(r*n);
        if(r % 2 == 1){
            c.beginPath();
            c.arc(x-len-len_cos,y-len_sin,len,0*deg,a_deg*deg,false);
            c.stroke();
            c.beginPath();
            c.arc(x,y,len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);    
            c.stroke();
            if(r >= 3){
                for(var i = 2; i < r; )
                {
                    if(r == 3){
                        c.beginPath();
                        c.arc(x+len+len_cos,y-len_sin,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        i = i+1;
                    }
                    if(r == 5){
                        c.beginPath();
                        c.arc(x,y-2*len*Math.cos((a_deg/2)*deg),len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,(180+3*a_deg)*deg,(180+4*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x+len+len_cos,y-len_sin,len,4*a_deg*deg,5*a_deg*deg,false);
                        c.stroke();
                        i = i+3;
                    }
                }
            }
            c.beginPath();
            c.arc(x,y,len,0*deg,a_deg*deg,false); 
            c.stroke();
            if(r >= 3){
                for(i = i+1; i < 2*r; )
                {
                    if(r == 3){
                        c.beginPath();  
                        c.arc(x,y+2*len_sin,len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        i = i+2;
                    }
                    if(r == 5){
                        var l = 2*len*Math.cos((a_deg/2)*deg);
                        c.beginPath();
                        c.arc(x+l*Math.cos(54*deg),y+l*Math.sin(54*deg),len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x-l*Math.cos(54*deg),y+l*Math.sin(54*deg),len,(180+3*a_deg)*deg,(180+4*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,4*a_deg*deg,5*a_deg*deg,false);
                        c.stroke();
                        i = i+4;
                    }
                }
            }
            c.restore();        
        }
        if(r % 2 == 0){
            if(r == 2 && n == 1){
                for(var i = 0, j = 1; i < 2*n*r ;){
                    var chSign = Math.pow((-1),j);
                    c.beginPath();
                    c.arc(x+chSign*len+chSign*len_cos,y+chSign*len_sin,
                    len,(i*(360/(2*r)))*deg,((i+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    i = i + 2;
                    j = j + 1;
                }
                for(var k = 1; k < 2*r*n ;){
                    c.beginPath();
                    c.arc(x,y,len,(k*(360/(2*r)))*deg,((k+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    k = k + 2;
                }
            }
            if(r == 4 && n == 1){
                for(var i = 0, j = 1; i < 2*n*r ;){
                    var chSign = Math.pow((-1),j);
                    var eg = 2*len*Math.cos((a_deg/2)*deg);
                    c.beginPath();
                    c.arc(x+chSign*eg*Math.cos((a_deg/2)*deg),y+chSign*eg*Math.sin((a_deg/2)*deg),
                        len,(i*a_deg)*deg,((i+1)*a_deg)*deg,false);
                    c.stroke();
                    c.beginPath();
                    c.arc(x+Math.pow((-1),j-1)*eg*Math.sin((a_deg/2)*deg),y+chSign*eg*Math.cos((a_deg/2)*deg),
                        len,((i+2)*a_deg)*deg,((i+3)*a_deg)*deg,false);
                    c.stroke();
                    i = i + 4;
                    j = j + 1;
                }
                for(var k = 1; k < 2*r*n ;){
                    c.beginPath();
                    c.arc(x,y,len,(k*(360/(2*r)))*deg,((k+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    k = k + 2;
                }
            }
        }
    }
}
function ellipseFractal(c, n, x, y, r1, r2, r)
{
    if(r1 > r2){
        rX = r1;
        rY = r2;
    }else{
        rX = r2;
        rY = r1;
    }
    ratioX = rX / rX;
    ratioY = rY / rX;
    c.save(); 
    c.scale(ratioX,ratioY);
    c.beginPath();
    c.arc(x/ratioX,y/ratioY,rX,rY,0,Math.PI*2,false);
    c.stroke();
    c.closePath();
    c.restore();
}
function eraseAll(event) {
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();
}

function clear(){
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();
}

function drawFractal(event){
    var primtive = inputPrimitive.value,
        i = iterations.value,
        r = ratio.value;

    c.strokeStyle = strokeStyleSelect.value;
    c.lineWidth = Math.ceil(Math.random()*4);
    if(primtive == "line"){
        clear();
        if(r == 1)
        {
            lineFractal(c, 0, 200, 300, 400, r);
        }else{
            lineFractal(c, i, 200, 300, 400, r);
        }
    }
    if(primtive == "polyline"){
        clear();
        var x_p = 280, y_p = 150, len_edg = 200,
            xd = yd = Math.pow((200*200 - 100*100),0.5);
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,0,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,0,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,0,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,0,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);            
        }else{
            polylineFractal(c,i,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,i,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,i,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,i,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,i,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
        }
        c.restore();    
    }
    if(primtive == "polygon"){
        clear();
        var x_p = 280, y_p = 150, len_edg = 200,
            xd = yd = Math.pow((200*200 - 100*100),0.5);
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,0,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,0,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,0,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,0,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
            len_edg = Math.pow((2*(200*200)),0.5);
            polylineFractal(c,0,x_p,y_p,len_edg,r, 45); 
        }else{
            polylineFractal(c,i,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,i,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,i,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,i,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,i,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
            len_edg = Math.pow((2*(200*200)),0.5);
            polylineFractal(c,i,x_p,y_p,len_edg,r, 45);
        }
        c.restore(); 
    }
    if(primtive == "circle"){
        clear();
        if(i == 2 && r == 2)
        {
            r = 4;
            i = 1;
        }
        circleFractal(c, i, 400, 300, 200, r); 
    }
    if(primtive == "ellipse"){
        clear();
        ellipseFractal(c, 0, 400, 300, 250, 175, 1);
    }
    if(primtive == "rectangle"){
        clear();
        var x_p = 200, y_p = 200, width = 350, height = 200;
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, height, r, 90);
            polylineFractal(c,0,x_p, y_p+height, width, r, 0);
            polylineFractal(c,0,x_p+width, y_p+height, height, r, -90);
            polylineFractal(c,0,x_p+width, y_p, width, r, -180);
        }else{
            polylineFractal(c,i,x_p, y_p, height, r, 90);
            polylineFractal(c,i,x_p, y_p+height, width, r, 0);
            polylineFractal(c,i,x_p+width, y_p+height, height, r, -90);
            polylineFractal(c,i,x_p+width, y_p, width, r, -180);
        }
        c.restore(); 
    }
    c.stroke();
}