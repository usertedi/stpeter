const assert = require('node:assert/strict');
const test = require('node:test');
const { getPagination, getPaginationMeta } = require('../src/utils/pagination');

test('getPagination applies safe defaults', () => {
  assert.deepEqual(getPagination({}, { defaultLimit: 25, maxLimit: 100 }), {
    page: 1,
    limit: 25,
    skip: 0,
  });
});

test('getPagination caps oversized limits', () => {
  assert.deepEqual(getPagination({ page: '3', limit: '500' }, { defaultLimit: 25, maxLimit: 100 }), {
    page: 3,
    limit: 100,
    skip: 200,
  });
});

test('getPaginationMeta returns stable page metadata', () => {
  assert.deepEqual(getPaginationMeta({ page: 2, limit: 10, total: 26 }), {
    page: 2,
    limit: 10,
    total: 26,
    pages: 3,
  });
});
