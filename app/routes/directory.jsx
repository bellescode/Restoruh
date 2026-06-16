/* ============================================================
   FILE: app/routes/directory.jsx  -- LAYOUT ROUTE
   Gate check + DirectoryProvider + SubNav + Outlet.
   All /directory/* routes render inside this.
   ============================================================ */
import { Outlet, redirect } from "react-router";
import { DirectoryProvider } from "../components/directory/DirectoryContext";
import { DirectorySubNav }   from "../components/directory/DirectorySubNav";

export async function loader({ request }) {
  const url = new URL(request.url);

  /* Skip cookie check on the gate page itself.
     directory.gate.jsx is a child of this layout, so without this
     exception the loader redirects to /directory/gate which triggers
     this loader again -- creating an infinite redirect loop. */
  if (url.pathname === "/directory/gate") return null;

  const cookie = request.headers.get("Cookie") ?? "";
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