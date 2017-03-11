/*-var button = document.getElementById('counter');
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
*/

     
   
        var submit= document.getElementById('submit_btn');
        submit.onclick=function(){
        
       
       
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username) ;
        console.log(password);
        var request = new XMLHttpRequest();
        
        request.onreadystatechange=function(){
            if (request.readyState==XMLHttpRequest.DONE){
                  
                if (request.status===200){
                    
                    console.log('user logged in');
                    alert('Logged in successfully');
                }else(request.status===403){
                    alert('username and password incorrect');
                }else(request.status===403){
                 alert('username and password incorrect');
                    
                }
                
                    
                     /*var names =request.responseText;
                     names=JSON.parse(names);
                     var list='';
                     for (var i=0;i<names.length;i++){
                            list+='<li>'+names[i]+'</li>';
          
                         }//for
                      
                        var ul=document.getElementById('namelist') ;
                         ul.innerHTML=list;*/
                 } //request status
            }  // 200
       
          };  
        
       request.open('POST', 'http://rbhattacharya2001.imad.hasura-app.io/login' , true);
        // request.open('GET', 'http://localhost:8080/submit-name?name=' +name, true);
        request.send(JSON.stringyfy({username:username, password:password})); 
        
    };




       