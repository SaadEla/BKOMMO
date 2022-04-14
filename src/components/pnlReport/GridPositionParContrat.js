import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useState} from 'react';
import products from "../uielements/fakedata.json";
import {Col, Form, Row, Select} from "antd";
import RadioBox from "../uielements/radio";
import DatePicker from "../uielements/DatePick";
import {Button} from "@progress/kendo-react-buttons";
import Title from "antd/es/skeleton/Title";
import {NumberUtil} from "../../helpers/Utils";


const GridPositionParContrat = ({data = [], children}) => {

    const [gridDataState, setGridDataState] = useState({})

    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    /*
    const checkboxColumn =
              <td>
                <input type="checkbox" checked={true} disabled="disabled" />
              </td>
  */

    function pnlStyleFunction(data, col) {
        var style = {}
        style.fontWeight = "bold";
        if (data > 0)
            style.color = "#32998C";
        else
            style.color = "#FF0000";

        return style;
    }

    return (
        <Grid
            style={{height: '100%', width: '100%'}}
            resizable={true}
            reorderable={true}
            sortable={true}
            groupable={true}
            data={[...data]}

        >
            <GridToolbar>
                <div style={{color: "rgba(19,105,180,0.9)"}}>Position par contrat</div>
            </GridToolbar>
            <Column field="ric" title="RIC"/>
            <Column field="devise" title="Devise"/>
            <Column field="sousJacent" title="Sous-Jacent"/>
            <Column field="contrat" title="Contrat"/>
            <Column
                    cell={(props) => {
                        if (props.dataItem[props.field])
                            //sens client
                            return <td className="centerAlign">
                                {
                                    (props.dataItem[props.field] == 1) ? "Vente" : "Achat"
                                }
                            </td>
                        else
                            return <td></td>;
                    }}
                    field="sens" title="Sens"/>
            <Column className="centerRight" format="{0:n2}" field="nombreContrat" title="Nombre de contrat"/>
            <Column className="centerRight" format="{0:n2}" field="quantite" title="Quantité en unité"/>
            <Column className="centerRight" format="{0:n2}" field="nominal" title="Nominal"/>
            <Column className="centerRight" format="{0:n2}" field="prixOperation" title="Prix du Forward"/>
            <Column className="centerRight" format="{0:n2}" field="marge" title="Marge"/>
            <Column className="centerRight" format="{0:n2}" field="coursCloture" title="Cours de clotûre"/>
            <Column  format="{0:n2}" field="pnl"
                    cell={(props =>
                        <td className="centerRight" style={pnlStyleFunction(props.dataItem[props.field])}>{NumberUtil.Format(props.dataItem[props.field])}</td>)}

                    title="PnL"/>

        </Grid>
        /*<Grid
            data={process(data, gridDataState)}
            sortable
            {...gridDataState}
            onDataStateChange={handleGridDataStateChange}
            resizable
            reorderable
            style={{  width: '100%' }}

            >

            {children}

        </Grid>*/
    )
}

export default GridPositionParContrat;