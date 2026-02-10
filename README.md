

# 🛒 React Shopping Cart Project

[Shopping Cart by John Walter](https://shopping-cart-two-indol.vercel.app/)

## Overview

This is a **Shopping Cart web application** built with **React**, demonstrating key React concepts such as components, state management, rendering techniques, keys in React, Passing data between components synchronization with effects, routing, event handling, API fetching, and testing. The project simulates a simple e-commerce experience without implementing a payment system.

---

## Features

* Multi-page navigation using **React Router**: Home, Shop, Cart
* **Product cards** with:

  * Title
  * Quantity input
  * Increment/decrement buttons
  * “Add to Cart” button
* **Real-time cart updates** shown in the navigation bar
* Cart page allows:

  * Adjusting product quantities
  * Removing items
* Products are fetched from [FakeStore API](https://fakestoreapi.com)
* Fully tested with **React Testing Library**
* Styled with CSS modules for scoped styling
* Ready for **deployment** as a Single Page Application (SPA)

---

## Lessons Learned

* **Components & Props:** Built reusable components like `ProductCard`, `NavBar`, `CartItem`.
* **State Management:** Shared `cart` state between pages using `useState` and props.
* **Routing:** Used `react-router-dom` for multiple pages.
* **Events & User Interaction:** Implemented buttons, inputs, and real-time updates.
* **Fetching Data:** Used `useEffect` to fetch products from an external API.
* **Prop Validation:** Added `PropTypes` to reduce runtime errors.
* **Testing:** Ensured functionality using **React Testing Library**.
* **Deployment:** Learned SPA deployment with Netlify or Vercel, including redirects.

## Testing

Tests cover:

- Component rendering
- Routing and Navigation
- Home page conetnt
- Shop functionality
- Cart functionality
- API fetching data in React
