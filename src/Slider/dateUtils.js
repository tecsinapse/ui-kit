// @flow
export const getDayName = (day: number): string => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  return days[day];
};
