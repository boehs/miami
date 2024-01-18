import { Button, Text, useToasts, ModalTrigger, Modal } from 'react-basics';
import PasswordEditForm from 'app/(main)/settings/profile/PasswordEditForm';
import useMessages from 'components/hooks/useMessages';
import { Lock } from 'lucide-react';
import Icon from 'components/Icon';

export function PasswordChangeButton() {
	const { formatMessage, labels, messages } = useMessages();
	const { showToast } = useToasts();

	const handleSave = () => {
		showToast({ message: formatMessage(messages.saved), variant: 'success' });
	};

	return (
		<>
			<ModalTrigger>
				<Button>
					<Icon>
						<Lock />
					</Icon>
					<Text>{formatMessage(labels.changePassword)}</Text>
				</Button>
				<Modal title={formatMessage(labels.changePassword)}>
					{close => <PasswordEditForm onSave={handleSave} onClose={close} />}
				</Modal>
			</ModalTrigger>
		</>
	);
}

export default PasswordChangeButton;
