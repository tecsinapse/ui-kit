import Link from '@material-ui/core/Link';

export const demoItems = [
  {
    title: 'Portal',
    children: [
      { title: '2', children: [{ title: '2' }, { title: '3' }] },
      {
        title: '3',
        children: [
          {
            title: '2',
            children: [
              { title: '2', component: Link, componentProps: { to: '/test' } },
              { title: '3', selected: true },
            ],
          },
          { title: '3' },
        ],
      },
    ],
  },
  {
    title: 'CRM',
    children: [
      { title: '2', children: [{ title: '2' }, { title: '3' }] },
      { title: 'Não sei direito o que é' },
    ],
  },
];
