import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <h1>My Website</h1>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="p-4 border-t">© 2025</footer>
    </div>
  );
}
