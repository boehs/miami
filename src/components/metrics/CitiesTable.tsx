import MetricsTable, { MetricsTableProps } from './MetricsTable';
import { emptyFilter } from 'lib/filters';
import FilterLink from 'components/common/FilterLink';
import useLocale from 'components/hooks/useLocale';
import useMessages from 'components/hooks/useMessages';
import useCountryNames from 'components/hooks/useCountryNames';
import { getStateImage } from './RegionsTable';

export function CitiesTable(props: MetricsTableProps) {
	const { locale } = useLocale();
	const { formatMessage, labels } = useMessages();
	const countryNames = useCountryNames(locale);

	const renderLabel = (city: string, country: string) => {
		const countryName = countryNames[country];
		return countryName ? `${city}, ${countryName}` : city;
	};

	const renderLink = ({ x: city, country, region }) => {
		return (
			<FilterLink id="city" value={city} label={renderLabel(city, country)}>
				{country && <img width={20} src={getStateImage(region)} alt={country} />}
			</FilterLink>
		);
	};

	return (
		<MetricsTable
			{...props}
			title={formatMessage(labels.cities)}
			type="city"
			metric={formatMessage(labels.visitors)}
			dataFilter={emptyFilter}
			renderLabel={renderLink}
		/>
	);
}

export default CitiesTable;
