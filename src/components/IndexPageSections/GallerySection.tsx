import {
  CSSProperties,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { ArtPiecesData } from '../../../types/utils/api.type';
import { useArtPiecesGrid } from '../../hooks/useArtPiecesGrid';
import { fetchAPI } from '../../utils/api';
import { Col } from '../common/Col';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/future/image';
import { Socials } from '../Socials';

const MAX_WIDTH_2_COL = 1800;
const MAX_WIDTH_1_COL = 1200;

const Styled = {
  GalleryContainer: styled.section`
    width: var(--vw-no-scrollbar);
    height: fit-content;
    background-color: black;
    padding-top: 50vh;
    padding-left: 15vw;
    padding-right: 15vw;
    display: flex;
    flex-direction: column;
    gap: 50px;
  `,
  Footer: styled.footer`
    position: relative;
    display: flex;
    justify-content: baseline;
    align-items: flex-end;
    height: 20vh;
    width: 100%;
  `,
  SocialsContainer: styled.div`
    position: absolute;
    right: -14vw;
    bottom: 2vh;
  `,
  GalleryPiecesGrid: styled.div`
    display: flex;
    gap: 20px;
  `,
  Header: styled.div`
    padding-bottom: 5%;
    font-size: 50px;
    color: white;
  `,
  LoadingMore: styled.div`
    width: 100%;
    padding-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const PAGE_SIZE = 6;

// styled component throws errors when wrapping IfiniteScroll component
const infiniteScrollStyles: CSSProperties = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

export const GallerySection = (): ReactElement => {
  const [galleryPieceUrls, setGalleryPieceUrls] = useState<string[]>([]);
  const tokenRef = useRef<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const [columns, setColumns] = useState(3);

  const changeColumnsOnResize = useCallback(({ width }: { width: number }) => {
    if (width <= MAX_WIDTH_1_COL) {
      setColumns(1);
    } else if (width <= MAX_WIDTH_2_COL) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }, []);

  useWindowDimensions(changeColumnsOnResize);

  const fetchMoreArtUrls = async () => {
    const { data } = await fetchAPI<ArtPiecesData>(
      `art-pieces?${
        tokenRef.current
          ? `next_continuation_token=${encodeURIComponent(tokenRef.current)}`
          : ''
      }&page_size=${PAGE_SIZE}`,
      'GET'
    );

    setGalleryPieceUrls((galleryPieceUrls) => [
      ...galleryPieceUrls,
      ...data.urls,
    ]);

    if (!data.nextContinuationToken) {
      setHasMore(false);
      return;
    }

    tokenRef.current = data.nextContinuationToken;
  };

  const { GalleryPieces } = useArtPiecesGrid(galleryPieceUrls, columns);

  return (
    <Styled.GalleryContainer id="gallery">
      <InfiniteScroll
        scrollThreshold={0.9}
        dataLength={galleryPieceUrls.length}
        next={fetchMoreArtUrls}
        hasMore={hasMore}
        loader={
          <Styled.LoadingMore>
            <Image
              src="/images/loading.gif"
              alt="loading..."
              width={64}
              height={64}
            />
          </Styled.LoadingMore>
        }
        style={infiniteScrollStyles}
      >
        <Styled.Header>Gallery</Styled.Header>
        <Styled.GalleryPiecesGrid>
          <Col gap="20px">{GalleryPieces[0]}</Col>
          <Col gap="20px">{GalleryPieces[1]}</Col>
          <Col gap="20px">{GalleryPieces[2]}</Col>
        </Styled.GalleryPiecesGrid>
      </InfiniteScroll>
      <Styled.Footer>
        <Styled.SocialsContainer>
          {!hasMore && <Socials />}
        </Styled.SocialsContainer>
      </Styled.Footer>
    </Styled.GalleryContainer>
  );
};
