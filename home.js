var firebase = app_firebase;
function home(){
    document.getElementById("statusbox").innerHTML = "";
    document.getElementById("home").innerHTML = 
    '<section id="innerhome"><h1>Yolo!</h1><h2>ALUMNI UPDATE</h2><p>The portal is finally here.<br> <br>Don\'t make mistakes while entering and logging data. <b>Change you Google/Github Profile picture and then sign-in again</b> before applying.One person from every year has an option to verify batchmates.Preferrably Team Heads.Those with special privileges, please approve on ensuring the active duration. <br>Contact me (Kishor Ingale) incase of problems.Please don\'t try to test this system. It is not for robust use.Peace.<br><br>PS:If possible, please do visit the Workshop. We would love to have our Alumni in the workshop sometimes and not just on the website. </p></section>';
    document.getElementById("form").style.visibility = "hidden";console.log(document.getElementById("approval"));
    if(document.getElementById("approvaltable")){document.getElementById("approvaltable").style.visibility="hidden";}
    var i;
    for(i=0;i<50;i++){
        if(document.getElementById("tr"+i)){document.getElementById("tr"+i).remove();}
    }
         
}