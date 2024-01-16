import { NextApiRequest } from 'next';
import { getAllowedUnits, getMinimumUnit } from './date';
import { getWebsiteDateRange } from '../queries';

export async function parseDateRangeQuery(req: NextApiRequest) {
  const { id: websiteId, startAt, endAt, unit } = req.query;

  // All-time
  if ((+startAt === 0 && +endAt === 1) || (startAt == undefined && endAt == undefined)) {
    const result = await getWebsiteDateRange(websiteId as string);
    const { mindate, maxdate } = result;
    const startDate = new Date(mindate);
    const endDate = new Date(maxdate);

    return {
      startDate,
      endDate,
      unit: getMinimumUnit(startDate, endDate),
    };
  }

  const startDate = new Date(+startAt);
  const endDate = new Date(+endAt);
  const minUnit = getMinimumUnit(startDate, endDate);

  return {
    startDate,
    endDate,
    unit: (getAllowedUnits(startDate, endDate).includes(unit as string) ? unit : minUnit) as string,
  };
}
