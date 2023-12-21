import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate} from 'react-router-dom';

import './Users.css'

import UserList from './User_List/User_List'
import BackButton from './Button/Back_Button';

const Users = ({Main_Style, User_List_Style, User_List, Back_Button_Style}) => {

    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate(-1)
    }
    return (<div class='zgw_Users' style={Main_Style}>
    <BackButton Back_Button_Style = {Back_Button_Style} handleButtonClick={handleButtonClick}/>
    <p class='focus'>关注列表</p>
    <UserList UserListStyle={User_List_Style} users={User_List}/>
    </div>
    );
}

Users.propTypes = {
    MainStyle: PropTypes.object, 
    User_List_Style: PropTypes.object,
    User_List: PropTypes.object,
    Back_Button_Style: PropTypes.object,
}

Users.defaultProps = {
    User_List_Style:{
        top: '14%',
        left: '0px',
    },

    Back_Button_Style: {top: '6%', left: '4%',}
}

export default Users;
