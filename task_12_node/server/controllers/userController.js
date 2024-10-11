const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected");

    connection.query("SELECT * FROM user", (err, rows) => {
      connection.release();

      if (!err) {
        res.render("home", { rows, alert: req.query.alert });
      } else {
        console.log(err);
      }
      // console.log("The data from user : \n", rows);
    });
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};

// add new user
exports.create = (req, res) => {
  const { name, username, phone, email, website, companyname } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected");

    connection.query(
      "INSERT INTO user SET name=?, username=?, phone=?, email=?, website=?, companyname=? ",
      [name, username, phone, email, website, companyname],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.redirect("/?alert=User added successfully");
        } else {
          console.log(err);
        }
        console.log("The data from user : \n", rows);
      }
    );
  });
};

//edit user
exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected");

    connection.query(
      "SELECT * FROM user WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//update user
exports.update = (req, res) => {
  const { name, username, phone, email, website, companyname } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected");

    connection.query(
      "UPDATE user SET name=?, username=?, phone=?, email=?, website=?, companyname=? WHERE id=?",
      [name, username, phone, email, website, companyname, req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log("Connected");

            connection.query(
              "SELECT * FROM user WHERE id=?",
              [req.params.id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("edit-user", {
                    rows,
                    alert: "User Updated Successfully",
                  });
                } else {
                  console.log(err);
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// delete user

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected");

    connection.query(
      "DELETE FROM user WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      }
    );
  });
};
