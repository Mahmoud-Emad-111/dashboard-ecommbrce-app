import React from "react";
import {AiOutlineUser} from "react-icons/ai";
import {FaShoppingCart,FaWallet} from "react-icons/fa";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io"; 

import "./cart.css"
const Cart=(props)=>{
    let data;
    // استخدام القيم الافتراضية إذا لم يتم تمرير البيانات
    const count = props.count !== undefined ? props.count : 0;
    const growth = props.growth !== undefined ? props.growth : 0;
    
    switch (props.type) {
        case "users":
            data={
                title:"users",
                ismoney:false,
                count: count,
                link:"see all users",
                growth: growth,
                icone:<AiOutlineUser color={"crimson"}  style={{backgroundColor:"rgba(255,0,0,0.2)"}} className="icone"/>,
            }
            break;
            case "orders":
                data={
                    title:"conversions",
                    ismoney:false,
                    count: count,
                    link:"view all orders",
                    growth: growth,
                    icone:<FaShoppingCart style={{color:"goldenrod",backgroundColor:"rgba(218,165,32,0.2)"}} className="icone"/>
                    
                }
            break;
            case "earnings":
                data={
                    title:"revenue",
                    ismoney:true,
                    count: count,
                    link:"view net earnings",
                    growth: growth,
                    icone:<RiMoneyDollarCircleFill style={{color:"green",backgroundColor:"rgba(0,128,0,0.2)"}} className="icone"/>,
                    
                }
            break;

            case "balance":
                data={
                    title:"cashouts",
                    ismoney:false,
                    count: count,
                    link:"see detalis",
                    growth: growth,
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
                    <span className={growth >= 0 ? "up" : "down"}>
                        {growth >= 0 ? <IoIosArrowUp/> : <IoIosArrowDown/>} {Math.abs(growth)} %
                    </span>
                    <span>{data.icone}</span>
                </div>

            
        </div>
    )
}
export default Cart;
