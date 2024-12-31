module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mentor-student',
    port: process.env.PORT || 5000
  };