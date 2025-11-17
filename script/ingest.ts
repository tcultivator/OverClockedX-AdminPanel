import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // <- explicitly load .env.local

import db from "@/lib/db";
import { ProductsType } from "@/types/ProductsType";
import { chunkText } from '@/lib/chunk'
import { embedText } from '@/lib/embeddings'
import { pineconeIndex } from "@/lib/pinecone";
async function ingestProducts() {

    try {
        // 1. Fetch ALL products from MySQL
        const [products] = await db.query("SELECT * FROM products");
        const finalProducts = products as ProductsType[];

        for (const product of finalProducts) {
            const {
                product_id,
                category,
                product_name,
                price,
                stocks,
                brand,
                description,
                sales_count
            } = product;

            // 2. Build a combined text string for chunking
            const fullText = `
        Category: ${category}
        Product Name: ${product_name}
        Price: ${price}
        Stocks: ${stocks}
        Brand: ${brand}
        Description: ${description}
        Sales Count: ${sales_count}
        `;

            // 3. Create chunks
            const chunks = chunkText(fullText);

            // 4. For each chunk → embed + upsert
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];

                // Create an embedding using OpenAI
                const embedding = await embedText(chunk);

                // Upsert to Pinecone
                await pineconeIndex.upsert([
                    {
                        id: `product-${product_id}-chunk-${i}`,
                        values: embedding,
                        metadata: {
                            productId: product_id,
                            productName: product_name,
                            brand,
                            category,
                            price,
                            stocks,
                            salesCount: sales_count,
                            chunk
                        },
                    },
                ]);

                console.log(`Inserted: product-${product_id}-chunk-${i}`);
            }
        }

        console.log("Ingestion completed.");
    } catch (err) {
        console.error('error!', err)
    }

}
ingestProducts()