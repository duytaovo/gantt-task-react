import React, {
  useMemo,
} from "react";

import { TaskBarColorStyles } from "../../../types/public-types";

import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  hasChildren: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: TaskBarColorStyles;
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  hasChildren,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
}) => {
  const processColor = useMemo(() => {
    if (hasChildren) {
      if (isSelected) {
        return styles.groupProgressSelectedColor;
      }

      return styles.groupProgressColor;
    }

    if (isSelected) {
      return styles.barProgressSelectedColor;
    }

    return styles.barProgressColor;
  }, [isSelected, hasChildren, styles]);

  const barColor = useMemo(() => {
    if (hasChildren) {
      if (isSelected) {
        return styles.groupBackgroundSelectedColor;
      }

      return styles.groupBackgroundColor;
    }

    if (isSelected) {
      return styles.barBackgroundSelectedColor;
    }

    return styles.barBackgroundColor;
  }, [isSelected, hasChildren, styles]);

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={barColor}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={processColor}
      />
    </g>
  );
};
