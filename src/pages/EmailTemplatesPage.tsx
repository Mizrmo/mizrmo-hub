import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import emailCarRide from "@/assets/email-car-ride.png";
import emailWelcome from "@/assets/email-welcome.png";
import emailRating from "@/assets/email-rating.png";
import emailPayment from "@/assets/email-payment.png";
import emailPromo from "@/assets/email-promo.png";
import emailSafety from "@/assets/email-safety.png";
import emailBooking from "@/assets/email-booking.png";
import emailLoyalty from "@/assets/email-loyalty.png";

const templates = [
  { key: "ride", label: "Ride Complete" },
  { key: "welcome", label: "Welcome" },
  { key: "payment", label: "Payment" },
  { key: "rate", label: "Rate Driver" },
  { key: "promo", label: "Promo" },
  { key: "safety", label: "Safety" },
  { key: "booking", label: "Booking" },
  { key: "loyalty", label: "Loyalty" },
];

/* ── Shared inline styles ─────────────────────────────────── */
const S = {
  mail: { fontFamily: "'Inter', Arial, sans-serif", maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 20, overflow: "hidden" as const, boxShadow: "0 8px 40px rgba(0,56,179,0.10)" },
  heroImg: { width: "100%", height: 200, objectFit: "cover" as const },
  body: { padding: "28px 36px 36px" },
  h1: { fontSize: 21, fontWeight: 700, color: "#0e1b2e", margin: "0 0 6px" },
  sub: { fontSize: 13, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.65 },
  box: { background: "#f4f7fb", borderRadius: 14, padding: "18px 22px", marginBottom: 22 },
  row: { display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13 },
  lbl: { color: "#6b7280", fontWeight: 500 as const },
  val: { color: "#0e1b2e", fontWeight: 600 as const },
  hr: { height: 1, background: "#e5e7eb", margin: "0", border: "none" },
  btn: { display: "block", width: "100%", textAlign: "center" as const, background: "#0056b3", color: "#fff", padding: "14px 0", borderRadius: 50, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", textDecoration: "none" },
  btnOutline: { display: "block", width: "100%", textAlign: "center" as const, background: "transparent", color: "#0056b3", padding: "12px 0", borderRadius: 50, fontSize: 13, fontWeight: 600, border: "2px solid #0056b3", cursor: "pointer", marginTop: 10 },
  foot: { textAlign: "center" as const, padding: "0 36px 28px", fontSize: 11, color: "#9ca3af", lineHeight: 1.7 },
  badge: (bg: string) => ({ display: "inline-block", background: bg, color: "#fff", padding: "4px 16px", borderRadius: 50, fontSize: 11, fontWeight: 600, marginBottom: 14 }),
  accent: { color: "#0056b3", fontWeight: 700 as const },
  gold: { color: "#d4a017", fontWeight: 700 as const },
  hero: (bg: string) => ({ background: bg, padding: "28px 36px 0", textAlign: "center" as const }),
  starRow: { display: "flex", justifyContent: "center", gap: 6, margin: "14px 0" },
  star: (filled: boolean) => ({ width: 38, height: 38, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: "2px solid #d4a017", background: filled ? "#d4a017" : "transparent", color: filled ? "#fff" : "#d4a017", cursor: "pointer" }),
  promoCode: { background: "#f4f7fb", border: "2px dashed #0056b3", borderRadius: 14, padding: "14px 24px", textAlign: "center" as const, marginBottom: 22 },
  promoText: { fontSize: 26, fontWeight: 800, color: "#0056b3", letterSpacing: 4 },
  timeline: { position: "relative" as const, paddingLeft: 24, marginBottom: 22 },
  dot: (color: string) => ({ width: 10, height: 10, borderRadius: "50%", background: color, position: "absolute" as const, left: 0, top: 5 }),
  line: { position: "absolute" as const, left: 4, top: 18, width: 2, height: "calc(100% - 18px)", background: "#e5e7eb" },
};

const Logo = () => (
  <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: -0.5 }}>
    Mizrmo
  </p>
);

const Footer = ({ extra }: { extra?: string }) => (
  <div style={S.foot}>
    {extra && <p style={{ marginBottom: 4 }}>{extra}</p>}
    <p>© 2026 Mizrmo Technologies Ltd. All rights reserved.</p>
    <p style={{ fontSize: 10, marginTop: 4 }}>
      <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Unsubscribe</a>
      {" · "}
      <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Privacy Policy</a>
      {" · "}
      <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>Help Center</a>
    </p>
  </div>
);

const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <>
    <div style={S.row}>
      <span style={S.lbl}>{label}</span>
      <span style={{ ...S.val, ...(highlight ? { fontSize: 15, color: "#0056b3" } : {}) }}>{value}</span>
    </div>
    <hr style={S.hr} />
  </>
);

/* ── Templates ───────────────────────────────────────────── */

const RideCompletedEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("#0056b3"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailCarRide} alt="ride" style={{ width: "80%", marginTop: 16 }} />
    </div>
    <div style={S.body}>
      <span style={S.badge("#16a34a")}>Trip Complete</span>
      <h1 style={S.h1}>Your ride is done! 🎉</h1>
      <p style={S.sub}>Thanks for riding with Mizrmo, Daniel. Here's your trip summary.</p>
      <div style={S.box}>
        <InfoRow label="Pickup" value="Tema Station" />
        <InfoRow label="Drop-off" value="Kumasi Adum" />
        <InfoRow label="Driver" value="Kwame Mensah" />
        <InfoRow label="Distance" value="245 km" />
        <InfoRow label="Duration" value="3h 20m" />
        <InfoRow label="Fare" value="Gh₵125.00" highlight />
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", marginBottom: 18 }}>
        You earned <span style={S.gold}>12 Miz Miles</span> on this ride!
      </p>
      <button style={S.btn}>View Trip Details</button>
      <button style={S.btnOutline}>Report an Issue</button>
    </div>
    <Footer extra="Rate your driver to help the community!" />
  </div>
);

const WelcomeEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("linear-gradient(135deg, #0056b3, #003d80)"), paddingBottom: 0 }}>
      <Logo />
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: "4px 0 0" }}>Your journey starts here</p>
      <img src={emailWelcome} alt="welcome" style={{ width: "65%", marginTop: 14 }} />
    </div>
    <div style={S.body}>
      <h1 style={S.h1}>Welcome aboard, Daniel! 👋</h1>
      <p style={S.sub}>We're thrilled to have you on Mizrmo — Ghana's smartest way to travel. Here's how to get started:</p>
      <div style={S.box}>
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>🚗 Book your first ride</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>Enter a destination and match with a driver instantly</p>
        </div>
        <hr style={S.hr} />
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>💰 Set up your wallet</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>Add Mobile Money or card for seamless payments</p>
        </div>
        <hr style={S.hr} />
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>⭐ Earn Miz Miles</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>Every ride earns you loyalty points for discounts</p>
        </div>
      </div>
      <button style={S.btn}>Start Riding</button>
    </div>
    <Footer extra="Questions? Reply to this email anytime." />
  </div>
);

const PaymentReceiptEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("#0056b3"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailPayment} alt="payment" style={{ width: "60%", marginTop: 12 }} />
    </div>
    <div style={S.body}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={S.badge("#16a34a")}>Payment Successful</span>
        <p style={{ fontSize: 38, fontWeight: 800, color: "#0056b3", margin: "8px 0 2px" }}>Gh₵500.00</p>
        <p style={{ fontSize: 11, color: "#9ca3af" }}>Transaction ID: mzpymnt_120</p>
      </div>
      <div style={S.box}>
        <InfoRow label="Date" value="Sep 30, 2030" />
        <InfoRow label="Type" value="Transport Payment" />
        <InfoRow label="Route" value="Tema → Kumasi" />
        <InfoRow label="Method" value="MTN Mobile Money" />
        <InfoRow label="Driver" value="Kwame Mensah" />
      </div>
      <button style={S.btn}>Download Receipt</button>
      <button style={S.btnOutline}>View All Transactions</button>
    </div>
    <Footer extra="Keep this email as your payment record." />
  </div>
);

const RateDriverEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("#0056b3"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailRating} alt="rating" style={{ width: "45%", marginTop: 12 }} />
    </div>
    <div style={S.body}>
      <h1 style={{ ...S.h1, textAlign: "center" }}>How was your ride? 🚘</h1>
      <p style={{ ...S.sub, textAlign: "center" }}>Your feedback helps us keep Mizrmo safe & reliable.</p>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0056b3", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 700 }}>KM</div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#0e1b2e", marginTop: 10 }}>Kwame Mensah</p>
        <p style={{ fontSize: 12, color: "#6b7280" }}>Tema → Kumasi · Sep 30</p>
      </div>
      <div style={S.starRow}>
        {[1,2,3,4,5].map(s => (
          <div key={s} style={S.star(s <= 4)}>★</div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginBottom: 20 }}>Tap a star to rate your experience</p>
      <div style={S.box}>
        <InfoRow label="Pickup" value="Tema Station" />
        <InfoRow label="Drop-off" value="Kumasi Adum" />
        <InfoRow label="Fare Paid" value="Gh₵125.00" highlight />
      </div>
      <button style={S.btn}>Submit Rating</button>
    </div>
    <Footer extra="Your review is anonymous and helps drivers improve." />
  </div>
);

const PromoEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("linear-gradient(135deg, #0056b3, #003d80)"), paddingBottom: 0 }}>
      <Logo />
      <p style={{ color: "#d4a017", fontSize: 32, fontWeight: 800, margin: "14px 0 2px" }}>20% OFF</p>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginBottom: 0 }}>Your next 3 rides!</p>
      <img src={emailPromo} alt="promo" style={{ width: "75%", marginTop: 10 }} />
    </div>
    <div style={S.body}>
      <h1 style={S.h1}>Weekend Special, Daniel! 🎊</h1>
      <p style={S.sub}>Enjoy 20% off your next 3 rides this weekend. Use the code below at checkout.</p>
      <div style={S.promoCode}>
        <p style={{ fontSize: 10, color: "#9ca3af", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1.5 }}>Promo Code</p>
        <p style={S.promoText}>MIZ20WKND</p>
      </div>
      <div style={S.box}>
        <InfoRow label="Discount" value="20% off fare" />
        <InfoRow label="Valid For" value="3 rides" />
        <InfoRow label="Expires" value="Oct 6, 2030" />
        <InfoRow label="Max Savings" value="Gh₵50/ride" />
      </div>
      <button style={S.btn}>Book a Ride Now</button>
    </div>
    <Footer extra="Terms apply. Cannot be combined with other offers." />
  </div>
);

const SafetyEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("#0056b3"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailSafety} alt="safety" style={{ width: "65%", marginTop: 12 }} />
    </div>
    <div style={S.body}>
      <span style={S.badge("#0056b3")}>Safety Update</span>
      <h1 style={S.h1}>Your safety matters to us 🛡️</h1>
      <p style={S.sub}>We've added new safety features to make every Mizrmo ride even more secure. Here's what's new:</p>
      <div style={S.box}>
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>📍 Live Trip Sharing</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>Share your real-time location with trusted contacts during any ride</p>
        </div>
        <hr style={S.hr} />
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>🚨 Emergency SOS Button</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>One-tap emergency button that alerts authorities and your contacts</p>
        </div>
        <hr style={S.hr} />
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>✅ Verified Drivers</strong>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280" }}>All drivers now have enhanced background checks and ID verification</p>
        </div>
      </div>
      <button style={S.btn}>Explore Safety Features</button>
    </div>
    <Footer extra="Ride safe with Mizrmo." />
  </div>
);

const BookingConfirmEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("#0056b3"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailBooking} alt="booking" style={{ width: "55%", marginTop: 12 }} />
    </div>
    <div style={S.body}>
      <span style={S.badge("#0056b3")}>Ride Booked</span>
      <h1 style={S.h1}>Your ride is confirmed! 📍</h1>
      <p style={S.sub}>A driver is on the way. Here are your booking details:</p>

      {/* Timeline */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#16a34a", marginTop: 3, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>PICKUP</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0e1b2e", margin: "2px 0 0" }}>Tema Station</p>
          </div>
        </div>
        <div style={{ width: 2, height: 20, background: "#e5e7eb", marginLeft: 5, marginBottom: 4 }} />
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#dc2626", marginTop: 3, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>DROP-OFF</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0e1b2e", margin: "2px 0 0" }}>Kumasi Adum</p>
          </div>
        </div>
      </div>

      <div style={S.box}>
        <InfoRow label="Driver" value="Kwame Mensah" />
        <InfoRow label="Vehicle" value="Toyota Corolla · GR-1234" />
        <InfoRow label="ETA" value="5 mins" />
        <InfoRow label="Est. Fare" value="Gh₵120 – 130" highlight />
      </div>
      <button style={S.btn}>Track Your Ride</button>
      <button style={S.btnOutline}>Cancel Booking</button>
    </div>
    <Footer extra="Driver arriving soon. Be ready at pickup!" />
  </div>
);

const LoyaltyEmail = () => (
  <div style={S.mail}>
    <div style={{ ...S.hero("linear-gradient(135deg, #0056b3, #003d80)"), paddingBottom: 0 }}>
      <Logo />
      <img src={emailLoyalty} alt="loyalty" style={{ width: "65%", marginTop: 12 }} />
    </div>
    <div style={S.body}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={S.badge("#d4a017")}>Miz Miles</span>
        <h1 style={{ ...S.h1, textAlign: "center" }}>You're a Gold Rider! 🏆</h1>
        <p style={{ ...S.sub, textAlign: "center" }}>Congratulations Daniel! You've reached Gold status with 2,500 Miz Miles.</p>
      </div>

      {/* Points Display */}
      <div style={{ background: "linear-gradient(135deg, #0056b3, #003d80)", borderRadius: 16, padding: "24px", textAlign: "center", marginBottom: 22, color: "#fff" }}>
        <p style={{ fontSize: 11, opacity: 0.8, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1.5 }}>Your Balance</p>
        <p style={{ fontSize: 36, fontWeight: 800, margin: "0 0 4px" }}>2,500</p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>Miz Miles</p>
      </div>

      <div style={S.box}>
        <div style={{ padding: "10px 0" }}>
          <strong style={{ fontSize: 13, color: "#0e1b2e" }}>🎁 Gold Benefits Unlocked</strong>
        </div>
        <hr style={S.hr} />
        <div style={{ ...S.row }}><span style={S.lbl}>Priority Matching</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>✓ Active</span></div>
        <hr style={S.hr} />
        <div style={{ ...S.row }}><span style={S.lbl}>5% Fare Discount</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>✓ Active</span></div>
        <hr style={S.hr} />
        <div style={{ ...S.row }}><span style={S.lbl}>Free Cancellations</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>3/month</span></div>
        <hr style={S.hr} />
        <div style={{ ...S.row }}><span style={S.lbl}>Next Tier (Platinum)</span><span style={{ color: "#0056b3", fontWeight: 600, fontSize: 13 }}>1,500 miles away</span></div>
      </div>
      <button style={S.btn}>Redeem Miles</button>
    </div>
    <Footer extra="Keep riding to unlock Platinum!" />
  </div>
);

/* ── Main Page ───────────────────────────────────────────── */

const templateComponents: Record<string, JSX.Element> = {
  ride: <RideCompletedEmail />,
  welcome: <WelcomeEmail />,
  payment: <PaymentReceiptEmail />,
  rate: <RateDriverEmail />,
  promo: <PromoEmail />,
  safety: <SafetyEmail />,
  booking: <BookingConfirmEmail />,
  loyalty: <LoyaltyEmail />,
};

const EmailTemplatesPage = () => {
  const [active, setActive] = useState("ride");

  return (
    <div>
      <DashboardHeader title="Email Templates" subtitle="Dashboard > Email Templates" />

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {templates.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === t.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="bg-muted/50 rounded-2xl p-8 flex justify-center min-h-[600px]">
        <div className="w-full max-w-[560px]">
          {templateComponents[active]}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
