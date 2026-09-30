-- CreateTable


CREATE EXTENSION IF NOT EXISTS vector;


CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "FAQ" 
ADD COLUMN IF NOT EXISTS "embedding" vector(384);
/* Create Index */


CREATE INDEX "faq_embedding_index"
ON "FAQ"
USING hnsw(embedding vector_ip_ops)




