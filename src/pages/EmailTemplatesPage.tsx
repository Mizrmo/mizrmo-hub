import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { useTheme } from "@/hooks/use-theme";
import emailCarRide from "@/assets/email-car-ride.png";
import emailWelcome from "@/assets/email-welcome.png";
import emailRating from "@/assets/email-rating.png";
import emailPayment from "@/assets/email-payment.png";
import emailPromo from "@/assets/email-promo.png";
import emailSafety from "@/assets/email-safety.png";
import emailBooking from "@/assets/email-booking.png";
import emailLoyalty from "@/assets/email-loyalty.png";
import logoBlue from "@/assets/mizrmo/mizrmo_logo_blue.png";
import logoWhite from "@/assets/mizrmo/mizrmo_logo_white.png";

const templates = [
  { key: "ride", label: "Ride Complete" },
  { key: "welcome", label: "Welcome" },
  { key: "payment", label: "Payment" },
  { key: "rate", label: "Rate Driver" },
  { key: "promo", label: "Promo" },
  { key: "safety", label: "Safety" },
  { key: "booking", label: "Booking" },
  { key: "loyalty", label: "Loyalty" },
  { key: "reset", label: "Password Reset" },
  { key: "verify", label: "Email Verification" },
  { key: "pwdchanged", label: "Password Changed" },
  { key: "locked", label: "Account Locked" },
];

/* ── Shared inline styles hook ──────────────────────────── */
const useEmailTheme = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const S = {
    mail: { fontFamily: "'Inter', Arial, sans-serif", maxWidth: 520, margin: "0 auto", background: isDark ? "#0f172a" : "#fff", borderRadius: 20, overflow: "hidden" as const, boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,56,179,0.10)" },
    heroImg: { width: "100%", height: 160, objectFit: "contain" as const },
    body: { padding: "24px 40px 40px" },
    h1: { fontSize: 24, fontWeight: 800, color: isDark ? "#f8fafc" : "#0f172a", margin: "0 0 8px", letterSpacing: -0.5 },
    sub: { fontSize: 14, color: isDark ? "#94a3b8" : "#475569", margin: "0 0 24px", lineHeight: 1.6 },
    box: { background: isDark ? "#1e293b" : "#f8fafc", border: isDark ? "1px solid #334155" : "1px solid #e2e8f0", borderRadius: 16, padding: "20px 24px", marginBottom: 24 },
    row: { display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 },
    lbl: { color: isDark ? "#94a3b8" : "#64748b", fontWeight: 500 as const },
    val: { color: isDark ? "#f8fafc" : "#0f172a", fontWeight: 600 as const },
    hr: { height: 1, background: isDark ? "#334155" : "#e2e8f0", margin: "0", border: "none" },
    btn: { display: "block", width: "100%", textAlign: "center" as const, background: "#0056b3", color: "#fff", padding: "16px 0", borderRadius: 50, fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", textDecoration: "none", transition: "all 0.2s ease" },
    btnOutline: { display: "block", width: "100%", textAlign: "center" as const, background: "transparent", color: isDark ? "#3b82f6" : "#0056b3", padding: "14px 0", borderRadius: 50, fontSize: 14, fontWeight: 600, border: isDark ? "2px solid #3b82f6" : "2px solid #0056b3", cursor: "pointer", marginTop: 12, transition: "all 0.2s ease" },
    foot: { textAlign: "center" as const, padding: "0 40px 32px", fontSize: 12, color: isDark ? "#64748b" : "#94a3b8", lineHeight: 1.7 },
    badge: (bg: string) => ({ display: "inline-block", background: `linear-gradient(135deg, ${bg}, ${bg} 60%, #d4a017)`, color: "#fff", padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5 }),
    accent: { color: isDark ? "#3b82f6" : "#0056b3", fontWeight: 700 as const },
    gold: { color: "#d4a017", fontWeight: 700 as const },
    hero: (bg: string) => ({ background: isDark ? (bg === "#fff" ? "#1e293b" : bg) : bg, padding: "40px 36px 0", textAlign: "center" as const, borderBottom: isDark ? "1px solid #334155" : (bg === "#fff" ? "1px solid #f1f5f9" : "none") }),
    starRow: { display: "flex", justifyContent: "center", gap: 6, margin: "14px 0" },
    star: (filled: boolean) => ({ width: 38, height: 38, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: "2px solid #d4a017", background: filled ? "#d4a017" : "transparent", color: filled ? "#fff" : "#d4a017", cursor: "pointer" }),
    promoCode: { background: isDark ? "#0f172a" : "#f8fafc", border: isDark ? "2px dashed #3b82f6" : "2px dashed #0056b3", borderRadius: 16, padding: "16px 24px", textAlign: "center" as const, marginBottom: 24 },
    promoText: { fontSize: 26, fontWeight: 800, color: isDark ? "#3b82f6" : "#0056b3", letterSpacing: 4 },
    timeline: { position: "relative" as const, paddingLeft: 24, marginBottom: 24 },
    dot: (color: string) => ({ width: 10, height: 10, borderRadius: "50%", background: color, position: "absolute" as const, left: 0, top: 5 }),
    line: { position: "absolute" as const, left: 4, top: 18, width: 2, height: "calc(100% - 18px)", background: isDark ? "#334155" : "#e2e8f0" },
  };

  return { S, isDark };
};

const Logo = ({ color }: { color?: "white" | "blue" }) => {
  const { isDark } = useEmailTheme();
  const actualColor = color || (isDark ? "white" : "blue");
  return (
    <img 
      src={actualColor === "white" ? logoWhite : logoBlue} 
      alt="Mizrmo" 
      style={{ height: 28, objectFit: "contain", margin: "0 auto" }} 
    />
  );
};

const Footer = ({ extra }: { extra?: string }) => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.foot}>
      {extra && <p style={{ marginBottom: 4 }}>{extra}</p>}
      <p>© 2026 Mizrmo Technologies Ltd. All rights reserved.</p>
      <p style={{ fontSize: 10, marginTop: 4 }}>
        <a href="#" style={{ color: isDark ? "#94a3b8" : "#6b7280", textDecoration: "underline" }}>Unsubscribe</a>
        {" · "}
        <a href="#" style={{ color: isDark ? "#94a3b8" : "#6b7280", textDecoration: "underline" }}>Privacy Policy</a>
        {" · "}
        <a href="#" style={{ color: isDark ? "#94a3b8" : "#6b7280", textDecoration: "underline" }}>Help Center</a>
      </p>
    </div>
  );
};

const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => {
  const { S, isDark } = useEmailTheme();
  return (
    <>
      <div style={S.row}>
        <span style={S.lbl}>{label}</span>
        <span style={{ ...S.val, ...(highlight ? { fontSize: 15, color: isDark ? "#3b82f6" : "#0056b3" } : {}) }}>{value}</span>
      </div>
      <hr style={S.hr} />
    </>
  );
};

/* ── Templates ───────────────────────────────────────────── */

const RideCompletedEmail = () => {
  const { S } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailCarRide} alt="ride" style={{ width: "80%", marginTop: 16 }} />
      </div>
    <div style={S.body}>
      <span style={S.badge("#16a34a")}>Trip Complete</span>
      <h1 style={S.h1}>Your ride is completed! 🎉</h1>
      <p style={S.sub}>Thanks for riding with Mizrmo, Daniel. Here's your trip summary.</p>
      <div style={S.box}>
        <InfoRow label="Pickup" value="Tema Station" />
        <InfoRow label="Drop-off" value="Accra Central" />
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
};

const WelcomeEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <p style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: 12, margin: "4px 0 0" }}>Your journey starts here</p>
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
};

const PaymentReceiptEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailPayment} alt="payment" style={{ width: "60%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={S.badge("#16a34a")}>Payment Successful</span>
          <p style={{ fontSize: 38, fontWeight: 800, color: isDark ? "#3b82f6" : "#0056b3", margin: "8px 0 2px" }}>Gh₵500.00</p>
          <p style={{ fontSize: 11, color: isDark ? "#64748b" : "#9ca3af" }}>Transaction ID: mzpymnt_120</p>
        </div>
      <div style={S.box}>
        <InfoRow label="Date" value="Sep 30, 2030" />
        <InfoRow label="Type" value="Transport Payment" />
        <InfoRow label="Route" value="Tema → Accra" />
        <InfoRow label="Method" value="MTN Mobile Money" />
        <InfoRow label="Driver" value="Kwame Mensah" />
      </div>
      <button style={S.btn}>Download Receipt</button>
      <button style={S.btnOutline}>View All Transactions</button>
    </div>
    <Footer extra="Keep this email as your payment record." />
    </div>
  );
};

const RateDriverEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailRating} alt="rating" style={{ width: "45%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <h1 style={{ ...S.h1, textAlign: "center" }}>How was your ride? 🚘</h1>
        <p style={{ ...S.sub, textAlign: "center" }}>Your feedback helps us keep Mizrmo safe & reliable.</p>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: isDark ? "#3b82f6" : "#0056b3", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 700 }}>KM</div>
          <p style={{ fontSize: 15, fontWeight: 600, color: isDark ? "#f8fafc" : "#0e1b2e", marginTop: 10 }}>Kwame Mensah</p>
          <p style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#6b7280" }}>Tema → Accra · Sep 30</p>
        </div>
        <div style={S.starRow}>
          {[1,2,3,4,5].map(s => (
            <div key={s} style={S.star(s <= 4)}>★</div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: isDark ? "#64748b" : "#9ca3af", marginBottom: 20 }}>Tap a star to rate your experience</p>
      <div style={S.box}>
        <InfoRow label="Pickup" value="Tema Station" />
        <InfoRow label="Drop-off" value="Accra Central" />
        <InfoRow label="Fare Paid" value="Gh₵125.00" highlight />
      </div>
      <button style={S.btn}>Submit Rating</button>
    </div>
    <Footer extra="Your review is anonymous and helps drivers improve." />
    </div>
  );
};

const PromoEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <p style={{ color: isDark ? "#3b82f6" : "#0056b3", fontSize: 32, fontWeight: 800, margin: "14px 0 2px" }}>20% OFF</p>
        <p style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: 13, marginBottom: 0 }}>Your next 3 rides!</p>
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
};

const SafetyEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailSafety} alt="safety" style={{ width: "65%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <span style={S.badge(isDark ? "#1e40af" : "#0056b3")}>Safety Update</span>
        <h1 style={S.h1}>Your safety matters to us 🛡️</h1>
        <p style={S.sub}>We've added new safety features to make every Mizrmo ride even more secure. Here's what's new:</p>
        <div style={S.box}>
          <div style={{ padding: "10px 0" }}>
            <strong style={{ fontSize: 13, color: isDark ? "#f8fafc" : "#0e1b2e" }}>📍 Live Trip Sharing</strong>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#6b7280" }}>Share your real-time location with trusted contacts during any ride</p>
          </div>
          <hr style={S.hr} />
          <div style={{ padding: "10px 0" }}>
            <strong style={{ fontSize: 13, color: isDark ? "#f8fafc" : "#0e1b2e" }}>🚨 Emergency SOS Button</strong>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#6b7280" }}>One-tap emergency button that alerts authorities and your contacts</p>
          </div>
          <hr style={S.hr} />
          <div style={{ padding: "10px 0" }}>
            <strong style={{ fontSize: 13, color: isDark ? "#f8fafc" : "#0e1b2e" }}>✅ Verified Drivers</strong>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#6b7280" }}>All drivers now have enhanced background checks and ID verification</p>
          </div>
        </div>
      <button style={S.btn}>Explore Safety Features</button>
    </div>
    <Footer extra="Ride safe with Mizrmo." />
    </div>
  );
};

const BookingConfirmEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailBooking} alt="booking" style={{ width: "55%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <span style={S.badge(isDark ? "#1e40af" : "#0056b3")}>Ride Booked</span>
        <h1 style={S.h1}>Your ride is confirmed! 📍</h1>
        <p style={S.sub}>A driver is on the way. Here are your booking details:</p>
  
        {/* Timeline */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#16a34a", marginTop: 3, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, color: isDark ? "#64748b" : "#9ca3af", margin: 0 }}>PICKUP</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: isDark ? "#f8fafc" : "#0e1b2e", margin: "2px 0 0" }}>Tema Station</p>
            </div>
          </div>
          <div style={{ width: 2, height: 20, background: isDark ? "#334155" : "#e5e7eb", marginLeft: 5, marginBottom: 4 }} />
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#dc2626", marginTop: 3, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, color: isDark ? "#64748b" : "#9ca3af", margin: 0 }}>DROP-OFF</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: isDark ? "#f8fafc" : "#0e1b2e", margin: "2px 0 0" }}>Accra Central</p>
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
};

const LoyaltyEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
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
            <strong style={{ fontSize: 13, color: isDark ? "#f8fafc" : "#0e1b2e" }}>🎁 Gold Benefits Unlocked</strong>
          </div>
          <hr style={S.hr} />
          <div style={{ ...S.row }}><span style={S.lbl}>Priority Matching</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>✓ Active</span></div>
          <hr style={S.hr} />
          <div style={{ ...S.row }}><span style={S.lbl}>5% Fare Discount</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>✓ Active</span></div>
          <hr style={S.hr} />
          <div style={{ ...S.row }}><span style={S.lbl}>Free Cancellations</span><span style={{ color: "#16a34a", fontWeight: 600, fontSize: 13 }}>3/month</span></div>
          <hr style={S.hr} />
          <div style={{ ...S.row }}><span style={S.lbl}>Next Tier (Platinum)</span><span style={{ color: isDark ? "#3b82f6" : "#0056b3", fontWeight: 600, fontSize: 13 }}>1,500 miles away</span></div>
        </div>
      <button style={S.btn}>Redeem Miles</button>
    </div>
    <Footer extra="Keep riding to unlock Platinum!" />
    </div>
  );
};

const PasswordResetEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailSafety} alt="reset" style={{ width: "55%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <span style={S.badge("#dc2626")}>Password Reset</span>
        <h1 style={S.h1}>Reset your password 🔐</h1>
        <p style={S.sub}>We received a request to reset your password. Click the button below to create a new one.</p>
        <div style={S.box}>
          <InfoRow label="Account" value="daniel@example.com" />
          <InfoRow label="Requested" value="Oct 1, 2030 at 2:45 PM" />
          <InfoRow label="IP Address" value="192.168.1.1" />
          <InfoRow label="Expires" value="1 hour" highlight />
        </div>
        <button style={S.btn}>Reset Password</button>
        <p style={{ fontSize: 11, color: isDark ? "#64748b" : "#9ca3af", textAlign: "center", marginTop: 18, lineHeight: 1.6 }}>
          If you didn't request this, please ignore this email or{" "}
          <a href="#" style={{ color: isDark ? "#3b82f6" : "#0056b3", textDecoration: "underline" }}>contact support</a> if you have concerns.
        </p>
      </div>
    <Footer extra="This link expires in 1 hour for your security." />
    </div>
  );
};

const EmailVerificationEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <p style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: 12, margin: "4px 0 0" }}>Almost there!</p>
        <img src={emailWelcome} alt="verify" style={{ width: "55%", marginTop: 14 }} />
      </div>
      <div style={S.body}>
        <h1 style={S.h1}>Verify your email address ✉️</h1>
        <p style={S.sub}>Thanks for signing up, Daniel! Please verify your email to activate your Mizrmo account.</p>
        <div style={{ background: isDark ? "#0f172a" : "#f4f7fb", borderRadius: 14, padding: "20px", textAlign: "center", marginBottom: 22 }}>
          <p style={{ fontSize: 11, color: isDark ? "#64748b" : "#9ca3af", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1.5 }}>Verification Code</p>
          <p style={{ fontSize: 32, fontWeight: 800, color: isDark ? "#3b82f6" : "#0056b3", letterSpacing: 8, margin: 0 }}>847293</p>
        </div>
        <p style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", textAlign: "center", marginBottom: 20 }}>
          Or click the button below to verify instantly
        </p>
        <button style={S.btn}>Verify Email Address</button>
        <p style={{ fontSize: 11, color: isDark ? "#64748b" : "#9ca3af", textAlign: "center", marginTop: 18 }}>
          This code expires in 24 hours
        </p>
      </div>
    <Footer extra="Having trouble? Reply to this email for help." />
    </div>
  );
};

const PasswordChangedEmail = () => {
  const { S } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailSafety} alt="changed" style={{ width: "50%", marginTop: 12 }} />
      </div>
    <div style={S.body}>
      <span style={S.badge("#16a34a")}>Security Alert</span>
      <h1 style={S.h1}>Password changed successfully ✅</h1>
      <p style={S.sub}>Your Mizrmo account password was just updated. Your account is now more secure!</p>
      <div style={S.box}>
        <InfoRow label="Account" value="daniel@example.com" />
        <InfoRow label="Changed On" value="Oct 1, 2030 at 3:12 PM" />
        <InfoRow label="Device" value="Chrome on Windows" />
        <InfoRow label="Location" value="Accra, Ghana" />
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", marginBottom: 18 }}>
        If this wasn't you, secure your account immediately
      </p>
      <button style={S.btn}>Review Account Activity</button>
      <button style={S.btnOutline}>Contact Support</button>
    </div>
    <Footer extra="Keep your password safe and don't share it with anyone." />
    </div>
  );
};

const AccountLockedEmail = () => {
  const { S, isDark } = useEmailTheme();
  return (
    <div style={S.mail}>
      <div style={{ ...S.hero("#fff"), paddingBottom: 0 }}>
        <Logo />
        <img src={emailSafety} alt="locked" style={{ width: "60%", marginTop: 12 }} />
      </div>
      <div style={S.body}>
        <span style={S.badge("#dc2626")}>Security Alert</span>
        <h1 style={S.h1}>Account temporarily locked 🔒</h1>
        <p style={S.sub}>We detected unusual activity on your account and locked it to protect your security.</p>
        <div style={S.box}>
          <div style={{ padding: "10px 0" }}>
            <strong style={{ fontSize: 13, color: isDark ? "#f8fafc" : "#0e1b2e" }}>🚨 Why was my account locked?</strong>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#6b7280" }}>Multiple failed login attempts from an unknown location</p>
          </div>
          <hr style={S.hr} />
          <InfoRow label="Detected" value="Oct 1, 2030 at 4:20 PM" />
          <InfoRow label="Suspicious IP" value="45.123.67.89" />
          <InfoRow label="Location" value="Unknown, Nigeria" />
        </div>
        <button style={S.btn}>Unlock My Account</button>
        <p style={{ fontSize: 11, color: isDark ? "#64748b" : "#9ca3af", textAlign: "center", marginTop: 18, lineHeight: 1.6 }}>
          You'll need to verify your identity to regain access.{" "}
          <a href="#" style={{ color: isDark ? "#3b82f6" : "#0056b3", textDecoration: "underline" }}>Learn more</a>
        </p>
      </div>
    <Footer extra="Your security is our top priority." />
    </div>
  );
};

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
  reset: <PasswordResetEmail />,
  verify: <EmailVerificationEmail />,
  pwdchanged: <PasswordChangedEmail />,
  locked: <AccountLockedEmail />,
};

const EmailTemplatesPage = () => {
  const [active, setActive] = useState("ride");
  const { theme } = useTheme();

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
      <div className={`${theme === "dark" ? "bg-slate-900/50" : "bg-muted/50"} rounded-2xl p-8 flex justify-center min-h-[600px] transition-colors duration-300`}>
        <div className="w-full max-w-[560px]">
          {templateComponents[active]}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
