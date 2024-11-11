import { Route, Routes } from 'react-router-dom';

import pages from '../constants/pages';
import PostList from '../pages/Post/index';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<PostList />} path={pages.post.list} />
    </Routes>
  );
};

export default MainRoutes;
