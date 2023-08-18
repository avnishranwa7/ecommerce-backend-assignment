import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
});

export default mongoose.model('Product', productSchema);