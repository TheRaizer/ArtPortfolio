import { motion } from 'framer-motion';
import Image from 'next/future/image';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

const Styled = {
  GalleryPiece: styled(Image)`
    height: auto;
    width: 400px;
  `,
};

export type GalleryPieceProps = {
  src: string;
};

export const GalleryPiece = ({ src }: GalleryPieceProps): ReactElement => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: imageLoading ? 0 : 1, y: imageLoading ? 50 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Styled.GalleryPiece
        src={src}
        alt="art piece"
        width={400}
        height={400}
        onLoad={() => setImageLoading(false)}
      />
    </motion.div>
  );
};
