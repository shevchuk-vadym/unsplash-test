import React from 'react';
import { Header } from '../Header';
import { OAuthContext } from '../../contexts/OAuthContext';
import s from './Profile.module.scss';
import { useParams } from 'react-router-dom';

const Profile = (props) => {
  const [profile, setProfile] = React.useState(undefined);
  console.log('PROFILE HERE', profile);
  console.log('PROPS', props);
  const searchParams = useParams();
  console.log('>.>>>>>>>>', searchParams);
  const { links, user, token } = props;
  console.log('USER FROM PROFILE', user);
  React.useEffect(() => {
    if (!user) {
      return;
    }

    const t = () => {
      fetch(`https://api.unsplash.com/users/${searchParams.username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((t) => {
          console.log(t);
          return t.json();
        })
        .then((profile) => {
          console.log(user);
          setProfile(profile);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    t();
  }, []);
  return (
    <div>
      <Header links={links} user={user} />
      <div className={s.profile}>
        <div className={s.profile_wrapper}>
          <div className={s.profile_image}>
            <img src={profile ? profile.profile_image.large : null} alt='' />
          </div>
          <div className={s.profile_info}>
            <div className={s.profile_info__name}>
              <h1>{`${profile ? profile.name : null}`}</h1>
            </div>

            <div className={s.profile_info__description}>
              <h3>{`${profile ? profile.bio : null}`}</h3>
            </div>
            <div className={s.profile_info__hire}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithToken = () => {
  return (
    <OAuthContext.Consumer>
      {(value) => (
        <Profile
          links={value.renderLinks}
          user={value.user}
          token={value.token}
        />
      )}
    </OAuthContext.Consumer>
  );
};

export { WithToken as Profile };
