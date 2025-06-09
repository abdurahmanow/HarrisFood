import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckmarkIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 8.5L7.5 12L12 5"
        stroke="#FF9900"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
