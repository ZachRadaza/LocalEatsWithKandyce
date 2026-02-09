import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/menu">Menu</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}