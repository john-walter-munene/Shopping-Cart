// Developer tools
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Application specific components
import { Home } from './components/home/Home';
import { ShoppingPage } from './components/shop/Shop';
import { ShoppingCart } from './components/cart/Cart';


function App() {
    const [cartifyProducts, setCartifyProducts] = useState([]);
    const [cartifyCart, setCartifyCart] = useState([]);
    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home />
        },
        {
          path: "shop",
          element: <ShoppingPage products={cartifyProducts} setProducts={setCartifyProducts} cart={cartifyCart} setCart={setCartifyCart} />
        },
        {
          path: "cart",
          element: <ShoppingCart cart={cartifyCart} setCart={setCartifyCart}/>
        }
    ]);

    return (<RouterProvider router={router}/>);
}

export default App
