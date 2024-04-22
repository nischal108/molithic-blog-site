const express = require('express');
const { blogs, tasks } = require('./model/index'); // Import both blogs and tasks models
const app = express();
require("./model/index");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const data = { name: "Nischal" }
    res.render('home', { data })
});

app.get("/blog", (req, res) => {
    res.render('blog')
});

app.get("/blog/create", (req, res) => {
    res.render("createblog")
});

app.get("/blog/edit", (req, res) => {
    res.render('editblog')
});

app.post("/blog", async (req, res) => {
    const { title, subtitle, description } = req.body;
    await blogs.create({
        title: title,
        subTitle: subtitle,
        description: description
    });
    res.redirect('/');
});

//todo app
app.get('/todo', async (req, res) => {
    const allTasks = await tasks.findAll();
    res.render('todo', { todos: allTasks });
});

app.post('/todo/add', async (req, res) => {
    const { title, status, description } = req.body;
    await tasks.create({
        title: title,
        status: status,
        description: description
    });
    res.redirect('/todo');
});

app.post('/todo/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await tasks.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/todo');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Error deleting task');
    }
});


app.listen(3000, () => {
    console.log("Server has started at port 3000")
});
