import React from "react";
import "./features.css";
import {IoMdArrowDropdown,IoIosArrowDown,IoIosArrowUp} from "react-icons/io";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Feature=() =>{
    return(
        <div className="feature ">
            <div className="top">
                <h3>total revenue</h3>
                <span><IoMdArrowDropdown size={'25px'}/></span>
            </div>
            <div className="bottom">
                <div className="feature-ch">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={4}	/>
                </div>
                <div className="captch">
                        <span>total sales made today</span>
                        <span >$420</span>
                        <span>pervious transactions processing last payments may not be included</span>
                </div>
                <div className="Planning">
                        <div>
                            <span>target</span>
                            <span className="negtive"><IoIosArrowUp color={"green"}/> $12.4k</span>
                        </div>
                        <div>
                            <span>last week</span>
                            <span className="postive"><IoIosArrowDown color={"red"}/> $16.7k</span>
                        </div>
                        <div>
                            <span>last month</span>
                            <span className="postive"><IoIosArrowDown color={"red"}/> $9.9k</span>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Feature;