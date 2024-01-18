import FilterLink from 'components/common/FilterLink';
import { emptyFilter } from 'lib/filters';
import useLocale from 'components/hooks/useLocale';
import useMessages from 'components/hooks/useMessages';
import useCountryNames from 'components/hooks/useCountryNames';
import MetricsTable, { MetricsTableProps } from './MetricsTable';
import regions from 'public/iso-3166-2.json';

export const getStateImage = (code: string) => {
	code = code?.toLowerCase() || 'xx';
	if (code.startsWith('us-') && !code.includes('dc')) {
		return `${process.env.basePath}/images/flags/us-states/${code}.png`;
	}
	return `${process.env.basePath}/images/flags/${code.split('-')[0] || 'xx'}.png`;
};

export function RegionsTable(props: MetricsTableProps) {
	const { locale } = useLocale();
	const { formatMessage, labels } = useMessages();
	const countryNames = useCountryNames(locale);

	const renderLabel = (code: string, country: string) => {
		const region = code.includes('-') ? code : `${country}-${code}`;
		return regions[region] ? `${regions[region]}, ${countryNames[country]}` : region;
	};

	const renderLink = ({ x: code, country }) => {
		return (
			<FilterLink id="region" className={locale} value={code} label={renderLabel(code, country)}>
				<img width={20} src={getStateImage(code)} alt={code} />
			</FilterLink>
		);
	};

	return (
		<MetricsTable
			{...props}
			title={formatMessage(labels.regions)}
			type="region"
			metric={formatMessage(labels.visitors)}
			dataFilter={emptyFilter}
			renderLabel={renderLink}
		/>
	);
}

export default RegionsTable;
