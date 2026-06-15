🏍️ MMotos – Sistema de Gerenciamento para Oficina de Motocicletas
📌 Descrição do Projeto

O MMotos é um sistema web desenvolvido com o objetivo de auxiliar na gestão de oficinas de motocicletas, oferecendo uma solução digital para automatizar processos que tradicionalmente são realizados de forma manual. O sistema centraliza informações relacionadas a clientes, serviços e agendamentos, promovendo maior organização e eficiência no gerenciamento das atividades da oficina.

Muitas oficinas de pequeno e médio porte ainda utilizam cadernos, planilhas ou aplicativos de mensagens para controlar seus atendimentos. Essa prática pode ocasionar perda de informações, dificuldades na organização dos serviços e falhas operacionais. Diante desse cenário, o MMotos foi desenvolvido para informatizar esses processos, proporcionando agilidade, confiabilidade e melhor experiência tanto para os gestores quanto para os clientes.

👥 Equipe
Integrante	GitHub
Jackelyne Ingles dos Santos	@jackelyneingles-commits
Gabriel Roberto Ribeiro da Silva	@Gaelz-lit

🛠️ Tecnologias Utilizadas
Python 3.14.4
Django 6.0.5
SQLite 3
HTML5
CSS3
JavaScript
Git e GitHub

🚀 Funcionalidades Implementadas
Escopo Desenvolvido: Base
Área do Usuário
Cadastro de usuários;
Autenticação (login e logout);
Visualização dos serviços disponíveis;
Consulta dos produtos e serviços disponíveis.
Área Administrativa
Gerenciamento de categorias;
Cadastro, edição e exclusão de serviços;
Gerenciamento dos usuários cadastrados;
Acesso ao painel administrativo do Django.

⚙️ Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

Python 3.14.4;
pip;
virtualenv (recomendado);
Git.

▶️ Como executar o projeto localmente
1. Clone o repositório
git clone https://github.com/Gaelz-lit/MMotos-Django
cd MatheusMotos

2. Crie e ative o ambiente virtual
Windows
python -m venv venv
venv\Scripts\activate

Linux/macOS
python3 -m venv venv
source venv/bin/activate

3. Instale as dependências
pip install -r requirements.txt

4. Execute as migrações do banco de dados
python manage.py makemigrations
python manage.py migrate

5. Inicie o servidor de desenvolvimento
python manage.py runserver

6. Acesse a aplicação

Abra o navegador e acesse:
http://127.0.0.1:8000/

🔐 Usuários de Teste
Usuário Comum

Login:
gaelz

Senha:
G$l123456

Superusuário Django Admin

Acesso:

http://127.0.0.1:8000/admin

Login:
jacke

Senha:
gael

Essas credenciais possuem finalidade exclusivamente acadêmica e foram disponibilizadas apenas para facilitar a avaliação do projeto.

📸 Screenshots

Imagens principais das telas do sistema na pasta /docs/screenshots.

🎯 Objetivo do Projeto

Desenvolver um sistema web capaz de informatizar e otimizar os processos administrativos e operacionais da oficina MMotos, centralizando o gerenciamento de clientes, serviços e produtos em uma única plataforma. O sistema busca reduzir falhas decorrentes dos controles manuais, aumentar a produtividade, melhorar a qualidade do atendimento e fornecer uma ferramenta prática para auxiliar na gestão do negócio.

📚 Disciplina

Programação para Web

Professor: Ronierison Maciel

📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos.
