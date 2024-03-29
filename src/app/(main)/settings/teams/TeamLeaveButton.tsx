import { Button, Modal, ModalTrigger, Text } from 'react-basics';
import useMessages from 'components/hooks/useMessages';
import useLocale from 'components/hooks/useLocale';
import useUser from 'components/hooks/useUser';
import TeamDeleteForm from './TeamLeaveForm';
import { LogOut } from 'lucide-react';
import Icon from 'components/Icon';

export function TeamLeaveButton({
	teamId,
	teamName,
	onLeave,
}: {
	teamId: string;
	teamName: string;
	onLeave?: () => void;
}) {
	const { formatMessage, labels } = useMessages();
	const { dir } = useLocale();
	const { user } = useUser();

	return (
		<ModalTrigger>
			<Button>
				<Icon rotate={dir === 'rtl' ? 180 : 0}>
					<LogOut />
				</Icon>
				<Text>{formatMessage(labels.leave)}</Text>
			</Button>
			<Modal title={formatMessage(labels.leaveTeam)}>
				{close => (
					<TeamDeleteForm
						teamId={teamId}
						userId={user.id}
						teamName={teamName}
						onSave={onLeave}
						onClose={close}
					/>
				)}
			</Modal>
		</ModalTrigger>
	);
}

export default TeamLeaveButton;
