document.addEventListener('DOMContentLoaded', function () {
  // ================== 1. 語言切換 ==================
  const translations = {
    zh: {
      "logo": "Winston Blog",
      "nav-home": "主頁", "nav-about": "關於我", "nav-skills": "個人技能",
      "nav-portfolio": "作品集", "nav-contact": "聯繫我", "lang-toggle": "EN",
      "home-title": "歡迎來到我的個人網站！",
      "home-desc": "在這裡你可以了解到我的故事，技能，作品集，希望你喜歡我製作的網站！",
      "home-btn": "關於我",
      "about-title": "關於我",
      "about-desc-1": "我是 Winston，一位對數據分析與人工智能充滿熱情的探索者！大學主修理論物理學，為我奠定了紮實而嚴謹的數學基礎，這使我在程式設計、機器學習以及投資分析等領域具備獨特的後發優勢。",
      "about-desc-2": "原本，我的夢想是成為一名物理學者。然而在香港，相關的深造與就業機會十分有限，於是我決定將數學的專長轉化為數據分析與人工智能的能力。這段轉型之路不僅讓我找到新的方向，也帶來了實際成果，歡迎查看下面的作品集，它們充分體現了數學思維與跨領域應用的力量！",
      "about-desc-3": "如今，我深深熱愛數據分析，並立志成為一名能夠結合理論與實務、用數據驅動價值的數據科學家！",
      "skills-title": "個人技能",
      "portfolio-title": "作品集",
      "portfolio-item1-title": "我的網站",
      "portfolio-item1-desc": "網站主題是宇宙，那是我最初的夢想，我想做一個研究神秘宇宙的學者，即使我從今後可能不會再接觸物理，但這不妨礙我的熱愛。",
      "portfolio-item2-title": "股票模擬交易器",
      "portfolio-item2-desc": "模擬交易器讓用戶能夠深入研究其量化策略在過往市場環境下的表現與穩定性。",
      "portfolio-item3-title": "GARCH-LSTM",
      "portfolio-item3-desc": "以GARCH預測股票波動率並以LSTM神經網絡增強預測準確性，模型主要用於資產風險管理",
      "portfolio-view-code": "GitHub 原始碼",
      "contact-title": "聯繫我",
      "contact-email-label": "電子郵件",
      "contact-github-label": "GitHub",
      "footer": "© 2025 Winston. All Rights Reserved."
    },
    en: {
      "logo": "Winston Blog",
      "nav-home": "Home", "nav-about": "About", "nav-skills": "Skills",
      "nav-portfolio": "Portfolio", "nav-contact": "Contact", "lang-toggle": "中文",
      "home-title": "Welcome to My Personal Website!",
      "home-desc": "Here you can explore my story, skills, and portfolio. Hope you enjoy my website!",
      "home-btn": "About Me",
      "about-title": "About Me",
      "about-desc-1": "I'm Winston, an enthusiastic explorer of data analysis and artificial intelligence! My university major in theoretical physics provided me with a solid and rigorous mathematical foundation, giving me a unique edge in programming, machine learning, and investment analysis.",
      "about-desc-2": "Initially, my dream was to become a physicist. However, in Hong Kong, opportunities for advanced study and employment in physics are limited, so I decided to pivot my mathematical expertise into data analysis and AI. This journey not only gave me a new direction but also yielded tangible results. Check out my portfolio below to see the power of mathematical thinking and cross-disciplinary applications!",
      "about-desc-3": "Today, I am deeply passionate about data analysis and aspire to become a data scientist who bridges theory and practice, driving value through data!",
      "skills-title": "My Skills",
      "portfolio-title": "Portfolio",
      "portfolio-item1-title": "My Website",
      "portfolio-item1-desc": "The website theme is the universe, my original dream. I wanted to be a scholar researching the mysterious cosmos. Even if I may no longer touch physics in the future, it doesn't stop my passion.",
      "portfolio-item2-title": "Stock Trading Simulator",
      "portfolio-item2-desc": "Stock Trading Simulator allow users to conduct in-depth research on the performance and stability of their quantitative strategies in past market environments.",
      "portfolio-item3-title": "GARCH-LSTM",
      "portfolio-item3-desc": "Use a GARCH model to forecast stock volatility and enhance prediction accuracy with an LSTM neural network; the model is primarily intended for asset risk management.",
      "portfolio-view-code": "View Code on GitHub",
      "contact-title": "Contact Me",
      "contact-email-label": "Email",
      "contact-github-label": "GitHub",
      "footer": "© 2025 Winston. All Rights Reserved."
    }
  };

  function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.querySelector('.lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
  }

  let currentLang = localStorage.getItem('language') || 'zh';
  setLanguage(currentLang);

  document.querySelector('.lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    setLanguage(currentLang);
  });

  // ================== 2. 手機選單 ==================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // ================== 3. 導航高亮 + 動畫重播 ==================
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a');

  function resetAnimation(section) {
    section.querySelectorAll('.fade-in').forEach(el => {
      el.classList.remove('fade-in');
      void el.offsetWidth;
      el.classList.add('fade-in');
    });
  }

  function setActiveSection() {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        current = sec.id;
      }
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        resetAnimation(target);
      }
    });
  });

  window.addEventListener('scroll', setActiveSection);
  setActiveSection();

  // ================== 4. 技能卡發光 ==================
  document.querySelectorAll('.wide-skill-card:not(.placeholder)').forEach(card => {
    card.addEventListener('mouseenter', function () {
      const related = this.getAttribute('data-related');
      if (!related) return;
      const skills = related.split(',').map(s => s.trim());
      document.querySelectorAll('.wide-skill-card').forEach(other => {
        other.classList.remove('highlight-primary', 'highlight-related');
        if (other === this) {
          other.classList.add('highlight-primary');
        } else if (skills.includes(other.getAttribute('data-skill'))) {
          other.classList.add('highlight-related');
        }
      });
    });
    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.wide-skill-card').forEach(other => {
        other.classList.remove('highlight-primary', 'highlight-related');
      });
    });
  });
});