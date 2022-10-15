import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as Wrapper } from '../index';
import MenuItem from './MenuItems';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, hideOnClick = false, items = [], onChange = defaultFn, ...passProps }) {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      interactive
      hideOnClick={hideOnClick}
      delay={[0, 700]}
      offset={[15, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <Wrapper className={cx('menu-popper')}>
            {history.length >= 2 ? (
              <Header title="Languages" onBack={() => setHistory((prev) => prev.slice(0, prev.length - 1))} />
            ) : null}
            <div className={cx('menu-body')}>{renderItems()}</div>
          </Wrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
