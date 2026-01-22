# Projeto – Teste Front-End

## 📌 Descrição

Este projeto foi desenvolvido como parte de um processo seletivo para vaga de estágio em desenvolvimento front-end.  
A aplicação foi construída utilizando **JavaScript puro**, **HTML** e **CSS**, sem o uso de frameworks ou bibliotecas externas, com foco em lógica, organização de código e manipulação do DOM.

O objetivo principal foi demonstrar a capacidade de leitura e manipulação de dados, controle de estado e construção de funcionalidades de forma clara e escalável.

---

## 🧱 Estrutura do Projeto

/project
├─ index.html
├─ readme.md
├─ /js
│ ├─ data.js
│ └─ main.js
└─ /css
└─ style.css

---

## 🧠 Decisões Técnicas

- Utilização de um **estado global (`state`)** para centralizar os dados manipuláveis da aplicação.
- Separação clara entre **dados fixos** (`data.js`) e **dados editáveis** (estado).
- Renderização da interface sempre baseada no estado atual da aplicação.
- Código mantido propositalmente simples e legível, adequado ao escopo do teste.

---

## 📱 Funcionalidades

### Tela 1 — Estudantes

- Listagem de estudantes.
- Filtro por série e classe.
- Edição de nome do estudante.
- Geração dinâmica de novos estudantes.
- Atualização automática da lista conforme alterações no estado.

---

### Tela 2 — Professores (Parte 1)

- Listagem de professores e suas respectivas matérias.
- Exibição das séries e classes atendidas.
- Filtros por série e classe.
- Visualização local dos estudantes relacionados a cada série por meio do botão **“Ver alunos”**.

---

### Tela 2 — Professores (Parte 2)

- Formulário para criação de novos relacionamentos entre:
  - Professor
  - Matéria
  - Série
  - Classe
- Novos registros são adicionados diretamente ao estado da aplicação.
- Os relacionamentos criados passam automaticamente por todas as operações da Parte 1:
  - Listagem
  - Filtros
  - Visualização de alunos por série

---

## ▶️ Como executar

1. Faça o download ou clone do projeto.
2. Abra o arquivo `index.html` diretamente no navegador.
3. Não é necessário servidor ou instalação de dependências.

---

## 🔧 Melhorias Futuras

- Documentar de forma mais detalhada o arquivo `main.js`, explicando o fluxo da aplicação, responsabilidades das funções e decisões de arquitetura.
- Aprimorar a navegação por abas, permitindo a visualização simultânea das telas de Estudantes e Professores.
- Validar a criação de novos relacionamentos, evitando duplicidade de registros e permitindo agrupar novas classes a relacionamentos existentes.
- Implementar validações no formulário de cadastro e feedback visual ao usuário.
- Persistir os dados utilizando `localStorage`, mantendo as alterações após recarregar a página.
- Refatorar o código em módulos menores, facilitando manutenção e escalabilidade.

---

## 📝 Observações Finais

Algumas decisões foram mantidas simples propositalmente, priorizando clareza de lógica, legibilidade do código e aderência ao escopo proposto pelo teste.

O projeto foi desenvolvido com foco em aprendizado, organização e boas práticas em JavaScript puro.
