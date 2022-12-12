const calculaValor = require('../src/calcula-valor');
require('./extensoes');

describe('calcularMontante', () => {
  test('Com uma prestação, o montante deve ser igual ao capital', () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1);

    // Resultado ou Compotamento esperado
    expect(montante).toBe(100);
  });

  test('Com 4 prestações o montante é acrescido de juros', () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4);

    // Resultado ou Comportamento esperado
    expect(montante).toBe(538.45);
  });
});

describe('arredondar', () => {
  test('Arredondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998);
    expect(resultado).toBe(538.45);

    // TESTE 01 => expect(538.456).toBeCloseTo(538.46);
    // Apesar da diferença entre os valores do TESTE 01,
    // ele irá passar devido ao usoa da função toBeCloseTo.

    // TESTE 02 => expect(538.456).toBeCloseTo(538.46, 3);
    // Porém, no teste 02, o segundo parâmetro passado para a função
    // toBeCloseTo define uma precisão de 3 casas decimais. Nesse caso,
    // o teste comparando os mesmos valores irá falhar.
  });

  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005);
    expect(resultado).toBe(1.01);
  });
});

describe('calcularPrestacoes', () => {
  test('O número de parcelas é igual ao número de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6;

    // Operação
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes);

    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes);
  });

  test('Uma única prestação, valor igual ao montante', () => {
    const numeroPrestacoes = 1;

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes);

    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes[0]).toBe(50);
  });

  test('Duas prestações, valor igual à metade do montante', () => {
    const numeroPrestacoes = 2;

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes);

    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes[0]).toBe(25);
    expect(prestacoes[1]).toBe(25);
  });

  // Utilize a função test.skip para ignorar este teste
  // Utilize a função test.only para executar somente este teste
  test('Valor da soma das prestações deve ser igual ao montante com duas casas decimais', () => {
    // Remova o comentário abaixo para poder depurar a execução dessa função
    // debugger;

    // Dado (given)
    const numeroPrestacoes = 3;
    const montante = 100;

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes);

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes).tenhaSomaDeValoresIgual(montante);
    expect(prestacoes).sejaDecrescente();
  });

  // Utilize a função test.skip para ignorar este teste
  // Utilize a função test.only para executar somente este teste
  test('Desafio semi-final', () => {
    // Remova o comentário abaixo para poder depurar a execução dessa função
    // debugger;

    // Given
    const numeroPrestacoes = 3;
    const montante = 101.994;

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes);

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes).tenhaSomaDeValoresIgual(montante);
    expect(prestacoes).sejaDecrescente();
  });
});
