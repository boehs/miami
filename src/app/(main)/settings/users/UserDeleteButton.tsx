import { Button, Modal, ModalTrigger, Text } from 'react-basics';
import useMessages from 'components/hooks/useMessages';
import useUser from 'components/hooks/useUser';
import UserDeleteForm from './UserDeleteForm';
import { Trash } from 'lucide-react';
import Icon from 'components/Icon';

export function UserDeleteButton({
	userId,
	username,
	onDelete,
}: {
	userId: string;
	username: string;
	onDelete?: () => void;
}) {
	const { formatMessage, labels } = useMessages();
	const { user } = useUser();

	return (
		<ModalTrigger disabled={userId === user?.id}>
			<Button disabled={userId === user?.id}>
				<Icon>
					<Trash />
				</Icon>
				<Text>{formatMessage(labels.delete)}</Text>
			</Button>
			<Modal title={formatMessage(labels.deleteUser)}>
				{(close: () => void) => (
					<UserDeleteForm userId={userId} username={username} onSave={onDelete} onClose={close} />
				)}
			</Modal>
		</ModalTrigger>
	);
}

export default UserDeleteButton;
