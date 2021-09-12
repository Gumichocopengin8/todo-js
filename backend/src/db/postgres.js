import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

client.connect();

client.query(
  `CREATE TABLE IF NOT EXISTS todo_list(
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);`,
  (err, res) => {
    console.log(`Successfully create todo_list table`);
    if (err) {
      console.log(`ERROR Creating todo_list: ${err}`);
      client.end();
    }
  },
);

client.query(
  `CREATE TABLE IF NOT EXISTS todo_list_item(
    id SERIAL NOT NULL,
    list_id SERIAL NOT NULL REFERENCES todo_list(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    is_completed boolean DEFAULT false,
    PRIMARY KEY (id)
  );`,
  (err, res) => {
    console.log(`Successfully create todo_list_item table`);
    if (err) {
      console.log(`ERROR Creating todo_list_item: ${err}`);
      client.end();
    }
  },
);

export default client;
