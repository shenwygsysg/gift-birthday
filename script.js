const CONFIG={
  audioUrl:"https://files.catbox.moe/aozygo.mp3",      
  songTitle:"My Moon My Man",
  videoUrl:"https://files.catbox.moe/6h05xk.jpg",                             
  whispers:[
    "You make the quietest moments feel like the best ones.",
    "The way you care about the small details is my favorite thing about you.",
    "Your calm is where I rest, and I don't think you know how rare that is.",
    "You work so hard to be good, and you already are.",
    "I love how thoughtful you are, even when you think nobody notices.",
    "Of all the stars I could have followed, I'm so glad it was you."
  ],
  dates:["Stargazing Drive","Late Dessert Run","Cozy Movie Night","Arcade & Games","Sunset Walk","Street Food Hunt","Picnic Under Stars","Café Hopping"],
  letters:[
    {k:"When You Miss Me",t:"Close your eyes, beloved",b:"I'm never as far as it feels.\nLook up tonight: the same sky is over both of us, and I'm probably looking at it too.\n\nThe distance is only a little time. Hold on to this: I think of you more than you'd believe, and I'm already looking forward to seeing you."},
    {k:"When You're Stressed",t:"Breathe with me",b:"You carry so much, and you hold yourself to such high standards.\nFor a moment, put it all down. You don't have to be perfect to be loved by me.\n\nYou've gotten through every hard day so far. Rest, drink some water, and know I'm proud of you."},
    {k:"When You Need a Smile",t:"Here, a small light",b:"Remember the time we couldn't stop laughing over something that made no sense to anyone else?\nThat's my favorite sound in the world.\n\nNow go do something silly. And then text me, because I want to smile too."}
  ],
  timeline:[
    {d:"The Beginning",t:"When we first met",p:"The day my sky quietly changed.",img:""},
    {d:"A Memory",t:"Our first date",p:"Nervous, happy, and completely myself with you.",img:""},
    {d:"A Memory",t:"A night I'll never forget",p:"Write something that only the two of you understand.",img:""},
    {d:"Today",t:"Still choosing you",p:"Through every season, my answer stays the same.",img:""}
  ],
  voucherText:"One Late-Night Stargazing Drive & Desserts"
};


const $=s=>document.querySelector(s);
const TAU=Math.PI*2;

/* vd */
if(CONFIG.videoUrl){const v=$('#bgvid');v.src=CONFIG.videoUrl;v.play().catch(()=>{})}else $('#bgvid').remove();

/* ms */
const aud=$('#aud'),pp=$('#pp');
$('#ptitle').textContent=CONFIG.songTitle;
if(CONFIG.audioUrl&&!CONFIG.audioUrl.startsWith('PASTE')){aud.src=CONFIG.audioUrl}
const setUI=p=>{pp.textContent=p?'❚❚':'▶';$('#player').classList.toggle('playing',p)};
const tryPlay=()=>{if(!aud.getAttribute('src'))return;aud.play().then(()=>setUI(true)).catch(()=>{})};
pp.onclick=()=>{if(!aud.getAttribute('src')){$('#ptitle').textContent='Add your MP3 link in CONFIG';return}aud.paused?tryPlay():(aud.pause(),setUI(false))};
aud.addEventListener('timeupdate',()=>{$('#pfill').style.width=(aud.currentTime/(aud.duration||1))*100+'%'});
$('#pbar').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();if(aud.duration)aud.currentTime=((e.clientX-r.left)/r.width)*aud.duration};
tryPlay();
const first=()=>{if(aud.paused&&!aud.dataset.manual)tryPlay();['pointerdown','keydown','touchstart'].forEach(ev=>removeEventListener(ev,first))};
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,first,{passive:true}));
pp.addEventListener('click',()=>aud.dataset.manual=1);

/* pr */
const sky=$('#sky'),sc=sky.getContext('2d');let W,H,P=[],S=[];
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;sky.width=W*d;sky.height=H*d;sc.setTransform(d,0,0,d,0,0);
  P=Array.from({length:Math.round(W*H/9000)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,t:Math.random()*TAU,gold:Math.random()<.18}))}
size();addEventListener('resize',size);
function shoot(){const a=Math.PI*(.18+Math.random()*.12),sp=9+Math.random()*7;S.push({x:Math.random()*W*1.1,y:-20+Math.random()*H*.3,vx:Math.cos(a)*-sp,vy:Math.sin(a)*sp,l:0,max:60+Math.random()*40});setTimeout(shoot,2500+Math.random()*6500)}
setTimeout(shoot,2500);
(function loop(){sc.clearRect(0,0,W,H);
  for(const p of P){p.t+=.012*p.z;p.x+=Math.sin(p.t)*.12*p.z;p.y-=.07*p.z;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
    const r=p.z*1.7,a=.35+.55*Math.abs(Math.sin(p.t*2));
    const g=sc.createRadialGradient(p.x,p.y,0,p.x,p.y,r*4);const c=p.gold?'232,200,114':'166,197,254';
    g.addColorStop(0,`rgba(${c},${a*p.z})`);g.addColorStop(1,`rgba(${c},0)`);sc.fillStyle=g;sc.beginPath();sc.arc(p.x,p.y,r*4,0,TAU);sc.fill();
    sc.fillStyle=`rgba(255,255,255,${a})`;sc.beginPath();sc.arc(p.x,p.y,r*.6,0,TAU);sc.fill()}
  S=S.filter(s=>s.l<s.max);
  for(const s of S){s.l++;s.x+=s.vx;s.y+=s.vy;const f=1-s.l/s.max,tx=s.x-s.vx*9,ty=s.y-s.vy*9;
    const g=sc.createLinearGradient(s.x,s.y,tx,ty);g.addColorStop(0,`rgba(255,255,255,${f})`);g.addColorStop(.3,`rgba(232,200,114,${f*.6})`);g.addColorStop(1,'rgba(166,197,254,0)');
    sc.strokeStyle=g;sc.lineWidth=1.8;sc.lineCap='round';sc.beginPath();sc.moveTo(s.x,s.y);sc.lineTo(tx,ty);sc.stroke()}
  requestAnimationFrame(loop)})();

/* rosl */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* w */
$('#stars').innerHTML=CONFIG.whispers.map(m=>`<div class="star glass" tabindex="0"><div class="dot"></div><div class="hint">Touch the star</div><div class="msg">${m}</div></div>`).join('');
document.querySelectorAll('.star').forEach(s=>{const t=()=>s.classList.toggle('open');s.onclick=t;s.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}}});

/* w */
const wc=$('#wheel'),wx=wc.getContext('2d'),N=CONFIG.dates.length,ARC=TAU/N;let rot=0,spinning=false;
const cols=['#14103a','#1d1650','#0f0b2c','#241a5e'];
function drawWheel(){const d=Math.min(devicePixelRatio||1,2),s=wc.clientWidth||440;wc.width=wc.height=s*d;wx.setTransform(d,0,0,d,0,0);
  const c=s/2,R=c-6;wx.clearRect(0,0,s,s);
  for(let i=0;i<N;i++){const a0=rot+i*ARC;wx.beginPath();wx.moveTo(c,c);wx.arc(c,c,R,a0,a0+ARC);wx.closePath();wx.fillStyle=cols[i%4];wx.fill();wx.strokeStyle='rgba(232,200,114,.55)';wx.lineWidth=1.2;wx.stroke();
    wx.save();wx.translate(c,c);wx.rotate(a0+ARC/2);wx.textAlign='right';wx.textBaseline='middle';
    wx.font=`600 ${Math.max(12,s/27)}px 'Plus Jakarta Sans',sans-serif`;wx.fillStyle=i%2?'#ffffff':'#F5DC94';wx.shadowColor='rgba(0,0,0,.9)';wx.shadowBlur=4;
    wx.fillText(CONFIG.dates[i],R-18,0);wx.restore()}
  wx.beginPath();wx.arc(c,c,R,0,TAU);wx.strokeStyle='#E8C872';wx.lineWidth=3;wx.stroke();
  const g=wx.createRadialGradient(c,c,0,c,c,s*.07);g.addColorStop(0,'#fff3c4');g.addColorStop(1,'#b8913a');wx.beginPath();wx.arc(c,c,s*.07,0,TAU);wx.fillStyle=g;wx.fill()}
addEventListener('resize',drawWheel);
document.fonts&&document.fonts.ready.then(drawWheel);drawWheel();
$('#spin').onclick=()=>{if(spinning)return;spinning=true;$('#spin').disabled=true;$('#result').style.opacity=0;
  const start=rot,extra=TAU*(6+Math.random()*3)+Math.random()*TAU,dur=5200,t0=performance.now();
  const ease=t=>1-Math.pow(1-t,3);
  (function step(now){const t=Math.min((now-t0)/dur,1);rot=start+extra*ease(t);drawWheel();
    if(t<1)requestAnimationFrame(step);else{const ang=((-Math.PI/2-rot)%TAU+TAU)%TAU,i=Math.floor(ang/ARC)%N;
      $('#result').textContent='✦ '+CONFIG.dates[i]+' ✦';$('#result').style.opacity=1;spinning=false;$('#spin').disabled=false;$('#spin').textContent='Spin Again'}})(t0)};

/* w */
const L=$('#letters'),modal=$('#modal');
L.innerHTML=CONFIG.letters.map((l,i)=>`<div class="env glass" data-i="${i}" tabindex="0"><div class="flap"><span>♍</span></div><h3><small>Open</small>${l.k}</h3></div>`).join('');
const openL=i=>{$('#mt').textContent=CONFIG.letters[i].t;$('#mp').textContent=CONFIG.letters[i].b;modal.classList.add('show')};
L.querySelectorAll('.env').forEach(e=>{e.onclick=()=>openL(e.dataset.i);e.onkeydown=k=>{if(k.key==='Enter')openL(e.dataset.i)}});
$('#mc').onclick=()=>modal.classList.remove('show');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});

/* tl */
$('#tl').innerHTML=CONFIG.timeline.map(e=>`<div class="ev reveal"><div class="card glass"><div class="ph">${e.img?`<img src="${e.img}" alt="${e.t}">`:'Your photo here'}</div><div class="d">${e.d}</div><h3>${e.t}</h3><p>${e.p}</p></div></div>`).join('');
document.querySelectorAll('.ev').forEach(el=>{io.observe(el);el.addEventListener('click',()=>el.classList.toggle('tap'))});

/* sc */
const cv=$('#scratch'),cx=cv.getContext('2d',{willReadFrequently:true});let drawing=false,done=false,W2,H2;
document.querySelector('.prize h3').textContent=CONFIG.voucherText;
function cover(){const b=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W2=b.width;H2=b.height;cv.width=W2*d;cv.height=H2*d;cx.setTransform(d,0,0,d,0,0);
  const g=cx.createLinearGradient(0,0,W2,H2);g.addColorStop(0,'#2b2358');g.addColorStop(.5,'#6a5a9e');g.addColorStop(1,'#241c4e');cx.fillStyle=g;cx.fillRect(0,0,W2,H2);
  for(let i=0;i<260;i++){cx.fillStyle=`rgba(${Math.random()<.5?'232,200,114':'166,197,254'},${Math.random()*.7})`;cx.beginPath();cx.arc(Math.random()*W2,Math.random()*H2,Math.random()*1.6+.3,0,TAU);cx.fill()}
  cx.fillStyle='rgba(255,255,255,.88)';cx.font="italic 26px 'Cormorant Garamond',serif";cx.textAlign='center';cx.fillText('Scratch here ✦',W2/2,H2/2+8)}
cover();document.fonts&&document.fonts.ready.then(cover);
function pos(e){const b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}
function scr(e){if(!drawing||done)return;const[x,y]=pos(e);cx.globalCompositeOperation='destination-out';cx.beginPath();cx.arc(x,y,24,0,TAU);cx.fill();cx.globalCompositeOperation='source-over'}
cv.addEventListener('pointerdown',e=>{drawing=true;cv.setPointerCapture(e.pointerId);scr(e)});
cv.addEventListener('pointermove',scr);
const end=()=>{drawing=false;if(done)return;const d=cx.getImageData(0,0,cv.width,cv.height).data;let c=0,n=0;for(let i=3;i<d.length;i+=64){n++;if(d[i]<20)c++}
  if(c/n>.5){done=true;cv.style.opacity=0;cv.style.pointerEvents='none'}};
cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);