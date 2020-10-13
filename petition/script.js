document.getElementById("email_user").innerHTML="sourav";
document.getElementById("email_domain").innerHTML="ghosh.email";
if ('scrollRestoration' in window.history) {
	window.history.scrollRestoration = 'manual';
}

function generateEmail(username,days1,days2,fullname,pincode){
	var to, subject, body_salutation, body_username, body_location, body_days, body_rest, body_signature, body_concat, mailtoLink, tweet, tweetRest, tweetIntent;
	var clientID=false;
	resetErrors();
	if (username == null || username == "" || days1 == null || days1 == "" || days2 == null || days2 == "") {
		document.getElementById("dialogText").innerHTML="Please fill all required fields (<span style='color:red;'>*</span>) and retry.";
		$("#dialog").dialog("option","title","Error!").dialog("open");
		return false;
    }
	if(/\s/.test(username)) {
		//document.getElementById("dialogText").innerHTML="There should be no space within the username. Please retry.";
		//$("#dialog").dialog("option","title","Error!").dialog("open");
		document.getElementById("usernameError").innerHTML="There should be no space within the username.";
		document.forms.basicinfo.username.focus();
		return false;
	}
	if(/[^a-zA-Z0-9_\-\.]/.test(username)) {
		document.getElementById("usernameError").innerHTML="Only a-z 0-9 _ - and . are allowed in username.";
		document.forms.basicinfo.username.focus();
		return false;
	}
	if(username.length < 5) {
		document.getElementById("usernameError").innerHTML="Username should be more than 4 characters.";
		document.forms.basicinfo.username.focus();
		return false;
	}
	if(days1 < 4 || days1 > 90) {
		document.getElementById("days1Error").innerHTML="Value should be more than 3 and less than 90 days.";
		document.forms.basicinfo.days1.focus();
		return false;
	}
	if(days2 < 0 || days2 > 30) {
		document.getElementById("days2Error").innerHTML="Value should be between 0 days and 30 days.";
		document.forms.basicinfo.days2.focus();
		return false;
	}
	
	if (fullname == null || fullname == ""){
		body_signature=`Yours faithfully,
ABSPL user ID: ${username}`;
	}else{
		if(/[^a-zA-Z ]/.test(fullname)) {
			document.getElementById("nameError").innerHTML="Only a-z and space are allowed in full name.";
			document.forms.basicinfo.fullname.focus();
			return false;
		}
		body_signature=`Yours faithfully,
${fullname}`;
	}
	if (pincode == null || pincode == ""){
		body_location="";
	}else{
		if(pincode < 700001 || pincode > 749999) {
			document.getElementById("pinError").innerHTML="Please enter a valid West Bengal pincode.";
			document.forms.basicinfo.pincode.focus();
			return false;
		}
		body_location=`I stay at PIN: ${pincode}`;
	}
	if(days2==0){
		body_days=`After the Cyclone Amphan on 20th May, my internet connectivity was lost, and it was restored after ${days1} days, but I did not receive any rebate. According to the TRAI Quality of Service of Broadband Service Regulations 2006 (11 of 2006), in all cases where the fault is not rectified within three working days, the rebate shall be given as per the provisions in section 3(ii) of the regulation. Even after the restoration, there were huge packet loss and bandwidth problems, which continued for the next few weeks.`
		tweetRest=`After Cyclone Amphan, my connectivity fault was repaired after ${days1} days, but I didn't receive any rebate. Plz direct the ISP to give rebate as per TRAI QoS regulation (11 of 2006)`;
	}else if(days1-days2 >= 1){
		body_days=`After the Cyclone Amphan on 20th May, my internet connectivity was lost, and it was restored after ${days1} days, but I have only received a validity extension for ${days2} days. According to the TRAI Quality of Service of Broadband Service Regulations 2006 (11 of 2006), in all cases where the fault is not rectified within three working days, the rebate shall be given as per the provisions in section 3(ii) of the regulation. Even after the restoration, there were huge packet loss and bandwidth problems, which continued for the next few weeks.`
		tweetRest=`After Cyclone Amphan, my connectivity fault was repaired after ${days1}days, but I received validity extension for ${days2}days. Plz direct ISP for rebate as per QoS regulation (11 of 2006)`;
	}else{
		document.getElementById("dialogText").innerHTML=`As per the information you have entered above, your connection was restored after ${days1} days, and you have received validity extension of ${days2} days. You don't need to take any more action. Thus, no email was generated. Please recheck the days in the form, or contact us if you think this is an error.`;
		$("#dialog").dialog("option","title","Error!").dialog("open");
		return false;
	}
	
	if(isNaN(username)){
		body_username=`I am a prepaid customer of Alliance Broadband Services Pvt Ltd (ABSPL), and my username is ${username}.`;
		tweet=`I'm a prepaid customer of Alliance Broadband(#ABSPL), username: ${username}. `;
		tweet+=tweetRest;
	}else{
		if(username.toString().length >= 8){
			clientID=true;
			body_username=`I am a prepaid customer of Alliance Broadband Services Pvt Ltd (ABSPL), and my client ID is ${username}.`;
			document.getElementById("afterGenerateWarning").innerHTML="WARNING: You may have entered your Client ID. Username is different from the client ID. However, we have generated the email with your client ID. You should recheck your ID for accuracy.";
			//$("#dialog").dialog("option","title","Warning!").dialog("open");
			document.getElementById("afterGenerateWarning").style.display="block";
			tweet=`I'm a prepaid customer of Alliance Broadband(#ABSPL), clientID: ${username}. `;
			tweet+=tweetRest;
		} else{
			document.getElementById("dialogText").innerHTML="You may have tried to use your Client ID. Username is different from the client ID. Please ether a valid Alliance Broadband username. Please retry.";
			$("#dialog").dialog("option","title","Error!").dialog("open");
			return false;
		}
	}
	
	subject=`[${username}] Complaint against Alliance Broadband Services (P) Ltd`;
	document.getElementById("emailSubject").value=subject;
	to="ddgtermkol-dot@nic.in,ddgvtmkol-dot@nic.in,ddgadmn.wb-dot@gov.in,diradmn.wb-dgt-dot@gov.in,dir2.cmskol-dot@gov.in,ddga.wb-dgt-dot@gov.in,jtot.wb-dgt-dot@gov.in,daca@trai.gov.in,adcafbp.cad.kolc-wb@nic.in";
	document.getElementById("emailTo").value=to;

	body_salutation="Dear Sir/Madam,";
	body_rest=`IMD and NDMA issued an alert about seven days before the severe Cyclone. ABSPL did not have a proper plan to restore connectivity after the storm. It should also be noted that the ISP should compensate for the days which their business partners, local cable operators, took to repair the last mile fibers. Moreover, the official website of ABSPL does not have any appellate authority details (as of 14.10.2020) and consumer charter. This is a violation of Telecom Consumers Complaint Redressal Regulations, 2012. I understand that the Cyclone has done a lot of damages, but from the perspective of the customers, we did already pay for the prepaid service, and we should get the rebate as per regulation. Apart from myself, there are many other users to whom the ISP has not given any rebates.
	
The internet plays a vital role in the current pandemic situation. In This scenario, I request the statutory authority/concerned department to take immediate action against Alliance Broadband Services Pvt. Ltd. to protect the users' consumer rights and ensure the quality of service. Also, please direct the ISP to give me the rebate as per the regulation.

Qos Regulation PDF: https://www.trai.gov.in/sites/default/files/201211090321243727349Regulation6oct06.pdf`;
	body_concat=''.concat(body_salutation,"\n\n", body_username," ",body_location,"\n\n",body_days,"\n\n",body_rest,"\n\n",body_signature);
	document.getElementById("emailBody").value=body_concat;
	
	mailtoLink=''.concat("mailto:ddgtermkol-dot@nic.in,ddgvtmkol-dot@nic.in,ddgadmn.wb-dot@gov.in,diradmn.wb-dgt-dot@gov.in,dir2.cmskol-dot@gov.in,ddga.wb-dgt-dot@gov.in,jtot.wb-dgt-dot@gov.in,daca@trai.gov.in,adcafbp.cad.kolc-wb@nic.in?subject=",encodeURIComponent(subject),"&body=",encodeURIComponent(body_concat));
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
						document.getElementById("afterGenerateWarning").innerHTML="WARNING: The username is not a valid Alliance Broadband username. The email content has been generated, but please recheck the username. Contact us if you think this is an error.";
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

function copyShareMessage(e){
	e.preventDefault();
    var dummy = document.createElement("textarea");
    //dummy.style.display = 'none'
    document.body.appendChild(dummy);
    dummy.value = "Did you get your broadband package validity extension for Amphan? If not, maybe lodge a grievance on PG portal against Alliance Broadband. It will only take a few minutes. Please visit https://ghosh.email/petition";
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
	document.getElementById("copied").classList.remove("fadeOut");
	document.getElementById("copied").innerHTML="(Copied!)";
	var el = document.getElementById('copied');
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null;
	document.getElementById("copied").classList.add("fadeOut");
	return false;
}

function resetErrors(){
	var i;
	var elmErrArr = document.getElementById("basicinfo").getElementsByClassName("is-error");
	for(i=0;i<elmErrArr.length;i++){
		elmErrArr[i].innerHTML="";
	}
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
		active: false
	});
	$( "#accordion3" ).accordion({
		collapsible: false,
		heightStyle: "content",
		active: 0
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