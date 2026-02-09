import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/update-menu">Update Menu</Link>
                    <Link to="/admin/orders">Orders</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}