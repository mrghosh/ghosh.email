document.getElementById("email_user").innerHTML="sourav";
document.getElementById("email_domain").innerHTML="ghosh.email";
if ('scrollRestoration' in window.history) {
	window.history.scrollRestoration = 'manual';
}

function generateEmail(username,days1,days2,fullname,pincode){
	var to, subject, body_salutation, body_username, body_location, body_days, body_rest, body_signature, body_concat, mailtoLink, tweet, tweetIntent;
	var clientID=false;
	
	if (username == null || username == "" || days1 == null || days1 == "" || days2 == null || days2 == "") {
		document.getElementById("dialogText").innerHTML="Please fill all required fields (<span style='color:red;'>*</span>) and retry.";
		$("#dialog").dialog("option","title","Error!").dialog("open");
		return false;
    }
	if(/\s/.test(username)) {
		document.getElementById("dialogText").innerHTML="There should be no space within the username. Please retry.";
		$("#dialog").dialog("option","title","Error!").dialog("open");
		return false;
	}
	if(isNaN(username)){
		body_username=`I am a prepaid customer of Alliance Broadband Services Pvt Ltd (ABSPL), and my username is is ${username}.`;
		tweet=`I'm a prepaid customer of Alliance Broadband(#ABSPL), username: ${username}. `;
	}else{
		if(username.toString().length >= 8){
			clientID=true;
			body_username=`I am a prepaid customer of Alliance Broadband Services Pvt Ltd (ABSPL), and my client ID is is ${username}.`;
			document.getElementById("afterGenerateWarning").innerHTML="WARNING: You may have entered Client ID. Username is different from client ID. However, we have generated the email with you client ID. You should recheck your ID for accuracy.";
			//$("#dialog").dialog("option","title","Warning!").dialog("open");
			document.getElementById("afterGenerateWarning").style.display="block";
			tweet=`I'm a prepaid customer of Alliance Broadband(#ABSPL), clientID: ${username}. `;
		} else{
			document.getElementById("dialogText").innerHTML="You may have tried to use the Client ID. Username is different from client ID. Please ether a valid Alliance Broadband username. Please retry.";
			$("#dialog").dialog("option","title","Error!").dialog("open");
			return false;
		}
	}
	
	subject=`[${username}] Complaint against Alliance Broadband Services (P) Ltd`;
	document.getElementById("emailSubject").value=subject;
	to="ddgtermkol-dot@nic.in,ddgvtmkol-dot@nic.in,ddgadmn.wb-dot@gov.in,diradmn.wb-dgt-dot@gov.in,dir2.cmskol-dot@gov.in,ddga.wb-dgt-dot@gov.in,jtot.wb-dgt-dot@gov.in,adcafbp.cad.kolc-wb@nic.in,parmod.k45@gov.in,rakesh.kumar74@gov.in,jitendra.garg@gov.in";
	document.getElementById("emailTo").value=to;
	
	if (fullname == null || fullname == ""){
		body_signature=`Yours Faithfully,
ABSPL user ID: ${username}`;
	}else{
		body_signature=`Yours Faithfully,
${fullname}`;
	}
	if (pincode == null || pincode == ""){
		body_location="";
	}else{
		body_location=`I stay at PIN: ${pincode}`;
	}
	if(days2==0){
		body_days=`After the Cyclone Amphan on 20th May, my internet connectivity was lost, and it was restored after ${days1} days, but I did not receive any rebate.`
		tweet+=`After Cyclone Amphan, my connectivity fault was repaired after ${days1} days, but I didn't receive any rebate. Plz ensure rebate as per QoS regulation (11 of 2006)`;
	}else if(days1-days2 >= 1){
		body_days=`After the Cyclone Amphan on 20th May, my internet connectivity was lost, and it was restored after ${days1} days, but I have only received a validity extension for ${days2} days.`
		tweet+=`After Cyclone Amphan, my connectivity fault was repaired after ${days1} days, but I have received validity extension for only ${days2} days. Plz ensure rebate as per QoS regulation (11 of 2006)`;
	}else{
		document.getElementById("dialogText").innerHTML=`As per the information you have entered above, your connection was restored after ${days1} days, and you have received validity extension of ${days2} days. You don't need to take any more action. Thus, no email was generated. Please recheck the days in the form, or contact us if you think this is an error.`;
		$("#dialog").dialog("option","title","Error!").dialog("open");
		return false;
	}
	body_salutation="Dear Sir/Madam,";
	body_rest="Apart from my case, there are many other cases where the ISP has not given any rebate to the customers and has violated the TRAI QoS regulation. The internet plays a vital role in current pandemic situation. Thus, the authority should take strict actions against these ISPs to ensure a good quality service.";
	body_concat=''.concat(body_salutation,"\n\n", body_username," ",body_location,"\n\n",body_days," ",body_rest,"\n\n",body_signature);
	document.getElementById("emailBody").value=body_concat;
	
	mailtoLink=''.concat("mailto:ddgtermkol-dot@nic.in,ddgvtmkol-dot@nic.in,ddgadmn.wb-dot@gov.in,diradmn.wb-dgt-dot@gov.in,dir2.cmskol-dot@gov.in,ddga.wb-dgt-dot@gov.in,jtot.wb-dgt-dot@gov.in,adcafbp.cad.kolc-wb@nic.in?cc=parmod.k45@gov.in,rakesh.kumar74@gov.in,jitendra.garg@gov.in&subject=",encodeURIComponent(subject),"&body=",encodeURIComponent(body_concat));
	document.getElementById("mailtoLink").href=mailtoLink;
	tweetIntent=''.concat("https://twitter.com/intent/tweet?text=@TRAI%20@DoT_India%20",encodeURIComponent(tweet));
	document.getElementById("tweetIntent").href=tweetIntent;
	
	document.getElementById("beforeGenerate").style.display="none";
	document.getElementById("afterGenerate").style.display="block";
	document.getElementById("accordion1").style.display="block";
	document.getElementById("generateEmailButton").disabled = true;
	document.getElementById("generateEmailButton").scrollIntoView();
	
	
	if(!clientID){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(xhttp.responseText == 0){
					if(new Date().getTime() - start_time > 1000){ //this is used because if the response is received while smooth scrolling, the jquery UI dialog is also scrolled up.
						document.getElementById("dialogText").innerHTML="The username is not a valid alliance username. The email content has been generated but please recheck the username. Contact us if you think this is an error.";
						$("#dialog").dialog("option","title","Warning!").dialog("open");
					}else{
						//alert("WARNING: The username is not a valid alliance username. The email content has been generated but please recheck the username. Contact us if you think this is an error.");
						document.getElementById("afterGenerateWarning").innerHTML="WARNING: The username is not a valid alliance username. The email content has been generated but please recheck the username. Contact us if you think this is an error.";
						document.getElementById("afterGenerateWarning").style.display="block";
					}
				}
			}
		};
		var start_time = new Date().getTime();
		//xhttp.open("GET", "http://localhost/_alliancepetition/validate.php?u=" + username, true);
		xhttp.open("GET", "https://indiatechnical.in/altest/validate.php?u=" + username, true);
		xhttp.send();
	}
	
	
	return false;
}

function copyFunction(elem1, elem2) {
	elem1=document.getElementById(elem1);
	elem2=document.getElementById(elem2);
	elem1.select();
	elem1.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.getElementById("toCopy").innerHTML="(click to copy)";
	document.getElementById("toCopy").parentElement.style.backgroundColor="#80ACF4";
	document.getElementById("subjectCopy").innerHTML="(click to copy)";
	document.getElementById("subjectCopy").parentElement.style.backgroundColor="#80ACF4";
	document.getElementById("bodyCopy").innerHTML="(click to copy)";
	document.getElementById("bodyCopy").parentElement.style.backgroundColor="#80ACF4";
	elem2.innerHTML="(copied)";
	elem2.parentElement.style.backgroundColor="#2c76ee";
}

function startOver(){
	document.getElementById('basicinfo').reset();
	document.getElementById("beforeGenerate").style.display="block";
	document.getElementById("afterGenerate").style.display="none";
	document.getElementById("accordion1").style.display="none";
	document.getElementById("afterGenerateWarning").style.display="none";
	document.getElementById("generateEmailButton").disabled = false;
}



$( function() { //$(document).ready(function() { ... });
	$( "#accordion1" ).accordion({
		collapsible: true,
		heightStyle: "content",
		active: false
	});
	$( "#accordion2" ).accordion({
		collapsible: true,
		heightStyle: "content",
		active: 3
	});
	$( "#dialog" ).dialog({
		autoOpen : false,
		modal : true,
		show : "shake",
		hide : "fade",
		width: 'auto',
		maxWidth: 600,
		create: function( event, ui ) {
			$(this).css("maxWidth", "660px");
		},
		height: 'auto',
		open: function( event, ui ) {
			$("body").css({ overflow: 'hidden' });
		},
		beforeClose: function(event, ui) {
			$("body").css({ overflow: 'inherit' })
		},
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
} );