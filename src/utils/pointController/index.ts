export class GlobalPoints {
  public static points: number[] = [0, 1, 2, 3, 5, 8, 13, 21];

  public static pointer: number = GlobalPoints.points.length - 1;
}

export const upPoint = (): number => {
  if (GlobalPoints.pointer === GlobalPoints.points.length - 1) {
    GlobalPoints.pointer = 0;
  } else GlobalPoints.pointer++;

  return GlobalPoints.points[GlobalPoints.pointer];
};

export const downPoint = (): number => {
  if (GlobalPoints.pointer === 0) {
    GlobalPoints.pointer = GlobalPoints.points.length - 1;
  } else GlobalPoints.pointer--;

  return GlobalPoints.points[GlobalPoints.pointer];
};
