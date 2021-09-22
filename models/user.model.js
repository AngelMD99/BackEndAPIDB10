const sql= require("./db");

const User = function(user){
    this.firstName = user.firstName || "John";
    this.lastName = user.lastName || "Doe";
    this.location = user.location || "Juarez";
    this.phone = user.phone;
    this.gender = user.gender;
    this.createdAt = user.createdAt || null;
    this.updatedAt = user.updatedAt || null;
    
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

            if (err){
                result(null,err);
                return;
            }

            result(null,res);
        })
}

User.updateUser = (userId, user, result) =>{
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
