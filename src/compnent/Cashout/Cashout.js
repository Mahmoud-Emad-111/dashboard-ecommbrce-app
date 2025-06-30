import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import "./Cashout.css";
import { Link } from "react-router-dom";
import https from "../https";
import { FaPaypal, FaCreditCard, FaWallet, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { Select, MenuItem, FormControl, Avatar } from '@mui/material';

const Cashout = (props) => {
    const [cashouts, setCashouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchCashouts = async () => {
            try {
                const response = await https.get('/admin/cashouts');
                setCashouts(response.data);
            } catch (error) {
                console.error("Error fetching cashouts:", error);
                setCashouts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCashouts();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleStatusChange = async (cashoutId, newStatus) => {
        if (statusUpdating) return;
        
        try {
            setStatusUpdating(true);
            
            // Call API to update cashout status
            await https.post(`/admin/cashouts/${cashoutId}/status`, {
                status: newStatus
            });
            
            // Update local state to reflect the change
            setCashouts(prevCashouts => 
                prevCashouts.map(cashout => 
                    cashout.id === cashoutId 
                        ? { ...cashout, status: newStatus } 
                        : cashout
                )
            );
            
            // Show notification
            showNotification(`Cashout ${newStatus}!`, newStatus === 'rejected' ? 'error' : 'success');
            
        } catch (error) {
            console.error("Error updating cashout status:", error);
            showNotification('Update failed!', 'error');
        } finally {
            setStatusUpdating(false);
        }
    };

    const getWalletIcon = (wallet) => {
        switch (wallet) {
            case 'paypal':
                return <FaPaypal className="wallet-icon paypal" />;
            case 'visa':
                return <FaCreditCard className="wallet-icon visa" />;
            default:
                return <FaWallet className="wallet-icon" />;
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 230,
            renderCell: (params) => {
                return (
                    <Link to={`/user/${params.row.user?.id}`}>

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
            field: 'wallet', 
            headerName: 'Wallet', 
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="wallet-info">
                        {getWalletIcon(params.row.wallet)}
                        <span className="wallet-type">{params.row.wallet || "Unknown"}</span>
                        {params.row.account && (
                            <span className="wallet-account">({params.row.account})</span>
                        )}
                    </div>
                );
            }
        },
        {
            field: 'created_at',
            headerName: 'Date',
            width: 160,
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
     
        {
            field: 'action',
            headerName: "Actions",
            width: 220,
            renderCell: (params) => {
                return (
                    <div className="cashout-actions">
                        <FormControl variant="outlined" size="small" className="status-select-container">
                            <Select
                                value={params.row.status || "pending"}
                                onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                                disabled={statusUpdating}
                                className={`status-select ${params.row.status || "pending"}`}
                            >
                                <MenuItem value="pending" className="status-option pending">Pending</MenuItem>
                                <MenuItem value="approved" className="status-option approved">Approved</MenuItem>
                                <MenuItem value="processing" className="status-option processing">Processing</MenuItem>
                                <MenuItem value="completed" className="status-option completed">Completed</MenuItem>
                                <MenuItem value="rejected" className="status-option rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                       
                    </div>
                );
            }
        }
    ];

    if (loading) {
        return (
            <div className="home">
                <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="contener_home">
                    <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                    <div className="loading">Loading cashouts data...</div>
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
                    <h2 className="cashouts-title">Cashout Requests</h2>
                    
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={cashouts}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            checkboxSelection
                            disableSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </div>
                </div>
                
                {notification && (
                    <div className={`custom-notification ${notification.type}`}>
                        <div className="notification-content">
                            <div className="notification-icon">
                                {notification.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                            </div>
                            <div className="notification-message">
                                {notification.message}
                            </div>
                        </div>
                        <button onClick={() => setNotification(null)}>
                            <FaTimes />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cashout;
