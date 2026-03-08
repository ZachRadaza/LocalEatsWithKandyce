import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ExtensionService } from "../utils/ExtensionService";
import "./Layout.css";

export default function AdminLayout() {
    const navClass = ({ isActive }: { isActive: boolean }) => isActive ? "nav-link active" : "nav-link";
    const navigate = useNavigate();

    async function logoutClicked(){
        const loggedOut = await ExtensionService.logout();

        if(loggedOut)
            navigate("/login");
    }

    useEffect(() => {
        checkAuth();

        async function checkAuth(){
            const loggenIn = await ExtensionService.isLoggedIn();

            if(!loggenIn)
                navigate("/login");
        }
    }, []);

    return (
        <div className="admin-cont layout">
            <header>
                <nav className="header-part">
                    <div className="logos-cont">
                        <p>logo</p>
                        <h6 className="logo-title">Local Eats with Kandyce</h6>
                    </div>
                    <NavLink to="" end className={ navClass }>
                        Orders
                    </NavLink>
                    <NavLink to="update-menu" className={ navClass }>
                        Menu
                    </NavLink>
                    <NavLink to="/" className={ navClass }>
                        Home
                    </NavLink>
                </nav>
                <div className="right-cont header-part">
                    <button 
                        id="documentation" 
                        className="btn-1 red" 
                        onClick={ () => navigate('documentation') }
                    >
                        Documentation
                    </button>
                    <button 
                        className="btn-2 green"
                        onClick={ () => logoutClicked() }
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}