import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("serviceq.db");

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS serviceRecord (  id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, phone TEXT, service TEXT, date TEX )",
    []
  );
});

// Operações CRUD

// Inserir usuário
export const insertServiceRecord = (name, phone, service, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO serviceRecord(name, phone, service, date) VALUES (?, ?, ?, ?)",
      [name, phone, service, date],
      (tx, result) => {
        console.log(result);
      }
    );
  });
};
// Selecionar todos os usuários
export const findServiceRecord = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM serviceRecord ORDER BY date ASC",
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

/*
// Validar login
export const validarServiceRecord= (nome, senha) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM serviceRecor WHERE nome = ? AND senha = ?',
        [nome, senha],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
*/

// Atualizar usuário
export const atualizarServiceRecord = (id, name, phone, service, date) => {
   console.log("id:", id);
   console.log("Nome:", name);
   console.log("Telefone:", phone);
   console.log("Observação:", service);
   console.log("Data e Hora Selecionadas:", date);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE serviceRecord SET name = ?, phone = ?, service = ?, date=? WHERE id = ?",
        [name, phone, service, date, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Deletar usuário
export const deletarServiceRecord = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM serviceRecor WHERE id = ?",
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
