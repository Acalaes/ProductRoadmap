# ProductRoadmap 📋

Planejador visual de roadmap com timeline trimestral. Arraste iniciativas entre Q1-Q4, organize por equipe e prioridade, acompanhe progresso. Interface limpa para visualizar estratégia de produto anual.

## ✨ Funcionalidades

- **📅 Timeline Trimestral**: Visualize iniciativas organizadas por trimestre (Q1-Q4)
- **🎯 Drag and Drop**: Arraste e solte cartões entre trimestres
- **🎨 Código de Cores**: Identificação visual por equipe
- **🏷️ Tags de Prioridade**: Alta, Média, Baixa
- **📊 Barra de Progresso**: Acompanhe o andamento de cada iniciativa
- **🔍 Filtros Inteligentes**: Filtre por equipe ou prioridade
- **👤 Atribuição de Responsáveis**: Defina owners para cada iniciativa

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Acalaes/ProductRoadmap.git
cd ProductRoadmap
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5000
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **React DnD** - Drag and drop
- **Tanstack Query** - Gerenciamento de estado
- **Radix UI** - Componentes acessíveis
- **Vite** - Build tool

### Backend
- **Express.js** - Framework web
- **TypeScript** - Type safety
- **Drizzle ORM** - ORM type-safe
- **PostgreSQL** - Banco de dados (produção)
- **In-memory storage** - Desenvolvimento

## 📁 Estrutura do Projeto

```
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── lib/         # Utilitários
│   │   └── hooks/       # Custom hooks
├── server/              # Backend Express
│   ├── routes.ts        # Rotas da API
│   └── storage.ts       # Camada de dados
├── shared/              # Código compartilhado
│   └── schema.ts        # Schemas TypeScript/Zod
└── package.json         # Dependências
```

## 🎯 Uso

### Criar uma Iniciativa
1. Clique em "Nova Iniciativa"
2. Preencha os campos:
   - Título e descrição
   - Selecione equipe e prioridade
   - Defina o trimestre
   - Atribua um responsável
3. Clique em "Criar Iniciativa"

### Mover Iniciativas
- Arraste o cartão da iniciativa
- Solte no trimestre desejado
- A mudança é salva automaticamente

### Filtrar Visualização
- Use os seletores no topo
- Filtre por equipe específica
- Filtre por nível de prioridade

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📝 Licença

Este projeto está sob licença MIT.

## 👤 Autor

**Alexandre Calaes**
- GitHub: [@Acalaes](https://github.com/Acalaes)

---

Desenvolvido com ❤️ usando Replit