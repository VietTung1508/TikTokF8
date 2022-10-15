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
import { useDebounce } from '../../../../hooks/index';
import axios from 'axios';
import * as searchServices from '../../../../apiServices/searchServices';

const cx = className.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchValue, 500);

  const refInp = useRef();

  const handleDelete = () => {
    setSearchValue('');
    refInp.current.focus();
    setSearchResult([]);
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };

    fetchApi();
  }, [debounced]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(' ')) {
      return;
    }
    setSearchValue(searchValue);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div>
      <HeadlessTippy
        arrow={false}
        interactive={true}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => {
          return (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((result, i) => {
                  return (
                    <Link to={`/@${result.nickname}`}>
                      <AccountItem
                        data={result}
                        key={i}
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
            value={searchValue}
            onChange={handleChange}
            placeholder="Search accounts and videos"
            className={cx('search')}
            spellCheck={false}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loading && (
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
          <button
            className={cx('btn-Search')}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
