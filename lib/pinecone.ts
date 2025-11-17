import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // <- explicitly load .env.local

import { Pinecone } from '@pinecone-database/pinecone'

export const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
})

export const pineconeIndex = pc.index("products");