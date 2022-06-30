import React from "react";
import "./side_bar.css";
import {  Link } from "react-router-dom";
import { useState } from "react";
import {RiDashboardFill} from "react-icons/ri";
import {FaUser,FaAddressCard,FaRegHandPaper} from "react-icons/fa";
import {BsShop} from "react-icons/bs";
import {ImTruck} from "react-icons/im";
import {CgArrowsVAlt} from "react-icons/cg";
import {IoNotifications} from "react-icons/io5";
import {BsFillCloudArrowUpFill,BsGear} from "react-icons/bs";
import {FiLogOut} from "react-icons/fi";



const Side_bar=(props)=>{

    return(
        <div className={`side_bar ${props.color==false ? 'dark': '' }`} id="side_bar" >
            <div className="hedaer">
                <div className="close" id="close" onClick={props.handel_side}>x</div>
                <span><Link to="/" >lamadmin</Link ></span>
            </div>
            <hr/>
            <div className="main">
            <ul>
                        <p>main</p>
                    <li>
                        <RiDashboardFill/>
                        <span><Link to="/">dashboard</Link></span>
                    </li>
                        <p>lists</p>
                    <li>
                        <FaUser/>
                        <span><Link to="/user">user</Link></span>
                    </li>
                    <li>
                        <BsShop/>
                        <span><Link to="/product">product</Link></span>
                    </li>
                    <li>
                        <FaAddressCard/>
                        <span><Link to="/order">order</Link></span>
                    </li>
                    <li>
                        <ImTruck/>
                        <span><Link to="/order">delevere</Link></span>
                    </li>
                        <p>useful</p>
                    <li>
                        <CgArrowsVAlt/>
                        <span>stats</span>
                    </li>
                    <li>
                        <IoNotifications/>
                        <span>notfications</span>
                    </li>
                        <p>service</p>
                    <li>
                    <BsFillCloudArrowUpFill/>
                        <span>system health</span>
                    </li>
                    <li>
                        <FaRegHandPaper/>
                        <span>logs</span>

                    </li>
                    <li>
                        <BsGear/>    
                        <span>setings</span>
                    </li>
                        <p>user</p>
                    <li>
                        <FaUser/>
                        <span><Link to="/profile">profile</Link></span>
                    </li>
                    <li>
                        <FiLogOut/>
                        <span>logout</span>
                    </li>

                </ul>
                <div className="moods_color" onClick={props.handel_color}>
                    <div className="mood">
                        
                    </div>
                    <div className="mood" onClick={ props.handel_color}>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Side_bar;