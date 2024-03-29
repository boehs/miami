import { GridTable, GridColumn, Button, Text } from 'react-basics';
import { useMessages, useNavigation } from 'components/hooks';
import Link from 'next/link';
import PageHeader from 'components/layout/PageHeader';
import Empty from 'components/common/Empty';
import { DATA_TYPES } from 'lib/constants';
import { ArrowLeft } from 'lucide-react';
import Icon from 'components/Icon';

export function EventDataValueTable({ data = [], event }: { data: any[]; event: string }) {
	const { formatMessage, labels } = useMessages();
	const { makeUrl } = useNavigation();

	const Title = () => {
		return (
			<>
				<Link href={makeUrl({ event: undefined })}>
					<Button>
						<Icon>
							<ArrowLeft />
						</Icon>
						<Text>{formatMessage(labels.back)}</Text>
					</Button>
				</Link>
				<Text>{event}</Text>
			</>
		);
	};

	return (
		<>
			<PageHeader title={<Title />} />
			{data.length <= 0 && <Empty />}
			{data.length > 0 && (
				<GridTable data={data}>
					<GridColumn name="fieldName" label={formatMessage(labels.field)} />
					<GridColumn name="dataType" label={formatMessage(labels.type)}>
						{row => DATA_TYPES[row.dataType]}
					</GridColumn>
					<GridColumn name="fieldValue" label={formatMessage(labels.value)} />
					<GridColumn name="total" label={formatMessage(labels.totalRecords)} width="200px">
						{({ total }) => total.toLocaleString()}
					</GridColumn>
				</GridTable>
			)}
		</>
	);
}

export default EventDataValueTable;
