// Helper functions to set react state

import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import unionWith from 'lodash/unionWith';

/**
 * Adds an item to the selectedRows array
 * Utility to select a row of a table
 *
 * @param {any} item 1, { id: 1 }
 * @returns {object} { selectedRows: [1] }, { selectedRows: [{ id: 1 }]}
 */
export const selectOne = item => (prevState = {}) => ({
  selectedRows: [...prevState.selectedRows, item]
});

/**
 * Removes an item from the selectedRows array
 * Utility to unselect a row of a table
 *
 * @param {any} item 1, { id: 1 }
 * @returns {object} { selectedRows: [2] }, { selectedRows: [{ id: 2 }] }
 */
export const unselectOne = item => (prevState = {}) => {
  if (typeof item === 'object') {
    return {
      selectedRows: prevState.selectedRows.filter(row => row.id !== item.id)
    };
  }

  return {
    selectedRows: prevState.selectedRows.filter(row => row !== item)
  };
};

/**
 * Adds many items to the selectedRows array
 * Utility to select all the rows of a table
 *
 * @param {any} [items=[]] [1, 2], [{ id: 1 }, { id: 2 }]
 * @returns {object} { selectedRows: [1, 2] }, { selectedRows: [{ id: 1 }, { id: 2 }] }
 */
export const selectAll = (items = []) => (prevState = {}) => ({
  selectedRows: unionWith(prevState.selectedRows, items, isEqual)
});

/**
 * Removes many items from the selectedRows array
 * Utility to unselect all the rows of a table
 *
 * @param {any} [items=[]] [1, 2], [{ id: 1 }, { id: 2 }]
 * @returns {object} { selectedRows: [3] }, { selectedRows: [{ id: 3 }] }
 */
export const unselectAll = (items = []) => (prevState = {}) => ({
  selectedRows: differenceWith(prevState.selectedRows, items, isEqual)
});
