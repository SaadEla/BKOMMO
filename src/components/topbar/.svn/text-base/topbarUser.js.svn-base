import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Popover from '../uielements/popover';
import userpic from '../../image/user2.png';
import TopbarDropdownWrapper from './topbarDropdown.style';
import UserService from "../../keycloak/UserService";
import config from "../../config";

const TopbarUser = (props) => {
    const [visible, setVisible] = useState(false);

    const username = UserService.getUsername();


    const handleVisibleChange = () => {
        setVisible(!visible);
    }

    const logout = () => {
       // UserService.doLogout();
        localStorage.removeItem("user");
        window.location.assign(config.appCatalogueUrl);
    }
    const editProfil = () => {
       // UserService.doLogout();
      //  localStorage.removeItem("user");
      //  window.open(UserService.getAccountUrl(), '_blank');
         window.location.assign(UserService.getAccountUrl());
    }


    const content = (
            <TopbarDropdownWrapper className="isoUserDropdown">
                <Link to="" className="isoDropdownLink">
                    <b>{username.toUpperCase()}</b>
                </Link>
                <Link  to="#" className="isoDropdownLink" onClick={editProfil}>
                    Editer mon profil
                </Link>
                <Link to="#" className="isoDropdownLink" onClick={logout}>
                    Déconnexion
                </Link>
            </TopbarDropdownWrapper>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            arrowPointAtCenter={true}
            placement="bottomLeft"
        >
            <div className="isoImgWrapper">
                <img alt="user" src={userpic}/>
                <span className="userActivity online"/>
            </div>
        </Popover>
    );
}
export default TopbarUser;
