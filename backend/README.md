# IMS Backend

- `await pool.query("SELECT * FROM Shoe")` has the following return value:

``bash
Result {
  command: 'SELECT',
  rowCount: 6,
  oid: null,
  rows: [
    { shoe_id: 2, shoe_name: 'Jordan', shoe_color: 'Red' },
    { shoe_id: 3, shoe_name: 'Airforce', shoe_color: 'White' },
    { shoe_id: 4, shoe_name: 'Nike 270', shoe_color: 'Black' },
    { shoe_id: 5, shoe_name: 'Timber Lofa', shoe_color: 'Black' },
    { shoe_id: 6, shoe_name: 'Prada', shoe_color: 'Yellow' },
    { shoe_id: 7, shoe_name: 'Timber Boot', shoe_color: 'Blue' }
  ],
  fields: [
    Field {
      name: 'shoe_id',
      tableID: 16734,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    },
    Field {
      name: 'shoe_name',
      tableID: 16734,
      columnID: 2,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 259,
      format: 'text'
    },
    Field {
      name: 'shoe_color',
      tableID: 16734,
      columnID: 3,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 259,
      format: 'text'
    }
  ],
  _parsers: [
    [Function: parseInteger],
    [Function: noParse],
    [Function: noParse]
  ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: { shoe_id: null, shoe_name: null, shoe_color: null }
}
```

- Take note of the rows.

## Employee Routes
- `app.use("/api/employee")`
- `type nul > routes/employeeRoutes.js`
- `type nul > controllers/employeeControllers.js`