var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var bodyParser=require('body-parser');

var Pool=require('pg').Pool;

var config = {
    
    user:'rbhattacharya2001',
    database:'rbhattacharya2001',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles={
      'article-one':{ 
    title:'Article1',
    heading:'article 1',
    date:'3 feb 2017',

    content:`
     <p>
           content goes here.   content goes here.  content goes here.
    </p>
       <p>
           content goes here.   content goes here.  content goes here.
        </p>`},
      'article-Two':{},
      'article-Three':{}
    };

function createTemplate(data){
    var title = data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate =`
            <html>
                <head>
                    <title>
                       ${title}
                    </title>
                    <meta name = "viewport" content="width=device-width, initial-scale=1">
                   
                    <link href="/ui/style.css" rel="stylesheet" />   
                        
            
                </head>
                <body>
                    <div class="container">
                    <div>
                        <a href="/" > home </a>
                        
                    </div>
                        <hr/>
                        
                    
                        <h3>
                               ${heading}
                        </h3>
                        
                        <div>
                            ${date.toDateString()}
                        </div>
                   
                   
         https://cloud.imad.hasura.io/code/files/server.js          <div > 
                    ${content}
                   </div>
                  </div>
                </body>
            </html>
`;
    
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/hash/:input', function (req, res){
    
    var hashedString =hash (req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});


app.post('/create-user',function (req, res){
    
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    res.contentType('application/json');
    var dbString=hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username,dbString], function(err, result){
      if (err){
            res.status(500).send(err.toString());
        }else
        {
            res.send('user created ' +username);
        
         }  
    });
});


app.post('/login',function (req, res){
    
    var username=req.body.username;
    var password=req.body.password;
    
    var myres="cred inc";
     var oMyOBject = {"message":myres};
     res.contentType('application/json');
    pool.query('SElect * from "user" WHERE username = $1' , [username], function (err, result){
      if (err){
            res.status(500).send(err.toString());
        }else
        {
            if (result.rows.length===0){
                 myres="username/password is imvalid";
               // res.send(403).send(myres);
               
               
               
               
                 oMyOBject = {"message":myres};
                res.send(JSON.stringify(oMyOBject));
            }
            else{
                
                var dbString =result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                
                if (hashedPassword===dbString){
                    myres="credentials correct";
                //res.send(myres);
                    oMyOBject = {"message":myres};
                res.send(JSON.stringify(oMyOBject));
                
                }
                else
                {
                   // res.send(403).send(myres);
                   
                      res.send(JSON.stringify(oMyOBject));
                }
            }
        
         }  
    });
});




function hash(input,salt){
    
    var hashed=crypto.pbkdf2Sync(input,salt, 10000,512,'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


var pool =new Pool(config);

app.get('/test-db',function(req, res) {
    console.log(`Inside test-db`);
    
    pool.query('SELECT * FROM test',function(err, result){
        
        if (err){
            res.status(500).send(err.toString());
        }else
        {
            res.send(JSON.stringify(result.rows));
        
         }
    });
});

var names=[];
app.get('/submit-name', function(req, res){
  
    var name =req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
    
});

var comments=[];
app.get('/submit-comment', function(req, res){
  console.log(`submit come!`);
    var comment =req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
    
    
});


var counter=0;
app.get('/counter',function(req, res) {
    
    counter=counter+1;
    res.send(counter.toString());
});




app.get('/article-two',function(req, res) {
 
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});


app.get('/articles/:articleName', function (req, res) {
    
  // var articleName = req.params.articleName;
   pool.query("SELECT * FROM article WHERE title= $1" ,[req.params.articleName], function(err, result){
       if (err){
           res.status(500).send(err.toString());
       }else{
            if (result.rows.length===0){
                res.status(404).send('Artivle not found');
            }else{
                var arrArticleData=[];
                var articleData =result.rows[0];
                var tem={"id": articleData.id, 
                "title": articleData.title, 
                "heading":articleData.heading,
                "date":articleData.date,
                "content": articleData.content};
                
                arrArticleData.push(articleData);
                
                res.send(JSON.stringify(arrArticleData));
          }
         }
}); 
});//selet



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
