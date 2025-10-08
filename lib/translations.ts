export type Language = 'English' | 'Farsi' | 'Chinese' | 'Russian' | 'Ukrainian' | 'Hindi';

export const translations = {
  // Page 1 - Threats and Dangers
  page1: {
    hero: {
      English: 'EXPOSED',
      Farsi: 'در معرض خطر',
      Chinese: '暴露',
      Russian: 'ПОД УГРОЗОЙ',
      Ukrainian: 'ПІД ЗАГРОЗОЮ',
      Hindi: 'असुरक्षित',
    },
    threats: {
      English: ['HACKED', 'STOLEN', 'LEAKED', 'ATTACKED', 'VULNERABLE'],
      Farsi: ['هک شده', 'دزدیده شده', 'نشت داده', 'حمله شده', 'آسیب‌پذیر'],
      Chinese: ['被黑', '被盗', '泄露', '攻击', '脆弱'],
      Russian: ['ВЗЛОМАН', 'УКРАДЕНО', 'УТЕЧКА', 'АТАКОВАН', 'УЯЗВИМ'],
      Ukrainian: ['ЗЛОМ', 'ВКРАДЕНО', 'ВИТІК', 'АТАКА', 'ВРАЗЛИВИЙ'],
      Hindi: ['हैक किया', 'चोरी', 'लीक', 'हमला', 'कमजोर'],
    },
    ctaButton: {
      English: '1 GB Completely Free',
      Farsi: '۱ گیگابایت کاملا رایگان',
      Chinese: '1 GB 完全免费',
      Russian: '1 ГБ Совершенно Бесплатно',
      Ukrainian: '1 ГБ Цілком Безкоштовно',
      Hindi: '1 जीबी पूरी तरह मुफ़्त',
    },
  },

  // Page 2 - Tracked and Monitored
  page2: {
    hero: {
      English: 'YOUR DATA',
      Farsi: 'اطلاعات شما',
      Chinese: '你的数据',
      Russian: 'ВАШИ ДАННЫЕ',
      Ukrainian: 'ВАШІ ДАНІ',
      Hindi: 'आपका डेटा',
    },
    surveillance: {
      English: ['WATCHING', 'TRACKING', 'RECORDING', 'MONITORING', 'LOGGING'],
      Farsi: ['نظارت', 'ردیابی', 'ضبط', 'مانیتور', 'ثبت'],
      Chinese: ['监视', '追踪', '记录', '监控', '日志'],
      Russian: ['НАБЛЮДЕНИЕ', 'ОТСЛЕЖИВАНИЕ', 'ЗАПИСЬ', 'МОНИТОРИНГ', 'ЛОГИРОВАНИЕ'],
      Ukrainian: ['СПОСТЕРЕЖЕННЯ', 'ВІДСТЕЖЕННЯ', 'ЗАПИС', 'МОНІТОРИНГ', 'ЛОГУВАННЯ'],
      Hindi: ['निगरानी', 'ट्रैकिंग', 'रिकॉर्डिंग', 'मॉनिटरिंग', 'लॉगिंग'],
    },
    entities: {
      police: {
        English: 'Police',
        Farsi: 'پلیس',
        Chinese: '警察',
        Russian: 'Полиция',
        Ukrainian: 'Поліція',
        Hindi: 'पुलिस',
      },
      hacker: {
        English: 'Hacker',
        Farsi: 'هکر',
        Chinese: '黑客',
        Russian: 'Хакер',
        Ukrainian: 'Хакер',
        Hindi: 'हैकर',
      },
      isp: {
        English: 'ISP',
        Farsi: 'ISP',
        Chinese: 'ISP',
        Russian: 'ISP',
        Ukrainian: 'ISP',
        Hindi: 'ISP',
      },
    },
    ctaButton: {
      English: 'Secure Your Data',
      Farsi: 'اطلاعات خود را ایمن کنید',
      Chinese: '保护您的数据',
      Russian: 'Защитите Ваши Данные',
      Ukrainian: 'Захистіть Ваші Дані',
      Hindi: 'अपने डेटा को सुरक्षित करें',
    },
  },

  // Page 3 - Blocked Services and Censorship
  page3: {
    hero: {
      English: 'BLOCKED',
      Farsi: 'مسدود شده',
      Chinese: '被封锁',
      Russian: 'ЗАБЛОКИРОВАНО',
      Ukrainian: 'ЗАБЛОКОВАНО',
      Hindi: 'अवरुद्ध',
    },
    subtitle: {
      English: 'Censored in restricted countries',
      Farsi: 'سانسور شده در کشورهای محدود',
      Chinese: '在受限国家被审查',
      Russian: 'Цензурировано в странах с ограничениями',
      Ukrainian: 'Цензуровано в країнах з обмеженнями',
      Hindi: 'प्रतिबंधित देशों में सेंसर',
    },
    services: {
      youtube: {
        name: {
          English: 'YouTube',
          Farsi: 'یوتیوب',
          Chinese: 'YouTube',
          Russian: 'YouTube',
          Ukrainian: 'YouTube',
          Hindi: 'YouTube',
        },
        blocked: {
          English: 'NO SIGNAL',
          Farsi: 'بدون سیگنال',
          Chinese: '无信号',
          Russian: 'НЕТ СИГНАЛА',
          Ukrainian: 'НЕМАЄ СИГНАЛУ',
          Hindi: 'कोई संकेत नहीं',
        },
      },
      spotify: {
        name: {
          English: 'Spotify',
          Farsi: 'اسپاتیفای',
          Chinese: 'Spotify',
          Russian: 'Spotify',
          Ukrainian: 'Spotify',
          Hindi: 'Spotify',
        },
        blocked: {
          English: 'MUTED',
          Farsi: 'خاموش',
          Chinese: '静音',
          Russian: 'ЗАГЛУШЕНО',
          Ukrainian: 'ЗАГЛУШЕНО',
          Hindi: 'म्यूट',
        },
      },
      twitter: {
        name: {
          English: 'X (Twitter)',
          Farsi: 'ایکس (توییتر)',
          Chinese: 'X (推特)',
          Russian: 'X (Twitter)',
          Ukrainian: 'X (Twitter)',
          Hindi: 'X (ट्विटर)',
        },
        blocked: {
          English: 'CENSORED',
          Farsi: 'سانسور',
          Chinese: '审查',
          Russian: 'ЦЕНЗУРА',
          Ukrainian: 'ЦЕНЗУРА',
          Hindi: 'सेंसर',
        },
      },
      instagram: {
        name: {
          English: 'Instagram',
          Farsi: 'اینستاگرام',
          Chinese: 'Instagram',
          Russian: 'Instagram',
          Ukrainian: 'Instagram',
          Hindi: 'Instagram',
        },
        blocked: {
          English: 'ACCESS DENIED',
          Farsi: 'دسترسی رد شد',
          Chinese: '拒绝访问',
          Russian: 'ДОСТУП ЗАПРЕЩЁН',
          Ukrainian: 'ДОСТУП ЗАБОРОНЕНО',
          Hindi: 'पहुंच अस्वीकृत',
        },
      },
      netflix: {
        name: {
          English: 'Netflix',
          Farsi: 'نتفلیکس',
          Chinese: 'Netflix',
          Russian: 'Netflix',
          Ukrainian: 'Netflix',
          Hindi: 'Netflix',
        },
        blocked: {
          English: 'UNAVAILABLE',
          Farsi: 'در دسترس نیست',
          Chinese: '不可用',
          Russian: 'НЕДОСТУПНО',
          Ukrainian: 'НЕДОСТУПНО',
          Hindi: 'अनुपलब्ध',
        },
      },
      facebook: {
        name: {
          English: 'Facebook',
          Farsi: 'فیسبوک',
          Chinese: 'Facebook',
          Russian: 'Facebook',
          Ukrainian: 'Facebook',
          Hindi: 'Facebook',
        },
        blocked: {
          English: 'RESTRICTED',
          Farsi: 'محدود',
          Chinese: '受限',
          Russian: 'ОГРАНИЧЕНО',
          Ukrainian: 'ОБМЕЖЕНО',
          Hindi: 'प्रतिबंधित',
        },
      },
      telegram: {
        name: {
          English: 'Telegram',
          Farsi: 'تلگرام',
          Chinese: 'Telegram',
          Russian: 'Telegram',
          Ukrainian: 'Telegram',
          Hindi: 'Telegram',
        },
        blocked: {
          English: 'FORBIDDEN',
          Farsi: 'ممنوع',
          Chinese: '禁止',
          Russian: 'ЗАПРЕЩЕНО',
          Ukrainian: 'ЗАБОРОНЕНО',
          Hindi: 'निषिद्ध',
        },
      },
      paypal: {
        name: {
          English: 'PayPal',
          Farsi: 'پی‌پال',
          Chinese: 'PayPal',
          Russian: 'PayPal',
          Ukrainian: 'PayPal',
          Hindi: 'PayPal',
        },
        blocked: {
          English: 'DECLINED',
          Farsi: 'رد شده',
          Chinese: '被拒',
          Russian: 'ОТКЛОНЕНО',
          Ukrainian: 'ВІДХИЛЕНО',
          Hindi: 'अस्वीकृत',
        },
      },
      whatsapp: {
        name: {
          English: 'WhatsApp',
          Farsi: 'واتساپ',
          Chinese: 'WhatsApp',
          Russian: 'WhatsApp',
          Ukrainian: 'WhatsApp',
          Hindi: 'WhatsApp',
        },
        blocked: {
          English: 'BLOCKED',
          Farsi: 'مسدود',
          Chinese: '被封',
          Russian: 'БЛОКИРОВАНО',
          Ukrainian: 'ЗАБЛОКОВАНО',
          Hindi: 'ब्लॉक',
        },
      },
      soundcloud: {
        name: {
          English: 'SoundCloud',
          Farsi: 'ساندکلاود',
          Chinese: 'SoundCloud',
          Russian: 'SoundCloud',
          Ukrainian: 'SoundCloud',
          Hindi: 'SoundCloud',
        },
        blocked: {
          English: 'SILENCED',
          Farsi: 'سکوت',
          Chinese: '静默',
          Russian: 'ЗАГЛУШЕНО',
          Ukrainian: 'ЗАГЛУШЕНО',
          Hindi: 'मौन',
        },
      },
    },
    
    // Card-specific content for authentic UIs
    telegram: {
      message: {
        English: 'Hey! Check out this article about freedom...',
        Farsi: 'سلام! این مقاله را درباره آزادی ببین...',
        Chinese: '嘿！看看这篇关于自由的文章...',
        Russian: 'Привет! Посмотри эту статью о свободе...',
        Ukrainian: 'Привіт! Подивись цю статтю про свободу...',
        Hindi: 'अरे! स्वतंत्रता के बारे में यह लेख देखो...',
      },
      typing: {
        English: 'Type a message...',
        Farsi: 'پیام بنویسید...',
        Chinese: '输入消息...',
        Russian: 'Введите сообщение...',
        Ukrainian: 'Введіть повідомлення...',
        Hindi: 'संदेश लिखें...',
      },
    },
    
    facebook: {
      status: {
        English: 'What\'s on your mind?',
        Farsi: 'چه فکری می‌کنید؟',
        Chinese: '你在想什么？',
        Russian: 'Что у вас нового?',
        Ukrainian: 'Що у вас нового?',
        Hindi: 'आप क्या सोच रहे हैं?',
      },
      post: {
        English: 'Just shared my thoughts on freedom and democracy...',
        Farsi: 'فقط افکارم را درباره آزادی و دموکراسی به اشتراک گذاشتم...',
        Chinese: '刚刚分享了我关于自由和民主的想法...',
        Russian: 'Только что поделился мыслями о свободе и демократии...',
        Ukrainian: 'Щойно поділився думками про свободу та демократію...',
        Hindi: 'अभी स्वतंत्रता और लोकतंत्र पर अपने विचार साझा किए...',
      },
    },
    
    twitter: {
      tweet: {
        English: 'Everyone deserves the right to speak freely and access information...',
        Farsi: 'همه حق دارند آزادانه صحبت کنند و به اطلاعات دسترسی داشته باشند...',
        Chinese: '每个人都有权自由发言和获取信息...',
        Russian: 'Каждый заслуживает права свободно высказываться и получать доступ к информации...',
        Ukrainian: 'Кожен заслуговує права вільно висловлюватися та отримувати доступ до інформації...',
        Hindi: 'सभी को स्वतंत्र रूप से बोलने और जानकारी तक पहुंचने का अधिकार है...',
      },
    },
    
    youtube: {
      title: {
        English: 'Documentary: Internet Freedom',
        Farsi: 'مستند: آزادی اینترنت',
        Chinese: '纪录片：互联网自由',
        Russian: 'Документальный фильм: Свобода Интернета',
        Ukrainian: 'Документальний фільм: Свобода Інтернету',
        Hindi: 'डॉक्यूमेंट्री: इंटरनेट स्वतंत्रता',
      },
    },
  },

  // Header
  header: {
    blog: {
      English: 'Blog',
      Farsi: 'بلاگ',
      Chinese: '博客',
      Russian: 'Блог',
      Ukrainian: 'Блог',
      Hindi: 'ब्लॉग',
    },
    faq: {
      English: 'FAQ',
      Farsi: 'سوالات متداول',
      Chinese: '常见问题',
      Russian: 'FAQ',
      Ukrainian: 'FAQ',
      Hindi: 'FAQ',
    },
    privacy: {
      English: 'Privacy',
      Farsi: 'حریم خصوصی',
      Chinese: '隐私',
      Russian: 'Конфиденциальность',
      Ukrainian: 'Конфіденційність',
      Hindi: 'गोपनीयता',
    },
    about: {
      English: 'About Us',
      Farsi: 'درباره ما',
      Chinese: '关于我们',
      Russian: 'О нас',
      Ukrainian: 'Про нас',
      Hindi: 'हमारे बारे में',
    },
    login: {
      English: 'Login',
      Farsi: 'ورود',
      Chinese: '登录',
      Russian: 'Войти',
      Ukrainian: 'Увійти',
      Hindi: 'लॉगिन',
    },
    theme: {
      English: 'Theme',
      Farsi: 'تم',
      Chinese: '主题',
      Russian: 'Тема',
      Ukrainian: 'Тема',
      Hindi: 'थीम',
    },
    language: {
      English: 'Language',
      Farsi: 'زبان',
      Chinese: '语言',
      Russian: 'Язык',
      Ukrainian: 'Мова',
      Hindi: 'भाषा',
    },
  },

  // Footer
  footer: {
    privacyPolicy: {
      English: 'Privacy Policy',
      Farsi: 'سیاست حریم خصوصی',
      Chinese: '隐私政策',
      Russian: 'Политика конфиденциальности',
      Ukrainian: 'Політика конфіденційності',
      Hindi: 'गोपनीयता नीति',
    },
  },

  // Page 7 - Pricing
  page7: {
    hero: {
      English: 'FREE!',
      Farsi: 'رایگان!',
      Chinese: '免费！',
      Russian: 'БЕСПЛАТНО!',
      Ukrainian: 'БЕЗКОШТОВНО!',
      Hindi: 'मुफ़्त!',
    },
    freeTrialTitle: {
      English: 'Start Your Free Trial Today!',
      Farsi: 'امروز آزمایش رایگان خود را شروع کنید!',
      Chinese: '立即开始免费试用！',
      Russian: 'Начните бесплатную пробную версию сегодня!',
      Ukrainian: 'Почніть безкоштовну пробну версію сьогодні!',
      Hindi: 'आज ही अपना मुफ़्त परीक्षण शुरू करें!',
    },
    noCreditCard: {
      English: 'NO Credit Card',
      Farsi: 'بدون کارت اعتباری',
      Chinese: '无需信用卡',
      Russian: 'БЕЗ кредитной карты',
      Ukrainian: 'БЕЗ кредитної картки',
      Hindi: 'कोई क्रेडिट कार्ड नहीं',
    },
    getStarted: {
      English: 'Get Started',
      Farsi: 'شروع کنید',
      Chinese: '开始使用',
      Russian: 'Начать',
      Ukrainian: 'Почати',
      Hindi: 'शुरू करें',
    },
  },

  // Scroll indicators
  scroll: {
    scroll: {
      English: 'Scroll',
      Farsi: 'اسکرول',
      Chinese: '滚动',
      Russian: 'Прокрутить',
      Ukrainian: 'Прокрутити',
      Hindi: 'स्क्रॉल करें',
    },
    swipe: {
      English: 'Swipe',
      Farsi: 'بکشید',
      Chinese: '滑动',
      Russian: 'Свайп',
      Ukrainian: 'Свайп',
      Hindi: 'स्वाइप करें',
    },
  },

  // Page names for navigation
  pageNames: {
    page1: {
      English: 'Dangers',
      Farsi: 'خطرات',
      Chinese: '危险',
      Russian: 'Опасности',
      Ukrainian: 'Небезпеки',
      Hindi: 'खतरे',
    },
    page2: {
      English: 'Tracked',
      Farsi: 'ردیابی',
      Chinese: '被追踪',
      Russian: 'Отслеживается',
      Ukrainian: 'Відстежується',
      Hindi: 'ट्रैक किया गया',
    },
    page3: {
      English: 'Restrictions',
      Farsi: 'محدودیت‌ها',
      Chinese: '限制',
      Russian: 'Ограничения',
      Ukrainian: 'Обмеження',
      Hindi: 'प्रतिबंध',
    },
    page4: {
      English: 'Solution',
      Farsi: 'راه حل',
      Chinese: '解决方案',
      Russian: 'Решение',
      Ukrainian: 'Рішення',
      Hindi: 'समाधान',
    },
    page5: {
      English: 'Security',
      Farsi: 'امنیت',
      Chinese: '安全',
      Russian: 'Безопасность',
      Ukrainian: 'Безпека',
      Hindi: 'सुरक्षा',
    },
    page6: {
      English: 'Technologies',
      Farsi: 'فناوری‌ها',
      Chinese: '技术',
      Russian: 'Технологии',
      Ukrainian: 'Технології',
      Hindi: 'प्रौद्योगिकी',
    },
    page7: {
      English: 'Freedom',
      Farsi: 'آزادی',
      Chinese: '自由',
      Russian: 'Свобода',
      Ukrainian: 'Свобода',
      Hindi: 'स्वतंत्रता',
    },
  },
};

export function getTranslation(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value?.[language] || value?.['English'] || key;
}

export function getTranslationArray(key: string, language: Language): string[] {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value?.[language] || value?.['English'] || [];
}

