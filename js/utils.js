//utils cadastro

function editarCadastro(linha, dados) {
  try {
    Logger.log("Iniciando a edição na linha: " + linha);
    Logger.log("Dados recebidos para edição: " + JSON.stringify(dados));

    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    var aba = planilha.getSheetByName('Alunos');

    if (!aba) {
      Logger.log("Erro: Aba 'Alunos' não encontrada.");
      return { success: false, message: 'Aba "Alunos" não encontrada.' };
    }

    var ultimaLinha = aba.getLastRow();
    Logger.log("Última linha da aba 'Alunos': " + ultimaLinha);

    if (linha > ultimaLinha || linha < 2) { // Verificar se a linha é válida
      Logger.log("Erro: Linha inválida. Verifique o número da linha.");
      return { success: false, message: 'Linha inválida. Verifique o número da linha.' };
    }

    Logger.log("Editando a linha " + linha + " com os novos valores.");

    // Atualizar os dados na linha correta
    aba.getRange(linha, 1).setValue(dados.nomeCompleto);
    aba.getRange(linha, 2).setValue(dados.endereco);
    aba.getRange(linha, 3).setValue(dados.rg);
    aba.getRange(linha, 4).setValue(dados.cpf);
    aba.getRange(linha, 5).setValue(dados.celular);
    aba.getRange(linha, 6).setValue(dados.profissao);
    aba.getRange(linha, 7).setValue(dados.email);

    // As datas já vêm no formato yyyy-mm-dd, então salvamos diretamente
    aba.getRange(linha, 8).setValue(dados.dataNascimento);
    aba.getRange(linha, 9).setValue(dados.escolaridade);
    aba.getRange(linha, 10).setValue(dados.ligacaoComMusica);
    aba.getRange(linha, 11).setValue(dados.classificacaoVocal);
    aba.getRange(linha, 12).setValue(dados.comoSoube);
    aba.getRange(linha, 13).setValue(dados.tipoCoral);
    aba.getRange(linha, 14).setValue(dados.status);
    aba.getRange(linha, 15).setValue(dados.genero);
    aba.getRange(linha, 16).setValue(dados.dataDesistencia); // Pode estar vazio
    aba.getRange(linha, 17).setValue(dados.dataCadastro);
    aba.getRange(linha, 18).setValue(dados.recebeBeneficio);
    aba.getRange(linha, 19).setValue(dados.usoImagem);
    aba.getRange(linha, 20).setValue(dados.tipoResponsavel); // Campo corrigido
    aba.getRange(linha, 21).setValue(dados.responsavel);     // Campo corrigido
    aba.getRange(linha, 22).setValue(dados.nomePai);
    aba.getRange(linha, 23).setValue(dados.nomeMae);
     aba.getRange(linha, 24).setValue(dados.bairro);        // Novo campo
    aba.getRange(linha, 25).setValue(dados.cidade);        // Novo campo
    aba.getRange(linha, 26).setValue(dados.estado);        // Novo campo
    aba.getRange(linha, 27).setValue(dados.cep);           // Novo campo

    Logger.log("Dados atualizados com sucesso para a linha " + linha);

    return { success: true, message: 'Cadastro atualizado com sucesso.' };
  } catch (error) {
    Logger.log('Erro ao editar cadastro: ' + error);
    return { success: false, message: 'Erro ao editar cadastro: ' + error.message };
  }
}


/**
 * Função para obter todos os dados de cadastro dos alunos.
 * @return {Object} - Objeto contendo os dados e o total de registros.
 */
function obterDadosCadastro() {
  try {
    var spreadsheetId = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0';
    var sheetName = 'Alunos';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();

    // Cabeçalho da planilha
    var headers = data[0];

    // Remover o cabeçalho dos dados
    data.shift();

    // Total de registros
    var totalRecords = data.length;
    Logger.log('Total de registros (sem cabeçalho): ' + totalRecords);

    // Mapear os dados para um formato mais apropriado
    var formattedData = data.map(function(row, index) {
      Logger.log('Processando registro ' + (index + 1));
      Logger.log('Processando registro ' + (index + 1) + ': ' + JSON.stringify(row));
      return {
        NomeCompleto: row[0],
        Endereco: row[1],
        RG: row[2],
        CPF: row[3],
        Celular: row[4],
        Profissao: row[5],
        Email: row[6],
        dataNascimento: formatarData(row[7]),
        Escolaridade: row[8],
        ligacaoComMusica: row[9],
        classificacaoVocal: row[10],
        comoSoube: row[11],
        tipoCoral: row[12],
        status: row[13],
        genero: row[14],
        dataDesistencia: formatarData(row[15]),
        dataCadastro: formatarData(row[16]),
        recebeBeneficio: row[17],
        usoImagem: row[18],
        tipoResponsavel: row[19], // Novo campo
        responsavel: row[20],
        nomePai: row[21], // Novo campo
        nomeMae: row[22],  // Novo campo
        bairro: row[23],          // Novo campo
        cidade: row[24],          // Novo campo
        estado: row[25],          // Novo campo
        cep: row[26],             // Novo campo
      };
    });

    Logger.log('Total de registros formatados: ' + formattedData.length);

    // Retornar os dados formatados
    return {
      data: formattedData,
      totalRecords: totalRecords
    };

  } catch (error) {
    Logger.log('Erro na função obterDadosCadastro: ' + error);
    throw new Error('Não foi possível obter os dados de cadastro.');
  }
}


/**
 * Função auxiliar para formatar datas de yyyy-mm-dd para dd-mm-yyyy
 * @param {Date|string} date - Data a ser formatada
 * @return {string} - Data formatada em dd-mm-yyyy
 */
function formatarData(date) {
  if (!date) return '';
  try {
    var dataObj = new Date(date);
    var dia = ('0' + dataObj.getDate()).slice(-2);
    var mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    var ano = dataObj.getFullYear();
    return dia + '-' + mes + '-' + ano;
  } catch (error) {
    Logger.log('Erro ao formatar data: ' + error);
    return '';
  }
}

/**
 * Função para limpar o cache do script
 */
function limparCache() {
  var cache = CacheService.getScriptCache();
  cache.remove('dadosCadastro');
  Logger.log('Cache limpo com sucesso.');
}

/**
 * Função para salvar um novo cadastro na planilha
 * @param {Object} dados - Dados do formulário de cadastro
 * @return {string} - Mensagem de sucesso ou erro
 */
function salvarCadastroNovo(dados) {
  try {
    var spreadsheetId = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0';
    var sheetName = 'Alunos';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    // Formatar as datas para yyyy-mm-dd
    var dataNascimento = dados.dataNascimento || '';
    var dataDesistencia = dados.dataDesistencia || '';
    var dataCadastro = dados.dataCadastro || '';

    // Preparar os dados para inserção
    var newRow = [
      dados.nomeCompleto,
      dados.endereco,
      dados.rg,
      dados.cpf,
      dados.celular,
      dados.profissao,
      dados.email,
      dataNascimento,
      dados.escolaridade,
      dados.ligacaoComMusica,
      dados.classificacaoVocal,
      dados.comoSoube,
      dados.tipoCoral,
      dados.status,
      dados.genero,
      dataDesistencia,
      dataCadastro,
      dados.recebeBeneficio,
      dados.usoImagem,
      dados.tipoResponsavel, // Novo campo
      dados.responsavel,
      dados.nomePai, // Novo campo
      dados.nomeMae,  // Novo campo
      dados.bairro,          // coluna 23 (novo campo)
      dados.cidade,          // coluna 24 (novo campo)
      dados.estado,          // coluna 25(novo campo)
      dados.cep,             // coluna 26 (novo campo)

    ];

    // Inserir a nova linha na planilha
    sheet.appendRow(newRow);

    // Logger para depuração
    Logger.log('Novo cadastro inserido com sucesso.');

    return 'Cadastro salvo com sucesso.';
  } catch (error) {
    Logger.log('Erro na função salvarCadastroNovo: ' + error);
    throw new Error('Não foi possível salvar o cadastro.');
  }
}

function obterContadorNovosRegistros() {
  var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
  var aba = planilha.getSheetByName('Cadastro');

  var dados = aba.getDataRange().getValues();
  var contador = 0;

  // Índice da coluna de marcação (ajuste conforme necessário)
  var indiceDataProcessamento = 27; // Coluna AB (índice começa em 0)

  for (var i = 1; i < dados.length; i++) {
    if (!dados[i][indiceDataProcessamento]) {
      contador++;
    }
  }

  Logger.log('Total de novos registros: ' + contador);
  return contador;
}

// Função para obter novos registros com todos os campos necessários
function obterNovosRegistros() {
  var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
  var aba = planilha.getSheetByName('Cadastro');

  var dados = aba.getDataRange().getValues();
  Logger.log('Dados brutos obtidos da planilha: %s', JSON.stringify(dados));

  var novosRegistros = [];

  // Índices das colunas 
  var indiceNomeCompleto = 0;
  var indiceEndereco = 1;
  var indiceRG = 2;
  var indiceCPF = 3;
  var indiceCelular = 4;
  var indiceProfissao = 5;
  var indiceEmail = 6;
  var indiceDataNascimento = 7;
  var indiceEscolaridade = 8;
  var indiceLigacaoComMusica = 9;
  var indiceClassificacaoVocal = 10;
  var indiceComoSoube = 11;
  var indiceTipoCoral = 12;
  var indiceStatus = 13;
  var indiceGenero = 14;
  var indiceDataDesistencia = 15;
  var indiceDataCadastro = 16;
  var indiceRecebeBeneficio = 17;
  var indiceUsoImagem = 18;
  var indiceTipoResponsavel = 19;
  var indiceResponsavel = 20;
  var indiceNomePai = 21;
  var indiceNomeMae = 22;
  var indiceBairro = 23;
  var indiceCidade = 24;
  var indiceEstado = 25;
  var indiceCEP = 26;
  var indiceDataProcessamento = 30; // Ajuste conforme necessário

  for (var i = 1; i < dados.length; i++) {
    Logger.log('Processando linha %d', i + 1);
    if (!dados[i][indiceDataProcessamento]) {
      Logger.log('Registro não processado encontrado na linha %d', i + 1);
      Logger.log('Dados originais da linha: %s', JSON.stringify(dados[i]));

      var dataNascimentoOriginal = dados[i][indiceDataNascimento];
      var dataDesistenciaOriginal = dados[i][indiceDataDesistencia];
      var dataCadastroOriginal = dados[i][indiceDataCadastro];

      Logger.log('Data Nascimento original: %s', dataNascimentoOriginal);
      Logger.log('Data Desistência original: %s', dataDesistenciaOriginal);
      Logger.log('Data Cadastro original: %s', dataCadastroOriginal);

      var dataNascimentoFormatada = formatarDataParaISO(dataNascimentoOriginal);
      var dataDesistenciaFormatada = formatarDataParaISO(dataDesistenciaOriginal);
      var dataCadastroFormatada = formatarDataParaISO(dataCadastroOriginal);

      Logger.log('Data Nascimento formatada: %s', dataNascimentoFormatada);
      Logger.log('Data Desistência formatada: %s', dataDesistenciaFormatada);
      Logger.log('Data Cadastro formatada: %s', dataCadastroFormatada);

      var registro = {
        id: i + 1, // Linha na planilha
        NomeCompleto: dados[i][indiceNomeCompleto],
        Endereco: dados[i][indiceEndereco],
        RG: dados[i][indiceRG],
        CPF: dados[i][indiceCPF],
        Celular: dados[i][indiceCelular],
        Profissao: dados[i][indiceProfissao],
        Email: dados[i][indiceEmail],
        dataNascimento: dataNascimentoFormatada,
        Escolaridade: dados[i][indiceEscolaridade],
        ligacaoComMusica: dados[i][indiceLigacaoComMusica],
        classificacaoVocal: dados[i][indiceClassificacaoVocal],
        comoSoube: dados[i][indiceComoSoube],
        tipoCoral: dados[i][indiceTipoCoral],
        status: dados[i][indiceStatus],
        genero: dados[i][indiceGenero],
        dataDesistencia: dataDesistenciaFormatada,
        dataCadastro: dataCadastroFormatada,
        recebeBeneficio: dados[i][indiceRecebeBeneficio],
        usoImagem: dados[i][indiceUsoImagem],
        tipoResponsavel: dados[i][indiceTipoResponsavel],
        responsavel: dados[i][indiceResponsavel],
        nomePai: dados[i][indiceNomePai],
        nomeMae: dados[i][indiceNomeMae],
        bairro: dados[i][indiceBairro],
        cidade: dados[i][indiceCidade],
        uf: dados[i][indiceEstado],
        cep: dados[i][indiceCEP]
      };

      Logger.log('Registro formatado: %s', JSON.stringify(registro));

      novosRegistros.push(registro);

       // **Removido:** Não marcar como processado aqui
    //aba.getRange(i + 1, indiceDataProcessamento + 1).setValue(new Date());
    } else {
      Logger.log('Registro já processado na linha %d', i + 1);
    }
  }

  Logger.log('Total de novos registros obtidos: %d', novosRegistros.length);
  Logger.log('Novos registros: %s', JSON.stringify(novosRegistros));

  return novosRegistros;
}



function transferirRegistroParaAluno(dados) {
  try {
    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    var abaCadastro = planilha.getSheetByName('Cadastro');
    var abaAluno = planilha.getSheetByName('Alunos');

    var linhaRegistro = dados.id; // Linha do registro na aba Cadastro

    // Obter os dados atuais do registro na aba Cadastro
    var dadosRegistro = abaCadastro.getRange(linhaRegistro, 1, 1, 28).getValues()[0];

    // Atualizar os dados do registro com os dados editados
    // Supondo que os campos no objeto 'dados' estejam na mesma ordem das colunas
    var novaLinha = [
      dados.NomeCompleto,
      dados.Endereco,
      dados.RG,
      dados.CPF,
      dados.Celular,
      dados.Profissao,
      dados.Email,
      dados.dataNascimento,
      dados.Escolaridade,
      dados.ligacaoComMusica,
      dados.classificacaoVocal,
      dados.comoSoube,
      dados.tipoCoral,
      dados.status,
      dados.genero,
      dados.dataDesistencia,
      dados.dataCadastro,
      dados.recebeBeneficio,
      dados.usoImagem,
      dados.tipoResponsavel,
      dados.responsavel,
      dados.nomePai,
      dados.nomeMae,
      dados.bairro,
      dados.cidade,
      dados.uf,
      dados.cep,
      'transferido com sucesso' // Atualizar a coluna indiceDataProcessamento
    ];

    // Inserir os dados na aba Aluno
    abaAluno.appendRow(novaLinha);

    // Atualizar o registro na aba Cadastro
    abaCadastro.getRange(linhaRegistro, 1, 1, novaLinha.length).setValues([novaLinha]);

    return { success: true };
  } catch (error) {
    Logger.log('Erro ao transferir registro: ' + error);
    return { success: false, message: error.toString() };
  }
}



function formatarDataParaISO(data) {
  Logger.log('Iniciando formatarDataParaISO com data: %s', data);

  if (!data) {
    Logger.log('Data é nula ou vazia.');
    return '';
  }

  // Verificar se 'data' é um objeto Date válido
  if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data.getTime())) {
    Logger.log('Data é um objeto Date válido.');
    var dataFormatada = Utilities.formatDate(data, "GMT-3", "yyyy-MM-dd");
    Logger.log('Data formatada (objeto Date): %s', dataFormatada);
    return dataFormatada;
  } else {
    Logger.log('Data não é um objeto Date válido. Tentando parsear como string.');
    // Verificar se a data está no formato 'dd-mm-yyyy' ou 'dd/mm/yyyy'
    var regex = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/;
    var partes = data.match(regex);
    if (partes) {
      Logger.log('Data corresponde ao formato dd-mm-yyyy ou dd/mm/yyyy.');
      // Extrair dia, mês e ano
      var dia = parseInt(partes[1], 10);
      var mes = parseInt(partes[2], 10) - 1; // Meses em JavaScript começam em zero
      var ano = parseInt(partes[3], 10);
      var date = new Date(ano, mes, dia);
      if (!isNaN(date.getTime())) {
        var dataFormatada = Utilities.formatDate(date, "GMT-3", "yyyy-MM-dd");
        Logger.log('Data formatada (string parseada): %s', dataFormatada);
        return dataFormatada;
      } else {
        Logger.log('Data inválida após parsing.');
        return '';
      }
    } else {
      Logger.log('Data não corresponde ao formato dd-mm-yyyy. Tentando converter diretamente.');
      // Tentar converter diretamente (para formatos 'yyyy-mm-dd' ou 'mm/dd/yyyy')
      var date = new Date(data);
      if (!isNaN(date.getTime())) {
        var dataFormatada = Utilities.formatDate(date, "GMT-3", "yyyy-MM-dd");
        Logger.log('Data formatada (conversão direta): %s', dataFormatada);
        return dataFormatada;
      } else {
        Logger.log('Data inválida após tentativa de conversão direta.');
        return '';
      }
    }
  }
}


  // ==================== FIM das funções cadastro.html====================

//utils InsercaoFrequenciaCoral

// Função no servidor para obter os alunos com base no coral selecionado
function obterAlunosPorCoral(tipoCoral) {
  try {
    Logger.log('Iniciando a função obterAlunosPorCoral para o coral: ' + tipoCoral);
    
    // Abre a planilha
    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    Logger.log('Planilha aberta com sucesso');

    // Abre a aba "Alunos"
    var aba = planilha.getSheetByName('Alunos');
    if (!aba) {
      Logger.log('Erro: Aba "Alunos" não encontrada');
      return { error: 'Aba "Alunos" não encontrada' };
    }
    Logger.log('Aba "Alunos" aberta com sucesso');

    // Obtém todos os dados da planilha
    var dados = aba.getDataRange().getValues();
    Logger.log('Total de linhas recebidas da planilha: ' + dados.length);

    // Filtra os alunos com base no coral selecionado (coluna M) e mantém Nome (coluna A) e Status (coluna N)
    var alunosFiltrados = [];
    for (var i = 1; i < dados.length; i++) { // Ignora a primeira linha (cabeçalhos)
      Logger.log('Processando linha ' + i + ' - Tipo de Coral: ' + dados[i][12]);
      if (dados[i][12] === tipoCoral) { // Coluna M (12ª coluna) para o coral selecionado
        alunosFiltrados.push({
          nome: dados[i][0], // Coluna A
          status: dados[i][13] // Coluna N
        });
        Logger.log('Aluno filtrado: ' + dados[i][0] + ' - Status: ' + dados[i][13]);
      }
    }

    // Ordena os alunos em ordem alfabética
    alunosFiltrados.sort(function(a, b) {
      return a.nome.localeCompare(b.nome);
    });
    Logger.log('Alunos filtrados e ordenados: ' + JSON.stringify(alunosFiltrados));

    // Adiciona a ordem sequencial
    alunosFiltrados.forEach(function(aluno, index) {
      aluno.ordem = index + 1;
      Logger.log('Aluno ' + aluno.nome + ' - Ordem: ' + aluno.ordem);
    });

    Logger.log('Finalizando função obterAlunosPorCoral. Total de alunos filtrados: ' + alunosFiltrados.length);
    return alunosFiltrados; // Retorna o array filtrado e ordenado
    
  } catch (error) {
    Logger.log('Erro ao obter dados dos alunos: ' + error.message);
    return { error: 'Erro ao obter dados dos alunos.' };
  }
}

/**
 * Função para salvar os dados de presença recebidos do modal
 * @param {Array} dadosAlunos - Lista de objetos com os dados dos alunos (nome, presença, status, horários, etc.)
 * @return {Object} - Retorna um objeto de sucesso ou erro
 */
function salvarPresencaServidor(dadosAlunos) {
  const sheet = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0').getSheetByName('Frequencia');
  const lastRow = sheet.getLastRow();
  let nextId = lastRow > 0 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1; // Gerar ID automático

  try {
    // Logger para acompanhar o processo
    Logger.log('Iniciando o salvamento de presença dos alunos.');
    Logger.log('Dados recebidos:', JSON.stringify(dadosAlunos));

    dadosAlunos.forEach(function(aluno, index) {
      // Logger para verificar os valores que estão sendo processados
      Logger.log(`Processando aluno ${index + 1}:`);
      Logger.log(`Nome: ${aluno.nome}`);
      Logger.log(`Presença: ${aluno.presenca}`);
      Logger.log(`Status: ${aluno.status}`);
      Logger.log(`Hora Início: ${aluno.horaInicio}`);
      Logger.log(`Hora Fim: ${aluno.horaFim}`);
      Logger.log(`Data Completa: ${aluno.dataCompleta}`);
      Logger.log(`Tipo de Coral: ${aluno.tipoCoral}`);

      // Verificar especificamente se o tipo de coral está correto
      if (!aluno.tipoCoral) {
        Logger.log(`Erro: Tipo de coral ausente para o aluno ${aluno.nome}`);
      }

      // Montar a linha de dados a ser inserida na planilha
      const novaLinha = [
        nextId,                    // ID automático
        aluno.nome,                // Nome do aluno
        aluno.presenca,            // Presença (Presente, Faltou, Atestado)
        aluno.status,              // Status (Ativo, Desistente)
        aluno.horaInicio,          // Hora de início da aula
        aluno.horaFim,             // Hora de fim da aula
        aluno.dataCompleta,        // Data completa no formato yyyy-mm-dd (coluna G)
        aluno.tipoCoral            // Tipo de coral (AlgazarraCoral ou CoralUnimed) (coluna H)
      ];

      // Verificar o conteúdo da linha antes de inseri-la na planilha
      Logger.log('Linha a ser inserida na planilha:', JSON.stringify(novaLinha));

      // Inserir os dados na planilha
      sheet.appendRow(novaLinha);
      nextId++; // Incrementar o ID para o próximo aluno
    });

    Logger.log('Dados salvos com sucesso.');
    return { success: true, message: 'Dados salvos com sucesso.' };

  } catch (error) {
    Logger.log('Erro ao salvar os dados:', error);
    return { success: false, message: `Erro ao salvar dados: ${error.message}` };
  }
}


function obterDadosFrequencia(tipoCoral, dataPresenca) {
  try {
    Logger.log("Iniciando a função obterDadosFrequencia.");
    Logger.log("Tipo de Coral recebido: " + tipoCoral);
    Logger.log("Data de Presença recebida: " + dataPresenca);

    // Acessar a planilha correta
    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    var abaFrequencia = planilha.getSheetByName('Frequencia');
    
    Logger.log("Planilha e aba Frequencia acessadas com sucesso.");

    // Obter todos os dados da aba Frequencia
    var dados = abaFrequencia.getRange(2, 1, abaFrequencia.getLastRow() - 1, abaFrequencia.getLastColumn()).getValues();
    Logger.log("Dados obtidos da planilha: " + dados.length + " linhas.");

    // Função auxiliar para padronizar a data no formato yyyy-mm-dd
    function padronizarData(data) {
      if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data)) {
        var ano = data.getFullYear();
        var mes = ('0' + (data.getMonth() + 1)).slice(-2); // Meses vão de 0 a 11, então somamos 1
        var dia = ('0' + data.getDate()).slice(-2);
        return `${ano}-${mes}-${dia}`;
      } else if (typeof data === 'string') {
        return data.split('T')[0]; // Se for uma string no formato ISO, apenas pegamos a parte yyyy-mm-dd
      }
      return '';
    }

    // Função auxiliar para padronizar hora no formato hh:mm
    function padronizarHora(hora) {
      if (Object.prototype.toString.call(hora) === '[object Date]' && !isNaN(hora)) {
        var horas = ('0' + hora.getHours()).slice(-2);
        var minutos = ('0' + hora.getMinutes()).slice(-2);
        return `${horas}:${minutos}`;
      }
      return '';
    }

    // Filtrar os dados pelo tipo de coral (coluna H) e pela data (coluna G)
    var resultadosFiltrados = dados.filter(function(linha) {
      var tipoCoralNaLinha = linha[7]; // Coluna H - Tipo de Coral
      var dataNaLinha = padronizarData(new Date(linha[6])); // Coluna G - Data, padronizada para yyyy-mm-dd

      Logger.log("Tipo de Coral na linha: " + tipoCoralNaLinha + ", Data na linha: " + dataNaLinha);

      // Verificar se os filtros são satisfeitos (tipoCoral e dataPresenca)
      var corresponde = tipoCoralNaLinha === tipoCoral && dataNaLinha === dataPresenca;
      Logger.log("Corresponde aos filtros? " + corresponde);
      return corresponde;
    });

    Logger.log("Resultados filtrados: " + resultadosFiltrados.length + " linhas.");

    // Mapeando os dados filtrados para retornar Nome, Presença, Status, Hora Início e Hora Fim (Colunas B, C, D, E e F)
    var resultadoFinal = resultadosFiltrados.map(function(linha) {
      Logger.log("Processando linha para resultado final: " + JSON.stringify(linha));
      return {
        nome: linha[1],         // Coluna B - Nome
        presenca: linha[2],     // Coluna C - Presença
        status: linha[3],       // Coluna D - Status
        horaInicio: padronizarHora(new Date(linha[4])), // Coluna E - Hora de Início
        horaFim: padronizarHora(new Date(linha[5]))     // Coluna F - Hora de Fim
      };
    });

    Logger.log("Resultado final enviado ao frontend: " + JSON.stringify(resultadoFinal));

    // Retornar os dados filtrados para o frontend
    return resultadoFinal;

  } catch (error) {
    Logger.log("Erro ao obter dados da planilha: " + error);
    throw new Error("Erro ao acessar os dados de frequência.");
  }
}

function TrazMesAnoContagem(mes, ano, tipoCoral) {
  try {
    Logger.log("Iniciando TrazMesAnoContagem com mes: " + mes + ", ano: " + ano + ", tipoCoral: " + tipoCoral);

    // Acessar a planilha correta
    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    var abaFrequencia = planilha.getSheetByName('Frequencia');

    if (!abaFrequencia) {
      throw new Error('Aba "Frequencia" não encontrada.');
    }

    // Obter todos os dados da aba Frequencia
    var dados = abaFrequencia.getDataRange().getValues();

    // Cabeçalhos
    var headers = dados[0];
    dados.shift(); // Remove o cabeçalho

    var aulasMes = 0;
    var aulasAno = 0;

    // Função auxiliar para padronizar data
    function padronizarData(data) {
      if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data)) {
        var ano = data.getFullYear();
        var mes = ('0' + (data.getMonth() + 1)).slice(-2);
        var dia = ('0' + data.getDate()).slice(-2);
        return `${ano}-${mes}-${dia}`;
      } else if (typeof data === 'string') {
        return data.split('T')[0];
      }
      return '';
    }

    // Filtrar os dados por tipo de coral
    var dadosFiltrados = dados.filter(function(row) {
      var tipoCoralNaLinha = row[7]; // Coluna H - Tipo de Coral
      return tipoCoralNaLinha === tipoCoral;
    });

    // Contar aulas no mês e no ano
    dadosFiltrados.forEach(function(row) {
      var dataNaLinha = padronizarData(new Date(row[6])); // Coluna G - Data da Aula
      var dataObj = new Date(dataNaLinha);
      var anoLinha = dataObj.getFullYear();
      var mesLinha = dataObj.getMonth() + 1; // Janeiro é 0

      if (anoLinha == ano) {
        aulasAno++;
        if (mesLinha == mes) {
          aulasMes++;
        }
      }
    });

    Logger.log("Aulas no mês: " + aulasMes);
    Logger.log("Aulas no ano: " + aulasAno);

    return {
      aulasMes: aulasMes,
      aulasAno: aulasAno
    };

  } catch (error) {
    Logger.log('Erro na função TrazMesAnoContagem: ' + error);
    throw new Error('Não foi possível obter as contagens de aulas.');
  }
}

function frequenciaCalculada(tipoCoral, mesAtivo) {
  try {
    Logger.log("Iniciando a função frequenciaCalculada.");
    Logger.log("Tipo de Coral recebido: " + tipoCoral);
    Logger.log("Mês ativo recebido: " + mesAtivo);

    // Acessar a planilha correta
    var planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
    var abaFrequencia = planilha.getSheetByName('Frequencia');

    if (!abaFrequencia) {
      throw new Error('Aba "Frequencia" não encontrada.');
    }

    // Obter todos os dados da aba Frequencia
    var dadosFrequencia = abaFrequencia.getDataRange().getValues();

    // Cabeçalhos
    var headersFrequencia = dadosFrequencia[0];
    dadosFrequencia.shift(); // Remove o cabeçalho

    // Obter a lista de alunos
    var abaAlunos = planilha.getSheetByName('Alunos');
    var dadosAlunos = abaAlunos.getDataRange().getValues();
    var headersAlunos = dadosAlunos[0];
    dadosAlunos.shift(); // Remove o cabeçalho

    // Função auxiliar para padronizar data
    function padronizarData(data) {
      if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data)) {
        var ano = data.getFullYear();
        var mes = ('0' + (data.getMonth() + 1)).slice(-2);
        var dia = ('0' + data.getDate()).slice(-2);
        return `${ano}-${mes}-${dia}`;
      } else if (typeof data === 'string') {
        return data.split('T')[0];
      }
      return '';
    }

    // Criar um objeto para mapear os alunos
    var mapaAlunos = {};
    dadosAlunos.forEach(function(row) {
      var nomeCompleto = row[0]; // Índice da coluna Nome Completo
      var tipoCoralAluno = row[12]; // Índice da coluna Tipo Coral
      var statusAluno = row[13]; // Índice da coluna Status

      // Filtrar pelo tipo de coral
      if (tipoCoralAluno === tipoCoral) {
        mapaAlunos[nomeCompleto] = {
          nome: nomeCompleto,
          status: statusAluno,
          presente: 0,
          falta: 0,
          atestado: 0,
          ano: new Date().getFullYear(),
          mes: mesAtivo,
          tipoCoral: tipoCoral
        };
      }
    });

    // Percorrer os dados de frequência e acumular as presenças
    dadosFrequencia.forEach(function(row) {
      var dataAula = new Date(row[6]); // Coluna G - Data da Aula
      var mesAula = dataAula.getMonth() + 1; // Janeiro é 0
      var nomeAluno = row[1]; // Coluna B - Nome do Aluno
      var presenca = row[2]; // Coluna C - Presença
      var tipoCoralFrequencia = row[7]; // Coluna H - Tipo Coral

      if (tipoCoralFrequencia === tipoCoral && mesAula === mesAtivo && mapaAlunos[nomeAluno]) {
        if (presenca === 'Presente') {
          mapaAlunos[nomeAluno].presente++;
        } else if (presenca === 'Faltou') {
          mapaAlunos[nomeAluno].falta++;
        } else if (presenca === 'Atestado') {
          mapaAlunos[nomeAluno].atestado++;
        }
      }
    });

    // Converter o mapa de alunos em um array para retornar
    var resultados = Object.values(mapaAlunos);

    Logger.log("Resultado da frequência calculada: " + JSON.stringify(resultados));

    return resultados;

  } catch (error) {
    Logger.log('Erro na função frequenciaCalculada: ' + error);
    throw new Error('Não foi possível calcular a frequência.');
  }
}



  // ==================== FIM das funções InsercaoFrequenciaCoral.html====================

//utils listapdf
// Obter dados para carrega lista de presença em branco da pagina listapdf.html
// Obter dados para carrega lista de presença em branco da pagina listapdf.html
function getAlunosPorCoral(coralSelecionado) {
  try {
    const sheetId = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0';
    const sheetName = 'Alunos';
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheetByName(sheetName);
    
    // Obter todos os dados da aba
    const data = sheet.getDataRange().getValues();
    Logger.log('Total de registros capturados da planilha: ' + data.length);

    // Obter índices das colunas relevantes
    const colA = 0;  // Nome do aluno
    const colK = 10; // Vocação (coluna K)
    const colM = 12; // Coral
    const colN = 13; // Status

    // Filtrar os alunos com base no coral selecionado (AlgazarraCoral ou CoralUnimed)
    const alunosFiltrados = data.slice(1).filter(row => row[colM] === coralSelecionado);
    Logger.log(`Total de alunos filtrados no ${coralSelecionado}: ` + alunosFiltrados.length);

    // Agrupar por Status: "Ativo" e "Desistente"
    const grupos = {
      'Ativo': [],
      'Desistente': []
    };
    
    alunosFiltrados.forEach(row => {
      const status = row[colN];
      const aluno = {
        id: generateUniqueId(),
        nome: row[colA],
        vocacao: row[colK], // Capturar a vocação
        status: status,
        deveDestacar: (status === 'Desistente') // Indica se deve destacar (vermelho)
      };
      
      if (status === 'Ativo') {
        grupos['Ativo'].push(aluno);
      } else if (status === 'Desistente') {
        grupos['Desistente'].push(aluno);
      }
    });
    
    Logger.log('Total de alunos ativos: ' + grupos['Ativo'].length);
    Logger.log('Total de alunos desistentes: ' + grupos['Desistente'].length);

    // Agora, dentro de cada grupo, ordenar por vocação e depois por nome
    grupos['Ativo'].sort((a, b) => {
      const vocCompare = a.nome.localeCompare(b.nome);
      return vocCompare !== 0 ? vocCompare : a.nome.localeCompare(b.nome);
    });

    grupos['Desistente'].sort((a, b) => {
      const vocCompare = a.nome.localeCompare(b.nome);
      return vocCompare !== 0 ? vocCompare : a.nome.localeCompare(b.nome);
    });
    
    // Combinar os grupos, ativos primeiro
    const alunosOrdenados = [...grupos['Ativo'], ...grupos['Desistente']];
    Logger.log('Total de alunos enviados ao frontend: ' + alunosOrdenados.length);

    return alunosOrdenados;
    
  } catch (error) {
    Logger.log('Erro em getAlunosPorCoral: ' + error);
    throw new Error('Não foi possível obter os alunos.');
  }
}



// Inicialize um contador global para gerar IDs sequenciais
let idCounter = 1;

// Função para gerar um ID único sequencial
function generateUniqueId() {
  const id = idCounter; // Capture o valor atual do contador
  idCounter++; // Incremente o contador para o próximo ID
  return + id; // Retorne o ID no formato desejado
}



  // ==================== FIM das funções listapdf.html====================

//utils listasgerais
function buscarBeneficiariosFiltrados(ativo, desistente, coralAlgazarra, tipoCesta) {
    Logger.log("Iniciando a função buscarBeneficiariosFiltrados...");
    Logger.log("Parâmetros recebidos - Ativo: " + ativo + ", Desistente: " + desistente + ", Coral Algazarra: " + coralAlgazarra + ", Tipo de Cesta: " + tipoCesta);
    
    // Acessa a planilha específica pelo ID
    var spreadsheet = SpreadsheetApp.openById("1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0");
    var sheet = spreadsheet.getSheetByName("Alunos");
    var data = sheet.getDataRange().getValues(); // Obtém todos os dados da aba "Alunos"
    
    var resultado = [];

    // Itera sobre os dados para filtrar os beneficiários conforme os parâmetros
    for (var i = 1; i < data.length; i++) {
        var nome = data[i][0];  // Coluna A - Nome do beneficiário
        var tipoCoral = data[i][12]; // Coluna M - Tipo do Coral (AlgazarraCoral)
        var situacao = data[i][13];  // Coluna N - Situação (Ativo ou Desistente)
        var recebeBeneficio = data[i][17]; // Coluna R - Tipo de Cesta Recebido (cestaBasica, cestaVerde, cestaBasicaVerde)

        // Log para verificar o valor de recebeBeneficio
        Logger.log("Linha " + (i+1) + ": recebeBeneficio = " + recebeBeneficio);

        // Filtra pelo tipo de coral
        var coralAtende = coralAlgazarra && tipoCoral === "AlgazarraCoral";
        // Filtra pela situação
        var situacaoAtende = (ativo && situacao === "Ativo") || (desistente && situacao === "Desistente");
        // Filtra pelo tipo de cesta
        var cestaAtende = tipoCesta ? recebeBeneficio === tipoCesta : true;

        // Log das condições de filtragem
        Logger.log("Linha " + (i+1) + ": coralAtende = " + coralAtende + ", situacaoAtende = " + situacaoAtende + ", cestaAtende = " + cestaAtende);

        // Adiciona à lista de resultados se todos os filtros forem atendidos
        if (coralAtende && situacaoAtende && cestaAtende) {
            resultado.push({ nome: nome });
            Logger.log("Linha " + (i+1) + " adicionada ao resultado.");
        }
    }

    if (resultado.length === 0) {
        Logger.log("Nenhum beneficiário encontrado para os filtros informados.");
    } else {
        Logger.log("Número de beneficiários encontrados: " + resultado.length);
    }

    return resultado; // Retorna a lista filtrada
}

  // ==================== FIM das funções listasgerais.html====================
  
  //utils pesquisaSatisfacao
  // Definição de constantes para configurações
const SPREADSHEET_ID = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0'; // Substitua pelo ID correto
const SHEET_NAME = 'Respostas';


/**
 * Função auxiliar para obter a planilha.
 * @returns {Sheet} - Objeto da planilha.
 */
function getSheet() {
  Logger.log('Obtendo a planilha');
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME);
}

/**
 * Função auxiliar para obter dados da planilha, excluindo o cabeçalho.
 * @returns {Array} - Array de dados sem o cabeçalho.
 */
function getDataFromSheet() {
  Logger.log('Obtendo dados da planilha');
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  data.shift(); // Remove o cabeçalho

  // Converter datas em strings no formato 'dd-MM-yyyy'
  data.forEach(row => {
    if (row[1] instanceof Date) {
      row[1] = Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'dd-MM-yyyy');
    } else if (typeof row[1] === 'string') {
      // Tentar converter string para data e formatar
      const date = new Date(row[1]);
      if (!isNaN(date)) {
        row[1] = Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd-MM-yyyy');
      } else {
        row[1] = '-';
      }
    } else {
      row[1] = '-';
    }
  });

  // Mapear as colunas para objetos com propriedades nomeadas
  return data.map(row => ({
    concerto: row[0],           // Coluna A: TituloConcerto → Renomeado para 'concerto'
    dataConcerto: row[1],       // Coluna B: DataConcerto (já formatada para 'dd-mm-yyyy')
    satisfacao1: row[2],        // Coluna C: Satisfacao1
    satisfacao2: row[3],        // Coluna D: Satisfacao2
    satisfacao4: row[4],        // Coluna E: Satisfacao4
    motivo: row[5],             // Coluna F: Motivo (opcional)
    acessibilidade: row[6]      // Coluna G: Acessibilidade (opcional)
  }));
}

/**
 * Retorna todos os dados da planilha Respostas.
 * @returns {Array} - Array de objetos contendo todas as respostas.
 */
function obterTodosDados() {
  Logger.log('Iniciando obterTodosDados');
  try {
    const data = getDataFromSheet();
    
    Logger.log('Dados obtidos da planilha: %s', JSON.stringify(data));
    
    return data;
    
  } catch (error) {
    Logger.log('Erro ao obter todos os dados: %s', error.message);
    throw error;
  }
}


/**
 * Obtém a lista de títulos de concertos únicos a partir dos dados da planilha.
 * @returns {Array} - Array de títulos dos concertos.
 */
function buscarTituloUnicoConcerto() {
  Logger.log('Iniciando buscarTituloUnicoConcerto');
  try {
    const data = getDataFromSheet();

    Logger.log('Dados obtidos da planilha: %s', JSON.stringify(data));

    if (data.length === 0) {
      Logger.log('Nenhum concerto encontrado.');
      return [];
    }

    // Extrair títulos dos concertos da coluna A
    const concertTitles = data.map(row => row.concerto);

    // Remover duplicatas e valores vazios
    const uniqueTitles = [...new Set(concertTitles)].filter(title => title);
    
    Logger.log('Títulos únicos de concertos: %s', JSON.stringify(uniqueTitles));

    return uniqueTitles;

  } catch (error) {
    Logger.log('Erro ao obter lista de concertos: %s', error.message);
    throw error;
  }
}

const CACHE_EXPIRATION = 300; // Tempo em segundos

/**
 * Valida os parâmetros de entrada.
 *
 * @param {string} pergunta
 * @param {string} tituloConcerto
 */
function validarParametros(pergunta, tituloConcerto) {
  const perguntasValidas = ['satisfacao1', 'satisfacao2', 'satisfacao4']; // Atualize conforme necessário
  if (!pergunta || !perguntasValidas.includes(pergunta)) {
    throw new Error('Pergunta inválida.');
  }

  if (tituloConcerto && typeof tituloConcerto !== 'string') {
    throw new Error('Título do concerto inválido.');
  }
}

/**
 * Obtém os dados da planilha com cache.
 *
 * @return {Array} Dados da planilha
 */
function getCachedData() {
  const cache = CacheService.getScriptCache();
  let cached = cache.get('dadosPlanilha');
  
  if (cached) {
    Logger.log('Dados obtidos do cache.');
    return JSON.parse(cached);
  } else {
    const data = getDataFromSheet();
    cache.put('dadosPlanilha', JSON.stringify(data), CACHE_EXPIRATION);
    Logger.log('Dados armazenados no cache.');
    return data;
  }
}


/**
 * Conta a frequência das notas para uma determinada pergunta, categorizada por concerto ou visão geral.
 *
 * @param {string} pergunta - O identificador da pergunta.
 * @param {string} tituloConcerto - O título do concerto selecionado ou vazio para visão geral.
 * @return {Object} Um objeto mapeando cada nota (0-10) para sua contagem correspondente ou um erro.
 */
function calcularMediaNotasPorPergunta(pergunta, tituloConcerto) {
   Logger.log(`Calculando contagem das notas para: ${pergunta}, Concerto: ${tituloConcerto}`);
  try {
    validarParametros(pergunta, tituloConcerto);
    const data = getCachedData();

    const tituloNormalizado = tituloConcerto.toLowerCase().trim();

    // Filtrar os dados com base no concerto selecionado
    let dadosFiltrados = (tituloNormalizado === '') 
      ? data 
      : data.filter(row => row.concerto.toLowerCase().trim() === tituloNormalizado);

    // Inicializar o array de contagem das notas
    let contagemNotas = Array(11).fill(0);

    // Iterar sobre os dados filtrados para contar as notas
    dadosFiltrados.forEach(item => {
      let nota = parseFloat(item[pergunta]);
      if (!isNaN(nota) && Number.isInteger(nota) && nota >= 0 && nota <= 10) {
        contagemNotas[nota]++;
      }
    });

    // Converter para objeto antes de retornar
    let resultado = {};
    contagemNotas.forEach((count, nota) => {
      resultado[nota] = count;
    });

    return resultado;

  } catch (error) {
    Logger.log(`Erro ao calcular contagem das notas para ${pergunta}: ${error.message}`);
    return { error: `Não foi possível calcular as notas: ${error.message}` };
  }
}


/**
 * Função de interface para o front-end chamar.
 * Recebe o identificador da pergunta e o título do concerto,
 * e retorna as contagens das notas correspondentes.
 *
 * @param {string} pergunta - O identificador da pergunta.
 * @param {string} tituloConcerto - O título do concerto selecionado ou vazio para visão geral.
 * @return {Object} Um objeto mapeando cada nota (0-10) para sua contagem correspondente ou um erro.
 */
function obterMediaNotas(pergunta, tituloConcerto) {
  Logger.log(`Chamada obterContagemNotas para Pergunta: ${pergunta}, Concerto: ${tituloConcerto}`);
  return calcularMediaNotasPorPergunta(pergunta, tituloConcerto);
}

/**
 * Filtra os dados da planilha Respostas com base no título do concerto,
 * calcula as médias de Satisfacao1, Satisfacao2 e Satisfacao4,
 * e retorna as informações do concerto e as médias calculadas.
 *
 * Se `tituloConcerto` estiver vazio, retorna uma visão geral com dados agregados.
 *
 * @param {string} tituloConcerto - O título do concerto selecionado.
 * @return {Object} Um objeto contendo o título do concerto, a data formatada,
 *                 e as médias de Satisfacao1, Satisfacao2 e Satisfacao4.
 */
function filtrarDadosConcerto(tituloConcerto) {
  Logger.log('Iniciando filtrarDadosConcerto para: %s', tituloConcerto);
  try {
    const data = getDataFromSheet();

    Logger.log('Dados obtidos da planilha: %s', JSON.stringify(data));

    let dadosFiltrados;

    if (tituloConcerto.trim() === '') {
      // Visão Geral: incluir todos os dados
      dadosFiltrados = data;
    } else {
      // Filtrar linhas que correspondem ao concerto selecionado
      dadosFiltrados = data.filter(row => {
        return row.concerto.toString().toLowerCase().trim() === tituloConcerto.toLowerCase().trim();
      });
    }

    if (dadosFiltrados.length === 0) {
      Logger.log('Nenhum dado encontrado para o concerto selecionado.');
      if (tituloConcerto.trim() === '') {
        // Nenhum dado na planilha
        return {
          concerto: 'Visão Geral',
          dataConcerto: '-',
          mediaSatisfacao1: 0,
          mediaSatisfacao2: 0,
          mediaSatisfacao4: 0
        };
      } else {
        // Concerto selecionado sem dados
        return {
          concerto: tituloConcerto,
          dataConcerto: '-',
          mediaSatisfacao1: 0,
          mediaSatisfacao2: 0,
          mediaSatisfacao4: 0
        };
      }
    }

    if (tituloConcerto.trim() === '') {
      // Visão Geral: calcular médias para todos os concertos
      const totalSatisfacao1 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao1) || 0), 0);
      const totalSatisfacao2 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao2) || 0), 0);
      const totalSatisfacao4 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao4) || 0), 0);

      const count = dadosFiltrados.length;

      const mediaSatisfacao1 = count > 0 ? (totalSatisfacao1 / count) : 0;
      const mediaSatisfacao2 = count > 0 ? (totalSatisfacao2 / count) : 0;
      const mediaSatisfacao4 = count > 0 ? (totalSatisfacao4 / count) : 0;

      Logger.log('Médias calculadas para Visão Geral: Satisfacao1 = %s, Satisfacao2 = %s, Satisfacao4 = %s', mediaSatisfacao1, mediaSatisfacao2, mediaSatisfacao4);

      return {
        concerto: 'Visão Geral',
        dataConcerto: '-',  // Não há data específica na visão geral
        mediaSatisfacao1: parseFloat(mediaSatisfacao1.toFixed(2)),
        mediaSatisfacao2: parseFloat(mediaSatisfacao2.toFixed(2)),
        mediaSatisfacao4: parseFloat(mediaSatisfacao4.toFixed(2))
      };
    } else {
      // Concerto Específico: calcular médias para o concerto selecionado
      const dataConcerto = dadosFiltrados[0].dataConcerto;

      const totalSatisfacao1 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao1) || 0), 0);
      const totalSatisfacao2 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao2) || 0), 0);
      const totalSatisfacao4 = dadosFiltrados.reduce((sum, row) => sum + (parseFloat(row.satisfacao4) || 0), 0);

      const count = dadosFiltrados.length;

      const mediaSatisfacao1 = count > 0 ? (totalSatisfacao1 / count) : 0;
      const mediaSatisfacao2 = count > 0 ? (totalSatisfacao2 / count) : 0;
      const mediaSatisfacao4 = count > 0 ? (totalSatisfacao4 / count) : 0;

      Logger.log('Médias calculadas: Satisfacao1 = %s, Satisfacao2 = %s, Satisfacao4 = %s', mediaSatisfacao1, mediaSatisfacao2, mediaSatisfacao4);

      return {
        concerto: dadosFiltrados[0].concerto,
        dataConcerto: dataConcerto,  // Formato 'dd-MM-yyyy'
        mediaSatisfacao1: parseFloat(mediaSatisfacao1.toFixed(2)),
        mediaSatisfacao2: parseFloat(mediaSatisfacao2.toFixed(2)),
        mediaSatisfacao4: parseFloat(mediaSatisfacao4.toFixed(2))
      };
    }

  } catch (error) {
    Logger.log('Erro ao filtrar dados do concerto: %s', error.message);
    throw error;
  }
}

/**
 * Função para processar a pesquisa recebida do front-end.
 * Salva os dados na planilha 'Respostas' na primeira linha vazia.
 *
 * @param {Object} dados - Objeto contendo os dados do formulário.
 * @returns {String} - Mensagem de sucesso ou erro.
 */
function processarPesquisa(dados) {
  Logger.log('Chamada processarPesquisa com os dados: %s', JSON.stringify(dados));
  try {
    // Validação básica dos dados recebidos
    if (!dados.concerto || !dados.dataConcerto || dados.satisfacao1 === null || dados.satisfacao2 === null || dados.satisfacao4 === null) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    const sheet = getSheet();
    if (!sheet) {
      throw new Error("A aba 'Respostas' não foi encontrada na planilha.");
    }

    // Obter a primeira linha vazia
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;

    // Definir os valores a serem inseridos
    const valores = [
      dados.concerto,              // Coluna A: TituloConcerto → 'concerto'
      dados.dataConcerto,          // Coluna B: DataConcerto
      dados.satisfacao1,           // Coluna C: Satisfacao1
      dados.satisfacao2,           // Coluna D: Satisfacao2
      dados.satisfacao4,           // Coluna E: Satisfacao4
      dados.motivo || "",          // Coluna F: Motivo (opcional)
      dados.acessibilidade || ""   // Coluna G: Acessibilidade (opcional)
    ];

    // Inserir os valores na planilha
    sheet.getRange(nextRow, 1, 1, valores.length).setValues([valores]);

    Logger.log('Pesquisa salva com sucesso na linha: %s', nextRow);
    return "Pesquisa salva com sucesso.";

  } catch (error) {
    Logger.log('Erro ao processar pesquisa: %s', error.message);
    throw new Error("Erro ao processar a pesquisa: " + error.message);
  }
}

/**
 * Função para obter dados da pesquisa com filtro opcional e excluir linhas vazias.
 * @param {string} selectedConcert - O concerto selecionado no dropdown.
 * @returns {Array} - Array de objetos com 'Motivo' e 'Acessibilidade'.
 */
function getDadosPesquisa(selectedConcert) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`A aba "${SHEET_NAME}" não foi encontrada na planilha.`);
    }
    
    const dataRange = sheet.getDataRange();
    const dataValues = dataRange.getValues();
    
    if (dataValues.length < 2) { // Pelo menos cabeçalhos + 1 linha de dados
      throw new Error('A planilha não contém dados suficientes.');
    }
    
    // Identificar índices das colunas
    const headers = dataValues[0].map(header => header.toString().trim().toLowerCase());
    const idxTituloConcerto = headers.indexOf('tituloconcerto'); // Coluna A
    const idxMotivo = headers.indexOf('motivo'); // Coluna F
    const idxAcessibilidade = headers.indexOf('acessibilidade'); // Coluna G
    
    if (idxTituloConcerto === -1 || idxMotivo === -1 || idxAcessibilidade === -1) {
      throw new Error('Não foi possível encontrar todas as colunas necessárias na planilha. Verifique os cabeçalhos "TituloConcerto", "Motivo" e "Acessibilidade".');
    }
    
    const resultado = [];
    
    for (let i = 1; i < dataValues.length; i++) { // Começa em 1 para ignorar os cabeçalhos
      const row = dataValues[i];
      const tituloConcerto = row[idxTituloConcerto].toString().trim();
      const motivo = row[idxMotivo].toString().trim();
      const acessibilidade = row[idxAcessibilidade].toString().trim();
      
      // Verificar se pelo menos um dos campos está preenchido
      const isMotivoPreenchido = motivo !== "";
      const isAcessibilidadePreenchida = acessibilidade !== "";
      
      if (!(isMotivoPreenchido || isAcessibilidadePreenchida)) {
        // Ambas as colunas estão vazias, pular esta linha
        continue;
      }
      
      // Se 'selectedConcert' estiver vazio ou for 'Selecione o Concerto', incluir todos
      if (selectedConcert === "" || selectedConcert.toLowerCase() === 'selecione o concerto') {
        resultado.push({
          motivo: motivo,
          acessibilidade: acessibilidade
        });
      } else {
        // Comparar ignorando maiúsculas/minúsculas
        if (tituloConcerto.toLowerCase() === selectedConcert.toLowerCase()) {
          resultado.push({
            motivo: motivo,
            acessibilidade: acessibilidade
          });
        }
      }
    }
    
    return resultado;
    
  } catch (error) {
    Logger.log(`Erro na função 'getDadosPesquisa': ${error.message}`);
    throw new Error(`Erro ao obter dados da pesquisa: ${error.message}`);
  }
}

/**
 * Função para obter os títulos únicos dos concertos para popular o dropdown.
 * @returns {Array} - Array de strings com os títulos dos concertos.
 */
function getTitulosConcertos() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`A aba "${SHEET_NAME}" não foi encontrada na planilha.`);
    }
    
    const dataRange = sheet.getDataRange();
    const dataValues = dataRange.getValues();
    
    if (dataValues.length < 2) {
      throw new Error('A planilha não contém dados suficientes.');
    }
    
    const headers = dataValues[0].map(header => header.toString().trim().toLowerCase());
    const idxTituloConcerto = headers.indexOf('tituloconcerto');
    
    if (idxTituloConcerto === -1) {
      throw new Error('Não foi possível encontrar a coluna "TituloConcerto" na planilha.');
    }
    
    const titulosSet = new Set();
    
    for (let i = 1; i < dataValues.length; i++) {
      const titulo = dataValues[i][idxTituloConcerto].toString().trim();
      if (titulo !== "") {
        titulosSet.add(titulo);
      }
    }
    
    // Converter Set para Array e ordenar
    const titulosArray = Array.from(titulosSet).sort();
    
    // Adicionar a opção 'Selecione o Concerto' no início
    titulosArray.unshift('Selecione o Concerto');
    
    return titulosArray;
    
  } catch (error) {
    Logger.log(`Erro na função 'getTitulosConcertos': ${error.message}`);
    throw new Error(`Erro ao obter títulos dos concertos: ${error.message}`);
  }
}


function getDataTabelaPesquisa() {
  var sheetId = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0'; // ID Planilha
  var sheetName = 'Respostas'; // aba com os dados
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  data.shift(); // Remove the header row

  data.forEach(function(row) {
    if (Object.prototype.toString.call(row[1]) === '[object Date]') {
      row[1] = Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'dd-MM-yyyy');
    } else if (typeof row[1] === 'string') {
      var dateObj = new Date(row[1]);
      if (!isNaN(dateObj.getTime())) {
        row[1] = Utilities.formatDate(dateObj, Session.getScriptTimeZone(), 'dd-MM-yyyy');
      }
    }
  });

  Logger.log(data); // Log dos dados recuperados

  return data;
}
  
  // ==================== FIM das funções pesquisaSatisfacao.html====================

   //utils relatorios
function obterDadosCoristas() {
  // Abrir a planilha usando o ID
  const planilha = SpreadsheetApp.openById('1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0');
  Logger.log('Planilha aberta com sucesso.');
  
  // Acessar a aba "Alunos"
  const aba = planilha.getSheetByName('Alunos');
  Logger.log('Aba "Alunos" acessada.');

  // Obter todos os dados da aba
  const dados = aba.getDataRange().getValues();
  Logger.log('Dados obtidos da aba: %s linhas.', dados.length);

  // Inicializar arrays para armazenar os dados relevantes
  const coristas = [];
  
  // Loop para processar cada linha da planilha (ignorando o cabeçalho, começando da segunda linha)
  for (let i = 1; i < dados.length; i++) {
    const linha = dados[i];
    
    // Extrair dados das colunas relevantes:
    const genero = linha[14];      // Coluna O - Gênero
    const status = linha[13];      // Coluna N - Status (Ativo / Desistente)
    const tipoCoral = linha[12];   // Coluna M - Tipo de Coral (AlgazarraCoral / CoralUnimed)
    const beneficio = linha[17];   // Coluna R - Benefício (cestaBasica, cestaBasicaVerde, cestaVerde)
    
    Logger.log('Processando linha %s: Genero=%s, Status=%s, TipoCoral=%s, Beneficio=%s', i, genero, status, tipoCoral, beneficio);
    
    // Organizar os dados em um objeto
    coristas.push({
      genero: genero ? genero.trim().toLowerCase() : null,
      status: status ? status.trim().toLowerCase() : null,
      tipoCoral: tipoCoral ? tipoCoral.trim().toLowerCase() : null,
      beneficio: beneficio ? beneficio.trim().toLowerCase() : null
    });
  }
  
  Logger.log('Total de coristas processados: %s', coristas.length);
  
  // Retornar os dados filtrados ao frontend
  return coristas;
}


  // ==================== FIM das funções relatorios.html====================

 // ==================== inicio das funções aniversariante.html====================

function obterAniversariantesPorMes(mes) {
  try {
    var spreadsheetId = '1Lx0jAuL6Y4pvPmyUhtDzHL-YS2kaLmEHuUAlZU3WoO0';
    var sheetName = 'Alunos';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    data.shift(); // Remove o cabeçalho

    var aniversariantes = [];

    data.forEach(function(row) {
      var nome = row[0]; // Coluna A - Nome (índice 0)
      var dataNascimento = row[7]; // Coluna H - Data de Nascimento (índice 7)

      if (dataNascimento instanceof Date) {
        var mesNascimento = dataNascimento.getMonth() + 1; // Mês em JavaScript começa em 0
        if (mesNascimento === mes) {
          var dia = dataNascimento.getDate();
          var mesStr = ('0' + mesNascimento).slice(-2);
          var diaStr = ('0' + dia).slice(-2);
          var dataNascimentoStr = diaStr + '/' + mesStr + '/' + dataNascimento.getFullYear();

          aniversariantes.push({
            nome: nome,
            dataNascimento: dataNascimentoStr
          });
        }
      }
    });

    return aniversariantes;
  } catch (error) {
    Logger.log('Erro ao obter aniversariantes: ' + error);
    throw new Error('Erro ao obter aniversariantes.');
  }
}
  // ==================== FIM das funções aniversariante.html====================