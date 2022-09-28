import { ReactElement, useMemo } from 'react';
import { GalleryPiece } from '../components/GalleryPiece';

export const useArtPiecesGrid = (
  artUrls: string[],
  numOfColumns: number
): {
  GalleryPieces: ReactElement[][];
} => {
  const GalleryPieces = useMemo(() => {
    const galleryPieceColumns: ReactElement[][] = [];

    artUrls.forEach((url, idx) => {
      const GalleryPieceComponent = <GalleryPiece key={idx} src={url} />;

      if (galleryPieceColumns[idx % numOfColumns])
        galleryPieceColumns[idx % numOfColumns].push(GalleryPieceComponent);
      else galleryPieceColumns[idx % numOfColumns] = [GalleryPieceComponent];
    });

    return galleryPieceColumns;
  }, [artUrls, numOfColumns]);

  return { GalleryPieces };
};
