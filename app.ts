const express = require('express');
const app = express();

const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//asincrona
app.post('/login', async (req, res)=>{
    //datos que vamos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;
    //comprovamos si son correctos
    if (user == 'admin' && password == '12345') {
        // await indica que es asincronica
            let passwordHash = await bcryptjs.hash(password, 8); //cuantas más interacciones haya mas lemta se la autentificacion=> más segura  
            res.json({        
            message:'Autentificacion exitosa',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message:'Autentificacion erronea ingres bien user y contraseña'
        });
    }
});

//sincrona
/*app.post('/login', (req, res)=>{
    //datos que vamos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;
    //comprovamos si son correctos
    if (user == 'admin' && password == '12345') {
        // await indica que es asincronica
            let passwordHash = bcryptjs.hashSync(password, 8); //cuantas más interacciones/saltos haya mas lemta se la autentificacion=> más segura  
            res.json({        
            message:'Autentificacion exitosa',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message:'Autentificacion erronea ingres bien user y contraseña'
        });
    }
});*/

//comparacion sincrona
app.get('/compare', (req, res)=>{
    let hashSaved = '$2a$08$gnJw5WvkhUFnJf6zm6NNCuoeQHpU7tqaJNcIP9eeQreB4/xdf2vAq'; //numero hash que genero en la funcion anterior y se vio en posman
    let compare = bcryptjs.compareSync('12345, hashSaved');
    if (compare) {
        res.json('ok');
    }else{
        res.json('no son iguales');
    }
})

app.listen(3000, ()=>{ //comando node app.ts
    console.log('server up!')
})