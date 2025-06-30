import React from "react";
import "./CashoutsList.css";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";
import { FaUser, FaPaypal, FaUniversity } from "react-icons/fa";

const CashoutsList = ({ cashouts, color }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "status-pending";
            case "completed":
                return "status-completed";
            case "rejected":
                return "status-rejected";
            default:
                return "";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return "معلق";
            case "completed":
                return "مكتمل";
            case "rejected":
                return "مرفوض";
            default:
                return status;
        }
    };

    const getWalletIcon = (wallet) => {
        switch (wallet) {
            case "paypal":
                return <FaPaypal />;
            case "bank":
                return <FaUniversity />;
            default:
                return null;
        }
    };

    return (
        <div className={`cashouts-list ${color === false ? 'dark' : ''}`}>
            <table className="cashouts-table">
                <thead>
                    <tr>
                        <th>المستخدم</th>
                        <th>المبلغ</th>
                        <th>طريقة السحب</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {cashouts.map((cashout) => (
                        <tr key={cashout.id}>
                            <td className="user-cell">
                                {cashout.user.avatar ? (
                                    <img src={cashout.user.avatar} alt={cashout.user.name} className="user-avatar" />
                                ) : (
                                    <div className="user-avatar-placeholder">
                                        <FaUser />
                                    </div>
                                )}
                                <span>{cashout.user.name}</span>
                            </td>
                            <td className="amount">${cashout.amount.toFixed(2)}</td>
                            <td className="wallet">
                                <span className="wallet-icon">{getWalletIcon(cashout.wallet)}</span>
                                <span className="wallet-account">{cashout.account}</span>
                            </td>
                            <td>
                                {format(new Date(cashout.date), "dd MMM yyyy", { locale: ar })}
                            </td>
                            <td>
                                <span className={`status ${getStatusClass(cashout.status)}`}>
                                    {getStatusText(cashout.status)}
                                </span>
                            </td>
                            <td>
                                <Link to={`/cashout/${cashout.id}`} className="view-btn">
                                    عرض
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="view-all">
                <Link to="/cashouts">عرض كل طلبات السحب</Link>
            </div>
        </div>
    );
};

export default CashoutsList;