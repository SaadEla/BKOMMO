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


const GridPositionParDevise = ({data=[], children}) => {

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
            style={{height: '100%', width: '50%'}}
            resizable
            reorderable
            sortable={true}
            data={[...data]}

        >
            <GridToolbar>
                <div style={{color:"rgba(19,105,180,0.9)"}}>Position par devise</div>
            </GridToolbar>
            <Column className="centerAlign" field="devise" title="Devise"/>
            <Column  className="centerRight" format="{0:n2}" field="nominal" title="Nominal"/>
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

export default GridPositionParDevise;