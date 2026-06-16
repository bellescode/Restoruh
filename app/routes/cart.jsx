/* ============================================================
   FILE: app/routes/cart.jsx
   Shopify-connected cart page
   ============================================================ */
import { useLoaderData, Link } from 'react-router';
import { CartForm, Image, Money } from '@shopify/hydrogen';

export async function loader({ context }) {
  const cart = await context.cart.get();
  return { cart };
}

export async function action({ request, context }) {
  const { cart } = context;
  const formData  = await request.formData();
  const { action: cartAction, inputs } = CartForm.getFormInput(formData);

  let result;
  switch (cartAction) {
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    default:
      throw new Error(`Unhandled cart action: ${cartAction}`);
  }

  const headers = cart.setCartId(result?.cart?.id ?? '');
  return new Response(null, { status: 200, headers });
}

export const meta = () => [{ title: 'Your Cart  --  RestoRuh' }];

function CartLine({ line }) {
  const { merchandise, quantity, cost } = line;
  const image = merchandise?.image;

  return (
    <div style={{
      display: 'flex', gap: 20, alignItems: 'flex-start',
      padding: '24px 0', borderBottom: '1px solid rgba(61,107,80,.1)'
    }}>
      {/* Image */}
      <div style={{ width: 90, height: 90, borderRadius: 12, overflow: 'hidden', background: 'rgba(61,107,80,.06)', flexShrink: 0, display:'grid', placeItems:'center' }}>
        {image
          ? <Image data={image} width={90} height={90} style={{ objectFit:'cover' }}/>
          : <img src="/images/restoruh-logo.png" alt="" style={{ width:40, height:40, objectFit:'contain', opacity:.2 }}/>
        }
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, color:'var(--green)', marginBottom:4 }}>
          {merchandise?.product?.title}
        </p>
        {merchandise?.title !== 'Default Title' && (
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:8 }}>{merchandise.title}</p>
        )}
        <span className="badge-soon">Pre-Order</span>
      </div>

      {/* Price + qty + remove */}
      <div style={{ textAlign:'right', flexShrink:0 }}>
        {cost?.totalAmount && (
          <p style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:600, color:'var(--green)', marginBottom:8 }}>
            <Money data={cost.totalAmount}/>
          </p>
        )}

        {/* Update quantity */}
        <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', marginBottom:8 }}>
          <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate}
            inputs={{ lines:[{ id:line.id, quantity: Math.max(0, quantity-1) }] }}>
            <button style={{ width:28, height:28, borderRadius:'50%', background:'rgba(61,107,80,.1)', color:'var(--green)', fontWeight:700, border:'none', cursor:'pointer', fontSize:16 }}>−</button>
          </CartForm>
          <span style={{ fontWeight:600, color:'var(--ink)', minWidth:24, textAlign:'center' }}>{quantity}</span>
          <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate}
            inputs={{ lines:[{ id:line.id, quantity: quantity+1 }] }}>
            <button style={{ width:28, height:28, borderRadius:'50%', background:'rgba(61,107,80,.1)', color:'var(--green)', fontWeight:700, border:'none', cursor:'pointer', fontSize:16 }}>+</button>
          </CartForm>
        </div>

        {/* Remove */}
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove}
          inputs={{ lineIds:[line.id] }}>
          <button style={{ background:'none', border:'none', fontSize:12, color:'var(--muted)', cursor:'pointer', textDecoration:'underline' }}>
            Remove
          </button>
        </CartForm>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart } = useLoaderData();
  const lines     = cart?.lines?.nodes ?? [];
  const total     = cart?.cost?.totalAmount;
  const checkoutUrl = cart?.checkoutUrl;

  if (lines.length === 0) {
    return (
      <div style={{ background:'var(--cream)', minHeight:'70vh', display:'grid', placeItems:'center' }}>
        <div style={{ textAlign:'center', padding:40 }}>
          <img src="/images/restoruh-logo.png" alt="" style={{ width:64, height:64, objectFit:'contain', margin:'0 auto 24px', opacity:.2 }}/>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:28, color:'var(--green)', marginBottom:12 }}>Your cart is empty</h2>
          <p style={{ color:'var(--muted)', marginBottom:28 }}>Add some teas or blends to get started.</p>
          <Link to="/shop" className="btn-gold">Browse the Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'var(--cream)', minHeight:'70vh' }}>
      <div className="container" style={{ padding:'48px 24px 80px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,42px)', fontWeight:600, color:'var(--green)', marginBottom:8 }}>
          Your Cart
        </h1>
        <p style={{ color:'var(--muted)', marginBottom:40 }}>
          These are pre-order items. We will fulfill when products are ready.
        </p>

        <div style={{ display:'grid', gap:32, gridTemplateColumns:'1fr min(360px, 100%)' }}>
          {/* Line items */}
          <div>
            {lines.map(line => <CartLine key={line.id} line={line}/>)}
          </div>

          {/* Summary */}
          <div style={{ background:'var(--paper)', borderRadius:20, padding:28, border:'1.5px solid rgba(61,107,80,.12)', alignSelf:'start' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:600, color:'var(--green)', marginBottom:20 }}>
              Order Summary
            </h2>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <span style={{ color:'var(--muted)' }}>Subtotal</span>
              {total && <span style={{ fontWeight:700, color:'var(--green)' }}><Money data={total}/></span>}
            </div>
            <p style={{ fontSize:12, color:'var(--muted)', marginBottom:20, lineHeight:1.6 }}>
              Shipping calculated at checkout. Pre-orders ship when products are available.
            </p>
            <div className="leaf-rule" style={{ marginBottom:20 }}/>
            {checkoutUrl && (
              <a
                href={checkoutUrl}
                className="btn-gold"
                style={{ width:'100%', justifyContent:'center', padding:'16px', fontSize:16, display:'flex' }}
              >
                Proceed to Checkout
              </a>
            )}
            <Link to="/shop" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* FDA note */}
        <p style={{ fontSize:11, color:'var(--muted)', marginTop:40, lineHeight:1.7, maxWidth:600 }}>
          These statements have not been evaluated by the Food and Drug Administration.
          These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}
