import classNames from 'classnames';
import { Button } from 'react-basics';
import useTheme from 'components/hooks/useTheme';
import styles from './ThemeSetting.module.css';
import { Moon, Sun } from 'lucide-react';
import Icon from 'components/Icon';

export function ThemeSetting() {
	const { theme, saveTheme } = useTheme();

	return (
		<div className={styles.buttons}>
			<Button
				className={classNames({ [styles.active]: theme === 'light' })}
				onClick={() => saveTheme('light')}
			>
				<Icon>
					<Sun />
				</Icon>
			</Button>
			<Button
				className={classNames({ [styles.active]: theme === 'dark' })}
				onClick={() => saveTheme('dark')}
			>
				<Icon>
					<Moon />
				</Icon>
			</Button>
		</div>
	);
}

export default ThemeSetting;
