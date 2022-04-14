import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Transfer } from 'antd';
import { Container } from "reactstrap";
import { userColumnSelector, allColumnSelector } from '../../redux/tresoReacp/tresoRecapSlice'
import { openNotificationWithIcon } from '../../components/feedback/notification'




const UserColumns = ({ handleChangeTarget }) => {

    /* Selectors */
    let userColumns = useSelector(userColumnSelector)
    let AllColumns = useSelector(allColumnSelector)


    // add Key field -- required for Transfer Component
    const addKeyToList = (data) => {
        if (data.length > 0)
            return data.map((item) => ({
                ...item,
                key: item.id
            }));
    }
    
    AllColumns = addKeyToList(AllColumns)
    userColumns = addKeyToList(userColumns)

    const originTarget = []
    if (userColumns.length > 0) {
        userColumns.map(column => {
            originTarget.push(column.key)
        })
    }


    const handleChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys)
        handleChangeTarget(nextTargetKeys)
    };

    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {

        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };


        /* State */
        const [targetKeys, setTargetKeys] = useState(originTarget)
        const [selectedKeys, setSelectedKeys] = useState([])

    // check if list isEmpty
    //if (!AllColumns) return openNotificationWithIcon('error', "Veuillez réessayer Plutard !", '');
    return (
        <Container>
            <Transfer
                dataSource={AllColumns}
                titles={['Source', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                render={item => item.label}
            />
        </Container>
    )
}

export default UserColumns