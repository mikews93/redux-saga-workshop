import { schema } from 'normalizr';
import omit from 'lodash/omit';

export const cagada = new schema.Entity(
  'cagadas',
  {},
  { processStrategy: entity => omit(entity, 'href') }
);

export const cagadas = new schema.Array(cagada);
