'use client';
import Link from 'next/link';
import { Button, Flexbox, Text } from 'react-basics';
import { useMessages } from 'components/hooks';
import WebsiteHeader from '../WebsiteHeader';
import ReportsDataTable from 'app/(main)/reports/ReportsDataTable';
import Icon from 'components/Icon';
import { Plus } from 'lucide-react';

export function WebsiteReports({ websiteId }) {
	const { formatMessage, labels } = useMessages();

	return (
		<>
			<WebsiteHeader websiteId={websiteId} />
			<Flexbox alignItems="center" justifyContent="end">
				<Link href={`/reports/create`}>
					<Button variant="primary">
						<Icon>
							<Plus />
						</Icon>
						<Text>{formatMessage(labels.createReport)}</Text>
					</Button>
				</Link>
			</Flexbox>
			<ReportsDataTable websiteId={websiteId} />
		</>
	);
}

export default WebsiteReports;
