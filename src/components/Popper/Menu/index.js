import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Menu.module.scss';
import className from 'classnames/bind';
import { Wrapper as Wrapper } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faKeyboard } from '@fortawesome/free-regular-svg-icons';

const cx = className.bind(styles);

function Menu({ children, items = [] }) {
  const renderItem = () => {
    return items.map((item, i) => (
      <div key={i} className={cx(item.class)}>
        <FontAwesomeIcon className={cx('icon')} icon={item.icon} />
        <span>{item.title}</span>
      </div>
    ));
  };

  return (
    <Tippy
      arrtow={true}
      interactive={true}
      delay={[0, 1000]}
      duration={[]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
          <Wrapper>{renderItem()}</Wrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
