import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import classNames from 'classnames';
import { colord } from 'colord';
import HoverTooltip from 'components/common/HoverTooltip';
import { ISO_COUNTRIES, MAP_FILE } from 'lib/constants';
import useTheme from 'components/hooks/useTheme';
import useCountryNames from 'components/hooks/useCountryNames';
import useLocale from 'components/hooks/useLocale';
import useMessages from 'components/hooks/useMessages';
import { formatLongNumber } from 'lib/format';
import { percentFilter } from 'lib/filters';
import styles from './WorldMap.module.css';
import { useNavigation } from 'components/hooks/useNavigation';

export function WorldMap({
	data = [],
	className,
	websiteId,
}: {
	data?: any[];
	className?: string;
	websiteId?: string;
}) {
	const [tooltip, setTooltipPopup] = useState();
	const { theme, colors } = useTheme(websiteId);
	const { locale } = useLocale();
	const { formatMessage, labels } = useMessages();
	const { makeUrl, router, query } = useNavigation();
	const countryNames = useCountryNames(locale);
	const visitorsLabel = formatMessage(labels.visitors).toLocaleLowerCase(locale);
	const metrics = useMemo(() => (data ? percentFilter(data) : []), [data]);

	function getFillColor(code: string) {
		if (code === 'AQ') return;

		if (query.country !== undefined) {
			if (query.country == code)
				return colord(colors.map.baseColor)
					[theme === 'light' ? 'lighten' : 'darken'](0.4 * (1.0 / 100))
					.toHex();
			else return colors.map.fillColor;
		}

		const country = metrics?.find(({ x }) => x === code);

		if (!country) {
			return colors.map.fillColor;
		}

		return colord(colors.map.baseColor)
			[theme === 'light' ? 'lighten' : 'darken'](0.4 * (1.0 - country.z / 100))
			.toHex();
	}

	function getOpacity(code) {
		return code === 'AQ' ? 0 : 1;
	}

	function handleHover(code) {
		if (code === 'AQ') return;
		const country = metrics?.find(({ x }) => x === code);
		setTooltipPopup(
			`${countryNames[code]}: ${formatLongNumber(country?.y || 0)} ${visitorsLabel}` as any,
		);
	}

	return (
		<div
			className={classNames(styles.container, className)}
			data-tip=""
			data-for="world-map-tooltip"
		>
			<ComposableMap projection="geoMercator">
				<ZoomableGroup zoom={0.8} minZoom={0.7} center={[0, 40]}>
					<Geographies geography={`${process.env.basePath}${MAP_FILE}`}>
						{({ geographies }) => {
							return geographies.map(geo => {
								const code = ISO_COUNTRIES[geo.id];

								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill={getFillColor(code)}
										stroke={colors.map.strokeColor}
										opacity={getOpacity(code)}
										style={{
											default: { outline: 'none' },
											hover: { outline: 'none', fill: colors.map.hoverColor },
											pressed: { outline: 'none' },
										}}
										onMouseOver={() => handleHover(code)}
										onMouseOut={() => setTooltipPopup(null)}
										onClick={() => {
											setTooltipPopup(null);
											router.push(makeUrl({ country: code }), { scroll: false });
										}}
									/>
								);
							});
						}}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			{tooltip && <HoverTooltip>{tooltip}</HoverTooltip>}
		</div>
	);
}

export default WorldMap;
