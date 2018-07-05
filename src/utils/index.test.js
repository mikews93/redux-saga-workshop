import React from 'react';
import { expect } from 'chai';
import moment from 'moment-timezone';
import { shallow } from 'enzyme';

import * as utils from './';
import {
  VALIDATION_ERRORS as validationErrors,
  CREDENTIALS,
  PROVIDER_EMAIL_TEMPLATES,
  AddProviderEmailContact
} from '../constants';

describe('Utils', () => {
  describe('formatDate', () => {
    [
      {
        date: '11/11/11',
        inputFormat: 'DD/MM/YY',
        outputFormat: 'LL',
        result: 'November 11, 2011'
      },
      {
        date: '2018-03-09',
        inputFormat: 'YYYY-MM-DD',
        outputFormat: 'MMM D YYYY',
        result: 'Mar 9 2018'
      },
      {
        date: '11-MAY-11',
        inputFormat: 'DD-MMM-YY',
        outputFormat: 'MMMM D YY',
        result: 'May 11 11'
      },
      {
        date: undefined,
        inputFormat: undefined,
        outputFormat: 'MMMM D YY',
        result: moment().format('MMMM D YY')
      }
    ].forEach(c => {
      it(`for the "${c.date}" date, should returns "${c.result}"`, () => {
        expect(
          utils.formatDate(c.date, c.outputFormat, c.inputFormat)
        ).to.be.equal(c.result);
      });
    });
  });

  describe('GetCurrentPage', () => {
    it('should return "1" when the parameters are not given', () => {
      expect(utils.getCurrentPage()).to.equal(1);
    });

    it('should return "1" when the limit parameter is less or equal to "0"', () => {
      expect(utils.getCurrentPage(10, 0)).to.equal(1);
    });

    [
      { offset: 10, limit: 10, page: 2 },
      { offset: 20, limit: 10, page: 3 },
      { offset: 30, limit: 10, page: 4 }
    ].forEach(current => {
      const { offset, limit, page } = current;
      it(`should return ${page}`, () => {
        expect(utils.getCurrentPage(offset, limit)).to.equal(page);
      });
    });
  });

  describe('CreateActionTypes', () => {
    it('should return always an object', () => {
      const types = utils.createActionTypes();
      expect(types).to.be.an('object');
    });

    it('should return an object with four keys', () => {
      const types = utils.createActionTypes();
      expect(Object.keys(types).length).to.equal(4);
    });

    it('should contain the second parameter passed like base name of the object keys', () => {
      const types = utils.createActionTypes('employees', 'AJA');
      Object.keys(types).forEach(key => {
        expect(key).to.contain('AJA');
      });
    });

    it('should contain the parameters passed like values of the object', () => {
      const types = utils.createActionTypes('whatever', 'FETCH');
      Object.keys(types).forEach(key => {
        expect(types[key]).to.contain('whatever/FETCH');
      });
    });
  });

  describe('SetFetchStatus', () => {
    it('should return an empty object when the parameters are not given', () => {
      expect(utils.setFetchStatus()).to.eql({});
    });

    it('should return an object with keys according the values of the array passed', () => {
      const ids = [1234234, 234232, 324233];
      const response = utils.setFetchStatus(ids);

      ids.forEach(id => expect(response).to.haveOwnProperty(id));
    });

    ['loaded', 'failed', 'watever'].forEach(status => {
      const response = utils.setFetchStatus([1, 2, 3], status);
      it(`should return an object with all values set to ${status}`, () => {
        Object.keys(response).forEach(key =>
          expect(response[key]).to.equal(status)
        );
      });
    });
  });

  describe('convertQueryStringToAnObject', () => {
    it('should return an empty object', () => {
      expect(utils.convertQueryStringToAnObject()).to.eql({});
    });

    describe('should to parse the values according to their type correctly', () => {
      it('with "?"', () => {
        expect(
          utils.convertQueryStringToAnObject(
            '?offset=12asd&limit=10&active=true&whatever=[1,2,3]'
          )
        ).to.eql({
          offset: '12asd',
          limit: 10,
          active: true,
          whatever: [1, 2, 3]
        });
      });

      it('without "?"', () => {
        expect(
          utils.convertQueryStringToAnObject('aja=123&whatever=asd')
        ).to.eql({
          aja: 123,
          whatever: 'asd'
        });
      });
    });
  });

  describe('convertObjectToQueryString', () => {
    describe('should return un empty string', () => {
      it('with default params', () => {
        expect(utils.convertObjectToQueryString()).to.equal('');
      });

      it('with custom params', () => {
        expect(utils.convertObjectToQueryString({}, false)).to.equal('');
      });
    });

    describe('should return a query string according the keys of the object passed', () => {
      it('with "?"', () => {
        expect(
          utils.convertObjectToQueryString({ offset: 10, active: true })
        ).to.equal('?offset=10&active=true');
      });

      it('without "?"', () => {
        expect(
          utils.convertObjectToQueryString(
            { limit: 10, whatever: 'aja' },
            false
          )
        ).to.equal('limit=10&whatever=aja');
      });
    });
  });

  describe('formatAsCurrency', () => {
    it('should return $0.00 when value is null', () => {
      expect(utils.formatAsCurrency(null)).to.eql('$0.00');
    });

    it('should return $0.00 when value is undefined', () => {
      expect(utils.formatAsCurrency(undefined)).to.eql('$0.00');
    });

    it('should return value with currency format when value is number', () => {
      expect(utils.formatAsCurrency(12)).to.eql('$12.00');
    });

    it('should return value with currency format when value is string', () => {
      expect(utils.formatAsCurrency('12')).to.eql('$12.00');
    });
  });
});

describe('decodeTVresults', () => {
  const documents = [
    {
      document:
        'eyJmaXJzdE5hbWUiOiJWYXVnaG4iLCJsYXN0TmFtZSI6IkN1bW1pbmdzIiwibWlkZGxlTmFtZSI6IkUiLCJlbWFpbCI6IlJhaHVsNzVAZ21haWwuY29tIiwic3BlY2lhbHR5IjoiNTliNmE5MmY1MWYxZmI2N2JiYzk1OTU0IiwicHJvamVjdGVkU3RhcnREYXRlIjoiMjAxNy0wNS0xOSIsImVtcGxveWVySWQiOjMxNiwicHJvdmlkZXJUeXBlIjoiQVJOUCIsInN0YWZmU3RhdHVzIjoiQ09VUlRFU1kiLCJhc3NpZ25lZFRvIjoiNjY1MjMiLCJzdGF0dXMiOiJBV0FJVElOR19DUkVERU5USUFMUyIsImNyZWF0ZWRCeSI6NTY3MywiY3JlYXRlZEF0IjoiMjAxNy0wNC0zMCIsInVwZGF0ZWRCeSI6NjczNTIsInVwZGF0ZWRBdCI6IjIwMTctMDktMTEiLCJpZCI6ImZhYTc0NDE5LTMwNWUtNGEwNi04NWVjLTBkNWJiY2ViNjk1ZCJ9',
      document_id: 'faa74419-305e-4a06-85ec-0d5bbceb695d'
    },
    {
      document:
        'eyJlbWFpbENvbnRhY3QiOiIxIiwic3RhdHVzIjoiQVdBSVRJTkdfQ1JFREVOVElBTFMiLCJmaXJzdE5hbWUiOiJxZXZhIiwibGFzdE5hbWUiOiJ3ZWMiLCJlbWFpbCI6ImV3Y0BhLmNvIiwic3BlY2lhbHR5IjoiNTllOGM4OGE5ZmZjY2NhMGY3ZTUyOTQ1IiwicHJvamVjdGVkU3RhcnREYXRlIjoiMjAxNy0xMC0xNyIsInByb3ZpZGVyVHlwZSI6IkFSTlAiLCJzdGFmZlN0YXR1cyI6IkNPTlNVTFRJTkciLCJlbXBsb3llcklkIjozMTZ9',
      document_id: '29331165-7165-434f-9389-40c23c9617be'
    }
  ];
  it('should return an array', () => {
    const results = utils.decodeTVresults(documents);
    expect(results).to.be.instanceof(Array);
  });

  it('returns a json object based on the encripted document', () => {
    const results = utils.decodeTVresults(documents);
    results.forEach((item, index) => {
      expect(item).to.be.instanceof(Object);
      let json = JSON.parse(atob(documents[index].document));
      expect(item).to.be.eql({
        ...json,
        ...{ id: documents[index].document_id }
      });
    });
  });

  it('returns an empty array when the prop received is undefined', () => {
    const results = utils.decodeTVresults(undefined);
    expect(results).to.be.eql([]);
  });
});

describe('validateRequiredSelectFields', () => {
  const [requiredFields, emptyValues] = [
    ['fieldOne', 'fieldTwo'],
    { fieldOne: ' ', fieldTwo: 'Choose an option...' }
  ];
  it('Should return error when no value is given for required select type fields', () => {
    const errors = utils.validateRequiredSelectFields(
      {},
      requiredFields,
      emptyValues
    );
    expect(errors.fieldOne).to.be.eql(validationErrors.REQUIRED_FIELD);
    expect(errors.fieldTwo).to.be.eql(validationErrors.REQUIRED_FIELD);
  });

  it('Should return error when value is given for required select type fields but it is equal to the corresponding empty values', () => {
    const errors = utils.validateRequiredSelectFields(
      emptyValues,
      requiredFields,
      emptyValues
    );
    expect(errors.fieldOne).to.be.eql(validationErrors.REQUIRED_FIELD);
    expect(errors.fieldTwo).to.be.eql(validationErrors.REQUIRED_FIELD);
  });

  it('Should not return errors when valid value is given', () => {
    const errors = utils.validateRequiredSelectFields(
      { fieldOne: '01', fieldTwo: 'test' },
      requiredFields,
      emptyValues
    );
    expect(errors).to.be.eql({});
  });
});

describe('Helper functions for Provider CREDENTIALS constant', () => {
  it('getProviderCredentialSectionIndexByName', () => {
    expect(
      utils.getProviderCredentialSectionIndexByName('demographics')
    ).to.be.equal(0);
    expect(
      utils.getProviderCredentialSectionIndexByName('membership_dues')
    ).to.be.equal(15);
  });

  it('getProviderCredentialSectionByName', () => {
    expect(utils.getProviderCredentialSectionByName('health')).to.be.eql(
      CREDENTIALS[1]
    );
    expect(
      utils.getProviderCredentialSectionByName('alternate_coverage')
    ).to.be.eql(CREDENTIALS[14]);
  });

  it('getNextProviderCredentialSectionByName', () => {
    expect(
      utils.getNextProviderCredentialSectionByName('practice_locations')
    ).to.be.eql(CREDENTIALS[3]);
    expect(
      utils.getNextProviderCredentialSectionByName('peer_reference')
    ).to.be.eql(CREDENTIALS[13]);
  });

  it('getPreviousProviderCredentialSectionByName', () => {
    expect(
      utils.getPreviousProviderCredentialSectionByName('board_certifications')
    ).to.be.eql(CREDENTIALS[4]);
    expect(
      utils.getPreviousProviderCredentialSectionByName('malpractice_claims')
    ).to.be.eql(CREDENTIALS[10]);
  });
});

describe('generateProviderEmailObject: Helper functions to prepare object to use on providers send email process ', () => {
  const user_id = 'd8f7a90sd8f7d-1234-5678-0192-0dfs98g7sd9',
    providerId = 'a98dfuyas9-6789-0987-1234-ad98f7a9';
  const sourceObject = { user_id, providerId };

  it('returns default object when no params given', () => {
    const result = {
      user_id: undefined,
      sendgridTemplateId: 'defultTemplate',
      fromEmailSpecifier: {
        literal_value: 'credentialing.no-reply@everchek.io'
      },
      toEmailSpecifier: { user_attribute: 'email' },
      substitutions: {}
    };
    expect(utils.generateProviderEmailObject()).to.be.eql(result);
  });

  it('returns default object when emailTemplate is not handled on function', () => {
    const result = {
      user_id,
      sendgridTemplateId: 'defultTemplate',
      fromEmailSpecifier: {
        literal_value: 'credentialing.no-reply@everchek.io'
      },
      toEmailSpecifier: { user_attribute: 'email' },
      substitutions: {}
    };
    expect(
      utils.generateProviderEmailObject('tempateTest', {
        ...sourceObject,
        data: {}
      })
    ).to.be.eql(result);
  });

  it(`returns appropiate object for send emailTemplate is ${
    PROVIDER_EMAIL_TEMPLATES.newProvider
  }`, () => {
    const result = {
      user_id,
      sendgridTemplateId: '5ec47780-7664-45af-ac35-6070dabb4b82',
      fromEmailSpecifier: {
        literal_value: 'credentialing.no-reply@everchek.io'
      },
      toEmailSpecifier: { user_attribute: 'email' },
      substitutions: {
        '{{FIRST_NAME}}': { literal_value: 'Jon' },
        '{{START_URL}}': { literal_value: 'http://secure.test.evercheck.com' }
      }
    };
    expect(
      utils.generateProviderEmailObject(PROVIDER_EMAIL_TEMPLATES.newProvider, {
        ...sourceObject,
        data: { firstName: 'Jon', emailContact: AddProviderEmailContact.DIRECT }
      })
    ).to.be.eql(result);

    result.toEmailSpecifier.user_attribute = 'delegateEmail';
    expect(
      utils.generateProviderEmailObject(PROVIDER_EMAIL_TEMPLATES.newProvider, {
        ...sourceObject,
        data: {
          firstName: 'Jon',
          emailContact: AddProviderEmailContact.DELEGATE
        }
      })
    ).to.be.eql(result);
  });
});

describe('Helper functions for Provider CREDENTIALS constant', () => {
  it('getProviderCredentialSectionIndexByName', () => {
    expect(
      utils.getProviderCredentialSectionIndexByName(CREDENTIALS[0].name)
    ).to.be.equal(0);
    expect(
      utils.getProviderCredentialSectionIndexByName(CREDENTIALS[15].name)
    ).to.be.equal(15);
  });
  it('getProviderCredentialSectionByName', () => {
    expect(
      utils.getProviderCredentialSectionByName(CREDENTIALS[1].name)
    ).to.be.eql(CREDENTIALS[1]);
    expect(
      utils.getProviderCredentialSectionByName(CREDENTIALS[14].name)
    ).to.be.eql(CREDENTIALS[14]);
  });
  it('getNextProviderCredentialSectionByName', () => {
    expect(
      utils.getNextProviderCredentialSectionByName(CREDENTIALS[2].name)
    ).to.be.eql(CREDENTIALS[3]);
    expect(
      utils.getNextProviderCredentialSectionByName(CREDENTIALS[12].name)
    ).to.be.eql(CREDENTIALS[13]);
  });
  it('getPreviousProviderCredentialSectionByName', () => {
    expect(
      utils.getPreviousProviderCredentialSectionByName(CREDENTIALS[5].name)
    ).to.be.eql(CREDENTIALS[4]);
    expect(
      utils.getPreviousProviderCredentialSectionByName(CREDENTIALS[11].name)
    ).to.be.eql(CREDENTIALS[10]);
  });
});

xdescribe('Helper function to get date in truevault date format', () => {
  it('should return empty when no value is given or date object is invalid', () => {
    expect(utils.getTVDateFromMomentObj()).to.be.equal(null);
    expect(utils.getTVDateFromMomentObj('')).to.be.equal(null);
    expect(utils.getTVDateFromMomentObj('abc')).to.be.equal(null);
    expect(utils.getTVDateFromMomentObj(123)).to.be.equal(null);
    expect(utils.getTVDateFromMomentObj({})).to.be.equal(null);
    expect(utils.getTVDateFromMomentObj({ q: '' })).to.be.equal(null);
  });

  it('should return appropiAtE date based on moment object', () => {
    let date = moment('2018-02-14T08:30:00');
    expect(utils.getTVDateFromMomentObj(date)).to.be.eql('2018-02-14');

    date = moment('1987-10-02T15:30:00');
    expect(utils.getTVDateFromMomentObj(date)).to.be.eql('1987-10-02');

    date = moment('2050-07-20T00:00:00');
    expect(utils.getTVDateFromMomentObj(date)).to.be.eql('2050-07-20');
  });

  it('should return appropiet date time based on moment object', () => {
    let date = moment('2018-02-14T08:30:00');
    expect(utils.getTVDateFromMomentObj(date, true)).to.be.eql(
      '2018-02-14 08:30'
    );

    date = moment('1987-10-02T15:30:00');
    expect(utils.getTVDateFromMomentObj(date, true)).to.be.eql(
      '1987-10-02 15:30'
    );

    date = moment('2050-07-20T00:00:00');
    expect(utils.getTVDateFromMomentObj(date, true)).to.be.eql(
      '2050-07-20 00:00'
    );
  });
});

xdescribe('Helper function to get a moment date from a date received in truevault date format', () => {
  it('should return empty when no value is given or date object is invalid', () => {
    expect(utils.getMomentDateFromTVDate()).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate(null)).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate(undefined)).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate('')).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate('abc')).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate({})).to.be.equal(null);
    expect(utils.getMomentDateFromTVDate({ q: '' })).to.be.equal(null);
  });

  it('should return appropite moment object based on date string', () => {
    let date = '2018-02-14';
    let momentObj = utils.getMomentDateFromTVDate(date);
    expect(moment.isMoment(momentObj)).to.be.true;
    expect(momentObj).to.be.eql(moment(date));
    expect(momentObj.format()).to.be.eql('2018-02-14T00:00:00-05:00');

    date = '2018-02-14 08:30:00';
    momentObj = utils.getMomentDateFromTVDate(date);
    expect(moment.isMoment(momentObj)).to.be.true;
    expect(momentObj).to.be.eql(moment(date));
    expect(momentObj.format()).to.be.eql('2018-02-14T08:30:00-05:00');

    date = '1987-10-02 15:30';
    momentObj = utils.getMomentDateFromTVDate(date);
    expect(moment.isMoment(momentObj)).to.be.true;
    expect(momentObj).to.be.eql(moment(date));
    expect(momentObj.format()).to.be.eql('1987-10-02T15:30:00-05:00');

    date = '2050-07-20 00:00:00';
    momentObj = utils.getMomentDateFromTVDate(date);
    expect(moment.isMoment(momentObj)).to.be.true;
    expect(momentObj).to.be.eql(moment(date));
    expect(momentObj.format()).to.be.eql('2050-07-20T00:00:00-05:00');
  });
});

xdescribe('Helper function to get string date on a specific format from a moment', () => {
  it('should return empty when no value is given or date object is invalid', () => {
    expect(utils.getReadOnlyDate()).to.be.equal('');
    expect(utils.getReadOnlyDate(null)).to.be.equal('');
    expect(utils.getReadOnlyDate(undefined)).to.be.equal('');
    expect(utils.getReadOnlyDate('')).to.be.equal('');
    expect(utils.getReadOnlyDate('abc')).to.be.equal('');
    expect(utils.getReadOnlyDate({})).to.be.equal('');
    expect(utils.getReadOnlyDate({ q: '' })).to.be.equal('');
  });

  it('should return string date from  moment object in defult format when no format given', () => {
    let momentObj = moment('2018-02-14');
    expect(utils.getReadOnlyDate(momentObj)).to.eql('02 / 14 / 2018');

    momentObj = moment('1987-10-02');
    expect(utils.getReadOnlyDate(momentObj)).to.eql('10 / 02 / 1987');

    momentObj = moment('2050-11-25');
    expect(utils.getReadOnlyDate(momentObj)).to.eql('11 / 25 / 2050');
  });

  it('should return string date from  moment object in given format', () => {
    let momentObj = moment('2018-02-14');
    expect(utils.getReadOnlyDate(momentObj, 'D-M-YY')).to.eql('14-2-18');

    momentObj = moment('1987-10-02');
    expect(utils.getReadOnlyDate(momentObj, 'MMM DD, YYYY')).to.eql(
      'Oct 02, 1987'
    );

    momentObj = moment('2050-11-25');
    expect(utils.getReadOnlyDate(momentObj, 'YYYY, DD MMMM')).to.eql(
      '2050, 25 November'
    );
  });
});

describe('Helper function to validate Zip Code to have Exact Length (validateZipCodeExactLength)', () => {
  it('Should return EXACT_LENGTH_ZIPCODE error when zip code does not have the right lenght', () => {
    expect(
      utils.validateZipCodeExactLength({ zipCode: '1' }, 'zipCode', 5)
    ).to.eql(validationErrors.EXACT_LENGTH_ZIPCODE);
    expect(
      utils.validateZipCodeExactLength({ zipCode: '123456' }, 'zipCode', 5)
    ).to.eql(validationErrors.EXACT_LENGTH_ZIPCODE);
  });

  it('Should return undefined when zip code have the right lenght', () => {
    expect(
      utils.validateZipCodeExactLength({ zipCode: '12345' }, 'zipCode', 5)
    ).to.eql();
  });
});

describe('Helper function to validate Zip Code (validateZipCode)', () => {
  it('Should return EXACT_LENGTH_ZIPCODE error when zip code does not have the right lenght', () => {
    expect(utils.validateZipCode({ zipCode: '1' }, 'zipCode', 5)).to.eql(
      validationErrors.EXACT_LENGTH_ZIPCODE
    );
    expect(utils.validateZipCode({ zipCode: '123456' }, 'zipCode', 5)).to.eql(
      validationErrors.EXACT_LENGTH_ZIPCODE
    );
  });

  it('Should return undefined when zip code is not num', () => {
    expect(utils.validateZipCode({ zipCode: 'hello' }, 'zipCode')).to.eql(
      validationErrors.IS_NAN
    );
  });

  it('Should return undefined when zip code is valid', () => {
    expect(utils.validateZipCode({ zipCode: '12345' }, 'zipCode')).to.eql();
  });
});

describe('Helper function to validate Address Object (validateAddressFields)', () => {
  it('Should return undefined when no params given', () => {
    expect(utils.validateAddressFields()).to.eql({
      address: 'This field is required.',
      city: 'This field is required.',
      state: 'This field is required.',
      zipCode: 'This field is required.'
    });
  });

  it('Should return erros when address, city, state, zipCode are empty', () => {
    expect(
      utils.validateAddressFields({}, ['address', 'city', 'state', 'zipCode'])
    ).to.eql({
      address: 'This field is required.',
      city: 'This field is required.',
      state: 'This field is required.',
      zipCode: 'This field is required.'
    });
  });

  it('Should return zipcode error when zip code is invalid', () => {
    expect(
      utils.validateAddressFields(
        {
          address: 'Center street',
          city: 'Miamia',
          state: 'Florida',
          zipCode: 'hello'
        },
        ['address', 'city', 'state', 'zipCode']
      )
    ).to.eql({ zipCode: validationErrors.IS_NAN });
  });

  it('Should return undefined when zip code have the right lenght', () => {
    expect(
      utils.validateAddressFields(
        {
          address: 'Center street',
          city: 'Miamia',
          state: 'Florida',
          zipCode: '12345'
        },
        ['address', 'city', 'state', 'zipCode']
      )
    ).to.eql({ zipCode: undefined });
  });
});

describe('getErrorMessage', () => {
  it('return an error from object', () => {
    const error = { response: { data: { message: 'error' } } };
    expect(utils.getErrorMessage(error)).to.eql('error');
  });
  it('return an error', () => {
    const error = 'error';
    expect(utils.getErrorMessage(error)).to.eql('error');
  });
});

describe('capitalize', () => {
  it('return output same as input when does not need to apply changes', () => {
    expect(utils.replaceEspecialCharacter('Locum tenens')).to.eql(
      'Locum tenens'
    );
  });
  it('return output without under score', () => {
    expect(utils.capitalize('THIS_IS_TEST')).to.eql('This is test');
  });

  it('return output when no param is passed', () => {
    expect(utils.capitalize()).to.eql('');
    expect(utils.capitalize('')).to.eql('');
  });
});

describe('replaceEspecialCharacter', () => {
  it('return output same as input when does not need to apply changes', () => {
    expect(utils.replaceEspecialCharacter('This is a test')).to.eql(
      'This is a test'
    );
  });
  it('return output without under score', () => {
    expect(utils.replaceEspecialCharacter('TAKE_ACTION')).to.eql('TAKE ACTION');
  });
});

xdescribe('Helper function to get a date from moment date', () => {
  it('should return date based on moment date', () => {
    const date = moment();
    const expectDate = date.toDate();
    expect(utils.getDateFromMomentObj(date)).to.be.eql(expectDate);
  });
  it('should return null when moment date is undefined or null', () => {
    expect(utils.getDateFromMomentObj()).to.be.equal(null);
  });
});

describe('getEmploymentHistoryError', () => {
  it('should return string message when error is object', () => {
    expect(
      utils.getEmploymentHistoryError({
        lastDate: 'Path lastDate is required.'
      })
    ).to.equal('the field until is required.');

    expect(
      utils.getEmploymentHistoryError({ name: 'Path name is required.' })
    ).to.equal('the field name is required.');
  });

  it('should return string message when error is string', () => {
    expect(utils.getEmploymentHistoryError('error')).to.eql('error');
  });
});

describe('getYesNoValue', () => {
  it(`returns 'No' when receives no params`, () => {
    expect(utils.getYesNoValue()).to.equal('No');
  });

  it(`returns 'No' when receives no params`, () => {
    expect(utils.getYesNoValue(true)).to.equal('Yes');
  });

  it(`returns 'No' when receives no params`, () => {
    expect(utils.getYesNoValue(false)).to.equal('No');
  });
});

describe('getSelectOptions', () => {
  const states = [
    {
      id: '1',
      name: 'Florida'
    }
  ];
  const [options, prefix, valueProperty, renderedProperty, placeholderText] = [
    states,
    'stt',
    'id',
    'name',
    'Choose a state'
  ];
  it(`returns only a option tag with the default props when no params are passed`, () => {
    const optionsPlaceholder = (
      <option value=" " key={`listItem-0`} disabled>
        Choose an option
      </option>
    );

    expect(utils.getSelectOptions({}).length).to.eql(1);
    expect(utils.getSelectOptions({})[0]).to.eql(optionsPlaceholder);
  });

  it(`returns a option tag in the first element wih the placeholder prop passed`, () => {
    const optionsPlaceholder = (
      <option value=" " key={`listItem-0`} disabled>
        {placeholderText}
      </option>
    );
    expect(utils.getSelectOptions({ placeholderText })[0]).to.eql(
      optionsPlaceholder
    );
  });

  it(`returns a option tag for every object if value property is given`, () => {
    const optionsResult = utils.getSelectOptions({
      options,
      valueProperty,
      renderedProperty,
      prefix
    });

    states.forEach(state => {
      const option = optionsResult.find(opt => {
        return opt.props.value === state[valueProperty];
      });
      expect(option).to.exist;
    });
  });

  it(`returns a option tag for every element `, () => {
    const items = ['MA', 'DO'];
    const optionsResult = utils.getSelectOptions({
      options: items
    });

    items.forEach(item => {
      const option = optionsResult.find(opt => {
        return opt.props.value === item;
      });
      expect(option).to.exist;
    });
  });
});
