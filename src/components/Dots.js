import { useState, useEffect } from 'react';
import styled from 'styled-components';

function getImageUrl(tokenId) {
  return `https://gateway.pinata.cloud/ipfs/QmVqMYxaEkifE7FoMkdNtryXhPNgHwA89msFQUBQbEYwKE/images/${tokenId}.png`;
}
const ids = (function () {
  const arr = [];
  for (let i = 0; i < 10000; i++) {
    arr.push(i);
  }
  return arr;
})();

function Dots() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  return (
    <div>
      <div>Filters</div>
      <Canvas>
        {ids.map(id => {
          if (id > 10) return null;
          console.log('mapping', id);
          return <DotImage key={id} id={id} />;
        })}
      </Canvas>
    </div>
  );
}

function DotImage({ id }) {
  return <ImageWrapper>
     <Image src={getImageUrl(id)} alt={id} />
  </ImageWrapper>;
}

const Canvas = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
`;
const ImageWrapper = styled.div`
  width: 10%;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default Dots;
