const mongoose = require("mongoose");

// Replace <db_password> with your actual password
const uri = "mongodb+srv://mysticwarrior349:FhKzAhzewkudmo7E@cluster0.yoch6ql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
   console.error("Error connecting to MongoDB Atlas:", error);
});
