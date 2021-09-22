const User = require("../models/user.model");

exports.getAll = (req,res) =>{

      User.getAll((err,data)=>{
        
         if (err){
                 res.status(500).send({
                 message:err.message || "Server error getting all users."
                
                 });
         }
         else{
            res.status(200).send(data);
         }
     });
};
    

exports.getSingle = (req,res) =>{
    
    if(!req.params.userId){
        res.status(400).send({
            message: "Error: User Id not specified, send parameter 'id' "
        });
    }

    User.getSingle (req.params.userId, (err,data)=>{
        if(err){
            res.status(500).send({
            message:err.message || "Server error getting user information."
            });

        }
        else{
            if (data.length) {
                res.send(data);
                
            }

            else {
                res.status(404).send({
                    message: "User not found"
                });
            }
        }


    });  

    

};

exports.createUser = (req,res) =>{    

  
    if (!req.body.firstName) {
        res.status(400).send({
           message: "Error: firstName can't be empty"
        });
     }
  
     if (!req.body.lastName) {
        res.status(400).send({
           message: "Error: lastName can't be empty"
        });
     }
  
     if (!req.body.gender) {
        res.status(400).send({
           message: "Error: gender can't be empty"
        });
     }
  


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location || null,
        phone: req.body.phone || null,
        gender: req.body.gender
     })
  



    
    User.createUser(user, (err, data) => {
        if(err){
            res.status(500).send ({
                message: err.message || "Server error creating user"
            });
        }
        else {
            res.send({

              message: "User created successfully",
              userId: data.userId  
            });

        }    
        

    });

};

exports.UpdateUser = (req,res) =>{

    if (!req.body.id) {
        res.status(400).send({
           message: "Error: id is missing. Send the user's id as 'id'"
        });
     }

    if (!req.body.firstName){
        res.status(400).send({
            message: "first name is not specified"
        });
    }

    if (!req.body.lastName) {
        res.status(400).send({
           message: "Error: lastName can't be empty"
        });
     }

    if (!req.body.gender){
        res.status(400).send({
            message: "gender is not specified"
        });
    }

    console.log("About to update")



    User.updateUser(req.body.id, new User(req.body), (err,data)=>{
        
        if(err){
            if (err.kind == 'user_not_found') {
                res.status(404).send({
                   message: "user id not found in the database"
                });
             }
             else {
                res.status(500).send();
             }
        }

        else{
            console.log("send user data")

            res.send({
                message:"user updated sucessfully",
                id:req.body.id

        
            });
            
        }

        

    })
 

};