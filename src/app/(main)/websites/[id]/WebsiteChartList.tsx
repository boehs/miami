import { Button, Text } from 'react-basics';
import { useMemo } from 'react';
import { firstBy } from 'thenby';
import Link from 'next/link';
import WebsiteChart from './WebsiteChart';
import useDashboard from 'store/dashboard';
import WebsiteHeader from './WebsiteHeader';
import { WebsiteMetricsBar } from './WebsiteMetricsBar';
import { useMessages, useLocale } from 'components/hooks';
import { ArrowRight } from 'lucide-react';
import Icon from 'components/Icon';

export default function WebsiteChartList({
	websites,
	showCharts,
	limit,
}: {
	websites: any[];
	showCharts?: boolean;
	limit?: number;
}) {
	const { formatMessage, labels } = useMessages();
	const { websiteOrder } = useDashboard();
	const { dir } = useLocale();

	const ordered = useMemo(
		() =>
			websites
				.map(website => ({ ...website, order: websiteOrder.indexOf(website.id) || 0 }))
				.sort(firstBy('order')),
		[websites, websiteOrder],
	);

	return (
		<div>
			{ordered.map(({ id }, index) => {
				return index < limit ? (
					<div key={id}>
						<WebsiteHeader websiteId={id} showLinks={false}>
							<Link href={`/websites/${id}`}>
								<Button variant="primary">
									<Text>{formatMessage(labels.viewDetails)}</Text>
									<Icon>
										<Icon rotate={dir === 'rtl' ? 180 : 0}>
											<ArrowRight />
										</Icon>
									</Icon>
								</Button>
							</Link>
						</WebsiteHeader>
						<WebsiteMetricsBar websiteId={id} showFilter={false} />
						{showCharts && <WebsiteChart websiteId={id} />}
					</div>
				) : null;
			})}
		</div>
	);
}
