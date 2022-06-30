import React from "react";
import Nav from "./../nav_bar/Nav_bar";
import Site from "./../side_bar/side_bar";
import "./New.css";
import {VscEye} from "react-icons/vsc";
import {ImUpload} from "react-icons/im";
import { useEffect, useState } from "react";

import avatar from "./avtart.jpg";
const New=(props)=>{
    const [file, setfile] = useState(false);
    const [type,settype]=useState("");
    const handel_password=()=>{
        settype(!type)
    }
    return(
        <div className={`new ${props.color ==false ? 'dark' :''}`}>
            <Site color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
            <div className="contener" id="body">
                <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                <div className="top">
                    <h1>add new user</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file): avatar} alt="" />
                    </div>
                    <div className="right">
                        <form>
                            <div className="form">
                                <div className="input_form">
                                    <label htmlFor="file" className="label_file"> image: <ImUpload className="upload"/></label>
                                    <input type="file"  id="file" onChange={e=>setfile(e.target.files[0])} style={{display:"none"}}/>
                                </div>
                                <div className="input_form">
                                    <label>Username</label>
                                    <input type="text"  placeholder="User Name"/>
                                </div>
                                <div className="input_form">
                                    <label>FullName</label>
                                    <input type="text"  placeholder="FullName"/>
                                </div>
                                <div className="input_form">
                                    <label>Email</label>
                                    <input type="email"  placeholder="Enter is Email"/>
                                </div>
                                <div className="input_form">
                                    <label>Phone</label>
                                    <input type="numper"  placeholder="+20"/>
                                </div>
                                <div className="input_form password">
                                    <label>Password</label>
                                    <input type={type==true ? 'text': "password" }  placeholder="Password" id="password"/>
                                    <VscEye onClick={handel_password} className="eye_password"/>
                                </div>
                                <div className="input_form">
                                    <label>Address</label>
                                    <input type="text"  placeholder="Address"/>
                                </div>
                                <div className="input_form">
                                    <label>Country</label>
                                    <input type="text"  placeholder="country"/>
                                </div>
                                <button>sent</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default New;