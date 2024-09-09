import {createBrowserRouter, RouterProvider as BaseRouterProvider,} from "react-router-dom";
import Root from "../routes/Root.tsx";
import App from "../App.tsx";


const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />
      }
    ]
  },
]);

export const RouterProvider = () => {


  return (
      <BaseRouterProvider router={router} />
  )
}