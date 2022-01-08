const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true, limit: '50mb ' }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
