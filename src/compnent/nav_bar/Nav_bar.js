import React from "react";
import "./Nav_bar.css";
import me from "./ma.jpg";
import {  Link } from "react-router-dom";
import { BsMoon } from "react-icons/bs";
import { FiGlobe,FiMinimize,FiMessageSquare} from "react-icons/fi";
import { FaBars,FaRegBell} from "react-icons/fa";
import {BiBell} from "react-icons/bi";



const Nav_bar=(props)=>{
    
    return(
        <div className={`nav ${props.color==false ? 'dark' : ''}`}>
            <div className="contener_nav">
                    
                        
                    <div className="right">
                        
                            <FaBars onClick={props.handel_side} size={'22'}/>
                            
                                    

                    </div>
                <div className="option">
                    <ul>
                        <li className="lan">
                            <FiGlobe size={'20px'}/>
                            <span>english</span>
                        </li>
                        <li onClick={props.handel_color}><BsMoon size={'20px'}/></li>
                        <li className="min_screen"><FiMinimize  size={'22px'} /></li>
                        <li><FaRegBell size={"22px"}/></li>
                        <li><FiMessageSquare size={"22px"}/></li>
                        <li><Link to="/profile"><img src={me} alt=""/></Link></li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}
export default Nav_bar;