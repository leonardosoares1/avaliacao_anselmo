import React, { useEffect, useState } from 'react';

import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

interface IDetailsProps {
  height: number;
  linesQuantity: number;
}

const Details = ({ height, linesQuantity }: IDetailsProps) => {
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const { width: widthScreen } = Dimensions.get('screen');

  const lines = [...new Array(linesQuantity).keys()];

  useEffect(() => {
    setCurrentWidth(widthScreen);
  }, [widthScreen]);

  return (
    <ContentLoader
      backgroundColor="#D9D3D3"
      foregroundColor="#ECEBEB"
      height={height}
      speed={1}
      width={currentWidth}
    >
      <Rect height="14" rx={4} ry={4} width="220" />
      {lines.map((line, index) => (
        <Rect
          height="28"
          key={line}
          rx={4}
          ry={4}
          width={widthScreen - 70}
          y={25 + 40 * index}
        />
      ))}
    </ContentLoader>
  );
};

interface IItemProps {
  height: number;
}

const Item = ({ height }: IItemProps) => {
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const { width: widthScreen } = Dimensions.get('screen');

  useEffect(() => {
    setCurrentWidth(widthScreen);
  }, [widthScreen]);

  return (
    <ContentLoader
      backgroundColor="#D9D3D3"
      foregroundColor="#ECEBEB"
      height={height}
      speed={1}
      width={currentWidth}
    >
      <Rect height="30" rx={4} ry={4} width={widthScreen - 70} />
      <Rect height="54" rx={4} ry={4} width={widthScreen - 70} y="40" />
    </ContentLoader>
  );
};

interface ILineProps {
  height: number;
  width: number;
}

const Line = ({ height, width }: ILineProps) => {
  return (
    <ContentLoader
      backgroundColor="#D9D3D3"
      foregroundColor="#ECEBEB"
      height={height}
      speed={1}
      width={width}
    >
      <Rect height={height} rx={4} ry={4} width={width} />
    </ContentLoader>
  );
};

const ComponentContentLoader = {
  Details,
  Item,
  Line,
};

export default ComponentContentLoader;
