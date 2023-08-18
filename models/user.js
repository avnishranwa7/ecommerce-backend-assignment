import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function (productId) {
    const productCartIndex = this.cart.items.findIndex(item => {
        return item.product.toString() === productId;
    });

    let quantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (productCartIndex >= 0) {
        quantity += updatedCartItems[productCartIndex].quantity;
        updatedCartItems[productCartIndex].quantity = quantity;
    }
    else {
        updatedCartItems.push({ product: productId, quantity });
    }

    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    this.save();
}

userSchema.methods.updateProductQuantity = function (productId, quantity) {
    const productCartIndex = this.cart.items.findIndex(item => {
        return item.product.toString() === productId;
    });

    if (productCartIndex < 0) {
        const error = new Error('No such product in cart');
        error.statusCode = 404;
        throw error;
    }

    if(quantity==0){
        return this.removeProductFromCart(productId);
    }

    const updatedCartItems = [...this.cart.items];
    updatedCartItems[productCartIndex].quantity = quantity;
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    this.save();

    return updatedCartItems[productCartIndex];
}

userSchema.methods.removeProductFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(item=>{
        return item.product.toString() !== productId;
    });

    this.cart.items = updatedCartItems;
    this.save();
}

userSchema.methods.clearCart = function(){
    this.cart.items = [];
    this.save();
}

export default mongoose.model('User', userSchema);