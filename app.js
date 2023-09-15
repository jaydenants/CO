const express= require('express');
const fs =require('fs');
const app = express();
const bodyparser =  require('body-parser')
const port = 3000
const datajson = require('./data/contacts.json')

// app.use(express.json("./public/images"))
app.use(bodyparser.urlencoded({ extended:false }));

app.use(express.static("./public"));
app.set('views','./views');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index',{contacts})
});

let contacts = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'))

app.get('/add',(req,res)=>{
    res.render('add',{datajson})
});
app.post('/add',(req,res)=>{
    const newcont = req.body;
    contacts.push(newcont)
    fs.writeFileSync('./data/contacts.json',JSON.stringify(contacts));
    res.redirect('/')
})

app.get('/edit/:id',(req,res)=>{
    let id= req.params.id;
    const contact = contacts[id];
    res.render('edit',{id,contact});
});

app.post('/edit/:id',(req,res)=>{
    let id = req.params.id;
    contacts[id] = req.body;
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});
app.get('/view/:id',(req,res)=>{
    let id = req.params.id;
    const contact = contacts[id];
    res.render('view',{contact})
})
app.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    contacts.splice(id,1);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/')
})


app.listen(port,()=>{
    console.log("server is running")
});