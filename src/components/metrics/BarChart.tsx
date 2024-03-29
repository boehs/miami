import { useState, useRef, useEffect, useCallback } from 'react';
import { Loading } from 'react-basics';
import classNames from 'classnames';
import Chart from 'chart.js/auto';
import HoverTooltip from 'components/common/HoverTooltip';
import Legend from 'components/metrics/Legend';
import useLocale from 'components/hooks/useLocale';
import useTheme from 'components/hooks/useTheme';
import { DEFAULT_ANIMATION_DURATION } from 'lib/constants';
import { renderNumberLabels } from 'lib/charts';
import styles from './BarChart.module.css';
import useChartType from 'components/hooks/useChartType';
import ChartTypeButton from 'components/input/ChartTypeButton';
import { useWebsite } from 'components/hooks';

export interface BarChartProps {
	datasets?: any[];
	unit?: string;
	animationDuration?: number;
	stacked?: boolean;
	isLoading?: boolean;
	renderXLabel?: (label: string, index: number, values: any[]) => string;
	renderYLabel?: (label: string, index: number, values: any[]) => string;
	XAxisType?: string;
	YAxisType?: string;
	renderTooltipPopup?: (setTooltipPopup: (data: any) => void, model: any) => void;
	onCreate?: (chart: any) => void;
	onUpdate?: (chart: any) => void;
	className?: string;
	websiteId?: string;
}

export function BarChart({
	datasets = [],
	unit,
	animationDuration = DEFAULT_ANIMATION_DURATION,
	stacked = false,
	isLoading = false,
	renderXLabel,
	renderYLabel,
	XAxisType = 'time',
	YAxisType = 'linear',
	renderTooltipPopup,
	onCreate,
	onUpdate,
	className,
	websiteId = undefined,
}: BarChartProps) {
	const canvas = useRef();
	const chart = useRef(null);
	const [tooltip, setTooltipPopup] = useState(null);
	const { locale } = useLocale();
	const { theme, colors } = useTheme(websiteId);
	const { data } = useWebsite(websiteId);
	const { chartType } = useChartType();

	const getOptions = useCallback(() => {
		return {
			responsive: true,
			maintainAspectRatio: false,
			animation: {
				duration: animationDuration,
				resize: {
					duration: 0,
				},
				active: {
					duration: 0,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					enabled: false,
					external: renderTooltipPopup ? renderTooltipPopup.bind(null, setTooltipPopup) : undefined,
				},
			},
			scales: {
				x: {
					type: XAxisType,
					stacked: true,
					time: {
						unit,
					},
					grid: {
						display: false,
					},
					border: {
						color: colors.chart.line,
					},
					ticks: {
						color: colors.chart.text,
						autoSkip: false,
						maxRotation: 0,
						callback: renderXLabel,
					},
				},
				y: {
					type: YAxisType,
					min: 0,
					beginAtZero: true,
					stacked,
					grid: {
						color: colors.chart.line,
					},
					border: {
						color: colors.chart.line,
					},
					ticks: {
						color: colors.chart.text,
						callback: renderYLabel || renderNumberLabels,
					},
				},
			},
		};
	}, [
		animationDuration,
		renderTooltipPopup,
		renderXLabel,
		XAxisType,
		YAxisType,
		stacked,
		colors,
		unit,
		locale,
	]);

	const createChart = () => {
		Chart.defaults.font.family = 'Inter';

		const options = getOptions();
		if (chartType == 'line') {
			datasets = datasets.map(dataset => {
				dataset.borderWidth = 3;
				dataset.pointRadius = 0;
				dataset.hitRadius = 20;
				dataset.fill = !options.scales.y.stacked;
				dataset.lineTension = 0.3;
				dataset.pointHoverBackgroundColor =
					dataset.pointHoverBorderColor =
					dataset.hoverBackgroundColor =
					dataset.hoverBorderColor =
					dataset.pointBackgroundColor =
					dataset.pointBorderColor =
					dataset.borderColor =
						dataset.backgroundColor;
				return dataset;
			});
			options.scales.y.stacked = false;
		}

		chart.current = new Chart(canvas.current, {
			type: chartType,
			data: {
				datasets,
			},
			options: options,
		});

		onCreate?.(chart.current);
	};

	const updateChart = () => {
		setTooltipPopup(null);

		datasets.forEach((dataset, index) => {
			chart.current.data.datasets[index].data = dataset.data;
			chart.current.data.datasets[index].label = dataset.label;
		});

		chart.current.options = getOptions();

		onUpdate?.(chart.current);

		chart.current.update();
	};

	useEffect(() => {
		if (datasets) {
			if (chart.current) {
				updateChart();
			}
		}
	}, [datasets, unit, theme, animationDuration, locale]);

	useEffect(() => {
		if (datasets) {
			if (chart.current) {
				chart.current.destroy();
			}
			createChart();
		}
	}, [chartType, data]);

	return (
		<>
			<div className={classNames(styles.chart, className)}>
				<ChartTypeButton />
				{isLoading && <Loading position="page" icon="dots" />}
				<canvas ref={canvas} />
			</div>
			<Legend chart={chart.current} />
			{tooltip && (
				<HoverTooltip>
					<div className={styles.tooltip}>{tooltip}</div>
				</HoverTooltip>
			)}
		</>
	);
}

export default BarChart;
