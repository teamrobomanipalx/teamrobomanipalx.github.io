var firebase = app_firebase;
function log(){
    document.getElementById("statusbox").innerHTML = "You don't have access";
    document.getElementById("form").style.visibility = "hidden";
    document.getElementById("approval").style.visibility = "hidden";
    document.getElementById("approvaltable").remove();

}