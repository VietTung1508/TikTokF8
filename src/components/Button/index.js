import styles from './Button.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Button({
  children,
  primary = false,
  to,
  href,
  onClick,
  passProps,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  rightIcon,
  leftIcon,
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    delete props.onClick;
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
