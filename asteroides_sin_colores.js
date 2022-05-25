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
    ctx.moveTo(ship.x,ship.y);
    ctx.lineTo(ship.x-15,ship.y-15);
    ctx.lineTo(ship.x+15,ship.y-15);
    ctx.lineTo(ship.x,ship.y);
    ctx.stroke(); 
}
function newShip(){
    return {
        x:gamesEl.width/2,
        y:gamesEl.height/2,
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
    if(ship.canShoot){
        ship.lasers.push({
            x:ship.x,
            y:ship.y,
            angle:ship.angle,
            speed:5,
            explodeTime:0,
        });
        ship.canShoot=false;
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
            ctx.arc(ship.lasers[i].x,ship.lasers[i].y+=12,4*Math.random(),0,Math.PI*2,true);
            ctx.fill();
        }        
    }
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
    }
}
function keyup(e){
    switch(e.key){
        case 'p':
            ship.canShoot=true;
            break
    }
}