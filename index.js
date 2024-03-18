const express=require('express');
const app=express();
const path=require("path");//modeule of node
const methodOverride=require('method-override') //middleware for override method patch to post
const { v4: uuid } = require('uuid');
const mongoose = require("mongoose");
const Vlog = require('./models/Vlog');
//dummy array inspite of database
// let comments=[
//     {
//         // id:0,
//         id:uuid(),
//         username:'saransh',
//         comment:'hello from saransh'
//     },
//     {
//         // id:1,
//         id:uuid(),//return id tht is  string

//         username:'devansh',
//         comment:'hello from devansh'
//     },
//     {
//         // id:2,
//         id:uuid(),

//         username:'sara',
//         comment:'hello from sara'
//     },
//     {
//         // id:3,
//         id:uuid(),

//         username:'ansh',
//         comment:'hello from ansh'
//     }
// ]
mongoose.connect('mongodb://127.0.0.1:27017/restfull').then(()=>{console.log("Db connected successfully");}).catch((err)=>{
    console.log(err);
    console.log("errror");
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method')) ;//middleware for method override


// root
app.get('/',(req,res)=>{
    res.send('root mai hu abhi ')
});


//task 1--> to display all the blogs
app.get('/blogs',async (req,res)=>{
    let comments=await Vlog.find({});
    res.render('index',{comments});
        
})

// task 2-->show a form for adding a new blog
app.get('/blog/new', (req,res)=>{
    res.render('new');
})

//  task 3 --> to actually add blog in db
app.post('/blogs',async (req,res)=>{
    // console.log(req.body);
    let{username,comment}=req.body;
    // comments.push({username,comment,id:uuid()})
    await Vlog.create({username,comment});
    res.redirect('/blogs');//ye get request jaa rhi hai 
})

// task 4--> to show about 1 particular blog
app.get('/blogs/:id', async (req , res) => {
    let {id}=req.params;
    let foundComment=await Vlog.findById(id);
    // console.log(foundComment);
    // res.send("showwing")
    res.render('show',{foundComment});
})

// task 5--> to get form for edit a particular comment
app.get('/blogs/:id/edit',async (req,res)=>{
    let {id}=req.params;
    let foundComment=await Vlog.findById(id);
    res.render( 'edit' , {foundComment} ) ;
})

// task 6--> actually editting the blog using patch and not put
app.patch('/blogs/:id',async (req,res)=>{
    let {id}=req.params;

    // let foundComment=comments.find((comment)=> comment.id===id);
    let{comment}=req.body;
    await Vlog.findByIdAndUpdate(id,{comment});
    // foundComment.comment=comment;
    res.redirect(`/blogs`);
})

//  task 7--> deleteing a particular comment
app.delete('/blogs/:id',async (req,res)=>{
    let {id}=req.params;
//    let newArray= comments.filter((comment)=>{return  comment.id != id});
//    comments=newArray;
await Vlog.findByIdAndDelete(id);

   res.redirect('/blogs');
})


app.listen(8080,()=>{
    console.log('serever running at 8080');
})