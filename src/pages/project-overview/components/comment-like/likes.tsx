import { URL_FAVORIES_CREATE, URL_FAVORIES_UPDATE } from 'api/favorites/constants';
import { useManageFavorites } from 'api/favorites/use-manage-favorites';
import { RequestTypes } from 'api/types';
import { LikeButton } from 'components/button';
import { useState } from 'react';
import { LikesData } from './likes-data';

export const Likes = () => {
  const [userLikedProject, setUserLikedProject] = useState<boolean>();
  const { mutate } = useManageFavorites(
    userLikedProject ? URL_FAVORIES_UPDATE : URL_FAVORIES_CREATE,
    userLikedProject ? RequestTypes.Put : RequestTypes.Post
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <LikesData setUserLikedProject={setUserLikedProject} />

      {typeof userLikedProject === 'boolean' && (
        <LikeButton onClick={() => mutate()} text={userLikedProject ? 'UNLIKE' : 'LIKE'} />
      )}
    </div>
  );
};
