import React from "react";
import {AiOutlineUser} from "react-icons/ai";
import {FaShoppingCart,FaWallet} from "react-icons/fa";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {IoIosArrowUp} from "react-icons/io"; 

import "./cart.css"
const Cart=(props)=>{
    let data;
    switch (props.type) {
        case "users":
            data={
                title:"users",
                ismoney:false,
                count:100,
                link:"see all users",
                // 
                icone:<AiOutlineUser color={"crimson"}  style={{backgroundColor:"rgba(255,0,0,0.2)"}} className="icone"/>,
            }
            break;
            case "orders":
                data={
                    title:"orders",
                    ismoney:false,
                    count:109,
                    link:"view all orders",
                    icone:<FaShoppingCart style={{color:"goldenrod",backgroundColor:"rgba(218,165,32,0.2)"}} className="icone"/>
                    
                }
            break;
            case "earnings":
                data={
                    title:"earnings",
                    ismoney:true,
                    count:652,
                    link:"view net earnings",
                    icone:<RiMoneyDollarCircleFill style={{color:"green",backgroundColor:"rgba(0,128,0,0.2)"}} className="icone"/>,
                    
                }
            break;

            case "balance":
                data={
                    title:"balance",
                    ismoney:true,
                    count:502,
                    link:"see detalis",
                    icone:<FaWallet style={{color:"purple",backgroundColor:"rgba(128,0,128,0.2)"}} className="icone"/>,
                    
                }
            break;
    
        default:
            break;
    }
    return(
        <div className="widget">
            
                <div className="left">
                    <span className="title">{data.title}</span>
                    <span className="count"> {data.ismoney && "$"} {data.count}</span>
                    <span className="detalis">{data.link}</span>
                </div>
                <div className="right">
                    <span className="up"><IoIosArrowUp/> 20 %</span>
                    <span>{data.icone}</span>
                </div>

            
        </div>
    )
}
export default Cart;