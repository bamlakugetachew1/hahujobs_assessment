const Pool = require("pg").Pool;
const pool = new Pool({
  user: "mxeskohgnaoxkg",
  host: "ec2-52-203-118-49.compute-1.amazonaws.com",
  database: "d4boibtoude9bv",
  password: "e33b9795eb07a5a83823c4aa47e5619e20b06f2a0d519949d0e2fa64300d4f3e",
  port: 5432,
    
  /*

user: "postgres",
  host: "localhost",
  database: "abuye",
  password: "13399955",
  port: 5432,


  */


});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const createUserfromactions = (request, response) => {
  const { name, email } = request.body.input;
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      //response.status(200).json(results.rows)m

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

/*
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }

      response.json({
        name: "user is added succesfully",
      });
    })

*/

/*
       "x-hasura-admin-secret":"bamlaku",
            
  const TOKEN_SECRET="YWJ1eWVnZXRnbWFpbGNvbWJhbWxha3VnZXRhY2hld2FzcmVzZW5naWRh";
 
          const  hashed= request.body.input.name;
          var obj = {
                   "X-Hasura-Role": 'user',
                   "X-Hasura-User-id":44,
                    name:hashed, 
                 };
          const generated=jwt.sign(obj,TOKEN_SECRET);
                   */

const loginuser = (request, response) => {
  const { name, email } = request.body.input;

  pool.query(
    "SELECT * FROM users WHERE email = $1 AND name = $2",
    [email,name],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          message: "you are logged in",
          token: results.rows,
          email: email,
        });
      } else {
        response.json({
          message: "either name or password is incorrects",
          token: "no token assigned",
          email: "no email found",
        });
      }
    }
  );
};

const getdata = (request, response) => {
  const { email } = request.body.input;

  pool.query(
    "SELECT * FROM contacts WHERE cemail = $1 ",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          datas: results.rows,
          numbers: results.rowCount,
        });
      } else {
        response.json({
          datas: "nodatas",
          numbers: 0,
        });
      }
    }
  );
};

/*
  pool.query(
    "SELECT * FROM users WHERE name = $1 AND email = $2",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length >= 1) {
        response.json({
          message: "you are logged in",
          token: "generated",
        });
      } else {
        response.json({
          message: "either name or email incorrect",
          token: "generated",
        });
      }
    }
  );

  */

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const deletecontacts = (request, response) => {
  const { email } = request.body.input;
  const val="fg"
  pool.query("DELETE FROM contacts WHERE cemail = $1 ", [email], (error, results) => {
    if (error) {
      throw error;
    }
     else{
      response.json({
        message:results.rows.length,
       
      });
     }
  });



};



module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createUserfromactions,
  loginuser,
  getdata,
  deletecontacts,
};
