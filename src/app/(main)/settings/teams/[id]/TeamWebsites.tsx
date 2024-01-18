import { ActionForm, Button, Modal, ModalTrigger, Text } from 'react-basics';
import TeamWebsitesTable from './TeamWebsitesTable';
import TeamWebsiteAddForm from './TeamWebsiteAddForm';
import useApi from 'components/hooks/useApi';
import useMessages from 'components/hooks/useMessages';
import useUser from 'components/hooks/useUser';
import useFilterQuery from 'components/hooks/useFilterQuery';
import DataTable from 'components/common/DataTable';
import useCache from 'store/cache';
import { Plus } from 'lucide-react';
import Icon from 'components/Icon';

export function TeamWebsites({ teamId, readOnly }: { teamId: string; readOnly: boolean }) {
	const { formatMessage, labels, messages } = useMessages();
	const { user } = useUser();
	const { get } = useApi();
	const modified = useCache(state => state?.['team:websites']);
	const queryResult = useFilterQuery({
		queryKey: ['team:websites', { teamId, modified }],
		queryFn: params => {
			return get(`/teams/${teamId}/websites`, {
				...params,
			});
		},
		enabled: !!user,
	});

	const handleChange = () => {
		queryResult.query.refetch();
	};

	return (
		<>
			<ActionForm description={formatMessage(messages.teamWebsitesInfo)}>
				<ModalTrigger>
					<Button variant="primary">
						<Icon>
							<Plus />
						</Icon>
						<Text>{formatMessage(labels.addWebsite)}</Text>
					</Button>
					<Modal title={formatMessage(labels.addWebsite)}>
						{close => <TeamWebsiteAddForm teamId={teamId} onSave={handleChange} onClose={close} />}
					</Modal>
				</ModalTrigger>
			</ActionForm>
			<DataTable queryResult={queryResult}>
				{({ data }) => (
					<TeamWebsitesTable data={data} onRemove={handleChange} readOnly={readOnly} />
				)}
			</DataTable>
		</>
	);
}

export default TeamWebsites;
