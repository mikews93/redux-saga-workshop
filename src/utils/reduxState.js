// Functions that access redux store

import {
  CREDENTIALING_ROUTES,
  EDUCATION_ROUTES,
  EMPLOYEES_ROUTES,
  FEATURES,
  REPORTS_ROUTES,
  UNAUTHORIZED_FEATURES_BY_ROLE,
  HR_ROUTES
} from '../constants';
import loggedInUserselectors from '../store/loggedInUser/reducers/selectors';
import employerSelectors from '../store/employer/reducers/selectors';
import { store } from '../store/configureStore';
import { isEnabled as featureToggleIsEnabled } from '../featureToggles';

/**
 * Returns a boolean that indicates whether a user is granted to use a certain feature of the website
 *
 * @param {string} feature
 *
 * @returns {boolean}
 */
export const isUserAllowed = feature => {
  const state = store.getState();
  const role = loggedInUserselectors(state).getUserRole();
  const granted = UNAUTHORIZED_FEATURES_BY_ROLE[role].some(
    value => value === feature
  );

  return !granted;
};

/**
 * Returns an array that indicates which routes the user is denied access
 *
 * @returns {array}
 */
export const getUnauthorizedRoutesBySettings = () => {
  const state = store.getState();
  const employer = employerSelectors(state);

  const [hasAccessToNotes, hasAccessToDocuments] = [
    employer.getEmployeeNotesFlag(),
    employer.getEmployeeDocumentsFlag()
  ];

  const unauthorizedRoutes = [];

  if (!hasAccessToNotes) {
    unauthorizedRoutes.push(EMPLOYEES_ROUTES['employeeNotes']);
  }
  if (!hasAccessToDocuments) {
    unauthorizedRoutes.push(EMPLOYEES_ROUTES['employeeDocuments']);
  }

  return unauthorizedRoutes;
};

export const getAppsConfig = () => {
  const { REACT_APP_EC_PREHIRE_URL, REACT_APP_EC_HR_URL } = process.env;
  const state = store.getState();
  const inHrDesign = employerSelectors(state).getEmployerHrDesign();
  const apps = loggedInUserselectors(state).getUserApps();
  const appsProps = {
    prehire: {
      appName: 'prehire',
      available: apps.prehire && isUserAllowed(FEATURES.viewPrehire),
      bgColor: '#D7FBFF',
      caption: 'Prehire',
      url: REACT_APP_EC_PREHIRE_URL
    },
    hr: {
      appName: 'humanResources',
      available: apps.humanResources,
      bgColor: '#DCE9FF',
      caption: 'HR',
      url:
        featureToggleIsEnabled('ec_hr') && inHrDesign
          ? HR_ROUTES.root
          : REACT_APP_EC_HR_URL
    },
    education: {
      appName: 'education',
      available: apps.education,
      bgColor: '#FDD760',
      caption: 'Education',
      url: EDUCATION_ROUTES.root
    },
    credentialing: {
      appName: 'credentialing',
      available:
        apps.credentialing && featureToggleIsEnabled('ec_credentialing'),
      bgColor: '#F0E7FF',
      caption: 'Credentialing',
      url: CREDENTIALING_ROUTES.root
    },
    employees: {
      appName: 'employees',
      available: apps.humanResources || apps.education,
      bgColor: '#D7FFEF',
      caption: 'Employees',
      url: EMPLOYEES_ROUTES.root
    },
    reports: {
      appName: 'reports',
      available: apps.humanResources || apps.education || apps.credentialing,
      bgColor: '#FFE7EC',
      caption: 'Reports',
      url: REPORTS_ROUTES.root
    },
    exclusions: {
      appName: 'exclusions',
      available: apps.humanResources && isUserAllowed(FEATURES.viewExclusions),
      bgColor: '#FFDDD7',
      caption: 'Exclusions',
      url: REPORTS_ROUTES.exclusions
    }
  };

  return appsProps;
};
