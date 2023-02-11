import React from 'react';
import './index.scss';

import { Users } from './components/Users';
import { Success } from './components/Success';


function App() {

  const [users , setUsers] = React.useState([]);
  const [invites , setInvites] = React.useState([]);
  const [success , setSuccess] = React.useState(false);
  const [isLoading , setLoading] = React.useState(true);
  const [searchValue , setSearchValue] = React.useState('');


  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res=>res.json())
    .then(json=> {
      setUsers(json.data);
    })
    .catch ((err) => {
      console.warn(err);
      alert('Произошла ошибка при получении пользователя');
    })
    .finally (() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }


  const onClickSendInvites = () => {
    setSuccess(true);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id =>_id !== id ));
    } else {
      setInvites(prev => [...prev,id]);
    }
  };
  return (
    <div className="App">
      {
        success ? <Success count={invites.length} /> :
        <Users onChangeSearchValue={onChangeSearchValue} 
        searchValue={searchValue}
         items={users}
          isLoading={isLoading} 
          invites={invites} 
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites} 
          />
      }
    </div>
  );
}

export default App;
