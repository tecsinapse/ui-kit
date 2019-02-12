import Link from '@material-ui/core/Link';

export const demoItems = [
  {
    title: 'Portal',
    children: [
      { title: 'a', children: [{ title: 'b' }, { title: 'c' }] },
      {
        title: 'd',
        children: [
          {
            title: 'e',
            children: [
              { title: 'f', component: Link, componentProps: { to: '/test' } },
            ],
          },
          { title: 'h' },
        ],
      },
    ],
  },
  {
    title: 'CRM',
    children: [
      { title: 'Dados de Integração DMS' },
      { title: 'g', selected: true },
      { title: 'h' },
      { title: 'j' },
      { title: 'l' },
      { title: 'm' },
    ],
  },
];
