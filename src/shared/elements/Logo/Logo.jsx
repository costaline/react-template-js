import classes from './logo.module.scss';
import { ReactComponent as LogoSvg } from './images/logo.svg';

export const Logo = () => (
  <LogoSvg alt="logo" className={classes['app-logo']} />
);
