let breaklength=5;
let sessionlength=25;
let isRunning=false;
let timerType="Session";
let timeLeft=sessionlength*60;
let timerInterval;

const breakLengthEl=document.getElementById("break-length");
const sessionLengthEl=document.getElementById("session-length");
const breakinc=document.getElementById("break-increment");
const breakdec=document.getElementById("break-decrement");
const sessioninc=document.getElementById("session-increment");
const sessiondec=document.getElementById("session-decrement");
const timeLabel=document.getElementById("timer-label");
const timeDisplay=document.getElementById("time-left");
const beep=document.getElementById("beep");
const stbtn=document.getElementById("start_stop");
const resetbtn=document.getElementById("reset");

breakdec.addEventListener("click",()=>{
    if(breaklength>1){
      breaklength--;
      breakLengthEl.textContent=breaklength;
       if (!isRunning && timerType === "Break") {
      timeLeft = breaklength * 60;
      updateTimeDisplay();
    }
    }
})

sessiondec.addEventListener("click",()=>{
    if(sessionlength>1){
      sessionlength--;
      sessionLengthEl.textContent=sessionlength;
      if(!isRunning){
        timeLeft=sessionlength*60;
        updateTimeDisplay();
      }
    }
})

breakinc.addEventListener("click",()=>{
    if(breaklength<60){
      breaklength++;
      breakLengthEl.textContent=breaklength;
       if (!isRunning && timerType === "Break") {
      timeLeft = breaklength * 60;
      updateTimeDisplay();
    }
    }
})
sessioninc.addEventListener("click",()=>{
    if(sessionlength<60){
      sessionlength++;
      sessionLengthEl.textContent=sessionlength;
      if(!isRunning){
        timeLeft=sessionlength*60;
        updateTimeDisplay();
      }
    }
  
})

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTimeDisplay(){
  timeDisplay.textContent=formatTime(timeLeft);
}

function startTimer(){
  timerInterval=setInterval(()=>{
    if(timeLeft>0){
      timeLeft--;
      updateTimeDisplay();
    }
    else{
      beep.play()
      
      if(timerType==="Session"){
        timerType="Break";
        timeLeft=breaklength*60;
        timeLabel.textContent=timerType;
      }
      else {
        timerType="Session";
        timeLeft=sessionlength*60;
        timeLabel.textContent=timerType;
      }
    }
    updateTimeDisplay()
  },1000) 
}

stbtn.addEventListener("click",()=>{
  if(!isRunning){
    startTimer();
    isRunning=true;
  }
  else{
    clearInterval(timerInterval);
    isRunning=false;
  }
})

resetbtn.addEventListener("click",()=>{
  clearInterval(timerInterval);
  isRunning=false;
  breaklength=5;
  sessionlength=25;
  timerType="Session";
  timeLeft=sessionlength*60;
  breakLengthEl.textContent=breaklength;
  sessionLengthEl.textContent=sessionlength;
  timeLabel.textContent="Session";
  updateTimeDisplay();
  beep.pause();
  beep.currentTime=0;
})
