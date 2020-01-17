# Installation

```bash
# Copy and fill .env
cp .env.example .env

# Run migrate
npx sequelize-cli db:migrate

# Running Seed
npx sequelize-cli db:seed:all

# Start server
npm start
```

## Migations
```bash
# Create migration
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


# Running Migrations
npx sequelize-cli db:migrate


# You can revert back to initial state by undoing all migrations with
npx sequelize-cli db:migrate:undo


#You can also revert back to a specific migration by passing its name in --to option 
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-users.js

# Running Seed
npx sequelize-cli db:seed:all
```