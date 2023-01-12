const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./queries");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
      return res.status(500).send({ msg: `Error occured ${err}` });
    }
    return res.json({ name: myFile.name, path: `/${myFile.name}` });
  });
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/register", db.createUserfromactions);
app.post("/login", db.loginuser);
app.post("/transfer", db.uploadimages);
app.post("/registrsTriggers", db.rigesterTriggers);
app.post("/getdata", db.getdata);
app.post("/gettitle", db.gettitle);
app.post("/durationfilter", db.durationfilter);
app.post("/ingridentsfilter", db.durationfilter);
app.post("/getcomment", db.getcomment);
app.post("/detailinfo", db.detailinfo);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
