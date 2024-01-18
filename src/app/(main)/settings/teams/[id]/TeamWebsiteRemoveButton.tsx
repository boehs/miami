import useApi from 'components/hooks/useApi';
import useMessages from 'components/hooks/useMessages';
import { X } from 'lucide-react';
import { LoadingButton, Text } from 'react-basics';
import Icon from 'components/Icon';

export function TeamWebsiteRemoveButton({ teamId, websiteId, onSave }) {
	const { formatMessage, labels } = useMessages();
	const { del, useMutation } = useApi();
	const { mutate, isPending } = useMutation({
		mutationFn: () => del(`/teams/${teamId}/websites/${websiteId}`),
	});

	const handleRemoveTeamMember = async () => {
		mutate(null, {
			onSuccess: () => {
				onSave();
			},
		});
	};

	return (
		<LoadingButton variant="quiet" onClick={() => handleRemoveTeamMember()} isLoading={isPending}>
			<Icon>
				<X />
			</Icon>
			<Text>{formatMessage(labels.remove)}</Text>
		</LoadingButton>
	);
}

export default TeamWebsiteRemoveButton;
