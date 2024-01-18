'use client';
import PageHeader from 'components/layout/PageHeader';
import { Button, Text } from 'react-basics';
import { useMessages } from 'components/hooks';
import { useRouter } from 'next/navigation';
import Icon from 'components/Icon';
import { Plus } from 'lucide-react';

export function ReportsHeader() {
	const { formatMessage, labels } = useMessages();
	const router = useRouter();

	const handleClick = () => router.push('/reports/create');

	return (
		<PageHeader title={formatMessage(labels.reports)}>
			<Button variant="primary" onClick={handleClick}>
				<Icon>
					<Plus />
				</Icon>
				<Text>{formatMessage(labels.createReport)}</Text>
			</Button>
		</PageHeader>
	);
}

export default ReportsHeader;
