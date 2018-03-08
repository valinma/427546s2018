var canvasTag = document.getElementById("canvas"),
    c = canvasTag.getContext("2d"),
    edge = document.getElementById("driverScore"),
    deg = Math.PI / 180,
    radius = 200;

function drawWheel() {  
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();
    c.strokeStyle = "cornflowerblue";
    c.lineWidth = 4;
    if(edge.value == 100)
    {
        var x = 400, y = 300;
        inner(x,y);
        c.save(); 
        c.beginPath();
        c.arc(x,y,radius,radius,0,Math.PI*2,false);
        c.stroke();
        c.closePath();
    }
    if(edge.value >= 80 && edge.value <= 99)
    {
        var x = 400, y = 300, rX, rY, ratioX, ratioY;
        rX = radius;
        rY = radius*(1-0.01*(100-edge.value));
        ratioX = rX / rX;
        ratioY = rY / rX;
        c.save(); 
        c.scale(ratioX,ratioY);
        c.beginPath();
        c.arc(x/ratioX,y/ratioY,rX,rY,0,Math.PI*2,false);
        c.stroke();
        c.closePath();
        c.restore();
        inner(x,y);
    }
    if(edge.value <= 79 && edge.value >= 4)
    {
        var x = 400, y = 300;
        var vertices = getPolygonVertices(edge.value, radius); 
        c.save();
        c.beginPath();
        c.translate(canvasTag.width / 2, canvasTag.height / 2);  
        c.moveTo(vertices[0][0], vertices[0][1]);  
        for (var i = 1; i < vertices.length; i++) {  
            c.lineTo(vertices[i][0], vertices[i][1]);  
        }  
        c.closePath();
        c.stroke();  
        c.restore();
        inner(x,y);
    }  
}

function getPolygonVertices (edges, r) {  
    var ca = 0, aiv = 360 / edges, list = new Array();  
    for (var k = 0; k < edges; k++) {  
        var x = Math.cos(ca * deg) * r,  
            y = Math.sin(ca * deg) * r; 
        list.push([x, y]);  
        ca += aiv;  
    } 
    return list;  
}

function inner(x,y)
{
    c.save();
    c.beginPath();
    c.arc(x,y,50,50,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x,y,90,90,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x,y-70,10,10,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x-70*Math.cos(52.5*deg),y+70*Math.sin(52.5*deg),10,10,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x+70*Math.cos(52.5*deg),y+70*Math.sin(52.5*deg),10,10,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x+70*Math.cos(15*deg),y-70*Math.sin(15*deg),10,10,0,Math.PI*2,false);
    c.stroke();
    c.beginPath();
    c.arc(x-70*Math.cos(15*deg),y-70*Math.sin(15*deg),10,10,0,Math.PI*2,false);
    c.stroke();
    c.closePath();
}