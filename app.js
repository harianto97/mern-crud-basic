require('./config/mongoose_conn');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
// const ProductRouterV1 = require('./app/productV1/routes');
const ProductRouterV2 = require('./app/productV2/routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))

// app.use('/api/v1', ProductRouterV1);
app.use('/api/v2', ProductRouterV2);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: `Resources ${req.originalUrl} Not Found`
    })
})

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log(`App Berjalan pada port : ${PORT}`));