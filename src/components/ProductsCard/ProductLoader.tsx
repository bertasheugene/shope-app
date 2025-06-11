import React from "react";
import ContentLoader from "react-content-loader";

interface ProductLoaderProps {
  width?: string | number;
  height?: number;
  speed?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductLoader: React.FC<ProductLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width={props.width || "100%"}
    height={465}
    viewBox="0 0 300 465"
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="-1" rx="0" ry="0" width="100%" height="260" />
    <rect x="0" y="320" rx="0" ry="0" width="100% " height="90" />
    <rect x="0" y="426" rx="0" ry="0" width="47%" height="40" />
    <rect x="0" y="270" rx="0" ry="0" width="100%" height="30" />
    <rect x="52%" y="425" rx="0" ry="0" width="48%" height="40" />
  </ContentLoader>
);
