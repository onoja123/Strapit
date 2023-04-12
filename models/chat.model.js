const mongoose = require("mongoose")

const chatSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
          },
          receiver: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
          }],
          message: {
            type: String
          },
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat;
