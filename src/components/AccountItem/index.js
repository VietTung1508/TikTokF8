import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avarta')}
        src="https://twinfinite.net/wp-content/uploads/2022/09/EdgerunnersLucy.jpg"
        alt="lucy"
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>Lucyna Kushinada</span>
          <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>Lucy</span>
      </div>
    </div>
  );
}

export default AccountItem;
