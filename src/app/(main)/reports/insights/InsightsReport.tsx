'use client';
import Report from '../[id]/Report';
import ReportHeader from '../[id]/ReportHeader';
import ReportMenu from '../[id]/ReportMenu';
import ReportBody from '../[id]/ReportBody';
import InsightsParameters from './InsightsParameters';
import InsightsTable from './InsightsTable';
import { REPORT_TYPES } from 'lib/constants';
import { Lightbulb } from 'lucide-react';

const defaultParameters = {
	type: REPORT_TYPES.insights,
	parameters: { fields: [], filters: [] },
};

export default function InsightsReport({ reportId }: { reportId: string }) {
	return (
		<Report reportId={reportId} defaultParameters={defaultParameters}>
			<ReportHeader icon={<Lightbulb />} />
			<ReportMenu>
				<InsightsParameters />
			</ReportMenu>
			<ReportBody>
				<InsightsTable />
			</ReportBody>
		</Report>
	);
}
