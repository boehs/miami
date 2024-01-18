import Share from './Share';
import { Metadata } from 'next';

export default function ({ params: { id } }) {
	const image = process.env.BRANDING_IMAGE;
	const link = process.env.BRANDING_LINK;
	const name = process.env.BRANDING_NAME;
	return <Share shareId={id[0]} image={image} link={link} name={name} />;
}

export const metadata: Metadata = {
	title: process.env.brandingName,
};
