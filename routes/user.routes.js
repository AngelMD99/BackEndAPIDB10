module.exports = app =>{
        const users= require("../controllers/user.controller")
        //Get list of users
        app.get("/users", users.getAll);
        //Get single user
        app.get("/user/:userId",users.getSingle);
        //Create user
        app.post("/users",users.createUser);
        //Update user
        app.put("/users",users.UpdateUser);
        
}