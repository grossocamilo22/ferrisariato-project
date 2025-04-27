#!/bin/bash

# Esperar un poco para asegurarse de que la base de datos esté lista (si es necesario)
# Puedes ajustar el tiempo si es necesario
echo "Esperando la base de datos..."
sleep 5

# Generar Prisma Client
echo "Generando Prisma Client..."
bun run generate

# Iniciar la aplicación
echo "Iniciando la aplicación..."
bun run start
