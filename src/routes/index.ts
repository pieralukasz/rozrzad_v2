import React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import Dashboard from '../views/Dashboard/Dashboard';
import Valve from '../views/Valve/Valve';
import Cam from '../views/Cam/Cam';
import Spring from '../views/Spring/Spring';
import ValveOutlet from '../views/Valve/ValveOutlet';
import ValveIntake from '../views/Valve/ValveIntake';

export interface Config extends RouteConfig {
  component:
    | React.ComponentType<RouteConfigComponentProps>
    | React.ComponentType;
}

const ROUTES: Config[] = [
  {
    path: '/',
    key: 'DASHBOARD',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/index.html',
    key: 'DASHBOARD',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/valve',
    key: 'VALVE',
    exact: false,
    component: Valve,
    routes: [
      {
        path: '/valve/outlet',
        key: 'OUTLET',
        exact: false,
        component: ValveOutlet,
      },
      {
        path: '/valve/intake',
        key: 'INTAKE',
        exact: false,
        component: ValveIntake,
      },
    ],
  },

  {
    path: '/cam',
    key: 'CAM',
    exact: false,
    component: Cam,
  },
  {
    path: '/spring',
    key: 'SPRING',
    exact: false,
    component: Spring,
  },
];

export default ROUTES;
