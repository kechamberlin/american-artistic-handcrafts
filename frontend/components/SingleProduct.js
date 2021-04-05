import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import AddToCart from './AddToCart';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/FormatMoney';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 3rem;
  @media (max-width: 900px) {
    display: block;
  }
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>American Artistic Handcrafts | {Product.name}</title>
      </Head>
      <img
        src={Product?.photo?.image?.publicUrlTransformed}
        alt={Product.name}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <h1>{formatMoney(Product.price)}</h1>
        <AddToCart id={Product.id} />
      </div>
    </ProductStyles>
  );
}
