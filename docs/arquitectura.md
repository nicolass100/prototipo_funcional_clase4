# Arquitectura (MVP)
```mermaid
flowchart LR
  subgraph Client[Frontend (React + Vite)]
    UI[Login / Dashboard]
    AX[Axios HTTP Client]
  end

  subgraph Server[Backend (Node + Express)]
    API[Auth & Health Controllers]
    ORM[Sequelize]
  end

  subgraph DB[(SQLite)]
    USERS[(users)]
  end

  UI --> AX -->|POST /api/auth/login| API
  API --> ORM --> DB
  UI --> AX -->|GET /api/health| API
```
**Decisiones técnicas (Clase 4):**
- **SQLite** para simplificar instalación (cero dependencia externa).
- **Sequelize** para migrar luego a MySQL/Postgres sin reescribir lógica.
- **CORS** habilitado para `http://localhost:5173`.
- **Auth básica**: semilla de usuario + bcrypt + token simulado con `jsonwebtoken`.
