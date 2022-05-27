const gamesEl=document.getElementById('games');
const ctx=gamesEl.getContext('2d');
gamesEl.width=window.innerWidth;
gamesEl.height=window.innerHeight;
document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);
// setInterval(update,1000/60);
const ship=newShip();
function drawShip(){
    ctx.strokeStyle='white';
    ctx.beginPath();
    ctx.moveTo(ship.x+4/3*ship.r*Math.cos(ship.angle),ship.y-4/3*ship.r*Math.sin(ship.angle));
    ctx.lineTo(ship.x-ship.r*(2/3*Math.cos(ship.angle)+Math.sin(ship.angle)),ship.y+ship.r*(2/3*Math.sin(ship.angle)-Math.cos(ship.angle)));
    ctx.lineTo(ship.x-ship.r*(2/3*Math.cos(ship.angle)-Math.sin(ship.angle)),ship.y+ship.r*(2/3*Math.sin(ship.angle)+Math.cos(ship.angle)));
    ctx.closePath();
    ctx.stroke(); 
}
function newShip(){
    return {
        x:gamesEl.width/2,
        y:gamesEl.height/2,
        r:15,
        angle:0,
        speed:0,
        lasers:[],
        canShoot:true,
        thrusting:false,
        explodeTime:0,
        thrust:{x:0,y:0},
    };
}
function shootLaser(){
    if(ship.canShoot||ship.lasers.length<2){
        ship.lasers.push({
            x:ship.x+4/3*ship.r*Math.cos(ship.angle),
            y:ship.y-4/3*ship.r*Math.sin(ship.angle),
            vx:10*Math.cos(ship.angle),
            vy:-10*Math.sin(ship.angle),
            dist:0,
            speed:5,
            explodeTime:0,
        });
        ship.canShoot=false;
    }
}
function drawThruster(){
    if(ship.thrusting){
        ctx.fillStyle="red";
        ctx.strokeStyle="yellow";
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.moveTo(ship.x-ship.r*(2/3*Math.cos(ship.angle)+0.5*Math.sin(ship.angle)),ship.y+ship.r*(2/3*Math.sin(ship.angle)-0.5*Math.cos(ship.angle)));
        ctx.lineTo(ship.x-ship.r*(2/3*Math.cos(ship.angle)-0.5*Math.sin(ship.angle)),ship.y+ship.r*(2/3*Math.sin(ship.angle)+0.5*Math.cos(ship.angle)));
        ctx.lineTo(ship.x+Math.random()*10-ship.r*5/3*Math.cos(ship.angle),ship.y+ship.r*5/3*Math.sin(ship.angle));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        //thruster
    if(ship.thrusting){
        ship.thrust.x+=ship.thrust.x*Math.cos(ship.angle)/30;
        ship.thrust.y-=ship.thrust.y*Math.sin(ship.angle)/30;
    }else{
        ship.thrust.x-=.6*ship.thrust.x/30;
        ship.thrust.y-=.6*ship.thrust.y/30;
    }   
    }
}
function update(){
    ctx.clearRect(0,0,gamesEl.width,gamesEl.height);
    drawShip();
    //lasers
    for(let i=0;i<ship.lasers.length;i++){
        if(ship.lasers[i].explodeTime==0){
            ctx.fillStyle="white";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x+=ship.lasers[i].vx,ship.lasers[i].y+=ship.lasers[i].vy,4*Math.random(),0,Math.PI*2,true);
            ctx.fill();
        }     
    }
    drawThruster();
    requestAnimationFrame(update);
}
update();
function keydown(e){
    switch(e.key){
        case 'p':
            shootLaser();
            break;
        case 'a':
            ship.angle-=0.1;
            break;
        case 'd':
            ship.angle+=0.1;
            break;
        case 's':
            ship.thrusting=true;
            ship.thrust.x+=0.1*Math.cos(ship.angle);
            ship.thrust.y-=0.1*Math.sin(ship.angle);
            ship.x+=ship.thrust.x;
            ship.y+=ship.thrust.y;
            break;
    }
}
function keyup(e){
    switch(e.key){
        case 'p':
            ship.canShoot=true;
            if(ship.lasers.length>=2){
                ship.lasers.length=0;
            }
            break;
        case's':
            ship.thrusting=false;
            ship.thrust.x-=0.1*Math.cos(ship.angle);
            ship.thrust.y+=0.1*Math.sin(ship.angle);
            ship.x-=ship.thrust.x;
            ship.y-=ship.thrust.y;
            break;

    }
}