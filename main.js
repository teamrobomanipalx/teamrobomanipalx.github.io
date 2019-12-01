var mainapp = {};
(function(){
  
    var firebase = app_firebase;
    var uid= null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          writeUserData(user.uid,user.displayName,user.email,user.photoURL);
          uid = user.uid;
          const username = user.displayName;
          const photo = user.photoURL;
          document.getElementById('username').innerHTML = username;
          document.getElementById('profilepic').setAttribute('src',photo);
          teamhead(uid);

        }
        else{
            uid = null;
            window.location.replace('index.html');
        }
      });

      function logOut(){
          firebase.auth().signOut();
      }
  mainapp.logOut = logOut;
      
})()
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
  });
  
}
function teamhead(uid){

  var verifiedRef = firebase.database().ref('teamheads/'+ uid);
  console.log(verifiedRef);
  verifiedRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val()) {

      document.getElementById("teamheads").style.visibility = "visible";
    }
  });
  
}