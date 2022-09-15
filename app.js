const express = require("express");
const app= express();
const bodyparser = require("body-parser");
const request = require("request");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.post("/",function(req,res){

  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email= req.body.email;
  const https = require("https");

  var data = {members:
[
  {
  email_address: email,
  status: "subscribed",
  merge_fields: {
    FNAME:firstname,
    LNAME:lastname
  }
}
]
};

  const jsondata= JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/85800b7434"
  const options= {
    method:"POST",
    auth: "priyanshu:40564962b65da5cc207bcc8a40531d49-us18"
  }


  const request=https.request(url,options , function(response){

     if(response.statuscode === 200){
       res.sendFile(__dirname + "/success.html");
     } else {
       res.sendFile(__dirname + "/failure.html");
     }
     response.on("data",function(data)

{
    console.log(JSON.parse(data));
  })});

  request.write(jsondata);
  request.end();


  console.log(firstname ,lastname , email);

})

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html")
});

app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 2500 , function(){
console.log("server initiated on port 2600")});


// apikey
// 40564962b65da5cc207bcc8a40531d49-us18

// audienceid
// 85800b7434
