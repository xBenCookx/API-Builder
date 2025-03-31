import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';

// Define Thought Interface
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof reactionSchema[];
}

// Create Thought Schema
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: { virtuals: true, getters: true },
        timestamps: true, // Mongoose automatically adds createdAt & updatedAt
        id: false
    }
);

// Virtual property: reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create and export Thought Model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
