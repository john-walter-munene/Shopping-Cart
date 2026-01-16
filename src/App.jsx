import { createBrowserRouter, RouterProvider } from 'react-router';

import { Home } from './components/home/Home';
import { ShoppingPage } from './components/shop/Shop';
import { ShoppingCart } from './components/cart/Cart';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "shop",
      element: <ShoppingPage />
    },
    {
      path: "cart",
      element: <ShoppingCart />
    }
]);

function App() {

  return (<RouterProvider router={router}/>);
}

export default App
