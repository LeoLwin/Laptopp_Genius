import React from 'react'
import Test from './Test'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import  Dashboard  from './components/Dashboard';
import Advertising from './components/advertising/Advertising';
import ProductsList from './components/ProductsList';


const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/productsList" element={<ProductsList />} />
                    <Route path="/products" element={<Products />} />

                    <Route path="/advertising" element={<Advertising />} />

                    {/* <Route path="/table/:id/update" element={<SeatUpdate />} /> */}
                    {/* <Route path="/service/create" element={<ServiceCreate />} /> */}
                    {/* <Route path="/categories/create" element={<CategoryCreate />} /> */}
                    {/* <Route path="/categories/:id/update" element={<CategoryUpdate />} /> */}
                    {/* <Route path="/meal/create" element={<MealCreate />} /> */}
                    {/* <Route path="/meal/:id/update" element={<MealsUpdate />} /> */}
                </Routes>
            </Router>
            {/* <Test /> */}
        </>
    )
}

export default App