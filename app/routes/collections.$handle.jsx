/* ============================================================
   FILE: app/routes/collections.$handle.jsx
   Proper product grid  --  images contained, not full bleed
   ============================================================ */
import { useLoaderData, Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';

export async function loader({ params, context }) {
  const { storefront } = context;
  const { handle } = params;
  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle, first: 24 },
  });
  if (!collection) throw new Response('Collection not found', { status: 404 });
  return { collection };
}

export function meta({ data }) {
  return [
    { title: `${data?.collection?.title ?? 'Collection'}  --  RestoRuh` },
    { name: 'description', content: data?.collection?.description ?? '' },
  ];
}

function ProductCard({ product }) {
  const image = product.images?.nodes?.[0];
  const price = product.priceRange?.minVariantPrice;
  return (
    <Link to={`/products/${product.handle}`} className="product-card card-lift">
      {/* Image is CONTAINED inside the card, not full bleed */}
      <div className="product-card-img">
        {image
          ? <Image data={image} aspectRatio="1/1" sizes="(min-width:768px) 33vw, 50vw"
              style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : <img src="/images/restoruh-logo.png" alt="RestoRuh"
              style={{ width:64, height:64, objectFit:'contain', opacity:.2 }}/>
        }
      </div>
      <div className="product-card-body">
        <p className="product-card-type">{product.productType || 'Herbal'}</p>
        <h3 className="product-card-title">{product.title}</h3>
        {product.description && (
          <p className="product-card-desc">
            {product.description.slice(0, 90)}{product.description.length > 90 ? '…' : ''}
          </p>
        )}
        <div className="product-card-footer">
          <span className="badge-soon">Pre-Order</span>
          {price && <span className="product-card-price"><Money data={price}/></span>}
        </div>
      </div>
    </Link>
  );
}

export default function CollectionPage() {
  const { collection } = useLoaderData();
  const products = collection.products?.nodes || [];

  return (
    <div style={{ background:'var(--cream)', minHeight:'80vh' }}>
      <div className="container">

        {/* Breadcrumb */}
        <p className="collection-breadcrumb" style={{ paddingTop:32 }}>
          <Link to="/shop">Shop</Link> / {collection.title}
        </p>

        {/* Header */}
        <div className="collection-header">
          <h1>{collection.title}</h1>
          {collection.description && (
            <p>{collection.description}</p>
          )}
        </div>

        {/* Product grid  --  proper contained cards */}
        {products.length > 0 ? (
          <div className="product-grid" style={{ paddingBottom: 80 }}>
            {products.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <img src="/images/restoruh-logo.png" alt="" style={{ width:64, height:64, objectFit:'contain', margin:'0 auto 20px', opacity:.2 }}/>
            <p style={{ color:'var(--muted)' }}>Products coming soon.</p>
            <Link to="/shop" className="btn-green" style={{ marginTop:20, display:'inline-flex' }}>Back to shop</Link>
          </div>
        )}
      </div>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id title description handle
      products(first: $first) {
        nodes {
          id handle title productType description
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { nodes { url altText width height } }
        }
      }
    }
  }
`;
