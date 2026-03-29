import "dotenv/config";
import { PDFParse } from "pdf-parse";
import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import fs from "fs";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.Index("cohort-2-rag");

// let dataBuffer = fs.readFileSync("./story.pdf");

// const parser = new PDFParse({
//   data: dataBuffer,
// });

// const data = await parser.getText();

const embedbings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 0,
// });

// const chunks = await splitter.splitText(data.text);

// const docs = await Promise.all(
//   chunks.map(async (chunk) => {
//     const embedbing = await embedbings.embedQuery(chunk);
//     return {
//       text: chunk,
//       embedbing,
//     };
//   }),
// );

// const results = await index.upsert({
//   records: docs.map((doc, i) => ({
//     id: `doc-${i}`,
//     values: doc.embedbing,
//     metadata: {
//       text: doc.text,
//     },
//   })),
// });

const queryEmbedding = await embedbings.embedQuery("how was the intership?");
const results = await index.query({
  vector: queryEmbedding,
  topK: 2,
  includeMetadata: true,
});

console.log(JSON.stringify(results));
