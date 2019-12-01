var form  = {};
(function(){
    var firebase = app_firebase;
(function dropdownupdate() {
    
    var teamheadarray=[];
    var x = firebase.database().ref("teamheads").orderByKey();
    x.once("value") .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            teamheadarray.push(childData.username);
        });
        var i;
        var bigDOM;
        var smallDOM;
        for (i=0;i<teamheadarray.length;i++)
        {
        var smallDOM = '<option value="'+teamheadarray[i]+'">'+teamheadarray[i]+'</option> ';
        var bigDOM = bigDOM + smallDOM;
        }
        document.getElementById("mySelect").innerHTML = bigDOM; 
       
    });
  
 
})()

})()
function submit(){
    var linkedinurl = document.getElementById("linkedinurl").value;
    var yearsactive = document.getElementById("yearsactive").value;
    var verifier = document.getElementById("mySelect").value;
    var user = firebase.auth().currentUser;
        firebase.database().ref('verify/' + user.uid).set({
            linkedinurl:linkedinurl,
            yearsactive: yearsactive,
            alumniapplied: 1,
            alumniverified : 0,
            username: user.displayName,
            verifier: verifier
          });

        document.getElementById("form").style.visibility = "hidden";
        document.getElementById("statusbox").innerHTML = "Relax! Applied.";
        
      
}
function apply(){
    for(i=0;i<50;i++){
        if(document.getElementById("tr"+i)){document.getElementById("tr"+i).remove();}
    }
    if(document.getElementById("innerhome")){document.getElementById("innerhome").remove();}
    if(document.getElementById("approvaltable")){document.getElementById("approvaltable").style.visibility="hidden";}
    document.getElementById("statusbox").innerHTML = "";
    var userId = firebase.auth().currentUser;
    var applicationstatus;
    var verifiedRef = firebase.database().ref('verify/' + userId.uid);
    verifiedRef.on('value', function(snapshot) {
        applicationstatus = snapshot.val();
      if (applicationstatus) {
        if (applicationstatus.alumniapplied=='0') {
        document.getElementById("form").style.visibility = "visible";
      }else{
          document.getElementById("statusbox").innerHTML = "you've already applied/approved";
      }
    }
    else{
        document.getElementById("form").style.visibility = "visible";

    }
    });
   
  // ...
}
function approve(){

    console.log(document.getElementById("innerhome"));
    if(document.getElementById("innerhome")){document.getElementById("innerhome").remove();}
    document.getElementById("form").style.visibility = "hidden";
    document.getElementById("statusbox").innerHTML = "";
    document.getElementById("approvaltable").style.visibility = "visible";
    user = firebase.auth().currentUser;
    
    var smallDOM;
    var bigDOM = '<tr><th>Name</th><th>Active Years</th><th>Action</th><th>Action</th></tr>';
    var verifiedRef = firebase.database().ref('verify/');
    verifiedRef.once('value', function(snapshot) {
        pending = snapshot.val();
        var i;
        console.log(pending);
        if(!isPending(pending)){
            
            document.getElementById("statusbox").innerHTML = "No pending request"; 
        }else{
        for(i=0;i<Object.keys(pending).length;i++){
         
            if(Object.values(pending)[i].verifier==user.displayName && Object.values(pending)[i].alumniverified==0){
            smallDOM='<tr id = "tr'+i+'" style="visibility:visible"><td>'+Object.values(pending)[i].username+'</td><td>'+Object.values(pending)[i].yearsactive+'</td><td><button onclick="elementapprove('+i+',\''+ Object.keys(pending)[i]+'\')">Approve</button></td><td><button onclick="elementdelete('+i+',\''+ Object.keys(pending)[i]+'\')">Don\'t Approve</button></td></tr>'
            bigDOM = bigDOM+smallDOM;
            
            }
           

        }
        
        console.log(document.getElementById("approvaltable"));
        document.getElementById("approvaltable").innerHTML = bigDOM;}
       
      
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

