import { Button, Modal, ModalTrigger, Text, useToasts } from 'react-basics';
import useMessages from 'components/hooks/useMessages';
import TeamJoinForm from './TeamJoinForm';
import { UserPlus } from 'lucide-react';
import Icon from 'components/Icon';

export function TeamsJoinButton() {
	const { formatMessage, labels, messages } = useMessages();
	const { showToast } = useToasts();

	const handleJoin = () => {
		showToast({ message: formatMessage(messages.saved), variant: 'success' });
	};

	return (
		<ModalTrigger>
			<Button variant="secondary">
				<Icon>
					<UserPlus />
				</Icon>
				<Text>{formatMessage(labels.joinTeam)}</Text>
			</Button>
			<Modal title={formatMessage(labels.joinTeam)}>
				{close => <TeamJoinForm onSave={handleJoin} onClose={close} />}
			</Modal>
		</ModalTrigger>
	);
}

export default TeamsJoinButton;
