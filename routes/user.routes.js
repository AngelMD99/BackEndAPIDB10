module.exports = app =>{
        const users= require("../controllers/user.controller")

        //Get list of users
        app.get("/users", users.getAll);
            //console.log("List of users");        

        //Get single user
        app.get("/user/:userId",users.getSingle);
        // => {
        //     console.log("Single user");
            
        // });

        //Create user
        app.post("/users",users.createUser);
        // => {
        //     console.log("Create user");

           
        // });
        
        //Update user
        app.put("/users",users.UpdateUser);
        // => {
        //     console.log("Update user");

            
        // });
}