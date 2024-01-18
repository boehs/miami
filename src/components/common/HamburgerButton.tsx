import { Button } from 'react-basics';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { Menu, X } from 'lucide-react';
import Icon from 'components/Icon';

export function HamburgerButton({ menuItems }: { menuItems: any[] }) {
	const [active, setActive] = useState(false);

	const handleClick = () => setActive(state => !state);
	const handleClose = () => setActive(false);

	return (
		<>
			<Button variant="quiet" onClick={handleClick}>
				<Icon>{active ? <X /> : <Menu />}</Icon>
			</Button>
			{active && <MobileMenu items={menuItems} onClose={handleClose} />}
		</>
	);
}

export default HamburgerButton;
