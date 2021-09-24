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

User.createUser = (user, result) =>{

    sql.query("INSERT INTO users SET ?", 
        user, 
        (err,res) => {
            console.log("creating user");

            if (err){
                console.log("hubo error",err);
                result(null,err);
                return;
            }
            console.log("user created: ", {id: res.insertId});
            result(null,res);
        });
}

User.updateUser = (userId, user, result) =>{
    console.log(user.firstName);
    // if(!user.firstName){
    //     user.firstName=sql.query("SELECT firstName from users WHERE id=?",userId);
    // }
    // var someVar=[];
    // if(!user.lastName){
        
    //      user.lastName=sql.query("SELECT lastName from users WHERE id=?",userId, (err,res)=> {

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


    console.log(user.lastName);
    sql.query("UPDATE users SET firstName=?, lastName=?, location=?, phone=?, gender=? WHERE id=?",

    [user.firstName,
    user.lastName,
    user.location,
    user.phone,
    user.gender,
    userId], (err,res) => {

        if (err){
            result(null,err);
            return;
        }

        return(null,res);
    });
}


module.exports= User;
