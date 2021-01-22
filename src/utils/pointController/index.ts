const points: number[] = [0, 1, 2, 3, 5, 8, 13, 21];
let pointer: number = points.length - 1;

export const upPoint = (): number => {
  if (pointer === points.length - 1) {
    pointer = 0;
  } else pointer++;

  console.log(pointer);

  return points[pointer];
};

export const downPoint = (): number => {
  if (pointer === 0) {
    pointer = points.length - 1;
  } else pointer--;

  console.log(pointer);

  return points[pointer];
};
