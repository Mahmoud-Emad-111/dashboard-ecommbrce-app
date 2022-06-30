import React from "react";
import './product.css'
import { useEffect, useState } from "react";
import Nav from "./../nav_bar/Nav_bar";
import Site from "./../side_bar/side_bar";
import avatar from "./avtart.jpg";
import {ImUpload} from "react-icons/im";
const Product=(props)=>{
    const [file, setfile] = useState("");

    return(
        <div className={`product ${props.color==false ? 'dark': ''}` }>
            <Site color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
            <div className="contener" id="body">
                <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                <div className="top">
                    <h1>add new product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file): avatar} alt="" />
                    </div>
                    <div className="right">
                        <form>
                            <div className="form">
                                <div className="input_form">
                                    <label htmlFor="file"> image: <ImUpload className="upload"/></label>
                                    <input type="file"  id="file" onChange={e=>setfile(e.target.files[0])} style={{display:"none"}}/>
                                </div>
                                <div className="input_form">
                                    <label>Title</label>
                                    <input type="text"  placeholder="Title"/>
                                </div>
                                <div className="input_form">
                                    <label>Description</label>
                                    <input type="text"  placeholder="Description"/>
                                </div>
                                <div className="input_form">
                                    <label>Category</label>
                                    <input type="text"  placeholder="Category"/>
                                </div>
                                <div className="input_form">
                                    <label>Price</label>
                                    <input type="text"  placeholder="Price"/>
                                </div>
                                <div className="input_form">
                                    <label>Stock</label>
                                    <input type="text"  placeholder="Stock"/>
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
export default Product;