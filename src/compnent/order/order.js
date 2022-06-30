import React from "react";
import Side_bar from "../side_bar/side_bar";
import Nav from "../nav_bar/Nav_bar";
import "./order.css"
import List from "../list/List";

const Order=(props)=>{
    return(
        <div className={`order  row g-4  ${props.color ==false ? 'dark' :''}`}>
            
                <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
            
            <div  className="contener" id="body">
                    <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                    <div className="list">
                        <List/>
                    </div>
            </div>
        </div>
    )
}
export default Order;