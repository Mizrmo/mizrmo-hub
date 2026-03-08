import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const emailStyles = {
  wrapper: {
    fontFamily: "'Inter', Arial, sans-serif",
    maxWidth: 560,
    margin: "0 auto",
    background: "white",
    borderRadius: 16,
    overflow: "hidden" as const,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: {
    background: "hsl(210, 100%, 35%)",
    padding: "32px 40px",
    textAlign: "center" as const,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.5px",
  },
  body: {
    padding: "36px 40px 40px",
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    color: "hsl(215, 25%, 15%)",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: 14,
    color: "hsl(215, 10%, 50%)",
    margin: "0 0 24px",
    lineHeight: 1.6,
  },
  infoBox: {
    background: "hsl(210, 20%, 98%)",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 24,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: 13,
    color: "hsl(215, 25%, 15%)",
  },
  infoLabel: {
    color: "hsl(215, 10%, 50%)",
    fontWeight: 500,
  },
  infoValue: {
    fontWeight: 600,
  },
  button: {
    display: "inline-block",
    background: "hsl(210, 100%, 35%)",
    color: "white",
    padding: "14px 32px",
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "center" as const,
    width: "100%",
  },
  divider: {
    height: 1,
    background: "hsl(214, 20%, 90%)",
    margin: "24px 0",
    border: "none",
  },
  footer: {
    textAlign: "center" as const,
    padding: "0 40px 32px",
    fontSize: 11,
    color: "hsl(215, 10%, 50%)",
    lineHeight: 1.7,
  },
  starRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    margin: "16px 0",
  },
  star: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2px solid hsl(45, 100%, 55%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    cursor: "pointer",
    background: "transparent",
    color: "hsl(45, 100%, 55%)",
  },
  starFilled: {
    background: "hsl(45, 100%, 55%)",
    color: "white",
  },
  badge: {
    display: "inline-block",
    background: "hsl(142, 71%, 45%)",
    color: "white",
    padding: "4px 14px",
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 16,
  },
  promoCode: {
    background: "hsl(210, 20%, 98%)",
    border: "2px dashed hsl(210, 100%, 35%)",
    borderRadius: 12,
    padding: "16px 24px",
    textAlign: "center" as const,
    marginBottom: 24,
  },
  promoText: {
    fontSize: 24,
    fontWeight: 800,
    color: "hsl(210, 100%, 35%)",
    letterSpacing: 3,
  },
};

const RideCompletedEmail = () => (
  <div style={emailStyles.wrapper}>
    <div style={emailStyles.header}>
      <p style={emailStyles.logo}>Mizrmo</p>
    </div>
    <div style={emailStyles.body}>
      <h1 style={emailStyles.h1}>Ride Completed! 🎉</h1>
      <p style={emailStyles.subtitle}>
        Thanks for riding with Mizrmo, Daniel! Here's a summary of your trip.
      </p>
      <div style={emailStyles.infoBox}>
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Pickup</span>
          <span style={emailStyles.infoValue}>Tema Station</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Drop-off</span>
          <span style={emailStyles.infoValue}>Kumasi Adum</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Driver</span>
          <span style={emailStyles.infoValue}>Kwame Mensah</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Distance</span>
          <span style={emailStyles.infoValue}>245 km</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Duration</span>
          <span style={emailStyles.infoValue}>3h 20m</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Fare</span>
          <span style={{ ...emailStyles.infoValue, fontSize: 16, color: "hsl(210, 100%, 35%)" }}>Gh₵125.00</span>
        </div>
      </div>
      <button style={emailStyles.button}>View Trip Details</button>
    </div>
    <div style={emailStyles.footer}>
      <p>You earned <strong>12 Miz Miles</strong> on this ride!</p>
      <p>© 2026 Mizrmo. All rights reserved.</p>
    </div>
  </div>
);

const WelcomeEmail = () => (
  <div style={emailStyles.wrapper}>
    <div style={{ ...emailStyles.header, padding: "40px 40px 32px" }}>
      <p style={emailStyles.logo}>Mizrmo</p>
      <p style={{ color: "white", fontSize: 13, opacity: 0.85, marginTop: 8 }}>Your journey starts here</p>
    </div>
    <div style={emailStyles.body}>
      <h1 style={emailStyles.h1}>Welcome aboard, Daniel! 👋</h1>
      <p style={emailStyles.subtitle}>
        We're excited to have you join Mizrmo — the smartest way to travel across Ghana. Here's what you can do next:
      </p>
      <div style={emailStyles.infoBox}>
        <div style={{ padding: "8px 0", fontSize: 13, color: "hsl(215, 25%, 15%)" }}>
          <strong>🚗 Book your first ride</strong>
          <p style={{ margin: "4px 0 0", color: "hsl(215, 10%, 50%)", fontSize: 12 }}>Enter your destination and get matched instantly</p>
        </div>
        <hr style={emailStyles.divider} />
        <div style={{ padding: "8px 0", fontSize: 13, color: "hsl(215, 25%, 15%)" }}>
          <strong>💰 Set up your wallet</strong>
          <p style={{ margin: "4px 0 0", color: "hsl(215, 10%, 50%)", fontSize: 12 }}>Add a payment method for seamless transactions</p>
        </div>
        <hr style={emailStyles.divider} />
        <div style={{ padding: "8px 0", fontSize: 13, color: "hsl(215, 25%, 15%)" }}>
          <strong>⭐ Earn Miz Miles</strong>
          <p style={{ margin: "4px 0 0", color: "hsl(215, 10%, 50%)", fontSize: 12 }}>Get rewarded for every ride you take</p>
        </div>
      </div>
      <button style={emailStyles.button}>Start Riding</button>
    </div>
    <div style={emailStyles.footer}>
      <p>Need help? Reply to this email or contact support@mizrmo.com</p>
      <p>© 2026 Mizrmo. All rights reserved.</p>
    </div>
  </div>
);

const PaymentReceiptEmail = () => (
  <div style={emailStyles.wrapper}>
    <div style={emailStyles.header}>
      <p style={emailStyles.logo}>Mizrmo</p>
    </div>
    <div style={emailStyles.body}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={emailStyles.badge}>Payment Successful</span>
      </div>
      <h1 style={{ ...emailStyles.h1, textAlign: "center" }}>Payment Receipt</h1>
      <p style={{ ...emailStyles.subtitle, textAlign: "center" }}>
        Your payment has been processed successfully.
      </p>
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <p style={{ fontSize: 36, fontWeight: 800, color: "hsl(210, 100%, 35%)", margin: 0 }}>Gh₵500.00</p>
        <p style={{ fontSize: 12, color: "hsl(215, 10%, 50%)", marginTop: 4 }}>Transaction ID: mzpymnt_120</p>
      </div>
      <div style={emailStyles.infoBox}>
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Date</span>
          <span style={emailStyles.infoValue}>Sep 30, 2030</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Type</span>
          <span style={emailStyles.infoValue}>Transport Payment</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Route</span>
          <span style={emailStyles.infoValue}>Tema → Kumasi</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Method</span>
          <span style={emailStyles.infoValue}>Mobile Money</span>
        </div>
      </div>
      <button style={emailStyles.button}>Download Receipt</button>
    </div>
    <div style={emailStyles.footer}>
      <p>This is an automated receipt. Keep it for your records.</p>
      <p>© 2026 Mizrmo. All rights reserved.</p>
    </div>
  </div>
);

const RateDriverEmail = () => (
  <div style={emailStyles.wrapper}>
    <div style={emailStyles.header}>
      <p style={emailStyles.logo}>Mizrmo</p>
    </div>
    <div style={emailStyles.body}>
      <h1 style={{ ...emailStyles.h1, textAlign: "center" }}>How was your ride? 🚘</h1>
      <p style={{ ...emailStyles.subtitle, textAlign: "center" }}>
        Help us improve by rating your experience with <strong>Kwame Mensah</strong>.
      </p>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "hsl(210, 100%, 35%)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 28, fontWeight: 700 }}>
          KM
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: "hsl(215, 25%, 15%)", marginTop: 12 }}>Kwame Mensah</p>
        <p style={{ fontSize: 12, color: "hsl(215, 10%, 50%)" }}>Tema → Kumasi • Sep 30</p>
      </div>
      <div style={emailStyles.starRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} style={{ ...emailStyles.star, ...(s <= 4 ? emailStyles.starFilled : {}) }}>
            ★
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "hsl(215, 10%, 50%)", marginBottom: 24 }}>Tap a star to rate</p>
      <div style={emailStyles.infoBox}>
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Pickup</span>
          <span style={emailStyles.infoValue}>Tema Station</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Drop-off</span>
          <span style={emailStyles.infoValue}>Kumasi Adum</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Fare Paid</span>
          <span style={emailStyles.infoValue}>Gh₵125.00</span>
        </div>
      </div>
      <button style={emailStyles.button}>Submit Rating</button>
    </div>
    <div style={emailStyles.footer}>
      <p>Your feedback helps drivers provide better service.</p>
      <p>© 2026 Mizrmo. All rights reserved.</p>
    </div>
  </div>
);

const PromoEmail = () => (
  <div style={emailStyles.wrapper}>
    <div style={{ ...emailStyles.header, background: "linear-gradient(135deg, hsl(210,100%,35%), hsl(210,100%,25%))", padding: "40px 40px" }}>
      <p style={emailStyles.logo}>Mizrmo</p>
      <p style={{ color: "hsl(45, 100%, 55%)", fontSize: 28, fontWeight: 800, marginTop: 16 }}>20% OFF</p>
      <p style={{ color: "white", fontSize: 14, opacity: 0.9, marginTop: 4 }}>Your next 3 rides!</p>
    </div>
    <div style={emailStyles.body}>
      <h1 style={emailStyles.h1}>Weekend Special, Daniel! 🎊</h1>
      <p style={emailStyles.subtitle}>
        Enjoy 20% off your next 3 rides this weekend. Use the promo code below at checkout.
      </p>
      <div style={emailStyles.promoCode}>
        <p style={{ fontSize: 11, color: "hsl(215, 10%, 50%)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Promo Code</p>
        <p style={emailStyles.promoText}>MIZ20WKND</p>
      </div>
      <div style={emailStyles.infoBox}>
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Discount</span>
          <span style={emailStyles.infoValue}>20% off fare</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Valid For</span>
          <span style={emailStyles.infoValue}>3 rides</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Expires</span>
          <span style={emailStyles.infoValue}>Oct 6, 2030</span>
        </div>
        <hr style={emailStyles.divider} />
        <div style={emailStyles.infoRow}>
          <span style={emailStyles.infoLabel}>Max Discount</span>
          <span style={emailStyles.infoValue}>Gh₵50 per ride</span>
        </div>
      </div>
      <button style={emailStyles.button}>Book a Ride Now</button>
    </div>
    <div style={emailStyles.footer}>
      <p>Terms apply. Cannot be combined with other offers.</p>
      <p>© 2026 Mizrmo. All rights reserved.</p>
    </div>
  </div>
);

const templates = [
  { key: "ride", label: "Ride Completed", component: <RideCompletedEmail /> },
  { key: "welcome", label: "Welcome", component: <WelcomeEmail /> },
  { key: "payment", label: "Payment Receipt", component: <PaymentReceiptEmail /> },
  { key: "rate", label: "Rate Driver", component: <RateDriverEmail /> },
  { key: "promo", label: "Promotion", component: <PromoEmail /> },
];

const EmailTemplatesPage = () => {
  const [active, setActive] = useState("ride");

  return (
    <div>
      <DashboardHeader title="Email Templates" subtitle="Dashboard > Email Templates" />
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="mb-6">
          {templates.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
          ))}
        </TabsList>
        {templates.map((t) => (
          <TabsContent key={t.key} value={t.key}>
            <div className="flex justify-center py-8 bg-muted rounded-xl">
              {t.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EmailTemplatesPage;
