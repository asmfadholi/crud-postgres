const express = require('express');
const cors = require('cors');
const pool = require('./db')

const app = express();

app.use(cors());
app.use(express.json())

app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body
        const today = new Date();
        var date = today.getFullYear()+'-'+(((today.getMonth()+1) < 10 ? ('0'+ (today.getMonth()+1)) : today.getMonth()+1))+'-'+(today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate());
        var time = (today.getHours() < 10 ? '0'+ today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+ today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+ today.getSeconds() : today.getSeconds() );
        var created_date = date+' '+time;
        console.log(created_date, 'data')
        const newTodo = await pool.query("INSERT INTO todo (description, created_date, updated_date) VALUES($1, $2, $2) RETURNING *", [description, created_date])
        res.json(newTodo.rows[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM todo ORDER BY updated_date DESC")
        res.json(newTodo.rows)
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.get('/test', async (req, res) => {
    try {
        res.json({ success: true })
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const today = new Date();
        var date = today.getFullYear()+'-'+(((today.getMonth()+1) < 10 ? ('0'+ (today.getMonth()+1)) : today.getMonth()+1))+'-'+(today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate());
        var time = (today.getHours() < 10 ? '0'+ today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+ today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+ today.getSeconds() : today.getSeconds() );
        var updated_date = date+' '+time;
        
        const todo = await pool.query("UPDATE todo SET (description, updated_date) = ($1, $2) WHERE todo_id = $3 RETURNING *", [description, updated_date, id])
        res.json(todo.rows[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.delete('/todos/:id', async (req, res) => {

    try {
        const {id} = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id])
        res.json(todo.rows[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.listen(5000, () => {
    console.log('Server running...'+5000)
})