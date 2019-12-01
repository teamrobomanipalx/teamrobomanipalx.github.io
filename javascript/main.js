(function(){
    var firebase = app_firebase;
    var alumniarray=[];
    var x = firebase.database().ref("verifiedalumni").orderByKey();
    console.log(x);
    x.once("value") .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            console.log(key);
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            console.log(childData);
            alumniarray.push(childData);
            console.log(alumniarray);
        });

        var i;
        var bigDOM= '<div class="row">';
        var smallDOM;
        for (i=0;i<alumniarray.length;i++)
        {
            console.log(Object.values(alumniarray[i]).name);



        var smallDOM = '<div class="col-md-3 col-sm-6 col-xs-12 ">'+
                '<div class="row section-success ourTeam-box text-center">'+
                    '<div class="col-md-12 section-gear gear">'+
          '<img class="section1" src="'+Object.values(alumniarray)[i].img+'" style="height:200px;width:200px;border-radius: 50%;">'+
          '</div>'+
                    '<div class="col-xs-12 section2">'+
            '<p>'+Object.values(alumniarray)[i].name+'</p><br>'+
            '<h1>'+Object.values(alumniarray)[i].yearsactive+'</h1><br></div>'+
                    '<div class="col-xs-12 section4">'+
            
            '<a href="'+Object.values(alumniarray)[i].linkedinurl+'"><i class="fa fa-linkedin" aria-hidden="true"></i></a>'+
          '</div>'+
        '</div>'+
      '</div> ';
        var bigDOM = bigDOM + smallDOM;
        }
        bigDOM = bigDOM+'</div>'
        console.log(bigDOM);
        document.getElementById("alumnistart").innerHTML = bigDOM; 
       
    
});
})()