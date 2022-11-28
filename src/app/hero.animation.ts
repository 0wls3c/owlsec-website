declare type ctx = any;
// declare type dat = any;
export function AnimateHero() {

 class Star {
  id?: any;
  x?: any;
  y?: any;
  r?: any = Math.floor(Math.random()*2)+1;
  color?: any;
  constructor(id?: any, x?: any, y?: any) {
    this.id = id;
    this.x = x;
    this.y = y;
    // this.r = Math.floor(Math.random()*2)+1;
    let alpha = (Math.floor(Math.random()*10)+1)/10/2;
    this.color = "rgba(255,255,255,"+alpha+")";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  move() {
    this.y -= .15 + params.backgroundSpeed/100;
    if (this.y <= -10) this.y = HEIGHT + 10;
      this.draw();
  }
}

 class Dot {
    id?: any;
    x?: any;
    y?: any;
    r?: any;
    maxLinks?: any = 10;
    speed?: any = .5;
    a?: any = .5;
    aReduction?: any = .005;
    color?: any = "rgba(255,255,255,"+this.a+")";
    linkColor?: any = "rgba(255,255,255,"+this.a/4+")";
    dir?: any = Math.floor(Math.random()*140)+200;
    constructor(id?: any, x?: any, y?: any, r?: any) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random()*5)+1;
    // this.maxLinks = 4; // default is 2
    // this.speed = .5;
    // this.a = .5;
    // this.aReduction = .005;
    // this.color = "rgba(255,255,255,"+this.a+")";
    // this.linkColor = "rgba(255,255,255,"+this.a/4+")";

    // this.dir = Math.floor(Math.random()*140)+200;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    link() {
      if (this.id == 0) return;
      var previousDot1 = getPreviousDot(this.id, 1);
      var previousDot2 = getPreviousDot(this.id, 2);
      var previousDot3 = getPreviousDot(this.id, 3);
      if (!previousDot1) return;
      ctx.strokeStyle = this.linkColor;
      ctx.moveTo(previousDot1.x, previousDot1.y);
      ctx.beginPath();
      ctx.lineTo(this.x, this.y);
      if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
      if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
      ctx.stroke();
      ctx.closePath();
    }

    move() {
      this.a -= this.aReduction;
      if (this.a <= 0) {
        this.die();
        return
      }
      this.color = "rgba(255,255,255,"+this.a+")";
      this.linkColor = "rgba(255,255,255,"+this.a/4+")";
      this.x = this.x + Math.cos(degToRad(this.dir))*(this.speed+params.dotsSpeed/100),
      this.y = this.y + Math.sin(degToRad(this.dir))*(this.speed+params.dotsSpeed/100);

      this.draw();
      this.link();
    }

    die() {
      dots[this.id] = null;
      delete dots[this.id];
    }
  }

 function getPreviousDot(id: any, stepback: any) {
    if (id == 0 || id - stepback < 0) return false;
    if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
    else return false;//getPreviousDot(id - stepback);
  }


    let canvas: HTMLCanvasElement | any  = document.getElementById('canvas'),
    ctx: any = canvas.getContext('2d'),
    WIDTH: any,
    HEIGHT: any,
    mouseMoving: any = false,
    mouseMoveChecker: any,
    mouseX: any,
    mouseY: any,
    stars: any = [],
    initStarsPopulation: any = 200, // default 80
    dots: any = [],
    dotsMinDist = 5, // default 2
    params = {
      maxDistFromCursor: 50, // default 50
      dotsSpeed: 5, //default 0
      backgroundSpeed: 1 // default 0
    };

  setCanvasSize();
  init();

  function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth,
    HEIGHT = document.documentElement.clientHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
  }

  function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (var i = 0; i < initStarsPopulation; i++) {
      stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
      stars[i].draw();
    }
    ctx.shadowBlur = .5;
    animate();
  }

  function animate() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i in stars) {
        stars[i].move();
      }
      for (var i in dots) {
        dots[i].move();
      }
      drawIfMouseMoving();
      requestAnimationFrame(animate);
  }

  window.onmousemove = function(e: any){
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function() {
      mouseMoving = false;
    }, 100);
  }


  function drawIfMouseMoving(){
    if (!mouseMoving) return;

    if (dots.length == 0) {
      dots[0] = new Dot(0, mouseX, mouseY);
      dots[0].draw();
      return;
    }

    var previousDot = getPreviousDot(dots.length, 1);
    var prevX = previousDot.x;
    var prevY = previousDot.y;

    var diffX = Math.abs(prevX - mouseX);
    var diffY = Math.abs(prevY - mouseY);

    if (diffX < dotsMinDist || diffY < dotsMinDist) return;

    var xVariation = Math.random() > .5 ? -1 : 1;
    xVariation = xVariation*Math.floor(Math.random()*params.maxDistFromCursor)+1;
    var yVariation = Math.random() > .5 ? -1 : 1;
    yVariation = yVariation*Math.floor(Math.random()*params.maxDistFromCursor)+1;
    dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
    dots[dots.length-1].draw();
    dots[dots.length-1].link();
  }
  setInterval(drawIfMouseMoving, 5);

  function degToRad(deg: any) {
    return deg * (Math.PI / 180);
  }


}
