const connection = require("./connection");

const findAll = async () => {
  try {
    const { rows } = await connection.query('SELECT * FROM employees');

    return {
      statusCode: 200,
      body: rows,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao obter os dados.' }),
    };
  }
};

module.exports = {
  findAll,
};