/* ============================================================
   FILE: app/routes/directory.jsx  -- LAYOUT ROUTE
   Gate check + DirectoryProvider + SubNav + Outlet.
   All /directory/* routes render inside this.
   ============================================================ */
import { Outlet, redirect } from "react-router";
import { DirectoryProvider } from "../components/directory/DirectoryContext";
import { DirectorySubNav }   from "../components/directory/DirectorySubNav";

export async function loader({ request }) {
  const cookie = request.headers.get("Cookie") ?? "";
  /* Redirect to gate if not subscribed */
  if (!cookie.includes("ruh_dir=1")) {
    return redirect("/directory/gate");
  }
  return null;
}

export default function DirectoryLayout() {
  return (
    <DirectoryProvider>
      <DirectorySubNav />
      <Outlet />
    </DirectoryProvider>
  );
}
