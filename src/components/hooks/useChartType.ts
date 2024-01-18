import { setChartType } from 'store/app';
import useStore from 'store/app';

const selector = state => state.chartType;

export default function useChartType() {
	const chartType = useStore(selector);
	return {
		setChartType: setChartType,
		chartType,
	};
}
