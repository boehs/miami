import { useCors, useValidate } from 'lib/middleware';
import { NextApiRequestQueryBody } from 'lib/types';
import { NextApiResponse } from 'next';
import { methodNotAllowed, notFound, ok } from 'next-basics';
import { getWebsiteByShareId } from 'queries';
import * as yup from 'yup';

export interface ShareRequestQuery {
	id: string;
}

export interface ShareResponse {
	id: string;
	token: string;
}

const schema = {
	GET: yup.object().shape({
		id: yup.string().required(),
	}),
};

export default async (
	req: NextApiRequestQueryBody<ShareRequestQuery>,
	res: NextApiResponse<ShareResponse>,
) => {
	await useCors(req, res);
	await useValidate(schema, req, res);

	const { id: shareId } = req.query;

	if (req.method === 'GET') {
		const website = await getWebsiteByShareId(shareId);

		if (website) {
			const data = { websiteId: website.id };

			return ok(res, { ...data, token: shareId });
		}

		return notFound(res);
	}

	return methodNotAllowed(res);
};
