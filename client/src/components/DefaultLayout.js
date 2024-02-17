import React from 'react'
import {useNavigate} from 'react-router-dom';
import '../resources/default-layout.css';

function DefaultLayout(props) {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('Expense Tracker- User'));

  return (
    <div className="layout">

        {/* Header */}
        <div className="header d-flex justify-content-between align-items-center">
            <div>
               <h1 className="logo">Expense Tracker</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="username">{user.name}</h1>
                <i className="logout ri-logout-box-r-line" onClick={() => {
                  localStorage.removeItem('Expense Tracker- User');
                  navigate('/login');
                }}></i>
            </div>
        </div>

        {/* Content  */}
        <div className="content">
            {props.children}
        </div>

    </div>
  )
}

export default DefaultLayout
