const app = require('./server/custom-express');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server running in the port ' + PORT));