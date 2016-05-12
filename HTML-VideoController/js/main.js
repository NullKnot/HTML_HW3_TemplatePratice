var videoSrc = new Array("7q2DrrQ33OQ", "ABvAbpusRbc", "bCac20WoTYo");
var videoChoosen = 0;
var playOrPauseButton, toRefrainButton, muteButton;
var player;
var progressSlider, volumeSlider;
var progressUpdater;
var timeLabel;
var secUnit = 1;
var minUnit = secUnit * 60;
var hrUnit = minUnit * 60;

//以上是youtube iframe控制相關變數
//-------------------------------------------------------------------------
//以下是video框架控制相關變數
var myVideo, videoUrl, timeLabel2;
var playOrPauseButton2, fullScreenButton, muteButton2;
var progressSlider2, volumeSlider2;
//-------------------------------------------------------------------------


window.onload = function(){
    window.alert("請使用遙控器控制~\n可以切換不同電視機！\n(小提醒：遙控器可以拖動喔)");
    timeLabel=document.getElementById("timeLabel");
    updateTimeLabel();

    progressSlider=document.getElementById("progressSlider");
    volumeSlider=document.getElementById("volumeSlider");
    playOrPauseButton=document.getElementById("playOrPauseButton");
    muteButton=document.getElementById("muteButton");
    toRefrainButton=document.getElementById("toRefrainButton");

    playOrPauseButton.onclick=playOrPauseHandler;
    muteButton.onclick=muteOrNotHandler;
    toRefrainButton.onclick=jumpToRefrain;

    progressSlider.max = player.getDuration();
    progressSlider.addEventListener("input", function(){
            player.seekTo(progressSlider.value, true);
        }
    );   //"change" 是改變才改 "input" 是隨時有輸入都在改

    volumeSlider.max = 100;
    volumeSlider.addEventListener("input", function(){
        muteButton.value="靜音";
        player.unMute();
        player.setVolume(volumeSlider.value);
    })

//以上是youtube iframe控制相關
//-------------------------------------------------------------------------
//以下是video框架控制相關

    myVideo=document.getElementById("myVideo");
    videoUrl=document.getElementById("videoUrl");
    timeLabel2=document.getElementById("timeLabel2");

    playOrPauseButton2=document.getElementById("playOrPauseButton2")
    fullScreenButton=document.getElementById("fullScreenButton");
    muteButton2=document.getElementById("muteButton2");
    progressSlider2=document.getElementById("progressSlider2");
    volumeSlider2=document.getElementById("volumeSlider2");

    videoUrl.value=myVideo.src
    playOrPauseButton2.onclick=playOrPauseHandler2;
    muteButton2.onclick=muteOrNotHandler2;
    fullScreenButton.onclick=toFullScreen;

    volumeSlider2.max = 1;
    volumeSlider2.step = 0.002;
    volumeSlider2.addEventListener("input", function(){
        muteButton2.value="靜音";
        myVideo.volume = volumeSlider2.value;
    })
}


//onYouTubeIframeAPIReady名稱要打對
function onYouTubeIframeAPIReady(){
    player=new YT.Player('player', {
        height:'342',
        width:'608',
        videoId:'7q2DrrQ33OQ',
        playerVars:{
            'autoplay':0,
            'controls':0,
            'start':0,
            'end':400,
            'showinfo': 0,   //0：關閉影片相關資訊，預設開啟為1
            'rel':0,         //0：關閉相關影片連結，預設開啟為1
            'iv_load_policy':3  //3：關閉影片浮動說明窗，預設開啟為1
        },
        events:{
            'onReady':onPlayerReady,
            'onStateChange':onPlayerStateChange
        }
    });
}


function updateProgressBar(){
    progressSlider.value = player.getCurrentTime() ;
    updateTimeLabel();
}

function updateTimeLabel(){
    timeLabel.innerHTML = timeFormatter(player.getCurrentTime())+ " / "
        + timeFormatter(player.getDuration());
}

function onPlayerReady(event){
}

function onPlayerStateChange(event){
    //當狀態改變時被呼叫，
    //如果狀態改變值為0，將按鈕上的文字設定成Play
    if(event.data==0){
        playOrPauseButton.value="重播";
    }
    if(event.data==1){
        progressSlider.value = player.getCurrentTime();
        progressSlider.max = player.getDuration();  //避免切換影片來源時沒有更新到最大時間長度
        progressUpdater = setInterval(updateProgressBar,1000);
    }


}

function playOrPauseHandler(){
    switch(player.getPlayerState()){
        case 1://playing
            player.pauseVideo();
            playOrPauseButton.value="播放";
            break;
        case 2://pauserd
            player.playVideo();
            playOrPauseButton.value="暫停";
            break;
        case 5://video cued
            player.playVideo();
            playOrPauseButton.value="暫停";
            break;
        case 0://end
            console.log(player);
            player.seekTo(0);
            playOrPauseButton.value="暫停";
            break;
        default:
    }
}

function muteOrNotHandler(){
    if(!player.isMuted()){
        player.mute();
        muteButton.value="取消靜音";
        volumeSlider.value=0;
    }else{
        player.unMute();
        muteButton.value="靜音";
        volumeSlider.value=100;
        player.setVolume(volumeSlider.value);
    }
}

function jumpToRefrain(){
    switch(videoChoosen.toString()){
        case "0":
            player.seekTo(131, true);
            break;
        case "1":
            player.seekTo(55, true);
            break;
        case "2":
            player.seekTo(56, true);
            break;
    }
}

function onVideoChange(){
    player.loadVideoById(videoSrc[eventSelect.value]);
    playOrPauseButton.value="暫停";
    videoChoosen = eventSelect.value;
}

//以上是youtube iframe控制相關
//-------------------------------------------------------------------------
//以下是video框架控制相關


//只能給video框架使用?
function toFullScreen(){
    if(myVideo.requestFullScreen){ //IE
        myVideo.requestFullScreen();
    }
    else if(myVideo.webkitRequestFullScreen){ //Chrome,Opera
        myVideo.webkitRequestFullScreen();
    }
    else if(myVideo.mozRequestFullScreen){ //FireFox
        myVideo.mozRequestFullScreen();
    }
}

function playOrPauseHandler2(){
    if(myVideo.paused){
        myVideo.play();
        playOrPauseButton2.value="暫停";
    }
    else{
        myVideo.pause();
        playOrPauseButton2.value="播放";
    }

    progressSlider2.max = myVideo.duration;
    progressSlider2.addEventListener("input",function(){
            myVideo.currentTime=progressSlider2.value;
        }
    );   //"change" 是改變才改 "input" 是隨時有輸入都在改
    myVideo.addEventListener("timeupdate",updateProgressBar2);
}

function muteOrNotHandler2(){
    if(myVideo.volume != 0){
        myVideo.volume = 0;
        muteButton2.value="取消靜音";
        volumeSlider2.value = 0;
    }else{
        myVideo.volume = 1;
        muteButton2.value="靜音";
        volumeSlider2.value=1;
    }
}

function updateProgressBar2(){
    progressSlider2.value=myVideo.currentTime;
    if(progressSlider2.value == progressSlider2.max){
        playOrPauseButton2.value="重播";
    }
    updateTimeLabel2();
}

function updateTimeLabel2(){
    timeLabel2.innerHTML = timeFormatter(myVideo.currentTime)+ " / "
        + timeFormatter(myVideo.duration);
}
//-------------------------------------------------------------------------
//以下是遙控器共用按鈕

function timeFormatter(totaltime){
    if(totaltime< minUnit){
        return "00:00:"
            + addZero(Math.floor(totaltime));
    }else if(totaltime < hrUnit){
        return "00:"
            + addZero(Math.floor(totaltime/minUnit)) + ":"
            + addZero(Math.floor(totaltime%minUnit));
    }else{
        return addZero(Math.floor((totaltime%minUnit)/hrUnit)) + ":"
            + addZero(Math.floor((totaltime%hrUnit)/minUnit)) + ":"
            + addZero(Math.floor(totaltime%minUnit));
    }
}

function addZero(timeString){
    timeString = "0" + timeString;
    return timeString.slice(-2);
}

function changeTV(id){
    if(id == "TV1_but_div"){
        document.getElementById("TV1_but_div").style.display = "block";
        document.getElementById("TV2_but_div").style.display = "none";

        document.getElementById("TV1_but").style.background = "RED";
        document.getElementById("TV2_but").style.background = "WHITE";
    } else{
        document.getElementById("TV1_but_div").style.display = "none";
        document.getElementById("TV2_but_div").style.display = "block";

        document.getElementById("TV1_but").style.background = "WHITE";
        document.getElementById("TV2_but").style.background = "RED";
    }
}