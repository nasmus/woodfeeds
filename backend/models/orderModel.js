import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        isDelivered: { type: Boolean, default: false },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        deliveredAt: { type: Date },
        orderStatus: {type:String, required: true, default:'Panding'},
        seller: {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Product",
          require:true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      distric: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
  },
  {
    timestamps: true,
  }
); 

const Order = mongoose.model('Order', orderSchema);
export default Order;