import type { UpdateFilter, Filter, Document } from "mongodb";

type metaSort = { "$meta": "textScore" | "indexKey" };

type Projection<Doc extends Document> = { [Property in keyof Doc]: 0 | 1 };

type Sort<Doc extends Document> = {
  [Property in keyof Doc]: -1 | 1 | metaSort
};


interface RequestBase {
  dataSource: string,
  database: string,
  collection: string,
}

export interface FindOneRequestBody<Doc extends Document> extends RequestBase {
  filter?: Filter<Doc>,
  projection?: Projection<Doc>,
}

export interface FindRequestBody<Doc extends Document> extends RequestBase {
  filter?: Filter<Doc>,
  projection?: Projection<Doc>,
  sort?: Sort<Doc>,
  limit?: number | 1000,
  skip?: number
}

export interface InsertOneRequestBody<Doc extends Document> extends RequestBase {
  document: Doc
}


export interface InsertManyRequestBody<Doc extends Document> extends RequestBase {
  documents: Doc[]
}

export interface UpdateRequestBody<Doc extends Document> extends RequestBase {
  filter: Filter<Doc>,
  update: UpdateFilter<Doc>,
  upsert?: boolean
}

export interface ReplaceOneRequestBody<Doc extends Document> extends RequestBase {
  filter: Filter<Doc>,
  replacement: UpdateFilter<Doc>,
  upsert?: boolean
}

export interface DeleteRequestBody<Doc extends Document> extends RequestBase {
  filter: Filter<Doc>
}

export interface AggregateRequestBody<Doc extends Document> extends RequestBase {
  pipeline: any[]
}


export type requestBodies = {
  "findOne": FindOneRequestBody<Document>,
  "find": FindRequestBody<Document>,
  "insertOne": InsertOneRequestBody<Document>,
  "insertMany": InsertManyRequestBody<Document>,
  "updateOne": UpdateRequestBody<Document>,
  "updateMany": UpdateRequestBody<Document>,
  "replaceOne": ReplaceOneRequestBody<Document>,
  "deleteOne": DeleteRequestBody<Document>,
  "deleteMany": DeleteRequestBody<Document>,
  "aggregate": AggregateRequestBody<Document>,
}


export type Endpoints = keyof requestBodies;


export type config = {
  url: string,
  key: string
}

