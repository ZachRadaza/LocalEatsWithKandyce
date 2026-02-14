import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
    return (
        <div className="admin-cont">
            <header>
                <nav>
                    <NavLink to="">Dashboard</NavLink>
                    <NavLink to="update-menu">Update Menu</NavLink>
                    <NavLink to="orders">Orders</NavLink>
                    <NavLink to="/">Back To Home</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}