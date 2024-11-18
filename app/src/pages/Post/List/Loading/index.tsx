import React, { useEffect, useState } from 'react';

import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

export interface IDataLoading {
  id: number;
}

export const dataLoading: IDataLoading[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 },
];

const Loading = () => {
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const { width: widthScreen } = Dimensions.get('screen');

  useEffect(() => {
    setCurrentWidth(widthScreen);
  }, [widthScreen]);

  return (
    <ContentLoader
      backgroundColor="#d9d3d3"
      foregroundColor="#ecebeb"
      height={300}
      speed={1}
      width={currentWidth}
    >
      <Rect
        height="200"
        rx="8"
        ry="8"
        width={currentWidth - 32}
        x="16"
        y="16"
      />
      <Rect height="20" rx="4" ry="4" width="70%" x="16" y="230" />
      <Rect height="20" rx="4" ry="4" width="50%" x="16" y="260" />
      <Rect height="20" rx="4" ry="4" width="30%" x="16" y="290" />
      <Rect
        height="40"
        rx="8"
        ry="8"
        width="40"
        x={currentWidth - 56}
        y="290"
      />
      <Rect
        height="40"
        rx="8"
        ry="8"
        width="40"
        x={currentWidth - 112}
        y="290"
      />
    </ContentLoader>
  );
};

export default Loading;
