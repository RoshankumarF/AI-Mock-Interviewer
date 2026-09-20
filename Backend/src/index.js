import "dotenv/config"
import dns from "node:dns"

import { connectDB } from "./database/dbconnect.js"

import { app } from "./app.js"


dns.setServers(["8.8.8.8","1.1.1.1"])

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
      console.log(`Server is running at address  http://localhost:${process.env.PORT}`)
    })

})

.catch((err)=>{
     console.log("Connection failed to connect mongodb",err)
})