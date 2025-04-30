import * as React from "react";

const ReloadingIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={136} height={136} style={{shapeRendering: "auto", display: "block", background: "transparent"}} {...props}><g><g>
    <path strokeWidth={17} stroke="#1c70b8" fill="none" d="M50 15A35 35 0 1 0 85 50.00000000000001"></path>
    <path fill="#1c70b8" d="M49 0L49 30L64 15L49 0"></path>
    <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="0.6451612903225806s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
    </g><g></g></g></svg>
  );
};

export default ReloadingIcon;
