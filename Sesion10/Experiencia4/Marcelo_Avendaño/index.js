var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send('Hola mundo desde express');
})

app.get('/login',function(req,res){
    res.send('Aqui se mostrara la pagina del login');
})

app.listen(3002,function(){
    console.log("La aplicacion esta funcionando en el puerto 3002");
})