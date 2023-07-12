const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "pijarcamp",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log(`database connected...`);
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM produk";
  db.query(sql, (err, result, fields) => {
    const users = JSON.parse(JSON.stringify(result));
    res.render("index", { users: users, title: "Pijarcamp Database" });
  });
});

app.get("/remove", (req, res) => {
  const deletesql = `DELETE * produk (nama_produk, keterangan, harga, jumlah) VALUES ('${req.body.nama_produk}', 
  '${req.body.keterangan}', '${req.body.harga}','${req.body.jumlah}')`;
  db.query(deletesql, (err, result, fields) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.post("/tambah", (req, res) => {
  const insertsql = `INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES ('${req.body.nama_produk}', 
    '${req.body.keterangan}', '${req.body.harga}','${req.body.jumlah}');`;
  db.query(insertsql, (err, result, fields) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(8000, () => {
  console.log("server ready...");
});
