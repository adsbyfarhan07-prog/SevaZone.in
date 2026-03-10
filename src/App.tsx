 { useState, useRef } from "react";

const DEMO_USER = { mobile: "8307950410", password: "seva123" };

const T = {
  en: {
    appName:"SevaZone", tagline:"Digital India Services",
    loginTitle:"Welcome Back!", loginSub:"Login to your account",
    mobileLabel:"Mobile Number", passwordLabel:"Password",
    forgotLink:"Forgot Password?", loginBtn:"Login Now",
    noAccount:"Don't have an account?", registerLink:"Register here",
    forgotTitle:"Reset Password", forgotSub:"Enter mobile to get OTP",
    sendOtp:"Send OTP", backLogin:"← Back to Login",
    registerTitle:"Create Account", registerSub:"Join SevaZone today",
    fullName:"Full Name", email:"Email Address", confirmPass:"Confirm Password",
    selectRole:"Select Account Type", retailer:"Retailer", retailerSub:"Local Shop",
    distributor:"Distributor", distributorSub:"Wholesale", registerBtn:"Create Account",
    haveAccount:"Already have account?",
    dashboard:"Dashboard", addMoney:"Add Money",
    aadhar:"Aadhar Card Service", voter:"Voter Card Services", pan:"Pan Card Services",
    vehicle:"Manual Marksheet 10th-12th", ration:"NIOS Marksheet", dl:"Haryana Resident Manual",
    profile:"Profile Management", rechargeHist:"Recharge History", walletHist:"Wallet History",
    training:"Training Videos", logout:"Logout", services:"SERVICES", needSupport:"NEED SUPPORT",
    walletBal:"Wallet Balance", addMoneyBtn:"Add Money", notifications:"Notifications",
    serialNo:"S.No.", mobile:"Mobile", status:"Status", amount:"Amount", date:"Date",
    uploadPhoto:"Upload Photo", saveProfile:"Save Changes", city:"City", state:"State",
    todayEarning:"Today Earning", totalTxn:"Total Transactions", monthRevenue:"Monthly Revenue",
    recentTxn:"Recent Transactions", quickServices:"Quick Services",
    comingSoon:"Coming Soon", comingSoonDesc:"This section is under development.",
    contactUs:"Contact Support", whatsappChat:"WhatsApp Chat", callUs:"Call Us",
    wrongPass:"Wrong mobile or password!", fillFields:"Please fill all fields!",
    description:"Description", type:"Type", debit:"Debit", credit:"Credit",
  },
  hi: {
    appName:"सेवाज़ोन", tagline:"डिजिटल इंडिया सेवाएं",
    loginTitle:"वापस आपका स्वागत है!", loginSub:"अपने अकाउंट में लॉगिन करें",
    mobileLabel:"मोबाइल नंबर", passwordLabel:"पासवर्ड",
    forgotLink:"पासवर्ड भूल गए?", loginBtn:"अभी लॉगिन करें",
    noAccount:"अकाउंट नहीं है?", registerLink:"यहाँ रजिस्टर करें",
    forgotTitle:"पासवर्ड रीसेट", forgotSub:"OTP के लिए मोबाइल डालें",
    sendOtp:"OTP भेजें", backLogin:"← लॉगिन पर वापस",
    registerTitle:"अकाउंट बनाएं", registerSub:"आज SevaZone से जुड़ें",
    fullName:"पूरा नाम", email:"ईमेल पता", confirmPass:"पासवर्ड कन्फर्म करें",
    selectRole:"अकाउंट टाइप चुनें", retailer:"रिटेलर", retailerSub:"लोकल शॉप",
    distributor:"डिस्ट्रीब्यूटर", distributorSub:"थोक", registerBtn:"अकाउंट बनाएं",
    haveAccount:"पहले से अकाउंट है?",
    dashboard:"डैशबोर्ड", addMoney:"पैसे जोड़ें",
    aadhar:"आधार कार्ड सेवा", voter:"वोटर कार्ड सेवाएं", pan:"पैन कार्ड सेवाएं",
    vehicle:"मैनुअल मार्कशीट 10वीं-12वीं", ration:"NIOS मार्कशीट", dl:"हरियाणा रेजिडेंट मैनुअल",
    profile:"प्रोफाइल प्रबंधन", rechargeHist:"रिचार्ज इतिहास", walletHist:"वॉलेट इतिहास",
    training:"ट्रेनिंग वीडियो", logout:"लॉगआउट", services:"सेवाएं", needSupport:"सहायता",
    walletBal:"वॉलेट बैलेंस", addMoneyBtn:"पैसे जोड़ें", notifications:"सूचनाएं",
    serialNo:"क्र.सं.", mobile:"मोबाइल", status:"स्थिति", amount:"राशि", date:"तारीख",
    uploadPhoto:"फोटो अपलोड करें", saveProfile:"बदलाव सेव करें", city:"शहर", state:"राज्य",
    todayEarning:"आज की कमाई", totalTxn:"कुल लेनदेन", monthRevenue:"मासिक आय",
    recentTxn:"हालिया लेनदेन", quickServices:"त्वरित सेवाएं",
    comingSoon:"जल्द आ रहा है", comingSoonDesc:"यह सेक्शन विकास में है।",
    contactUs:"सहायता संपर्क", whatsappChat:"WhatsApp चैट", callUs:"कॉल करें",
    wrongPass:"गलत मोबाइल या पासवर्ड!", fillFields:"कृपया सभी फ़ील्ड भरें!",
    description:"विवरण", type:"प्रकार", debit:"डेबिट", credit:"क्रेडिट",
  }
};

const SUB_MENUS = {
  aadhar:[
    {id:"aadhar_manual", icon:"🖨️", label:"Aadhar Manual Print"},
    {id:"aadhar_list",   icon:"📋", label:"Print List"},
  ],
  voter:[
    {id:"voter_manual", icon:"🖨️", label:"Voter Manual Print"},
    {id:"voter_list",   icon:"📋", label:"Print List"},
  ],
  pan:[
    {id:"pan_find",    icon:"🔍", label:"Aadhar To Pan No. Find"},
    {id:"pan_details", icon:"📊", label:"Pan No. To Details"},
    {id:"pan_manual",  icon:"🖨️", label:"Pan Manual"},
    {id:"pan_list",    icon:"📋", label:"Pan Manual Print List"},
  ],
};

const RECHARGE_DATA = [
  {sn:"001", mobile:"98765XXXXX", service:"Aadhar Manual Print", amount:"₹50",  status:"Success", date:"07 Mar 2026"},
  {sn:"002", mobile:"87654XXXXX", service:"PAN Manual",          amount:"₹120", status:"Success", date:"07 Mar 2026"},
  {sn:"003", mobile:"76543XXXXX", service:"Voter Manual Print",  amount:"₹80",  status:"Pending", date:"06 Mar 2026"},
  {sn:"004", mobile:"65432XXXXX", service:"NIOS Marksheet",      amount:"₹200", status:"Success", date:"06 Mar 2026"},
  {sn:"005", mobile:"54321XXXXX", service:"Aadhar Print List",   amount:"₹50",  status:"Failed",  date:"05 Mar 2026"},
];

const INIT_WALLET = [
  {sn:"001", desc:"Wallet Top-up",       type:"Credit", amount:"₹500",   balance:"₹2,450", date:"07 Mar 2026"},
  {sn:"002", desc:"Aadhar Manual Print", type:"Debit",  amount:"₹50",    balance:"₹1,950", date:"07 Mar 2026"},
  {sn:"003", desc:"PAN Manual Service",  type:"Debit",  amount:"₹120",   balance:"₹1,830", date:"06 Mar 2026"},
  {sn:"004", desc:"Wallet Top-up",       type:"Credit", amount:"₹1,000", balance:"₹2,830", date:"06 Mar 2026"},
  {sn:"005", desc:"Voter Manual Print",  type:"Debit",  amount:"₹80",    balance:"₹2,750", date:"05 Mar 2026"},
];
export default function SevaZone() {
  const getInitPage = () => { try { return sessionStorage.getItem("sz_logged")==="1"?"dashboard":"login"; } catch { return "login"; } };

  const [page, setPage]               = useState(getInitPage);
  const [authTab, setAuthTab]         = useState("login");
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPass, setLoginPass]     = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [role, setRole]               = useState("retailer");
  const [lang, setLang]               = useState("en");
  const [dark, setDark]               = useState(true);
  const [loading, setLoading]         = useState(false);
  const [toast, setToast]             = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [activeMenu, setActiveMenu]   = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [expandedMenu, setExpandedMenu]   = useState(null);
  const [profilePhoto, setProfilePhoto]   = useState(null);
  const [userName, setUserName]   = useState("User");
  const [userCity, setUserCity]   = useState("");
  const [userState, setUserState] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTxns, setWalletTxns]       = useState(INIT_WALLET);
  const [addMoneyStep, setAddMoneyStep]   = useState("input");
  const [addAmount, setAddAmount]         = useState("");
  const [qrTimer, setQrTimer]             = useState(600);
  const [regName, setRegName]             = useState("");
  const [regMobile, setRegMobile]         = useState("");
  const [regPass, setRegPass]             = useState("");
  const [regConfirm, setRegConfirm]       = useState("");
  const [forgotMobile, setForgotMobile]   = useState("");
  const [forgotOtp, setForgotOtp]         = useState("");
  const [enteredOtp, setEnteredOtp]       = useState("");
  const [forgotStep, setForgotStep]       = useState("mobile");
  const [newPass, setNewPass]             = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  const timerRef = useRef(null);
  const t = T[lang];
  const accent = "#00C9A7";

  const getUsers = () => { try { return JSON.parse(localStorage.getItem("sz_users")||"[]"); } catch { return []; } };
  const saveUsers = (u) => { try { localStorage.setItem("sz_users", JSON.stringify(u)); } catch {} };

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  const handleLogin = () => {
    if (!loginMobile||!loginPass) { showToast(t.fillFields,"error"); return; }
    if (loginMobile===DEMO_USER.mobile && loginPass===DEMO_USER.password) {
      setLoading(true);
      setTimeout(()=>{ setLoading(false); setUserName("Demo User"); setUserCity("Alwar"); setWalletBalance(2450); try{sessionStorage.setItem("sz_logged","1");}catch{} setPage("dashboard"); },1200);
      return;
    }
    const users = getUsers();
    const found = users.find(u=>u.mobile===loginMobile && u.password===loginPass);
    if (!found) { showToast("❌ "+t.wrongPass,"error"); return; }
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setUserName(found.name||"User"); setUserCity(found.city||""); setUserState(found.state||""); setRole(found.role||"retailer"); setWalletBalance(found.wallet||0); try{sessionStorage.setItem("sz_logged","1");}catch{} setPage("dashboard"); },1200);
  };

  const handleRegister = () => {
    if (!regName||!regMobile||!regPass||!regConfirm) { showToast(t.fillFields,"error"); return; }
    if (regMobile.length!==10) { showToast("❌ 10 digit mobile daalo!","error"); return; }
    if (regPass.length<6) { showToast("❌ Password 6+ characters ka ho!","error"); return; }
    if (regPass!==regConfirm) { showToast("❌ Passwords match nahi kar rahe!","error"); return; }
    const users = getUsers();
    if (users.find(u=>u.mobile===regMobile)||regMobile===DEMO_USER.mobile) { showToast("❌ Mobile already registered hai!","error"); return; }
    saveUsers([...users, {name:regName,mobile:regMobile,password:regPass,role,city:"",state:"",wallet:0}]);
    showToast("✅ Account ban gaya! Ab login karo!");
    setRegName(""); setRegMobile(""); setRegPass(""); setRegConfirm("");
    setTimeout(()=>setAuthTab("login"),1000);
  };

  const handleSendOtp = () => {
    if (!forgotMobile||forgotMobile.length!==10) { showToast("❌ Valid mobile daalo!","error"); return; }
    const users = getUsers();
    if (!users.find(u=>u.mobile===forgotMobile) && forgotMobile!==DEMO_USER.mobile) { showToast("❌ Mobile registered nahi hai!","error"); return; }
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      const otp = String(Math.floor(100000+Math.random()*900000));
      setForgotOtp(otp);
      setForgotStep("otp");
      showToast("🔐 OTP: "+otp+" (SMS backend baad mein lagega)","success");
    },1200);
  };

  const handleVerifyOtp = () => {
    if (!enteredOtp) { showToast("❌ OTP daalo!","error"); return; }
    if (enteredOtp!==forgotOtp) { showToast("❌ Wrong OTP!","error"); return; }
    setForgotStep("newpass");
  };

  const handleResetPass = () => {
    if (!newPass||!newPassConfirm) { showToast(t.fillFields,"error"); return; }
    if (newPass.length<6) { showToast("❌ Password 6+ characters ka ho!","error"); return; }
    if (newPass!==newPassConfirm) { showToast("❌ Passwords match nahi!","error"); return; }
    const users = getUsers();
    saveUsers(users.map(u=>u.mobile===forgotMobile?{...u,password:newPass}:u));
    showToast("✅ Password reset ho gaya! Login karo!");
    setForgotStep("mobile"); setForgotMobile(""); setForgotOtp(""); setEnteredOtp(""); setNewPass(""); setNewPassConfirm("");
    setTimeout(()=>setAuthTab("login"),1000);
  };

  const handleLogout = () => { try{sessionStorage.removeItem("sz_logged");}catch{} setPage("login"); setLoginMobile(""); setLoginPass(""); };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setProfilePhoto(ev.target.result); showToast("✅ Photo updated!"); };
    reader.readAsDataURL(file);
  };

const handleMenuClick = (id) => {
    if (SUB_MENUS[id]) { setExpandedMenu(expandedMenu===id?null:id); setActiveMenu(id); setActiveSubMenu(null); }
    else { setActiveMenu(id); setActiveSubMenu(null); setExpandedMenu(null); }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let s = 600; setQrTimer(s);
    timerRef.current = setInterval(()=>{ s-=1; setQrTimer(s); if(s<=0){clearInterval(timerRef.current);setAddMoneyStep("input");}},1000);
  };

  const confirmPayment = (amt) => {
    const now = new Date();
    const ds = now.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
    const newBal = walletBalance + amt;
    setWalletBalance(newBal);
    setWalletTxns(prev=>[{sn:String(prev.length+1).padStart(3,"0"),desc:"Wallet Top-up",type:"Credit",amount:`₹${amt}`,balance:`₹${newBal.toLocaleString("en-IN")}`,date:ds},...prev]);
    if(timerRef.current) clearInterval(timerRef.current);
    setAddMoneyStep("success");
  };

  const th = {
    bg:        dark?"#0d1f1c":"#f0f7f5",
    card:      dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)",
    cardSolid: dark?"#132820":"#ffffff",
    sidebar:   dark?"linear-gradient(180deg,#00695C,#004D40)":"linear-gradient(180deg,#00897B,#00695C)",
    topbar:    dark?"linear-gradient(135deg,#00695C,#004D40)":"linear-gradient(135deg,#00897B,#00695C)",
    text:      dark?"#e8f5f2":"#1a3330",
    subtext:   dark?"rgba(232,245,242,0.5)":"rgba(26,51,48,0.55)",
    border:    dark?"rgba(0,201,167,0.15)":"rgba(0,150,136,0.2)",
    inputBg:   dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.04)",
    inputBorder:dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.15)",
    statBg:    dark?"#132820":"#ffffff",
    rowHover:  dark?"#1a3530":"#e8f8f5",
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0} body{font-family:'Outfit',sans-serif}
    ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#00C9A7;border-radius:10px}
    .nav-item{display:flex;align-items:center;gap:11px;padding:9px 14px;border-radius:10px;cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.65);font-size:13px;font-weight:600;white-space:nowrap}
    .nav-item:hover{background:rgba(255,255,255,0.12);color:#fff;transform:translateX(2px)}
    .nav-item.active{background:rgba(255,255,255,0.18);color:#fff;box-shadow:0 3px 12px rgba(0,0,0,0.2)}
    .sub-item{display:flex;align-items:center;gap:10px;padding:8px 12px 8px 38px;border-radius:8px;cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600}
    .sub-item:hover{background:rgba(255,255,255,0.1);color:#fff}
    .sub-item.active{background:rgba(0,201,167,0.2);color:#00C9A7}
    .form-input{width:100%;background:${th.inputBg};border:1.5px solid ${th.inputBorder};border-radius:12px;padding:13px 14px 13px 42px;color:${th.text};font-size:14px;font-weight:500;outline:none;transition:all 0.2s;font-family:'Outfit',sans-serif}
    .form-input::placeholder{color:${th.subtext}}
    .form-input:focus{border-color:#00C9A7;background:rgba(0,201,167,0.07);box-shadow:0 0 0 3px rgba(0,201,167,0.12)}
    .tab-btn{flex:1;padding:10px;border:none;background:transparent;color:${th.subtext};font-weight:700;font-size:13px;cursor:pointer;border-radius:10px;transition:all 0.2s;font-family:'Outfit',sans-serif}
    .tab-btn.active{background:linear-gradient(135deg,#00C9A7,#00897B);color:white;box-shadow:0 4px 14px rgba(0,201,167,0.3)}
    .submit-btn{width:100%;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#00C9A7,#00897B);color:white;font-weight:800;font-size:15px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s;box-shadow:0 5px 18px rgba(0,201,167,0.3)}
    .submit-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,201,167,0.4)}
    .submit-btn:disabled{opacity:0.65;cursor:not-allowed;transform:none}
    .role-btn{flex:1;padding:12px 8px;border-radius:12px;border:2px solid ${th.inputBorder};background:transparent;color:${th.subtext};font-weight:700;font-size:13px;cursor:pointer;transition:all 0.25s;font-family:'Outfit',sans-serif;display:flex;flex-direction:column;align-items:center;gap:4px}
    .role-btn.active{border-color:#00C9A7;background:rgba(0,201,167,0.1);color:#00C9A7}
    .stat-card{border-radius:16px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.08);transition:all 0.2s}
    .stat-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.12)}
    .svc-card{border-radius:14px;padding:20px;cursor:pointer;transition:all 0.2s;border:2px solid transparent}
    .svc-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(0,0,0,0.1)}
    .icon-btn{background:rgba(255,255,255,0.15);border:none;border-radius:8px;padding:8px 10px;cursor:pointer;font-size:16px;color:white;transition:all 0.2s}
    .icon-btn:hover{background:rgba(255,255,255,0.25)}
    .toggle-track{width:46px;height:24px;border-radius:20px;position:relative;cursor:pointer;transition:background 0.3s;flex-shrink:0}
    .toggle-thumb{width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:3px;transition:transform 0.3s;box-shadow:0 2px 5px rgba(0,0,0,0.25)}
    .notif-panel{position:absolute;top:54px;right:0;width:290px;background:${th.cardSolid};border:1px solid ${th.border};border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,0.2);z-index:300;animation:popIn 0.2s ease;overflow:hidden}
    .support-btn-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;cursor:pointer;transition:all 0.2s;text-decoration:none}
    .support-btn-item:hover{background:rgba(0,201,167,0.1)}
    .link-btn{background:none;border:none;color:#00C9A7;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px}
    .blob1{position:absolute;width:450px;height:450px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,167,0.15),transparent 70%);top:-100px;left:-100px;animation:b1 9s ease-in-out infinite}
    .blob2{position:absolute;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(0,150,136,0.12),transparent 70%);bottom:-60px;right:-60px;animation:b2 11s ease-in-out infinite}
    .grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,0.04) 1px,transparent 1px);background-size:40px 40px}
    .toast-box{position:fixed;top:20px;right:20px;padding:13px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:9999;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);font-family:'Outfit',sans-serif;animation:popIn 0.3s ease;max-width:340px}
    .fade-up{animation:fadeUp 0.35s ease forwards}
    .spinner{width:17px;height:17px;border:2.5px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;vertical-align:middle;margin-right:8px}
    @keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes b1{0%,100%{transform:translate(0,0)}50%{transform:translate(35px,25px)}}
    @keyframes b2{0%,100%{transform:translate(0,0)}50%{transform:translate(-25px,-20px)}}
    tr:hover td{background:${th.rowHover}!important}
  `;

  const statusBadge = (s) => {
    const map = {Success:["rgba(0,201,167,0.15)","#00C9A7"],Pending:["rgba(249,168,38,0.15)","#F9A826"],Failed:["rgba(255,107,107,0.15)","#FF6B6B"]};
    const [bg,color] = map[s]||["#eee","#333"];
    return <span style={{background:bg,color,padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>{s}</span>;
  };

  const backBtn = (onClick) => (
    <button onClick={onClick} style={{background:`rgba(0,201,167,0.1)`,border:`1px solid ${th.border}`,borderRadius:10,padding:"8px 16px",color:accent,fontWeight:700,cursor:"pointer",fontSize:13,fontFamily:"'Outfit',sans-serif"}}>← Back</button>
  );

  const fieldStyle = {width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"};
  const labelStyle = {color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6,display:"block"};
  const renderContent = () => {

    if (activeSubMenu) {

      // ── AADHAR MANUAL PRINT ──────────────────
      if (activeSubMenu.id==="aadhar_manual") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🖨️ Aadhar Manual Print</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:700}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{label:"Aadhar Card No.",ph:"Aadharcard No...",type:"tel"},{label:"Name",ph:"Example : Raju Kumar"},{label:"Father Name",ph:"Example : Shyam Singh"}].map((f,i)=>(
                <div key={i}><label style={labelStyle}>{f.label}</label><input style={fieldStyle} placeholder={f.ph} type={f.type||"text"}/></div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{label:"House No",ph:"House No"},{label:"Gali, Locality",ph:"Gali, Locality, Panchayat"},{label:"Post Office",ph:"Post Office"}].map((f,i)=>(
                <div key={i}><label style={labelStyle}>{f.label}</label><input style={fieldStyle} placeholder={f.ph}/></div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{label:"State",ph:"state"},{label:"City",ph:"city"},{label:"Pin Code",ph:"pincode",type:"tel"}].map((f,i)=>(
                <div key={i}><label style={labelStyle}>{f.label}</label><input style={fieldStyle} placeholder={f.ph} type={f.type||"text"}/></div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              <div><label style={labelStyle}>Date Of Birth</label><input type="date" style={fieldStyle}/></div>
              <div><label style={labelStyle}>Date Of Birth (Local)</label><input style={fieldStyle} placeholder="Auto Fill" readOnly/></div>
              <div><label style={labelStyle}>Select Gender</label>
                <select style={fieldStyle}><option value="">GENDER</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:14,marginBottom:14}}>
              <div><label style={labelStyle}>Gender Local</label><input style={fieldStyle} placeholder="Gender Local"/></div>
              <div><label style={labelStyle}>Address</label><textarea style={{...fieldStyle,resize:"none",height:70}} placeholder="S/O : Mo Rahim, khurdaha, Jakhauli, Faizabad, Uttar Pradesh, 878987"/></div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={labelStyle}>Select Image <span style={{color:"#FF6B6B"}}>(10 kb se kam size)</span></label>
              <label style={{display:"inline-flex",alignItems:"center",gap:10,background:`rgba(0,201,167,0.1)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"10px 18px",cursor:"pointer"}}>
                <span style={{fontSize:20}}>📷</span>
                <span style={{color:accent,fontWeight:700,fontSize:13}}>Choose File</span>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0])showToast("✅ Image select ho gayi!");}}/>
              </label>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
              <div><label style={labelStyle}>Select Local Language</label>
                <select style={fieldStyle}><option value="">SELECT</option>{["Hindi","English","Punjabi","Bengali","Tamil","Telugu","Marathi","Gujarati","Kannada","Malayalam","Odia","Urdu"].map(l=><option key={l}>{l}</option>)}</select>
              </div>
              <div><label style={labelStyle}>Name (Local Language)</label><input style={fieldStyle} placeholder="Local Name"/></div>
              <div><label style={labelStyle}>Address (Local Language)</label><input style={fieldStyle} placeholder="Local Address"/></div>
            </div>
            <button className="submit-btn" style={{maxWidth:180}} onClick={()=>showToast("✅ Form submit ho gaya!")}>✅ Submit</button>
          </div>
        </div>
      );

      // ── AADHAR PRINT LIST ────────────────────
      if (activeSubMenu.id==="aadhar_list") {
        const data=[
          {sn:"001",aadharNo:"5935 4835 1662",name:"Hanan Waheed Bali",date:"2026-03-03 06:02:57"},
          {sn:"002",aadharNo:"7859 9050 3308",name:"MUDASSIR AHMED",date:"2026-03-05 09:30:36"},
          {sn:"003",aadharNo:"6102 2068 4828",name:"Mehboob Ahmed",date:"2026-03-05 09:38:09"},
        ];
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📋 Aadhar Print List</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                  {["Serial Number","Aadhar Number","Name","Date","Download"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
                </tr></thead>
                <tbody>{data.map((r,i)=>(
                  <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                    <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                    <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.aadharNo}</td>
                    <td style={{padding:"12px 14px",color:th.text}}>{r.name}</td>
                    <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                    <td style={{padding:"12px 14px"}}><button onClick={()=>showToast("✅ Downloading...")} style={{background:"linear-gradient(135deg,#2196F3,#1565C0)",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Download Now</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        );
      }

    // ── AADHAR TO PAN FIND ───────────────────
      if (activeSubMenu.id==="pan_find") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🔍 Aadhar To Pan No. Find</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:500}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <div><label style={labelStyle}>Name</label><input style={fieldStyle} placeholder="Sanjay Chauhan"/></div>
              <div><label style={labelStyle}>Aadhar No.</label><input style={fieldStyle} placeholder="Aadhar No." type="tel" maxLength={12}/></div>
            </div>
            <button className="submit-btn" style={{maxWidth:160}} onClick={()=>showToast("✅ Searching...")}>✅ Submit</button>
          </div>
        </div>
      );

      // ── PAN NO TO DETAILS ────────────────────
      if (activeSubMenu.id==="pan_details") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📊 Pan No. To Details</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:500}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,alignItems:"end",marginBottom:20}}>
              <div><label style={labelStyle}>Pan Number</label><input style={fieldStyle} placeholder="Pan Number" maxLength={10}/></div>
              <div><label style={{...labelStyle,color:accent}}>Charges</label><input style={fieldStyle} placeholder="Processing Fee ₹" readOnly/></div>
              <button className="submit-btn" onClick={()=>showToast("✅ Fetching details...")}>Submit</button>
            </div>
          </div>
        </div>
      );

      // ── PAN MANUAL ───────────────────────────
      if (activeSubMenu.id==="pan_manual") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🖨️ Pan Manual</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:700}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
              <div><label style={labelStyle}>Pan No.</label><input style={fieldStyle} placeholder="Pan Number" maxLength={10}/></div>
              <div><label style={labelStyle}>Name</label><input style={fieldStyle} placeholder="Full Name"/></div>
              <div><label style={labelStyle}>Father Name</label><input style={fieldStyle} placeholder="Father Name"/></div>
              <div><label style={labelStyle}>Date Of Birth</label><input type="date" style={fieldStyle}/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:20}}>
              <div><label style={labelStyle}>Gender</label>
                <select style={fieldStyle}><option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
              <div><label style={labelStyle}>Image Passport Size</label>
                <label style={{display:"flex",alignItems:"center",gap:8,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                  <span>📷</span><span style={{color:accent,fontWeight:700,fontSize:12}}>Choose File</span>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0])showToast("✅ Photo selected!");}}/>
                </label>
              </div>
              <div><label style={labelStyle}>Signature</label>
                <label style={{display:"flex",alignItems:"center",gap:8,background:`rgba(132,94,194,0.08)`,border:`1.5px dashed #845EC2`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                  <span>✍️</span><span style={{color:"#845EC2",fontWeight:700,fontSize:12}}>Choose File</span>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0])showToast("✅ Signature selected!");}}/>
                </label>
              </div>
            </div>
            <button className="submit-btn" style={{maxWidth:160}} onClick={()=>showToast("✅ Form submitted!")}>✅ Submit</button>
          </div>
        </div>
      );

      // ── PAN PRINT LIST ───────────────────────
      if (activeSubMenu.id==="pan_list") {
        const data=[
          {sn:"001",panNo:"ABCDE1234F",name:"Rahul Sharma",dob:"15/08/1990",date:"2026-03-03"},
          {sn:"002",panNo:"XYZPQ5678G",name:"Priya Singh",dob:"22/11/1995",date:"2026-03-04"},
          {sn:"003",panNo:"LMNOP9012H",name:"Amit Kumar",dob:"01/05/1988",date:"2026-03-05"},
        ];
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📋 Pan Manual Print List</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                  {["Serial Number","Pan Number","Name","DOB","Date","Download"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
                </tr></thead>
                <tbody>{data.map((r,i)=>(
                  <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                    <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                    <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.panNo}</td>
                    <td style={{padding:"12px 14px",color:th.text}}>{r.name}</td>
                    <td style={{padding:"12px 14px",color:th.subtext}}>{r.dob}</td>
                    <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                    <td style={{padding:"12px 14px"}}><button onClick={()=>showToast("✅ Downloading...")} style={{background:"linear-gradient(135deg,#2196F3,#1565C0)",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Download Now</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        );
        }
      // ── OTHER SUB MENUS ──────────────────────
      return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>{activeSubMenu.label}</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:40,textAlign:"center",boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
            <div style={{fontSize:60,marginBottom:16}}>{activeSubMenu.icon}</div>
            <h3 style={{color:th.text,fontWeight:800,fontSize:20,marginBottom:10}}>{activeSubMenu.label}</h3>
            <p style={{color:th.subtext,fontSize:14,lineHeight:1.6,maxWidth:320,margin:"0 auto 24px"}}>Service jald available hogi. Support se contact karo.</p>
            <a href="https://wa.me/918307950410" target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:10,background:"#25D366",color:"white",padding:"12px 24px",borderRadius:12,textDecoration:"none",fontWeight:700,fontSize:14}}>💬 WhatsApp Par Contact Karo</a>
          </div>
        </div>
      );
    }

    // ── DASHBOARD ────────────────────────────
    if (activeMenu==="dashboard") return (
      <div className="fade-up">
        <div style={{marginBottom:22}}>
          <h2 style={{color:th.text,fontWeight:900,fontSize:22}}>⊞ {t.dashboard}</h2>
          <p style={{color:th.subtext,fontSize:13,marginTop:4}}>Welcome back! Aaj ki services dekho.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
          {[
            {label:t.walletBal,value:`₹${walletBalance.toLocaleString("en-IN")}`,icon:"💰",color:"#00C9A7",bg:"rgba(0,201,167,0.1)"},
            {label:t.todayEarning,value:"₹350",icon:"📈",color:"#F9A826",bg:"rgba(249,168,38,0.1)"},
            {label:t.totalTxn,value:"28",icon:"🔄",color:"#7C4DFF",bg:"rgba(124,77,255,0.1)"},
          ].map((s,i)=>(
            <div key={i} className="stat-card" style={{background:th.statBg}}>
              <div style={{width:42,height:42,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:12}}>{s.icon}</div>
              <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:4}}>{s.label}</div>
              <div style={{color:s.color,fontWeight:900,fontSize:20}}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{background:th.statBg,borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <h3 style={{color:th.text,fontWeight:800,fontSize:16,marginBottom:16}}>⚡ {t.quickServices}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[
              {icon:"🪪",label:"Aadhar Print",color:"#00C9A7",bg:"rgba(0,201,167,0.1)",id:"aadhar"},
              {icon:"📋",label:"Pan Card",color:"#F9A826",bg:"rgba(249,168,38,0.1)",id:"pan"},
              {icon:"🗳️",label:"Voter Card",color:"#7C4DFF",bg:"rgba(124,77,255,0.1)",id:"voter"},
              {icon:"📝",label:"Marksheet",color:"#FF6B6B",bg:"rgba(255,107,107,0.1)",id:"marksheet"},
              {icon:"📄",label:"NIOS",color:"#2196F3",bg:"rgba(33,150,243,0.1)",id:"nios"},
              {icon:"🏠",label:"Haryana",color:"#4CAF50",bg:"rgba(76,175,80,0.1)",id:"haryana"},
            ].map((s,i)=>(
              <div key={i} className="svc-card" style={{background:s.bg,textAlign:"center"}} onClick={()=>handleMenuClick(s.id)}>
                <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
                <div style={{color:s.color,fontWeight:700,fontSize:12}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:th.statBg,borderRadius:16,padding:20,marginTop:20,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <h3 style={{color:th.text,fontWeight:800,fontSize:16,marginBottom:14}}>🕐 {t.recentTxn}</h3>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:dark?"rgba(0,201,167,0.06)":"#f9fffe"}}>
                {[t.serialNo,"Service",t.amount,t.status,t.date].map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
              </tr></thead>
              <tbody>{RECHARGE_DATA.slice(0,3).map((r,i)=>(
                <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                  <td style={{padding:"10px 12px",color:accent,fontWeight:700}}>{r.sn}</td>
                  <td style={{padding:"10px 12px",color:th.text}}>{r.service}</td>
                  <td style={{padding:"10px 12px",color:th.text,fontWeight:700}}>{r.amount}</td>
                  <td style={{padding:"10px 12px"}}>{statusBadge(r.status)}</td>
                  <td style={{padding:"10px 12px",color:th.subtext}}>{r.date}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    );

    // ── ADD MONEY ────────────────────────────
    if (activeMenu==="addMoney") {
      const amt = parseInt(addAmount)||0;
      if (addMoneyStep==="input") return (
        <div className="fade-up" style={{maxWidth:480}}>
          <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>💰 {t.addMoney}</h2>
          <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
            <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:8}}>AMOUNT (₹)</div>
            <input style={{...fieldStyle,fontSize:22,fontWeight:800,padding:"14px 16px",marginBottom:16}} type="tel" placeholder="Enter amount" value={addAmount} onChange={e=>setAddAmount(e.target.value.replace(/\D/g,""))}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:20}}>
              {[100,200,500,1000].map(v=>(
                <button key={v} onClick={()=>setAddAmount(String(v))} style={{padding:"10px",border:`1.5px solid ${addAmount===String(v)?accent:th.border}`,borderRadius:10,background:addAmount===String(v)?"rgba(0,201,167,0.1)":"transparent",color:addAmount===String(v)?accent:th.text,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>₹{v}</button>
              ))}
            </div>
            <button className="submit-btn" disabled={amt<10} onClick={()=>setAddMoneyStep("qr")}>Proceed to Pay ₹{amt||0}</button>
          </div>
        </div>
      );
      if (addMoneyStep==="qr") { if(!timerRef._started){startTimer();timerRef._started=true;} const mm=String(Math.floor(qrTimer/60)).padStart(2,"0"),ss=String(qrTimer%60).padStart(2,"0");
        return (
          <div className="fade-up" style={{maxWidth:420}}>
            <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>📱 Scan & Pay</h2>
            <div style={{background:th.statBg,borderRadius:16,padding:28,textAlign:"center",boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
              <div style={{color:th.subtext,fontSize:13,marginBottom:6}}>Pay ₹{amt} via UPI</div>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9053661570@ptsbi%26am=${amt}%26tn=SevaZone`} alt="QR" style={{borderRadius:12,border:`3px solid ${accent}`,margin:"12px auto",display:"block"}}/>
              <div style={{color:th.subtext,fontSize:12,margin:"8px 0 4px"}}>UPI ID:</div>
              <div style={{color:accent,fontWeight:800,fontSize:15,marginBottom:16}}>9053661570@ptsbi</div>
              <div style={{color:qrTimer<60?"#FF6B6B":"#F9A826",fontWeight:800,fontSize:18,marginBottom:20}}>⏱ {mm}:{ss}</div>
              <button className="submit-btn" onClick={()=>{timerRef._started=false;confirmPayment(amt);}}>✅ Maine Payment Kar Di</button>
              <button onClick={()=>{if(timerRef.current)clearInterval(timerRef.current);timerRef._started=false;setAddMoneyStep("input");setAddAmount("");}} style={{marginTop:12,width:"100%",padding:"10px",border:`1px solid ${th.border}`,borderRadius:10,background:"transparent",color:th.subtext,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600}}>Cancel</button>
            </div>
          </div>
        );
      }
      if (addMoneyStep==="success") return (
        <div className="fade-up" style={{maxWidth:420,textAlign:"center"}}>
          <div style={{background:th.statBg,borderRadius:16,padding:40,boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
            <div style={{fontSize:64,marginBottom:16}}>🎉</div>
            <h3 style={{color:"#00C9A7",fontWeight:900,fontSize:22,marginBottom:8}}>Payment Successful!</h3>
            <p style={{color:th.subtext,fontSize:14,marginBottom:20}}>₹{amt} wallet mein add ho gaya!</p>
            <div style={{background:"rgba(0,201,167,0.1)",borderRadius:12,padding:"16px",marginBottom:24}}>
              <div style={{color:th.subtext,fontSize:12}}>New Balance</div>
              <div style={{color:accent,fontWeight:900,fontSize:26}}>₹{walletBalance.toLocaleString("en-IN")}</div>
            </div>
            <button className="submit-btn" onClick={()=>{setAddMoneyStep("input");setAddAmount("");setActiveMenu("dashboard");}}>🏠 Dashboard Par Jao</button>
          </div>
        </div>
      );
    }
    // ── PROFILE ──────────────────────────────
    if (activeMenu==="profile") return (
      <div className="fade-up" style={{maxWidth:520}}>
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>👤 {t.profile}</h2>
        <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#00C9A7,#00695C)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,border:`3px solid ${accent}`,margin:"0 auto 10px"}}>
                {profilePhoto?<img src={profilePhoto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"👤"}
              </div>
              <label htmlFor="photoInput" style={{position:"absolute",bottom:10,right:-4,background:accent,borderRadius:"50%",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13}}>📷</label>
              <input id="photoInput" type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoUpload}/>
            </div>
            <div style={{color:th.text,fontWeight:800,fontSize:16}}>{userName}</div>
            <div style={{color:accent,fontSize:12,fontWeight:600}}>{role==="retailer"?"🏪 Retailer":"🏢 Distributor"}</div>
          </div>
          {[
            {label:"Full Name",value:userName,setter:setUserName},
            {label:"City",value:userCity,setter:setUserCity},
            {label:"State",value:userState,setter:setUserState},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <label style={labelStyle}>{f.label}</label>
              <input style={fieldStyle} value={f.value} onChange={e=>f.setter(e.target.value)} placeholder={f.label}/>
            </div>
          ))}
          <button className="submit-btn" onClick={()=>showToast("✅ Profile updated!")}>💾 {t.saveProfile}</button>
        </div>
      </div>
    );

    // ── RECHARGE HISTORY ─────────────────────
    if (activeMenu==="rechargeHist") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>📄 {t.rechargeHist}</h2>
        <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
              {[t.serialNo,t.mobile,"Service",t.amount,t.status,t.date].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{RECHARGE_DATA.map((r,i)=>(
              <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                <td style={{padding:"12px 14px",color:th.text}}>{r.mobile}</td>
                <td style={{padding:"12px 14px",color:th.text}}>{r.service}</td>
                <td style={{padding:"12px 14px",color:th.text,fontWeight:700}}>{r.amount}</td>
                <td style={{padding:"12px 14px"}}>{statusBadge(r.status)}</td>
                <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );

    // ── WALLET HISTORY ───────────────────────
    if (activeMenu==="walletHist") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>💼 {t.walletHist}</h2>
        <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
              {[t.serialNo,t.description,t.type,t.amount,"Balance",t.date].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{walletTxns.map((r,i)=>(
              <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                <td style={{padding:"12px 14px",color:th.text}}>{r.desc}</td>
                <td style={{padding:"12px 14px"}}><span style={{color:r.type==="Credit"?"#00C9A7":"#FF6B6B",fontWeight:700}}>{r.type==="Credit"?"↑":"↓"} {r.type}</span></td>
                <td style={{padding:"12px 14px",color:r.type==="Credit"?"#00C9A7":"#FF6B6B",fontWeight:700}}>{r.amount}</td>
                <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.balance}</td>
                <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );

    // ── TRAINING ─────────────────────────────
    if (activeMenu==="training") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>🎬 {t.training}</h2>
        <div style={{background:th.statBg,borderRadius:16,padding:40,textAlign:"center",boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
          <div style={{fontSize:60,marginBottom:16}}>🎬</div>
          <h3 style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:10}}>{t.comingSoon}</h3>
          <p style={{color:th.subtext,fontSize:14}}>{t.comingSoonDesc}</p>
        </div>
      </div>
    );

    // ── DEFAULT OTHER MENUS ──────────────────
    return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>
          {activeMenu==="aadhar"?"🪪 Aadhar Card Service":activeMenu==="voter"?"🗳️ Voter Card Services":activeMenu==="pan"?"📋 Pan Card Services":activeMenu==="marksheet"?"📝 Manual Marksheet":activeMenu==="nios"?"📄 NIOS Marksheet":"🏠 Haryana Resident Manual"}
        </h2>
        <div style={{background:th.statBg,borderRadius:16,padding:30,boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>
          <p style={{color:th.subtext,fontSize:14,marginBottom:16}}>Sub-service select karo 👈 sidebar se</p>
          {SUB_MENUS[activeMenu]&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {SUB_MENUS[activeMenu].map(s=>(
              <button key={s.id} onClick={()=>setActiveSubMenu(s)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",border:`1.5px solid ${th.border}`,borderRadius:12,background:"transparent",color:th.text,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:14,textAlign:"left"}}>
                <span style={{fontSize:22}}>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>}
        </div>
      </div>
    );
  };
  if (page==="login") return (
    <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:th.bg,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      <style>{css}</style>
      <div className="grid-bg"/><div className="blob1"/><div className="blob2"/>
      {toast&&<div className="toast-box" style={{background:toast.type==="error"?"linear-gradient(135deg,#ff5252,#c62828)":"linear-gradient(135deg,#00C9A7,#00695C)",color:"white"}}>{toast.msg}</div>}

      <div style={{position:"relative",zIndex:2,padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${th.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#00C9A7,#00695C)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🇮🇳</div>
          <div>
            <div style={{color:th.text,fontWeight:900,fontSize:17}}>{t.appName}</div>
            <div style={{color:accent,fontSize:11,fontWeight:600}}>{t.tagline}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setLang(lang==="en"?"hi":"en")} style={{background:`rgba(0,201,167,0.1)`,border:`1px solid ${th.border}`,borderRadius:8,padding:"6px 14px",color:accent,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}</button>
          <div onClick={()=>setDark(!dark)} className="toggle-track" style={{background:dark?accent:"#ccc"}}>
            <div className="toggle-thumb" style={{transform:dark?"translateX(22px)":"translateX(3px)"}}/>
          </div>
          <span style={{color:th.subtext,fontSize:13}}>{dark?"🌙":"☀️"}</span>
        </div>
      </div>

      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"28px 16px",position:"relative",zIndex:2}}>
        <div style={{background:th.card,backdropFilter:"blur(20px)",border:`1px solid ${th.border}`,borderRadius:24,padding:"32px 28px",width:"100%",maxWidth:400,boxShadow:"0 24px 64px rgba(0,0,0,0.25)"}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{width:54,height:54,borderRadius:15,background:"linear-gradient(135deg,#00C9A7,#00695C)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 10px",boxShadow:"0 6px 20px rgba(0,201,167,0.3)"}}>🇮🇳</div>
            <div style={{color:th.text,fontWeight:900,fontSize:20}}>{authTab==="login"?t.loginTitle:authTab==="forgot"?t.forgotTitle:t.registerTitle}</div>
            <div style={{color:th.subtext,fontSize:13,marginTop:3}}>{authTab==="login"?t.loginSub:authTab==="forgot"?t.forgotSub:t.registerSub}</div>
          </div>

          <div style={{display:"flex",gap:5,background:th.inputBg,padding:5,borderRadius:12,marginBottom:22}}>
            {["login","forgot","register"].map(tb=>(
              <button key={tb} className={`tab-btn${authTab===tb?" active":""}`} onClick={()=>setAuthTab(tb)}>
                {tb==="login"?"🔐 Login":tb==="forgot"?"🔑 Forgot":"✨ Register"}
              </button>
            ))}
          </div>

          {authTab==="login"&&(
            <div className="fade-up">
              <div style={{position:"relative",marginBottom:14}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>📱</span>
                <input className="form-input" placeholder={t.mobileLabel} type="tel" value={loginMobile} onChange={e=>setLoginMobile(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:8}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔒</span>
                <input className="form-input" placeholder={t.passwordLabel} type={showPass?"text":"password"} value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{paddingRight:44}}/>
                <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16}}>{showPass?"🙈":"👁️"}</button>
              </div>
              <div style={{textAlign:"right",marginBottom:16}}><button className="link-btn" onClick={()=>setAuthTab("forgot")}>{t.forgotLink}</button></div>
              <button className="submit-btn" onClick={handleLogin} disabled={loading}>{loading?<><span className="spinner"/>{t.loginBtn}...</>:t.loginBtn}</button>
              <div style={{textAlign:"center",marginTop:14}}>
                <span style={{color:th.subtext,fontSize:13}}>{t.noAccount} </span>
                <button className="link-btn" onClick={()=>setAuthTab("register")}>{t.registerLink}</button>
              </div>
            </div>
          )}

          {authTab==="forgot"&&(
            <div className="fade-up">
              {forgotStep==="mobile"&&<>
                <div style={{background:"rgba(249,168,38,0.1)",border:"1px solid rgba(249,168,38,0.25)",borderRadius:12,padding:"12px 14px",marginBottom:18,color:"#F9A826",fontSize:13,fontWeight:600}}>⚠️ Registered mobile daalo — OTP screen par aayega</div>
                <div style={{position:"relative",marginBottom:16}}>
                  <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>📱</span>
                  <input className="form-input" placeholder={t.mobileLabel} type="tel" maxLength={10} value={forgotMobile} onChange={e=>setForgotMobile(e.target.value)}/>
                </div>
                <button className="submit-btn" onClick={handleSendOtp} disabled={loading}>{loading?<><span className="spinner"/>Sending...</>:"📨 OTP Bhejo"}</button>
              </>}
              {forgotStep==="otp"&&<>
                <div style={{background:"rgba(0,201,167,0.08)",border:"1px solid rgba(0,201,167,0.2)",borderRadius:12,padding:"12px 14px",marginBottom:18,color:"#00C9A7",fontSize:13,fontWeight:600}}>✅ OTP screen par dikhaya gaya hai — woh daalo</div>
                <div style={{position:"relative",marginBottom:16}}>
                  <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔐</span>
                  <input className="form-input" placeholder="6 digit OTP" type="tel" maxLength={6} value={enteredOtp} onChange={e=>setEnteredOtp(e.target.value)}/>
                </div>
                <button className="submit-btn" onClick={handleVerifyOtp}>✅ OTP Verify Karo</button>
                <div style={{textAlign:"center",marginTop:12}}><button className="link-btn" onClick={()=>setForgotStep("mobile")}>← Wapas</button></div>
              </>}
              {forgotStep==="newpass"&&<>
                <div style={{background:"rgba(0,201,167,0.08)",border:"1px solid rgba(0,201,167,0.2)",borderRadius:12,padding:"12px 14px",marginBottom:18,color:"#00C9A7",fontSize:13,fontWeight:600}}>✅ OTP sahi hai! Naya password set karo</div>
                <div style={{position:"relative",marginBottom:12}}>
                  <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔒</span>
                  <input className="form-input" placeholder="Naya Password" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)}/>
                </div>
                <div style={{position:"relative",marginBottom:16}}>
                  <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>✅</span>
                  <input className="form-input" placeholder="Password Confirm Karo" type="password" value={newPassConfirm} onChange={e=>setNewPassConfirm(e.target.value)}/>
                </div>
                <button className="submit-btn" onClick={handleResetPass}>🔐 Password Reset Karo</button>
              </>}
              <div style={{textAlign:"center",marginTop:14}}><button className="link-btn" onClick={()=>{setAuthTab("login");setForgotStep("mobile");}}>{t.backLogin}</button></div>
            </div>
          )}

          {authTab==="register"&&(
            <div className="fade-up">
              <div style={{marginBottom:14}}>
                <div style={{color:th.subtext,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t.selectRole}</div>
                <div style={{display:"flex",gap:10}}>
                  {[{id:"retailer",icon:"🏪",label:t.retailer,sub:t.retailerSub},{id:"distributor",icon:"🏢",label:t.distributor,sub:t.distributorSub}].map(r=>(
                    <button key={r.id} className={`role-btn${role===r.id?" active":""}`} onClick={()=>setRole(r.id)}>
                      <span style={{fontSize:22}}>{r.icon}</span><span>{r.label}</span><span style={{fontSize:10,opacity:0.7}}>{r.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>👤</span>
                <input className="form-input" placeholder={t.fullName} value={regName} onChange={e=>setRegName(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>📱</span>
                <input className="form-input" placeholder={t.mobileLabel} type="tel" maxLength={10} value={regMobile} onChange={e=>setRegMobile(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>🔒</span>
                <input className="form-input" placeholder={t.passwordLabel} type="password" value={regPass} onChange={e=>setRegPass(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:16}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>✅</span>
                <input className="form-input" placeholder={t.confirmPass} type="password" value={regConfirm} onChange={e=>setRegConfirm(e.target.value)}/>
              </div>
              <button className="submit-btn" onClick={handleRegister} disabled={loading}>
                {loading?<><span className="spinner"/>{t.registerBtn}...</>:`${role==="retailer"?"🏪":"🏢"} ${t.registerBtn}`}
              </button>
              <div style={{textAlign:"center",marginTop:12}}>
                <span style={{color:th.subtext,fontSize:13}}>{t.haveAccount} </span>
                <button className="link-btn" onClick={()=>setAuthTab("login")}>Login</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:th.bg,display:"flex",flexDirection:"column",transition:"background 0.3s"}}>
      <style>{css}</style>
      {toast&&<div className="toast-box" style={{background:toast.type==="error"?"linear-gradient(135deg,#ff5252,#c62828)":"linear-gradient(135deg,#00C9A7,#00695C)",color:"white"}}>{toast.msg}</div>}

      <div style={{background:th.topbar,padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 20px rgba(0,0,0,0.2)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{background:"none",border:"none",color:"white",fontSize:20,cursor:"pointer"}}>☰</button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🇮🇳</div>
            <span style={{color:"white",fontWeight:900,fontSize:16}}>{t.appName}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setLang(lang==="en"?"hi":"en")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"5px 12px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}</button>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:14}}>{dark?"🌙":"☀️"}</span>
            <div onClick={()=>setDark(!dark)} className="toggle-track" style={{background:dark?accent:"rgba(255,255,255,0.3)"}}>
              <div className="toggle-thumb" style={{transform:dark?"translateX(22px)":"translateX(3px)"}}/>
            </div>
          </div>
          <div style={{position:"relative"}}>
            <button className="icon-btn" onClick={()=>setNotifOpen(!notifOpen)}>🔔</button>
            <span style={{position:"absolute",top:-3,right:-3,background:"#FF6B6B",color:"white",borderRadius:"50%",width:16,height:16,fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>3</span>
            {notifOpen&&(
              <div className="notif-panel">
                <div style={{padding:"14px 16px",borderBottom:`1px solid ${th.border}`,fontWeight:800,color:th.text}}>🔔 {t.notifications}</div>
                {["Aadhar service active","Wallet credited ₹500","New update available"].map((n,i)=>(
                  <div key={i} style={{padding:"12px 16px",borderBottom:`1px solid ${th.border}`,color:th.text,fontSize:13,cursor:"pointer"}}>🔹 {n}</div>
                ))}
              </div>
            )}
          </div>
          <div onClick={()=>{setActiveMenu("profile");setActiveSubMenu(null);}} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",background:"rgba(255,255,255,0.12)",borderRadius:10,padding:"5px 12px 5px 6px"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#00C9A7,#00695C)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
              {profilePhoto?<img src={profilePhoto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"👤"}
            </div>
            <div>
              <div style={{color:"white",fontWeight:800,fontSize:13}}>{userName}</div>
              <div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>{userCity}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:"flex",flex:1}}>
        <div style={{width:sidebarOpen?224:0,overflow:"hidden",background:th.sidebar,transition:"width 0.3s ease",display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"3px 0 16px rgba(0,0,0,0.12)"}}>
          <div style={{margin:"14px 12px",background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"13px 14px",border:"1px solid rgba(255,255,255,0.12)"}}>
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{t.walletBal}</div>
            <div style={{color:"white",fontWeight:900,fontSize:22,marginTop:2}}>₹ {walletBalance.toLocaleString("en-IN")}.00</div>
            <button onClick={()=>{setActiveMenu("addMoney");setActiveSubMenu(null);setAddMoneyStep("input");}} style={{marginTop:8,width:"100%",padding:"7px 0",border:"none",borderRadius:8,background:"rgba(255,255,255,0.2)",color:"white",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>+ {t.addMoneyBtn}</button>
          </div>
          <nav style={{padding:"4px 10px",flex:1,overflowY:"auto"}}>
            {[{id:"dashboard",icon:"⊞",key:"dashboard"},{id:"addMoney",icon:"💰",key:"addMoney"}].map(item=>(
              <div key={item.id} className={`nav-item${activeMenu===item.id&&!activeSubMenu?" active":""}`} onClick={()=>handleMenuClick(item.id)}>
                <span style={{fontSize:15}}>{item.icon}</span><span>{t[item.key]}</span>
              </div>
            ))}
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:1.5,padding:"10px 6px 4px"}}>{t.services}</div>
            {[
              {id:"aadhar",    icon:"🪪", key:"aadhar"},
              {id:"voter",     icon:"🗳️", key:"voter"},
              {id:"pan",       icon:"📋", key:"pan"},
              {id:"marksheet", icon:"📝", key:"vehicle"},
              {id:"nios",      icon:"📄", key:"ration"},
              {id:"haryana",   icon:"🏠", key:"dl"},
            ].map(item=>(
              <div key={item.id}>
                <div className={`nav-item${activeMenu===item.id&&!activeSubMenu?" active":""}`} onClick={()=>handleMenuClick(item.id)}>
                  <span style={{fontSize:15}}>{item.icon}</span>
                  <span style={{flex:1}}>{t[item.key]}</span>
                  {SUB_MENUS[item.id]&&<span style={{fontSize:12,transition:"transform 0.2s",display:"inline-block",transform:expandedMenu===item.id?"rotate(90deg)":"none"}}>›</span>}
                </div>
                {SUB_MENUS[item.id]&&expandedMenu===item.id&&SUB_MENUS[item.id].map(sub=>(
                  <div key={sub.id} className={`sub-item${activeSubMenu?.id===sub.id?" active":""}`} onClick={()=>setActiveSubMenu(sub)}>
                    <span>{sub.icon}</span><span>{sub.label}</span>
                  </div>
                ))}
              </div>
            ))}
            {[
              {id:"profile",      icon:"👤", key:"profile"},
              {id:"rechargeHist", icon:"📄", key:"rechargeHist"},
              {id:"walletHist",   icon:"💼", key:"walletHist"},
            ].map(item=>(
              <div key={item.id} className={`nav-item${activeMenu===item.id&&!activeSubMenu?" active":""}`} onClick={()=>handleMenuClick(item.id)}>
                <span style={{fontSize:15}}>{item.icon}</span><span>{t[item.key]}</span>
              </div>
            ))}
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:1.5,padding:"10px 6px 4px"}}>{t.needSupport}</div>
            <div className={`nav-item${activeMenu==="training"?" active":""}`} onClick={()=>handleMenuClick("training")}>
              <span style={{fontSize:15}}>🎬</span><span>{t.training}</span>
            </div>
          </nav>
          <div style={{padding:"10px 10px 14px",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            <div className="nav-item" style={{color:"#FF8A80"}} onClick={handleLogout}>
              <span>🔒</span><span style={{fontSize:13}}>{t.logout}</span>
            </div>
          </div>
        </div>
        <div style={{flex:1,padding:22,overflowY:"auto"}}>{renderContent()}</div>
      </div>

      <div style={{position:"fixed",bottom:20,left:20,zIndex:200}}>
        {supportOpen&&(
          <div style={{position:"fixed",bottom:90,left:20,background:th.cardSolid,border:`1px solid ${th.border}`,borderRadius:16,padding:16,width:220,boxShadow:"0 16px 48px rgba(0,0,0,0.3)"}}>
            <div style={{color:th.subtext,fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${th.border}`}}>💬 {t.contactUs}</div>
            <a href="https://wa.me/918307950410" target="_blank" rel="noreferrer" className="support-btn-item" style={{color:th.text}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#25D36620",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div>
              <div><div style={{fontWeight:700,fontSize:14,color:"#25D366"}}>{t.whatsappChat}</div><div style={{fontSize:12,color:th.subtext}}>+91 83079 50410</div></div>
            </a>
            <a href="tel:+918307950410" className="support-btn-item" style={{color:th.text}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#2196F320",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📞</div>
              <div><div style={{fontWeight:700,fontSize:14,color:"#2196F3"}}>{t.callUs}</div><div style={{fontSize:12,color:th.subtext}}>+91 83079 50410</div></div>
            </a>
          </div>
        )}
        <button onClick={()=>setSupportOpen(!supportOpen)} style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#25D366,#128C7E)",border:"none",cursor:"pointer",fontSize:22,boxShadow:"0 6px 20px rgba(37,211,102,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          {supportOpen?"✕":"💬"}
        </button>
      </div>
    </div>
  );
}        
