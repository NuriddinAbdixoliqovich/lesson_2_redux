import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "../UI/Drawer";

export default function MainLayout() {
  return (
    <MiniDrawer>
      <Outlet />
    </MiniDrawer>
  );
}
