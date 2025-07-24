#  Gerenciador de Estoque

Este repositório contém o sistema de **gerenciamento de estoque** da **LDS Energia Solar**, voltado para o controle e rastreio de **painéis e inversores fotovoltaicos**, com suporte a **scanner de código de barras**, cadastro técnico de componentes e funcionalidades práticas para uso no dia a dia da operação.

---

## ✅ Repositório da API

A API que alimenta este sistema está disponível aqui:  
🔗 [https://github.com/garibaldii/api-estoqueLDS](https://github.com/garibaldii/api-estoqueLDS)

---

## 🧩 Funcionalidades

- 📦 Cadastro de painéis e inversores com dados técnicos  
- 📸 Leitura via **código de barras**  
- 🧠 Identificação automática e, caso o item não esteja cadastrado, o sistema solicita os dados ao operador  
- 🔍 Filtros dinâmicos por tipo, fabricante, potência, status, etc.  
- 📋 Listagem, visualização e exclusão de registros  
- 🗃️ Separação de componentes por estoque de entrada, disponível, reservado e saída  
- 🔄 Integração entre front-end e back-end com API REST  

---

## ⚙️ Tecnologias Utilizadas

| Camada         | Tecnologias principais                              |
|----------------|-----------------------------------------------------|
| **Front-end**  | React / React Native, Tailwind, TypeScript          |
| **Back-end**   | Node.js, Express, TypeScript                        |
| **Banco**      | MongoDB (NoSQL)                                     |
| **Validação**  | *(previsto)* Zod ou Joi                             |

---

## 🖥️ Telas e Fluxos

- Cadastro manual e por scanner  
- Filtros dinâmicos com checkboxes  
- Detalhes técnicos do item  
- Interface adaptada para uso interno e via mobile  

---

*Desenvolvido com ⚡ por [@garibaldii](https://github.com/garibaldii)* 
