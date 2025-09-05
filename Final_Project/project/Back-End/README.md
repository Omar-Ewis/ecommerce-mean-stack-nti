# E-Commerce Backend API

## Overview

This is a comprehensive e-commerce backend API built with Node.js, Express, and MongoDB. It provides all the necessary endpoints for managing an online store including products, categories, orders, user management, and more.

## Features

- **User Management**: Registration, authentication, and authorization
- **Product Management**: CRUD operations for products with variants and categories
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Management**: Complete order lifecycle with status tracking
- **Category Management**: Hierarchical categories with audience targeting
- **Reviews & Testimonials**: Product reviews with admin moderation
- **FAQ System**: Manage frequently asked questions
- **Contact System**: Handle customer inquiries and complaints
- **Wishlist**: Save favorite products
- **Admin Panel**: Comprehensive admin controls and analytics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer
- **Validation**: Built-in validation with error handling

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/addresses` - Get user addresses
- `POST /api/user/addresses` - Add new address
- `PUT /api/user/addresses/:id` - Update address
- `DELETE /api/user/addresses/:id` - Delete address

### Categories

- `GET /api/category` - Get all categories
- `GET /api/category/tree` - Get category tree
- `GET /api/category/:id` - Get category by ID
- `GET /api/category/slug/:slug` - Get category by slug
- `POST /api/category` - Create category (Admin only)
- `PUT /api/category/:id` - Update category (Admin only)
- `DELETE /api/category/:id` - Delete category (Admin only)

### Products

- `GET /api/product` - Get all products with filtering
- `GET /api/product/:id` - Get product by ID
- `GET /api/product/slug/:slug` - Get product by slug
- `GET /api/product/category/:categoryId` - Get products by category
- `POST /api/product` - Create product (Admin only)
- `PUT /api/product/:id` - Update product (Admin only)
- `DELETE /api/product/:id` - Delete product (Admin only)
- `PATCH /api/product/:id/stock` - Update product stock (Admin only)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart
- `GET /api/cart/check-prices` - Check for price changes

### Orders

- `POST /api/order` - Create order
- `GET /api/order/user` - Get user orders
- `GET /api/order/user/:id` - Get user order by ID
- `GET /api/order` - Get all orders (Admin only)
- `PUT /api/order/:id/status` - Update order status (Admin only)
- `PUT /api/order/:id/payment` - Update payment status (Admin only)
- `GET /api/order/stats` - Get order statistics (Admin only)

### Testimonials

- `GET /api/testimonial` - Get all testimonials
- `GET /api/testimonial/:id` - Get testimonial by ID
- `GET /api/testimonial/product/:productId` - Get product testimonials
- `POST /api/testimonial` - Create testimonial
- `PUT /api/testimonial/:id` - Update testimonial
- `DELETE /api/testimonial/:id` - Delete testimonial
- `PUT /api/testimonial/:id/approve` - Approve testimonial (Admin only)

### FAQ

- `GET /api/faq` - Get all FAQs
- `GET /api/faq/active` - Get active FAQs
- `GET /api/faq/:id` - Get FAQ by ID
- `GET /api/faq/category/:category` - Get FAQs by category
- `POST /api/faq` - Create FAQ (Admin only)
- `PUT /api/faq/:id` - Update FAQ (Admin only)
- `DELETE /api/faq/:id` - Delete FAQ (Admin only)

### Contact

- `POST /api/contact` - Send contact message
- `GET /api/contact/user` - Get user contact messages
- `GET /api/contact` - Get all contact messages (Admin only)
- `GET /api/contact/:id` - Get contact message by ID (Admin only)
- `PUT /api/contact/:id` - Update contact message (Admin only)
- `DELETE /api/contact/:id` - Delete contact message (Admin only)
- `GET /api/contact/stats` - Get contact statistics (Admin only)

### Wishlist

- `GET /api/wishlist` - Get user wishlist
- `GET /api/wishlist/count` - Get wishlist count
- `POST /api/wishlist/add` - Add product to wishlist
- `DELETE /api/wishlist/remove` - Remove product from wishlist
- `DELETE /api/wishlist/clear` - Clear wishlist
- `POST /api/wishlist/check-status` - Check wishlist status for products

## Environment Variables

Create a `.env.dev` file in the `src/config` directory:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
```

## Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables

3. Start the server:

```bash
npm start
```

## Database Models

### User

- Basic account information (name, email, phone, password)
- Role-based access control (admin/user)
- Multiple shipping addresses
- Timestamps

### Category

- Hierarchical structure with parent-child relationships
- Audience targeting (men, women, unisex)
- SEO-friendly slugs
- Soft delete support

### Product

- Product details with variants (size, color, stock)
- Category and audience association
- Image management
- Rating and review system
- Soft delete support

### Cart

- User-specific shopping cart
- Product variants with quantities
- Price change tracking
- Automatic total calculation

### Order

- Complete order lifecycle management
- Status tracking with history
- Payment and shipping management
- Stock management integration

### Testimonial

- Product and general reviews
- Admin moderation system
- Rating system (1-5 stars)
- Soft delete support

### FAQ

- Categorized questions and answers
- Ordering system
- Active/inactive status
- Soft delete support

### ContactMessage

- Customer inquiry management
- Complaint and question categories
- Admin response system
- Priority levels

### Wishlist

- User-specific product collections
- Product validation
- Count tracking

## Security Features

- JWT-based authentication
- Role-based authorization
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## Performance Features

- Database indexing for common queries
- Pagination for large datasets
- Efficient data population
- Soft delete for data integrity

## Error Handling

- Centralized error handling middleware
- Consistent error response format
- Validation error handling
- Database error handling

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": "Response data (optional)"
}
```

## Development

- Hot reload with nodemon
- ES6+ syntax support
- Modular architecture
- Comprehensive logging

## Testing

Run tests with:

```bash
npm test
```

## License

ISC License

