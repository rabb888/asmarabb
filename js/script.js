// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Translations object
    const translations = {
        en: {
            home: "Home",
            about: "About Us",
            team: "Team",
            services: "Services",
            management: "Management Consultancy",
            marketing: "Marketing Consultancy",
            hr: "HR Consultancy in UAE",
            ecommerce: "E-commerce Consultancy",
            quality: "Quality Management Consultancy",
            hospitality: "Hospitality Consultancy",
            blog: "Blog",
            testimonials: "Testimonials",
            careers: "Careers",
            contact: "Contact",
            heroHeading: "Empowering Ambitions. Elevating Businesses.",
            heroSub: "Your trusted partner in business transformation across the UAE",
            getStarted: "Get Started",
            vision: "Our Vision",
            visionText: "To be the UAE's most trusted partner in business transformation, driving sustainable growth and operational excellence for organizations across all sectors.",
            mission: "Our Mission",
            missionText: "Our mission is to empower businesses in the UAE and beyond with innovative, tailored consultancy solutions in management, marketing, HR, e-commerce, and quality measurement.",
            ourStory: "Our Story, Values, and Commitment",
            discover: "Discover what makes Rabb Businesses the trusted partner for organizations across the UAE",
            aboutText1: "Rabb Businesses was founded in 2015 with a simple yet powerful vision: to help businesses in the UAE achieve their full potential through strategic guidance and operational excellence. What began as a small consultancy firm in Dubai has grown into a comprehensive business transformation partner serving clients across various industries.",
            aboutText2: "Our founder, Mohammed Rabb, recognized the need for localized business expertise that combines international best practices with deep understanding of the UAE market. Starting with just two consultants, we've grown our team to over 50 professionals while maintaining our commitment to personalized service and measurable results.",
            founder: "Mohammed Rabb, Founder & CEO",
            coreValues: "Our Core Values",
            valuesDesc: "These principles guide every decision we make and every service we deliver",
            integrity: "Integrity",
            integrityText: "We maintain the highest ethical standards, ensuring transparency and honesty in all our interactions.",
            innovation: "Innovation",
            innovationText: "We continuously seek creative solutions that drive meaningful change for our clients.",
            excellence: "Excellence",
            excellanceText: "We strive for the highest quality in everything we do, setting and exceeding industry standards.",
            collaboration: "Collaboration",
            collaborationText: "We believe in partnership, working closely with clients to achieve shared success.",
            learning: "Continuous Learning",
            learningText: "We invest in our team's growth to stay at the forefront of business knowledge and practices.",
            community: "Community Impact",
            communityText: "We're committed to creating positive social and economic impact in the communities we serve.",
            ourServices: "Our Services",
            servicesDesc: "We provide a full suite of consultancy solutions designed to help your organization thrive in the UAE's dynamic business environment.",
            managementDesc: "Strategic planning, operational optimization, and performance improvement to drive sustainable growth.",
            marketingDesc: "Data-driven marketing strategies, campaign management, and brand positioning to maximize your market reach.",
            hrDesc: "Talent acquisition, HR policy development, training, and compliance support to build high-performing teams.",
            learnMore: "Learn More",
            ready: "Ready to elevate your business?",
            letsConnect: "Let's connect!",
            name: "Name",
            email: "Email",
            phone: "Phone",
            company: "Company",
            message: "Message",
            submit: "Submit",
            reachUs: "Other Ways to Reach Us",
            followUs: "Follow Us",
            quickLinks: "Quick Links",
            contactInfo: "Contact Info",
            address: "Dubai, UAE",
            copyright: "2025 Rabb Businesses. All rights reserved.",
            whatsappTooltip: "Chat with us on WhatsApp",
            tagline: "Empowering Ambitions. Elevating Businesses."
        },
        ar: {
            home: "الرئيسية",
            about: "من نحن",
            team: "فريقنا",
            services: "الخدمات",
            management: "استشارات الإدارة",
            marketing: "استشارات التسويق",
            hr: "استشارات الموارد البشرية في الإمارات",
            ecommerce: "استشارات التجارة الإلكترونية",
            quality: "استشارات إدارة الجودة",
            hospitality: "استشارات الضيافة",
            blog: "المدونة",
            testimonials: "آراء العملاء",
            careers: "الوظائف",
            contact: "اتصل بنا",
            heroHeading: "تمكين الطموحات. رفع مستوى الأعمال.",
            heroSub: "شريكك الموثوق في تحول الأعمال عبر الإمارات العربية المتحدة",
            getStarted: "ابدأ الآن",
            vision: "رؤيتنا",
            visionText: "أن نكون الشريك الأكثر ثقة في تحول الأعمال في الإمارات العربية المتحدة، مما يؤدي إلى نمو مستدام وتميز تشغيلي للمنظمات في جميع القطاعات.",
            mission: "مهمتنا",
            missionText: "مهمتنا هي تمكين الشركات في الإمارات العربية المتحدة وخارجها من خلال حلول استشارية مبتكرة ومصممة خصيصًا في مجالات الإدارة والتسويق والموارد البشرية والتجارة الإلكترونية وقياس الجودة.",
            ourStory: "قصتنا وقيمنا والتزامنا",
            discover: "اكتشف ما يجعل شركة راب للأعمال شريكًا موثوقًا به للمنظمات في جميع أنحاء الإمارات",
            aboutText1: "تأسست شركة راب للأعمال في عام 2015 برؤية بسيطة لكنها قوية: لمساعدة الشركات في الإمارات على تحقيق إمكاناتها الكاملة من خلال التوجيه الاستراتيجي والتميز التشغيلي. ما بدأ كشركة استشارية صغيرة في دبي قد تطور إلى شريك شامل لتحول الأعمال يخدم العملاء في مختلف الصناعات.",
            aboutText2: "أدرك مؤسسنا، محمد رب، الحاجة إلى خبرة أعمال محلية تجمع بين أفضل الممارسات الدولية والفهم العميق لسوق الإمارات. بدءًا من مستشارين اثنين فقط، قمنا بتوسيع فريقنا إلى أكثر من 50 محترفًا مع الحفاظ على التزامنا بالخدمة الشخصية والنتائج القابلة للقياس.",
            founder: "محمد رب، المؤسس والرئيس التنفيذي",
            coreValues: "قيمنا الأساسية",
            valuesDesc: "هذه المبادئ توجه كل قرار نتخذه وكل خدمة نقدمها",
            integrity: "النزاهة",
            integrityText: "نحافظ على أعلى المعايير الأخلاقية، وضمان الشفافية والصدق في جميع تفاعلاتنا.",
            innovation: "الابتكار",
            innovationText: "نسعى باستمرار إلى حلول إبداعية تقود التغيير الهادف لعملائنا.",
            excellence: "التميز",
            excellanceText: "نسعى لتحقيق أعلى جودة في كل ما نقوم به، ووضع وتجاوز معايير الصناعة.",
            collaboration: "التعاون",
            collaborationText: "نؤمن بالشراكة، والعمل عن كثب مع العملاء لتحقيق النجاح المشترك.",
            learning: "التعلم المستمر",
            learningText: "نستثمر في نمو فريقنا للبقاء في طليعة المعرفة والممارسات التجارية.",
            community: "التأثير المجتمعي",
            communityText: "نحن ملتزمون بخلق تأثير اجتماعي واقتصادي إيجابي في المجتمعات التي نخدمها.",
            ourServices: "خدماتنا",
            servicesDesc: "نقدم مجموعة كاملة من الحلول الاستشارية المصممة لمساعدة مؤسستك على الازدهار في البيئة التجارية الديناميكية في الإمارات.",
            managementDesc: "التخطيط الاستراتيجي، والتحسين التشغيلي، وتحسين الأداء لدفع النمو المستدام.",
            marketingDesc: "استراتيجيات التسويق القائمة على البيانات، وإدارة الحملات، وتحديد المواقع العلامة التجارية لتعظيم وصولك إلى السوق.",
            hrDesc: "اكتساب المواهب، وتطوير سياسات الموارد البشرية، والتدريب، ودعم الامتثال لبناء فرق عالية الأداء.",
            learnMore: "معرفة المزيد",
            ready: "هل أنت مستعد لرفع مستوى عملك؟",
            letsConnect: "لنتواصل!",
            name: "الاسم",
            email: "البريد الإلكتروني",
            phone: "الهاتف",
            company: "الشركة",
            message: "الرسالة",
            submit: "إرسال",
            reachUs: "طرق أخرى للوصول إلينا",
            followUs: "تابعنا",
            quickLinks: "روابط سريعة",
            contactInfo: "معلومات الاتصال",
            address: "دبي، الإمارات العربية المتحدة",
            copyright: "© 2025 شركة راب للأعمال. جميع الحقوق محفوظة.",
            whatsappTooltip: "تواصل معنا عبر واتساب",
            tagline: "تمكين الطموحات. رفع مستوى الأعمال."
        }
    };

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
        });
    }
    
    // Language switcher - enhanced version
    const languageSwitcher = document.querySelectorAll('[data-lang]');
    const currentLang = document.documentElement.lang || 'en';
    
    // Function to set language
    function setLanguage(lang) {
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Apply translations
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Update RTL/LTR styles
        updateLayoutDirection(lang);
    }
    
    // Function to update layout direction
    function updateLayoutDirection(lang) {
        const isRTL = lang === 'ar';
        
        // Update body class for RTL support
        document.body.classList.toggle('rtl', isRTL);
        
        // Update specific elements that might need direction changes
        const directionElements = document.querySelectorAll('[data-direction]');
        directionElements.forEach(el => {
            el.style.direction = isRTL ? 'rtl' : 'ltr';
        });
    }
    
    // Initialize language
    setLanguage(currentLang);
    
    // Language switcher event listeners
    languageSwitcher.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // Remove active class from all
            languageSwitcher.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            
            // Switch language
            setLanguage(lang);
            
            // Restart animations if needed
            animateOnScroll();
        });
        
        // Set initial active language
        if (link.dataset.lang === currentLang) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .content-text, .content-image');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .content-text, .content-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-card.animate-in, .content-text.animate-in, .content-image.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .main-nav.mobile-active {
            display: block !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #2c3e50;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .main-nav.mobile-active ul {
            flex-direction: column;
            gap: 15px;
        }
        
        /* RTL specific styles */
        body.rtl {
            text-align: right;
        }
        
        body.rtl .hero-content {
            text-align: right;
        }
        
        body.rtl .benefit-card {
            text-align: right;
        }
    `;
    document.head.appendChild(style);
    
    // Initial animation check
    animateOnScroll();
    
    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Back to top functionality
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
});