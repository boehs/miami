'use client';
import { Loading } from 'react-basics';
import { useLogin, useConfig } from 'components/hooks';
import UpdateNotice from './UpdateNotice';

export function App({ children }) {
	const { user, isLoading, error } = useLogin();
	const config = useConfig();

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		window.location.href = `${process.env.basePath || ''}/login`;
	}

	if (!user || !config) {
		return null;
	}

	return (
		<>
			{children}
			<UpdateNotice user={user} config={config} />
		</>
	);
}

export default App;
