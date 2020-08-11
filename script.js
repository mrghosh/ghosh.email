if ('scrollRestoration' in window.history) {
	window.history.scrollRestoration = 'manual';
}
var oldwidth = window.innerWidth;
window.onresize = function(){newwidth = window.innerWidth; if(oldwidth != newwidth) location.reload(); } //When user scrolls down, android chrome hides the browser navigation bar and it produces a window resize. we check window width to avoid this.
//window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; (IE crossbrowser)

//if(getComputedStyle(document.getElementsByClassName("mediaqueryHelper")[0]).fontSize == '1px') document.getElementById('footersvg').setAttribute("viewBox", "0 0 100 25");

var isDeleting = false;
var isTyping = true;
var blink = 0;
var txt = "";
var time = 100;
var names = ["sanchari","aakash","sushmita","abhijit","anushka","avik","anik","achintya","bhashkar","bishwajit","dipon","dipayan","ipsit","pratik","saptarshi","swagata","sanjay","moloy","samar","sanjib","aitri","bipasha","ishani","soumi","koyel","sohini","suravi","tamanna","tilottama","suchandra","disari","ankita","satyaki","anideep","tirthankar","arunabha","samir","sujata","sangeeta","niloy","sampurna","sohini","oishi"];
var name = names[Math.floor(Math.random() * names.length)];
var oldName = name;
function type(){
	if(!isDeleting && !isTyping && blink < 7) {
		//document.getElementById("name").classList.toggle("cursorShow");
		blink++;
		if (blink == 7){
			isDeleting = true;
			isTyping = false;
			blink = 0;
			document.getElementById("name").classList.toggle("cursorBlink");
			document.getElementById("namePlaceHolder").classList.toggle("cursorBlinkPlaceHolder");
			//document.getElementById("name").classList.add("cursorShow");
			time = 100;
		}
	}
	if (isTyping) {
		if (txt == name){
			isTyping=false;
			isDeleting=false;
			time = 500;
			document.getElementById("name").classList.toggle("cursorBlink");
			document.getElementById("namePlaceHolder").classList.toggle("cursorBlinkPlaceHolder");
		} else{
			txt = name.substring(0, txt.length + 1);
			document.getElementById("name").innerHTML = txt;
			document.getElementById("namePlaceHolder").innerHTML = txt;
		}
	}
	if (isDeleting){
		if (txt == "") {
			isDeleting = false;
			isTyping = true;
			while (oldName == name){
				name = names[Math.floor(Math.random() * names.length)];
			}
			oldName = name;
		} else{
			txt = name.substring(0, txt.length - 1);
			document.getElementById("name").innerHTML = txt;
			document.getElementById("namePlaceHolder").innerHTML = txt;
		}
	}
	

	setTimeout(type, time);
}

type();


window.onscroll = function() {shrink()};
function shrink(){
	if(getComputedStyle(document.getElementsByClassName("mediaqueryHelper")[0]).fontSize != '3px') return; //enable shrinking effect only on devices with width larger than 1000px. we use css media query to set the style of 'mediaqueryHelper'
	//.style.fontSize returns only inline styles. so we need to use getComputedStyle. getComputedStyle does not show values with rem, vw, etc. units. it returns the calculated value in px.
	if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40) {
		document.getElementsByClassName("typingEmail")[0].style.fontSize = "1.5rem";
		document.getElementsByClassName("typingEmail")[0].style.marginLeft = "12%";
		//document.getElementsByClassName("typingEmailPlaceHolder")[0].style.color = "rgba(0, 0, 0, 0.1)";
		//document.getElementsByClassName("typingEmailPlaceHolder")[0].style.opacity = "0.1";
		document.getElementById("topWrapperPlaceHolder").style.visibility = "visible";
		document.getElementById("topWrapper").style.height = "4rem";
	} else{
		document.getElementsByClassName("typingEmail")[0].style.fontSize = "4rem";
		document.getElementById("topWrapper").style.height = "32rem";
		document.getElementsByClassName("typingEmail")[0].style.marginLeft = "15%";
		document.getElementById("topWrapperPlaceHolder").style.visibility = "hidden";
	}
}
//setTimeout(shrink, 5000);





/*================================================EXPERIMENTAL===============================================
//IF THE MOUSE WHEEL IS USED, DECREASE THE HEIGHT OF THE topWrapperPlaceHolder. THIS, WITH CSS TRANSITION, CREATES A SCROLL EFFECT AT THE FIRST TIME WHEN THE USER SCROLLS DOWN WITH MOUSE WHEEL (DOES NOT WORK IF THE USER USES DOWN ARROW OR BROWSER SCROLLBAR)
//needScroll variable is used to check if we need to shrink the topWrapperPlaceHolder. xScrollTime variables are used to check if the user makes multiple scrolldown events within a short time during the first scroll. wheelUsed variable is used to add different effects when the user is not using mouse wheel to scroll. modify <body onwheel="shrinkNavbar(event)">
//REQUIRES MORE TESTING. HAS BUGS.

var needScroll = true;
var prevScrollTime;
var curScrollTime;
var deltaScrollTime;
var wheelUsed = false;
function shrinkNavbar(event) {
	wheelUsed = true;
	if(needScroll && (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) && event.deltaY>0){
		event.preventDefault();
		needScroll = false;
		document.getElementById("topWrapperPlaceHolder").style.height = "10rem";
		document.getElementsByClassName("typingEmail")[0].style.fontSize = "1.5rem";
		document.getElementsByClassName("typingEmail")[0].style.marginLeft = "12%";
		document.getElementById("topWrapper").style.height = "4rem";
		prevScrollTime = new Date().getTime();
	} else{
		curScrollTime = new Date().getTime();
		deltaScrollTime = curScrollTime - prevScrollTime;
		if(deltaScrollTime < 100 && (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0)){
			event.preventDefault();
		}
		prevScrollTime = curScrollTime;
	}
	//console.log(event.deltaY);
}

window.onscroll = function() {shrink()};
function shrink(){
	if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40) {
		document.getElementsByClassName("typingEmail")[0].style.fontSize = "1.5rem";
		document.getElementsByClassName("typingEmail")[0].style.marginLeft = "12%";
		document.getElementById("topWrapper").style.height = "4rem";
		if(!wheelUsed) document.getElementById("topWrapperPlaceHolder").style.visibility = "visible";
	} else{
		if(!wheelUsed){
			document.getElementsByClassName("typingEmail")[0].style.fontSize = "4rem";
			document.getElementById("topWrapper").style.height = "30rem";
			document.getElementsByClassName("typingEmail")[0].style.marginLeft = "15%";
			document.getElementById("topWrapperPlaceHolder").style.visibility = "hidden";
		}
	}
}
================================================EXPERIMENTAL===============================================*/