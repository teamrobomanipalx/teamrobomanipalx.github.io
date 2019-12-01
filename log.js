var firebase = app_firebase;
function log(){
    document.getElementById("statusbox").innerHTML = "You don't have access";
    document.getElementById("form").style.visibility = "hidden";
    
    if(document.getElementById("approvaltable")){document.getElementById("approvaltable").remove();}
    if(document.getElementById("innerhome")){document.getElementById("innerhome").remove();}

}