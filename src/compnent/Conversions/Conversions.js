import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import "./Conversions.css";
import { Link } from "react-router-dom";
import https from "../https";
import { FaExternalLinkAlt, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import { Avatar } from '@mui/material';

const Conversions = (props) => {
    const [conversions, setConversions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversions = async () => {
            try {
                const response = await https.get('/admin/conversions');
                console.log("Conversions data:", response.data);
                setConversions(response.data);
            } catch (error) {
                console.error("Error fetching conversions:", error);
                setConversions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchConversions();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { 
            field: 'txn_id', 
            headerName: 'Transaction ID', 
            width: 150 
        },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 230,
            renderCell: (params) => {
                return (
                    <Link to={`/user/${params.row.user?.id}`} className="user-link">
                        <div className="user-cell">
                            <Avatar 
                                src={params.row.user?.image || "https://via.placeholder.com/40"} 
                                alt={params.row.user?.name || "User"}
                                className="user-avatar"
                            />
                            <div className="user-info">
                                <span className="user-name">{params.row.user?.name || "Unknown User"}</span>
                                <span className="user-email">{params.row.user?.email || ""}</span>
                            </div>
                        </div>
                    </Link>
                );
            }
        },
        { 
            field: 'offer_name', 
            headerName: 'Offer', 
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="offer-cell">
                        <span className="offer-name">{params.row.offer_name || "Unknown Offer"}</span>
                        <span className="offer-id">{params.row.offer_id || ""}</span>
                    </div>
                );
            }
        },
        { 
            field: 'amount', 
            headerName: 'Amount', 
            width: 120,
            renderCell: (params) => {
                return (
                    <span className="amount">${parseFloat(params.row.amount || 0).toFixed(2)}</span>
                );
            }
        },
        { 
            field: 'payout', 
            headerName: 'Payout', 
            width: 120,
            renderCell: (params) => {
                return (
                    <span className="payout">${parseFloat(params.row.payout || 0).toFixed(2)}</span>
                );
            }
        },
        {
            field: 'created_at',
            headerName: 'Date',
            width: 150,
            renderCell: (params) => {
                if (!params.row.created_at) return <span>N/A</span>;
                
                try {
                    const date = new Date(params.row.created_at);
                    return (
                        <span>{date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    );
                } catch (error) {
                    return <span>Invalid date</span>;
                }
            }
        },
        // {
        //     field: 'action',
        //     headerName: "Actions",
        //     width: 100,
        //     renderCell: (params) => {
        //         return (
        //             <div className="conversion-actions">
        //                 <Link to={`/conversion/${params.row.id}`} className="view-btn">
        //                     <FaExternalLinkAlt /> View
        //                 </Link>
        //             </div>
        //         );
        //     }
        // }
    ];

    if (loading) {
        return (
            <div className="home">
                <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="contener_home">
                    <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                    <div className="loading">Loading conversions data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="home">
            <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
            <div className="contener_home">
                <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                
                <div className={`list ${props.color === false ? 'dark' : ''}`}>
                    <div className="conversions-header">
                        <h2 className="conversions-title">Conversions</h2>
                        <div className="conversions-stats">
                            <div className="stat-item">
                                <FaMoneyBillWave className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-value">
                                        ${conversions.reduce((sum, conv) => sum + parseFloat(conv.amount || 0), 0).toFixed(2)}
                                    </span>
                                    <span className="stat-label">Total Amount</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <FaUser className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-value">{conversions.length}</span>
                                    <span className="stat-label">Conversions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={conversions}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            checkboxSelection
                            disableSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversions;
