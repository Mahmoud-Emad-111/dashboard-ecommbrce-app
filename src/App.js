import React from "react";
import { Route,BrowserRouter, Routes } from "react-router-dom";
import Home from "./compnent/Home/Home";
import New from "./compnent/New/New";
import Single from "./compnent/Singel/single ";
import Users from "./compnent/users/users";
import Product from "./compnent/product/product";
import Order from "./compnent/order/order";
import { useState } from "react";
import './App.css';

const App=()=>{
    const [color,Setcolor]=useState(true);
    const [side,Setside]=useState(true);
    const handel_color=()=>{
        Setcolor(!color)
    }
    const handel_side=()=>{
        const body=document.getElementById('body');
        const s= document.getElementById('side_bar');
        const close=document.getElementById('close')
       if(side==true){
            s.style='display: block;width:250px;backgroundColor:red;position: fixed';
            body.classList.add('body_active');
            close.style='display: block';
       }
       else{
            s.style='display: none';
            body.classList.remove('body_active')
            close.style='display: block';
       }
       Setside(!side)

    }
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home color={color} handel_color={handel_color} side={side} handel_side={handel_side}/>}/>
                    <Route path="/user" element={<Users color={color} handel_color={handel_color} handel_side={handel_side}/>}/>
                    <Route path="/profile" element={<Single color={color} handel_color={handel_color} handel_side={handel_side}/>}/>
                    <Route path="new" element={<New color={color} handel_color={handel_color}  handel_side={handel_side}/>}/>
                    <Route path="/product" element={<Product color={color} handel_color={handel_color} handel_side={handel_side}/>}/>
                    <Route path="/order" element={<Order color={color} handel_color={handel_color} handel_side={handel_side}/>}></Route>
                    
                </Routes>
            </BrowserRouter>
        </div>

    )   
}
export default App;