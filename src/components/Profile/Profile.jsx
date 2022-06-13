import React from 'react';
import { Header } from '../Header';
import { OAuthContext } from '../../contexts/OAuthContext';
import s from './Profile.module.scss';
import { useParams } from 'react-router-dom';
import { Images } from '../Images/Images';
import { Tabs } from '../Tabs';

const Profile = (props) => {
  const [profile, setProfile] = React.useState(undefined);
  const [usersPhoto, setUsersPhoto] = React.useState(undefined);
  const [likesPhoto, setLikesPhoto] = React.useState(undefined);
  const [collectionPhoto, setCollectionPhoto] = React.useState(undefined);
  const searchParams = useParams();
  const { links, user, token } = props;

  const options = [
    {
      id: '1231323',
      title: (
        <>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            version='1.1'
            aria-hidden='false'
          >
            <path d='M26.7 4H5.3C4.5 4 4 4.5 4 5.3v21.3c0 .9.5 1.4 1.3 1.4h21.3c.8 0 1.3-.5 1.3-1.3V5.3c.1-.8-.4-1.3-1.2-1.3zm-20 20l4.7-6 3.3 4 4.7-6 6 8H6.7z'></path>
          </svg>
          <span>Photos</span>
        </>
      ),
      componentToRender: () => {
        return usersPhoto ? (
          <Images images={usersPhoto} />
        ) : (
          <h2>Images loading</h2>
        );
      },
    },
    {
      id: '1231323',
      title: (
        <>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            version='1.1'
            aria-hidden='false'
          >
            <path
              d='M28.6 16.6L16 29.3 3.5 16.6c-2.8-3-2.9-7.7 0-10.5s7.6-2.8
                10.4 0L16 8.3l2.1-2.2c2.9-2.8 7.6-2.8 10.4 0 2.9 3 2.9 7.6.1
                10.5z'
            ></path>
          </svg>
          <span>Likes</span>
        </>
      ),
      componentToRender: () => {
        return likesPhoto ? (
          <Images images={likesPhoto} />
        ) : (
          <h2>Images loading</h2>
        );
      },
    },
    {
      id: '12313232',
      title: (
        <>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            version='1.1'
            aria-hidden='false'
          >
            <path d='M1.85543 9.96868C6.21534 11.9994 10.6257 14.0483 15.0039 16.0607c.3098.1714.6581.2613 1.0122.2613.3541 0 .7024-.0899 1.0121-.2613 4.3599-1.9941 8.7565-4.0613 13.0797-6.07373.2473-.11892.5588-.18294.5588-.5031 0-.32015-.3115-.41162-.5588-.52139-4.3232-2.02154-8.7748-4.11625-13.1163-6.12864-.6093-.21642-1.2736-.22286-1.8869-.0183-4.3966 2.03069-8.88936 4.1254-13.26759 6.17438-.21067.10062-.50378.18295-.50378.47566s.29311.40248.5221.5031zm17.43517.65862V6.84032l7.41 2.10387-10.68 4.96691V9.58449l3.27 1.04281zM27.8501 20.8539c-.327-.158-.6856-.24-1.0488-.24-.3632 0-.7218.082-1.0488.24l-8.6832 4.0613c-.3326.1666-.6995.2534-1.0716.2534-.3721 0-.7391-.0868-1.0717-.2534l-8.71066-4.0247c-.33699-.1628-.70648-.2474-1.08082-.2474-.37434 0-.74383.0846-1.08082.2474-.71444.3476-1.4472.686-2.1708 1.0245-.23814.1189-.54957.1829-.54957.5031 0 .3201.31143.4116.54041.5213.22899.1098 12.78016 5.9501 13.09806 6.1012.3179.1511.6764.25 1.0259.2927.3788-.0358.7281-.1478 1.0625-.3293.3343-.1814 13.374-6.2655 13.4278-6.2932.0538-.0277.099-.0697.1305-.1213.0315-.0517.0482-.111.0482-.1714 0-.0605-.0167-.1198-.0482-.1715-.0315-.0516-.0767-.0936-.1305-.1213-.0538-.0277-2.3109-1.1135-2.6379-1.2714z'></path>
            <path d='M27.8501 14.46c-.327-.158-.6856-.24-1.0488-.24-.3632 0-.7218.082-1.0488.24l-8.6832 4.0613c-.3326.1666-.6995.2533-1.0716.2533-.3721 0-.7391-.0867-1.0717-.2533l-8.71066-4.0247c-.33699-.1628-.70648-.2474-1.08082-.2474-.37434 0-.74383.0846-1.08082.2474-.71444.3476-1.4472.686-2.1708 1.0244-.23815.119-.54957.183-.54957.5031 0 .3202.31142.4117.54041.5214.22899.1098 12.78016 5.9501 13.09806 6.1012.3179.1511.6764.25 1.0259.2927.3788-.0358.7281-.1478 1.0625-.3293.3343-.1814 13.374-6.2655 13.4278-6.2932.0538-.0277.099-.0697.1305-.1213.0315-.0517.0482-.111.0482-.1715 0-.0604-.0167-.1197-.0482-.1714-.0315-.0516-.0767-.0936-.1305-.1213-.0538-.0277-2.3109-1.1135-2.6379-1.2714z'></path>
          </svg>
          <span>Collections</span>
        </>
      ),
      componentToRender: () => {
        collectionPhoto ? (
          <Images images={collectionPhoto} />
        ) : (
          <h2>Images loading</h2>
        );
      },
    },
  ];

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

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const getUsersPhoto = () => {
      fetch(`https://api.unsplash.com/users/${searchParams.username}/photos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((getUsersPhoto) => {
          console.log(getUsersPhoto);
          return getUsersPhoto.json();
        })
        .then((usersPhoto) => {
          console.log(usersPhoto);
          setUsersPhoto(usersPhoto);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUsersPhoto();
  }, []);

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const getLikesPhoto = () => {
      fetch(`https://api.unsplash.com/users/${searchParams.username}/likes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((getLikesPhoto) => {
          console.log(getLikesPhoto);
          return getLikesPhoto.json();
        })
        .then((likesPhoto) => {
          console.log(likesPhoto);
          setLikesPhoto(likesPhoto);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getLikesPhoto();
  }, []);

  React.useEffect(() => {
    if (!user) {
      return;
    }
    const getCollectionPhoto = () => {
      fetch(`https://api.unsplash.com/users/${searchParams.username}/photos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((setCollectionPhoto) => {
          console.log(setCollectionPhoto);
          return setCollectionPhoto.json();
        })
        .then((collectionPhoto) => {
          console.log('ТУТ ФОТО ПОРТФОЛИО', collectionPhoto);
          setCollectionPhoto(collectionPhoto);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCollectionPhoto();
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
        <div className={s.profile_header}>
          <div className={s.profile_header__photos}></div>
          <div className={s.profile_header__likes}></div>
          <div className={s.profile_header__collections}></div>
        </div>
        <div className={s.profile_main}>
          <Tabs options={options} />;
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
