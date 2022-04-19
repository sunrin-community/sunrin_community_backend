import mongoose  from 'mongoose'
import config from './config/config'

try {
    mongoose.connect(config.DB.URI);
    console.log('MongoDB connection SUCCESS');
} catch (error) {
    if(error) throw error;
    console.log(error);
    console.error('MongoDB connection FAIL');
    process.exit(1);
}