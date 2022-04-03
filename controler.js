"use strict"

/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Kamo-189:wevze3-quxmiK-canpof@cluster0.kympf.mongodb.net/TodoList?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); */

const mongoose = require('mongoose');
const DBURI = 'mongodb+srv://Kamo-189:wevze3-quxmiK-canpof@cluster0.kympf.mongodb.net/TodoList?retryWrites=true&w=majority';
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
/* var dbo = client.db("Todo-list"); */

const Group = require('./Group');
const chalk = require("chalk");
var Name = "Charles";


exports.addNewGroup = function(nameGroup){

  var newData = new Group({"title": nameGroup, "user": Name});
  newData.save();
  console.log(chalk.yellowBright("Groupe ajouté"));

}

exports.addDataToDataBase = function(todoTitle,todoSubject) {
    client.connect(err => {
      var newData = { "title": todoTitle, "subject": todoSubject };
      dbo.collection("TodoList").insertOne(newData, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
    });
  }

exports.addGroupToDataBase = function(nameGroup) {
    client.connect(err => {
      var newGroup = { "title": nameGroup};
      dbo.collection("Group").insertOne(newGroup, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
    });
  }

exports.modifyActualTitle = function(todoTitle, todoNewTitle) {
    client.connect(err => {
    dbo.collection("TodoList").replaceOne(
      { "title": todoTitle },
      { "title": todoNewTitle }
      , function (err) {
        if (err) {
          console.log(chalk.red("something went wrong, please try again."));
        } else {
          console.log();
          console.log(chalk.green("Todo has been modified successfully ✔\n"));
        }
        client.close();
      })
  });
}

exports.addNewAccountToDataBase = function(todoEmail, todoPassword) {
    client.connect(err => {
      dbo.collection("accounts").insertOne({ "email": todoEmail, "password": todoPassword }, function (err, res) {
        if (err) throw err;
        console.log("Account created successfully");
        client.close();
      });
    });
  } 


  exports.listAllTodoInDataBase = function() {
    client.connect(err => {
      dbo.collection("TodoList").find({}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      })
    });
  }

  exports.removeTodoFromDataBase = function(title) {
    client.connect(err => {
      var dataToRemove = { "title": title };
      dbo.collection("TodoList").deleteOne(dataToRemove, function (err, res) {
        if (err) throw err;
        console.log("1 document removed");
        client.close();
      });
    });
  }
  

  exports.checkEmailPasswordAccount = async function (emailLog,passwordLog) {

    await client.connect();
    var rep = await dbo.collection("accounts").findOne({"email":emailLog , "password":passwordLog});
    client.close();
    if(rep != null){

        console.log("Connected with success !");
        return rep._id.toString();
    }
    else {
        console.log("Username or Password incorrect !");
        return null;
    }


  }

  
  exports.checkIfTitleExist = async function (title){
    await client.connect();
    var rep = await dbo.collection("TodoList").findOne({"title":title});
    client.close();
    if(rep != null){

        return true;
    }
    else {
        return false;
    }

  }