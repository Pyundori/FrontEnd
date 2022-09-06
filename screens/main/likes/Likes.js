import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Likes from './LikesScreen';

export default ({ navigation, route }) => {
  const likeProducts = useSelector((state) => state.users.likeProducts);
  return <Likes results={likeProducts} navigation={navigation} route={route} />;
};
