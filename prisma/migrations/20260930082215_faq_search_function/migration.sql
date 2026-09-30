-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;


-- Match documents using negative inner product (<#>)
create or replace function match_faqs (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns setof "FAQ"
language sql
as $$
  select *
  from "FAQ"
  where "FAQ".embeddings <#> query_embedding < -match_threshold
  order by "FAQ".embeddings <#> query_embedding asc
  limit least(match_count, 200);
$$;