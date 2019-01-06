import React from 'react';
import AdminNav from '../components/admin/nav/AdminNav';

const AdminLayout = (props) => {
    return (
        <div className="admin_container">
            <nav className="admin_left_nav">
                <AdminNav></AdminNav>
            </nav>
            <div className="admin_right">
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;