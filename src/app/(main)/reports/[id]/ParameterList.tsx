import { ReactNode } from 'react';
import { TooltipPopup } from 'react-basics';
import Empty from 'components/common/Empty';
import { useMessages } from 'components/hooks';
import styles from './ParameterList.module.css';
import { X } from 'lucide-react';
import Icon from 'components/Icon';

export interface ParameterListProps {
	items: any[];
	children?: ReactNode | ((item: any) => ReactNode);
	onRemove: (index: number, e: any) => void;
}

export function ParameterList({ items = [], children, onRemove }: ParameterListProps) {
	const { formatMessage, labels } = useMessages();

	return (
		<div className={styles.list}>
			{!items.length && <Empty message={formatMessage(labels.none)} />}
			{items.map((item, index) => {
				return (
					<div key={index} className={styles.item}>
						{typeof children === 'function' ? children(item) : item}
						<TooltipPopup
							className={styles.icon}
							label={formatMessage(labels.remove)}
							position="right"
						>
							<Icon onClick={onRemove.bind(null, index)}>
								<X />
							</Icon>
						</TooltipPopup>
					</div>
				);
			})}
		</div>
	);
}

export default ParameterList;
