import mongoose, { Connection } from 'mongoose';
import { CategorySchema } from 'src/modules/categories/categories.schema';
import { OrderSchema } from 'src/modules/orders/orders.schema';
import { ProductSchema } from 'src/modules/products/products.schema';

async function seedDatabase() {
  const connection: Connection = await mongoose
    .createConnection(process.env.MONGO_URL, {
      authSource: 'admin',
    })
    .asPromise();

  try {
    console.log('Seeding database...');

    const CategoryModel = connection.model('Category', CategorySchema);
    const ProductModel = connection.model('Product', ProductSchema);
    const OrderModel = connection.model('Order', OrderSchema);

    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});

    const categories = [
      { name: 'Electronics' },
      { name: 'Home Appliances' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Toys' },
    ];

    const savedCategories = await CategoryModel.insertMany(categories);

    console.log(`Created ${savedCategories.length} categories.`);

    const products = [
      {
        name: 'Smartphone',
        description: 'Latest model with advanced features',
        price: 999.99,
        categories: [savedCategories[0]._id],
        imageUrl: 'https://example.com/smartphone.jpg',
      },
      {
        name: 'Laptop',
        description: 'Lightweight and powerful',
        price: 1299.99,
        categories: [savedCategories[0]._id],
        imageUrl: 'https://example.com/laptop.jpg',
      },
      {
        name: 'Vacuum Cleaner',
        description: 'High efficiency for clean homes',
        price: 299.99,
        categories: [savedCategories[1]._id],
        imageUrl: 'https://example.com/vacuum.jpg',
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        categories: [savedCategories[2]._id],
        imageUrl: 'https://example.com/tshirt.jpg',
      },
      {
        name: 'Novel',
        description: 'Bestselling fiction novel',
        price: 14.99,
        categories: [savedCategories[3]._id],
        imageUrl: 'https://example.com/novel.jpg',
      },
    ];

    const savedProducts = await ProductModel.insertMany(products);

    console.log(`Created ${savedProducts.length} products.`);

    const orders = [
      {
        date: new Date('2025-01-01T10:00:00.000Z'),
        products: [savedProducts[0]._id, savedProducts[1]._id],
        total: savedProducts[0].price + savedProducts[1].price,
      },
      {
        date: new Date('2025-01-02T14:00:00.000Z'),
        products: [savedProducts[2]._id],
        total: savedProducts[2].price,
      },
      {
        date: new Date('2025-01-03T16:00:00.000Z'),
        products: [savedProducts[3]._id, savedProducts[4]._id],
        total: savedProducts[3].price + savedProducts[4].price,
      },
      {
        date: new Date('2025-01-04T08:00:00.000Z'),
        products: [savedProducts[0]._id],
        total: savedProducts[0].price,
      },
      {
        date: new Date('2025-01-05T13:30:00.000Z'),
        products: [savedProducts[1]._id, savedProducts[2]._id],
        total: savedProducts[1].price + savedProducts[2].price,
      },
      {
        date: new Date('2025-01-06T15:45:00.000Z'),
        products: [savedProducts[3]._id],
        total: savedProducts[3].price,
      },
      {
        date: new Date('2025-01-07T18:00:00.000Z'),
        products: [savedProducts[4]._id, savedProducts[0]._id],
        total: savedProducts[4].price + savedProducts[0].price,
      },
      {
        date: new Date('2025-01-08T09:15:00.000Z'),
        products: [savedProducts[1]._id, savedProducts[3]._id],
        total: savedProducts[1].price + savedProducts[3].price,
      },
      {
        date: new Date('2025-01-09T11:45:00.000Z'),
        products: [savedProducts[2]._id, savedProducts[4]._id],
        total: savedProducts[2].price + savedProducts[4].price,
      },
      {
        date: new Date('2025-01-10T17:30:00.000Z'),
        products: [savedProducts[0]._id, savedProducts[2]._id],
        total: savedProducts[0].price + savedProducts[2].price,
      },
      {
        date: new Date('2025-01-11T19:00:00.000Z'),
        products: [savedProducts[3]._id, savedProducts[4]._id],
        total: savedProducts[3].price + savedProducts[4].price,
      },
      {
        date: new Date('2025-01-12T14:00:00.000Z'),
        products: [savedProducts[0]._id],
        total: savedProducts[0].price,
      },
      {
        date: new Date('2025-01-13T12:30:00.000Z'),
        products: [savedProducts[1]._id, savedProducts[3]._id],
        total: savedProducts[1].price + savedProducts[3].price,
      },
      {
        date: new Date('2025-01-14T15:00:00.000Z'),
        products: [savedProducts[2]._id],
        total: savedProducts[2].price,
      },
      {
        date: new Date('2025-01-15T09:00:00.000Z'),
        products: [savedProducts[4]._id, savedProducts[1]._id],
        total: savedProducts[4].price + savedProducts[1].price,
      },
      {
        date: new Date('2025-01-16T20:00:00.000Z'),
        products: [savedProducts[0]._id, savedProducts[3]._id],
        total: savedProducts[0].price + savedProducts[3].price,
      },
      {
        date: new Date('2025-01-17T18:30:00.000Z'),
        products: [savedProducts[2]._id, savedProducts[4]._id],
        total: savedProducts[2].price + savedProducts[4].price,
      },
      {
        date: new Date('2025-01-18T13:15:00.000Z'),
        products: [savedProducts[0]._id, savedProducts[2]._id],
        total: savedProducts[0].price + savedProducts[2].price,
      },
      {
        date: new Date('2025-01-19T16:45:00.000Z'),
        products: [savedProducts[3]._id],
        total: savedProducts[3].price,
      },
      {
        date: new Date('2025-02-01T10:00:00.000Z'),
        products: [savedProducts[4]._id, savedProducts[1]._id],
        total: savedProducts[4].price + savedProducts[1].price,
      },
    ];

    const savedOrders = await OrderModel.insertMany(orders);

    console.log(`Created ${savedOrders.length} orders.`);

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.close();
  }
}

seedDatabase();
