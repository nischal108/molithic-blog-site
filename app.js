
const express = require('express')
const { Model } = require('sequelize')
const { blogs } = require('./model/index')
const app = express()
require("./model/index")

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    const data = {name : "Nischal"}
    res.render('home',{data})
})

app.get("/blog",(req,res)=>{
    res.render('blog')
})

app.get("/blog/create",(req,res)=>{
    res.render("createblog")
})

app.get("/blog/edit",(req,res)=>{
    res.render('editblog')
})

app.post("/blog",async (req,res)=>{
    const{title, subtitle, description}=req.body;
    await blogs.create({
        title:title,
        subTitle:subtitle,
        description:description
    })
    res.redirect('/')
})


//todo app
let todos = [];
app.get('/todo', (req, res) => {
    res.render('todo', { todos });
});

app.post('/todo/add', (req, res) => {
    const { title, status, description } = req.body;
    todos.push({ title, status, description });
    res.redirect('/todo');
});

app.post('/todo/delete/:index', (req, res) => {
    const index = req.params.index;
    // console.log(index);
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
    }
    res.redirect('/todo');
});






app.listen(3000,()=>{
    console.log("Server has started at port 3000")
})