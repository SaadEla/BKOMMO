import styled from 'styled-components';
import layoutWrapper from '../../components/utility/layoutWrapper';



export const DateWrapper = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    width: 100%;
    background-color: #fff;
    border-radius: 15px 0px 15px 0px; /* top left, top right, bottom right, bottom left */

    svg {
        cursor: pointer;
        color : #24386d;
        margin-right: 10px;
    }

    .k-datepicker {
        border-color: #24386d;
        border-width: 0;
        width: 200px;
    }
    
    .k-datepicker .k-picker-wrap {
        padding: 3px 10px;
        border-radius: 20px;
        border: 1px solid #24386d;
        width: 85%;
    }
    
    .k-datepicker .k-picker-wrap .k-select {
        border-radius: 15px;
        background-color: #fff;
    }
`

export const MenuWrapper = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 50px;
    width: 100%;
`

export const TresoDetailWrapper = styled.div`
padding: 20px 20px;
width: 100%;
display: flex;
flex-flow: row wrap;
overflow: hidden;
justify-content: space-around;
`

export const InputWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
white-space:nowrap;
padding: 3px;

label {
    text-align: right;
    margin-right: 15px;
    width: 100px;
}
input {
    width: 170px;
    border-radius: 20px;
}
`

export const InputSumWrapper = styled.div`
    input{
        height: ${props => props.height || "150px"};
        border-radius: 20px;
    }
}
`

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    white-space:nowrap;
    .ant-row {
        margin-bottom: 10px;
    }
}
`

export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    white-space:nowrap;
}
`
