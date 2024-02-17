const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
   amount:{
     type:Number,
     required:true,
   },
   type:{
     type:String,
     required:true,
   },
   category:{
     type:String,
     required:true,
   },
   date:{
     type:Date,
     required:true,
   },
   reference:{
     type:String,
     required:true,
   },
   description:{
     type:String,
     required:true,
   },
   userId:{
     type:String,
     required: true,
   },
});

const Transaction = new mongoose.model("transactions", transactionSchema);

module.exports = Transaction;