import SearchInput from '../SearchInput';
import styles from './app.module.css'
import { useState, useEffect } from 'react'
import UserCard from '../UserCard';
import Pagination from '../Pagination'
import { PUBLIC_API, PAGE_CARDS_COUNT, DEFAULT_PAGE_NUMBER } from "../../constants";
import { User } from '../../models';
import { getTotalPageNumber } from './helpers/getTotalPageNumber';

const App = () => {
  const [users, setUsers] = useState<User[] | []>([])
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE_NUMBER)

  const togglePage = async (page: number) => {
    const response = await fetch(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}&page=${page}`)
    const result = await response.json()
    setUsers(result.items)
  }

  const getData = async () => {
    const response = await fetch(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}`)
    const result = await response.json()
    setTotalPages(getTotalPageNumber(result.total_count))
    setUsers(result.items)
  }

  const searchUser = async (text: string) => {
    const response = await fetch(`${PUBLIC_API}?q=${text}&per_page=${PAGE_CARDS_COUNT}`)
    const result = await response.json()
    setTotalPages(getTotalPageNumber(result.total_count))
    setUsers(result.items)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput onSearchClick={searchUser}/>
        <ul className={styles.results__list}>
          {users?.map(user => (
            <li key={user.id} className={styles.list__item} onClick={() => togglePage(3)}>
              <UserCard
                login={user.login}
                id={user.id}
                avatar={user.avatar_url}
              />
            </li>
          ))}
        </ul>
        <Pagination pageCount={totalPages} onPageToggle={togglePage } />
      </div>
    </div>
  );
}

export default App;
