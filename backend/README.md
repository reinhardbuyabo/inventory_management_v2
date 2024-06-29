

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

## Bearer Token
- In `authMiddleware.js`, the following comes about upon logging decoded: `{ id: 12, iat: 1718221335, exp: 1720813335 }`

## Error Handling
- Using `errorHandler`
```js
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
});
```

## Routes
1. `POST {BASE_URL}/api/shoes`
- Add Stock Data to Database.
- Requires JWT.
- Query: 

```sql
CREATE TABLE shoe_to_stall(shoe_to_stall_id UUID PRIMARY KEY, shoe_id INT NOT NULL REFERENCES shoe(shoe_id) ON DELETE CASCADE, stall_id INT NOT NULL REFERENCES stall(stall_id) ON DELETE CASCADE, num_of_shoes NUMBER NOT NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL);

INSERT INTO shoe_to_stall(shoe_to_stall_id, shoe_id, stall_id, num_of_shoes, created_at, updated_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

- shoeController.js
```js

pool.query('INSERT INTO shoe_to_stall(shoe_to_stall_id, shoe_id, stall_id, num_of_shoes, created_at, updated_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [], () => {

});
```

```bash
ERROR:  type "number" does not exist
LINE 1: ...S stall(stall_id) ON DELETE CASCADE, num_of_shoes NUMBER NOT...
```

- UUID
- `npm install uuid`


```sql
ALTER TABLE admin ADD COLUMN adm_pass VARCHAR(100) NOT NULL;
```

- Error when you try to enter non-existant shoe/stall data.
```bash
 {
  length: 277,
  severity: 'ERROR',
  code: '23503',
  detail: 'Key (stall_id)=(1) is not present in table "stall".',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'shoe_to_stall',
  column: undefined,
  dataType: undefined,
  constraint: 'shoe_to_stall_stall_id_fkey',
  file: 'ri_triggers.c',
  line: '2619',
  routine: 'ri_ReportViolation'
}
```

### Update Route Test Query
```sql
UPDATE shoe_to_stall SET num_of_shoes=21 WHERE shoe_id=2 AND stall_id=6;
```

- Second Test
```sql
UPDATE shoe_to_stall SET num_of_shoes=30, updated_at=CURRENT_TIMESTAMP WHERE shoe_id=2 AND
 stall_id=5
```

## Multer
- Multer APIs:
```js
.single(fieldname)
```

- DiskStorage:
```js
DiskStorage
The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
```

- config object: `{ dest: "/uploads" }`

- App.js
```js
var multer = require('multer');
var app = express();
var fs = require('fs');

//. . . 

var upload = multer({ dest: 'upload/'});
var type = upload.single('file');

app.post('/upload', type, function (req,res) {
  var tmp_path = req.files.recfile.path;
  var target_path = 'uploads/' + req.files.recfile.name;
fs.readFile(tmp_path, function(err, data)
{
  fs.writeFile(target_path, data, function (err)
  {
    res.render('complete');
  })
});
```

- App.js
```js
 const express        = require('express');
 const bodyParser     = require('body-parser');
 const app = express();
 var multer = require('multer');
 const port = 8000;
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.listen(port, ()=>{
 console.log('We are live on' + port);
 });

 var upload = multer({dest:'./upload/'});

 app.post('/post', upload.single('file'), function(req, res) {
  console.log(req.file);
 res.send("file saved on server");
 });
```

```js
{
    "fieldname": "file",
    "originalname": "sixhunfourhun.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "./uploads",
    "filename": "ba5a8b81dc1d48ced933fc3d9811364c",
    "path": "uploads\\ba5a8b81dc1d48ced933fc3d9811364c",
    "size": 6349
}

{
    "fieldname": "file",
    "originalname": "sixhunfourhun.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "./uploads",
    "filename": "sixhunfourhun.png",
    "path": "uploads\\sixhunfourhun.png",
    "size": 11211
}
```

### File Upload:
- Route: `POST /api/shoes`
- When adding stock, we want to add the following attributes about a shoe: 
1. The Image of the Shoe.
2. The Shoe Name
3. The Shoe Color

- We also expect that the Manager would want to initialize a starting value for the Shoes that have arrived. If the Value is not set, then we can default it to 0.
- However the num_of_shoes attribute is stored in a different table, reason being NORMALIZATION.

- My INSERT query completes before my select query.

### URL/Route Parameters
- Each Shoe has an id.

```js
app.get('/api/shoe/:id', (req, res) => {
  // A Single Document in the Database with that id
  const id = req.params.id;

  console.log()
})

```