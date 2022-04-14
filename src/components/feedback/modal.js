import React from 'react'
import DragM from "dragm";
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons'
import confirm from "antd/es/modal/confirm";
class BuildTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
        console.log(this.props.className)
        this.modalDom = document.getElementsByClassName(
            this.props.className || "ant-modal-wrap" //modal的class是ant-modal
        )[0];
    }
    render() {
        const { title } = this.props;
        return (
            <DragM updateTransform={this.updateTransform}>
                <div>{title}</div>
            </DragM>
        );
    }
}

export default function CustomDialog(props) {
    const title = (
        <BuildTitle visible={true} className={props.className} title={props.title} />
    );
    return(
        <Modal
            maskClosable={false}
            {...{...props,title}}
        >
            {props.children}
        </Modal>
    )
}

//delete confirm
export function showDeleteConfirm(onOk,onCancel) {
    confirm({
        title: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Oui',
        okType: 'danger',
        cancelText: 'Non',
        onOk,
        onCancel,
    });
}