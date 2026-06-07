-- Script incremental para bancos ja existentes
-- Adiciona a coluna IsAdmin na tabela Clientes

ALTER TABLE "Clientes"
ADD COLUMN IF NOT EXISTS "IsAdmin" BOOLEAN NOT NULL DEFAULT FALSE;
