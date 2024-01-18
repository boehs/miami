import { CSSProperties, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Icon.module.css';

export type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
	size?: number | IconSizes;
	variant?: 'input' | 'none';
	rotate?: number;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	onClick?: (e: MouseEvent) => void;
	children?: ReactNode;
}

export function Icon(props: IconProps) {
	const {
		size = 'md',
		variant = 'none',
		rotate,
		disabled,
		className,
		style,
		onClick,
		children,
		...domProps
	} = props;

	return (
		<div
			{...domProps}
			className={classNames(styles.icon, className, styles[`size-${size}`], styles[variant], {
				[styles.disabled]: disabled,
				[styles.clickable]: onClick && !disabled,
			})}
			onClick={onClick}
			style={{ ...style, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
		>
			{children}
		</div>
	);
}

export default Icon;
