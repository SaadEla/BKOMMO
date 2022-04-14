import { process } from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Col, Row, Spin} from "antd";

import {
    UtilisateursDetailLoadingSelector,
    UtilisateursListLoadingSelector
} from "../../../redux/Administration/utilisateurs/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/Administration/utilisateurs/utilisateursSlice";
import {Button} from "@progress/kendo-react-buttons";
import UserService from "../../../keycloak/UserService";


const DataGrid = ({ajouter,actualiser,selectedRow,heightGrid = '700px', utilisateursList=[], handleRowDoubleClick}) => {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const utilisateursLoading = useSelector(UtilisateursListLoadingSelector);


    useEffect(function () {
        if(utilisateursList && utilisateursList.length>0)
        setDataGrid([...utilisateursList])
    }, [utilisateursList])

    useEffect(function () {
        //setSelectedID(selectedRow)
    },[selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid.map(item=>{
            return {
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({...item,
                selected: item.utilisateurId === (selectedID && selectedID.utilisateurId)}));
    }

    function handleOnRowClick(e) {
        setSelectedID(e.dataItem);
        dispatch(selectingGridRow(e.dataItem))
    }

 
    return (
        <Spin spinning={utilisateursLoading } size="large">
            <Grid
            style={{height: '67vh', width: '104%', marginLeft: '-2%'}}
            resizable
            reorderable
            data={prepareDataGrid(dataGrid)}
            skip={skip}
            take={take}
            total={dataGrid.length}
            pageable={true}
            onPageChange={pageChange}
            sortable
            sort={sort}
            onSortChange={(e) => {
                setSort(e.sort);
            }}
            selectedField="selected"
            onRowClick={(e) => handleOnRowClick(e)}
            onRowDoubleClick={e => handleRowDoubleClick(e)}

            >
                <GridToolbar>
                    <Row>
                        {/*< Col span={6}>*/}
                        {/*    <div style={{ width: '586px', marginRight: '510px'}}>*/}

                        {/*        <h3> Liste des Utilisateurs </h3>*/}

                        {/*    </div>*/}
                        {/*</Col>*/}
                        <Col span={3}>
                            <Button onClick={actualiser} icon="refresh" className="btn-header-style"
                                    primary={true} look="bare">Actualiser</Button>

                        </Col>

                        {
                            UserService.hasRole("ADMINISTRATION") &&
                            <Col span={6}>
                                <Button onClick={ajouter} icon="add" className="btn-header-style"
                                        primary={true} look="bare">Ajouter</Button>

                            </Col>
                        }


                    </Row>
                </GridToolbar>
                <Column field="nom" title="Nom" />
                <Column field="prenom" title="Prénom"  />
                <Column field="login" title="Login" />
                <Column field="mail" title="E-mail" />
                <Column field="groupe.libelleGroupe" title="Groupe" />
            </Grid>
        </Spin>
    ) 
}

export default DataGrid;