'use client';
import WebsiteDetails from 'app/(main)/websites/[id]/WebsiteDetails';
import useShareToken from 'components/hooks/useShareToken';
import styles from './Share.module.css';
import Page from 'components/layout/Page';
import Header from './Header';
import Footer from './Footer';

export default function Share({ shareId, link, image, name }) {
	const { shareToken, isLoading } = useShareToken(shareId);

	if (isLoading || !shareToken) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Page>
				<Header image={image} link={link} name={name} />
				<WebsiteDetails websiteId={shareToken.websiteId} />
				<Footer />
			</Page>
		</div>
	);
}
