const readline = require("readline");

function verificarNumero(valor) {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(valor) ? true : false;
}

function verificarExpressao(codigo) {
  let possuiIf = false;
  let possuiComparacao = false;
  let comparacaoPassou = false;
  let abrirParentese = false;
  let fecharParentese = false;
  const tokens = codigo.split(/\s+/);

  for (let i = 0; i < tokens.length; i++) {
    const ultimoToken = tokens[i - 1];
    const token = tokens[i];

    if (token === "if" && possuiIf === false) {
      console.log(`Token: ${token}`);
      possuiIf = true;
      abrirParentese = true;
      continue;
    }

    if (ultimoToken === "if") {
      if (token === "(") {
        console.log(`Token: ${token}`);
        abrirParentese = false;
        fecharParentese = true;
        continue;
      } else {
        return console.log(`Erro: Token "${token}", deve abrir um parêntese apos o if`);
      }
    }

    if (i === tokens.length - 1 && fecharParentese === true) {
      if (token === ")") {
        console.log(`Token: ${token}`);
        continue;
      } else {
        return console.log(`Erro: Token "${token}", não foi fechado o parêntese`);
      }
    }

    if (verificarNumero(ultimoToken) && possuiComparacao === false) {
      if (token === ">" || token === "<" || token === ">=" || token === "<=" || token === "===" || token === "==") {
        possuiComparacao = true;
        console.log(`Token: ${token}`);
        continue;
      }
    }

    if (verificarNumero(token)) {
      if (possuiComparacao) {
        comparacaoPassou = true;
      }
      console.log(`Token: ${token}`);
    } else {
      return console.log(`Erro: Token "${token}" não é um Número`);
    }
  }

  if (possuiComparacao && comparacaoPassou === false) {
    return console.log(`Erro: Comparação não foi concluída`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite o código fonte: ", (codigo) => {
  verificarExpressao(codigo);
  rl.close();
});
