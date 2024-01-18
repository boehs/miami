'use client';
import Link from 'next/link';
import { Button, Text } from 'react-basics';
import PageHeader from 'components/layout/PageHeader';
import styles from './ReportTemplates.module.css';
import { useMessages } from 'components/hooks';
import Icon from 'components/Icon';
import { Cone, Lightbulb, Magnet, Plus } from 'lucide-react';

function ReportItem({ title, description, url, icon }) {
	const { formatMessage, labels } = useMessages();

	return (
		<div className={styles.report}>
			<div className={styles.title}>
				<Icon size="lg">{icon}</Icon>
				<Text>{title}</Text>
			</div>
			<div className={styles.description}>{description}</div>
			<div className={styles.buttons}>
				<Link href={url}>
					<Button variant="primary">
						<Icon>
							<Plus />
						</Icon>
						<Text>{formatMessage(labels.create)}</Text>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export function ReportTemplates({ showHeader = true }) {
	const { formatMessage, labels } = useMessages();

	const reports = [
		{
			title: formatMessage(labels.insights),
			description: formatMessage(labels.insightsDescription),
			url: '/reports/insights',
			icon: <Lightbulb />,
		},
		{
			title: formatMessage(labels.funnel),
			description: formatMessage(labels.funnelDescription),
			url: '/reports/funnel',
			icon: <Cone />,
		},
		{
			title: formatMessage(labels.retention),
			description: formatMessage(labels.retentionDescription),
			url: '/reports/retention',
			icon: <Magnet />,
		},
	];

	return (
		<>
			{showHeader && <PageHeader title={formatMessage(labels.reports)} />}
			<div className={styles.reports}>
				{reports.map(({ title, description, url, icon }) => {
					return (
						<ReportItem key={title} icon={icon} title={title} description={description} url={url} />
					);
				})}
			</div>
		</>
	);
}

export default ReportTemplates;
