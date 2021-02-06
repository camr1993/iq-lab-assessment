export const colors = [
  '#EA5A21',
  '#8BBA6A',
  '#3BB36C',
  '#77B7BC',
  '#54A1D1',
  '#9D6BC9',
  '#D64753',
  '#BD6C3E',
  '#E76D1C',
  '#EB8E33',
  '#D2D852',
  '#008688',
  '#84417A',
  '#B84977',
  '#DC807F',
  '#86424E',
  '#EDBA20',
  '#AF154A',
  '#EA5A21',
  '#8BBA6A',
  '#3BB36C',
  '#77B7BC',
  '#54A1D1',
  '#9D6BC9',
]

export interface Node {
  name: string
  location: string
  subordinates?: Node[]
}

export const tree = (): Node => ({
  name: 'CEO',
  location: 'San Francisco',
  subordinates: [
    {
      name: 'CTO',
      location: 'Portland',
      subordinates: [
        {
          name: 'Sr VP IT',
          location: 'Portland',
          subordinates: [
            { name: 'VP Code', location: 'Portland' },
            { name: 'VP Net', location: 'Portland' },
            { name: 'VP DevOps', location: 'Portland' },
            { name: 'VP Stuff', location: 'Salem' },
          ],
        },
        {
          name: 'Sr VP Env',
          location: 'Seattle',
          subordinates: [
            { name: 'VP Bits', location: 'Seattle' },
            { name: 'VP Bobs', location: 'Seattle' },
            { name: 'VP Stuff', location: 'Seattle' },
          ],
        },
      ],
    },
    {
      name: 'CHO',
      location: 'London',
      subordinates: [
        { name: 'Sr VP HR', location: 'London' },
        { name: 'Sr VP HQ', location: 'London' },
        {
          name: 'Sr VP HR',
          location: 'Geneva',
          subordinates: [
            { name: 'VP HS', location: 'Vienna' },
            { name: 'VP HN', location: 'Vienna' },
            { name: 'VP HZ', location: 'Vienna' },
          ],
        },
      ],
    },
    {
      name: 'CFO',
      location: 'Berlin',
      subordinates: [{ name: 'Sr VP $$', location: 'Berlin' }],
    },
  ],
})
