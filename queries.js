const Pool = require("pg").Pool;
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "hahujobs";
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "abuye",
  password: "13399955",
  port: 5432,
});

const createUserfromactions = (request, response) => {
  const { name, email } = request.body.input;
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          message: "you alerady registred with this site",
        });
      } else {
        pool.query(
          "INSERT INTO users (name, email) VALUES ($1, $2)",
          [name, email],
          (error, results) => {
            if (error) {
              throw error;
            }

            response.json({
              message: "you have successfully registred",
              name: name,
            });
          }
        );
      }
    }
  );
};

const loginuser = (request, response) => {
  const { name, email } = request.body.input;
  pool.query(
    "SELECT * FROM users WHERE email = $1 AND name = $2",
    [email, name],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        var obj = {
          name: request.body.input.name,
          email: request.body.input.email,
        };

        const generated = jwt.sign(obj, TOKEN_SECRET);

        response.json({
          message: "you are logged in",
          token: generated,
        });
      } else {
        response.json({
          message: "either name or password is incorrects",
          token: "no token assigned",
        });
      }
    }
  );
};

const rigesterTriggers = (request, response) => {
  response.json({
    message: "HASURA EVENT triggers called based on users added on databases",
  });
};

const uploadimages = (request, response) => {
  const file = request.body.input;
  console.log(file);
};

const getdata = (request, response) => {
  const { email } = request.body.input;
  const file = request.body.input;
  console.log(file);
  response.json({
    datas: "found",
  });
};

const gettitle = (request, response) => {
  const { title } = request.body.input;
  pool.query(
    "SELECT * FROM foods WHERE title = $1 OR time = $1 OR catagory = $1 ",
    [title],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          datas: results.rows,
        });
      } else {
        response.json({
          datas: "nodatas",
        });
      }
    }
  );
};

const getcomment = (request, response) => {
  const { foodid } = request.body.input;
  pool.query(
    "SELECT * FROM comments WHERE foodid = $1",
    [foodid],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          datas: results.rows,
        });
      } else {
        response.json({
          datas: "nodatas",
        });
      }
    }
  );
};







const durationfilter = (request, response) => {
  pool.query("SELECT * FROM foods ORDER BY time ASC", (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length >= 1) {
      response.json({
        datas: results.rows,
      });
    } else {
      response.json({
        datas: "nodatas",
      });
    }
  });
};

const ingridentsfilter = (request, response) => {
  pool.query(
    "SELECT * FROM foods ORDER BY ingridents ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length >= 1) {
        response.json({
          datas: results.rows,
        });
      } else {
        response.json({
          datas: "nodatas",
        });
      }
    }
  );
};

const  detailinfo = (request, response) => {
  const { foodid } = request.body.input;
  pool.query(
    "SELECT * FROM foodstaffs WHERE foodid = $1",
    [foodid],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          datas: results.rows,
        });
      } else {
        response.json({
          datas: "nodatas",
        });
      }
    }
  );
};








module.exports = {
  createUserfromactions,
  loginuser,
  rigesterTriggers,
  uploadimages,
  getdata,
  gettitle,
  durationfilter,
  ingridentsfilter,
  getcomment,
  detailinfo,

};
