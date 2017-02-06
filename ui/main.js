var button = document.getElementById('counter');
var counter=0;


button.onclick= function (){
    
    
        var request = new XMLHttpRequest();
        
        request.onreadystatechange=function(){
            if (request.readyState==XMLHttpRequest.DONE){
                if (request.status==200){
                var counter = req.responseText;
                counter=counter+1;
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();
             }
            }
        };
        
        request.open('GET', 'http://rbhattacharya2001.imad.hasura-app.io/counter', true);
        request.send(null);
};
    
    