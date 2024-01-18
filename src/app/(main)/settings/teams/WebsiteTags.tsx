import { Button, Text } from 'react-basics';
import styles from './WebsiteTags.module.css';
import { X } from 'lucide-react';
import Icon from 'components/Icon';

export function WebsiteTags({
	items = [],
	websites = [],
	onClick,
}: {
	items: any[];
	websites: any[];
	onClick: (e: Event) => void;
}) {
	if (websites.length === 0) {
		return null;
	}

	return (
		<div className={styles.filters}>
			{websites.map(websiteId => {
				const website = items.find(a => a.id === websiteId);

				return (
					<div key={websiteId} className={styles.tag}>
						<Button onClick={() => onClick(websiteId)} variant="primary" size="sm">
							<Text>
								<b>{`${website.name}`}</b>
							</Text>
							<Icon>
								<X />
							</Icon>
						</Button>
					</div>
				);
			})}
		</div>
	);
}

export default WebsiteTags;
