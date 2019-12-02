const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongodb, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connectedd!"))
  .catch(err => {
    console.log("asq" + err);
  });
