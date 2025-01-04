/**
 * Função que lida com requisições GET e retorna o index.html
 */
function doGet(e) {
  // Obter a URL do serviço do WebApp
  var url = ScriptApp.getService().getUrl();

  // Adiciona os parâmetros de largura e altura desejados
  url += "?width=100%&height=100%";
  
  // Retorna o HTML do index1 com o título e modo de segurança
  return HtmlService.createTemplateFromFile('index1').evaluate()
    .setTitle('Controle de Alunos')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Função para incluir outros arquivos HTML no index.html
 */
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    console.error('Erro ao incluir o arquivo:', filename, e);
    return `<!-- Erro ao incluir o arquivo: ${filename} -->`;
  }
}

/**
 * Função para obter o conteúdo de um arquivo do Google Drive
 */
function getFileContent(fileId) {
  var file = DriveApp.getFileById(fileId);
  return file.getBlob().getDataAsString();
}
