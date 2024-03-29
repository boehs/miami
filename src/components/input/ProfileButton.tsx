import { Button, PopupTrigger, Popup, Menu, Item, Text } from 'react-basics';
import { useRouter } from 'next/navigation';
import useMessages from 'components/hooks/useMessages';
import useUser from 'components/hooks/useUser';
import useLocale from 'components/hooks/useLocale';
import { CURRENT_VERSION } from 'lib/constants';
import styles from './ProfileButton.module.css';
import { ChevronDown, LogOut, User, UserCircle } from 'lucide-react';
import Icon from 'components/Icon';

export function ProfileButton() {
	const { formatMessage, labels } = useMessages();
	const { user } = useUser();
	const router = useRouter();
	const { dir } = useLocale();
	const cloudMode = Boolean(process.env.cloudMode);

	const handleSelect = key => {
		if (key === 'profile') {
			router.push('/settings/profile');
		}
		if (key === 'logout') {
			router.push('/logout');
		}
	};

	return (
		<PopupTrigger>
			<Button variant="quiet">
				<Icon>
					<UserCircle />
				</Icon>
				<Icon size="sm">
					<ChevronDown />
				</Icon>
			</Button>
			<Popup position="bottom" alignment={dir === 'rtl' ? 'start' : 'end'}>
				<Menu variant="popup" onSelect={handleSelect} className={styles.menu}>
					<Item key="user" className={styles.item}>
						<Text>{user.username}</Text>
					</Item>
					<Item key="profile" className={styles.item} divider={true}>
						<Icon>
							<User />
						</Icon>
						<Text>{formatMessage(labels.profile)}</Text>
					</Item>
					{!cloudMode && (
						<Item key="logout" className={styles.item}>
							<Icon>
								<LogOut />
							</Icon>
							<Text>{formatMessage(labels.logout)}</Text>
						</Item>
					)}
					<div className={styles.version}>{`v${CURRENT_VERSION}`}</div>
				</Menu>
			</Popup>
		</PopupTrigger>
	);
}

export default ProfileButton;
