import { Route, Routes } from 'react-router-dom';

import Auth from '@pages/Auth';
import PostCreate from '@pages/Post/Create';
import PostEdit from '@pages/Post/Edit';
import PostList from '@pages/Post/List';

import pages from '../constants/pages';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Auth />} path={pages.auth} />
      <Route element={<PostList />} path={pages.post.list} />
      <Route element={<PostCreate />} path={pages.post.create} />
      <Route element={<PostEdit />} path={'publicacoes/:id/editar'} />
    </Routes>
  );
};

export default MainRoutes;
