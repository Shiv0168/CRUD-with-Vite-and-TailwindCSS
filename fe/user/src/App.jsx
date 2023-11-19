import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ViewUser from "./components/ViewUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavigationBar>
          <ViewUser />
        </NavigationBar>
      </>
    ),
  },
  {
    path: "/add",
    element: (
      <>
        <NavigationBar>
          <AddUser />
        </NavigationBar>
      </>
    ),
  },
  {
    path: "/edit/:_id",
    element: (
      <>
        <NavigationBar>
          <EditUser />
        </NavigationBar>
      </>
    ),
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
