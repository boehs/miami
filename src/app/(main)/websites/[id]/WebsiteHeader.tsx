'use client';
import { ReactNode } from 'react';
import classNames from 'classnames';
import { Text, Button } from 'react-basics';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Favicon from 'components/common/Favicon';
import ActiveUsers from 'components/metrics/ActiveUsers';
import { useMessages, useWebsite } from 'components/hooks';
import styles from './WebsiteHeader.module.css';
import { Clock, Database, PanelsTopLeft, PieChart } from 'lucide-react';
import Icon from 'components/Icon';

export function WebsiteHeader({
	websiteId,
	showLinks = true,
	children,
}: {
	websiteId: string;
	showLinks?: boolean;
	children?: ReactNode;
}) {
	const { formatMessage, labels } = useMessages();
	const pathname = usePathname();
	const { data: website } = useWebsite(websiteId);
	const { name, domain } = website || {};

	const links = [
		{
			label: formatMessage(labels.overview),
			icon: <PanelsTopLeft />,
			path: '',
		},
		{
			label: formatMessage(labels.realtime),
			icon: <Clock />,
			path: '/realtime',
		},
		{
			label: formatMessage(labels.reports),
			icon: <PieChart />,
			path: '/reports',
		},
		{
			label: formatMessage(labels.eventData),
			icon: <Database />,
			path: '/event-data',
		},
	];

	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<Favicon domain={domain} />
				<Text>{name}</Text>
				<ActiveUsers websiteId={websiteId} />
			</div>
			<div className={styles.actions}>
				{showLinks && (
					<div className={styles.links}>
						{links.map(({ label, icon, path }) => {
							const selected = path
								? pathname.endsWith(path)
								: pathname.match(/^\/websites\/[\w-]+$/);

							return (
								<Link key={label} href={`/websites/${websiteId}${path}`} shallow={true}>
									<Button
										variant="quiet"
										className={classNames({
											[styles.selected]: selected,
										})}
									>
										<Icon className={styles.icon}>{icon}</Icon>
										<Text className={styles.label}>{label}</Text>
									</Button>
								</Link>
							);
						})}
					</div>
				)}
				{children}
			</div>
		</div>
	);
}

export default WebsiteHeader;
