import React from "react";
import Nav from"./../nav_bar/Nav_bar";
import Side from "./../side_bar/side_bar"
import "./single.css"
import img from "./ma.jpg";
import Chart from "./../charts/chart"
import List from "../list/List";
const Single=(props)=>{
    console.log(props)
    return(
        <div className={`main_single row g-4  ${props.color==false ? 'dark':''}`}>
            
                <Side color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
            
            <div className="contener" id='body'>
                <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                <div className="top row g-4 mb-4">
                        <div className="profile">
                            <h3>information</h3>
                            <div className="main">
                                <div className="img">
                                    <img src={img} alt="" />
                                    
                                </div>
                                <div className="data">
                                    <h4>mahmoud emad</h4>
                                    <p ><span>Emali:</span> <span className="my_gmail">mahmoud.devops@gmali.com</span></p>
                                    <p ><span>Phone:</span> 01220458853</p>
                                    <p ><span>Address:</span> Elsharqia/zgazig</p>
                                    <p ><span>Country:</span> EGYPT</p>
                                
                                
                                
                                </div>
                            
                                    
                            </div>
                        </div>
                        <div className="chart">
                            <h2>last 6 month (revenue)</h2>
                            <Chart aspect={3/1}/>
                        </div>
                </div>
                <div className="bottom">
                    <List/>
                </div>
            </div>
        </div>
    )
}
export default Single;