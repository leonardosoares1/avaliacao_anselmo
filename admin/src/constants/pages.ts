const pages = {
  auth: '/',
  post: {
    list: '/publicacoes',
    create: '/publicacoes/novo',
    edit: (id: number) => `/publicacoes/${id}/editar`,
  },
};

export default pages;
