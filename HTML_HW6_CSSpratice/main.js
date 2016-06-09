var planetA, ang_rot_planetA, x_planetA, y_planetA, ang_rev_planetA;//ang_rot_planetA:自轉角度, ang_rev_planetA:公轉角度
var planetB, ang_rot_planetB, x_planetB, y_planetB, ang_rev_planetB;//ang_rot_planetB:自轉角度, ang_rev_planetB:公轉角度;
var flyingArea, pos_x, pos_y, distance, border_W, border_H;
var talkbox, timmer, talkboxTitle, talkboxContent;


window.onload=function(){
	planetA=document.getElementById("planetA");
	ang_rot_planetA=0;
	x_planetA=0.0;y_planetA=0.0;ang_rev_planetA=0.0;
	
	planetB=document.getElementById("planetB");
	ang_rot_planetB=0;
	x_planetB=0.0;y_planetB=0.0;ang_rev_planetB=0.0;
	
	flyingArea=document.getElementById("flyingArea");
	border_W=document.body.clientWidth;
	border_H=document.body.clientHeight;
	pos_x=flyingArea.offsetLeft;
	pos_y=flyingArea.offsetTop;
	distance=0;
	
	talkbox=document.getElementById("talkbox");
	talkboxTitle=document.getElementById("talkboxTitle");
	talkboxContent=document.getElementById("talkboxContent");
	
	//設定自轉
	setInterval(function(){
		planetA.style.transform="rotate("+ang_rot_planetA+"deg)";
		ang_rot_planetA+=0.4;
		
		planetB.style.transform="rotate("+ang_rot_planetB+"deg)";
		ang_rot_planetB+=1;
	},10);
	//設定公轉
	setInterval(function(){
		x_planetA=300*Math.sin(ang_rev_planetA)+310;
		y_planetA=300*Math.cos(ang_rev_planetA)+310;
		ang_rev_planetA+=0.001;
		planetA.style.top=x_planetA+"px";
		planetA.style.left=y_planetA+"px";
		
		x_planetB=180*Math.sin(ang_rev_planetB)+350;
		y_planetB=180*Math.cos(ang_rev_planetB)+350;
		ang_rev_planetB+=0.005;
		planetB.style.top=x_planetB+"px";
		planetB.style.left=y_planetB+"px";
	},1);
	//設定火箭飛行
	setInterval(function(){
		if(pos_y+flyingArea.clientHeight==0){
			pos_x=0-150;
			flyingArea.style.left=pos_x+"px";
			
			pos_y=border_H;
			flyingArea.style.top=pos_y+"px";
		}
		pos_x++;pos_y--;
		flyingArea.style.left=pos_x+"px";
		flyingArea.style.top=pos_y+"px";
	},1);
	
	document.getElementById("sun").onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="恆星HTML-5";
		talkboxContent.innerHTML="行星CSS-3與<br>行星Java-script<br>皆以他為中心進行公轉";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
	
	document.getElementById("satellite").onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="觀測衛星W3";
		talkboxContent.innerHTML="記錄著各個星球<br>默默的觀察著他們";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
	
	document.getElementById("aerolite").onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="石頭";
		talkboxContent.innerHTML="就只是顆在宇宙的石頭<br>不知道是誰丟的<br>咦！會抖動也沒什麼吧?";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
	
	planetA.onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="行星CSS-3";
		talkboxContent.innerHTML="自轉與公轉速度慢<br>疑似有生命跡象";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
	
	planetB.onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="行星Java-script";
		talkboxContent.innerHTML="活躍的星球內部<br>仍有許多未知數";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
	
	flyingArea.onmouseover=function(){
		if(timmer!=null){clearTimeout(timmer);}
		talkboxTitle.innerHTML="探險者No.99";
		talkboxContent.innerHTML="\"看來這裡沒布丁...\"";
		talkbox.style.visibility="visible"
		
		timmer=setTimeout(function(){
			talkbox.style.visibility="hidden";
		},3000);
	}
}