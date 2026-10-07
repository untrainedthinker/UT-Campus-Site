// UT Campus alpha: accessible room navigation and clear preview boundaries.
const rooms={
library:["Interactive Research Library","Trace sources, evidence, research notes, indexes, and competing explanations without upgrading inference into fact."],
garden:["Light Word Garden","Explore words, questions, patterns, cross-links, and discovery."],
mira:["MIRA Hall","Explore questions, evidence challenges, and the boundary between text and inference."],
debate:["Debate Arena","Compare competing explanations, assumptions, and uncertainties."],
robot:["Robot Room","Explore UT robotics designs, safe prototypes, and invention records."],
movie:["Movie Room","Explore UT films, visual research, and media projects."]
};
const panel=document.getElementById("room-panel");
const title=document.getElementById("room-title");
const copy=document.getElementById("room-copy");
const close=document.getElementById("close-panel");
let previousFocus=null;
function openRoom(key,button){
 const room=rooms[key];if(!room||!panel)return;
 previousFocus=button||document.activeElement;
 title.textContent=room[0];copy.textContent=room[1];
 panel.hidden=false;document.body.style.overflow="hidden";
 panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");
 panel.setAttribute("aria-labelledby","room-title");
 close.focus();
}
function closeRoom(){
 panel.hidden=true;document.body.style.overflow="";
 if(previousFocus&&previousFocus.focus)previousFocus.focus();
}
document.querySelectorAll("[data-room]").forEach(button=>{
 button.setAttribute("aria-haspopup","dialog");
 button.addEventListener("click",()=>openRoom(button.dataset.room,button));
});
close?.addEventListener("click",closeRoom);
panel?.addEventListener("click",event=>{if(event.target===panel)closeRoom()});
document.addEventListener("keydown",event=>{
 if(panel?.hidden)return;
 if(event.key==="Escape")closeRoom();
 if(event.key==="Tab"){
  const focusable=[...panel.querySelectorAll('button,a[href],input,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }
});
