var express = require('express'); //import the express package and store it in a variable called 'express'
var path = require('path');
var fs = require('fs'); // files system module to read or write from external file (database)
//var searchresults = require('views/searchresults.ejs');

var app = express(); // the variable 'app' is the server

// view engine setup
app.set('views', path.join(__dirname, 'views')); //anounce that 'views' ( = html files) are in the project directory/views
app.set('view engine', 'ejs'); //understand th embedded js within the html files

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //anounce the static files' directory

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/', function(req,res){

  res.render('login',{title:strlog})
  strlog='';

});

var currentpage = "";

var str3= "";
app.get('/dune', function(req,res){
  res.render('dune',{title10:str3})
  currentpage = "Dune";
  str3= "";

});

app.get('/fiction', function(req,res){
  res.render('fiction')
});

var str4 = "";
app.get('/flies', function(req,res){
  res.render('flies',{title10: str4});
  currentpage = "Lord of the flies";
  str4 = "";
});

var str5 = "";
app.get('/grapes', function(req,res){
  res.render('grapes',{title10: str5});
  currentpage = "The grapes of wrath";
  str5 = "";
});

app.get('/home', function(req,res){
  res.render('home')
});

var str6 = "";
app.get('/leaves', function(req,res){
  res.render('leaves',{title10:str6});
  currentpage = "Leaves of grass";
  str6 = "";
});



var str7 = "";
app.get('/mockingbird', function(req,res){
  res.render('mockingbird',{title10: str7});
  currentpage = "To kill a mockingbird";
  //console.log(currentuser);
  //console.log(currentpage);
  str7 = "";
  
});

app.get('/novel', function(req,res){
  res.render('novel')
});

app.get('/poetry', function(req,res){
  res.render('poetry')
});

var a = "";
var b = "";
var c = "";
var d = "";
var e = "";
var f = "";
var newsplit = "";
app.get('/readlist', function(req,res){

  a = "";
  b = "";
  c = "";
  d = "";
  e = "";
  f = "";
  var tmp2 = fs.readFileSync("readlist.json");
  var readlists2 = JSON.parse(tmp2);
  for(i = 0; i<readlists2.length ; i++){
    if(readlists2[i].username == req.session.user){
      //console.log(currentuser);
      var stringreadlist2 = JSON.stringify(readlists2[i].list);
      newsplit = stringreadlist2.substring(1,stringreadlist2.length-1);
      var splitted2 = newsplit.split(',');
 
      for (j=0; j<splitted2.length; j++){

        var tmp1 = splitted2[j].substring(1,splitted2[j].length-1);
        if(tmp1 === "To kill a mockingbird"){
          a = "To kill a mockingbird";
      }
  
      if(tmp1 === "The sun and her flowers"){
        b =  "The sun and her flowers";
    }
    if(tmp1 === "Lord of the flies"){
      c = "Lord of the flies";
  }
  if(tmp1=== "The grapes of wrath"){
   d = "The grapes of wrath";
}
if(tmp1==="Dune"){
 e = "Dune";
}
if(tmp1=== "Leaves of grass"){
 f = "Leaves of grass";
}
}
  res.render('readlist', {t:{title1:a,title2:e,title3:c,title4:b,title5:f,title6:d}});
}
}
a = "";
b = "";
c = "";
d = "";
e = "";
f = "";

//req.session.user = req.body.username;
});






app.get('/registration', function(req,res){
  res.render('registration',{title: str})
  str = '';
});

app.get('/searchresults', function(req,res){
  res.render('searchresults')
  //notfound = '';
});

var str2 = "";
app.get('/sun', function(req,res){
  res.render('sun',{title10: str2})
  currentpage = "The sun and her flowers";
 str2 = "";
});


var notfound = '';
var found = [];
//var flag2 = false;
var library = fs.readFileSync("books.json");
var books = JSON.parse(library);
app.post('/search', function(req,res){

//console.log("da5alna post");

  var a = "";
  var b = "";
  var c = "";
  var d = "";
  var e = "";
  var f = "";
  
  found = [];
  var search = req.body.Search;


  for(i=0; i<books.length; i++){
    var b22 = books[i].toUpperCase();
    //console.log(b22);
    var c22 = search.toUpperCase();
   //console.log(c22);
    if(b22.includes(c22) && !found.includes(b22)){
      found.push(books[i]);
    }
    }
    if(found.length == 0){
     notfound = "Book Not Found"
  
    }

    for (j=0; j<found.length && search != ""; j++){

      var tmp1 = found[j];
      //console.log("fel loop");
      //console.log(tmp1.toLowerCase());
      //console.log("To kill a mockingbird".toLowerCase());

   // console.log(tmp1.toLowerCase() === "To kill a mockingbird".toLowerCase());
      if(tmp1.toLowerCase() === "To kill a mockingbird".toLowerCase()){
        a = "To kill a mockingbird";
     //   console.log("fel if");
    }
  
    if(tmp1.toUpperCase() === "The sun and her flowers".toUpperCase()){
      b =  "The sun and her flowers";
  }
  if(tmp1.toUpperCase() === "Lord of the flies".toUpperCase()){
  //  console.log("Lord of the flies".toUpperCase());
   // console.log(tmp1.toUpperCase());
    //console.log(tmp1.toUpperCase() === "Lord of the flies".toUpperCase());
    
    c = "Lord of the flies";
  }
  if(tmp1.toUpperCase()=== "The grapes of wrath".toUpperCase()){
  d = "The grapes of wrath";
  }
  if(tmp1.toUpperCase()==="Dune".toUpperCase()){
  e = "Dune";
  }
  if(tmp1.toUpperCase()=== "Leaves of grass".toUpperCase()){
  f = "Leaves of grass";
  }
  }

//console.log(notfound);
  res.render('searchresults', {t:{title1:a,title2:e,title3:c,title4:b,title5:f,title6:d,title10:notfound}});
  
  //console.log(notfound);
notfound = "";
//console.log("gedida",notfound);
  a = "";
   b = "";
   c = "";
   d = "";
   e = "";
   f = "";

  
  }

);


var flag9 = false;
app.post('/sun', function(req,res){
 
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
    if(flag9 == false && readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
      fs.writeFileSync("readlist.json",stringreadlist);
      flag9 = true;

    }
}

if(!flag9){
  str2 = "Book already added";
 // console.log("fel else");

}
flag9 = false;
return res.redirect("/sun");
});

var flag6 = false;
app.post('/leaves', function(req,res){
 
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
    if(readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
     fs.writeFileSync("readlist.json",stringreadlist);
     flag6 = true;
    }

  
}

if(!flag6){
  str6 = "Book already added";
//  console.log("fel else");

  
}
flag6 = false;
return res.redirect("/leaves");

});
var flag5 = false; 
app.post('/grapes', function(req,res){
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
   // console.log(readlists[i].username);
    //console.log("currentuser", currentuser);
    //console.log(readlists[i].list);
    //console.log(currentpage);

    if(readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      //console.log("fel if");
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
     fs.writeFileSync("readlist.json",stringreadlist);
     flag5 = true;
    }
  }

  if(!flag5){
    str5 = "Book already added";
  //  console.log("fel else");
    
  }
  flag5 = false;
  return res.redirect("/grapes");
    
  

});

var flag4 = false;
app.post('/flies', function(req,res){
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
    if(readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
     fs.writeFileSync("readlist.json",stringreadlist);
     flag4 = true;
  
    }
  
  
  
  
}
if(!flag4){
  str4 = "Book already added";
 // console.log("fel else");
  //return res.redirect("/flies");
  //console.log(req.session.user);
}
flag4 = false;
return res.redirect("/flies");


});



flag3 = false;
app.post('/dune', function(req,res){
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
    if(readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
     fs.writeFileSync("readlist.json",stringreadlist);
     flag3 = true;
    }
  
}

if(!flag3){
  str3 = "Book already added";
 // console.log("fel else");
  
  
}

flag3 = false;
return res.redirect("/dune");
});

var flag7 = false;
app.post('/mockingbird', function(req,res){
  var tmp = fs.readFileSync("readlist.json");
  var readlists = JSON.parse(tmp);

  for(i = 0; i<readlists.length ; i++){
    if(readlists[i].username == req.session.user &&  !readlists[i].list.includes(currentpage)){
      readlists[i].list.push(currentpage);
      var stringreadlist = JSON.stringify(readlists);
     fs.writeFileSync("readlist.json",stringreadlist);
     flag7 = true;
    }
}

if(!flag7){
  str7 = "Book already added";
  //console.log("fel else");
  
  
}
flag7 = false;
return res.redirect("/mockingbird");


});




//var users = [];

var str = '';
//var readlists = [];
app.post('/register', function(req,res){
  
var tmp = fs.readFileSync("readlist.json");
var readlists = JSON.parse(tmp);
var data = fs.readFileSync("users.json");
var users = JSON.parse(data);

  var user = {username: req.body.username,password: req.body.password};
  
  var data = fs.readFileSync("users.json");
  var z = JSON.parse(data);
  var flag = false; //el user mesh mawgoud
  for(i=0; i<z.length; i++){
    if(user.username == z[i].username){
      flag = true; // el user mawgoud
      }


  };

  if (flag){
    //console.log('Username already exists');
    str = 'Username already exists';
    return res.redirect("/registration");
    
  }
    else{
      users.push(user);
      //currentuser = user.username;
      req.session.user = req.body.username;
      readlists.push({username: user.username,list:[]});

     // console.log('el array',readlists);

      var stringreadlists = JSON.stringify(readlists);
    //  console.log(stringreadlists);
      fs.writeFileSync("readlist.json", stringreadlists);
      
      var stringusers = JSON.stringify(users);
      //console.log(stringusers);
      fs.writeFileSync("users.json", stringusers);
      return res.redirect("/home");
      
    };
});

//var currentuser = "";
var strlog='';
app.post('/', function(req,res){
  var loggeduser = {username: req.body.username,password: req.body.password};
  var data = fs.readFileSync("users.json");
  var z = JSON.parse(data);
  var flag = false; //el user mesh mawgoud
  for(i=0; i<z.length; i++){
    if(loggeduser.username == z[i].username && loggeduser.password == z[i].password){
      flag = true; // el user mawgoud
      //currentuser = loggeduser.username
      req.session.user = req.body.username;
      //console.log('gowa post login',currentuser);
      return res.redirect("/home");
      }
  };


  if (!flag){
    //console.log('You are not registered');
    //alert('a');
    strlog='Invalid username or password';
    return res.redirect("/");
  };
});

//console.log("username barra login",username);

//console.log("str2",str2);
//app.listen(3000);
if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log("server started")});
}
else{
app.listen(3000,function(){console.log("Server started on 3000")});
}
