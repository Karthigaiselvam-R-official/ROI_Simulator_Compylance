const sqlite3 = require('sqlite3').verbose();

let db;

const init = () => {
  db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Connected to SQLite database');
      createTables();
    }
  });
};

const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS scenarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      input_data TEXT,
      result_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const saveScenario = (data) => {
  return new Promise((resolve, reject) => {
    const { scenario_name, input, result } = data;
    const inputData = JSON.stringify(input);
    const resultData = JSON.stringify(result);

    db.run(
      'INSERT OR REPLACE INTO scenarios (name, input_data, result_data) VALUES (?, ?, ?)',
      [scenario_name, inputData, resultData],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name: scenario_name,
            input: JSON.parse(inputData),
            result: JSON.parse(resultData)
          });
        }
      }
    );
  });
};

const getAllScenarios = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, input_data, result_data, created_at FROM scenarios ORDER BY created_at DESC', 
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const scenarios = rows.map(row => ({
            id: row.id,
            name: row.name,
            input: JSON.parse(row.input_data),
            result: JSON.parse(row.result_data),
            created_at: row.created_at
          }));
          resolve(scenarios);
        }
      }
    );
  });
};

const getScenario = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, input_data, result_data FROM scenarios WHERE id = ?', 
      [id], 
      (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve({
            id: row.id,
            name: row.name,
            input: JSON.parse(row.input_data),
            result: JSON.parse(row.result_data)
          });
        } else {
          resolve(null);
        }
      }
    );
  });
};

const deleteScenario = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM scenarios WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0);
      }
    });
  });
};

module.exports = {
  init,
  saveScenario,
  getAllScenarios,
  getScenario,
  deleteScenario
};