import React, { useState, useEffect } from "react";
import Cart from "../cart/cart";
import Chart from "../charts/chart";
import Nav_bar from "../nav_bar/Nav_bar";
import Side_bar from "../side_bar/side_bar";
import Feature from "./features/features";
import List from "../list/List";
import { Link } from "react-router-dom";
import "./Home.css";
import https from "../https";

const Home = (props) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await https.get('/admin/dashboard/stats');
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={`home ${props.color === false ? 'dark' : ''} row g-4 `}>
            <Side_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />

            <div className="contener_home g-4 mb-4" id="body">
                <Nav_bar color={props.color} handel_color={props.handel_color} handel_side={props.handel_side} />
                <div className="main_carts">
                    {stats ? (
                        <>
                            <div className="cart">
                                <Link to="/user">
                                    <Cart 
                                        type="users" 
                                        count={stats.users.total} 
                                        growth={stats.users.growth} 
                                    />
                                </Link>
                            </div>
                            <div className="cart">
                                <Link to="/order">
                                    <Cart 
                                        type="orders" 
                                        count={stats.conversions.total} 
                                        growth={stats.conversions.growth} 
                                    />
                                </Link>
                            </div>
                            <div className="cart">
                                <Link to="/">
                                    <Cart 
                                        type="earnings" 
                                        count={stats.revenue.total} 
                                        growth={stats.revenue.growth} 
                                    />
                                </Link>
                            </div>
                            <div className="cart">
                                <Link to="/">
                                    <Cart 
                                        type="balance" 
                                        count={stats.cashouts.total} 
                                        growth={stats.cashouts.growth} 
                                    />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="loading">جاري تحميل البيانات...</div>
                    )}
                </div>

                <div className="list">
                    <List color={props.color} />
                </div>
            </div>
        </div>
    );
};

export default Home
