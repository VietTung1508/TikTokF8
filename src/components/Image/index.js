import { forwardRef } from 'react';
import image from '../../assets/image/index';
import styles from './image.module.scss';
import classNames from 'classnames';

function Image(
  { ...props },
  ref,
  className,
  src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
) {
  return <img className={classNames(styles.wrapper, className)} src={src} ref={ref} {...props} />;
}

export default forwardRef(Image);
