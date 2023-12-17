import render from '../render.js';

const data = [
  {
    name: 'common',
    type: 'obj',
    state: 'withoutChange',
    value: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    childrens: [
      {
        name: 'follow',
        state: 'added',
        value: false,
      },
      {
        name: 'setting1',
        type: 'primitive',
        state: 'withoutChange',
        value: 'Value 1',
      },
      {
        name: 'setting2',
        type: 'primitive',
        state: 'removed',
        value: 200,
      },
      {
        name: 'setting3',
        type: 'primitive',
        state: 'removed',
        value: true,
      },
      {
        name: 'setting3',
        state: 'added',
        value: null,
      },
      {
        name: 'setting4',
        state: 'added',
        value: 'blah blah',
      },
      {
        name: 'setting5',
        state: 'added',
        value: {
          key5: 'value5',
        },
        childrens: [
          {
            name: 'key5',
            type: 'primitive',
            state: 'withoutChange',
            value: 'value5',
          },
        ],
      },
      {
        name: 'setting6',
        type: 'obj',
        state: 'withoutChange',
        value: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
        childrens: [
          {
            name: 'doge',
            type: 'obj',
            state: 'withoutChange',
            value: {
              wow: '',
            },
            childrens: [
              {
                name: 'wow',
                type: 'primitive',
                state: 'removed',
                value: '',
              },
              {
                name: 'wow',
                state: 'added',
                value: 'so much',
              },
            ],
          },
          {
            name: 'key',
            type: 'primitive',
            state: 'withoutChange',
            value: 'value',
          },
          {
            name: 'ops',
            state: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    name: 'group1',
    type: 'obj',
    state: 'withoutChange',
    value: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    childrens: [
      {
        name: 'baz',
        type: 'primitive',
        state: 'removed',
        value: 'bas',
      },
      {
        name: 'baz',
        state: 'added',
        value: 'bars',
      },
      {
        name: 'foo',
        type: 'primitive',
        state: 'withoutChange',
        value: 'bar',
      },
      {
        name: 'nest',
        type: 'obj',
        state: 'removed',
        value: {
          key: 'value',
        },
        childrens: [
          {
            name: 'key',
            type: 'primitive',
            state: 'withoutChange',
            value: 'value',
          },
        ],
      },
      {
        name: 'nest',
        value: 'str',
        state: 'added',
      },
    ],
  },
  {
    name: 'group2',
    type: 'obj',
    state: 'removed',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    childrens: [
      {
        name: 'abc',
        type: 'primitive',
        state: 'withoutChange',
        value: 12345,
      },
      {
        name: 'deep',
        type: 'obj',
        state: 'withoutChange',
        value: {
          id: 45,
        },
        childrens: [
          {
            name: 'id',
            type: 'primitive',
            state: 'withoutChange',
            value: 45,
          },
        ],
      },
    ],
  },
  {
    name: 'group3',
    state: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    childrens: [
      {
        name: 'deep',
        type: 'obj',
        state: 'withoutChange',
        value: {
          id: {
            number: 45,
          },
        },
        childrens: [
          {
            name: 'id',
            type: 'obj',
            state: 'withoutChange',
            value: {
              number: 45,
            },
            childrens: [
              {
                name: 'number',
                type: 'primitive',
                state: 'withoutChange',
                value: 45,
              },
            ],
          },
        ],
      },
      {
        name: 'fee',
        type: 'primitive',
        state: 'withoutChange',
        value: 100500,
      },
    ],
  }];

const result = `{
      common: {
          + follow: false
            setting1: Value 1
          - setting2: 200
          - setting3: true
          + setting3: null
          + setting4: blah blah
          + setting5: {
                  key5: value5
            }
            setting6: {
                  doge: {
                      - wow: 
                      + wow: so much
                  }
                  key: value
                + ops: vops
            }
      }
      group1: {
          - baz: bas
          + baz: bars
            foo: bar
          - nest: {
                  key: value
            }
          + nest: str
      }
    - group2: {
            abc: 12345
            deep: {
                  id: 45
            }
      }
    + group3: {
            deep: {
                  id: {
                        number: 45
                  }
            }
            fee: 100500
      }
}`;

describe('render tests', () => {
  test('parse Json', () => {
    expect(render(data)).toBe(result);
  });
});
