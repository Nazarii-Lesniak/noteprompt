import { useTranslations } from 'next-intl';
import { Button } from '../../../components/ui/Button';

export function GoogleAuthButton() {
	const t = useTranslations('signup.buttons');
	return (
		<Button
			type="button"
			variant="signupWithGoogle">
			{t('signUpWithGoogle')}
		</Button>
	);
}
