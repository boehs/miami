import { Button, PopupTrigger, Popup, Text } from 'react-basics';
import classNames from 'classnames';
import { languages } from 'lib/lang';
import useLocale from 'components/hooks/useLocale';
import styles from './LanguageButton.module.css';
import { Check, Globe } from 'lucide-react';
import Icon from 'components/Icon';

export function LanguageButton() {
	const { locale, saveLocale, dir } = useLocale();
	const items = Object.keys(languages).map(key => ({ ...languages[key], value: key }));

	function handleSelect(value: string, close: () => void, e: MouseEvent) {
		e.stopPropagation();
		saveLocale(value);
		close();
	}

	return (
		<PopupTrigger>
			<Button variant="quiet">
				<Icon>
					<Globe />
				</Icon>
			</Button>
			<Popup position="bottom" alignment={dir === 'rtl' ? 'start' : 'end'}>
				{(close: () => void) => {
					return (
						<div className={styles.menu}>
							{items.map(({ value, label }) => {
								return (
									<div
										key={value}
										className={classNames(styles.item, { [styles.selected]: value === locale })}
										onClick={(e: any) => handleSelect(value, close, e)}
									>
										<Text>{label}</Text>
										{value === locale && (
											<Icon className={styles.icon}>
												<Check />
											</Icon>
										)}
									</div>
								);
							})}
						</div>
					);
				}}
			</Popup>
		</PopupTrigger>
	);
}

export default LanguageButton;
