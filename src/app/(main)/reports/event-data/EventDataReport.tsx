import Report from '../[id]/Report';
import ReportHeader from '../[id]/ReportHeader';
import ReportMenu from '../[id]/ReportMenu';
import ReportBody from '../[id]/ReportBody';
import EventDataParameters from './EventDataParameters';
import EventDataTable from './EventDataTable';
import { Database } from 'lucide-react';

const defaultParameters = {
	type: 'event-data',
	parameters: { fields: [], filters: [] },
};

export default function EventDataReport({ reportId }: { reportId: string }) {
	return (
		<Report reportId={reportId} defaultParameters={defaultParameters}>
			<ReportHeader icon={<Database />} />
			<ReportMenu>
				<EventDataParameters />
			</ReportMenu>
			<ReportBody>
				<EventDataTable />
			</ReportBody>
		</Report>
	);
}
