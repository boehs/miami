import { Button, Text, Modal, ModalTrigger, useToasts } from 'react-basics';
import UserAddForm from './UserAddForm';
import useMessages from 'components/hooks/useMessages';
import { setValue } from 'store/cache';
import { Plus } from 'lucide-react';
import Icon from 'components/Icon';

export function UserAddButton({ onSave }: { onSave?: () => void }) {
	const { formatMessage, labels, messages } = useMessages();
	const { showToast } = useToasts();

	const handleSave = () => {
		showToast({ message: formatMessage(messages.saved), variant: 'success' });
		setValue('users', Date.now());
		onSave?.();
	};

	return (
		<ModalTrigger>
			<Button variant="primary">
				<Icon>
					<Plus />
				</Icon>
				<Text>{formatMessage(labels.createUser)}</Text>
			</Button>
			<Modal title={formatMessage(labels.createUser)}>
				{(close: () => void) => <UserAddForm onSave={handleSave} onClose={close} />}
			</Modal>
		</ModalTrigger>
	);
}

export default UserAddButton;
