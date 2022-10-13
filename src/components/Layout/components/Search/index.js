import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import AccountItem from '../../../AccountItem/index';
import { Wrapper as PopperWrapper } from '../../../Popper/index';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import className from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '../../../Icons/index';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const refInp = useRef();

  const handleDelete = () => {
    setSearchValue('');
    refInp.current.focus();
    setSearchResult([]);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchValue]);

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      arrow={false}
      interactive={true}
      visible={showResult && searchResult.length > 0}
      render={(attrs) => {
        return (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => {
                return (
                  <Link to={`/@${result.nickname}`}>
                    <AccountItem
                      data={result}
                      key={result.id}
                      avarta={result.avatar}
                      name={result.full_name}
                      userName={result.nickname}
                    />
                  </Link>
                );
              })}
              {/* <AccountItem
                avarta={'https://c.tenor.com/EX3e82-9sHkAAAAd/cyberpunk-cyberpunk-anime.gif'}
                // avarta={'https://twinfinite.net/wp-content/uploads/2022/09/EdgerunnersLucy.jpg'}
                name={'Lucyna Kushinada'}
                userName={'Lucy'}
              /> */}
              {/* <AccountItem
                avarta={'https://www.kakuchopurei.com/wp-content/uploads/2022/09/cyberpunkedgerunners_featreview.jpg'}
                name={'David Martinez'}
                userName={'David'}
              />
              <AccountItem
                avarta={'https://c.tenor.com/_CRKecwFC4kAAAAC/cyberpunk-edgerunners-rebecca.gif'}
                name={'Rebeca'}
                userName={'Re'}
              />
              <AccountItem
                avarta={'https://c.tenor.com/6iA7otT2zz8AAAAd/komi-komi-shouko.gif'}
                name={'Komi Shoko'}
                userName={'Komi'}
              /> */}
            </PopperWrapper>
          </div>
        );
      }}
      onClickOutside={handleHideResult}
    >
      <div className={cx('searchBox')}>
        <input
          ref={refInp}
          value={searchValue.trim()}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search accounts and videos"
          className={cx('search')}
          spellCheck={false}
          onFocus={() => setShowResult(true)}
        />

        {!!searchValue.trim() && !loading && (
          <button
            className={cx('clear-btn')}
            onClick={() => {
              handleDelete();
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {loading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}
        <button className={cx('btn-Search')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
