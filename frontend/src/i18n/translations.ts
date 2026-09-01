import type { Lang } from "./types";

export type TranslationKey =
  | "appName"
  | "tagline"
  | "nav.overview"
  | "nav.phases"
  | "nav.guide"
  | "nav.privacy"
  | "nav.schedule"
  | "nav.assistant"
  | "hero.title"
  | "hero.subtitle"
  | "hero.phase1"
  | "hero.phase2"
  | "phase.title"
  | "phase.intro"
  | "phase1.name"
  | "phase1.dates"
  | "phase1.collectsTitle"
  | "phase1.collects.housing"
  | "phase1.collects.amenities"
  | "phase1.collects.assets"
  | "phase1.collects.geo"
  | "phase2.name"
  | "phase2.dates"
  | "phase2.ref"
  | "phase2.snow"
  | "phase2.collectsTitle"
  | "phase2.collects.individual"
  | "phase2.collects.caste"
  | "schedule.title"
  | "schedule.subtitle"
  | "schedule.search"
  | "schedule.selfEnum"
  | "schedule.houseListing"
  | "schedule.open"
  | "schedule.upcoming"
  | "schedule.past"
  | "schedule.count"
  | "guide.title"
  | "guide.subtitle"
  | "guide.step1.title"
  | "guide.step1.desc"
  | "guide.step2.title"
  | "guide.step2.desc"
  | "guide.step3.title"
  | "guide.step3.desc"
  | "guide.step4.title"
  | "guide.step4.desc"
  | "guide.step5.title"
  | "guide.step5.desc"
  | "guide.selfEnumId"
  | "privacy.title"
  | "privacy.subtitle"
  | "myth.title"
  | "myth.documents.claim"
  | "myth.documents.fact"
  | "myth.auth.claim"
  | "myth.auth.fact"
  | "privacy.act"
  | "assistant.title"
  | "assistant.subtitle"
  | "assistant.placeholder"
  | "assistant.ask"
  | "assistant.typing"
  | "assistant.error"
  | "auth.signIn"
  | "auth.signOut"
  | "signIn.user";

export type Translation = Record<TranslationKey, string>;

const en: Translation = {
  appName: "Jan Sutra",
  tagline: "India's first fully digital census",
  "nav.overview": "Overview",
  "nav.phases": "Phases",
  "nav.guide": "Self-Enumeration",
  "nav.privacy": "Privacy",
  "nav.schedule": "Schedule",
  "nav.assistant": "Ask Assistant",
  "hero.title": "Census 2027",
  "hero.subtitle":
    "India's 16th census — 8th since Independence and the first fully digital enumeration.",
  "hero.phase1": "Phase 1: Houselisting & Housing Census (Apr–Sep 2026)",
  "hero.phase2": "Phase 2: Population Enumeration (Feb 2027)",
  "phase.title": "The Two Phases",
  "phase.intro":
    "Census 2027 runs in two phases. Each phase collects different information at different times.",
  "phase1.name": "Phase 1 — Houselisting & Housing Census",
  "phase1.dates": "April 1 – September 30, 2026",
  "phase1.collectsTitle": "What it collects",
  "phase1.collects.housing": "Housing conditions of every building",
  "phase1.collects.amenities": "Amenities available to each household",
  "phase1.collects.assets": "Household assets",
  "phase1.collects.geo": "Geo-tagging of buildings",
  "phase2.name": "Phase 2 — Population Enumeration",
  "phase2.dates": "February 2027",
  "phase2.ref": "Reference date: March 1, 2027",
  "phase2.snow":
    "Snow-bound regions (Ladakh, J&K, Himachal Pradesh, Uttarakhand) use October 1, 2026 as the reference date.",
  "phase2.collectsTitle": "What it collects",
  "phase2.collects.individual": "Individual-level data of every person",
  "phase2.collects.caste": "India's first caste census since 1931",
  "schedule.title": "State-wise Schedule",
  "schedule.subtitle":
    "Self-enumeration opens for 15 days immediately before each state's house-listing phase.",
  "schedule.search": "Search your state",
  "schedule.selfEnum": "Self-enumeration",
  "schedule.houseListing": "House listing",
  "schedule.open": "Open now",
  "schedule.upcoming": "Upcoming",
  "schedule.past": "Done",
  "schedule.count": "sample states shown",
  "guide.title": "How to Self-Enumerate",
  "guide.subtitle":
    "A complete walkthrough of the 15-day online self-enumeration process.",
  "guide.step1.title": "Visit the portal",
  "guide.step1.desc": "Go to se.census.gov.in during your state's 15-day self-enumeration window.",
  "guide.step2.title": "Choose your language",
  "guide.step2.desc": "The portal supports 16 languages. Select the one you're comfortable with.",
  "guide.step3.title": "Report household data",
  "guide.step3.desc": "Self-report your household information online. No documents are required.",
  "guide.step4.title": "Get your Self-Enumeration ID",
  "guide.step4.desc": "You receive a unique Self-Enumeration ID confirming your submission.",
  "guide.step5.title": "Enumerator verification",
  "guide.step5.desc": "During the physical visit, an enumerator verifies the data you submitted using your ID.",
  "guide.selfEnumId": "Self-Enumeration ID",
  "privacy.title": "Privacy & Misinformation",
  "privacy.subtitle": "Your data is protected. Don't believe the myths.",
  "myth.title": "Myth vs. Fact",
  "myth.documents.claim": '"I need to submit Aadhaar and documents."',
  "myth.documents.fact": "False. No documents are required during self-enumeration.",
  "myth.auth.claim": '"The census will share my details with third parties."',
  "myth.auth.fact": "False. Individual data is confidential and protected under the Census Act.",
  "privacy.act":
    "Data collected is kept strictly confidential and used only for census purposes.",
  "assistant.title": "Ask the Assistant",
  "assistant.subtitle": "Questions about Census 2027? Get grounded answers.",
  "assistant.placeholder": "e.g. When is self-enumeration in Maharashtra?",
  "assistant.ask": "Ask",
  "assistant.typing": "Thinking…",
  "assistant.error": "Sorry, the assistant is unavailable right now.",
  "auth.signIn": "Sign in with Google",
  "auth.signOut": "Sign out",
  "signIn.user": "Signed in as",
};

const hi: Translation = {
  appName: "जन सूत्र",
  tagline: "भारत की पहली पूर्ण डिजिटल जनगणना",
  "nav.overview": "अवलोकन",
  "nav.phases": "चरण",
  "nav.guide": "स्व-गणना",
  "nav.privacy": "गोपनीयता",
  "nav.schedule": "अनुसूची",
  "nav.assistant": "सहायक से पूछें",
  "hero.title": "जनगणना 2027",
  "hero.subtitle":
    "भारत की 16वीं जनगणना — स्वतंत्रता के बाद 8वीं और पहली पूर्ण डिजिटल गणना।",
  "hero.phase1": "चरण 1: मकान सूची एवं आवास जनगणना (अप्रैल–सित 2026)",
  "hero.phase2": "चरण 2: जनसंख्या गणना (फ़रवरी 2027)",
  "phase.title": "दो चरण",
  "phase.intro": "जनगणना 2027 दो चरणों में चलती है। हर चरण अलग समय पर अलग जानकारी एकत्र करता है।",
  "phase1.name": "चरण 1 — मकान सूची एवं आवास जनगणना",
  "phase1.dates": "1 अप्रैल – 30 सितंबर 2026",
  "phase1.collectsTitle": "क्या एकत्रित किया जाता है",
  "phase1.collects.housing": "हर भवन की आवास स्थितियाँ",
  "phase1.collects.amenities": "हर परिवार को उपलब्ध सुविधाएँ",
  "phase1.collects.assets": "परिवार की संपत्तियाँ",
  "phase1.collects.geo": "भवनों की जियो-टैगिंग",
  "phase2.name": "चरण 2 — जनसंख्या गणना",
  "phase2.dates": "फ़रवरी 2027",
  "phase2.ref": "संदर्भ तिथि: 1 मार्च 2027",
  "phase2.snow": "बर्फीले क्षेत्रों (लद्दाख, जम्मू-कश्मीर, हिमाचल प्रदेश, उत्तराखंड) के लिए संदर्भ तिथि 1 अक्टूबर 2026 है।",
  "phase2.collectsTitle": "क्या एकत्रित किया जाता है",
  "phase2.collects.individual": "हर व्यक्ति का व्यक्तिगत डेटा",
  "phase2.collects.caste": "1931 के बाद पहली जाति जनगणना",
  "schedule.title": "राज्य-वार अनुसूची",
  "schedule.subtitle": "स्व-गणना राज्य के मकान सूची चरण से ठीक पहले 15 दिनों के लिए खुलती है।",
  "schedule.search": "अपना राज्य खोजें",
  "schedule.selfEnum": "स्व-गणना",
  "schedule.houseListing": "मकान सूची",
  "schedule.open": "अभी खुला है",
  "schedule.upcoming": "आगामी",
  "schedule.past": "पूर्ण",
  "schedule.count": "नमूना राज्य दिखाए गए",
  "guide.title": "स्व-गणना कैसे करें",
  "guide.subtitle": "15-दिवसीय ऑनलाइन स्व-गणना प्रक्रिया की पूरी मार्गदर्शिका।",
  "guide.step1.title": "पोर्टल पर जाएँ",
  "guide.step1.desc": "अपने राज्य के 15-दिवसीय स्व-गणना खिड़की के दौरान se.census.gov.in पर जाएँ।",
  "guide.step2.title": "अपनी भाषा चुनें",
  "guide.step2.desc": "पोर्टल 16 भाषाओं का समर्थन करता है। वह चुनें जिसमें आप सहज हों।",
  "guide.step3.title": "परिवार का डेटा दर्ज करें",
  "guide.step3.desc": "अपने परिवार की जानकारी ऑनलाइन दर्ज करें। कोई दस्तावेज़ आवश्यक नहीं।",
  "guide.step4.title": "अपना स्व-गणना आईडी प्राप्त करें",
  "guide.step4.desc": "आपको एक अद्वितीय स्व-गणना आईडी मिलता है जो आपके आवेदन की पुष्टि करता है।",
  "guide.step5.title": "गणक द्वारा सत्यापन",
  "guide.step5.desc": "भौतिक दौरे के दौरान गणक आपकी आईडी से दर्ज डेटा सत्यापित करता है।",
  "guide.selfEnumId": "स्व-गणना आईडी",
  "privacy.title": "गोपनीयता और भ्रामक सूचना",
  "privacy.subtitle": "आपका डेटा सुरक्षित है। भ्रामक बातों पर विश्वास न करें।",
  "myth.title": "मिथक बनाम तथ्य",
  "myth.documents.claim": '"मुझे आधार और दस्तावेज़ जमा करने हैं।"',
  "myth.documents.fact": "गलत। स्व-गणना के दौरान कोई दस्तावेज़ आवश्यक नहीं।",
  "myth.auth.claim": '"जनगणना मेरी जानकारी तीसरे पक्ष को साझा करेगी।"',
  "myth.auth.fact": "गलत। व्यक्तिगत डेटा गोपनीय है और जनगणना अधिनियम के तहत संरक्षित है।",
  "privacy.act": "एकत्रित डेटा पूर्णतः गोपनीय रखा जाता है और केवल जनगणना हेतु उपयोग होता है।",
  "assistant.title": "सहायक से पूछें",
  "assistant.subtitle": "जनगणना 2027 के बारे में सवाल? तथ्य-आधारित उत्तर पाएँ।",
  "assistant.placeholder": "जैसे: महाराष्ट्र में स्व-गणना कब है?",
  "assistant.ask": "पूछें",
  "assistant.typing": "सोच रहे हैं…",
  "assistant.error": "क्षमा करें, सहायक अभी उपलब्ध नहीं है।",
  "auth.signIn": "Google से साइन इन करें",
  "auth.signOut": "साइन आउट",
  "signIn.user": "साइन इन किया",
};

const mr: Translation = {
  appName: "जन सूत्र",
  tagline: "भारताची पहिली पूर्णपणे डिजिटल जनगणना",
  "nav.overview": "आढावा",
  "nav.phases": "टप्पे",
  "nav.guide": "स्व-गणना",
  "nav.privacy": "गोपनीयता",
  "nav.schedule": "वेळापत्रक",
  "nav.assistant": "सहाय्यकास विचारा",
  "hero.title": "जनगणना 2027",
  "hero.subtitle": "भारताची 16वी जनगणना — स्वातंत्र्यानंतरची 8वी आणि पहिली पूर्ण डिजिटल गणना।",
  "hero.phase1": "टप्पा 1: गृहयादी व गृहनिर्माण जनगणना (एप्रिल–सप्टें 2026)",
  "hero.phase2": "टप्पा 2: लोकसंख्या गणना (फेब्रुवारी 2027)",
  "phase.title": "दोन टप्पे",
  "phase.intro": "जनगणना 2027 दोन टप्प्यांत चालते. प्रत्येक टप्पा वेगळ्या वेळी वेगळी माहिती गोळा करतो.",
  "phase1.name": "टप्पा 1 — गृहयादी व गृहनिर्माण जनगणना",
  "phase1.dates": "१ एप्रिल – ३० सप्टेंबर २०२६",
  "phase1.collectsTitle": "काय गोळा केले जाते",
  "phase1.collects.housing": "प्रत्येक इमारतीच्या गृहनिर्माण परिस्थिती",
  "phase1.collects.amenities": "प्रत्येक कुटुंबाला उपलब्ध सुविधा",
  "phase1.collects.assets": "कुटुंबाच्या मालमत्ता",
  "phase1.collects.geo": "इमारतींची जिओ-टॅगिंग",
  "phase2.name": "टप्पा 2 — लोकसंख्या गणना",
  "phase2.dates": "फेब्रुवारी 2027",
  "phase2.ref": "संदर्भ तारीख: १ मार्च २०२७",
  "phase2.snow": "हिमाच्छादित प्रदेशांसाठी (लडाख, जम्मू-काश्मीर, हिमाचल प्रदेश, उत्तराखंड) संदर्भ तारीख १ ऑक्टोबर २०२६ आहे.",
  "phase2.collectsTitle": "काय गोळा केले जाते",
  "phase2.collects.individual": "प्रत्येक व्यक्तीचा वैयक्तिक डेटा",
  "phase2.collects.caste": "१९३१ नंतरची पहिली जात जनगणना",
  "schedule.title": "राज्यनिहाय वेळापत्रक",
  "schedule.subtitle": "राज्याच्या गृहयादी टप्प्याच्या अगदी आधी १५ दिवस स्व-गणना सुरू होते.",
  "schedule.search": "तुमचे राज्य शोधा",
  "schedule.selfEnum": "स्व-गणना",
  "schedule.houseListing": "गृहयादी",
  "schedule.open": "आता सुरू",
  "schedule.upcoming": "आगामी",
  "schedule.past": "पूर्ण",
  "schedule.count": "नमुना राज्ये दाखवली",
  "guide.title": "स्व-गणना कशी करावी",
  "guide.subtitle": "१५ दिवसांच्या ऑनलाइन स्व-गणना प्रक्रियेची संपूर्ण मार्गदर्शिका.",
  "guide.step1.title": "पोर्टलला भेट द्या",
  "guide.step1.desc": "तुमच्या राज्याच्या १५ दिवसांच्या स्व-गणना कालावधीत se.census.gov.in वर जा.",
  "guide.step2.title": "तुमची भाषा निवडा",
  "guide.step2.desc": "पोर्टल १६ भाषांना समर्थन देते. तुम्हाला सोयीची भाषा निवडा.",
  "guide.step3.title": "कुटुंबाचा डेटा नोंदवा",
  "guide.step3.desc": "तुमच्या कुटुंबाची माहिती ऑनलाइन नोंदवा. कोणतीही कागदपत्रे आवश्यक नाहीत.",
  "guide.step4.title": "तुमचा स्व-गणना आयडी मिळवा",
  "guide.step4.desc": "तुमच्या नोंदणीची पुष्टी करणारा अनोखा स्व-गणना आयडी मिळतो.",
  "guide.step5.title": "गणकाद्वारे पडताळणी",
  "guide.step5.desc": "प्रत्यक्ष भेटीदरम्यान गणक तुमच्या आयडीने नोंदवलेला डेटा तपासतो.",
  "guide.selfEnumId": "स्व-गणना आयडी",
  "privacy.title": "गोपनीयता व चुकीची माहिती",
  "privacy.subtitle": "तुमचा डेटा सुरक्षित आहे. खोट्या गोष्टींवर विश्वास ठेवू नका.",
  "myth.title": "समज विरुद्ध सत्य",
  "myth.documents.claim": '"मला आधार आणि कागदपत्रे सादर करायची आहेत."',
  "myth.documents.fact": "चुकीचे. स्व-गणनेदरम्यान कोणतीही कागदपत्रे आवश्यक नाहीत.",
  "myth.auth.claim": '"जनगणना माझी माहिती तृतीय पक्षांना देईल."',
  "myth.auth.fact": "चुकीचे. वैयक्तिक डेटा गोपनीय आहे आणि जनगणना अधिनियमांतर्गत संरक्षित आहे.",
  "privacy.act": "गोळा केलेला डेटा पूर्णपणे गोपनीय ठेवला जातो व केवळ जनगणनेसाठी वापरला जातो.",
  "assistant.title": "सहाय्यकास विचारा",
  "assistant.subtitle": "जनगणना 2027 बद्दल प्रश्न? तथ्य-आधारित उत्तरे मिळवा.",
  "assistant.placeholder": "जसे: महाराष्ट्रात स्व-गणना कधी आहे?",
  "assistant.ask": "विचारा",
  "assistant.typing": "विचार करत आहोत…",
  "assistant.error": "क्षमस्व, सहाय्यक सध्या उपलब्ध नाही.",
  "auth.signIn": "Google सह साइन इन करा",
  "auth.signOut": "साइन आउट",
  "signIn.user": "साइन इन केले",
};

const ta: Translation = {
  appName: "ஜன் சூத்திரா",
  tagline: "இந்தியாவின் முதல் முழு டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்பு",
  "nav.overview": "கண்ணோட்டம்",
  "nav.phases": "கட்டங்கள்",
  "nav.guide": "சுய கணக்கெடுப்பு",
  "nav.privacy": "தனியுரிமை",
  "nav.schedule": "அட்டவணை",
  "nav.assistant": "உதவியாளரிடம் கேளுங்கள்",
  "hero.title": "மக்கள் தொகை கணக்கெடுப்பு 2027",
  "hero.subtitle": "இந்தியாவின் 16வது கணக்கெடுப்பு — சுதந்திரத்திற்குப் பிறகு 8வது மற்றும் முதல் முழு டிஜிட்டல் கணக்கெடுப்பு.",
  "hero.phase1": "கட்டம் 1: வீட்டுப்பட்டியல் மற்றும் வீட்டுவசதி கணக்கெடுப்பு (ஏப்–செப் 2026)",
  "hero.phase2": "கட்டம் 2: மக்கள் தொகை கணக்கெடுப்பு (பிப் 2027)",
  "phase.title": "இரண்டு கட்டங்கள்",
  "phase.intro": "மக்கள் தொகை கணக்கெடுப்பு 2027 இரண்டு கட்டங்களில் நடைபெறும். ஒவ்வொரு கட்டமும் வெவ்வேறு நேரத்தில் வெவ்வேறு தகவல்களை சேகரிக்கிறது.",
  "phase1.name": "கட்டம் 1 — வீட்டுப்பட்டியல் மற்றும் வீட்டுவசதி கணக்கெடுப்பு",
  "phase1.dates": "ஏப்ரல் 1 – செப்டம்பர் 30, 2026",
  "phase1.collectsTitle": "என்ன சேகரிக்கப்படுகிறது",
  "phase1.collects.housing": "ஒவ்வொரு கட்டிடத்தின் வீட்டுவசதி நிலைமைகள்",
  "phase1.collects.amenities": "ஒவ்வொரு குடும்பத்திற்கும் கிடைக்கும் வசதிகள்",
  "phase1.collects.assets": "குடும்பச் சொத்துக்கள்",
  "phase1.collects.geo": "கட்டிடங்களின் ஜியோ-டேக்கிங்",
  "phase2.name": "கட்டம் 2 — மக்கள் தொகை கணக்கெடுப்பு",
  "phase2.dates": "பிப்ரவரி 2027",
  "phase2.ref": "குறிப்புத் தேதி: மார்ச் 1, 2027",
  "phase2.snow": "பனிமூட்டமான பகுதிகளுக்கு (லடாக், ஜம்மு-காஷ்மீர், இமாச்சல பிரதேசம், உத்தராகண்ட்) குறிப்புத் தேதி அக்டோபர் 1, 2026.",
  "phase2.collectsTitle": "என்ன சேகரிக்கப்படுகிறது",
  "phase2.collects.individual": "ஒவ்வொரு நபரின் தனிப்பட்ட தரவு",
  "phase2.collects.caste": "1931க்குப் பிறகு இந்தியாவின் முதல் சாதி கணக்கெடுப்பு",
  "schedule.title": "மாநில வாரியாக அட்டவணை",
  "schedule.subtitle": "ஒவ்வொரு மாநிலத்தின் வீட்டுப்பட்டியல் கட்டத்திற்கு முன்பே 15 நாட்களுக்கு சுய கணக்கெடுப்பு திறக்கிறது.",
  "schedule.search": "உங்கள் மாநிலத்தைத் தேடுங்கள்",
  "schedule.selfEnum": "சுய கணக்கெடுப்பு",
  "schedule.houseListing": "வீட்டுப்பட்டியல்",
  "schedule.open": "இப்போது திறந்துள்ளது",
  "schedule.upcoming": "வரவிருக்கும்",
  "schedule.past": "நிறைவு",
  "schedule.count": "மாதிரி மாநிலங்கள் காட்டப்பட்டுள்ளன",
  "guide.title": "சுய கணக்கெடுப்பு எப்படி",
  "guide.subtitle": "15 நாள் ஆன்லைன் சுய கணக்கெடுப்பு செயல்முறையின் முழு வழிகாட்டி.",
  "guide.step1.title": "போர்ட்டலைப் பார்வையிடவும்",
  "guide.step1.desc": "உங்கள் மாநிலத்தின் 15 நாள் சுய கணக்கெடுப்பு காலத்தில் se.census.gov.in வருக.",
  "guide.step2.title": "உங்கள் மொழியைத் தேர்வுசெய்யவும்",
  "guide.step2.desc": "போர்ட்டல் 16 மொழிகளை ஆதரிக்கிறது. உங்களுக்கு வசதியானதை தேர்ந்தெடுக்கவும்.",
  "guide.step3.title": "குடும்பத் தரவைப் பதிவுசெய்யவும்",
  "guide.step3.desc": "உங்கள் குடும்பத் தகவலை ஆன்லைனில் பதிவுசெய்யவும். எந்த ஆவணமும் தேவையில்லை.",
  "guide.step4.title": "உங்கள் சுய கணக்கெடுப்பு ஐடியைப் பெறுங்கள்",
  "guide.step4.desc": "உங்கள் பதிவை உறுதிப்படுத்தும் தனித்துவமான சுய கணக்கெடுப்பு ஐடி கிடைக்கும்.",
  "guide.step5.title": "கணக்கெடுப்பாளர் சரிபார்ப்பு",
  "guide.step5.desc": "நேரடி வருகையின் போது, கணக்கெடுப்பாளர் உங்கள் ஐடி மூலம் பதிவுசெய்த தரவை சரிபார்க்கிறார்.",
  "guide.selfEnumId": "சுய கணக்கெடுப்பு ஐடி",
  "privacy.title": "தனியுரிமை & தவறான தகவல்",
  "privacy.subtitle": "உங்கள் தரவு பாதுகாக்கப்படுகிறது. கட்டுக்கதைகளை நம்பாதீர்கள்.",
  "myth.title": "கட்டுக்கதை vs உண்மை",
  "myth.documents.claim": '"நான் ஆதார் மற்றும் ஆவணங்களை சமர்ப்பிக்க வேண்டும்."',
  "myth.documents.fact": "தவறு. சுய கணக்கெடுப்பின் போது எந்த ஆவணமும் தேவையில்லை.",
  "myth.auth.claim": '"மக்கள் தொகை கணக்கெடுப்பு என் தகவலை மூன்றாம் தரப்பினருக்கு பகிரும்."',
  "myth.auth.fact": "தவறு. தனிப்பட்ட தரவு ரகசியமானது மற்றும் மக்கள் தொகை கணக்கெடுப்பு சட்டத்தின் கீழ் பாதுகாக்கப்படுகிறது.",
  "privacy.act": "சேகரிக்கப்பட்ட தரவு முற்றிலும் ரகசியமாக வைக்கப்பட்டு கணக்கெடுப்பு நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகிறது.",
  "assistant.title": "உதவியாளரிடம் கேளுங்கள்",
  "assistant.subtitle": "மக்கள் தொகை கணக்கெடுப்பு 2027 பற்றிய கேள்விகள்? துல்லியமான பதில்கள்.",
  "assistant.placeholder": "எ.கா. மகாராஷ்டிராவில் சுய கணக்கெடுப்பு எப்போது?",
  "assistant.ask": "கேள்",
  "assistant.typing": "யோசிக்கிறது…",
  "assistant.error": "மன்னிக்கவும், உதவியாளர் தற்போது கிடைக்கவில்லை.",
  "auth.signIn": "Google மூலம் உள்நுழைக",
  "auth.signOut": "வெளியேறு",
  "signIn.user": "உள்நுழைந்துள்ளார்",
};

export const translations: Record<Lang, Translation> = { en, hi, mr, ta };

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  ta: "தமிழ்",
};
