var button = document.getElementById('counter');
var counter=0;


button.onclick= function (){
    
     console.log(`main on click `);
        var request = new XMLHttpRequest();
        
        request.onreadystatechange=function(){
            if (request.readyState==XMLHttpRequest.DONE){
                  console.log('req status ' +request.status );
                if (request.status==200){
                        var counter = request.responseText;
                        
                        var span = document.getElementById('count');
                        span.innerHTML=counter.toString();
             }
            }
        };
        
        request.open('GET', 'http://rbhattacharya2001.imad.hasura-app.io/counter', true);
        request.send(null);
};


     console.log('outside submit' );
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    var submit= document.getElementById('submit_btn');
    submit.onclick=function(){
        
         
        var names =['name1', 'name2', 'name3', 'name4'];
        var list='';
        for (var i=0;i<names.length;i++){
            list+='<li>'+names[i]+'</li>';
          
        }
       
        
       var ul=document.getElementById('namelist') ;
       ul.innerHTML=list;
    };  
        
        
