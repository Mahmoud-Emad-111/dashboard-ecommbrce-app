import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import "./users.css";
import { Link } from "react-router-dom";
import https from "../https";

const Users = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await https.get('/admin/users');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
                // Use default data if request fails
                setData([]);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { 
            field: 'username', 
            headerName: 'User', 
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="img_name">
                        <img 
                            src={params.row.image || "https://via.placeholder.com/40"} 
                            alt="" 
                        />
                        <span>{params.row.name}</span>
                    </div>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 250 },
        { 
            field: 'wallet', 
            headerName: 'Balance', 
            width: 120,
            renderCell: (params) => {
                return (
                    <span>${params.row.wallet}</span>
                );
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            renderCell: (params) => {
                return (
                    <span className={`${params.row.status} status`}>{params.row.status}</span>
                );
            }
        },
        {
            field: 'action',
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="action">
                        <button>
                            <Link to={`/user/${params.row.id}`}>View</Link>
                        </button>
                        <button onClick={() => handleDelete(params.row.id)}>Delete</button>
                    </div>
                );
            }
        }
    ];

    if (loading) {
        return (
            <div className={`main_users ${props.color === false ? 'dark' : ''}`} id="body">
                <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="nav contener user_list_" id="body">
                    <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                    <div className="loading">Loading users data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className={`main_users ${props.color === false ? 'dark' : ''}`} id="body">
            <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
            
            <div className="nav contener user_list_" id="body"> 
                <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className={`table ${props.color === false ? 'dark' : ''}`} id="body">
                   
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        checkboxSelection
                        disableSelectionOnClick
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
