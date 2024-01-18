import { Button, Modal, ModalTrigger, Text, useToasts } from 'react-basics';
import WebsiteAddForm from './WebsiteAddForm';
import useMessages from 'components/hooks/useMessages';
import { setValue } from 'store/cache';
import { Plus } from 'lucide-react';
import Icon from 'components/Icon';

export function WebsiteAddButton({ onSave }: { onSave?: () => void }) {
	const { formatMessage, labels, messages } = useMessages();
	const { showToast } = useToasts();

	const handleSave = async () => {
		showToast({ message: formatMessage(messages.saved), variant: 'success' });
		setValue('websites', Date.now());
		onSave?.();
	};

	return (
		<ModalTrigger>
			<Button variant="primary">
				<Icon>
					<Plus />
				</Icon>
				<Text>{formatMessage(labels.addWebsite)}</Text>
			</Button>
			<Modal title={formatMessage(labels.addWebsite)}>
				{(close: () => void) => <WebsiteAddForm onSave={handleSave} onClose={close} />}
			</Modal>
		</ModalTrigger>
	);
}

export default WebsiteAddButton;
