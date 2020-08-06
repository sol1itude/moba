const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin/index.js')(app)
require('./plugins/db.js')(app)
app.listen(3000, () => {
    console.log('localhost://3000')
})