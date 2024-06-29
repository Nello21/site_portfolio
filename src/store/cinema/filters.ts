import { cinemaData } from 'shared/types/cinemaData';

export const findHitOfTheWeek = (data: cinemaData[]): cinemaData | null => {
  const currentDate = new Date();
  const weekAgoDate = new Date();
  weekAgoDate.setDate(currentDate.getDate() - 7);

  const hitsOfTheWeek = data.filter((item: cinemaData) => {
    const [day, month, year] = item.releaseOnResource.split('.');
    const releaseDate = new Date(Number(year), Number(month) - 1, Number(day));
    return releaseDate >= weekAgoDate && releaseDate <= currentDate;
  });

  if (hitsOfTheWeek.length === 0) {
    return null;
  }

  return hitsOfTheWeek.reduce((prev, current) => (prev.rating > current.rating ? prev : current));
};

export const filterTopRatedLastMonth = (data: cinemaData[]): cinemaData[] => {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  const filteredData = data.filter((item: cinemaData) => {
    const [day, month, year] = item.releaseOnResource.split('.');
    const releaseDate = new Date(Number(year), Number(month) - 1, Number(day));
    return releaseDate >= lastMonthDate && releaseDate <= currentDate;
  });

  return filteredData.sort((a, b) => b.rating - a.rating).slice(0, 12);
};
