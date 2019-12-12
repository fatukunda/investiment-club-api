import mongoose from 'mongoose';

const env = process.env.NODE_ENV;

if (env === 'development') {
  mongoose.connect(process.env.MONGODB_URL_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
} else if (env === 'testing') {
  mongoose.connect(process.env.MONGODB_URL_TEST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
} else {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
}
