import { ReactNode } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { safeDecodeURI } from 'next-basics';
import useNavigation from 'components/hooks/useNavigation';
import useMessages from 'components/hooks/useMessages';
import styles from './FilterLink.module.css';
import { ExternalLink } from 'lucide-react';
import Icon from 'components/Icon';

export interface FilterLinkProps {
	id: string;
	value: string;
	label?: string;
	externalUrl?: string;
	className?: string;
	children?: ReactNode;
}

export function FilterLink({
	id,
	value,
	label,
	externalUrl,
	children,
	className,
}: FilterLinkProps) {
	const { formatMessage, labels } = useMessages();
	const { makeUrl, query } = useNavigation();
	const active = query[id] !== undefined;
	const selected = query[id] === value;

	return (
		<div
			className={classNames(styles.row, className, {
				[styles.inactive]: active && !selected,
				[styles.active]: active && selected,
			})}
		>
			{children}
			{!value && `(${label || formatMessage(labels.unknown)})`}
			{value && (
				<Link scroll={false} href={makeUrl({ [id]: value })} className={styles.label} replace>
					{safeDecodeURI(label || value)}
				</Link>
			)}
			{externalUrl && (
				<a className={styles.link} href={externalUrl} target="_blank" rel="noreferrer noopener">
					<Icon className={styles.icon}>
						<ExternalLink />
					</Icon>
				</a>
			)}
		</div>
	);
}

export default FilterLink;
