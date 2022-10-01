export type OKData = {
  ok: boolean;
};

export interface DetailData extends OKData {
  detail?: string;
}

export interface ArtPiecesData extends DetailData {
  urls: string[];
  nextContinuationToken?: string;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
