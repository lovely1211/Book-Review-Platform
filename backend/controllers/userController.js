const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({ message: 'User registered successfully.', user: newUser });

    } catch(err){
        res.status(500).json({message: "server error"})
    }
    

}

exports.loginUser = async(req, res) => {
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "user not found"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10d'})

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message: "server error"});
    }
}

exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, {
        name,
        email
      }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Failed to update user' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

