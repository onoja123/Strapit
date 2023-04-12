const mongoose = require("mongoose")

const Chat = require("./models/chat.model")

//TODO: this is to show how the chatting wotrks, i dont have any app.js files, just make yours work, and oto show user is online or offline, hamnle it from your login and logout

mongoose.set("strictQuery", true)


//catchhing exception error

process.on("uncaughtException", err =>{
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

//connecting mongoose connection
connectDB()


const PORT = process.env.PORT || 3000


const server = app.listen(PORT, (req, res)=>{
    log.info(`⚡️:: Server running on port ${PORT}...`)
})

const io = require('socket.io')(server);

log.info("⚡️:: Websocket server started");

// handle socket connections
io.on('connection', socket => {
    console.log('New client connected:', socket.id);
  
    // handle incoming messages
    socket.on('message', async ({ senderId, receiverIds, message }) => {
      try {
        // create a new chat document
        const chat = new Chat({
          sender: senderId,
          receiver: receiverIds,
          message: message
        });
  
        // save the chat document
        await chat.save();
  
        // emit the chat document to the sender and receivers
        socket.emit('message', chat);
        receiverIds.forEach(receiverId => {
          io.to(receiverId).emit('message', chat);
        });
      } catch (err) {
        console.error(err);
      }
    });
  
    // handle socket disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });



process.on("unhandledRejection", err =>{
    log.info("UNHANDLED REJECTION! ! 💥 Shutting down...")
    log.info(err.name, err.message);
    server.close(()=>{
        
        process.exit(1);
    })

})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});