const pool = require("./mysql2");

const selectUser = () => {
  return pool.execute(`SELECT * FROM reactnode.user `);
};

const cheakUserEmail = (email) => {
  return pool.execute(
    `SELECT * FROM reactnode.user WHERE email = ? `,
    [email]
  );
};
const cheakUserName = (name) => {
  return pool.execute(
    `SELECT * FROM reactnode.user WHERE name = ? `,
    [name]
  );
};


// to Restore my password

const cheakUserEmailAndName = (name,email) => {
  return pool.execute(
    `SELECT * FROM reactnode.user WHERE name = ? AND email = ? `,
    [name,email]
  );
};

const selectAllStores = () => {
  return pool.execute(
    `SELECT * FROM reactnode.user WHERE isStore = 1`,
    []
  );
};




const insertNewStore = (name, password, email, phon, view, date,isStore) => {
  return pool.execute(
    `INSERT INTO reactnode.user 
    (name, password, email, phon, view, date, isStore) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?) `,
    [name, password, email, phon, view, date,isStore]
  );
};


const selectUserById = (id) => {
  return pool.execute(
    `SELECT * FROM reactnode.user  WHERE password = ? `,
    [id]
  );
};
const updateUser = (password, userName, email, phon, view, userID) => {
  return pool.execute(
    `UPDATE reactnode.user 
    SET password = ?,
    name =?,email =?,
    phon=?,view=?
    WHERE number = ? `,
    [password, userName, email, phon, view, userID]
  );
};

const updateStore = (password, userName, email, phon, view, userID) => {
  return pool.execute(
    `UPDATE reactnode.user 
    SET password = ?,
    name =?,email =?,
    phon=?,view=?
    WHERE number = ? `,
    [password, userName, email, phon, view, userID]
  );
};


const updateUserViwe = (view ,number) => {
  return pool.execute(
    `UPDATE reactnode.user 
    SET view=?
    WHERE number = ? `,
    [view ,number]
  );
};







module.exports.selectUser = selectUser;
module.exports.selectUserById = selectUserById;
module.exports.cheakUserEmail = cheakUserEmail;
module.exports.insertNewStore = insertNewStore;
module.exports.cheakUserName = cheakUserName;
module.exports.selectAllStores = selectAllStores;
module.exports.updateUser = updateUser;
module.exports.cheakUserEmailAndName = cheakUserEmailAndName;

module.exports.updateUserViwe = updateUserViwe;


module.exports.updateStore = updateStore;

