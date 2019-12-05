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
function register(){

    console.log(document.getElementById("innerhome"));
    if(document.getElementById("innerhome")){document.getElementById("innerhome").remove();}
    document.getElementById("form").style.visibility = "hidden";
    document.getElementById("statusbox").innerHTML = "";
    document.getElementById("registertable").style.visibility = "visible";
    user = firebase.auth().currentUser;
    
    var smallDOM;
    var bigDOM = '<tr><th>Borrower</th><th>Team</th><th>Item</th><th>Lent By</th><th>Action</th><th>Action</th></tr>';
    var verifiedRef = firebase.database().ref('register/');
    verifiedRef.once('value', function(snapshot) {
        pending = snapshot.val();
        var i;
        console.log(pending);
        if(isPending(pending)){
            console.log("inif");
            document.getElementById("statusbox").innerHTML = "No pending request"; 
        }else{
        for(i=0;i<Object.keys(pending).length;i++){
         
            if(Object.values(pending)[i].verifier==user.displayName && Object.values(pending)[i].alumniverified==0){
            smallDOM='<tr id = "tr'+i+'" style="visibility:visible"><td>'+Object.values(pending)[i].username+'</td><td>'+Object.values(pending)[i].yearsactive+'</td><td><button onclick="elementapprove('+i+',\''+ Object.keys(pending)[i]+'\')">Approve</button></td><td><button onclick="elementdelete('+i+',\''+ Object.keys(pending)[i]+'\')">Don\'t Approve</button></td></tr>'
            bigDOM = bigDOM+smallDOM;
            console.log(bigDOM);
            }
           

        }
        
        console.log(document.getElementById("registertable"));
        document.getElementById("registertable").innerHTML = bigDOM;}
       
      
    });

    
      
}
function elementapprove(rowno,uid){
    document.getElementById("tr"+rowno).remove();

    firebase.database().ref('verify/'+uid+'/alumniverified').set(1);
    var userobj;
    var verifobj;
    var verifiedRef = firebase.database().ref('verify/' +uid);
    verifiedRef.on('value', function(snapshot) {
        verifobj = snapshot.val();
      
        var userRef = firebase.database().ref('users/' +uid);
    userRef.on('value', function(snapshot) {
        userobj = snapshot.val();
        writeverifiedData(uid,userobj.username,verifobj.linkedinurl,verifobj.yearsactive,userobj.profile_picture,userobj.email);
        
    
    });
    
    
      });
    


}
function elementdelete(rowno,uid){
    document.getElementById("tr"+rowno).remove();
    firebase.database().ref('verify/'+uid).remove();	
}
function writeverifiedData(uid,username,linkedin,yearsactive,profilepic,email){
    firebase.database().ref('verifiedalumni/' + uid).set({
        name: username,
        linkedinurl:linkedin,
        yearsactive: yearsactive,
        img: profilepic, 
        email: email
    
});
}	
function isPending(pending){
    for(i=0;i<Object.keys(pending).length;i++){
         
        if(Object.values(pending)[i].verifier==user.displayName && Object.values(pending)[i].alumniverified==0){
        return true;
        }
        else return false;
}
}
