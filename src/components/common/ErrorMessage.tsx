import { Text } from 'react-basics';
import styles from './ErrorMessage.module.css';
import useMessages from 'components/hooks/useMessages';
import { AlertTriangle } from 'lucide-react';
import Icon from 'components/Icon';

export function ErrorMessage() {
	const { formatMessage, messages } = useMessages();

	return (
		<div className={styles.error}>
			<Icon className={styles.icon} size="lg">
				<AlertTriangle />
			</Icon>
			<Text>{formatMessage(messages.error)}</Text>
		</div>
	);
}

export default ErrorMessage;
