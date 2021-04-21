import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/FormatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { useUser } from './User';

export default function Product({ product }) {
  const user = useUser();

  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <p>{product.description}</p>

      {/* Must be signed in to view Product price and Button List */}
      {user && (
        <>
          <PriceTag>{formatMoney(product.price)}</PriceTag>

          <div className="buttonList">
            <Link
              href={{
                pathname: '/update',
                query: {
                  id: product.id,
                },
              }}
            >
              <div className="editList">Edit</div>
            </Link>
            <AddToCart id={product.id} />
            <DeleteProduct id={product.id}>Delete</DeleteProduct>
          </div>
        </>
      )}
      {!user && (
        <PriceTag>
          <Link href="/signin">Sign in to view price</Link>
        </PriceTag>
      )}
    </ItemStyles>
  );
}
