import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./compnent/Home/Home";
import New from "./compnent/New/New";
import Single from "./compnent/Singel/single ";
import Users from "./compnent/users/users";
import Product from "./compnent/product/product";
import Order from "./compnent/order/order";
import { useState } from "react";
import './App.css';
import Cashout from "./compnent/Cashout/Cashout";
import Conversions from "./compnent/Conversions/Conversions";

function App() {
    const [color, setcolor] = useState(true);
    const [side, setside] = useState(false);

    const handel_color = () => {
        setcolor(!color);
    };

    const handel_side = () => {
        setside(!side);
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home color={color} handel_color={handel_color} side={side} handel_side={handel_side} />} />
                    <Route path="/user" element={<Users color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/user/:id" element={<Single color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/profile" element={<Single color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="new" element={<New color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/product" element={<Product color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/order" element={<Order color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/Cashout" element={<Cashout color={color} handel_color={handel_color} handel_side={handel_side} />} />
                    <Route path="/Conversions" element={<Conversions color={color} handel_color={handel_color} handel_side={handel_side} />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
