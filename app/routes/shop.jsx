/* ============================================================
   FILE: app/routes/shop.jsx
   Creates the /shop page with Tea and Blend tabs
   ============================================================ */
import { useLoaderData, Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useState } from 'react';

export const meta = () => [
  { title: 'Shop  |  RestoRuh' },
  { name: 'description', content: 'Organic loose leaf teas and powdered herbal blends from RestoRuh.' },
];

export async function loader({ context }) {
  const { storefront } = context;
  const [teas, blends] = await Promise.all([
    storefront.query(COLLECTION_QUERY, { variables: { handle: 'teas',   first: 20 } }),
    storefront.query(COLLECTION_QUERY, { variables: { handle: 'blends', first: 20 } }),
  ]);
  return { teas, blends };
}

function ProductCard({ product }) {
  const image = product.images?.nodes?.[0];
  const price = product.priceRange?.minVariantPrice;
  return (
    <Link to={`/products/${product.handle}`} className="product-card card-lift">
      <div className="product-card-img">
        {image
          ? <Image data={image} aspectRatio="1/1" sizes="300px" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{ width:64, height:64, objectFit:'contain', opacity:.25 }}/>
        }
      </div>
      <div className="product-card-body">
        <p className="product-card-type">{product.productType || 'Herbal'}</p>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-footer">
          <span className="badge-soon">Pre-Order</span>
          {price && <span className="product-card-price"><Money data={price}/></span>}
        </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  const { teas, blends } = useLoaderData();
  const [tab, setTab] = useState('teas');

  const teaProducts   = teas?.collection?.products?.nodes   || [];
  const blendProducts = blends?.collection?.products?.nodes || [];
  const products      = tab === 'teas' ? teaProducts : blendProducts;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div className="container">
        <div className="collection-header">
          <p className="section-eyebrow">RESTORUH</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,56px)', fontWeight:300, color:'var(--green)', marginBottom:12 }}>
            The Shop
          </h1>
          <p style={{ fontSize:16, color:'var(--muted)', maxWidth:520, lineHeight:1.7 }}>
            Whole plant. Whole purpose. Every product built around a single goal.
          </p>
        </div>

        {/* Tabs */}
        <div className="shop-tabs">
          <button
            className={`shop-tab${tab === 'teas' ? ' active' : ''}`}
            onClick={() => setTab('teas')}
          >
            Loose Leaf Teas ({teaProducts.length})
          </button>
          <button
            className={`shop-tab${tab === 'blends' ? ' active' : ''}`}
            onClick={() => setTab('blends')}
          >
            Herbal Blends ({blendProducts.length})
          </button>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="product-grid" style={{ marginBottom: 80 }}>
            {products.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--muted)' }}>
            <img src="/images/restoruh-logo.png" alt="" style={{ width:60, height:60, objectFit:'contain', margin:'0 auto 20px', opacity:.2 }}/>
            <p>Products coming soon. <Link to="/" style={{ color:'var(--gold)' }}>Join the waitlist</Link>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query ShopCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id title description
      products(first: $first) {
        nodes {
          id handle title productType
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { nodes { url altText width height } }
        }
      }
    }
  }
`;
