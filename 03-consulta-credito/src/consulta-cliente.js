const calculaValor = require('./calcula-valor');

const db = require('./db');

const juros = 0.025;

const consultar = async (nome, CPF, valor, parcelas) => {
  let cliente = await db.cliente.findOne({
    where: { CPF },
  });

  if (cliente == null) {
    cliente = await db.cliente.create({
      Nome: nome,
      CPF,
    });
  }

  const ultimaConsulta = await db.consulta.findOne({
    where: { ClienteCPF: CPF },
    order: [
      [db.sequelize.col('createdAt'), 'DESC'],
    ],
  });

  if (ultimaConsulta) {
    const diferenca = Math.abs(ultimaConsulta.createdAt.getTime() - new Date().getTime());
    const diferencaDias = Math.round(diferenca / (1000 * 60 * 60 * 24));

    if (diferencaDias <= 30) {
      throw new Error(`Última consula realizada há ${diferencaDias} dias`);
    }
  }

  const montante = calculaValor.calcularMontante(valor, juros, parcelas);
  const prestacoes = calculaValor.calcularPrestacoes(montante, parcelas);

  const novaConsulta = {
    Valor: valor,
    NumPrestacoes: parcelas,
    Juros: juros,
    Prestacoes: prestacoes.join(', '),
    ClienteCPF: cliente.CPF,
    Montante: montante,
  };

  await db.consulta.create(novaConsulta);

  return {
    montante,
    juros,
    parcelas: prestacoes.length,
    primeiraPrestacao: prestacoes[0],
    prestacoes,
  };
};

module.exports = {
  consultar,
};
