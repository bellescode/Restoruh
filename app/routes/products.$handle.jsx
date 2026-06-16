/* ============================================================
   FILE: app/routes/products.$handle.jsx
   Individual product page with ingredients, dosing, FDA note
   ============================================================ */
import { useLoaderData, Link } from 'react-router';
import { Image, Money, CartForm } from '@shopify/hydrogen';

export async function loader({ params, context }) {
  const { storefront } = context;
  const { handle } = params;
  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle },
  });
  if (!product) throw new Response('Product not found', { status: 404 });

  // Get the first available variant
  const selectedVariant = product.variants?.nodes?.[0];
  return { product, selectedVariant };
}

export function meta({ data }) {
  return [
    { title: `${data?.product?.title ?? 'Product'}  --  RestoRuh` },
    { name: 'description', content: data?.product?.description ?? '' },
  ];
}

export default function ProductPage() {
  const { product, selectedVariant } = useLoaderData();
  const image = product.images?.nodes?.[0];
  const price = selectedVariant?.price;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div className="container" style={{ padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <p className="collection-breadcrumb" style={{ marginBottom: 32 }}>
          <Link to="/shop">Shop</Link> / {product.title}
        </p>

        <div style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>

          {/* Product image */}
          <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(61,107,80,.06)', aspectRatio: '1', display: 'grid', placeItems: 'center' }}>
            {image
              ? <Image data={image} aspectRatio="1/1" sizes="(min-width:768px) 50vw, 100vw"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              : <img src="/images/restoruh-logo.png" alt="RestoRuh"
                  style={{ width:120, height:120, objectFit:'contain', opacity:.2 }}/>
            }
          </div>

          {/* Product info */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:'var(--gold)', marginBottom:10, textTransform:'uppercase' }}>
              {product.productType || 'RestoRuh'}
            </p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,42px)', fontWeight:600, color:'var(--green)', marginBottom:16, lineHeight:1.1 }}>
              {product.title}
            </h1>

            {price && (
              <p style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:600, color:'var(--green)', marginBottom:24 }}>
                <Money data={price}/>
              </p>
            )}

            {product.description && (
              <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.7, marginBottom:32, maxWidth:480 }}>
                {product.description}
              </p>
            )}

            {/* Add to cart */}
            {selectedVariant && (
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{ lines: [{ merchandiseId: selectedVariant.id, quantity: 1 }] }}
              >
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px 32px', fontSize: 16 }}
                  disabled={!selectedVariant.availableForSale}
                >
                  {selectedVariant.availableForSale ? 'Pre-Order  --  Add to Cart' : 'Sold Out'}
                </button>
              </CartForm>
            )}

            {/* Subscription note */}
            <p style={{ fontSize:13, color:'var(--muted)', marginTop:12, textAlign:'center' }}>
              Subscribe and save options coming soon.
            </p>

            {/* FDA disclaimer */}
            <div style={{ marginTop:32, padding:'16px 20px', borderRadius:12, background:'rgba(61,107,80,.06)', border:'1px solid rgba(61,107,80,.15)' }}>
              <p style={{ fontSize:11, color:'var(--muted)', lineHeight:1.7 }}>
                These statements have not been evaluated by the Food and Drug Administration.
                This product is not intended to diagnose, treat, cure, or prevent any disease.
                Consult your healthcare provider before use, especially if pregnant, nursing,
                or giving to infants and children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id title description handle productType
      images(first: 3) { nodes { url altText width height } }
      variants(first: 10) {
        nodes {
          id availableForSale
          title
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
`;
