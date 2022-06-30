import React from "react";
import Cart from "../cart/cart";
import Chart from "../charts/chart";
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import Feature from "./features/features";
import List from "../list/List";
import { Link } from "react-router-dom";
import "./Home.css"
const Home=(props)=>{

    return(
        <div className={`home ${props.color===false ? 'dark' : ''} row g-4 `}>
            
                <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>

            
            <div className="contener_home  g-4 mb-4" id="body">
                <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                <div className="main_carts  ">

                    <div className="cart"><Link to="/user"><Cart type="users"/></Link></div>
                    <div className="cart "><Link to="/order"><Cart type="orders"/></Link></div>
                    <div className="cart "><Link to="/"><Cart type="earnings"/></Link></div>
                    <div className="cart "><Link to="/"><Cart type="balance"/></Link></div>
                </div>
                <div className="charts row g-4 mb-4">
                    <Feature/>
                    <Chart/>
                </div>
                <div className="list">
                    <List color={props.color}/>
                </div>
            </div>
        </div>
    )
}
export default Home