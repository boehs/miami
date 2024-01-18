import MetricsTable, { MetricsTableProps } from './MetricsTable';
import FilterLink from 'components/common/FilterLink';
import useMessages from 'components/hooks/useMessages';
import { useFormat } from 'components/hooks';
import { DEVICE_EMOJIS } from 'lib/constants';

export function DevicesTable(props: MetricsTableProps) {
  const { formatMessage, labels } = useMessages();
  const { formatDevice } = useFormat();

  function renderLink({ x: device }) {
    return (
      <FilterLink id="device" value={labels[device] && device} label={formatDevice(device)}>
        {DEVICE_EMOJIS[device] ? (
          <span style={{ fontSize: '16px' }}>{DEVICE_EMOJIS[device]}</span>
        ) : (
          <img
            src={`${process.env.basePath}/images/device/${device?.toLowerCase() || 'unknown'}.png`}
            alt={device}
            width={16}
            height={16}
          />
        )}
      </FilterLink>
    );
  }

  return (
    <MetricsTable
      {...props}
      title={formatMessage(labels.devices)}
      type="device"
      metric={formatMessage(labels.visitors)}
      renderLabel={renderLink}
    />
  );
}

export default DevicesTable;
