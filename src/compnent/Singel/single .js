import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../nav_bar/Nav_bar";
import Side from "./../side_bar/side_bar";
import "./single.css";
import Chart from "./../charts/chart";
import https from "../https";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl } from '@mui/material';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const Single = (props) => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await https.get(`/admin/users/${id}`);
                // التأكد من أن البيانات تحتوي على المصفوفات المطلوبة
                const data = {
                    ...response.data,
                    conversions: response.data.conversions || [],
                    cashouts: response.data.cashouts || []
                };
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
        
        // إضافة cleanup function لمنع تسرب الذاكرة
        return () => {
            // إلغاء أي عمليات غير مكتملة
        };
    }, [id]);

    // Clear notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (message, type) => {
        setNotification({ message, type });
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
            setUserData(prevData => {
                const updatedCashouts = prevData.cashouts.map(cashout => 
                    cashout.id === cashoutId 
                        ? { ...cashout, status: newStatus } 
                        : cashout
                );
                
                return {
                    ...prevData,
                    cashouts: updatedCashouts
                };
            });
            
            // Show custom notification based on status
            let message = '';
            switch(newStatus) {
                case 'approved':
                    message = 'Cashout approved!';
                    break;
                case 'completed':
                    message = 'Cashout completed!';
                    break;
                case 'processing':
                    message = 'Cashout processing!';
                    break;
                case 'rejected':
                    message = 'Cashout rejected!';
                    break;
                case 'pending':
                    message = 'Cashout pending!';
                    break;
                default:
                    message = 'Status updated!';
            }
            
            showNotification(message, newStatus === 'rejected' ? 'error' : 'success');
            
        } catch (error) {
            console.error("Error updating cashout status:", error);
            showNotification('Update failed!', 'error');
        } finally {
            setStatusUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className={`main_single row g-4 ${props.color === false ? 'dark' : ''}`}>
                <Side color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="contener" id='body'>
                    <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                    <div className="loading">Loading user data...</div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={`main_single row g-4 ${props.color === false ? 'dark' : ''}`}>
                <Side color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="contener" id='body'>
                    <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                    <div className="error-message">User not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className={`main_single row g-4 ${props.color === false ? 'dark' : ''}`}>
            {notification && (
                <div className={`custom-notification ${notification.type}`}>
                    {notification.message}
                    <button onClick={() => setNotification(null)}>×</button>
                </div>
            )}
            <Side color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
            <div className="contener" id='body'>
                <Nav color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="top row g-4 mb-4">
                    <div className="profile">
                        <h3>User Information</h3>
                        <div className="main">
                            <div className="img">
                                <img src={userData.image || "https://via.placeholder.com/150"} alt={userData.name} />
                                <span className={`status-badge ${userData.status}`}>{userData.status}</span>
                            </div>
                            <div className="data">
                                <h4>{userData.name}</h4>
                                <p><span>Email:</span> <span className="my_gmail">{userData.email}</span></p>
                                <p><span>Balance:</span> ${userData.wallet}</p>
                                <p><span>Total Earnings:</span> ${userData.total_earnings}</p>
                                <p><span>Status:</span> <span className={`status ${userData.status}`}>{userData.status}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="chart">
                        <h2>Last 6 Months (Revenue)</h2>
                        <Chart aspect={3 / 1} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="transactions-section">
                        <h3>Recent Conversions</h3>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="conversions table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Transaction ID</TableCell>
                                        <TableCell>Offer Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Payout</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData.conversions && userData.conversions.length > 0 ? (
                                        userData.conversions.map((conversion) => (
                                            <TableRow key={conversion.id}>
                                                <TableCell>{conversion.id}</TableCell>
                                                <TableCell>{conversion.txn_id}</TableCell>
                                                <TableCell>{conversion.offer_name}</TableCell>
                                                <TableCell>${conversion.amount}</TableCell>
                                                <TableCell>${conversion.payout}</TableCell>
                                                <TableCell>
                                                    {conversion.created_at 
                                                        ? format(new Date(conversion.created_at), "MMM dd, yyyy") 
                                                        : "N/A"}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">No conversions found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    
                    <div className="cashouts-section">
                        <h3>Recent Cashouts</h3>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="cashouts table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Wallet</TableCell>
                                        <TableCell>Account</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData.cashouts && userData.cashouts.length > 0 ? (
                                        userData.cashouts.map((cashout) => (
                                            <TableRow key={cashout.id}>
                                                <TableCell>{cashout.id}</TableCell>
                                                <TableCell>{cashout.wallet}</TableCell>
                                                <TableCell>{cashout.account}</TableCell>
                                                <TableCell>${cashout.amount}</TableCell>
                                                <TableCell>
                                                    <span className={`status ${cashout.status}`}>{cashout.status}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {cashout.created_at 
                                                        ? format(new Date(cashout.created_at), "MMM dd, yyyy") 
                                                        : "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl variant="outlined" size="small" className="status-select-container">
                                                        <Select
                                                            value={cashout.status}
                                                            onChange={(e) => handleStatusChange(cashout.id, e.target.value)}
                                                            disabled={statusUpdating}
                                                            className={`status-select ${cashout.status}`}
                                                        >
                                                            <MenuItem value="pending" className="status-option pending">Pending</MenuItem>
                                                            <MenuItem value="approved" className="status-option approved">Approved</MenuItem>
                                                            <MenuItem value="processing" className="status-option processing">Processing</MenuItem>
                                                            <MenuItem value="completed" className="status-option completed">Completed</MenuItem>
                                                            <MenuItem value="rejected" className="status-option rejected">Rejected</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">No cashouts found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;
