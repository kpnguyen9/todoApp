const pgp = require("pg-promise")();
const db = pgp("postgres://mivzrlil:GfanRMon-Zm1uDF2qFHsJoKpXz_Wp5Ey@salt.db.elephantsql.com/mivzrlil")

const express = require('express');
const app = express();
const port = 3000;

// Method 	Endpoint 	                Description
// POST   	/tasks 	                  Creates a new task
// GET 	    /tasks 	                  Reads all of the tasks
// PATCH  	/tasks/:id/is_completed 	Updates if the task is completed
// PATCH   	/tasks/:id/title        	Updates the task's title
// DELETE 	/tasks/:id 	              Deletes a task

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/tasks", (req,res)=>{
    console.log("GET /tasks")
    db.any("SELECT * FROM tasks")
      .then(tasks => res.send(tasks));
})

app.post("/tasks", (req, res)=>{
    console.log("post /tasks");
    const newTaskTitle = req.body.title;
    db.any(`INSERT INTO tasks (title) VALUES ('${newTaskTitle}')`)
    res.status(200)
      .send("new task created" + newTaskTitle);
})

app.patch("/tasks/:id/is_completed", (req, res)=>{
    console.log("PATCH tasks/:id/is_completed");
    const taskID = req.params.id;
    // console.log(taskID);
    db.none(`UPDATE tasks SET is_completed = true WHERE id=${taskID}`)
    res.status(200)
        .send("completion status changed for ID: " + taskID)
})

app.patch("/tasks/:id/title", (req, res)=>{
    console.log("PATCH /tasks/:id/title");
    const taskID = req.params.id;
    const newTaskTitle = req.body.title
    // console.log(newTaskTitle)
    // console.log ("Task title id:" + taskID);
    db.none(`UPDATE tasks SET title = '${newTaskTitle}' where id=${taskID}`)
    res.status(200)
        .send(`changed id ${taskID} to new title: ${newTaskTitle}`)
})

app.delete("/tasks/:id", (req, res)=>{
    res.send("delete tasks")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})