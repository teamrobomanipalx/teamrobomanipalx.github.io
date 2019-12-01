var firebase = app_firebase;
function register(){
    document.getElementById("form").style.visibility = "visible";
    document.getElementById("statusbox").innerHTML = "You don't have access";
    document.getElementById("form").style.visibility = "hidden";
    if(document.getElementById("approvaltable")){document.getElementById("approvaltable").style.visibility="hidden";}
    if(document.getElementById("innerhome")){document.getElementById("innerhome").remove();}
    for(i=0;i<50;i++){
        if(document.getElementById("tr"+i)){document.getElementById("tr"+i).remove();}
    }
}