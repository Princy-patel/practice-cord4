import { Outlet } from "react-router-dom";

function Base() {
  return (
    <>
      <h1>Hello</h1>
      <Outlet />
    </>
  );
}

export default Base;
