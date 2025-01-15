import Conversation from "../models/conversation .model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req,res)=>{
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        //console.log(receiverId);
        const senderId = req.user._id; // current logged in user
        //console.log(senderId);
        let conversation = await Conversation.findOne({
          members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
          conversation = await Conversation.create({
            members: [senderId, receiverId],
          });
        }
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        });
        if (newMessage) {
          conversation.messages.push(newMessage._id);
        }
        // await conversation.save()
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]); 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const getMessage = async (req,res)=>{
    try {
        const { id: chatUser } = req.params;
        //console.log("soni kumari",chatUser);
        const senderId = req.user._id; // current logged in user
        //console.log("shreya",senderId);
        let conversation = await Conversation.findOne({
          members: { $all: [senderId, chatUser] },
        }).populate("messages");
        //console.log(conversation);
        if (!conversation) {
          return res.status(201).json([]);
        }
        const messages = conversation.messages;
       
        res.status(201).json(messages);
      } catch (error) {
        console.log("Error in getMessage", error);
        res.status(500).json({ error: "Internal server error" });
      }
}