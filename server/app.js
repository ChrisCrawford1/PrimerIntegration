const express = require('express');
const cors = require('cors')
const app = express();

/** Middlewares */
// Body Parser
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use('/payments', require('./routes/payments'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});