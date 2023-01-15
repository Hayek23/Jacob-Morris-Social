const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => timeSince(date),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const reactionSchema = new Schema(
    {
        reactionId: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    {
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: string,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => timeSince(date),
        },
    }
)

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

modeul.exports = Thought;