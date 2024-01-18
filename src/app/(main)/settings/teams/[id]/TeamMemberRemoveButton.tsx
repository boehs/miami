import useApi from 'components/hooks/useApi';
import useMessages from 'components/hooks/useMessages';
import { X } from 'lucide-react';
import { LoadingButton, Text } from 'react-basics';
import { setValue } from 'store/cache';
import Icon from 'components/Icon';

export function TeamMemberRemoveButton({
	teamId,
	userId,
	disabled,
	onSave,
}: {
	teamId: string;
	userId: string;
	disabled?: boolean;
	onSave?: () => void;
}) {
	const { formatMessage, labels } = useMessages();
	const { del, useMutation } = useApi();
	const { mutate, isPending } = useMutation({
		mutationFn: () => del(`/teams/${teamId}/users/${userId}`),
	});

	const handleRemoveTeamMember = () => {
		mutate(null, {
			onSuccess: () => {
				setValue('team:members', Date.now());
				onSave?.();
			},
		});
	};

	return (
		<LoadingButton
			onClick={() => handleRemoveTeamMember()}
			disabled={disabled}
			isLoading={isPending}
		>
			<Icon>
				<X />
			</Icon>
			<Text>{formatMessage(labels.remove)}</Text>
		</LoadingButton>
	);
}

export default TeamMemberRemoveButton;
