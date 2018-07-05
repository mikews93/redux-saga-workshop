import React from 'react';
import ReactHtmlParser from 'react-html-parser/lib/HtmlParser';
import axiosBuildURL from 'axios/lib/helpers/buildURL';
import compact from 'lodash/compact';
import get from 'lodash/get';
import keys from 'lodash/keys';
import mapValues from 'lodash/mapValues';
import set from 'lodash/set';
import values from 'lodash/values';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment-timezone';
import qs from 'querystring';
import * as actions from 'redux-form/lib/actions';

import {
  REQUEST_STATUSES,
  VALIDATION_ERRORS as validationErrors,
  PROVIDER_EMAIL_TEMPLATES,
  CREDENTIALS,
  AddProviderEmailContact
} from '../constants';
import { getToken } from './auth/jwt';

/**
 * Returns a boolean that indicates whether a request is loading.
 * This helper function is useful to determine whether a Spinner should be shown.
 * For the sake of simplicity, both the LOADING and the NOT_LOADED statuses mean
 * a request is loading.
 *
 * @param {string} fetchStatus
 *
 * @returns {boolean}
 */
export const isFetching = fetchStatus => {
  if (
    fetchStatus === REQUEST_STATUSES.LOADING ||
    fetchStatus === REQUEST_STATUSES.NOT_LOADED
  ) {
    return true;
  }
  return false;
};

/**
 * Returns a boolean that indicates if a resource is not loaded.
 * This helper function is useful to determine whether a resource should be fetched
 * in a componentDidMount life cycle method.
 *
 * @param {string} fetchStatus
 *
 * @returns {boolean}
 */
export const isNotLoaded = fetchStatus => {
  if (
    fetchStatus === REQUEST_STATUSES.FAILED ||
    fetchStatus === REQUEST_STATUSES.NOT_LOADED
  ) {
    return true;
  }
  return false;
};

/** Formats date using a given format
 *
 * @param {Date|string} date 17-MAR-17
 * @param {string} outputFormat MMM D YYYY
 * @param {string} inputFormat DD-MMM-YY
 *
 * @returns {string} MAR 17 2017
 */
export const formatDate = (
  date = new Date(),
  outputFormat = 'MMM D YYYY',
  inputFormat
) => {
  return moment(date, inputFormat)
    .tz('America/New_York')
    .utc()
    .format(outputFormat);
};

export const formatAsCurrency = (value = 0) => {
  const formatValue = value !== null ? +value : 0;
  return formatValue.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
};

/**
 * Checks whether all the elements of an array are contained in another one
 *
 * @param {array} superset container
 * @param {array} subset
 *
 * @returns {boolean}
 */
export const arrayContainsArray = (superset, subset) => {
  if (!superset.length || !subset.length) return false;
  return subset.every(value => superset.indexOf(value) >= 0);
};

export const getCurrentPage = (offset = 0, limit = 0) => {
  if (limit <= 0) return 1;
  return parseInt(offset / limit, 10) + 1;
};

export const createActionTypes = (key, baseAction) => {
  return {
    [`${baseAction}`]: `${key}/${baseAction}`,
    [`${baseAction}_REQUEST`]: `${key}/${baseAction}_REQUEST`,
    [`${baseAction}_SUCCESS`]: `${key}/${baseAction}_SUCCESS`,
    [`${baseAction}_FAILURE`]: `${key}/${baseAction}_FAILURE`
  };
};

export const setFetchStatus = (
  result = [],
  state = REQUEST_STATUSES.LOADED
) => {
  return result.reduce(
    (pre, next) => ({
      ...pre,
      [next]: state
    }),
    {}
  );
};

export const decodeTVresults = arr => {
  if (!arr) return [];
  return arr.map(i => {
    let json = JSON.parse(atob(i.document));
    return { ...json, ...{ id: i.document_id } };
  });
};

/**
 * Returns a string date from a moment object in the specified format
 *
 * @param {moment} date Moment object to get string date
 * @param {string} format format for the output string date
 *
 * @returns {string}
 */
export const getReadOnlyDate = (date, format = 'MM / DD / YYYY') => {
  if (moment.isMoment(date)) {
    return date.format(format);
  }
  return '';
};

export const transposeEntityToArray = (entity, page) => {
  let ids = [];
  if (!page) ids = entity.list;
  else ids = entity.pagination.pages[page];

  return ids.map(id => entity.entities[id]);
};

/**
 * Calculates the number of an excel column
 *
 * @param {string} column
 *
 * @returns {number}
 */
export const getExcelColumnNumber = column => {
  let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    result = 0;

  for (let i = 0, j = column.length - 1; i < column.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(column[i]) + 1);
  }

  // Zero-based numbering
  return result - 1;
};

/**
 * Returns all words capitalized
 *
 * @param {string} value, string to transform
 */
export const startCase = value => {
  return value
    ? `${value}`.toLowerCase().replace(/\b\w/g, string => string.toUpperCase())
    : '';
};

/**
 * Returns the first letter in uppercase and replaces underscore by space.
 *
 * @param {string} value, string to transform
 */
export const capitalize = value => {
  if (isEmpty(value)) return '';
  let word = value[0].toUpperCase() + value.slice(1).toLowerCase();
  return replaceEspecialCharacter(word);
};

/**
 * Converts a query string to an object
 *
 * @param {string} [search='']  'offset=0&limit=10' or '?offset=0&limit=10'
 * @returns {object}  {offset: 0, limit: 10}
 */
export const convertQueryStringToAnObject = (search = '') => {
  const questionMarkPosition = search.indexOf('?');
  const queryString =
    questionMarkPosition === -1
      ? search
      : search.substring(questionMarkPosition + 1, search.length);

  return mapValues(qs.parse(queryString), value => {
    let result;
    try {
      result = JSON.parse(value);
    } catch (error) {
      result = value;
    }
    return result;
  });
};

/**
 * Converts an object to a query string
 *
 * @param {object} [source={}]   {offset:0, limit:10}
 * @param {boolean} withQuestionCharacter
 * @returns {string}  '?offset=0&limit=10' or 'offset=0&limit=10'
 */
export const convertObjectToQueryString = (
  source = {},
  withQuestionCharacter = true
) => {
  const queryString = axiosBuildURL('', source);
  return withQuestionCharacter ? queryString : queryString.slice(1);
};

export const parseHtml = text => ReactHtmlParser(text);

/**
 * Removes the following characters from a string: parentheses, dashes and whitespaces
 *
 * @param {string} number (300) 661-5171
 * @returns {string} 3006615171
 */
export const phoneParser = number =>
  number ? number.replace(/-|\(|\)|\s/g, '') : '';

/**
 *
 * Resets several fields created with redux-form
 *
 * @param {string} form name of the form
 * @param {function} dispatch
 * @param {array|object} fields fields to reset
 */
export const resetFields = (form, dispatch, fields) => {
  const fieldsToReset = fields instanceof Array ? fields : keys(fields);

  return fieldsToReset.forEach(field => {
    dispatch(actions.change(form, field, ''));
    dispatch(actions.untouch(form, field));
  });
};

/**
 * Removes HTML tags from a string
 *
 * @param {string}
 * @returns {string}
 */
export const removeHTMLTags = string => string.replace(/(<([^>]+)>)/gi, '');

/**
 * Returns the number of active filters in Table
 *
 * @param {object} filters
 * @returns {number}
 */
export const countFilters = filters => {
  return values(filters).filter(value => value && value !== 'active').length;
};

/**
 * Returns the displayName of a React component
 */
export const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

/**
 * Returns an error for each field that is required and has no value
 *
 * @param {object} values
 * @param {array} requiredFields
 *
 * @returns {object}
 */
export const validateRequiredFields = (
  values,
  requiredFields = ['firstName', 'lastName', 'email']
) => {
  const errors = {};

  requiredFields.forEach(field => {
    const value = get(values, field);
    const onlyHasWhitespace = !/\S/.test(value);

    if (!value || onlyHasWhitespace) {
      set(errors, field, validationErrors.REQUIRED_FIELD);
    }
  });

  return errors;
};

/**
 * Returns an error if an email is invalid or if it is required and has no value
 *
 * @param {object} values
 * @param {string} key
 * @param {boolean} isRequired
 *
 * @returns {string}
 */
export const validateEmail = (values, key = 'email', isRequired = false) => {
  // eslint-disable-next-line
  const emailPattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  if (values[key] && !values[key].match(emailPattern)) {
    return validationErrors.INVALID_EMAIL;
  }
  if (!values[key] && isRequired) return validationErrors.REQUIRED_FIELD;
};

/**
 * Returns an error if a date is invalid or if it is required and has no value
 *
 * @param {object} values
 * @param {string} key
 * @param {boolean} isRequired
 *
 * @returns {string}
 */
export const validateDate = (values, key = 'date', isRequired = false) => {
  // eslint-disable-next-line
  const datePattern = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (values[key] && !values[key].match(datePattern)) {
    return validationErrors.INVALID_DATE;
  }
  if (!values[key] && isRequired) return validationErrors.REQUIRED_FIELD;
};

/**
 * Returns an error if a value doesn't have the minimum number of characters
 *
 * @param {object} values
 * @param {string} key
 * @param {number} min
 *
 * @returns {string}
 */
export const validateMinLength = (values, key, min) => {
  if (values[key] && values[key].length < min) {
    return validationErrors.MIN_LENGTH(min);
  }
};

/**
 * Returns an error if a value doesn't have the exact number of characters
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validateExactLength = (values, key, length) => {
  if (values[key] && values[key].length !== length) {
    return validationErrors.EXACT_LENGTH(length);
  }
};

/**
 * Returns an error if a Zip Code value doesn't have the exact number of characters
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validateZipCodeExactLength = (values, key, length) => {
  if (validateExactLength(values, key, length)) {
    return validationErrors.EXACT_LENGTH_ZIPCODE;
  }
};

/**
 * Returns an error for each field that is required and has no value
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validateAddressFields = (
  values = {},
  requiredFieldsAddress = ['address', 'city', 'state', 'zipCode']
) => {
  const errors = validateRequiredFields(values, requiredFieldsAddress);
  errors.zipCode = validateZipCode(values, 'zipCode') || errors.zipCode;
  return errors;
};

/**
 * Returns an error if the value isn't a number
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validateIsNum = (values, key) => {
  if (values[key] && isNaN(values[key])) {
    return validationErrors.IS_NAN;
  }
};

/**
 * Returns an error if a value doesn't have the correct format of a SSN
 *
 * @param {object} values
 *
 * @returns {string}
 */
export const validateSSN = values => {
  const exactLength = validateExactLength(values, 'ssn', 9);
  if (exactLength) return exactLength;
  const isNan = validateIsNum(values, 'ssn');
  if (isNan) return isNan;
};

/**
 * Returns an error if a value doesn't have the correct format of a NPI
 *
 * @param {object} values
 *
 * @returns {string}
 */
export const validateNPI = values => {
  const exactLength = validateExactLength(values, 'npi', 10);
  if (exactLength) return exactLength;
  const isNan = validateIsNum(values, 'npi');
  if (isNan) return isNan;
};

/**
 * Returns an error if a value doesn't have the correct format of a Phone
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validatePhone = (values, key = 'phone') => {
  const exactLength = validateExactLength(values, key, 10);
  if (exactLength) return exactLength;
  const isNan = validateIsNum(values, key);
  if (isNan) return isNan;
};

/**
 * Returns an error if a value doesn't have the correct format of a ZipCode
 *
 * @param {object} values
 * @param {string} key
 *
 * @returns {string}
 */
export const validateZipCode = (values, key) => {
  const exactLength = validateZipCodeExactLength(values, key, 5);
  if (exactLength) return exactLength;
  const isNan = validateIsNum(values, key);
  if (isNan) return isNan;
};

/**
 * Returns an error for each select field that is required and has the blank value
 *
 * @param {object} values Object values from redux-forms structure for its values property
 * @param {array} requiredFields List with name fields (from redux-forms) to be validated
 * @param {object} emptyValues Object with the blank values for each field corresponding to fields in requiredFields
 *
 * @returns {object}
 */
export const validateRequiredSelectFields = (
  values,
  requiredFields, //= ['specialties', 'types'],
  emptyValues //= { specialties: ' ', types: 'Choose an option...' }
) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!values[field] || values[field] === emptyValues[field]) {
      errors[field] = validationErrors.REQUIRED_FIELD;
    }
  });

  return errors;
};

/**
 * Joins an array of strings
 *
 * @param {array} strings Jane null Doe
 *
 * @returns {string} Jane Doe
 */
export const joinStrings = (strings, separator = ' ') =>
  compact(strings).join(separator);

/**
 * Returns a url that points to the related endpoint to export data
 *
 * @param {string} entity name of the resource to be exported
 * @param {object} urlParams object with all the params that the export endpoint should receive
 * @param {string} api
 *
 * @returns {string}
 */
export const buildExportURL = (entity, urlParams, api = 'econe') => {
  const { REACT_APP_ECE_API_URL, REACT_APP_EC_ONE_API_URL } = process.env;
  const API_URL =
    api === 'ece' ? REACT_APP_ECE_API_URL : REACT_APP_EC_ONE_API_URL;
  const URL = `${API_URL}/${entity}/export`;
  return axiosBuildURL(URL, { ...urlParams, token: getToken() });
};

/**
 * Returns a phone number  in format (xxx) xxx-xxxx
 *
 * @param {string} phone, phone number to format
 *
 * @returns {string}
 */
export const phoneFormatter = (phone = '') => {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

/**
 * Returns credential index by name
 *
 * @param {string} name, name's credential
 *
 * @returns {number}
 */
export const getProviderCredentialSectionIndexByName = name =>
  CREDENTIALS.findIndex(
    credential =>
      credential.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );

/**
 * Returns credential name to next section
 *
 * @param {string} name, name's credential
 *
 * @returns {string}
 */
export const getNextProviderCredentialSectionByName = name =>
  CREDENTIALS[getProviderCredentialSectionIndexByName(name) + 1];

/**
 * Returns credential name to previous section
 *
 * @param {string} name, name's credential
 *
 * @returns {string}
 */
export const getPreviousProviderCredentialSectionByName = name =>
  CREDENTIALS[getProviderCredentialSectionIndexByName(name) - 1];

/**
 * Returns credential by name
 *
 * @param {string} name, name's credential
 *
 * @returns {object}
 */
export const getProviderCredentialSectionByName = name =>
  CREDENTIALS[getProviderCredentialSectionIndexByName(name)];

/**
 * Returns the object to use on provider send email process
 *
 * @param {string} emailTemplate, template enum to choose the way the object must be prepared
 * @param {object} sourceObject, an object with de providerId, UserId and data to use to send the email
 *
 * @returns {object}
 */
export const generateProviderEmailObject = (
  emailTemplate = '',
  { user_id, data } = {}
) => {
  const fromEmailSpecifier = {
    literal_value: 'credentialing.no-reply@everchek.io'
  };
  let substitutions = {};
  switch (emailTemplate) {
    case PROVIDER_EMAIL_TEMPLATES.newProvider:
      substitutions = {
        '{{FIRST_NAME}}': { literal_value: data.firstName },
        '{{START_URL}}': { literal_value: 'http://secure.test.evercheck.com' }
      };
      return {
        user_id,
        sendgridTemplateId: '5ec47780-7664-45af-ac35-6070dabb4b82',
        fromEmailSpecifier,
        toEmailSpecifier: {
          user_attribute:
            data.emailContact === AddProviderEmailContact.DELEGATE
              ? 'delegateEmail'
              : 'email'
        },
        substitutions
      };
    default:
      return {
        user_id,
        sendgridTemplateId: 'defultTemplate',
        fromEmailSpecifier,
        toEmailSpecifier: { user_attribute: 'email' },
        substitutions
      };
  }
};

/**
 * Returns the moment date based on Truevault date string
 *
 * @param {string} date, date string from TrueVault
 *
 * @returns {moment}
 */
export const getMomentDateFromTVDate = date => {
  const tempDate = new Date(date);
  if (!isEmpty(date) && tempDate.toString().toLowerCase() !== 'invalid date') {
    return moment(date).utc();
  }
  return null;
};

/**
 * Returns the string date in the format used by Truevault based in a moment object
 *
 * @param {object} date, moment object with the date
 * @param {boolen} withTime, indicates if the returned string date should inlcude time
 *
 * @returns {string}
 */
export const getTVDateFromMomentObj = (date, withTime = false) => {
  if (moment.isMoment(date)) {
    const format = `YYYY-MM-DD${withTime ? ' HH:mm' : ''}`;
    return date.format(format);
  }
  return null;
};

/**
 * Act like a brigde in order to serve a file to be downloaded
 *
 * @param {object} blob, file blob to be downloaded
 * @param {object} name, string for naming the downloaded file
 *
 * @void
 */

export const generateBlobDownloadFile = (blob, name) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style = 'display:none';
  link.download = name;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getErrorMessage = error => {
  const { response: { data: { message } = {} } = {} } = error;
  return message ? message : error.toString();
};

/**
 * Returns the string date in the format used by Truevault based in a moment object
 *
 * @param {string} string, moment object with the date
 *
 * @returns {string}
 */
export const replaceEspecialCharacter = string => {
  return `${string.replace(/_/g, ' ')}`;
};

/**
 *  Returns the date from a moment object
 * @param {object} date, moment object with the date
 * @param {boolen} withTime, indicates if the returned string date should inlcude time
 *
 * @returns {string}
 */
export const getDateFromMomentObj = (date, withTime = false) =>
  date ? date.toDate() : null;

export const getEmploymentHistoryError = error => {
  const SimileFields = {
    lastDate: 'until',
    startDate: 'from'
  };

  if (typeof error === 'object') {
    return Object.keys(error)
      .map(key => {
        const field = SimileFields[key] || key;
        const message = error[key]
          .replace('Path', 'the field')
          .replace(key, field);
        return message;
      })
      .join('\n');
  }
  return error;
};

/**
 *  Returns 'Yes' or 'No value based on boolean value
 * @param {boolen} value, the value to determine Yes/No
 *
 * @returns {string}
 */
export const getYesNoValue = value => (value ? 'Yes' : 'No');

/**
 *  Returns an array of HTML options to be rendered as childrens
 * @param {array} options, the option to iterate througth
 * @param {string} prefix, the prefix for every key in order to be unique in the react tree
 * @param {string} valueProperty, the property within every object(if that's the case) to be set as value in the option tag
 * @param {string} renderedValue, the property within every object(if that's the case) to be set as children in the option tag
 * @param {string} placeholderText, the text for the default option tag to show it as first
 *
 * @returns {JSX.array}
 */

export const getSelectOptions = ({
  options = [],
  prefix = 'listItem',
  valueProperty,
  renderedProperty,
  placeholderText = 'Choose an option'
}) => {
  const optionsPlaceholder = (
    <option value=" " key={`${prefix}-0`} disabled>
      {placeholderText}
    </option>
  );
  const optionsList = valueProperty
    ? options.map((option, index) => (
        <option value={option[valueProperty]} key={`${prefix}-${index}`}>
          {option[renderedProperty]}
        </option>
      ))
    : options.map((option, index) => (
        <option value={option} key={`${prefix}-${index}`}>
          {option}
        </option>
      ));
  return [optionsPlaceholder].concat(optionsList);
};
