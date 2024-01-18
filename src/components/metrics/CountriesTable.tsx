import FilterLink from 'components/common/FilterLink';
import useCountryNames from 'components/hooks/useCountryNames';
import { useLocale, useMessages, useFormat } from 'components/hooks';
import MetricsTable, { MetricsTableProps } from './MetricsTable';
import { getFlagEmoji } from 'lib/emoji';

export function CountriesTable({
  onDataLoad,
  ...props
}: {
  onDataLoad: (data: any) => void;
} & MetricsTableProps) {
  const { locale } = useLocale();
  const countryNames = useCountryNames(locale);
  const { formatMessage, labels } = useMessages();
  const { formatCountry } = useFormat();

  const handleDataLoad = (data: any) => {
    onDataLoad?.(data);
  };

  const renderLink = ({ x: code }) => {
    return (
      <FilterLink
        id="country"
        className={locale}
        value={countryNames[code] && code}
        label={formatCountry(code)}
      >
        <span style={{ fontSize: '20px' }}>{getFlagEmoji(code?.toUpperCase())}</span>
      </FilterLink>
    );
  };

  return (
    <MetricsTable
      {...props}
      title={formatMessage(labels.countries)}
      type="country"
      metric={formatMessage(labels.visitors)}
      renderLabel={renderLink}
      onDataLoad={handleDataLoad}
    />
  );
}

export default CountriesTable;
