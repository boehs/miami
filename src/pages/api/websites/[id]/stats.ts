import { subMinutes, differenceInMinutes } from 'date-fns';
import { NextApiResponse } from 'next';
import { methodNotAllowed, ok, unauthorized } from 'next-basics';
import { canViewWebsite } from 'lib/auth';
import { useAuth, useCors, useValidate } from 'lib/middleware';
import { NextApiRequestQueryBody, WebsiteStats } from 'lib/types';
import { parseDateRangeQuery } from 'lib/query';
import { getWebsiteStats } from 'queries';
import redis from '@umami/redis-client';

export interface WebsiteStatsRequestQuery {
	id: string;
	startAt: number;
	endAt: number;
	url?: string;
	referrer?: string;
	title?: string;
	query?: string;
	event?: string;
	os?: string;
	browser?: string;
	device?: string;
	country?: string;
	region?: string;
	city?: string;
}

import * as yup from 'yup';
const schema = {
	GET: yup.object().shape({
		id: yup.string().uuid().required(),
		startAt: yup.number(),
		endAt: yup.number(),
		url: yup.string(),
		referrer: yup.string(),
		title: yup.string(),
		query: yup.string(),
		event: yup.string(),
		os: yup.string(),
		browser: yup.string(),
		device: yup.string(),
		country: yup.string(),
		region: yup.string(),
		city: yup.string(),
	}),
};

export default async (
	req: NextApiRequestQueryBody<WebsiteStatsRequestQuery>,
	res: NextApiResponse<WebsiteStats>,
) => {
	await useCors(req, res);
	await useAuth(req, res);
	await useValidate(schema, req, res);

	const {
		id: websiteId,
		url,
		referrer,
		title,
		query,
		event,
		os,
		browser,
		device,
		country,
		region,
		city,
	} = req.query;

	if (req.method === 'GET') {
		if (!(await canViewWebsite(req.auth, websiteId))) {
			return unauthorized(res);
		}

		const { startDate, endDate } = await parseDateRangeQuery(req);
		const diff = differenceInMinutes(endDate, startDate);
		const prevStartDate = subMinutes(startDate, diff);
		const prevEndDate = subMinutes(endDate, diff);

		const filters = {
			url,
			referrer,
			title,
			query,
			event,
			os,
			browser,
			device,
			country,
			region,
			city,
		};

		const getStats = async () => {
			const metrics = await getWebsiteStats(websiteId, { ...filters, startDate, endDate });

			const prevPeriod = await getWebsiteStats(websiteId, {
				...filters,
				startDate: prevStartDate,
				endDate: prevEndDate,
			});

			return Object.keys(metrics[0]).reduce((obj, key) => {
				obj[key] = {
					value: Number(metrics[0][key]) || 0,
					change: Number(metrics[0][key]) - Number(prevPeriod[0][key]) || 0,
				};
				return obj;
			}, {});
		};

		if (redis.enabled && Object.keys(req.query).length == 1 && req.query.url != undefined) {
			return ok(
				res,
				await redis.client.getCache(`hitcount:${req.query.url}`, () => getStats(), 60),
			);
		}
		return ok(res, await getStats());
	}

	return methodNotAllowed(res);
};
