import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n to React
  .init({
    resources: {
      en: {
        translation: {
          navigation: {
            home: "Home",
            services: "Services",
            aboutUs: "About Us",
            contactUs: "Contact Us",
            bookNow: "Book Now",
          },
          
           
          
          
          aboutUs: {
            title: "Welcome to Radiance Beauty Center",
            description: "Welcome to Radiance Beauty Center, where every treatment is a journey to self-care and rejuvenation. Nestled in the heart of the city, our center combines the comfort of a home with the luxury of a spa. Here, we believe that true beauty begins from within, and our expert team is dedicated to helping you look and feel your best. From relaxing facials to transformative skin therapies, each service is designed to nourish your body, mind, and soul. Whether you are preparing for a special occasion or simply indulging in some well-deserved  we offer a personalized experience tailored just for you. Step into Radiance, and let us bring out your natural glow"},
            ourServices:"aboutUs.ourServices",
              ourServicess: "Our Services",
          services: {
            hair: "Hair Services",
            facials: "Facials & Skin Care",
            nails: "Nail Care",
            body: "Body Therapy"
          },
        
            "header": {
              "saleMessage": "Summer Sale And Free Express Delivery - OFF 50%!",
              "bookNow": "Book Now"
         
          },hair: {
            title: "Hair Services",
            whatToExpect: {
              title: "What to Expect",
              description: "Just sit back and relax. Once you choose your stylist level and the service that suits your hair goals, our beauty pros will handle the rest. Our licensed stylists receive ongoing training, ensuring you'll walk out with a look you love and your next appointment on the calendar. See you in the chair!",
            },
            styleConsultation: {
              title: "Style Consultation",
              description: "Every appointment starts with a consultation. Your stylist will listen closely to what you want and study pics that inspire you (or styles you'd rather skip) so they can create a look that's totally yours.",
            },
            expertise: {
              title: "Three Levels of Expertise",
              description: "Our stylists have different levels of experience. Pick the one that suits you best.",
            },
            
              "profile": {
                "title": "Profil de l'utilisateur",
                "username": "Nom d'utilisateur",
                "email": "E-mail",
                "phone_number": "Numéro de téléphone",
                "new_password_placeholder": "Nouveau mot de passe"
              },
              "buttons": {
                "edit": "Modifier",
                "save": "Enregistrer",
                "change_password": "Changer le mot de passe"
              },
              "prompts": {
                "enter_old_password": "Entrez l'ancien mot de passe"
              },
              "success": {
                "profile_updated": "Profil mis à jour avec succès!",
                "password_changed": "Mot de passe changé avec succès!"
              },
              "errors": {
                "not_logged_in": "L'utilisateur n'est pas connecté.",
                "fetch_profile_error": "Erreur lors de la récupération du profil.",
                "update_failed": "Échec de la mise à jour du profil.",
                "update_error": "Une erreur s'est produite lors de la mise à jour du profil.",
                "password_change_failed": "Échec du changement de mot de passe.",
                "change_password_error": "Une erreur s'est produite lors du changement de mot de passe."
              },
              Appointments: "Appointments",
              Cart: "Cart",
              PaymentDetails: "Payment details",
              MesInformations: "My information",
              Support: "Support",
              Deconnexion: "Logout",
              LogoutMessage: "You have logged out.",
            
            







            colorServices: "Color Services",
            haircutStyling: "Haircut & Styling",
            extensionsWigs: "Extensions & Wigs",
            massageDay: "Massage Day (SPA...)",
            description1: "Stylist, Master Stylist, Elite Stylist",
            description2: "Stylist, Master Stylist, Elite Stylist",
            description3: "Stylist, Master Stylist, Elite Stylist",
            description4: "November Pack (5 PM - 9 PM)"
          },
          login: "Log In",
          noAccount: "You don’t have an account?",
          signUp: "Sign Up",
          emailAddress: "Email address",
          password: "Password",
          forgotPassword: "Forgot Password?",
          terms: "Terms of use",
          privacyPolicy: "Privacy Policy",
          robotCheck: "I'm not a robot",
          loginButton: "Log In",
          loginFailed: "Login failed",
          welcomeMessage: "Welcome Back!",
          "createAccount": "Create an account",
  "usernameRequired": "Username is required",
  "emailRequired": "Email is required",
  "passwordRequired": "Password is required",
  "passwordMinLength": "Password must be at least 8 characters",


    "ourOffers": "Nos offres",
    "viewAll": "Voir tout",
    "fullDayPackage": "Forfait journée complète",
    "mondayToWednesday": "Du lundi au mercredi (5h - 21h)",
    "nailCarePackage": "Forfait soins des ongles",
    "allYear": "Toute l'année (17h - 21h)",
    "massageDay": "Jour de massage (SPA ...)",
    "novemberPack": "Pack de novembre (17h - 21h)",
    "facialSkinCarePack": "Forfait soins du visage et de la peau",
    "welcomeMessage": "Bienvenue au Radiance Beauty Center, où chaque traitement est un voyage",
  "aboutText": "Niché au cœur de la ville, notre centre allie le confort d'une maison au luxe d'un spa. Ici, nous croyons que la véritable beauté commence de l'intérieur, et notre équipe d'experts est dédiée à vous aider à paraître et à vous sentir au mieux de votre forme. Des soins du visage relaxants aux thérapies de la peau transformantes, chaque service est conçu pour nourrir votre corps, votre esprit et votre âme. Que vous vous prépariez pour une occasion spéciale ou que vous vous offriez simplement un moment de détente bien mérité, nous vous offrons une expérience personnalisée rien que pour vous. Entrez dans Radiance et laissez-nous révéler votre éclat naturel."
,
  best:'Choose From The Best',
 
    "phoneNumber": "Phone number",
    "price": "Price",
    "consultPortfolio": "Consult Portfolio",
 
      "mrs": "Mrs.",
      "number": "Phone Number",
      "price": "Price",
      "description": "Description",
      "loremText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
    
,

  "chooseDate": "Choose Date",
  "ourServiceProviders": "Our Prestataires",
  "nailsSpecialist": "Nails Specialist",
  "hairSpecialist": "Hair Specialist",
  "makeupHairSpecialist": "Makeup & Hair Specialist",
  "viewMore": "View More",



  

  }
  
          
        
      },
      ar: {
        translation: {
          navigation: {
            home: "الصفحة الرئيسية",
            services: "الخدمات",
            aboutUs: "من نحن",
            contactUs: "اتصل بنا",
            bookNow: "احجز الآن",
            

          },
          
          aboutUs: {
            title: "مرحبًا بكم في مركز Radiance للجمال",
            description: "مرحبًا بكم في مركز Radiance للجمال، حيث كل علاج هو رحلة للاعتناء بالنفس والتجديد. يقع مركزنا في قلب المدينة، حيث يجمع بين راحة المنزل وفخامة المنتجع الصحي. هنا، نؤمن أن الجمال الحقيقي يبدأ من الداخل، وفريقنا الخبراء مكرس لمساعدتك على أن تبدو وتشعر بأفضل حال. من العناية بالوجه المريحة إلى العلاجات الجلدية التحولية، كل خدمة تهدف إلى تغذية جسدك وعقلك وروحك. سواء كنت تستعد لمناسبة خاصة أو ببساطة تستمتع بوقتك الخاص، نحن نقدم لك تجربة مخصصة مصممة خصيصًا لك. ادخل إلى Radiance، ودعنا نبرز إشراقتك الطبيعية.",
        },
             ourServices: "خدماتنا",
             
             ourServicess: "خدماتنا"
       ,
          services: {
            hair: "خدمات الشعر",
            facials: "العناية بالوجه والبشرة",
            nails: "العناية بالأظافر",
            body: "العلاج بالجسم"
          },
          "header": {
    "saleMessage": "تخفيضات الصيف وتوصيل سريع مجاني - خصم 50%!",
    "bookNow": "احجز الآن"
  },
  
    "chooseDate": "اختر التاريخ",
     "viewMore": "view more",
  
    
    
  

      "ourServiceProviders": "مقدمو الخدمة لدينا",
      "nailsSpecialist": "متخصصة في الأظافر",
      "hairSpecialist": "متخصصة في الشعر",
      "makeupHairSpecialist": "متخصصة في المكياج والشعر",
      "viewMore": "عرض المزيد",







  
    "mrs": "السيدة",
    "number": "رقم الهاتف",
    "price": "السعر",
    "description": "الوصف",
    "loremText": "لوريم إيبسوم دولور سيت أميت، كونسكتتور أديبسينغ إيليت. سيد دو إيوسمود تيمبور إنسيديدونت أوت لابوري إت دولوري ميغنا أليكا. أوت إينيم آد مينيوم فينيام، كويز نوسترود إكزيرسيتيشن أولامكو لابوريس نيسي أوت أليكيب إكس إيا كومودو كويزوات. دويس أوتي إيرير دولور في ريبريهنديريت في فوليبتات فيليت إيسي سيليوم دولوري إيو فيغيات نولا باريتور. إكسبيتيور سينت أوكايكات كويبيداتات نون بروفيدنت، سانت في كولبا كوي أوفيسيا ديسيرنت موليت أنيم إيديست لابوروم."
  ,
  
  hair: {
    title: "خدمات الشعر",
    whatToExpect: {
      title: "ما الذي يمكن توقعه",
      description: "استرخِ واستمتع. بمجرد اختيار مستوى المصمم والخدمة التي تناسب أهداف شعرك، سيتولى خبراؤنا الباقي. يتلقى المصممون المرخصون لدينا تدريبًا مستمرًا، مما يضمن أنك ستحصل على مظهر تحبه وموعدك القادم سيكون محددًا مسبقًا. نراك في الكرسي!",
    },
    styleConsultation: {
      title: "استشارة النمط",
      description: "تبدأ كل جلسة باستشارة. سيستمع المصمم الخاص بك بعناية لما تريد ويدرس الصور التي تلهمك (أو الأنماط التي تفضل تجنبها) حتى يتمكن من إنشاء مظهر يناسبك تمامًا.",
    },
    expertise: {
      title: "ثلاثة مستويات من الخبرة",
      description: "لدى مصممينا مستويات مختلفة من الخبرة. اختر ما يناسبك أكثر.",
    },
    colorServices: "خدمات التلوين",
    haircutStyling: "قص الشعر وتصفيفه",
    extensionsWigs: "الإضافات والشعر المستعار",
    massageDay: "يوم التدليك (SPA...)",
    description1: "مصمم، مصمم رئيسي، مصمم نخبوي",
    description2: "مصمم، مصمم رئيسي، مصمم نخبوي",
    description3: "مصمم، مصمم رئيسي، مصمم نخبوي",
    description4: "عرض نوفمبر (5 مساءً - 9 مساءً)"
  },
  "createAccount": "إنشاء حساب",
  "usernameRequired": "اسم المستخدم مطلوب",
  "emailRequired": "البريد الإلكتروني مطلوب",
  "passwordRequired": "كلمة المرور مطلوبة",
  "passwordMinLength": "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
    "profile": {
      "title": "ملف المستخدم",
      "username": "اسم المستخدم",
      "email": "البريد الإلكتروني",
      "phone_number": "رقم الهاتف",
      "new_password_placeholder": "كلمة مرور جديدة"
    },
    "buttons": {
      "edit": "تعديل",
      "save": "حفظ",
      "change_password": "تغيير كلمة المرور"
    },
    "prompts": {
      "enter_old_password": "أدخل كلمة المرور القديمة"
    },
    "success": {
      "profile_updated": "تم تحديث الملف الشخصي بنجاح!",
      "password_changed": "تم تغيير كلمة المرور بنجاح!"
    },
    "errors": {
      "not_logged_in": "المستخدم غير مسجل الدخول.",
      "fetch_profile_error": "خطأ في جلب بيانات الملف الشخصي.",
      "update_failed": "فشل في تحديث الملف الشخصي.",
      "update_error": "حدث خطأ أثناء تحديث الملف الشخصي.",
      "password_change_failed": "فشل في تغيير كلمة المرور.",
      "change_password_error": "حدث خطأ أثناء تغيير كلمة المرور."
    }, Appointments: "المواعيد",
    Cart: "عربة التسوق",
    PaymentDetails: "تفاصيل الدفع",
    MesInformations: "معلوماتي",
    Support: "الدعم",
    Deconnexion: "تسجيل الخروج",
    LogoutMessage: "تم تسجيل الخروج.",
    login: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      signUp: "إنشاء حساب",
      emailAddress: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "هل نسيت كلمة المرور؟",
      terms: "شروط الاستخدام",
      privacyPolicy: "سياسة الخصوصية",
      robotCheck: "أنا لست روبوتاً",
      loginButton: "تسجيل الدخول",
      loginFailed: "فشل تسجيل الدخول",
      welcomeMessage: "مرحباً بعودتك!",
  
      
        "ourOffers": "عروضنا",
        "viewAll": "عرض الكل",
        "fullDayPackage": "باقة اليوم الكامل",
        "mondayToWednesday": "من الإثنين إلى الأربعاء (5 صباحًا - 9 مساءً)",
        "nailCarePackage": "باقة العناية بالأظافر",
        "allYear": "طوال العام (5 مساءً - 9 مساءً)",
        "massageDay": "يوم التدليك (سبا ...)",
        "novemberPack": "باقة نوفمبر (5 مساءً - 9 مساءً)",
        "facialSkinCarePack": "باقة العناية بالوجه والبشرة",
  
          "welcomeMessage": "مرحبًا بك في مركز Radiance للجمال، حيث كل علاج هو رحلة",
          "aboutText": "يقع مركزنا في قلب المدينة، حيث يجمع بين راحة المنزل ورفاهية المنتجع الصحي. هنا نعتقد أن الجمال الحقيقي يبدأ من الداخل، وفريقنا المتخصص مكرس لمساعدتك في أن تبدو وتشعر بأفضل حال. من العلاجات المريحة للوجه إلى العلاجات التجميلية المحورية للبشرة، كل خدمة مصممة لتغذية جسمك وعقلك وروحك. سواء كنت تستعد لحدث خاص أو ببساطة تستمتع ببعض الوقت الخاص بك، فإننا نقدم تجربة مخصصة مصممة خصيصًا لك. ادخل إلى Radiance ودعنا نبرز إشراقتك الطبيعية."
       ,
       best:"اختر من الأفضل",

        "phoneNumber": "رقم الهاتف",
        "price": "السعر",
        "consultPortfolio": "استعرض المحفظة",
          "viewMore": "عرض المزيد"
   
      


        
      
      
  
        }
      }
    },
    fallbackLng: 'en', // Default language
    lng: 'en', // Initial language
    interpolation: {
      escapeValue: false // React already escapes output by default
    }
  });

export default i18n;
