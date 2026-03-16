import { useState, useRef } from "react";
import { generateNIOSPdf } from "@/utils/generateNIOSPdf";

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
  marksheet:[
    {id:"marksheet_10", icon:"📝", label:"10th Marksheet"},
    {id:"marksheet_12", icon:"📝", label:"12th Marksheet"},
  ],
  nios:[
    {id:"nios_form", icon:"📄", label:"NIOS Certificate Manual"},
  ],
  haryana:[
    {id:"haryana_form", icon:"🏠", label:"Haryana Resident Manual"},
  ],
};

const RECHARGE_DATA = [
  {sn:"001", mobile:"98765XXXXX", service:"Aadhar Manual Print",  amount:"₹50",  status:"Success", date:"07 Mar 2026"},
  {sn:"002", mobile:"87654XXXXX", service:"PAN Manual",            amount:"₹120", status:"Success", date:"07 Mar 2026"},
  {sn:"003", mobile:"76543XXXXX", service:"Voter Manual Print",    amount:"₹80",  status:"Pending", date:"06 Mar 2026"},
  {sn:"004", mobile:"65432XXXXX", service:"NIOS Marksheet",        amount:"₹200", status:"Success", date:"06 Mar 2026"},
  {sn:"005", mobile:"54321XXXXX", service:"Aadhar Print List",     amount:"₹50",  status:"Failed",  date:"05 Mar 2026"},
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
  const [userName, setUserName]   = useState("Farhan Khan");
  const [userCity, setUserCity]   = useState("Alwar");
  const [userState, setUserState] = useState("Rajasthan");
  const [walletBalance, setWalletBalance] = useState(2450);
  const [walletTxns, setWalletTxns]       = useState([]);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [panPrintList, setPanPrintList]     = useState([]);
  const [voterPrintList, setVoterPrintList] = useState([]);
  const [aadharPrintList, setAadharPrintList] = useState([]);
  const [addMoneyStep, setAddMoneyStep]   = useState("input");
  const [addAmount, setAddAmount]         = useState("");
  const [qrTimer, setQrTimer]             = useState(600);
  const [regName, setRegName]             = useState("");
  const [regMobile, setRegMobile]         = useState("");
  const [regEmail, setRegEmail]           = useState("");
  const [regPass, setRegPass]             = useState("");
  const [regConfirm, setRegConfirm]       = useState("");
  const [forgotMobile, setForgotMobile]   = useState("");
  const [forgotOtp, setForgotOtp]         = useState("");
  const [enteredOtp, setEnteredOtp]       = useState("");
  const [forgotStep, setForgotStep]       = useState("mobile");
  const [newPass, setNewPass]             = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  // ── FORM STATES ──────────────────────────
  // Voter Manual
  const [vEpic, setVEpic]     = useState("");
  const [vName, setVName]     = useState("");
  const [vPhoto, setVPhoto]   = useState(null);
  // PAN Manual
  const [pNo, setPNo]         = useState("");
  const [pName, setPName]     = useState("");
  const [pFather, setPFather] = useState("");
  const [pDob, setPDob]       = useState("");
  const [pGender, setPGender] = useState("");
  const [pPhoto, setPPhoto]   = useState(null);
  const [pSign, setPSign]     = useState(null);
  // 10th Marksheet
  const [m10, setM10] = useState({nameEn:"",nameHi:"",motherEn:"",motherHi:"",fatherEn:"",fatherHi:"",schoolEn:"",schoolHi:"",subjects:[{s:"",m:"",t:"",g:""},{s:"",m:"",t:"",g:""},{s:"",m:"",t:"",g:""},{s:"",m:"",t:"",g:""},{s:"",m:"",t:"",g:""},{s:"",m:"",t:"",g:""}],grand:"",year:"",date:"",district:"",sr:"",roll:"",code:"",cert:"",photo:null});
  // 12th Marksheet
  const [m12, setM12] = useState({nameEn:"",nameHi:"",motherEn:"",motherHi:"",fatherEn:"",fatherHi:"",schoolEn:"",schoolHi:"",subjects:[{s:"",m:"",t:""},{s:"",m:"",t:""},{s:"",m:"",t:""},{s:"",m:"",t:""},{s:"",m:"",t:""},{s:"",m:"",t:""}],grand:"",year:"",date:"",district:"",sr:"",roll:"",code:"",cert:"",photo:null});
  // NIOS
  const [nEnroll, setNEnroll] = useState("");
  const [nName, setNName]     = useState("");
  const [nCourse, setNCourse] = useState("");
  const [nFather, setNFather] = useState("");
  const [nMother, setNMother] = useState("");
  const [nDob, setNDob]       = useState("");
  const [nYear, setNYear]     = useState("");
  const [nMonth, setNMonth]   = useState("");
  const [nPhoto, setNPhoto]   = useState(null);
  const [nFile, setNFile]     = useState(null);
  // nPhotoFile: raw File object for pdf-lib (nPhoto is base64 for preview only)
  const [nPhotoFile, setNPhotoFile] = useState(null);
  // NIOS PDF generation loading state
  const [nPdfLoading, setNPdfLoading] = useState(false);
  // Subject marks state — one object per subject
  const [nSubjects, setNSubjects] = useState({
    hindi:          { theory:"", practical:"", tma_internal:"", total:"", result:"" },
    mathematics:    { theory:"", practical:"", tma_internal:"", total:"", result:"" },
    science:        { theory:"", practical:"", tma_internal:"", total:"", result:"" },
    english:        { theory:"", practical:"", tma_internal:"", total:"", result:"" },
    social_science: { theory:"", practical:"", tma_internal:"", total:"", result:"" },
  });
  const [nOverallResult, setNOverallResult] = useState("");
  // Haryana
  const [hy, setHy] = useState({name:"",father:"",place:"",mother:"",house:"",tahsil:"",district:"",pin:"",landmark:"",vill:"",town:"",photo:null});
  const timerRef = useRef(null);
  const t = T[lang];
  const accent = "#00C9A7";

  // ── Helper: update a single field inside a NIOS subject marks object ──────────
  const updateNSubject = (subjectKey, field, value) => {
    setNSubjects(prev => ({
      ...prev,
      [subjectKey]: { ...prev[subjectKey], [field]: value },
    }));
  };

  // ── NIOS PDF download handler — called after payment succeeds ─────────────────
  const downloadNiosPDF = async () => {
    setNPdfLoading(true);
    try {
      await generateNIOSPdf({
        enrolment_no:   nEnroll,
        candidate_name: nName,
        course:         nCourse,
        dob:            nDob,
        mother_name:    nMother,
        father_name:    nFather,
        exam_year:      nYear,
        exam_month:     nMonth,
        overall_result: nOverallResult,
        photo:          nPhotoFile,
        subjects:       nSubjects,
      });
    } catch (err) {
      showToast("❌ PDF generate nahi hua: " + err.message, "error");
      console.error(err);
    } finally {
      setNPdfLoading(false);
    }
  };

  // ── PDF FUNCTIONS ─────────────────────────
  const addImgToPdf = (doc, imgData, x, y, w, h) => {
    if(!imgData) return;
    try { doc.addImage(imgData, "JPEG", x, y, w, h); } catch(e) {}
  };

  // ── RAZORPAY PAYMENT ─────────────────────
  const SERVICE_CHARGES = {
    aadhar_manual: 1000, voter_manual: 2000, pan_manual: 3000, pan_find: 3500,
    marksheet_10: 3000, marksheet_12: 3000, nios_form: 2000, haryana_form: 3000,
    add_money: 0,
  };
      const loadRazorpay = () => new Promise(resolve => {
    if(window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const initiatePayment = async (serviceId, serviceName, onSuccess, customAmount) => {
    const loaded = await loadRazorpay();
    if(!loaded) { showToast("❌ Payment gateway load nahi hua!", "error"); return; }
    const amt = customAmount || SERVICE_CHARGES[serviceId] || 1000;
    const options = {
      key: "rzp_test_SQgvLFJZubGAAr",
      amount: amt,
      currency: "INR",
      name: "SevaZone",
      description: serviceName,
      image: "https://via.placeholder.com/60x60/00C9A7/ffffff?text=SZ",
      handler: function(response) {
        showToast("✅ Payment successful! PDF download ho rahi hai...");
        const now = new Date();
        const ds = now.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
        const charge = amt/100;
        setWalletTxns(prev=>{const newBal=walletBalance-charge;return [{sn:String(prev.length+1).padStart(3,"0"),desc:serviceName,type:"Debit",amount:`₹${charge}`,balance:`₹${newBal.toLocaleString("en-IN")}`,date:ds},...prev];});
        setRechargeHistory(prev=>[{sn:String(prev.length+1).padStart(3,"0"),mobile:"—",service:serviceName,amount:`₹${charge}`,status:"Success",date:ds},...prev]);
        setTimeout(onSuccess, 500);
      },
      prefill: { name: userName, contact: "" },
      theme: { color: "#00C9A7" },
      modal: { ondismiss: () => showToast("⚠️ Payment cancel kar di!", "error") }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const downloadVoterPDF = () => {
    const doc = new jsPDF({orientation:"landscape",unit:"mm",format:[85.6,54]});
    const W=85.6, H=54;
    // Pink/salmon background
    doc.setFillColor(230,180,160); doc.rect(0,0,W,H,"F");
    // Dotted border
    doc.setDrawColor(180,80,40); doc.setLineWidth(0.5);
    doc.setLineDashPattern([1,1],0);
    doc.rect(2,2,W-4,H-4);
    doc.setLineDashPattern([],0);
    // Header
    doc.setFillColor(200,60,30); doc.rect(3,3,W-6,8,"F");
    doc.setFontSize(5); doc.setFont("helvetica","bold"); doc.setTextColor(255,255,255);
    doc.text("भारत निर्वाचन आयोग", W/2,6,{align:"center"});
    doc.text("ELECTION COMMISSION OF INDIA", W/2,9,{align:"center"});
    // EPIC watermark text
    doc.setTextColor(220,150,130); doc.setFontSize(7);
    for(let i=0;i<5;i++) doc.text("EPIC",3,15+i*8);
    // Photo box
    if(vPhoto) addImgToPdf(doc,vPhoto,4,12,18,22);
    else { doc.setFillColor(200,160,140); doc.rect(4,12,18,22,"F"); doc.setTextColor(100,40,20); doc.setFontSize(5); doc.text("Photo",7,24); }
    // Card title
    doc.setTextColor(255,200,0); doc.setFontSize(5); doc.setFont("helvetica","bold");
    doc.text("मतदाता फोटो पहचान पत्र - ELECTOR PHOTO IDENTITY CARD", 24,14,{maxWidth:55});
    // EPIC no
    doc.setTextColor(0,0,0); doc.setFontSize(7); doc.setFont("helvetica","bold");
    doc.text(vEpic||"EPIC NO", 24,20);
    // Details
    doc.setFontSize(5); doc.setFont("helvetica","normal"); doc.setTextColor(80,20,10);
    doc.text("नाम / Name", 4,37);
    doc.setFont("helvetica","bold"); doc.text(": "+(vName||""), 22,37);
    doc.setFont("helvetica","normal");
    doc.text("पति/पिता का नाम", 4,41);
    doc.setFont("helvetica","bold"); doc.text(": ", 22,41);
    // Date
    doc.setFont("helvetica","normal"); doc.setFontSize(5);
    doc.text("Date: "+new Date().toLocaleDateString("en-IN"), 4,50);
    doc.setFont("helvetica","bold"); doc.setFontSize(4); doc.setTextColor(180,60,20);
    doc.text("निर्वाचक रजिस्ट्रीकरण अधिकारी / Electoral Registration Officer", 24,50,{maxWidth:55});
    doc.save("voter_"+( vEpic||"manual")+".pdf");
    const now = new Date();
    setVoterPrintList(prev=>[{sn:String(prev.length+1).padStart(3,"0"),epicNo:vEpic||"—",name:vName||"—",date:now.toLocaleString("en-IN")},...prev]);
  };

  const downloadPanPDF = () => {
    const doc = new jsPDF({orientation:"landscape",unit:"mm",format:[85.6,54]});
    const W=85.6, H=54;
    // Blue gradient background
    doc.setFillColor(100,160,220); doc.rect(0,0,W,H,"F");
    doc.setFillColor(140,190,240); doc.rect(0,0,W,20,"F");
    // Border
    doc.setDrawColor(60,100,180); doc.setLineWidth(0.8);
    doc.rect(1,1,W-2,H-2);
    // Header
    doc.setFontSize(6); doc.setFont("helvetica","bold"); doc.setTextColor(20,40,120);
    doc.text("आयकर विभाग", 12,8);
    doc.text("INCOME TAX DEPARTMENT", 12,12);
    doc.setTextColor(20,60,150);
    doc.text("भारत सरकार", W-8,8,{align:"right"});
    doc.text("GOVT. OF INDIA", W-8,12,{align:"right"});
    // Subheading
    doc.setFontSize(5); doc.setTextColor(30,30,120);
    doc.text("स्थायी लेखा संख्या कार्ड / Permanent Account Number Card", W/2,16,{align:"center"});
    // PAN number
    doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.setTextColor(20,20,100);
    doc.text(pNo||"XXXXXXXXXX", W/2,22,{align:"center"});
    // Photo
    if(pPhoto) addImgToPdf(doc,pPhoto,4,18,15,20);
    else { doc.setFillColor(180,200,230); doc.rect(4,18,15,20,"F"); doc.setFontSize(4); doc.setTextColor(60,80,150); doc.text("Photo",6,29); }
    // QR placeholder
    doc.setFillColor(255,255,255); doc.rect(62,15,18,18,"F");
    doc.setFontSize(4); doc.setTextColor(0,0,0);
    doc.text("QR",68,25);
    // Details
    doc.setFontSize(5); doc.setTextColor(20,20,80);
    doc.text("नाम / Name", 22,27); doc.setFont("helvetica","bold"); doc.text(pName||"", 22,31);
    doc.setFont("helvetica","normal");
    doc.text("पिता का नाम / Father's Name", 22,35); doc.setFont("helvetica","bold"); doc.text(pFather||"", 22,39);
    doc.setFont("helvetica","normal");
    doc.text("जन्म को तारीख / Date of Birth", 22,43); doc.setFont("helvetica","bold"); doc.text(pDob||"", 22,47);
    // Signature
    doc.setFont("helvetica","normal"); doc.setFontSize(4); doc.setTextColor(60,60,120);
    if(pSign) addImgToPdf(doc,pSign,48,43,15,7);
    doc.text("हस्ताकर / Signature", 48,51);
    doc.save("pan_"+(pNo||"manual")+".pdf");
    const now = new Date();
    setPanPrintList(prev=>[{sn:String(prev.length+1).padStart(3,"0"),panNo:pNo||"—",name:pName||"—",dob:pDob||"—",date:now.toLocaleDateString("en-IN")},...prev]);
  };
        const downloadNiosPDF = () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210, ml=15, mr=195;
    // Border
    doc.setDrawColor(0); doc.setLineWidth(0.8);
    doc.rect(8,8,W-16,279);
    // Header
    doc.setFontSize(14); doc.setFont("helvetica","bold"); doc.setTextColor(0,0,0);
    doc.text("राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान", W/2,20,{align:"center"});
    doc.text("National Institute of Open Schooling", W/2,28,{align:"center"});
    doc.setFontSize(8); doc.setFont("helvetica","normal");
    doc.text("(An autonomous Institution under Ministry of Education, Govt. of India)", W/2,34,{align:"center"});
    doc.setLineWidth(0.3); doc.line(ml,37,mr,37);
    doc.setFontSize(12); doc.setFont("helvetica","bold");
    doc.text("Academic Examination Result", W/2,44,{align:"center"});
    doc.line(ml,47,mr,47);
    // Photo & QR
    if(nPhoto) addImgToPdf(doc,nPhoto,155,50,30,36);
    else { doc.rect(155,50,30,36); doc.setFontSize(7); doc.text("Photo",164,70); }
    doc.rect(155,89,20,20); doc.setFontSize(6); doc.text("QR",163,100);
    // Student details
    doc.setFontSize(10); doc.setFont("helvetica","normal"); doc.setTextColor(0,0,0);
    const det = [
      ["Enrolment No", nEnroll||""],
      ["Course", nCourse||"Secondary"],
      ["Candidate Name", nName||""],
      ["DOB", nDob||""],
      ["Mother's Name", nMother||""],
      ["Father's Name", nFather||""],
      ["Examination Year", nYear||""],
      ["Month/Block", nMonth||""],
    ];
    det.forEach(([k,v],i)=>{ doc.text(k,ml,56+i*8); doc.text(":",65,56+i*8); doc.setFont("helvetica","bold"); doc.text(v,70,56+i*8); doc.setFont("helvetica","normal"); });
    // Table
    let y=124;
    const tcols=[ml,45,110,130,150,165,180];
    const thead=["Subject Code","Subject Name","Theory","Practical","TMA /\nInternal","Total","Result"];
    doc.setLineWidth(0.4);
    doc.rect(ml,y,mr-ml,12);
    doc.setFont("helvetica","bold"); doc.setFontSize(8);
    thead.forEach((h,i)=>{ if(i>0) doc.line(tcols[i],y,tcols[i],y+12); h.split("\n").forEach((l,li)=>doc.text(l,tcols[i]+1,y+5+li*5)); });
    y+=12; doc.setFont("helvetica","normal"); doc.setFontSize(9);
    const subjects=[{code:"201",name:"HINDI"},{code:"211",name:"MATHEMATICS"},{code:"212",name:"SCIENCE/SCI.&TECH."},{code:"202",name:"ENGLISH"},{code:"213",name:"SOCIAL SCIENCE"}];
    subjects.forEach((sub,i)=>{ const rH=10; doc.rect(ml,y,mr-ml,rH); tcols.slice(1).forEach(c=>doc.line(c,y,c,y+rH)); doc.text(sub.code,ml+1,y+7); doc.text(sub.name,46,y+7); doc.text("P",181,y+7); y+=rH; });
    // Result
    doc.rect(ml,y,mr-ml,10); doc.setFont("helvetica","bold");
    doc.text("Result: PASS", W/2,y+7,{align:"center"});
    y+=18;
    doc.setFont("helvetica","normal"); doc.setFontSize(8);
    doc.text("Note: Marksheet-cum-Passing certificate will be issued to only those students who have completely passed",ml,y,{maxWidth:mr-ml});
    y+=14;
    doc.setFontSize(8); doc.setTextColor(100);
    doc.text("Generated by SevaZone | Support: +91 8307950410", W/2,285,{align:"center"});
    doc.save("nios_certificate.pdf");
  };

  const downloadHaryanaPDF = () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210, ml=15, mr=195;
    // Orange border double
    doc.setDrawColor(220,100,20); doc.setLineWidth(4);
    doc.rect(6,6,W-12,285);
    doc.setLineWidth(1);
    doc.rect(10,10,W-20,277);
    // Top IDs
    doc.setFillColor(0,100,200); doc.rect(ml,15,45,8,"F");
    doc.setTextColor(255); doc.setFontSize(7); doc.setFont("helvetica","bold");
    doc.text("Family Id",ml+2,20); doc.text("5BEN2025876",ml+18,20);
    doc.setFillColor(0,100,200); doc.rect(mr-55,15,45,8,"F");
    doc.text("eDisHa",mr-53,20); doc.text("0197157275",mr-38,20);
    // Title
    doc.setTextColor(220,100,20); doc.setFontSize(16); doc.setFont("helvetica","bold");
    doc.text("Government of Haryana", W/2,40,{align:"center"});
    doc.setFontSize(20); doc.setTextColor(0,0,0);
    doc.text("Haryana Resident Certificate", W/2,55,{align:"center"});
    // Photo
    if(hy.photo) addImgToPdf(doc,hy.photo,155,65,35,42);
    else { doc.setDrawColor(200,150,50); doc.setLineWidth(0.5); doc.rect(155,65,35,42); doc.setFontSize(7); doc.setTextColor(100); doc.text("Photo",167,88); }
    // Body text
    doc.setFontSize(11); doc.setFont("helvetica","normal"); doc.setTextColor(0,0,0);
    const body = `Certified that Mr./Mrs. ${hy.name||"_____"} s/o Sh. ${hy.father||"_____"} resident of H.No.-${hy.house||"_____"} ,Landmark-${hy.landmark||"_____"} , Vill/Town-${hy.vill||"_____"}, District-${hy.district||"_____"}, Pin-${hy.pin||"_____"}, Town-${hy.town||"_____"}, Tehsil-${hy.tahsil||"_____"}, District-${hy.district||"_____"} was born or residing in Haryana State as verified by Tehsildar.`;
    const lines = doc.splitTextToSize(body, 130);
    doc.text(lines, ml, 75);
    // Validity
    let y=130;
    doc.setFontSize(10);
    const validity = "The validity of Resident Certificate shall be as long as the holder of this certificate maintains his residential address in Haryana State Instructions No. 22/28/2003- 3GS-III, dated 30-1-2004.";
    doc.text(doc.splitTextToSize(validity, mr-ml), ml, y);
    y+=30;
    // Issued by
    doc.setFont("helvetica","italic"); doc.text("Issued by:", mr-40, y);
    y+=20;
    // Footer
    doc.setFont("helvetica","normal"); doc.setFontSize(10);
    doc.text("No.: HR/"+new Date().getFullYear()+"/"+Math.floor(Math.random()*9999), ml, y+20);
    doc.text("Date : "+new Date().toLocaleDateString("en-IN"), ml, y+27);
    doc.text("Place: "+hy.town, ml, y+34);
    doc.setFont("helvetica","bold");
    doc.text("Tehsildar, "+hy.district, mr-20, y+27, {align:"right"});
    y+=50;
    doc.setLineWidth(0.3); doc.line(ml,y,mr,y); y+=8;
    doc.setFont("helvetica","italic"); doc.setFontSize(8); doc.setTextColor(80);
    doc.text("This certificate is electronically generated and authenticity of this certificate can be verified from http://edisha.gov.in", ml, y, {maxWidth:mr-ml});
    doc.setFontSize(8); doc.setTextColor(150);
    doc.text("Generated by SevaZone | Support: +91 8307950410", W/2,285,{align:"center"});
    doc.save("haryana_resident.pdf");
  };
    const readFileAsDataURL = (file, cb) => {
    const r = new FileReader();
    r.onload = e => cb(e.target.result);
    r.readAsDataURL(file);
  };

  const downloadMarksheet10PDF = () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W = 210, ml = 12, mr = 198;

    // Outer border
    doc.setDrawColor(0); doc.setLineWidth(1.5);
    doc.rect(5, 5, 200, 287);
    doc.setLineWidth(0.5);
    doc.rect(7, 7, 196, 283);

    // Top info
    doc.setFontSize(9); doc.setFont("helvetica","normal");
    doc.text("क्रमांक Serial No. : "+(m10.sr||""), ml, 14);
    doc.text("नामांकन संख्या Enrolment No. : "+(m10.roll||""), 120, 14);
    doc.text("आधार नं. Aadhaar No. : ", ml, 19);
    doc.text("अनुक्रमांक Roll No. : "+(m10.roll||""), 120, 19);

    // Photo box
    if(m10.photo) { try { doc.addImage(m10.photo,"JPEG",162,10,30,35); } catch(e){} }
    else { doc.rect(162,10,30,35); doc.setFontSize(7); doc.text("Photo",174,29); }

    // Board Header
    doc.setFontSize(16); doc.setFont("helvetica","bold");
    doc.text(m10.schoolHi||"हरियाणा विद्यालय शिक्षा बोर्ड", W/2, 26, {align:"center"});
    doc.setFontSize(13);
    doc.text("Board of School Education Haryana", W/2, 33, {align:"center"});
    doc.setFontSize(8); doc.setFont("helvetica","normal");
    doc.text("(ISO 9001 : 2015 CERTIFIED)", W/2, 38, {align:"center"});

    doc.setLineWidth(0.5);
    doc.line(ml, 40, mr, 40);

    // Exam title
    doc.setFontSize(13); doc.setFont("helvetica","bold");
    doc.text("माध्यमिक परीक्षा", W/2, 47, {align:"center"});
    doc.text("SECONDARY EXAMINATION", W/2, 54, {align:"center"});
    doc.setFontSize(9); doc.setFont("helvetica","normal");
    doc.text("योग्यता प्रमाण-पत्र सह अंकतालिका / Certificate of Qualification cum Mark Sheet", W/2, 60, {align:"center"});

    doc.line(ml, 62, mr, 62);

    // Student details
    let y = 69;
    doc.setFontSize(10);
    doc.text("प्रमाणित किया जाता है कि", ml, y);
    doc.text("This is to certify that :", ml, y+5);
    doc.setFont("helvetica","bold");
    doc.text(m10.nameEn||"", 80, y+5);
    doc.setFont("helvetica","normal");
    doc.text("पिता का नाम श्री / Father's Name Sh.", ml, y+12);
    doc.setFont("helvetica","bold");
    doc.text(m10.fatherEn||"", 80, y+12);
    doc.setFont("helvetica","normal");
    doc.text("माता का नाम सुश्री / Mother's Name Ms.", ml, y+19);
    doc.setFont("helvetica","bold");
    doc.text(m10.motherEn||"", 80, y+19);
    doc.setFont("helvetica","normal");
    doc.text("जन्म तिथि / Date of Birth :", ml, y+26);
    doc.setFont("helvetica","bold");
    doc.text(m10.date||"", 80, y+26);
    doc.setFont("helvetica","normal");
    doc.text("विद्यालय का नाम / Name of School जिला / District :", ml, y+33);
    doc.setFont("helvetica","bold");
    doc.text(m10.schoolEn||"", ml, y+40);
    doc.setFont("helvetica","normal");

    y += 50;
    doc.setFontSize(9);
    doc.text("बोर्ड द्वारा आयोजित माध्यमिक परीक्षा में प्रविष्ट हुआ / has appeared in Secondary Examination conducted by Board", ml, y);
    doc.text("held in  "+(m10.year||""), ml, y+6);

    y += 14;
    doc.line(ml, y, mr, y);

    // Marks table header
    doc.setFontSize(11); doc.setFont("helvetica","bold");
    doc.text("प्राप्तांक / Marks Obtained  परिणाम / Result", W/2, y+7, {align:"center"});
    y += 10;

    // Table
    const cols = [ml, 30, 100, 130, 155, 172, 187];
    const headers = ["क्रमांक\nSr.No.", "विषय / Subject", "प्राप्तांक\nMarks\nObtained", "न्यूनतम उत्तीर्ण अंक\nMinimum Pass\nMarks", "अधिकतम अंक\nMaximum\nMarks", "श्रेणी\nGrade", "श्रेणी अंक\nGrade\nPoint"];

    doc.setLineWidth(0.4);
    doc.rect(ml, y, mr-ml, 14);
    doc.setFontSize(7); doc.setFont("helvetica","bold");
    headers.forEach((h,i) => {
      if(i<headers.length-1) doc.line(cols[i+1], y, cols[i+1], y+14);
      const lines = h.split("\n");
      lines.forEach((l,li) => doc.text(l, cols[i]+1, y+4+li*4));
    });

    y += 14;
    doc.setFont("helvetica","normal"); doc.setFontSize(9);
    m10.subjects.forEach((sub,i) => {
      const rowH = 9;
      doc.rect(ml, y, mr-ml, rowH);
      cols.slice(1).forEach((c) => doc.line(c, y, c, y+rowH));
      doc.text(String(i+1), ml+2, y+6);
      doc.text(sub.s||"", 31, y+6);
      doc.text(sub.m||"", 104, y+6);
      doc.text("33", 134, y+6);
      doc.text(sub.t||"100", 158, y+6);
      doc.text(sub.g||"", 174, y+6);
      y += rowH;
    });

    // Total row
    doc.rect(ml, y, mr-ml, 10);
    doc.setFont("helvetica","bold"); doc.setFontSize(9);
    doc.text("कुल योग / Total Marks", ml+2, y+7);
    doc.text(m10.grand||"", 104, y+7);
    doc.text("500", 158, y+7);
    y += 18;

    // GPA
    doc.setFont("helvetica","normal"); doc.setFontSize(9);
    doc.text("General Awareness & Life Skills Grade :  VERY GOOD", ml, y);
    doc.text("Co-Curricular Activity Grade :  A", ml, y+7);

    y += 20;
    doc.line(ml, y, mr, y);
    y += 8;

    // Footer
    doc.setFontSize(10); doc.setFont("helvetica","bold");
    doc.text(m10.district||"DISTRICT", ml, y);
    doc.setFont("helvetica","normal");
    doc.text("दिनांक Dated :  "+(m10.date||""), ml, y+8);
    doc.text("जारी करने की तिथि / Issued on Dated : "+(m10.date||""), ml, y+16);
    doc.text("सचिव / SECRETARY", 155, y+16);

    doc.setFontSize(8); doc.setTextColor(150);
    doc.text("Generated by SevaZone | Support: +91 8307950410", W/2, 288, {align:"center"});
    doc.save("marksheet_10_"+(m10.roll||"manual")+".pdf");
  };

  const downloadMarksheet12PDF = () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W = 210, ml = 12, mr = 198;

    doc.setDrawColor(0); doc.setLineWidth(1.5);
    doc.rect(5, 5, 200, 287);
    doc.setLineWidth(0.5);
    doc.rect(7, 7, 196, 283);

    doc.setFontSize(9); doc.setFont("helvetica","normal");
    doc.text("क्रमांक Serial No. : "+(m12.sr||""), ml, 14);
    doc.text("नामांकन संख्या Enrolment No. : "+(m12.roll||""), 120, 14);
    doc.text("अनुक्रमांक Roll No. : "+(m12.roll||""), 120, 19);

    if(m12.photo) { try { doc.addImage(m12.photo,"JPEG",162,10,30,35); } catch(e){} }
    else { doc.rect(162,10,30,35); doc.setFontSize(7); doc.text("Photo",174,29); }

    doc.setFontSize(16); doc.setFont("helvetica","bold");
    doc.text(m12.schoolHi||"हरियाणा विद्यालय शिक्षा बोर्ड", W/2, 26, {align:"center"});
    doc.setFontSize(13);
    doc.text("Board of School Education Haryana", W/2, 33, {align:"center"});
    doc.setFontSize(8); doc.setFont("helvetica","normal");
    doc.text("(ISO 9001 : 2015 CERTIFIED)", W/2, 38, {align:"center"});

    doc.setLineWidth(0.5);
    doc.line(ml, 40, mr, 40);

    doc.setFontSize(13); doc.setFont("helvetica","bold");
    doc.text("उच्च माध्यमिक परीक्षा", W/2, 47, {align:"center"});
    doc.text("SENIOR SECONDARY EXAMINATION", W/2, 54, {align:"center"});
    doc.setFontSize(9); doc.setFont("helvetica","normal");
    doc.text("योग्यता प्रमाण-पत्र सह अंकतालिका / Certificate of Qualification cum Mark Sheet", W/2, 60, {align:"center"});
    doc.line(ml, 62, mr, 62);

    let y = 69;
    doc.setFontSize(10);
    doc.text("प्रमाणित किया जाता है कि / This is to certify that :", ml, y);
    doc.setFont("helvetica","bold"); doc.text(m12.nameEn||"", 100, y);
    doc.setFont("helvetica","normal");
    doc.text("पिता का नाम श्री / Father's Name Sh.", ml, y+8);
    doc.setFont("helvetica","bold"); doc.text(m12.fatherEn||"", 100, y+8);
    doc.setFont("helvetica","normal");
    doc.text("माता का नाम सुश्री / Mother's Name Ms.", ml, y+16);
    doc.setFont("helvetica","bold"); doc.text(m12.motherEn||"", 100, y+16);
    doc.setFont("helvetica","normal");
    doc.text("जन्म तिथि / Date of Birth :", ml, y+24);
    doc.setFont("helvetica","bold"); doc.text(m12.date||"", 100, y+24);
    doc.setFont("helvetica","normal");
    doc.text("विद्यालय का नाम / Name of School :", ml, y+32);
    doc.setFont("helvetica","bold"); doc.text(m12.schoolEn||"", ml, y+39);
    doc.setFont("helvetica","normal");

    y += 49;
    doc.setFontSize(9);
    doc.text("बोर्ड द्वारा आयोजित उच्च माध्यमिक परीक्षा में प्रविष्ट हुआ / has appeared in Senior Secondary Examination held in "+(m12.year||""), ml, y);
    y += 10;
    doc.line(ml, y, mr, y);

    doc.setFontSize(11); doc.setFont("helvetica","bold");
    doc.text("प्राप्तांक / Marks Obtained  परिणाम / Result", W/2, y+7, {align:"center"});
    y += 10;

    const cols = [ml, 30, 100, 130, 155, 172, 187];
    doc.setLineWidth(0.4);
    doc.rect(ml, y, mr-ml, 14);
    doc.setFontSize(7); doc.setFont("helvetica","bold");
    const headers = ["क्रमांक\nSr.No.", "विषय / Subject", "प्राप्तांक\nMarks\nObtained", "न्यूनतम उत्तीर्ण अंक\nMinimum Pass\nMarks", "अधिकतम अंक\nMaximum\nMarks", "श्रेणी\nGrade", "श्रेणी अंक\nGrade\nPoint"];
    headers.forEach((h,i) => {
      if(i<headers.length-1) doc.line(cols[i+1], y, cols[i+1], y+14);
      h.split("\n").forEach((l,li) => doc.text(l, cols[i]+1, y+4+li*4));
    });
      
    y += 14;
    doc.setFont("helvetica","normal"); doc.setFontSize(9);
    m12.subjects.forEach((sub,i) => {
      const rowH = 9;
      doc.rect(ml, y, mr-ml, rowH);
      cols.slice(1).forEach(c => doc.line(c, y, c, y+rowH));
      doc.text(String(i+1), ml+2, y+6);
      doc.text(sub.s||"", 31, y+6);
      doc.text(sub.m||"", 104, y+6);
      doc.text("33", 134, y+6);
      doc.text(sub.t||"100", 158, y+6);
      y += rowH;
    });

    doc.rect(ml, y, mr-ml, 10);
    doc.setFont("helvetica","bold");
    doc.text("कुल योग / Total Marks", ml+2, y+7);
    doc.text(m12.grand||"", 104, y+7);
    doc.text("500", 158, y+7);
    y += 20;

    doc.setFont("helvetica","normal"); doc.setFontSize(9);
    doc.text("General Awareness & Life Skills Grade :  VERY GOOD", ml, y);
    doc.text("Co-Curricular Activity Grade :  A", ml, y+7);
    y += 20;
    doc.line(ml, y, mr, y); y += 8;

    doc.setFontSize(10); doc.setFont("helvetica","bold");
    doc.text(m12.district||"DISTRICT", ml, y);
    doc.setFont("helvetica","normal");
    doc.text("दिनांक Dated :  "+(m12.date||""), ml, y+8);
    doc.text("जारी करने की तिथि / Issued on Dated : "+(m12.date||""), ml, y+16);
    doc.text("सचिव / SECRETARY", 155, y+16);

    doc.setFontSize(8); doc.setTextColor(150);
    doc.text("Generated by SevaZone | Support: +91 8307950410", W/2, 288, {align:"center"});
    doc.save("marksheet_12_"+(m12.roll||"manual")+".pdf");
  };

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  const getUsers = () => { try { return JSON.parse(localStorage.getItem("sz_users")||"[]"); } catch { return []; } };
  const saveUsers = (u) => { try { localStorage.setItem("sz_users", JSON.stringify(u)); } catch {} };

  const handleLogin = () => {
    if (!loginMobile||!loginPass) { showToast(t.fillFields,"error"); return; }
    if (loginMobile===DEMO_USER.mobile && loginPass===DEMO_USER.password) {
      setLoading(true);
      setTimeout(()=>{ setLoading(false); setUserName("Demo User"); setUserCity("Alwar"); setWalletBalance(2450); try{sessionStorage.setItem("sz_logged","1");}catch{} setPage("dashboard"); },1200);
      return;
    }
    const users = getUsers();
    const found = users.find(u=>(u.mobile===loginMobile || u.email===loginMobile) && u.password===loginPass);
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
    saveUsers([...users, {name:regName,mobile:regMobile,email:regEmail,password:regPass,role,city:"",state:"",wallet:0}]);
    showToast("✅ Account ban gaya! Ab login karo!");
    setRegName(""); setRegMobile(""); setRegEmail(""); setRegPass(""); setRegConfirm("");
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
      showToast("OTP: "+otp+" (Screen par hai — SMS backend baad mein lagega)","success");
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
    setRechargeHistory(prev=>[{sn:String(prev.length+1).padStart(3,"0"),mobile:"—",service:"Wallet Top-up",amount:`₹${amt}`,status:"Success",date:ds},...prev]);
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
    .divider{display:flex;align-items:center;gap:12px;margin:16px 0}
    .divider-line{flex:1;height:1px;background:${th.border}}
    .link-btn{background:none;border:none;color:#00C9A7;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px}
    .blob1{position:absolute;width:450px;height:450px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,167,0.15),transparent 70%);top:-100px;left:-100px;animation:b1 9s ease-in-out infinite}
    .blob2{position:absolute;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(0,150,136,0.12),transparent 70%);bottom:-60px;right:-60px;animation:b2 11s ease-in-out infinite}
    .grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,201,167,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,0.04) 1px,transparent 1px);background-size:40px 40px}
    .toast-box{position:fixed;top:20px;right:20px;padding:13px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:9999;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);font-family:'Outfit',sans-serif;animation:popIn 0.3s ease}
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

  // ── RENDER CONTENT ────────────────────────────
  const renderContent = () => {

    // Sub menu page
    if (activeSubMenu) {

      // ── AADHAR MANUAL PRINT FORM ─────────────
      if (activeSubMenu.id === "aadhar_manual") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🖨️ Aadhar Manual Print</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:700}}>

              {/* Row 1 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
                {[
                  {label:"Aadhar Card No.", ph:"Aadharcard No...", type:"tel"},
                  {label:"Name", ph:"Example : Raju Kumar"},
                  {label:"Father Name", ph:"Example : Shyam Singh"},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                    <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph} type={f.type||"text"}/>
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
                {[
                  {label:"House No", ph:"House No"},
                  {label:"Gali, Locality", ph:"Gali, Locality, Panchayat"},
                  {label:"Post Office", ph:"Post Office"},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                    <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
                       {/* Row 3 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
                {[
                  {label:"State", ph:"state"},
                  {label:"City", ph:"city"},
                  {label:"Pin Code", ph:"pincode", type:"tel"},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                    <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph} type={f.type||"text"}/>
                  </div>
                ))}
              </div>

              {/* Row 4 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Date Of Birth</div>
                  <input type="date" style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}/>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Date Of Birth (Local)</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Auto Fill" readOnly/>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Select Gender</div>
                  <select style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}>
                    <option value="">GENDER</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Row 5 - Gender Local + Address */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:14,marginBottom:14}}>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Gender Local</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Gender Local"/>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Address</div>
                  <textarea style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif",resize:"none",height:70}} placeholder="S/O : Mo Rahim, khurdaha, Jakhauli, Faizabad, Uttar Pradesh, 878987"/>
                </div>
              </div>

              {/* Row 6 - Image Upload */}
              <div style={{marginBottom:14}}>
                <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Select Image</div>
                <label style={{display:"inline-flex",alignItems:"center",gap:10,background:`rgba(0,201,167,0.1)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"10px 18px",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
                  <span style={{fontSize:20}}>📷</span>
                  <span style={{color:accent,fontWeight:700,fontSize:13}}>Choose File</span>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                  const file=e.target.files[0];
                  if(file){ showToast("✅ Image select ho gayi: "+file.name); }
                }}/>
                </label>
              </div>

              {/* Row 7 - Local Language */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Select Local Language</div>
                  <select style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}>
                    <option value="">SELECT</option>
                    <option>Hindi</option>
                    <option>English</option>
                    <option>Punjabi</option>
                    <option>Bengali</option>
                    <option>Tamil</option>
                    <option>Telugu</option>
                    <option>Marathi</option>
                    <option>Gujarati</option>
                    <option>Kannada</option>
                    <option>Malayalam</option>
                    <option>Odia</option>
                    <option>Urdu</option>
                  </select>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Name (Local Language)</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Local Name"/>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Address (Local Language)</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Local Address"/>
                </div>
              </div>

              {/* Submit */}
              <button className="submit-btn" onClick={()=>initiatePayment("aadhar_manual","Aadhar Manual Print - ₹10",()=>{const now=new Date();setAadharPrintList(prev=>[{sn:String(prev.length+1).padStart(3,"0"),aadharNo:"XXXX XXXX XXXX",name:"—",date:now.toLocaleString("en-IN")},...prev]);showToast("✅ Request submit ho gayi! 24 ghante mein process hoga.");})} style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}}>
                💳 Pay ₹10 & Submit
              </button>
            </div>
          </div>
        );
      }

      // ── VOTER MANUAL PRINT FORM ──────────────
      if (activeSubMenu.id === "voter_manual") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🗳️ Voter Manual Print</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:16,padding:24,maxWidth:600}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div>
                  <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Epic No.</div>
                  <input value={vEpic} onChange={e=>setVEpic(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Enter Epic No."/>
                </div>
                <div>
                  <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Name</div>
                  <input value={vName} onChange={e=>setVName(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Enter Name"/>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Photo</div>
                <label style={{display:"inline-flex",alignItems:"center",gap:10,background:`rgba(0,201,167,0.1)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"10px 18px",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
                  <span style={{fontSize:20}}>📷</span>
                  <span style={{color:accent,fontWeight:700,fontSize:13}}>{vPhoto?"✅ Photo Selected":"Choose File"}</span>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)readFileAsDataURL(f,d=>{setVPhoto(d);showToast("✅ "+f.name);});}}/>
                </label>
              </div>
              <button className="submit-btn" style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}} onClick={()=>initiatePayment("voter_manual","Voter Manual Print - ₹20",downloadVoterPDF)}>💳 Pay ₹20 & Download PDF</button>
            </div>
          </div>
        );
                           }
            // ── VOTER PRINT LIST ──────────────────────
      if (activeSubMenu.id === "voter_list") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📋 Voter Print List</h2>
            </div>
            {voterPrintList.length===0 ? (
              <div style={{background:th.statBg,borderRadius:14,padding:48,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <div style={{fontSize:52,marginBottom:14}}>📋</div>
                <div style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:8}}>No Print List</div>
                <div style={{color:th.subtext,fontSize:14}}>Abhi tak koi Voter card print/download nahi hua. Voter Manual form fill karo aur PDF download karo.</div>
              </div>
            ) : (
              <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                    {["Serial Number","Epic Number","Name","Date","Download"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>{voterPrintList.map((r,i)=>(
                    <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                      <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                      <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.epicNo}</td>
                      <td style={{padding:"12px 14px",color:th.text}}>{r.name}</td>
                      <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                      <td style={{padding:"12px 14px"}}>
                        <button onClick={()=>{downloadVoterPDF();showToast("✅ Downloading...");}} style={{background:"linear-gradient(135deg,#845EC2,#6A3FA0)",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Download Now</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        );
      }

      // ── AADHAR PRINT LIST ────────────────────
      if (activeSubMenu.id === "aadhar_list") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📋 Aadhar Print List</h2>
            </div>
            {aadharPrintList.length===0 ? (
              <div style={{background:th.statBg,borderRadius:14,padding:48,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <div style={{fontSize:52,marginBottom:14}}>📋</div>
                <div style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:8}}>No Print List</div>
                <div style={{color:th.subtext,fontSize:14}}>Abhi tak koi Aadhar card print submit nahi hua. Aadhar Manual form fill karo aur submit karo.</div>
              </div>
            ) : (
              <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                    {["Serial Number","Aadhar Number","Name","Date","Download"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>{aadharPrintList.map((r,i)=>(
                    <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                      <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                      <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.aadharNo}</td>
                      <td style={{padding:"12px 14px",color:th.text}}>{r.name}</td>
                      <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                      <td style={{padding:"12px 14px"}}>
                        <button onClick={()=>showToast("✅ Downloading...")} style={{background:"linear-gradient(135deg,#2196F3,#1565C0)",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Download Now</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        );
      }

      // ── AADHAR TO PAN FIND ───────────────────
      if (activeSubMenu.id === "pan_find") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🔍 Aadhar To Pan No. Find</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:500}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Name</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Sanjay Chauhan"/>
                </div>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Aadhar No.</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Aadhar No." type="tel" maxLength={12}/>
                </div>
              </div>
              <button className="submit-btn" style={{maxWidth:160}} onClick={()=>showToast("✅ Searching...")}>🔍 Find</button>
            </div>
          </div>
        );
      }

      // ── PAN NO TO DETAILS ────────────────────
      if (activeSubMenu.id === "pan_details") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📊 Pan No. To Details</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:500}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,alignItems:"end",marginBottom:20}}>
                <div>
                  <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Pan Number</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Pan Number" maxLength={10}/>
                </div>
                <div>
                  <div style={{color:"#00C9A7",fontSize:12,fontWeight:700,marginBottom:6}}>Charges</div>
                  <input style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Processing Fee ₹" readOnly/>
                </div>
                <button className="submit-btn" onClick={()=>showToast("✅ Fetching details...")}>🔎 Check</button>
              </div>
            </div>
          </div>
        );
                }
                // ── PAN MANUAL ───────────────────────────
      if (activeSubMenu.id === "pan_manual") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🖨️ Pan Manual</h2>
            </div>
            <div style={{background:th.statBg,borderRadius:16,padding:24,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:700}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Pan No.</div>
                <input value={pNo} onChange={e=>setPNo(e.target.value.toUpperCase())} maxLength={10} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Pan Number"/></div>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Name</div>
                <input value={pName} onChange={e=>setPName(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Full Name"/></div>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Father Name</div>
                <input value={pFather} onChange={e=>setPFather(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Father Name"/></div>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Date Of Birth</div>
                <input type="date" value={pDob} onChange={e=>setPDob(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:20}}>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Gender</div>
                <select value={pGender} onChange={e=>setPGender(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}>
                  <option value="">Select Gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select></div>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Photo</div>
                <label style={{display:"flex",alignItems:"center",gap:8,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                  <span style={{fontSize:16}}>📷</span>
                  <span style={{color:accent,fontWeight:700,fontSize:12}}>{pPhoto?"✅ Selected":"Choose File"}</span>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)readFileAsDataURL(f,d=>{setPPhoto(d);showToast("✅ "+f.name);});}}/>
                </label></div>
                <div><div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>Signature</div>
                <div style={{border:`1.5px solid #845EC2`,borderRadius:10,background:`rgba(132,94,194,0.06)`,padding:8}}>
                  <div style={{fontSize:11,color:"#845EC2",fontWeight:700,marginBottom:4}}>✍️ Draw Signature Below</div>
                  <canvas id="signCanvas" width={200} height={60}
                    style={{display:"block",background:"white",borderRadius:6,cursor:"crosshair",touchAction:"none",border:"1px solid rgba(132,94,194,0.3)"}}
                    onMouseDown={e=>{const c=e.currentTarget;const ctx=c.getContext("2d");ctx.strokeStyle="#1a1a2e";ctx.lineWidth=2;ctx.lineCap="round";c._drawing=true;const r=c.getBoundingClientRect();ctx.beginPath();ctx.moveTo(e.clientX-r.left,e.clientY-r.top);}}
                    onMouseMove={e=>{const c=e.currentTarget;if(!c._drawing)return;const ctx=c.getContext("2d");const r=c.getBoundingClientRect();ctx.lineTo(e.clientX-r.left,e.clientY-r.top);ctx.stroke();}}
                    onMouseUp={e=>{const c=e.currentTarget;c._drawing=false;setPSign(c.toDataURL());}}
                    onMouseLeave={e=>{const c=e.currentTarget;if(c._drawing){c._drawing=false;setPSign(c.toDataURL());}}}
                    onTouchStart={e=>{e.preventDefault();const c=e.currentTarget;const ctx=c.getContext("2d");ctx.strokeStyle="#1a1a2e";ctx.lineWidth=2;ctx.lineCap="round";c._drawing=true;const r=c.getBoundingClientRect();const t=e.touches[0];ctx.beginPath();ctx.moveTo(t.clientX-r.left,t.clientY-r.top);}}
                    onTouchMove={e=>{e.preventDefault();const c=e.currentTarget;if(!c._drawing)return;const ctx=c.getContext("2d");const r=c.getBoundingClientRect();const t=e.touches[0];ctx.lineTo(t.clientX-r.left,t.clientY-r.top);ctx.stroke();}}
                    onTouchEnd={e=>{const c=e.currentTarget;c._drawing=false;setPSign(c.toDataURL());}}
                  />
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <button type="button" onClick={()=>{const c=document.getElementById("signCanvas");const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);setPSign(null);}} style={{flex:1,padding:"5px 0",borderRadius:7,border:`1px solid #845EC2`,background:"transparent",color:"#845EC2",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>🗑 Clear</button>
                    <button type="button" onClick={()=>{const c=document.getElementById("signCanvas");setPSign(c.toDataURL());showToast("✅ Signature saved!");}} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",background:"#845EC2",color:"white",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{pSign?"✅ Saved":"💾 Save"}</button>
                  </div>
                </div></div>
              </div>
              <button className="submit-btn" style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}} onClick={()=>initiatePayment("pan_manual","PAN Manual Print - ₹30",downloadPanPDF)}>💳 Pay ₹30 & Download PDF</button>
            </div>
          </div>
        );
      }

      // ── PAN PRINT LIST ───────────────────────
      if (activeSubMenu.id === "pan_list") {
        return (
          <div className="fade-up">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              {backBtn(()=>setActiveSubMenu(null))}
              <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📋 Pan Manual Print List</h2>
            </div>
            {panPrintList.length===0 ? (
              <div style={{background:th.statBg,borderRadius:14,padding:48,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <div style={{fontSize:52,marginBottom:14}}>📋</div>
                <div style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:8}}>No Print List</div>
                <div style={{color:th.subtext,fontSize:14}}>Abhi tak koi PAN card print/download nahi hua. PAN Manual form fill karo aur PDF download karo.</div>
              </div>
            ) : (
              <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                    {["Serial Number","Pan Number","Name","DOB","Date","Download"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>{panPrintList.map((r,i)=>(
                    <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                      <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>{r.sn}</td>
                      <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.panNo}</td>
                      <td style={{padding:"12px 14px",color:th.text}}>{r.name}</td>
                      <td style={{padding:"12px 14px",color:th.subtext}}>{r.dob}</td>
                      <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                      <td style={{padding:"12px 14px"}}>
                        <button onClick={()=>{downloadPanPDF();showToast("✅ Downloading...");}} style={{background:"linear-gradient(135deg,#2196F3,#1565C0)",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Download Now</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        );
      }

      // ── NIOS FORM ────────────────────────────
      if (activeSubMenu.id==="nios_form") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📄 NIOS Certificate Issue Manual</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,maxWidth:700,boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}}>

            {/* Row 1 — Enrollment + Candidate Name + Course */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Enrollment Number</div>
                <input value={nEnroll} onChange={e=>setNEnroll(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="e.g. 202462961657"/>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Candidate Name</div>
                <input value={nName} onChange={e=>setNName(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Full Name"/>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Course</div>
                <select value={nCourse} onChange={e=>setNCourse(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}>
                  <option value="">Select Course</option>
                  <option>Secondary</option>
                  <option>Senior Secondary</option>
                  <option>D.El.Ed</option>
                  <option>Vocational</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {/* Row 2 — DOB + Mother Name + Father Name */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>DOB (DD-MM-YYYY)</div>
                <input value={nDob} onChange={e=>setNDob(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="DD-MM-YYYY"/>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Mother Name</div>
                <input value={nMother} onChange={e=>setNMother(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Mother's Name"/>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Father Name</div>
                <input value={nFather} onChange={e=>setNFather(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="Father's Name"/>
              </div>
            </div>

            {/* Row 3 — Exam Year + Month/Block */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Exam Year</div>
                <input value={nYear} onChange={e=>setNYear(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="e.g. OCT-2023"/>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Month / Block</div>
                <select value={nMonth} onChange={e=>setNMonth(e.target.value)} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}}>
                  <option value="">Select Month / Block</option>
                  <option>April - Block 1</option>
                  <option>October - Block 2</option>
                  <option>January - Block 3</option>
                  <option>July - Block 4</option>
                </select>
              </div>
            </div>

            {/* Row 4 — Photo + File Upload */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24}}>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Photo (Passport Size)</div>
                <label style={{display:"flex",alignItems:"center",gap:10,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"11px 14px",cursor:"pointer"}}>
                  <span style={{fontSize:22}}>📷</span>
                  <div>
                    <div style={{color:accent,fontWeight:700,fontSize:13}}>{nPhoto?"✅ Photo Selected":"Choose Photo"}</div>
                    <div style={{color:th.subtext,fontSize:11}}>JPG / PNG</div>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{display:"none"}}
                    onChange={e=>{
                      const f = e.target.files[0];
                      if (!f) return;
                      setNPhotoFile(f);                        // raw File → pdf-lib
                      readFileAsDataURL(f, d => setNPhoto(d)); // base64 → preview
                      showToast("✅ Photo: " + f.name);
                    }}
                  />
                </label>
              </div>
              <div>
                <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Upload Document / File</div>
                <label style={{display:"flex",alignItems:"center",gap:10,background:`rgba(132,94,194,0.07)`,border:`1.5px dashed #845EC2`,borderRadius:10,padding:"11px 14px",cursor:"pointer"}}>
                  <span style={{fontSize:22}}>📎</span>
                  <div>
                    <div style={{color:"#845EC2",fontWeight:700,fontSize:13}}>{nFile?"✅ "+nFile.name:"Choose File"}</div>
                    <div style={{color:th.subtext,fontSize:11}}>PDF / JPG / PNG</div>
                  </div>
                  <input type="file" accept="image/*,application/pdf" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){setNFile(f);showToast("✅ File: "+f.name);}}}/>
                </label>
              </div>
            </div>

            {/* ── Subject Marks Table ──────────────────────────────────────── */}
            <div style={{marginBottom:18}}>
              <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:10}}>Subject Marks</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead>
                    <tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                      {["Subject","Theory","Practical","TMA / Internal","Total","Result"].map(h=>(
                        <th key={h} style={{padding:"8px 10px",textAlign:"center",color:th.subtext,fontWeight:800,fontSize:10,textTransform:"uppercase",border:`1px solid ${th.border}`}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {key:"hindi",         label:"Hindi",         hasPractical:false},
                      {key:"mathematics",   label:"Mathematics",   hasPractical:true},
                      {key:"science",       label:"Science",       hasPractical:true},
                      {key:"english",       label:"English",       hasPractical:false},
                      {key:"social_science",label:"Social Science",hasPractical:false},
                    ].map(({key,label,hasPractical})=>(
                      <tr key={key}>
                        <td style={{padding:"8px 10px",border:`1px solid ${th.border}`,color:accent,fontWeight:700,fontSize:12,whiteSpace:"nowrap"}}>{label}</td>
                        {["theory","practical","tma_internal","total"].map(field=>(
                          <td key={field} style={{padding:"6px 8px",border:`1px solid ${th.border}`,textAlign:"center"}}>
                            {field==="practical"&&!hasPractical
                              ? <span style={{color:th.subtext,fontSize:11}}>—</span>
                              : <input
                                  type="text"
                                  maxLength={3}
                                  value={nSubjects[key][field]}
                                  onChange={e=>updateNSubject(key,field,e.target.value)}
                                  style={{width:48,background:"transparent",border:"none",borderBottom:`1px dashed ${th.border}`,color:th.text,fontSize:12,textAlign:"center",outline:"none",fontFamily:"'Outfit',sans-serif",padding:"2px 0"}}
                                  placeholder="—"
                                />
                            }
                          </td>
                        ))}
                        <td style={{padding:"6px 8px",border:`1px solid ${th.border}`,textAlign:"center"}}>
                          <select
                            value={nSubjects[key].result}
                            onChange={e=>updateNSubject(key,"result",e.target.value)}
                            style={{background:"transparent",border:"none",borderBottom:`1px dashed ${th.border}`,color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}
                          >
                            <option value="">—</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Overall Result Toggle ────────────────────────────────────── */}
            <div style={{marginBottom:18}}>
              <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:8}}>Overall Result</div>
              <div style={{display:"flex",gap:10}}>
                {["PASS","FAIL"].map(val=>(
                  <button
                    key={val}
                    type="button"
                    onClick={()=>setNOverallResult(val)}
                    style={{
                      flex:1,maxWidth:120,padding:"9px 0",
                      border:`2px solid ${nOverallResult===val?(val==="PASS"?"#1a6b3a":"#c8372d"):th.border}`,
                      borderRadius:8,
                      background:nOverallResult===val?(val==="PASS"?"#1a6b3a":"#c8372d"):"transparent",
                      color:nOverallResult===val?"white":(val==="PASS"?"#1a6b3a":"#c8372d"),
                      fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.15s"
                    }}
                  >
                    {val==="PASS"?"✓ PASS":"✗ FAIL"}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Download NIOS PDF Button ─────────────────────────────────── */}
            <button
              className="submit-btn"
              style={{maxWidth:280,background:"linear-gradient(135deg,#4CAF50,#2e7d32)",opacity:nPdfLoading?0.7:1}}
              disabled={nPdfLoading}
              onClick={()=>initiatePayment("nios_form","NIOS Certificate - ₹20",downloadNiosPDF)}
            >
              {nPdfLoading
                ? <><span className="spinner"/>Generating PDF…</>
                : "💳 Pay ₹20 & Download NIOS PDF"
              }
            </button>
          </div>
        </div>
      );
                // ── HARYANA FORM ──────────────────────────
      if (activeSubMenu.id==="haryana_form") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🏠 Haryana Resident Manual</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,maxWidth:600}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{k:"name",label:"NAME",ph:"Name"},{k:"father",label:"Father",ph:"Father Name"},{k:"place",label:"Place",ph:"Place"},{k:"mother",label:"Mother Name",ph:"Mother Name"},{k:"house",label:"House No.",ph:"House no"},{k:"tahsil",label:"Tahsil Name",ph:"Tahsil Name"},{k:"district",label:"District",ph:"District"},{k:"pin",label:"Pin Code",ph:"Pin Code"},{k:"landmark",label:"Landmark Name",ph:"Landmark Name"},{k:"vill",label:"Vill / Town Name",ph:"Vill / Town Name"},{k:"town",label:"Town Name",ph:"Town Name"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={hy[f.k]} onChange={e=>setHy(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
              <div><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Photo</div>
              <label style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                <span>📷</span><span style={{color:accent,fontWeight:700,fontSize:12}}>{hy.photo?"✅ Selected":"Choose File"}</span>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)readFileAsDataURL(f,d=>{setHy(p=>({...p,photo:d}));showToast("✅ "+f.name);});}}/>
              </label></div>
            </div>
            <button className="submit-btn" style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}} onClick={()=>initiatePayment("haryana_form","Haryana Resident Certificate - ₹30",downloadHaryanaPDF)}>💳 Pay ₹30 & Download PDF</button>
          </div>
        </div>
      );

      // ── 10TH MARKSHEET FORM ───────────────────
      if (activeSubMenu.id==="marksheet_10") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📝 10th Marksheet Manual</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,maxWidth:700}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{k:"nameEn",label:"Name In English",ph:"Name"},{k:"nameHi",label:"Name In Hindi",ph:"नाम"},{k:"motherEn",label:"Mother Name In English",ph:"Mother Name"},{k:"motherHi",label:"Mother Name In Hindi",ph:"माता का नाम"},{k:"fatherEn",label:"Father Name In English",ph:"Father Name"},{k:"fatherHi",label:"Father Name In Hindi",ph:"पिता का नाम"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m10[f.k]} onChange={e=>setM10(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              {[{k:"schoolEn",label:"School Full Name In English",ph:"School Name"},{k:"schoolHi",label:"School Full Name In Hindi",ph:"विद्यालय का नाम"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m10[f.k]} onChange={e=>setM10(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            {m10.subjects.map((sub,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>SUBJECT</div><input value={sub.s} onChange={e=>setM10(p=>{const s=[...p.subjects];s[i]={...s[i],s:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={"Subject "+(i+1)}/></div>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>MARKS</div><input value={sub.m} onChange={e=>setM10(p=>{const s=[...p.subjects];s[i]={...s[i],m:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="0/100"/></div>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>TOTAL MARKS</div><input value={sub.t} onChange={e=>setM10(p=>{const s=[...p.subjects];s[i]={...s[i],t:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="100"/></div>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>GRADE</div><input value={sub.g} onChange={e=>setM10(p=>{const s=[...p.subjects];s[i]={...s[i],g:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="A"/></div>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14,marginTop:10}}>
              {[{k:"grand",label:"Grand Total",ph:"373/500"},{k:"year",label:"Pass Year",ph:"2024"},{k:"date",label:"Result Date",ph:"31ST JULY 2024"},{k:"district",label:"District",ph:"District"},{k:"sr",label:"SR No.",ph:"1333386"},{k:"roll",label:"Roll Number",ph:"212082801"},{k:"code",label:"School Code",ph:"55/15126/211"},{k:"cert",label:"Certificate No",ph:"55879061"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m10[f.k]} onChange={e=>setM10(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            <div style={{marginBottom:20}}>
              <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Photo</div>
              <label style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                <span>📷</span><span style={{color:accent,fontWeight:700,fontSize:12}}>{m10.photo?"✅ Selected":"Choose File"}</span>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)readFileAsDataURL(f,d=>{setM10(p=>({...p,photo:d}));showToast("✅ "+f.name);});}}/>
              </label>
            </div>
            <button className="submit-btn" style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}} onClick={()=>initiatePayment("marksheet_10","10th Marksheet - ₹30",downloadMarksheet10PDF)}>💳 Pay ₹30 & Download PDF</button>
          </div>
        </div>
      );

      // ── 12TH MARKSHEET FORM ───────────────────
      if (activeSubMenu.id==="marksheet_12") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>setActiveSubMenu(null))}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>📝 12th Marksheet Manual</h2>
          </div>
          <div style={{background:th.statBg,borderRadius:16,padding:24,maxWidth:700}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[{k:"nameEn",label:"Name In English",ph:"RAJU"},{k:"nameHi",label:"Name In Hindi",ph:"नाम"},{k:"motherEn",label:"Mother Name In English",ph:"SUNITA"},{k:"motherHi",label:"Mother Name In Hindi",ph:"माता का नाम"},{k:"fatherEn",label:"Father Name In English",ph:"Father Name"},{k:"fatherHi",label:"Father Name In Hindi",ph:"पिता का नाम"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m12[f.k]} onChange={e=>setM12(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              {[{k:"schoolEn",label:"School Full Name In English",ph:"School Name"},{k:"schoolHi",label:"School Full Name In Hindi",ph:"विद्यालय का नाम"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m12[f.k]} onChange={e=>setM12(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            {m12.subjects.map((sub,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:10}}>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>SUBJECT</div><input value={sub.s} onChange={e=>setM12(p=>{const s=[...p.subjects];s[i]={...s[i],s:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={"Subject "+(i+1)}/></div>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>MARKS</div><input value={sub.m} onChange={e=>setM12(p=>{const s=[...p.subjects];s[i]={...s[i],m:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="1/71"/></div>
                <div><div style={{color:"#F9A826",fontSize:11,fontWeight:700,marginBottom:4}}>TOTAL MARKS</div><input value={sub.t} onChange={e=>setM12(p=>{const s=[...p.subjects];s[i]={...s[i],t:e.target.value};return {...p,subjects:s};})} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:8,padding:"8px 10px",color:th.text,fontSize:12,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder="071"/></div>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14,marginTop:10}}>
              {[{k:"grand",label:"Grand Total",ph:"373/500"},{k:"year",label:"Intermediate Pass Year",ph:"2024"},{k:"date",label:"Result Date",ph:"31ST JULY 2024"},{k:"district",label:"District",ph:"District"},{k:"sr",label:"SR No.",ph:"1333386"},{k:"roll",label:"Roll Number",ph:"212082801"},{k:"code",label:"School Code",ph:"55/15126/211"},{k:"cert",label:"Certificate No",ph:"55879061"}].map((f,i)=>(
                <div key={i}><div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>{f.label}</div>
                <input value={m12[f.k]} onChange={e=>setM12(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"10px 12px",color:th.text,fontSize:13,outline:"none",fontFamily:"'Outfit',sans-serif"}} placeholder={f.ph}/></div>
              ))}
            </div>
            <div style={{marginBottom:20}}>
              <div style={{color:"#F9A826",fontSize:12,fontWeight:700,marginBottom:6}}>Photo</div>
              <label style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(0,201,167,0.08)`,border:`1.5px dashed ${accent}`,borderRadius:10,padding:"9px 12px",cursor:"pointer"}}>
                <span>📷</span><span style={{color:accent,fontWeight:700,fontSize:12}}>{m12.photo?"✅ Selected":"Choose File"}</span>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)readFileAsDataURL(f,d=>{setM12(p=>({...p,photo:d}));showToast("✅ "+f.name);});}}/>
              </label>
            </div>
            <button className="submit-btn" style={{maxWidth:240,background:"linear-gradient(135deg,#f59e0b,#d97706)"}} onClick={()=>initiatePayment("marksheet_12","12th Marksheet - ₹30",downloadMarksheet12PDF)}>💳 Pay ₹30 & Download PDF</button>
          </div>
        </div>
      );

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
                // Sub-menu grid helper
    const subGrid = (id, icon, label, color) => (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>{icon} {label}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
          {SUB_MENUS[id].map((sub,i)=>(
            <div key={i} onClick={()=>setActiveSubMenu(sub)} className="svc-card" style={{background:th.statBg,textAlign:"center",padding:28}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
              <div style={{fontSize:44,marginBottom:14}}>{sub.icon}</div>
              <div style={{color:th.text,fontWeight:800,fontSize:15,marginBottom:8}}>{sub.label}</div>
              <div style={{color,fontSize:13,fontWeight:600}}>Open →</div>
            </div>
          ))}
        </div>
      </div>
    );

    if (activeMenu==="aadhar") return subGrid("aadhar","🪪",t.aadhar,accent);
    if (activeMenu==="voter")  return subGrid("voter","🗳️",t.voter,"#845EC2");
    if (activeMenu==="pan")    return subGrid("pan","📋",t.pan,"#FF6B6B");
    if (activeMenu==="marksheet") return subGrid("marksheet","📝",t.vehicle,"#F9A826");
    if (activeMenu==="nios")      return subGrid("nios","📄",t.ration,"#4CAF50");
    if (activeMenu==="haryana")   return subGrid("haryana","🏠",t.dl,"#2196F3");

    // ── DASHBOARD ──────────────────────────────
    if (activeMenu==="dashboard") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>📊 {t.dashboard}</h2>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:22}}>
          {[
            {label:t.todayEarning, val: rechargeHistory.length>0 ? `₹${rechargeHistory.reduce((s,r)=>s+(parseInt(r.amount.replace(/[₹,]/g,""))||0),0).toLocaleString("en-IN")}` : "₹0", icon:"💰", color:"#00C9A7", bg:dark?"#0d2e28":"#e6fff7"},
            {label:t.totalTxn,     val: String(walletTxns.length+rechargeHistory.length), icon:"📊", color:"#845EC2", bg:dark?"#1e1335":"#f3eeff"},
            {label:t.walletBal,    val:`₹${walletBalance.toLocaleString("en-IN")}`, icon:"💼", color:"#2196F3", bg:dark?"#0d1e30":"#e8f4fd"},
            {label:t.rechargeHist, val: rechargeHistory.length>0 ? `${rechargeHistory.length} entries` : "0", icon:"📄", color:"#F9A826", bg:dark?"#2a1f0a":"#fff8e6"},
          ].map((s,i)=>(
            <div key={i} className="stat-card" style={{flex:"1 1 160px",background:s.bg,borderLeft:`4px solid ${s.color}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{color:th.subtext,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8}}>{s.label}</div>
                  <div style={{color:th.text,fontWeight:900,fontSize:24,marginTop:6}}>{s.val}</div>
                </div>
                <div style={{width:42,height:42,borderRadius:12,background:`${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <h3 style={{color:th.text,fontWeight:800,fontSize:16,marginBottom:14}}>⚡ {t.quickServices}</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:22}}>
          {[
            {icon:"🪪",label:t.aadhar,  color:"#00C9A7",id:"aadhar"},
            {icon:"🗳️",label:t.voter,   color:"#845EC2",id:"voter"},
            {icon:"📋",label:t.pan,     color:"#FF6B6B",id:"pan"},
            {icon:"📝",label:t.vehicle, color:"#F9A826",id:"marksheet"},
            {icon:"📄",label:t.ration,  color:"#4CAF50",id:"nios"},
            {icon:"🏠",label:t.dl,      color:"#2196F3",id:"haryana"},
          ].map((s,i)=>(
            <div key={i} className="svc-card" style={{background:th.statBg}} onClick={()=>handleMenuClick(s.id)}
              onMouseEnter={e=>e.currentTarget.style.borderColor=s.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
              <div style={{width:42,height:42,borderRadius:10,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:10}}>{s.icon}</div>
              <div style={{color:th.text,fontWeight:700,fontSize:13}}>{s.label}</div>
              <div style={{color:s.color,fontSize:12,fontWeight:600,marginTop:6}}>Open →</div>
            </div>
          ))}
        </div>
        <h3 style={{color:th.text,fontWeight:800,fontSize:16,marginBottom:12}}>📄 {t.recentTxn}</h3>
        <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          {rechargeHistory.length===0 ? (
            <div style={{padding:32,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:10}}>📭</div>
              <div style={{color:th.subtext,fontSize:14,fontWeight:600}}>No recent transactions yet</div>
            </div>
          ) : (
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                {[t.serialNo,"Service",t.amount,t.status,t.date].map(h=><th key={h} style={{padding:"11px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
              </tr></thead>
              <tbody>{rechargeHistory.slice(0,5).map((r,i)=>(
                <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                  <td style={{padding:"11px 14px",color:accent,fontWeight:700}}>#{r.sn}</td>
                  <td style={{padding:"11px 14px",color:th.text}}>{r.service}</td>
                  <td style={{padding:"11px 14px",color:th.text,fontWeight:700}}>{r.amount}</td>
                  <td style={{padding:"11px 14px"}}>{statusBadge(r.status)}</td>
                  <td style={{padding:"11px 14px",color:th.subtext}}>{r.date}</td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    );

    // ── ADD MONEY ──────────────────────────────
    if (activeMenu==="addMoney") {
      const amt = parseInt(addAmount)||0;
      const mins = String(Math.floor(qrTimer/60)).padStart(2,"0");
      const secs = String(qrTimer%60).padStart(2,"0");

      if (addMoneyStep==="success") return (
        <div className="fade-up" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center"}}>
          <div style={{fontSize:72,marginBottom:16}}>✅</div>
          <h2 style={{color:"#00C9A7",fontWeight:900,fontSize:26,marginBottom:8}}>Payment Successful!</h2>
          <p style={{color:th.subtext,fontSize:15,marginBottom:16}}>₹{amt} aapke wallet mein add ho gaya!</p>
          <div style={{background:"rgba(0,201,167,0.1)",border:`1px solid ${th.border}`,borderRadius:14,padding:"14px 28px",marginBottom:24}}>
            <div style={{color:th.subtext,fontSize:12,fontWeight:700}}>NEW WALLET BALANCE</div>
            <div style={{color:"#00C9A7",fontWeight:900,fontSize:28,marginTop:4}}>₹ {walletBalance.toLocaleString("en-IN")}.00</div>
          </div>
          <button className="submit-btn" style={{width:"auto",padding:"12px 32px"}} onClick={()=>{setAddMoneyStep("input");setAddAmount("");}}>← Back to Add Money</button>
        </div>
      );

      if (addMoneyStep==="pay") return (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            {backBtn(()=>{setAddMoneyStep("input");clearInterval(timerRef.current);})}
            <h2 style={{color:th.text,fontWeight:900,fontSize:20}}>🔳 Scan & Pay</h2>
          </div>
          <div style={{maxWidth:400,margin:"0 auto"}}>
            <div style={{background:th.statBg,borderRadius:20,padding:28,boxShadow:"0 4px 24px rgba(0,0,0,0.12)",textAlign:"center"}}>
              <div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:12,padding:"10px 16px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                <span style={{fontSize:20}}>⏱️</span>
                <span style={{color:"#FF6B6B",fontWeight:800,fontSize:20}}>{mins}:{secs}</span>
                <span style={{color:th.subtext,fontSize:13,fontWeight:600}}>mein pay karo</span>
              </div>
              <div style={{background:"rgba(0,201,167,0.08)",border:`2px solid ${accent}`,borderRadius:16,padding:"14px 24px",marginBottom:20}}>
                <div style={{color:th.subtext,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Amount To Pay</div>
                <div style={{color:accent,fontWeight:900,fontSize:40,marginTop:6}}>₹ {amt}</div>
              </div>
              <div style={{background:"white",borderRadius:16,padding:16,marginBottom:16,display:"inline-block",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("upi://pay?pa=9053661570@ptsbi&pn=SevaZone&am="+amt+"&cu=INR")}`}
                  alt="UPI QR" style={{width:200,height:200,display:"block"}}
                  onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
                />
                <div style={{display:"none",width:200,height:200,alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,background:"#f5f5f5",borderRadius:8}}>
                  <span style={{fontSize:40}}>📱</span>
                  <span style={{fontSize:12,color:"#666",fontWeight:600,textAlign:"center",padding:"0 10px"}}>UPI ID:<br/>9053661570@ptsbi</span>
                </div>
              </div>
              <div style={{background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",borderRadius:10,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:18}}>🏦</span>
                <div>
                  <div style={{color:th.subtext,fontSize:11,fontWeight:700}}>UPI ID</div>
                  <div style={{color:th.text,fontWeight:800,fontSize:15}}>9053661570@ptsbi</div>
                </div>
              </div>
              <div style={{background:dark?"rgba(249,168,38,0.08)":"#fff8e6",border:"1px solid rgba(249,168,38,0.25)",borderRadius:10,padding:"10px 14px",marginBottom:20,color:"#F9A826",fontSize:12,fontWeight:600,lineHeight:1.6}}>
                ⚠️ QR scan karke ₹{amt} pay karo — phir neeche button dabao
              </div>
              <button className="submit-btn" style={{background:"linear-gradient(135deg,#6366f1,#4f46e5)"}} onClick={()=>initiatePayment("add_money","Wallet Recharge - ₹"+amt,()=>confirmPayment(amt), parseInt(amt)*100)}>💳 Card / UPI App se Pay — ₹{amt}</button>
            </div>
          </div>
        </div>
      );

      return (
        <div className="fade-up">
          <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>💰 {t.addMoney}</h2>
          <div style={{maxWidth:420,margin:"0 auto"}}>
            <div style={{background:th.statBg,borderRadius:20,padding:28,boxShadow:"0 4px 24px rgba(0,0,0,0.1)"}}>
              <div style={{background:"rgba(0,201,167,0.08)",border:`1px solid ${th.border}`,borderRadius:12,padding:"14px 18px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:th.subtext,fontSize:13,fontWeight:700}}>Current Balance</span>
                <span style={{color:accent,fontWeight:900,fontSize:20}}>₹ {walletBalance.toLocaleString("en-IN")}</span>
              </div>
              <div style={{color:th.subtext,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Enter Amount</div>
              <div style={{position:"relative",marginBottom:20}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:accent,fontWeight:900,fontSize:20}}>₹</span>
                <input type="number" placeholder="0" value={addAmount} onChange={e=>setAddAmount(e.target.value)}
                  style={{width:"100%",background:th.inputBg,border:`2px solid ${addAmount?accent:th.inputBorder}`,borderRadius:12,padding:"14px 14px 14px 36px",color:th.text,fontSize:24,fontWeight:800,outline:"none",fontFamily:"'Outfit',sans-serif"}} />
              </div>
              <div style={{color:th.subtext,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Quick Select</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
                {[100,200,500,1000].map(q=>(
                  <button key={q} onClick={()=>setAddAmount(String(q))} style={{padding:"10px 0",borderRadius:10,border:`2px solid ${addAmount==q?accent:th.border}`,background:addAmount==q?"rgba(0,201,167,0.12)":"transparent",color:addAmount==q?accent:th.subtext,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s"}}>₹{q}</button>
                ))}
              </div>
              <button className="submit-btn" onClick={()=>{
                if(!addAmount||parseInt(addAmount)<1){showToast("❌ Valid amount daalo!","error");return;}
                setAddMoneyStep("pay"); startTimer();
              }}>💳 Pay Now — ₹{addAmount||"0"}</button>
            </div>
          </div>
        </div>
      );
  }
    // ── RECHARGE HISTORY ───────────────────────
    if (activeMenu==="rechargeHist") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>📄 {t.rechargeHist}</h2>
        {rechargeHistory.length===0 ? (
          <div style={{background:th.statBg,borderRadius:14,padding:48,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:52,marginBottom:14}}>📭</div>
            <div style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:8}}>No Recharge History</div>
            <div style={{color:th.subtext,fontSize:14}}>Koi recharge ya payment abhi tak nahi hui. Pehle Add Money karo ya koi service use karo.</div>
          </div>
        ) : (
          <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                {[t.serialNo,"Service",t.mobile,t.amount,t.status,t.date].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
              </tr></thead>
              <tbody>{rechargeHistory.map((r,i)=>(
                <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                  <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>#{r.sn}</td>
                  <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.service}</td>
                  <td style={{padding:"12px 14px",color:th.text}}>{r.mobile}</td>
                  <td style={{padding:"12px 14px",color:th.text,fontWeight:700}}>{r.amount}</td>
                  <td style={{padding:"12px 14px"}}>{statusBadge(r.status)}</td>
                  <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    );

    // ── WALLET HISTORY ─────────────────────────
    if (activeMenu==="walletHist") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>💼 {t.walletHist}</h2>
        {walletTxns.length===0 ? (
          <div style={{background:th.statBg,borderRadius:14,padding:48,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:52,marginBottom:14}}>💼</div>
            <div style={{color:th.text,fontWeight:800,fontSize:18,marginBottom:8}}>No Wallet History</div>
            <div style={{color:th.subtext,fontSize:14}}>Abhi tak koi wallet transaction nahi hua. Add Money karo ya koi service use karo.</div>
          </div>
        ) : (
          <div style={{background:th.statBg,borderRadius:14,overflow:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:dark?"rgba(0,201,167,0.08)":"#f0fdf9"}}>
                {[t.serialNo,t.description,t.type,t.amount,"Balance",t.date].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:th.subtext,fontWeight:800,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
              </tr></thead>
              <tbody>{walletTxns.map((r,i)=>(
                <tr key={i} style={{borderTop:`1px solid ${th.border}`}}>
                  <td style={{padding:"12px 14px",color:accent,fontWeight:700}}>#{r.sn}</td>
                  <td style={{padding:"12px 14px",color:th.text,fontWeight:600}}>{r.desc}</td>
                  <td style={{padding:"12px 14px"}}>
                    <span style={{background:r.type==="Credit"?"rgba(0,201,167,0.15)":"rgba(255,107,107,0.15)",color:r.type==="Credit"?"#00C9A7":"#FF6B6B",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>
                      {r.type==="Credit"?"⬆ "+t.credit:"⬇ "+t.debit}
                    </span>
                  </td>
                  <td style={{padding:"12px 14px",color:r.type==="Credit"?"#00C9A7":"#FF6B6B",fontWeight:800}}>{r.type==="Credit"?"+":"-"}{r.amount}</td>
                  <td style={{padding:"12px 14px",color:th.text,fontWeight:700}}>{r.balance}</td>
                  <td style={{padding:"12px 14px",color:th.subtext}}>{r.date}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    );

    // ── PROFILE ────────────────────────────────
    if (activeMenu==="profile") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>👤 {t.profile}</h2>
        <div style={{background:th.statBg,borderRadius:16,padding:28,boxShadow:"0 2px 14px rgba(0,0,0,0.1)",maxWidth:520}}>
          <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:24}}>
            <div style={{position:"relative"}}>
              <label htmlFor="photoInput" style={{cursor:"pointer",display:"block"}}>
                <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#00C9A7,#00695C)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,overflow:"hidden",border:`3px solid ${accent}`}}>
                  {profilePhoto?<img src={profilePhoto} alt="p" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"👤"}
                </div>
                <div style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>📷</div>
              </label>
              <input id="photoInput" type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoUpload}/>
            </div>
            <div>
              <div style={{color:th.text,fontWeight:800,fontSize:18}}>{userName}</div>
              <div style={{color:accent,fontSize:13,fontWeight:600,marginTop:2}}>🏪 Retailer</div>
              <label htmlFor="photoInput" style={{display:"inline-block",marginTop:8,background:`rgba(0,201,167,0.1)`,border:`1px solid ${accent}`,borderRadius:8,padding:"6px 14px",color:accent,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
                📷 {t.uploadPhoto}
              </label>
            </div>
          </div>
          {[
            {icon:"👤",label:t.fullName,    val:userName,   onChange:e=>setUserName(e.target.value)},
            {icon:"📱",label:t.mobileLabel, val:"8307950410",readOnly:true},
            {icon:"📧",label:t.email,       val:"farhan@example.com"},
            {icon:"📍",label:t.city,        val:userCity,   onChange:e=>setUserCity(e.target.value)},
            {icon:"🗺️",label:t.state,       val:userState,  onChange:e=>setUserState(e.target.value)},
          ].map((f,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{color:th.subtext,fontSize:12,fontWeight:700,marginBottom:6}}>{f.icon} {f.label}</div>
              <input className="form-input" defaultValue={f.val} readOnly={f.readOnly} onChange={f.onChange} style={{paddingLeft:14,opacity:f.readOnly?0.6:1}}/>
            </div>
          ))}
          <button className="submit-btn" style={{marginTop:6}} onClick={()=>showToast("✅ Profile updated!")}>💾 {t.saveProfile}</button>
        </div>
      </div>
    );

    // ── TRAINING ───────────────────────────────
    if (activeMenu==="training") return (
      <div className="fade-up">
        <h2 style={{color:th.text,fontWeight:900,fontSize:22,marginBottom:20}}>🎬 {t.training}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
          {["Aadhar Services Guide","PAN Card Tutorial","Voter Card Process","Marksheet Services","Wallet & Recharge","Haryana Resident Manual"].map((v,i)=>(
            <div key={i} style={{background:th.statBg,borderRadius:14,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}>
              <div style={{background:`linear-gradient(135deg,${["#00C9A7","#845EC2","#FF6B6B","#F9A826","#2196F3","#4CAF50"][i]},#0006)`,height:100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>▶️</div>
              <div style={{padding:"12px 14px"}}>
                <div style={{color:th.text,fontWeight:700,fontSize:14}}>{v}</div>
                <div style={{color:th.subtext,fontSize:12,marginTop:4}}>Training Video {i+1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
                  // ── COMING SOON ────────────────────────────
    return (
      <div className="fade-up" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:320,textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:16}}>🚧</div>
        <h2 style={{color:th.text,fontWeight:900,fontSize:24,marginBottom:8}}>{t.comingSoon}</h2>
        <p style={{color:th.subtext,fontSize:15,maxWidth:320,lineHeight:1.6}}>{t.comingSoonDesc}</p>
        <button className="submit-btn" style={{marginTop:24,width:"auto",padding:"12px 28px"}} onClick={()=>setActiveMenu("dashboard")}>← Back to Dashboard</button>
      </div>
    );
  };

  // ── LOGIN PAGE ────────────────────────────────
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
            <button className="tab-btn active" style={{background:"linear-gradient(135deg,#00C9A7,#00897B)",color:"white"}}>🔐 Login</button>
          </div>

          {authTab==="login"&&(
            <div className="fade-up">
              <div style={{position:"relative",marginBottom:14}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{loginMobile.includes("@")?"📧":"📱"}</span>
                <input className="form-input" placeholder="Gmail or Mobile Number" type="text" value={loginMobile} onChange={e=>setLoginMobile(e.target.value)}/>
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
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>📧</span>
                <input className="form-input" placeholder="Gmail ID (optional)" type="email" value={regEmail} onChange={e=>setRegEmail(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>🔒</span>
                <input className="form-input" placeholder={t.passwordLabel} type="password" value={regPass} onChange={e=>setRegPass(e.target.value)}/>
              </div>
              <div style={{position:"relative",marginBottom:16}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>✅</span>
                <input className="form-input" placeholder={t.confirmPass} type="password" value={regConfirm} onChange={e=>setRegConfirm(e.target.value)}/>
              </div>
              <button className="submit-btn" style={{marginTop:4}} onClick={handleRegister} disabled={loading}>
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
      
  // ── DASHBOARD LAYOUT ──────────────────────────
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:th.bg,display:"flex",flexDirection:"column",transition:"background 0.3s"}}>
      <style>{css}</style>
      {toast&&<div className="toast-box" style={{background:toast.type==="error"?"linear-gradient(135deg,#ff5252,#c62828)":"linear-gradient(135deg,#00C9A7,#00695C)",color:"white"}}>{toast.msg}</div>}

      {/* TOPBAR */}
      <div style={{background:th.topbar,padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 20px rgba(0,0,0,0.2)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{background:"none",border:"none",color:"white",fontSize:20,cursor:"pointer"}}>☰</button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🇮🇳</div>
            <span style={{color:"white",fontWeight:900,fontSize:16}}>{t.appName}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setLang(lang==="en"?"hi":"en")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"5px 12px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
            {lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}
          </button>
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
        {/* SIDEBAR */}
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
              {id:"aadhar",  icon:"🪪", key:"aadhar"},
              {id:"voter",   icon:"🗳️", key:"voter"},
              {id:"pan",     icon:"📋", key:"pan"},
              {id:"marksheet",icon:"📝",key:"vehicle"},
              {id:"nios",    icon:"📄", key:"ration"},
              {id:"haryana", icon:"🏠", key:"dl"},
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
              {id:"profile",     icon:"👤",key:"profile"},
              {id:"rechargeHist",icon:"📄",key:"rechargeHist"},
              {id:"walletHist",  icon:"💼",key:"walletHist"},
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
           {/* MAIN CONTENT */}
        <div style={{flex:1,padding:22,overflowY:"auto"}}>{renderContent()}</div>
      </div>

      {/* FLOATING SUPPORT */}
      <div style={{position:"fixed",bottom:20,left:20,zIndex:200}}>
        {supportOpen&&(
          <div style={{position:"fixed",bottom:90,left:20,background:th.cardSolid,border:`1px solid ${th.border}`,borderRadius:16,padding:16,width:220,boxShadow:"0 16px 48px rgba(0,0,0,0.3)",animation:"popIn 0.25s ease"}}>
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
        <button onClick={()=>setSupportOpen(!supportOpen)} style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#25D366,#128C7E)",border:"none",cursor:"pointer",fontSize:22,boxShadow:"0 6px 20px rgba(37,211,102,0.4)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          {supportOpen?"✕":"💬"}
        </button>
      </div>
    </div>
  );
                       }
