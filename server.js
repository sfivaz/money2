const app = require('./routing/custom-express');

const port = 8080;

app.listen(port, () =>
    console.log('Server running in the port ' + port));