import { TooltipPopup, Text, Flexbox, Button } from 'react-basics';
import { saveDashboard } from 'store/dashboard';
import useMessages from 'components/hooks/useMessages';
import { BarChart2, Edit } from 'lucide-react';
import { Icon } from 'components/Icon';

export function DashboardSettingsButton() {
	const { formatMessage, labels } = useMessages();

	const handleToggleCharts = () => {
		saveDashboard(state => ({ showCharts: !state.showCharts }));
	};

	const handleEdit = () => {
		saveDashboard({ editing: true });
	};

	return (
		<Flexbox gap={10}>
			<TooltipPopup label={formatMessage(labels.toggleCharts)} position="bottom">
				<Button onClick={handleToggleCharts}>
					<Icon>
						<BarChart2 />
					</Icon>
				</Button>
			</TooltipPopup>
			<Button onClick={handleEdit}>
				<Icon>
					<Edit />
				</Icon>
				<Text>{formatMessage(labels.edit)}</Text>
			</Button>
		</Flexbox>
	);
}

export default DashboardSettingsButton;
