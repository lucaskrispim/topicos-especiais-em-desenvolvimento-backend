function arredondar(valor) {
  const precisao = 100;
  const arredondado = Math.round((valor + Number.EPSILON) * precisao) / precisao;
  return arredondado;
}

function calcularMontante(capital, taxa, periodo) {
  // let montante = capital * Math.pow((1 + taxa), periodo - 1);
  // ATENÇÃO: O cálculo realizado na linha a seguir pode ser feito utilizando
  // a função Math.pow conforme comentário acima.
  let montante = capital * (1 + taxa) ** (periodo - 1);
  montante = arredondar(montante);
  return montante;
}

function calcularPrestacoes(montante, numeroParcelas) {
  const prestacaoBase = arredondar(montante / numeroParcelas);
  const resultado = Array(numeroParcelas).fill(prestacaoBase);

  let somaPrestacoes = resultado.reduce((a, t) => a + t);
  let diferenca = arredondar(montante - somaPrestacoes);
  const fator = diferenca > 0 ? 1 : -1;
  let i = diferenca > 0 ? 0 : resultado.length - 1;

  while (diferenca !== 0) {
    resultado[i] += arredondar(0.01 * fator);
    somaPrestacoes = resultado.reduce((a, t) => a + t);
    diferenca = arredondar(montante - somaPrestacoes);
    i += fator;
  }

  return resultado;
}

module.exports = {
  calcularMontante,
  arredondar,
  calcularPrestacoes,
};
