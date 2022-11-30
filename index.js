const express = require("express")
require('./db/conn')
const app = express()
const bodyParser = require("body-parser")

const {mySchema  , counterModel} = require('./db/Myschema')

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser())

// get api
app.get("/" , (req ,res) =>{
    res.send("hello")
})

// post api

app.post('/post',(req,res)=>{
    counterModel.findOneAndUpdate(
        {id:"autoval"},
        {'$inc':{"seq":1}},
        {new : true},(err, cd)=>{
            //console.log("counter val", cd)
            let seqId ;
            if(cd == null){
                const newVal = new counterModel({id:"autoval", seq:1})
                newVal.save()
                seqId = 1
            }else{
                seqId = cd.seq
            }

            mySchema.create({
                id : seqId,
                title : req.body.title,
                is_complete : req.body.is_complete
            }).then((data)=>{
                res.status(200).send({status:'Successfully Added task'})
            }).catch((err)=>{
                res.status(400).send(err.message)
            })
        }
    )
});

// get api 
app.get("v1/tasks/:id", async (req,res)=>{
    try{
        let id = req.params.id;
        const result = await mySchema.find({_id:id});
        res.status(201).json({
            error: "There is no task at that id",
            result
        });
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message:err.message
        })
    }
})

// delete api
app.delete('v1/tasks/:id' , async (req ,res)=>{
    try{
        const id = req.params.id;
        const deleteTask = await Student.mySchema(req.params.id)
        if(!req.params.id){
            return res.status(400).send()
        }
        res.send(deleteTask)
    }catch(e){
        res.status(404).send(e)
    }
})

// edit api

app.patch('v1/tasks/:id' , async (req ,res) =>{
    try{
        const _id = req.params.id;
        const updateStudents = await Student.mySchema(_id , req.body ,{
            new : true
        });
        res.send(updateStudents);
    }catch(e){
        res.status(404).send(e)
    }
})



app.listen(3000 , ()=>{console.log("this server is fire on 3000")})