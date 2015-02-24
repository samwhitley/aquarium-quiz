!function(){function a(a){a instanceof Array?a.forEach(function(a){b(a)}):b(a)}function b(a){if(f[a])return f[a];var b=new Image;b.onload=function(){f[a]=b,d()&&g.forEach(function(a){a()})},f[a]=!1,b.src=a}function c(a){return f[a]}function d(){var a=!0;for(var b in f)f.hasOwnProperty(b)&&!f[b]&&(a=!1);return a}function e(a){g.push(a)}var f={},g=[];window.resources={load:a,get:c,onReady:e,isReady:d}}(),function(){function a(a,b,c,d,e,f,g){this.pos=b,this.size=c,this.speed="number"==typeof d?d:0,this.frames=e,this._index=0,this.url=a,this.dir=f||"horizontal",this.once=g}a.prototype={update:function(a){this._index+=this.speed*a},render:function(a){var b;if(this.speed>0){var c=this.frames.length,d=Math.floor(this._index);if(b=this.frames[d%c],this.once&&d>=c)return void(this.done=!0)}else b=0;var e=this.pos[0],f=this.pos[1];"vertical"==this.dir?f+=b*this.size[1]:e+=b*this.size[0],a.drawImage(resources.get(this.url),e,f,this.size[0],this.size[1],0,0,this.size[0],this.size[1])}},window.Sprite=a}();var AQUARIUM={};AQUARIUM.main=function(){function a(){console.log("main: init()"),AQUARIUM.width=500,AQUARIUM.height=500,AQUARIUM.canvas=document.createElement("canvas"),AQUARIUM.ctx=AQUARIUM.canvas.getContext("2d"),AQUARIUM.canvas.width=AQUARIUM.width,AQUARIUM.canvas.height=AQUARIUM.height,document.body.appendChild(AQUARIUM.canvas),AQUARIUM.input.connectEvents(),resources.load(["images/sprites-left.png","images/sprites-right.png","images/fyush.png"]),resources.onReady(function(){c("title"),b()})}function b(){function a(){var c=Date.now(),f=(c-b)/1e3;e(a),AQUARIUM.ctx.clearRect(0,0,AQUARIUM.width,AQUARIUM.height),d.update(f),d.render(),b=c}var b=Date.now();a()}function c(a){if(!f){switch(f=!0,a){case"title":AQUARIUM.titleScreen.init(),d=AQUARIUM.titleScreen;break;case"menu":AQUARIUM.menuScreen.init(),d=AQUARIUM.menuScreen;break;case"instruction":AQUARIUM.instructionScreen.init(),d=AQUARIUM.instructionScreen;break;case"fish":AQUARIUM.fishScreen.init(),d=AQUARIUM.fishScreen;break;case"question":AQUARIUM.questionScreen.init(),d=AQUARIUM.questionScreen;break;case"result":d=AQUARIUM.resultScreen}f=!1}}var d,e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)},f=!1;return{init:a,changeScreen:c}}(),AQUARIUM.input=function(){function a(){console.log("main: connectEvents");var a=function(a){var b=!1,c=0,d=0;return a.addEventListener("mousedown",function(e){b=!0,c=e.clientX-a.offsetLeft,d=e.clientY-a.offsetTop}),a.addEventListener("mouseup",function(e){b=!1,c=e.clientX-a.offsetLeft,d=e.clientY-a.offsetTop}),{isButtonDown:function(){return b},x:function(){return c},y:function(){return d}}}(AQUARIUM.canvas);window.mouse=a}function b(){g=mouse.isButtonDown(),c=!g&&h,h=g}function c(){return c}function d(a,b){a.width=b.measureText(a.text).width,a.height=parseInt(b.font)}function e(a){a.x=(AQUARIUM.width-a.width)/2}function f(a){var b=!1,c=mouse.x(),d=mouse.y();return c>=a.x&&c<=a.x+a.width&&d>=a.y-a.height&&d<=a.y&&a.action(),b}var g,h,c;return{connectEvents:a,setInputState:b,justClicked:c,setTextDimensions:d,centerText:e,isTextClicked:f}}(),AQUARIUM.utils=function(){function a(a){return Math.floor(Math.random()*a.length)}return{randomIndex:a}}(),AQUARIUM.fishScreen=function(){function a(){console.log("fishScreen: init"),i=setInterval(d,1e3),m={fish:0,red:0,green:0,gold:0,small:{total:0,red:0,green:0,gold:0},medium:{total:0,red:0,green:0,gold:0},large:{total:0,red:0,green:0,gold:0}},h()}function b(a){for(var b,c,d,e,f,g,h=0,i=j.length;i>h;h++)b=j[h].pos[0],c=j[h].pos[1],d=j[h].dx,e=j[h].dy,f=j[h].size[0],g=j[h].size[1],(b+f+d*a>AQUARIUM.width||0>b+d*a)&&(j[h].dx=-d,j[h].sprite=j[h].dx>0?j[h].rightSprite:j[h].leftSprite),(c+g+e*a>AQUARIUM.height||0>c+e*a)&&(j[h].dy=-e),j[h].pos[0]+=j[h].dx*a,j[h].pos[1]+=j[h].dy*a}function c(){var a;AQUARIUM.ctx.fillStyle="#000000",AQUARIUM.ctx.fillRect(0,0,AQUARIUM.width,AQUARIUM.height);for(var b=0,c=j.length;c>b;b++)a=j[b],AQUARIUM.ctx.save(),AQUARIUM.ctx.translate(a.pos[0],a.pos[1]),a.sprite.render(AQUARIUM.ctx),AQUARIUM.ctx.restore();AQUARIUM.ctx.fillStyle="#FFFFFF",AQUARIUM.ctx.font="24pt sans-serif",AQUARIUM.ctx.fillText(o,50,50)}function d(){o-=1,0===o&&(clearInterval(i),AQUARIUM.main.changeScreen("question"))}function e(){var a=AQUARIUM.utils.randomIndex(l),b=l[a],c=AQUARIUM.utils.randomIndex(b.colors),d=b.colors[c],e={},f=Math.floor(Math.random()*AQUARIUM.width+1),g=Math.floor(Math.random()*AQUARIUM.height+1);return m.fish+=1,m[d.name]+=1,m[b.type].total+=1,m[b.type][d.name]+=1,f+b.size[0]>AQUARIUM.width&&(f-=b.size[0]),g+b.size[1]>AQUARIUM.height&&(g-=b.size[1]),e.pos=[f,g],e.type=b.type,e.size=b.size,e.color=d.name,e.leftSprite=new Sprite("images/sprites-left.png",d.pos,b.size),e.rightSprite=new Sprite("images/sprites-right.png",d.pos,b.size),e.dx=b.speed,e.sprite=e.rightSprite,Math.random()<.5?(e.dx=b.speed+Math.floor(20*Math.random()),e.sprite=e.rightSprite):(e.dx=-b.speed-Math.floor(20*Math.random()),e.sprite=e.leftSprite),e.dy=Math.random()<.5?Math.floor(b.speed/2)+30*Math.random():Math.floor(-b.speed/2)-30*Math.random(),e}function f(){return m}function g(){return l}function h(){console.log("fishScreen: reset"),o=n,j=[];for(var a=0;k>a;a++)j.push(e())}var i,j=[],k=30+(Math.floor(30*Math.random())+1),l=[{type:"small",size:[57,26],speed:100,colors:[{name:"green",pos:[90,0]},{name:"red",pos:[90,27]},{name:"gold",pos:[90,55]}]},{type:"medium",size:[88,44],speed:75,colors:[{name:"green",pos:[0,0]},{name:"red",pos:[0,45]},{name:"gold",pos:[0,90]}]},{type:"large",size:[97,101],speed:50,colors:[{name:"green",pos:[150,0]},{name:"red",pos:[150,102]},{name:"gold",pos:[150,204]}]}],m={},n=5,o=0;return{init:a,update:b,render:c,reset:h,getTotals:f,getFishSpecs:g}}(),AQUARIUM.titleScreen=function(){function a(){e=setInterval(c,500)}function b(){AQUARIUM.input.setInputState(),AQUARIUM.input.justClicked()&&AQUARIUM.main.changeScreen("instruction")}function c(){f=!f}function d(){AQUARIUM.ctx.save(),AQUARIUM.ctx.fillStyle="#001758",AQUARIUM.ctx.fillRect(0,0,AQUARIUM.width,AQUARIUM.height),AQUARIUM.ctx.fillStyle="#FFFFFF",AQUARIUM.ctx.textAlign="center",AQUARIUM.ctx.drawImage(resources.get("images/fyush.png"),50,75),AQUARIUM.ctx.font="3em sans-serif",AQUARIUM.ctx.fillText("Aquarium Quiz",AQUARIUM.width/2,285),f&&(AQUARIUM.ctx.font="1.5em sans-serif",AQUARIUM.ctx.fillText("Click anywhere",AQUARIUM.width/2,335)),AQUARIUM.ctx.restore()}var e,f=!0;return{init:a,update:b,render:d}}(),AQUARIUM.instructionScreen=function(){function a(){h[0].sprite=new Sprite(g,f[2].colors[0].pos,f[2].size),h[1].sprite=new Sprite(g,f[2].colors[1].pos,f[2].size),h[2].sprite=new Sprite(g,f[2].colors[2].pos,f[2].size),h[3].sprite=new Sprite(g,f[1].colors[0].pos,f[1].size),h[4].sprite=new Sprite(g,f[1].colors[1].pos,f[1].size),h[5].sprite=new Sprite(g,f[1].colors[2].pos,f[1].size),h[6].sprite=new Sprite(g,f[0].colors[0].pos,f[0].size),h[7].sprite=new Sprite(g,f[0].colors[1].pos,f[0].size),h[8].sprite=new Sprite(g,f[0].colors[2].pos,f[0].size),e=setInterval(d,500)}function b(){AQUARIUM.input.setInputState(),AQUARIUM.input.justClicked()&&AQUARIUM.main.changeScreen("fish")}function c(){AQUARIUM.ctx.save(),AQUARIUM.ctx.fillStyle="#001758",AQUARIUM.ctx.fillRect(0,0,AQUARIUM.width,AQUARIUM.height),AQUARIUM.ctx.fillStyle="#FFFFFF",AQUARIUM.ctx.font="24px sans-serif",AQUARIUM.ctx.fillText("Pay attention to the fish on the next screen...",10,30),i&&AQUARIUM.ctx.fillText("Click to start",10,480),AQUARIUM.ctx.font="18px sans-serif",AQUARIUM.ctx.fillText("Large",140,90),AQUARIUM.ctx.fillText("Medium",260,90),AQUARIUM.ctx.fillText("Small",390,90),AQUARIUM.ctx.fillText("Green",30,170),AQUARIUM.ctx.fillText("Red",30,280),AQUARIUM.ctx.fillText("Gold",30,390);for(var a=0,b=h.length;b>a;a++)entity=h[a],AQUARIUM.ctx.save(),AQUARIUM.ctx.translate(entity.pos[0],entity.pos[1]),entity.sprite.render(AQUARIUM.ctx),AQUARIUM.ctx.restore();AQUARIUM.ctx.restore()}function d(){i=!i}var e,f=AQUARIUM.fishScreen.getFishSpecs(),g="images/sprites-left.png",h=[{pos:[110,120]},{pos:[110,230]},{pos:[110,340]},{pos:[245,140]},{pos:[245,250]},{pos:[245,360]},{pos:[380,150]},{pos:[380,260]},{pos:[380,370]}],i=!0;return{init:a,update:b,render:c}}(),AQUARIUM.questionScreen=function(){function a(){h=AQUARIUM.fishScreen.getTotals(),j=e(),m.text=j.answer,m.visible=!1}function b(){AQUARIUM.input.setInputState(),AQUARIUM.input.justClicked()&&(AQUARIUM.input.isTextClicked(k),AQUARIUM.input.isTextClicked(l))}function c(){AQUARIUM.ctx.save(),AQUARIUM.ctx.fillStyle="#D71C40",AQUARIUM.ctx.fillRect(0,0,AQUARIUM.width,AQUARIUM.height),AQUARIUM.ctx.fillStyle="#FFFFFF",AQUARIUM.ctx.font="18pt sans-serif",AQUARIUM.ctx.textAlign="left",AQUARIUM.ctx.fillText(j.text,20,40),m.visible&&AQUARIUM.ctx.fillText(m.text,20,80),AQUARIUM.ctx.fillText(k.text,k.x,k.y),AQUARIUM.input.setTextDimensions(k,AQUARIUM.ctx),AQUARIUM.ctx.fillText(l.text,l.x,l.y),AQUARIUM.input.setTextDimensions(l,AQUARIUM.ctx),AQUARIUM.ctx.restore()}function d(a){var b;return b=a instanceof Array?h[a[0]][a[1]]:"object"==typeof h[a]?h[a].total:h[a]}function e(){for(var a,b,c,e,f={text:"",answer:0},g=[],h=[],j=Math.floor(4*Math.random());i===j;)j=Math.floor(4*Math.random());switch(i=j,j){case 0:f.text="How many fish were there?",f.answer=d("fish");break;case 1:g=["green","red","gold","small","medium","large"],a=AQUARIUM.utils.randomIndex(g),c=g[a],f.answer=d(c),f.text="How many "+c+" fish were there?";break;case 2:g=["green","red","gold","small","medium","large"],a=AQUARIUM.utils.randomIndex(g),c=g[a],h=g.slice(0),h.splice(a,1),b=AQUARIUM.utils.randomIndex(h),e=h[b],f.answer=d(c)>d(e)?"Yes":"No",f.text="Were there more "+c+" fish than "+e+" fish?";break;case 3:g=["small","medium","large"],a=AQUARIUM.utils.randomIndex(g),c=g[a],h=["green","red","gold"],b=AQUARIUM.utils.randomIndex(h),e=h[b],f.answer=d([c,e]),f.text="How many "+c+" "+e+" fish were there?"}return f}function f(){console.log("playAgainAction()"),AQUARIUM.main.changeScreen("fish")}function g(){console.log("seeAnswerAction()"),m.visible=!0}var h,i,j={text:"",answer:0},k={text:"See answer",x:20,y:340,width:0,height:0,action:g},l={text:"Play again",x:20,y:390,width:0,height:0,action:f},m={text:"",visible:!1};return{init:a,render:c,update:b}}(),AQUARIUM.resultScreen=function(){return{}}();