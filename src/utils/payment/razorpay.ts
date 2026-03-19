export const initiatePayment = async (
  serviceId: string,
  serviceName: string,
  amount: number,
  onSuccess: () => void,
  userName: string,
  showToast: (msg: string, type?: string) => void,
  setWalletTxns: (fn: any) => void,
  setRechargeHistory: (fn: any) => void,
  walletBalance: number
) => {
  const loadRazorpay = () => new Promise(resolve => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const loaded = await loadRazorpay();
  if (!loaded) { showToast("❌ Payment gateway load nahi hua!", "error"); return; }

  const options = {
    key: "rzp_test_SQgvLFJZubGAAr",
    amount: amount,
    currency: "INR",
    name: "SevaZone",
    description: serviceName,
    image: "https://via.placeholder.com/60x60/00C9A7/ffffff?text=SZ",
    handler: function(response: any) {
      showToast("✅ Payment successful! PDF download ho rahi hai...");
      const now = new Date();
      const ds = now.toLocaleDateString("en-IN", {day:"2-digit", month:"short", year:"numeric"});
      const charge = amount / 100;
      setWalletTxns((prev: any[]) => {
        const newBal = walletBalance - charge;
        return [{
          sn: String(prev.length + 1).padStart(3, "0"),
          desc: serviceName,
          type: "Debit",
          amount: `₹${charge}`,
          balance: `₹${newBal.toLocaleString("en-IN")}`,
          date: ds
        }, ...prev];
      });
      setRechargeHistory((prev: any[]) => [{
        sn: String(prev.length + 1).padStart(3, "0"),
        mobile: "—",
        service: serviceName,
        amount: `₹${charge}`,
        status: "Success",
        date: ds
      }, ...prev]);
      setTimeout(onSuccess, 500);
    },
    prefill: { name: userName, contact: "" },
    theme: { color: "#00C9A7" },
    modal: { ondismiss: () => showToast("⚠️ Payment cancel kar di!", "error") }
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
