const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password, id_role) values (?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.password, 1]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async readUserByEmail(email) {
    const [[row]] = await this.database.query(
      `select * from ${this.table} where email = ? LIMIT 1`,
      [email]
    );

    return row;
  }

  async update(user, id) {
    const result = await this.database.query(
      `update ${this.table} set firstname=?, lastname=?, email=?, id_role=? where id = ?`,
      [user.firstname, user.lastname, user.email, user.id_role, id]
    );

    return result;
  }

  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = UserManager;
