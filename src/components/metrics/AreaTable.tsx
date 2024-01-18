import useNavigation from 'components/hooks/useNavigation';
import CountriesTable from './CountriesTable';
import { MetricsTableProps } from './MetricsTable';
import RegionsTable from './RegionsTable';
import CitiesTable from './CitiesTable';
import useMessages from 'components/hooks/useMessages';
import { Icon, Icons, Text } from 'react-basics';
import styles from './AreaTable.module.css';
import LinkButton from 'components/common/LinkButton';

export function AreaTable({
  onDataLoad,
  ...props
}: {
  onDataLoad: (data: any) => void;
} & MetricsTableProps) {
  const { formatMessage, labels } = useMessages();
  const { query, makeUrl } = useNavigation();
  const types = ['country', 'region', 'city'];
  const active = types.findIndex(t => query[t] == undefined);

  return (
    <>
      {active > 0 && (
        <LinkButton
          className={styles.link}
          href={makeUrl({ [types[active - 1]]: undefined })}
          scroll={false}
        >
          <Icon>
            <Icons.Close />
          </Icon>
          <Text>{`${formatMessage(labels[types[active - 1]])}: ${query[types[active - 1]]}`}</Text>
        </LinkButton>
      )}
      {active == 0 && <CountriesTable {...props} onDataLoad={onDataLoad} />}
      {active == 1 && <RegionsTable {...props} />}
      {active == 2 && <CitiesTable {...props} />}
    </>
  );
}
