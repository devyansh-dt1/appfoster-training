require("dotenv").config();
const { faker } = require("@faker-js/faker");

const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const seedProjects = () => {
  pool.query("SELECT id FROM user", (err, results) => {
    if (err) throw err;

    const userIds = results.map((user) => user.id);

    const projects = [];

    userIds.forEach((userId) => {
      for (let j = 0; j < 3; j++) {
        projects.push([faker.lorem.words(3), faker.lorem.paragraph(), userId]);
      }
    });

    // Insert projects into database
    pool.query(
      `INSERT INTO project (name, body, user_id) VALUES ?`,
      [projects],
      (err) => {
        if (err) throw err;
        console.log("Projects seeded successfully!");
        process.exit();
      }
    );
  });
};

seedProjects();
