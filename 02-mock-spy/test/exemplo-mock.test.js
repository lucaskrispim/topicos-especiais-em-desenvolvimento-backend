const exemploMock = require('../src/exemplo-mock');

test('Exemplo 01 - Mock callback', async () => {
  // preparar o cenário
  const pessoas = new Array(3);

  pessoas[0] = {
    nome: 'João',
    idade: 19,
  };

  pessoas[1] = {
    nome: 'Jose',
    idade: 17,
  };

  pessoas[2] = {
    nome: 'Maria',
    idade: 18,
  };

  const mockCallback = jest.fn((p) => p.idade);

  // realizar a execução
  exemploMock.realizarParaAdultos(pessoas, mockCallback);

  // asserts
  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(pessoas[0]);
  expect(mockCallback.mock.results[0].value).toBe(pessoas[0].idade);
  expect(mockCallback.mock.calls[1][0]).toBe(pessoas[2]);
  expect(mockCallback.mock.results[1].value).toBe(pessoas[2].idade);
});

test('Teste 02 - Mock Timer', (done) => {
  jest.useFakeTimers();

  const mockCallback = jest.fn(() => done());

  exemploMock.aguardarTimer(mockCallback);

  jest.advanceTimersByTime(1000);
  expect(mockCallback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(3000);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

afterEach(() => {
  jest.useRealTimers();
});
