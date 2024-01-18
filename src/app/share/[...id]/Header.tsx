'use client';
import { Icon, Text } from 'react-basics';
import Link from 'next/link';
import LanguageButton from 'components/input/LanguageButton';
import ThemeButton from 'components/input/ThemeButton';
import SettingsButton from 'components/input/SettingsButton';
import styles from './Header.module.css';
import useWebsite from 'components/hooks/useWebsite';
import Favicon from 'components/common/Favicon';

export function Header({ websiteId }) {
	const { data: website } = useWebsite(websiteId);
	const { name, domain } = website || {};

	return (
		<header className={styles.header}>
			<div>
				<Link href={'https://' + domain} target="_blank" className={styles.title}>
					<Icon size="lg">
						<Favicon domain={domain} />
					</Icon>
					<Text>{name}</Text>
				</Link>
			</div>
			<div className={styles.buttons}>
				<ThemeButton />
				<LanguageButton />
				<SettingsButton />
			</div>
		</header>
	);
}

export default Header;
