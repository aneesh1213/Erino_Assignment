import express from 'express';
import User from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { error } from 'console';
import { errorMonitor } from 'events';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://aneeshkulkarni007:583683@cluster0.ixrta.mongodb.net/erino_assignment';

mongoose.connect(mongoUri, {

}).then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.error("error connecting to mongodb: ", error)
})

const app = express();

const port = 3000;

app.use(cors({
    origin: '*', // Adjust to allow specific domains if needed
    credentials: true,
}));


app.use(express.json());

// post request 

app.post('/contacts', async (req, res) => {
    const {firstname, lastname, email, phone, company, jobtitle} = req.body;
    const user = await User.findOne({email});

    if(user){
        return res.status(205).json({meassage:`this user already exists!!`})
    }

    const newuser = new User({firstname, lastname, email, phone, company, jobtitle});
    newuser.save();
    res.json({mesaage: `registered ngo successfully !!!`})
})

// get request

app.get('/contacts', async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);

    }catch(error){
        console.log("error fetching users from index.js", error);
        res.status(500).json({message:"error fetching users from the backend!"})
    }
})

// put request 

app.put('/contacts/:id', async(req, res) => {
    const {id} = req.params;
    const {firstname, lastname, email, phone, company, jobtitle} = req.body;

    try{
        const updateduser = await User.findByIdAndUpdate(id, 
            {firstname, lastname, email, phone, company, jobtitle}, 
            {new:true, runValidators: true}
        );

        if(!updateduser){
            return res.status(404).json({message:"contact not found "})
        }
        res.status(200).json({message:"contact not found"});
    }
    catch(error){
        console.log("error from put request is", error
        );
        res.status(500).json({message:"error updating contact"})
    }
})

// delete reauest

app.delete('/contacts/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deleteduser = await User.findByIdAndDelete(id);
        if(!deleteduser){
            return res.status(404).json({message:"no deleeted user exists !"});
        }
    }
    catch(error){
        console.log("error deleting user", error);
        return res.status(500).json({message:"error deleteing the user!"})
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`));

 