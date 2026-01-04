import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Don't return password by default in queries
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function () {
    // Remove 'next' from the arguments above

    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return ; // Simply return instead of calling next()
    }

    // Hash the password 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // 3. DONE! No next() needed.
    // next();
})


// Instance method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.model("User", userSchema)