import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/non-admin/Home';
import Menu from './pages/non-admin/Menu';
import About from './pages/non-admin/About';
import Cart from './pages/non-admin/Cart';
import Orders from './pages/admin/Orders';
import UpdateMenu from './pages/admin/UpdateMenu';
import NotFound from './pages/non-admin/NotFound';
import Documentation from './pages/admin/Documentation';
import './App.css';

function App() {
    return (
        <Routes>
            <Route element={ <RootLayout /> }>
                <Route path="/" element={ <Home />} />
                <Route path="/about" element={ <About /> } />
                <Route path="/menu" element={ <Menu /> } />
                <Route path="/cart" element={ <Cart/> } />
            </Route>

            <Route path="admin" element={ <AdminLayout /> }>
                <Route index element={ <Orders /> } />
                <Route path="update-menu" element={ <UpdateMenu /> } />
                <Route path="documentation" element={ <Documentation /> } />
            </Route>

            <Route path="*" element={ <NotFound />} />
        </Routes>
    );
}

export default App;
