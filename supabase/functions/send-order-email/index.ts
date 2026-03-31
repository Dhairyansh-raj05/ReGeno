import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const year = new Date().getFullYear();

function orderEmail(name: string, orderId: string, items: any[], total: number, address: string, customerEmail: string) {
  const rows = items.map((i: any) => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px">
      <span style="color:#aaa">${i.name} ×${i.quantity}</span>
      <span style="color:#fff;font-weight:600">${fmt(i.price * i.quantity)}</span>
    </div>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    body{font-family:Arial,sans-serif;background:#0D0D0D;color:#fff;margin:0;padding:0}
    .wrap{max-width:580px;margin:40px auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)}
    .hdr{background:linear-gradient(135deg,rgba(176,0,255,0.2),#0D0D0D);padding:32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1)}
    .logo{font-size:28px;font-weight:900;letter-spacing:-1px}.logo span{color:#B000FF}
    .body{padding:32px}
    .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);border-radius:20px;padding:6px 16px;font-size:13px;font-weight:700;margin:16px 0}
    .oid{display:inline-block;background:rgba(176,0,255,0.15);color:#B000FF;border:1px solid rgba(176,0,255,0.3);border-radius:8px;padding:8px 16px;font-size:14px;font-weight:900;letter-spacing:2px;margin:8px 0}
    .total{display:flex;justify-content:space-between;padding:14px 0;font-size:16px;font-weight:900;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px}
    .addr{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;font-size:13px;color:#aaa;line-height:1.6;margin-top:16px}
    .ftr{padding:24px;text-align:center;font-size:12px;color:#555;border-top:1px solid rgba(255,255,255,0.05)}
  </style></head><body>
  <div class="wrap">
    <div class="hdr">
      <div class="logo">Re<span>Geno</span></div>
      <p style="color:#888;margin:8px 0 0;font-size:13px">Order Confirmation</p>
    </div>
    <div class="body">
      <div class="badge">✓ Order Confirmed</div>
      <p style="font-size:16px;margin:8px 0 4px">Hey <strong>${name}</strong>, your order is locked in!</p>
      <p style="color:#888;font-size:13px;margin:0 0 16px">Order ID:</p>
      <div class="oid">${orderId}</div>
      <p style="color:#888;font-size:13px;margin:20px 0 8px">Items Ordered:</p>
      ${rows}
      <div class="total"><span>Total Paid</span><span style="color:#B000FF">${fmt(total)}</span></div>
      <div class="addr"><strong style="color:#fff;display:block;margin-bottom:6px">Delivery Address</strong>${address}</div>
      <p style="color:#888;font-size:13px;line-height:1.6;margin-top:20px">Expected delivery: <strong style="color:#fff">3–7 business days</strong> across India. Our team will contact you at <strong style="color:#fff">${customerEmail}</strong> with tracking details.</p>
    </div>
    <div class="ftr">&copy; ${year} ReGeno India. All rights reserved.</div>
  </div></body></html>`;
}

function sellEmail(name: string, customerEmail: string, brand: string, model: string, condition: string, price: number) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
    body{font-family:Arial,sans-serif;background:#0D0D0D;color:#fff;margin:0;padding:0}
    .wrap{max-width:560px;margin:40px auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)}
    .hdr{background:linear-gradient(135deg,rgba(176,0,255,0.15),#0D0D0D);padding:32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1)}
    .logo{font-size:28px;font-weight:900;letter-spacing:-1px}.logo span{color:#B000FF}
    .body{padding:32px}
    .qbox{background:linear-gradient(135deg,rgba(176,0,255,0.15),rgba(26,0,51,0.8));border:1px solid rgba(176,0,255,0.3);border-radius:12px;padding:24px;text-align:center;margin:24px 0}
    .price{font-size:42px;font-weight:900;color:#fff}
    .lbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}
    .row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px}
    .dl{color:#888}.dv{color:#fff;font-weight:600}
    .badge{display:inline-block;background:rgba(176,0,255,0.15);color:#B000FF;border:1px solid rgba(176,0,255,0.3);border-radius:20px;padding:4px 12px;font-size:12px;font-weight:700;margin-top:12px}
    .ftr{padding:24px;text-align:center;font-size:12px;color:#555;border-top:1px solid rgba(255,255,255,0.05)}
  </style></head><body>
  <div class="wrap">
    <div class="hdr"><div class="logo">Re<span>Geno</span></div><p style="color:#888;margin:8px 0 0;font-size:13px">New Sell Request</p></div>
    <div class="body">
      <p style="font-size:16px;margin-bottom:4px">New sell request received!</p>
      <p style="color:#888;font-size:14px;margin-top:4px">A customer has accepted a quote on ReGeno:</p>
      <div class="qbox">
        <div class="lbl">Quoted Payout</div>
        <div class="price">${fmt(price)}</div>
        <div class="badge">Pending Verification</div>
      </div>
      <div style="margin:24px 0">
        <div class="row"><span class="dl">Customer</span><span class="dv">${name}</span></div>
        <div class="row"><span class="dl">Email</span><span class="dv" style="color:#B000FF">${customerEmail}</span></div>
        <div class="row"><span class="dl">Device</span><span class="dv">${brand} ${model}</span></div>
        <div class="row" style="border:none"><span class="dl">Condition</span><span class="dv">${condition}</span></div>
      </div>
      <p style="color:#888;font-size:13px">Reply to <strong style="color:#fff">${customerEmail}</strong> to schedule pickup.</p>
    </div>
    <div class="ftr">&copy; ${year} ReGeno India. All rights reserved.</div>
  </div></body></html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY not set");

    let html = "";
    let subject = "";

    if (body.type === "order") {
      html = orderEmail(body.name, body.orderId, body.items, body.total, body.address, body.to);
      subject = `Order Confirmed: ${body.orderId} — ReGeno`;
    } else {
      html = sellEmail(body.name, body.to, body.brand, body.model, body.condition, body.price);
      subject = `New Sell Request: ${body.name} — ${body.brand} ${body.model}`;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "ReGeno <onboarding@resend.dev>",
        to: ["mailtodrk05@gmail.com"],
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) console.error("Resend error:", JSON.stringify(data));

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
