import React from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';
import PageHeader from '../components/utility/pageHeader';
import {BreadCrumb} from "../components/breadCrumb/BreadCrumb";


const BlankPage = () => {
    return (
      <LayoutContentWrapper style={{ height: '70vh' }}>
        <PageHeader>
            <BreadCrumb element1={'FUTURE'} style={{marginBottom: '10px'}}></BreadCrumb>
        </PageHeader>
        <LayoutContent>
          <h1>Content</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
}

export default BlankPage;
