import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import https from "../https";
import "./List.css";

const List = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentUsers = async () => {
            try {
                const response = await https.get('/admin/dashboard/recent-users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent users:", error);
                setLoading(false);
                // Use default data if request fails
                setUsers([]);
            }
        };

        fetchRecentUsers();
    }, []);

    // Transform user data to table format
    const rows = users.map(user => ({
        id: user.id,
        product: user.name,
        img: user.image || "https://via.placeholder.com/50",
        customer: user.email,
        date: new Date().toLocaleDateString(),
        amount: user.wallet,
        // method: "Wallet",
        status: user.status
    }));

    if (loading) {
        return <div className="loading">Loading user data...</div>;
    }

    return (
        <div className={`list_main ${props.color === false ? 'dark' : ''}`}>
            <span>Recent Users</span>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            {/* <TableCell>Date</TableCell> */}
                            <TableCell>Balance</TableCell>
                            {/* <TableCell>Account Type</TableCell> */}
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>
                                    <Link to={`/user/${row.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                        <img src={row.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} /> 
                                        {row.product}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.customer}</TableCell>
                                {/* <TableCell>{row.date}</TableCell> */}
                                <TableCell>${row.amount}</TableCell>
                                {/* <TableCell>{row.method}</TableCell> */}
                                <TableCell><span className={`status ${row.status}`}>{row.status}</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div className="view-all-link">
                <Link to="/user">View All Users</Link>
            </div> */}
        </div>
    );
};

export default List;
