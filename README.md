
OverClockedX Admin

OverClockedX Admin is the official administrative dashboard for the OverClockedX e-commerce platform. It allows administrators to efficiently manage the client-facing store by handling inventory, orders, promotions, analytics, and more through a modern, responsive interface.

Features

Dashboard

* Display total revenue of the selected year with monthly breakdowns in an area chart
* Display popular products for the selected month
* Highlight top-selling products of the current month
* Low stock alerts for products running out
* Recent orders overview

Inventory Management

* View all products with pagination
* Add products manually or by scanning barcode/QR code
* Search products by product ID or name
* Edit product information, price, and stock
* Add additional stock to existing products
* Apply promotions and discounts to products
* Remove outdated or discontinued products

Order Management

* Display all orders in a table format with full details
* View order status, payment status, customer information, shipping details, and product list
* Accept pending orders (for cash-on-delivery)
* Automatically process online payments (Gcash, Maya)
* Print receipts with QR codes for tracking order packing and delivery status
* Scan QR codes to update order status from “Preparing” to “Out for Delivery”
* Decline orders with invalid shipping information
* Order statistics: total orders, pending, preparing, delivered, and cancelled

QR Code Scanner

* Scan product QR codes to update delivery status efficiently
* Ensure smooth tracking of packed and shipped items

UX & Design

* Fully responsive dashboard for desktop and tablet usage
* Clean and modern UI for fast and intuitive administration
* Prioritizes usability for managing inventory, orders, and promotions

Tech Stack

* Framework: Next.js (built on React)
* Language: TypeScript
* State Management: Zustand
* Authentication: next-auth (Google and Credentials providers)
* Email Service: SendGrid
* Database: MySQL2
* Barcode/QR Code: qrcode and html5-qrcode
* UI Components: Shadcn/ui and Radix UI
* Styling: Tailwind CSS & tailwind-merge
* Charts & Analytics: Recharts
* Icons: React Icons & Lucide
* File Uploads: Edge Store
* Real-time updates: socket.io-client


