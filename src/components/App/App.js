import React, { Component } from 'react';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import PageHeader from 'emerald-ui/lib/PageHeader';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';

import logo from './logo.png';
import CagadasList from '../CagadasList';
import { CAGADAS_ROUTES } from '../../constants';
export const AppLayout = styled.div`
  text-align: left;
`;
export const AppTitle = styled.div`
  display: flex;
`;
export const Logo = styled.img`
  height: 40px;
  width: 40px;
  margin: 22px 10px;
`;
class App extends Component {
  render() {
    return (
      <AppLayout>
        <PageHeader>
          <AppTitle>
            <Logo src={logo} alt="logo" />
            <h2> CAGADAS APP</h2>
          </AppTitle>
          <PageHeader.Nav>
            <LinkContainer to={CAGADAS_ROUTES.list} eventKey={1}>
              <NavItem>CAGADAS</NavItem>
            </LinkContainer>
            <LinkContainer to={CAGADAS_ROUTES.vote} eventKey={2}>
              <NavItem>VOTE</NavItem>
            </LinkContainer>
            <LinkContainer to={CAGADAS_ROUTES.weeklyTop} eventKey={3}>
              <NavItem>WEEKLY TOP</NavItem>
            </LinkContainer>
            <LinkContainer to={CAGADAS_ROUTES.mostRanked} eventKey={4}>
              <NavItem>MOST RANKED</NavItem>
            </LinkContainer>
          </PageHeader.Nav>
        </PageHeader>
        <Grid>
          <Switch>
            <Route exact path={CAGADAS_ROUTES.list} component={CagadasList} />
            <Route path={CAGADAS_ROUTES.vote} component={CagadasList} />
            <Route path={CAGADAS_ROUTES.weeklyTop} component={CagadasList} />
            <Route path={CAGADAS_ROUTES.mostRanked} component={CagadasList} />
            <Redirect from={CAGADAS_ROUTES.root} to={CAGADAS_ROUTES.list} />
          </Switch>
        </Grid>
      </AppLayout>
    );
  }
}

export default App;
