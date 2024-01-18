import { Button, Modal, ModalTrigger, Text } from 'react-basics';
import useMessages from 'components/hooks/useMessages';
import TeamAddForm from './TeamAddForm';
import { Plus } from 'lucide-react';
import Icon from 'components/Icon';

export function TeamsAddButton({ onAdd }: { onAdd?: () => void }) {
	const { formatMessage, labels } = useMessages();

	return (
		<ModalTrigger>
			<Button variant="primary">
				<Icon>
					<Plus />
				</Icon>
				<Text>{formatMessage(labels.createTeam)}</Text>
			</Button>
			<Modal title={formatMessage(labels.createTeam)}>
				{(close: () => void) => <TeamAddForm onSave={onAdd} onClose={close} />}
			</Modal>
		</ModalTrigger>
	);
}

export default TeamsAddButton;
