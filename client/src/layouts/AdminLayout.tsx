import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
    return (
        <div>
            <header>
                <nav>
                    <NavLink to="/admin">Dashboard</NavLink>
                    <NavLink to="/admin/update-menu">Update Menu</NavLink>
                    <NavLink to="/admin/orders">Orders</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}