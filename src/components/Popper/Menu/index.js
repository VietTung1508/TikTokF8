import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as Wrapper } from '../index';
import MenuItem from './MenuItems';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <Wrapper className={cx('menu-popper')}>{renderItems()}</Wrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
