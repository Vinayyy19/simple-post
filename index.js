const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({extended:true}));
const path = require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));

let posts = [{
    id:uuidv4(),
    username:"anuja",
    content:"I love Coding"
},{
    id:uuidv4(),
    username:"anuj",
    content:"I love Coding too"
},{
    id:uuidv4(),
    username:"anushaka",
    content:"me too"
},{
    id:uuidv4(),
    username:"anu",
    content:"I also"
}];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username , content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newContent;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});
app.listen(port , () =>{
    console.log(`server listening on port ${port}`);
});
