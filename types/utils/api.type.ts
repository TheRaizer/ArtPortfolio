export type OKData = {
  ok: boolean;
};

export type DetailData = {
  detail?: string;
} & OKData;

export type ArtPiecesData = {
  urls: string[];
  nextContinuationToken?: string;
} & DetailData;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
