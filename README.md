# Almoxarifado Dashboard
## Projeto de estudo desenvolvido com Java, Spring Boot, React e PostgreSQL. O ambiente hospedado foi desativado. O projeto está incompleto e permanece disponível como registro de aprendizado.
Aplicação web para controle de estoque, desenvolvida a partir de necessidades observadas na rotina profissional. O projeto reúne uma API em Java com Spring Boot e uma interface em React para acompanhar produtos, entradas, saídas e movimentações de materiais.
Objetivo
Praticar desenvolvimento de uma aplicação com frontend e backend a partir de um problema real: organizar o registro de materiais e facilitar a consulta do estoque e de suas movimentações.
O escopo é o controle de materiais. Cálculo de perdas de produção, sobras de cortes e rastreamento dessas perdas não fazem parte desta implementação.
Funcionalidades presentes no código
- Cadastro, consulta, edição e exclusão de produtos.
- Registro de entradas e saídas de materiais.
- Histórico de movimentações.
- Dashboard com indicadores, gráfico de consumo e alertas de estoque.
- Consulta de movimentações com filtro por filial.
- Impressão da página de relatórios pelo navegador.
- Login demonstrativo com emissão de JWT.
- Consultas públicas e exigência de autenticação para operações de alteração.
O projeto é um protótipo de estudo. A presença dessas funcionalidades no código não representa uma certificação de uso em produção.
Tecnologias
Camada	Tecnologias
Backend	Java 21, Spring Boot 3.2.5, Spring Web, Spring Data JPA, Spring Security, JWT e Maven
Banco de dados	PostgreSQL
Frontend	React 19, JavaScript, Vite 8, Axios e React Router
Gráficos	Chart.js e react-chartjs-2


Estrutura do repositório
Backend/almoxarifado/
  pom.xml
  mvnw
  mvnw.cmd
  src/main/java/com/ljs/almoxarifado/
    config/
    controller/
    dto/
    model/
    repository/
    security/
    service/
  src/main/resources/
    application.properties
    data.sql

Frontend/
  package.json
  vite.config.js
  src/
    components/
    pages/
    services/api.js
    App.jsx
    main.jsx
O backend separa configurações, controllers, serviços, repositórios e entidades. O frontend organiza a interface em páginas, componentes e um cliente HTTP compartilhado.
Executar localmente
Pré-requisitos
- JDK 21.
- PostgreSQL em execução e um usuário com permissão para criar as tabelas do banco local.
- Node.js compatível com Vite 8: versão 20 a partir de 20.19 ou versão 22 a partir de 22.12; versões posteriores compatíveis também podem ser utilizadas.
- npm e Git.
O backend inclui o Maven Wrapper; não é necessário instalar o Maven separadamente para utilizar os comandos abaixo.
1. Clonar o projeto
git clone https://github.com/ptrjr/almoxarifado-dashboard.git
cd almoxarifado-dashboard
2. Criar um banco local
No PostgreSQL local, execute por uma ferramenta como o pgAdmin ou psql:
CREATE DATABASE almoxarifado;
Utilize um banco exclusivo para demonstração, sem dados da operação da empresa.
3. Configurar e iniciar o backend
A configuração de banco pode ser sobrescrita por variáveis de ambiente do Spring Boot. Configure-as no mesmo terminal em que o backend será iniciado. Substitua o usuário e a senha pelos do seu PostgreSQL local.
No Windows, utilizando PowerShell:
cd Backend/almoxarifado
$env:SPRING_DATASOURCE_URL = "jdbc:postgresql://localhost:5432/almoxarifado"
$env:SPRING_DATASOURCE_USERNAME = "postgres"
$env:SPRING_DATASOURCE_PASSWORD = "SUA_SENHA_LOCAL"
$env:SPRING_SQL_INIT_MODE = "never"
$env:SERVER_PORT = "8080"
.\mvnw.cmd spring-boot:run
No Linux ou macOS, utilizando Bash:
cd Backend/almoxarifado
export SPRING_DATASOURCE_URL='jdbc:postgresql://localhost:5432/almoxarifado'
export SPRING_DATASOURCE_USERNAME='postgres'
export SPRING_DATASOURCE_PASSWORD='SUA_SENHA_LOCAL'
export SPRING_SQL_INIT_MODE='never'
export SERVER_PORT='8080'
sh ./mvnw spring-boot:run
O código atual utiliza spring.jpa.hibernate.ddl-auto=update para criar ou atualizar as tabelas. A variável SPRING_SQL_INIT_MODE=never desativa a execução automática de data.sql neste roteiro local; o banco começa sem a carga inicial desse arquivo.
A API local ficará em http://localhost:8080. Uma consulta disponível é GET /produtos.
4. Apontar o frontend para a API local
Na sua cópia local de Frontend/src/services/api.js, altere apenas o valor de baseURL dentro de axios.create para:
baseURL: "http://localhost:8080"
Preserve os cabeçalhos e interceptadores existentes. O frontend atual possui uma URL de hospedagem definida diretamente no código; sem essa alteração, ele não utilizará o backend local.
5. Iniciar o frontend
Abra outro terminal, na raiz do repositório:
cd Frontend
npm ci
npm run dev -- --port 5173 --strictPort
Acesse http://localhost:5173. Essa origem está contemplada na configuração de CORS do backend.
Acesso e autenticação
O dashboard possui um modo visitante para consultas. As operações de alteração exigem um token JWT.
O login atual é demonstrativo e utiliza uma verificação fixa em AuthController.java, sem um cadastro completo de usuários. Para testar alterações, adapte esse mecanismo na sua cópia local com credenciais exclusivamente de demonstração. A evolução da autenticação faz parte das melhorias previstas.
Comandos adicionais
Na pasta Frontend:
npm run build
npm run lint
npm run preview
Na pasta Backend/almoxarifado, para gerar o pacote:
# Windows / PowerShell
.\mvnw.cmd package
# Linux / macOS
sh ./mvnw package
Esses comandos estão documentados a partir da configuração do repositório. Este README não afirma que existe uma suíte de testes automatizados ou que todos os fluxos foram validados.
Limitações atuais e próximos passos
- Evoluir o login demonstrativo para autenticação com usuários persistidos e senhas com hash.
- Externalizar completamente configurações de banco, JWT e URL da API.
- Revisar autorização e exposição de dados antes de uso com informações reais.
- Adicionar testes para estoque, entradas, saídas e permissões.
- Incluir imagens e uma demonstração com dados fictícios.
- Aprimorar validações e mensagens de erro.
Autor
Mauricio Petri Junior — estudante de Engenharia de Software na UNIASSELVI e de Desenvolvimento Back-end no SENAI/SCTEC.
- GitHub
- LinkedIn
Referências de execução
- Requisitos do Vite 8.
- Configuração externa do Spring Boot.
