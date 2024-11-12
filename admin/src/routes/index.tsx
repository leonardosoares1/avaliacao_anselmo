import { Route, Routes } from 'react-router-dom';

import PostCreate from '@pages/Post/Create';
import PostList from '@pages/Post/List';

import pages from '../constants/pages';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<PostList />} path={pages.post.list} />
      <Route element={<PostCreate />} path={pages.post.create} />
    </Routes>
  );
};

export default MainRoutes;
