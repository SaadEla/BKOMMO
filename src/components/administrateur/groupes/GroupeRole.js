import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import {Checkbox, Col, Form, Radio, Row, Select} from "antd";



export default function GroupesRole({exporter,form,onChange}) {


const MyItemRender = props => {
    let item = props.dataItem;
    return (
        <div className='row p-2 border-bottom align-middle' style={{ margin: 0}}>
          
            <div className='col-6'>

                <Checkbox color='#2181da'> {'dddd'} </Checkbox>
            </div>
        </div>
    );
}

class App extends React.Component {
    render() {
        return (
            <div>
                <ListView
                    data={[]}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <React.Fragment>
        <App/>
    
    </React.Fragment>, document.querySelector('my-app')
);
}
