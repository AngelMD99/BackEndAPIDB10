const sql= require("./db");

const User = function(user){
    this.firstName = user.firstName || "John";
    this.lastName = user.lastName || null;
    this.location = user.location || "Juarez";
    this.phone = user.phone;
    this.gender = user.gender;
    this.createdAt = user.createdAt ||  Date().toString;
    this.updatedAt = user.updatedAt || Date().toString;
    
}

User.getSingle = (userId, result) =>{

    sql.query("SELECT * FROM users WHERE id=?", userId , (err,res)=> {

        if(err){
            console.log("error:", err);
            result(null,err);
            return;

        }
        console.log("Query successful.");

        result(null,res);

    });

}

User.getAll = result => {
    
    sql.query("SELECT * FROM users", (err,res) => {
        if (err){
            console.log("error:", err);
            result(null,err);
            return;
        }

        result(null,res);


    });
};



User.createUser = (user, result) =>{

    sql.query("INSERT INTO users SET ?", user, (err,res) => {
            console.log("creating user...");

            if (err){
                console.log("ERROR! : ",err);
                result(null,err);
                return;
            }
            console.log("User created: ", {id: res.insertId});
            result(null,res);
        });
}

User.updateUser = (userId, userToUpdate, result) =>{
    console.log(userToUpdate.firstName);
    // if(!userToUpdate.firstName){
    //     userToUpdate.firstName=sql.query("SELECT firstName from users WHERE id=?",userId);
    // }
    // var someVar=[];
    // if(!userToUpdate.lastName){
        
    //      userToUpdate.lastName=sql.query("SELECT lastName from users WHERE id=?",userId, (err,res)=> {

    //         if(err) {
    //             throw err;
    //           } else {
    //             setValue(rows);
    //           }
    //      });

    //      function setValue(value) {
    //         someVar = value;
    //         console.log(someVar);
    //       }
 
          
    //  }


    console.log(userToUpdate.lastName);
    sql.query("UPDATE users SET firstName=?, lastName=?, location=?, phone=?, gender=? WHERE id=?",

    [userToUpdate.firstName,
    userToUpdate.lastName,
    userToUpdate.location,
    userToUpdate.phone,
    userToUpdate.gender,
    userId], (err,res) => {

        if (err){
            console.loog("ERROR! : ",err);
            result(null,err);
            return;
        }

        if(res.affectedRows==0){
            result({kind:"User_Not_Found_In_Database"},null);
            return;
        }

        console.log("User with id: ",userId," updated ");
        result(null,res);
    });
}


module.exports= User;
