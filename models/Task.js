import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a task title'],
        maxlength: [50, 'Title cannot exceed 100 characters'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed'],
            message: 'Status must be either pending or completed'
        },
        default: 'pending'
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Priority must be low, medium, or high'
        },
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create index on owner for faster queries
taskSchema.index({ user: 1 });

export default mongoose.model('Task', taskSchema);