const express = require('express');
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './env' });

const app = express();

//Development logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
//Body parser
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Image Uploader app running!');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	//Close server & exit process
	server.close(() => process.exit(1));
});
