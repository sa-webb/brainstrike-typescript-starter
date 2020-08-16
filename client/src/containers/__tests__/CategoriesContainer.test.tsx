import React from 'react';
import { renderApollo, cleanup, waitFor, getByTestId } from '../../test-utils';

// The component AND the query need to be exported
import {
  GetCategoriesDocument,
  CategoriesContainer,
} from '../CategoriesContainer';

// IMPORTANT: make sure your mocks match the query exactly or you'll get empty data in your implementations.
const mocks = [
  {
    request: {
      query: GetCategoriesDocument,
    },
    result: {
      data: {
        categories: [
          {
            __typename: 'Category',
            id: 'NjM5NTlhOTktYjU2Mi00OTkxLTkxMTAtY2M3MGQzN2E5YTk2OkNhdGVnb3J5',
            name: 'Automotive 81880',
            created: '2020-02-02T01:46:40.205Z',
            updated: '2020-02-02T01:46:40.205Z',
          },
          {
            __typename: 'Category',
            id: 'NDZiMDlkNjQtYzU3Yi00YWNjLWI0ZTctMWMyOTkyODIxZGUwOkNhdGVnb3J5',
            name: 'Automotive 86304',
            created: '2020-02-02T15:05:53.443Z',
            updated: '2020-02-02T15:05:53.443Z',
          },
          {
            __typename: 'Category',
            id: 'OTFiZTg1OTQtNmJjZi00Y2Y4LWEzMzEtYTg0NDUwNjdmNzFjOkNhdGVnb3J5',
            name: 'Automotive 8723',
            created: '2020-02-02T06:57:20.591Z',
            updated: '2020-02-02T06:57:20.591Z',
          },
          {
            __typename: 'Category',
            id: 'ODFhYzQ1ZTktYjFmZS00MWFkLWE2MGEtZjBlNjIxYTAwODMwOkNhdGVnb3J5',
            name: 'Automotive 89119',
            created: '2020-02-02T03:03:52.020Z',
            updated: '2020-02-02T03:03:52.020Z',
          },
          {
            __typename: 'Category',
            id: 'NzdiNTBlMGQtN2U0ZS00Y2IzLTk1MWQtMjA4MTJiOTFhMjNhOkNhdGVnb3J5',
            name: 'Automotive 90252',
            created: '2020-02-02T06:57:38.263Z',
            updated: '2020-02-02T06:57:38.263Z',
          },
        ],
      },
    },
  },
];

describe("Category Container", () => {

  afterEach(cleanup);

  it('renders without error', async () => {
    const { container } = renderApollo(
      <CategoriesContainer onSelectCategory={()=>{}} />,
      { mocks, addTypename: false },
    );
    
    await waitFor(() => expect(container.textContent).toBeTruthy());
  });

  it('should render loading state initially', async () => {
    const { container } = renderApollo(
      <CategoriesContainer onSelectCategory={()=>{}} />,
      { mocks, addTypename: false },
    );
    
    await waitFor(() => expect(container.textContent).toBe('Loading...'));
  });

  it('should render categories', async () => {
    const { container } = renderApollo(
      <CategoriesContainer onSelectCategory={()=>{}} />,
      { mocks, addTypename: false },
    );


    await waitFor(() => expect(container.getElementsByTagName('li')[0]['textContent']).toBe(
      'Automotive 81880',
    ));    
  });

});
