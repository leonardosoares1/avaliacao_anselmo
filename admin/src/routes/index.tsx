import { Route, Routes } from 'react-router-dom';

import PostList from '@pages/Post/List';

import pages from '../constants/pages';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<PostList />} path={pages.post.list} />
    </Routes>
  );
};

export default MainRoutes;
