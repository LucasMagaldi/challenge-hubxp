const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:root@mongodb:27017/challenge';

const orderSchema = new mongoose.Schema({
  date: Date,
  total: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports.processSalesReport = async (event) => {
  try {
    await mongoose.connect(MONGO_URL, { authSource: "admin" });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
  const startDate = new Date(event.queryStringParameters.startDate);
  const endDate = new Date(event.queryStringParameters.endDate);

  const salesReport = await Order.aggregate([
    { $match: { date: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: '$total' },
      },
    },
  ]);

  await mongoose.disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Sales report generated successfully!',
      report: salesReport[0] || { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 },
    }),
  };
};
