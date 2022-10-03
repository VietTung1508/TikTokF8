import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ avarta, name, userName }) {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('avarta')} src={avarta} alt="lucy" />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{name}</span>
          <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>{userName}</span>
      </div>
    </div>
  );
}

export default AccountItem;
