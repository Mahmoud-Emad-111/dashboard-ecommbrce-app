import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import "./users.css"
import img from "./ma.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
const Users=(props)=>{
    
const rows = [
    {id:1,user:"Mahmoud",age:19,status:'active',email:"mahmoud@gmail.com",img:img},
    { id: 2,  user: 'snow', age: 42,status:"passive",email:"1snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 3,  user: 'snow', age: 52,status:"passive",email:"2snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 4,  user: 'snow', age: 28,status:"pending",email:"3snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 5,  user: 'snow', age: 46,status:"passive",email:"4snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 6,  user: 'snow', age: 36,status:"passive",email:"5snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 7,  user: 'snow', age: 34,status:"passive",email:"6snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 8,  user: 'snow', age: 57,status:"pending",email:"7snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
    { id: 9,  user: 'snow', age: 37,status:"pending",email:"8snow@gmail.com",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3BIe66j84HAfRpFw6ClDYOR-EMlOLX_X-g&usqp=CAU' },
  
  
  ];
  
    const [data, setDATA]=useState(rows);
    
    const handel_delete=(e)=>{
        setDATA(data.filter((item)=> item.id !== e))

    }
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'User', width: 230,renderCell:(data)=>{
      return(
          <div className="img_name">
              <img src={data.row.img} alt="" />
              <span>{data.row.user}</span>
          </div>

      )
  } },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'age', headerName: 'Age', width: 120 },
    
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
    renderCell:(data)=>{
        return(
            <span className={`${data.row.status} status`}>{data.row.status}</span>
        )
    }
  },
  {field:'action',headerName:"Action",width:200,
    renderCell:(props)=>{
        return(
                
            <div className="action">
                <button><Link to="/profile">View</Link></button>
                <button key={rows.id} onClick={()=>handel_delete(props.row.id)}>Delete</button>
            </div>
        )
    }

    }
];
    return(
        <div className={`main_users ${props.color==false ? 'dark' : ''}`} id="body">
            
                <Side_bar color={props.color}  handel_color={props.handel_color} handel_side={props.handel_side}/>
            
            <div className="nav contener user_list_" id="body"> 
                <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side}/>
                <div className={`table ${props.color==false ? 'dark' : ''}`} id="body">
                    <div className="add_new_user">
                        <span className="title">add new user</span>
                        <span><Link to="/new">add new</Link></span>
                    </div>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[2]}
                        checkboxSelection
                    />
                </div>
           
           
           
            </div>
            
      </div>
    )
}
export default Users;