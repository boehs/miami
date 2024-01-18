import { useTransition, animated } from '@react-spring/web';
import { Button } from 'react-basics';
import styles from './ChartTypeButton.module.css';
import { BarChart, LineChart } from 'lucide-react';
import Icon from 'components/Icon';
import useChartType from 'components/hooks/useChartType';

export function ChartTypeButton() {
	const { chartType, setChartType } = useChartType();

	const transitions = useTransition(chartType, {
		initial: { opacity: 1 },
		from: {
			opacity: 0,
			transform: `translateY(20px) scale(0.5)`,
		},
		enter: { opacity: 1, transform: 'translateY(0px) scale(1.0)' },
		leave: {
			opacity: 0,
			transform: `translateY(-20px) scale(0.5)`,
		},
	});

	function handleClick() {
		setChartType(chartType === 'line' ? 'bar' : 'line');
	}

	return (
		<Button className={styles.button} onClick={handleClick}>
			{transitions((style, item) => (
				<animated.div key={item} style={style}>
					<Icon className={styles.icon}>{item === 'line' ? <BarChart /> : <LineChart />}</Icon>
				</animated.div>
			))}
		</Button>
	);
}

export default ChartTypeButton;
