import React from "react";
import "./UsersList.css";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UsersList = ({ users, color }) => {
    return (
        <div className={`users-list ${color === false ? 'dark' : ''}`}>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>المستخدم</th>
                        <th>البريد الإلكتروني</th>
                        <th>تاريخ التسجيل</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="user-cell">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                                ) : (
                                    <div className="user-avatar-placeholder">
                                        <FaUser />
                                    </div>
                                )}
                                <span>{user.name}</span>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {format(new Date(user.createdAt), "dd MMM yyyy", { locale: ar })}
                            </td>
                            <td>
                                <Link to={`/user/${user.id}`} className="view-btn">
                                    عرض
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="view-all">
                <Link to="/user">عرض كل المستخدمين</Link>
            </div>
        </div>
    );
};

export default UsersList;