const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

var backgrounddots = [];
var backgroundoffset = {
    x: 0,
    y: 0,
};
var ingame = false;

for (let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++){
        if(Math.random() > 0.7){
            continue;
        }
        backgrounddots.push({
            x: i,
            y: j,
            offset: {
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 - 30,
            },
            color: Math.random() > 0.5 ? "#1c9e5b" : "#1fad64",
            rotation: Math.random() * Math.PI * 2,
            size: Math.random() * 20 + 10,
        });
    }
}

function drawRoundedTriangle(x, y, size, cornerRadius, color, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const x1 = 0;
    const y1 = -size;
    const x2 = -size * 0.866;
    const y2 = size * 0.5;
    const x3 = size * 0.866;
    const y3 = size * 0.5;
    
    const mid12_x = (x1 + x2) / 2;
    const mid12_y = (y1 + y2) / 2;
    const mid23_x = (x2 + x3) / 2;
    const mid23_y = (y2 + y3) / 2;
    const mid31_x = (x3 + x1) / 2;
    const mid31_y = (y3 + y1) / 2;
    
    ctx.moveTo(x1, y1);
    
    const outwardCurve = cornerRadius * -0.9;
    
    const edge12_x = x2 - x1;
    const edge12_y = y2 - y1;
    const edge23_x = x3 - x2;
    const edge23_y = y3 - y2;
    const edge31_x = x1 - x3;
    const edge31_y = y1 - y3;
    
    const normal12_x = edge12_y;
    const normal12_y = -edge12_x;
    const normal23_x = edge23_y;
    const normal23_y = -edge23_x;
    const normal31_x = edge31_y;
    const normal31_y = -edge31_x;
    
    const len12 = Math.sqrt(normal12_x * normal12_x + normal12_y * normal12_y);
    const len23 = Math.sqrt(normal23_x * normal23_x + normal23_y * normal23_y);
    const len31 = Math.sqrt(normal31_x * normal31_x + normal31_y * normal31_y);
    
    const norm12_x = normal12_x / len12;
    const norm12_y = normal12_y / len12;
    const norm23_x = normal23_x / len23;
    const norm23_y = normal23_y / len23;
    const norm31_x = normal31_x / len31;
    const norm31_y = normal31_y / len31;
    
    const curve1_end_x = x2 - outwardCurve * norm12_x;
    const curve1_end_y = y2 - outwardCurve * norm12_y;
    const curve1_ctrl_x = mid12_x + outwardCurve * norm12_x;
    const curve1_ctrl_y = mid12_y + outwardCurve * norm12_y;
    
    const curve2_end_x = x3 - outwardCurve * norm23_x;
    const curve2_end_y = y3 - outwardCurve * norm23_y;
    const curve2_ctrl_x = mid23_x + outwardCurve * norm23_x;
    const curve2_ctrl_y = mid23_y + outwardCurve * norm23_y;
    
    const curve3_end_x = x1 - outwardCurve * norm31_x;
    const curve3_end_y = y1 - outwardCurve * norm31_y;
    const curve3_ctrl_x = mid31_x + outwardCurve * norm31_x;
    const curve3_ctrl_y = mid31_y + outwardCurve * norm31_y;
    
    ctx.quadraticCurveTo(curve1_ctrl_x, curve1_ctrl_y, curve1_end_x, curve1_end_y);
    ctx.quadraticCurveTo(curve2_ctrl_x, curve2_ctrl_y, curve2_end_x, curve2_end_y);
    ctx.quadraticCurveTo(curve3_ctrl_x, curve3_ctrl_y, curve3_end_x, curve3_end_y);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
function redraw() {
    // 获取窗口的实际尺寸（包括滚动条）
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    // 设置Canvas尺寸为窗口尺寸
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }
    
    canvas.style.cursor = "default";
    
    // 绘制背景
    ctx.fillStyle = "#1ea761";
    ctx.fillRect(0, 0, width, height);

    // 计算背景偏移量
    if(!ingame){
        backgroundoffset.x -= 1;
        backgroundoffset.y -= 1;
        
    }
    if(backgroundoffset.x <= -1000){
        backgroundoffset.x = backgroundoffset.x - Math.floor(backgroundoffset.x / 1000) * 1000;
    }
    if(backgroundoffset.y <= -1000){
        backgroundoffset.y = backgroundoffset.y - Math.floor(backgroundoffset.y / 1000) * 1000; 
    }
    if(backgroundoffset.x >= 1000){
        backgroundoffset.x = backgroundoffset.x - Math.floor(backgroundoffset.x / 1000) * 1000;
    }
    if(backgroundoffset.y >= 1000){
        backgroundoffset.y = backgroundoffset.y - Math.floor(backgroundoffset.y / 1000) * 1000; 
    }

    // 绘制背景斑点
    for(let i = 0; i < Math.ceil(1.0 * canvas.width / 1000 + 4); i++){
        for(let j = 0; j < Math.ceil(1.0 * canvas.height / 1000 + 4); j++){
            for(let k = 0; k < backgrounddots.length; k++){
                ctx.fillStyle = backgrounddots[k].color;
                drawRoundedTriangle(canvas.width / 2 - (i - 2) * 1000 + backgrounddots[k].x * 100 + backgrounddots[k].offset.x + backgroundoffset.x, canvas.height / 2 - (j - 2) * 1000 + backgrounddots[k].y * 100 + backgrounddots[k].offset.y + backgroundoffset.y, backgrounddots[k].size, 5, backgrounddots[k].color, backgrounddots[k].rotation);
            }
        }
    }
}

function backgroundLoop(){
    redraw();
    requestAnimationFrame(backgroundLoop);
}

backgroundLoop();
