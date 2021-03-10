import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  return (
    <PaginationStyles>
      <Head>
        <title>American Artistic Handrcrafts - Page {page} of ___</title>
      </Head>
      <Link href="/">← Prev</Link>
      <p>Page ___ of ___</p>
      <p>{count} Items Total</p>
      <Link href="/">Next →</Link>
    </PaginationStyles>
  );
}
