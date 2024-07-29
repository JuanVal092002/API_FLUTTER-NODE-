const express = require("express");
const userSchema = require ("../models/user");

const router = express.Router()

//Crear Usuario
router.post("/user", (req,res)=>{
    const user = userSchema(req.body);
    user.save()
    .then((data)=>res.json(data))
    .catch((error)=> res.json({message:error}))

})


router.get("/user", (req,res)=>{
    userSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=> res.json({message:error}))

})


router.get("/user/:id", (req,res)=>{
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=> res.json({message:error}))

})


router.put("/user/:id", (req,res)=>{
    const {id} = req.params;
    const {nombre,edad,correo,contrasenia}=req.body
    userSchema
    .updateOne({_id: id},{$set:{nombre,edad,correo,contrasenia}})
    .then((data)=>res.json(data))
    .catch((error)=> res.json({message:error}))

})

// Eliminar usuario
router.delete("/user/:id", (req,res)=>{
    const {id} = req.params;
    userSchema
        .deleteOne({_id: id})
        .then((data)=>res.json(data))
        .catch((error)=> res.json({message:error}))

})

module.exports = router;