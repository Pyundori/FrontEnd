import { useState } from 'react';
import { useSelector } from 'react-redux';
import Likes from './LikesScreen';

export default () => {
  const [results, setResults] = useState([]);
  const likeProducts = useSelector((state) => state.users.likeProducts);
  const getLikeProducts = () => {
    try {
      setResults(likeProducts);
    } catch (e) {
      console.warn(e);
    }
  };
  return <Likes likeProducts={likeProducts} getLikeProducts={getLikeProducts} />;
};
