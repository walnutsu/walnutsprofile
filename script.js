var card=document.getElementById("card"),info=document.getElementById("info"),btn=document.getElementById("infoBtn");
document.querySelectorAll(".panel").forEach(function(p){p.querySelectorAll(".chip").forEach(function(c,i){c.style.setProperty("--i",Math.min(i,16))})});
var curChip=null;
function wrapOf(c){var p=c.closest(".panel"),w=p&&p.nextElementSibling;return w&&w.classList.contains("mwrap")?w:null}
function closeWrap(w){if(!w)return;w.classList.remove("open");var m=w.querySelector(".meaning");if(m)m.classList.remove("show")}
function pick(c){var w=wrapOf(c);if(!w)return;var m=w.querySelector(".meaning");
if(curChip===c){c.classList.remove("on");curChip=null;closeWrap(w);return}
if(curChip){var pw=wrapOf(curChip);if(pw!==w)closeWrap(pw)}
document.querySelectorAll(".chip.on").forEach(function(x){x.classList.remove("on")});
c.classList.add("on");curChip=c;m.classList.remove("show");
setTimeout(function(){if(curChip!==c)return;m.textContent=c.getAttribute("data-m");var col=c.getAttribute("data-c");if(col){var sw=document.createElement("span");sw.className="sw";sw.style.background=col;m.insertBefore(sw,m.firstChild)}w.classList.add("open");m.classList.add("show")},0)}
document.querySelectorAll(".chip[data-m]").forEach(function(c){c.addEventListener("click",function(){pick(c)});c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(c)}})});
setTimeout(function(){card.classList.add("show")},50);
function closeAllMeanings(){document.querySelectorAll(".mwrap.open").forEach(closeWrap);document.querySelectorAll(".chip.on").forEach(function(x){x.classList.remove("on")});curChip=null}
var tabs=[[btn,info],[document.getElementById("postBtn"),document.getElementById("posts")],[document.getElementById("threadBtn"),document.getElementById("threads")]];
tabs.forEach(function(t){t[0].addEventListener("click",function(){
var open=t[1].classList.toggle("open");
tabs.forEach(function(o){o[0].classList.remove("sel");if(o!==t){o[1].classList.remove("open");o[0].setAttribute("aria-expanded","false")}});
t[0].classList.add("sel");t[0].setAttribute("aria-expanded",open);
closeAllMeanings();
if(open)setTimeout(function(){t[0].scrollIntoView({behavior:"smooth",block:"start"})},350);
})});

var audio=document.getElementById("music");
var titles=["Reflections","Zombie","W.D.Y.W.F.M.","Sweater Weather","Flawless","Stand By Me","Die For You","Past Won't Leave My Bed","SLOW DANCING IN THE DARK","Glimpse of Us","LOVE YOU LESS","Last of a Dying Breed","CAN'T SEE SH*T IN THE CLUB","Afraid","Architect","The Way You Do","Hard To Love","Urn","Lucky","unlearning you"],urls=[],justUnlocked=false;
var rows=[].slice.call(document.querySelectorAll(".albums .row"));
var albums=[{order:[6,7,8,9,10,11,12],idx:0},{order:[3,2,0,1,4,13],idx:0},{order:[5],idx:0},{order:[14,15,16,17,18,19],idx:0}],A=0;
function q(r,sel){return rows[r].querySelector(sel)}
function setPlaying(p){q(A,".player").classList.toggle("playing",p)}
audio.addEventListener("play",function(){setPlaying(true)});
audio.addEventListener("pause",function(){setPlaying(false)});
function tryPlay(){var p=audio.play();if(p&&p.catch)p.catch(function(){audio.muted=true;var q=audio.play();if(q&&q.catch)q.catch(function(){})})}
function unlock(){if(audio.muted){audio.muted=false;justUnlocked=true;setTimeout(function(){justUnlocked=false},400)}if(audio.src&&audio.paused&&!switching){var p=audio.play();if(p&&p.catch)p.catch(function(){})}}
["click","touchend","pointerup","keydown"].forEach(function(e){document.addEventListener(e,unlock,true)});
var AUDIO=["audio/00-reflections.mp3", "audio/01-zombie.mp3", "audio/02-wdywfm.mp3", "audio/03-sweater-weather.mp3", "audio/04-flawless.mp3", "audio/05-stand-by-me.mp3", "audio/06-die-for-you.mp3", "audio/07-past-wont-leave-my-bed.mp3", "audio/08-slow-dancing-in-the-dark.mp3", "audio/09-glimpse-of-us.mp3", "audio/10-love-you-less.mp3", "audio/11-last-of-a-dying-breed.mp3", "audio/12-cant-see-sht-in-the-club.mp3", "audio/13-afraid.mp3", "audio/14-architect.mp3", "audio/15-the-way-you-do.mp3", "audio/16-hard-to-love.mp3", "audio/17-urn.mp3", "audio/18-lucky.mp3", "audio/19-unlearning-you.mp3"];
function urlFor(i){return AUDIO[i]?Promise.resolve(AUDIO[i]):Promise.reject(new Error("no audio"))}
var loadSeq=0;
function fmt(t){t=Math.floor(t);return Math.floor(t/60)+":"+("0"+t%60).slice(-2)}
var switching=false;
function loadTrack(i){var al=albums[A];al.idx=(i+al.order.length)%al.order.length;var t=al.order[al.idx];q(A,".np .t").textContent=titles[t];q(A,".bar i").style.width="0%";q(A,".sec span:first-child").textContent="0:00";q(A,".sec span:last-child").textContent="-:--";var seq=++loadSeq;urlFor(t).then(function(u){if(seq!==loadSeq)return;audio.src=u;audio.load();tryPlay()}).catch(function(){if(seq!==loadSeq)return;audio.removeAttribute("src");setPlaying(false);q(A,".np .t").textContent=titles[t]+" (no audio yet)"})}
function upd(){var d=audio.duration;q(A,".sec span:first-child").textContent=fmt(audio.currentTime);if(isFinite(d)&&d>0){q(A,".sec span:last-child").textContent=fmt(d);q(A,".bar i").style.width=(audio.currentTime/d*100)+"%"}}
audio.addEventListener("timeupdate",upd);audio.addEventListener("loadedmetadata",upd);
audio.addEventListener("ended",function(){loadTrack(albums[A].idx+1)});
rows.forEach(function(r,n){q(n,".cover").addEventListener("click",function(){if(justUnlocked||n!==A)return;loadTrack(albums[A].idx+1)})});

(function(){var sl=document.getElementById("albums"),dots=[].slice.call(document.querySelectorAll("#adots i")),tm;
function page(){return Math.max(0,Math.min(rows.length-1,Math.round(sl.scrollLeft/(sl.clientWidth||1))))}
function setA(n){if(n===A)return;audio.pause();setPlaying(false);A=n;switching=true;loadTrack(albums[A].idx);setTimeout(function(){switching=false},300)}
sl.addEventListener("scroll",function(){var k=page();dots.forEach(function(d,i){d.classList.toggle("on",i===k)});clearTimeout(tm);tm=setTimeout(function(){setA(page())},140)},{passive:true});
})();
loadTrack(0);

function fitNote(){var n=document.querySelector(".note");if(!n)return;n.style.width="";var r=document.createRange();r.selectNodeContents(n);var rs=r.getClientRects(),w=0;for(var i=0;i<rs.length;i++)w=Math.max(w,rs[i].width);var c=getComputedStyle(n);var p=parseFloat(c.paddingLeft)+parseFloat(c.paddingRight)+parseFloat(c.borderLeftWidth)+parseFloat(c.borderRightWidth);if(w)n.style.width=(Math.ceil(w)+p+1)+"px"}
(function(){var av=getComputedStyle(document.querySelector(".av")).backgroundImage;document.querySelectorAll(".pfp").forEach(function(p){p.style.backgroundImage=av});
var pv=document.getElementById("pview"),pl=document.getElementById("pvlist");
function wireSlides(n){var sl=n.querySelector(".slides"),dw=n.querySelector(".dots"),ds=n.querySelectorAll(".dots i"),tm;if(!sl||!ds.length)return;function show(){dw.classList.remove("hide");clearTimeout(tm);tm=setTimeout(function(){dw.classList.add("hide")},3000)}function up(){var k=Math.round(sl.scrollLeft/(sl.clientWidth||1));ds.forEach(function(d,i){d.classList.toggle("on",i===k)});show()}up();sl.addEventListener("scroll",up,{passive:true})}
function openP(c){pl.innerHTML="";var tgt=null;document.querySelectorAll(".feed .pcard").forEach(function(x){var n=x.cloneNode(true);n.removeAttribute("role");n.removeAttribute("tabindex");pl.appendChild(n);if(x===c)tgt=n;wireSlides(n)});pv.classList.add("open");requestAnimationFrame(function(){requestAnimationFrame(function(){pv.classList.add("show");pl.scrollTop=tgt?tgt.offsetTop-pl.firstChild.offsetTop:0;pl.querySelectorAll(".slides").forEach(function(x){x.dispatchEvent(new Event("scroll"))})})})}
function closeP(){pv.classList.remove("show");setTimeout(function(){pv.classList.remove("open");pl.innerHTML=""},300)}
document.querySelectorAll(".feed .pcard").forEach(function(c){c.addEventListener("click",function(){openP(c)});c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openP(c)}})});
document.getElementById("pvback").addEventListener("click",closeP)})();
fitNote();window.addEventListener("load",fitNote);window.addEventListener("resize",fitNote);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitNote);

["gesturestart","gesturechange","gestureend"].forEach(function(t){document.addEventListener(t,function(e){e.preventDefault()})});document.addEventListener("touchmove",function(e){if(e.touches.length>1&&e.cancelable)e.preventDefault()},{passive:false});
(function(){var st=document.getElementById("story"),hb=document.querySelector(".hl-i"),sx=document.getElementById("storyX"),bar=st.querySelector(".sbar i");
function openS(){st.classList.remove("paused");st.classList.add("open");st.setAttribute("aria-hidden","false")}
function closeS(){st.classList.remove("open","paused");st.setAttribute("aria-hidden","true")}
hb.addEventListener("click",openS);
bar.addEventListener("animationend",closeS);
sx.addEventListener("click",function(e){e.stopPropagation();closeS()});
sx.addEventListener("pointerdown",function(e){e.stopPropagation()});
st.addEventListener("pointerdown",function(){st.classList.add("paused")});
["pointerup","pointercancel","pointerleave"].forEach(function(t){st.addEventListener(t,function(){st.classList.remove("paused")})});
})();
(function(){var g=document.getElementById("gal"),tr=document.getElementById("gtrack"),cn=document.getElementById("gcount"),imgs=null,n=0;
function build(){if(imgs)return;imgs=window.GALLERY;n=imgs.length;imgs.forEach(function(u,i){var im=new Image();im.alt="Notebook page "+(i+1);im.decoding="async";im.src=u;var d=document.createElement("div");d.className="gs";d.appendChild(im);tr.appendChild(d)})}
function cur(){return Math.round(tr.scrollLeft/Math.max(1,tr.clientWidth))}
function upd(){cn.textContent=(cur()+1)+" / "+n}
function go(i){i=Math.max(0,Math.min(n-1,i));tr.scrollTo({left:i*tr.clientWidth,behavior:"smooth"})}
function openG(i){build();g.classList.add("open");g.setAttribute("aria-hidden","false");tr.style.scrollBehavior="auto";tr.scrollLeft=i*tr.clientWidth;tr.style.scrollBehavior="";upd()}
function closeG(){g.classList.remove("open");g.setAttribute("aria-hidden","true")}
var grid=document.getElementById("tgrid");
grid.addEventListener("click",function(e){var b=e.target.closest(".tg");if(b)openG(+b.getAttribute("data-i"))});
tr.addEventListener("scroll",upd);
document.getElementById("gx").addEventListener("click",closeG);
document.getElementById("gprev").addEventListener("click",function(){go(cur()-1)});
document.getElementById("gnext").addEventListener("click",function(){go(cur()+1)});
document.addEventListener("keydown",function(e){if(!g.classList.contains("open"))return;if(e.key==="Escape")closeG();else if(e.key==="ArrowLeft")go(cur()-1);else if(e.key==="ArrowRight")go(cur()+1)});
})();
(function(){var els=[].slice.call(document.querySelectorAll(".tpost .tt"));
function fit(t){if(t.dataset.open)return;var b=t.nextElementSibling;if(b&&b.classList.contains("seemore"))b.remove();t.classList.add("clamp");if(t.scrollHeight>t.clientHeight+1){var m=document.createElement("button");m.type="button";m.className="seemore";m.textContent="See more";m.addEventListener("click",function(){t.dataset.open="1";t.classList.remove("clamp");m.remove()});t.insertAdjacentElement("afterend",m)}else t.classList.remove("clamp")}
function all(){els.forEach(fit)}
all();window.addEventListener("load",all);window.addEventListener("resize",all);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(all);
})();
