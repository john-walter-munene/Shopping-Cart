// Developer tools
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Application specific components
import { Home } from './components/Home.jsx';
import { ShoppingPage } from './components/Shop.jsx';
import { ShoppingCart } from './components/Cart.jsx';
import { ErrorPage } from './components/Errorpage.jsx';

// Global styles
import './assets/styles/App.css';

function App() {
    const [cartifyProducts, setCartifyProducts] = useState([]);
    const [cartifyCart, setCartifyCart] = useState([]);
    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "shop",
          element: <ShoppingPage products={cartifyProducts} setProducts={setCartifyProducts} cart={cartifyCart} setCart={setCartifyCart} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "cart",
          element: <ShoppingCart cart={cartifyCart} setCart={setCartifyCart}/>,
          errorElement: <ErrorPage />,
        }
    ]);

    return (<RouterProvider router={router}/>);
}

export default App
