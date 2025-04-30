import * as React from "react";

const LoadingIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={200} height={200} style={{shapeRendering: "auto", display: "block", background: "transparent"}} {...props}><g><circle fill="#fffff" r={25} cy={35} cx={50}>
    <animate values="35;65;35" keyTimes="0;0.5;1" keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9" calcMode="spline" repeatCount="indefinite" dur="1s" attributeName="cy"></animate>
    </circle><g></g></g></svg>
  );
};

export default LoadingIcon;
