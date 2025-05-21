const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {

    answer:{
      type:String,
    },
    verify:{
      type:Boolean,
      default:false
    },
    comment: {
      type: String,
      required: [true, 'لطفا نظر خود را خالی نگذارید.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'products',
      required: true,
    },
  },
  { timestamps: true }
);
// ReviewSchema.index({ product: 1, user: 1 }, { unique: false });

// ReviewSchema.statics.calculateAverageRating = async function (productId) {
//   const result = await this.aggregate([
//     { $match: { product: productId } },
//     {
//       $group: {
//         _id: null,
//         averageRating: { $avg: '$rating' },
//         numOfReviews: { $sum: 1 },
//       },
//     },
//   ]);

//   try {
//     await this.model('Product').findOneAndUpdate(
//       { _id: productId },
//       {
//         averageRating: Math.ceil(result[0]?.averageRating || 0),
//         numOfReviews: result[0]?.numOfReviews || 0,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// ReviewSchema.post('save', async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });

// ReviewSchema.post('remove', async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });

module.exports = mongoose.model('Review', ReviewSchema);
