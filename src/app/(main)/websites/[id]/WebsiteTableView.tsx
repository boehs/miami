import { useState } from 'react';
import { Grid, GridRow } from 'components/layout/Grid';
import PagesTable from 'components/metrics/PagesTable';
import ReferrersTable from 'components/metrics/ReferrersTable';
import BrowsersTable from 'components/metrics/BrowsersTable';
import OSTable from 'components/metrics/OSTable';
import DevicesTable from 'components/metrics/DevicesTable';
import WorldMap from 'components/metrics/WorldMap';
import EventsTable from 'components/metrics/EventsTable';
import EventsChart from 'components/metrics/EventsChart';
import { AreaTable } from 'components/metrics/AreaTable';

export default function WebsiteTableView({
	websiteId,
	domainName,
}: {
	websiteId: string;
	domainName: string;
}) {
	const [countryData, setCountryData] = useState();
	const tableProps = {
		websiteId,
		domainName,
		limit: 10,
	};

	return (
		<Grid>
			<GridRow columns="two">
				<PagesTable {...tableProps} />
				<ReferrersTable {...tableProps} />
			</GridRow>
			<GridRow columns="three">
				<BrowsersTable {...tableProps} />
				<OSTable {...tableProps} />
				<DevicesTable {...tableProps} />
			</GridRow>
			<GridRow columns="two-one">
				<WorldMap data={countryData} websiteId={websiteId} />
				<AreaTable {...tableProps} onDataLoad={setCountryData} />
			</GridRow>
			<GridRow columns="one-two">
				<EventsTable {...tableProps} />
				<EventsChart websiteId={websiteId} />
			</GridRow>
		</Grid>
	);
}
