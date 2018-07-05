import { expect } from 'chai';
import { createEntitiesReducer } from './index';

const types = {
  FETCH_SUCCESS: 'test/FETCH_SUCCESS',
  CLEAR_ENTITIES: 'test/CLEAR_ENTITIES',
  WHATHEVER: 'test/WHATHEVER'
};

it('should return the initial state', () => {
  const entitiesReducer = createEntitiesReducer(types, 'employees');
  expect(entitiesReducer(undefined, {})).to.eql({});
});

[
  { entity: 'employees', state: { 1: { id: 1, name: 'Jhon Doe' } } },
  { entity: 'licenses', state: { 1234: { id: 1234, number: 'rn999' } } },
  { entity: 'whathever', state: {} }
].forEach(current => {
  const { entity, state } = current;
  const entitiesReducer = createEntitiesReducer(types, entity);

  it(`should handle the ${
    types.FETCH_SUCCESS
  } action for the ${entity} entity`, () => {
    const action = {
      type: types.FETCH_SUCCESS,
      payload: {
        [entity]: { 64646: { id: 64646, employeeId: 555 } }
      }
    };
    expect(entitiesReducer(state, action)).to.eql({
      ...state,
      ...action.payload[entity]
    });
  });

  it(`should handle the ${
    types.CLEAR_ENTITIES
  } action for the ${entity} entity`, () => {
    expect(entitiesReducer(state, { type: types.CLEAR_ENTITIES })).to.eql({});
  });
});
