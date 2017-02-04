var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'article-One':{
    title: 'Article1',
    heading: 'article 1',
    date:'3 feb 2017',
    content:`
     <p>
           content goes here.   content goes here.  content goes here.
    </p>
       <p>
           content goes here.   content goes here.  content goes here.
        </p>`},
    'article-Two':{
    title: 'Article 2',
    heading: 'article 2',
    date:'3 feb 2017',
    content:`
     <p>
           content goes here.   content goes here.  content goes here.
    </p>
       <p>
           content goes here.   content goes here.  content goes here.
        </p>`},
    'article-Three':{
    title: 'Article3',
    heading: 'article 3',
    date:'3 feb 2017',
    content:`
     <p>
           content goes here.   content goes here.  content goes here.
    </p>
       <p>
           content goes here.   content goes here.  content goes here.
        </p>`}
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
                ${date}
            </div>
       
       
       <div > 
        ${content}
       </div>
      </div>
    </body>
</html>
`;
    
    return htmlTemplate
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
