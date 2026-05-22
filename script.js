const steps = [
  {
    title: 'Intro to HTML',
    description: 'Learn what HTML is and how a simple page is structured.',
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>`
  },
  {
    title: 'Write your first CSS',
    description: 'See how styles change the look of elements on the page.',
    code: `body {
  background: #0f172a;
  color: #f8fafc;
  font-family: Arial, sans-serif;
}

h1 {
  color: #38bdf8;
}`
  },
  {
    title: 'Add JavaScript interaction',
    description: 'Use JavaScript to make your page dynamic and interactive.',
    code: `const button = document.querySelector('#click-me');
button.addEventListener('click', () => {
  alert('You just added interactivity!');
});`
  }
];

let currentStep = 0;

const stepNumber = document.getElementById('step-number');
const stepTitle = document.getElementById('step-title');
const stepDescription = document.getElementById('step-description');
const stepCode = document.getElementById('step-code');
const stepProgress = document.getElementById('step-progress');
const prevButton = document.getElementById('prev-step');
const nextButton = document.getElementById('next-step');

function renderStep(index) {
  const step = steps[index];
  stepNumber.textContent = `Step ${index + 1} of ${steps.length}`;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  stepCode.textContent = step.code;
  stepProgress.value = index + 1;

  prevButton.disabled = index === 0;
  nextButton.textContent = index === steps.length - 1 ? 'Finish' : 'Next';
}

function initStepLesson() {
  if (!stepNumber || !stepTitle || !stepDescription || !stepCode || !stepProgress || !prevButton || !nextButton) {
    return;
  }

  prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      renderStep(currentStep);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      renderStep(currentStep);
    } else {
      alert('Great job! You completed the first lesson.');
    }
  });

  renderStep(currentStep);
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate');
  if (!animatedElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initCommunityPage() {
  const form = document.getElementById('community-form');
  const commentList = document.getElementById('comment-list');
  if (!form || !commentList) {
    return;
  }

  const STORAGE_KEY = 'veodeCommunityComments';

  const loadComments = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveComments = (comments) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  };

  const renderComments = () => {
    const comments = loadComments();
    commentList.innerHTML = '';

    if (!comments.length) {
      const empty = document.createElement('p');
      empty.className = 'comment-empty';
      empty.textContent = 'No comments yet. Be the first to share!';
      commentList.appendChild(empty);
      return;
    }

    comments.slice().reverse().forEach((comment) => {
      const card = document.createElement('article');
      card.className = 'comment-card';

      const author = document.createElement('strong');
      author.textContent = comment.name || 'Anonymous';

      const time = document.createElement('time');
      time.textContent = new Date(comment.date).toLocaleString();

      const message = document.createElement('p');
      message.textContent = comment.message;

      card.appendChild(author);
      card.appendChild(time);
      card.appendChild(message);
      commentList.appendChild(card);
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('comment-name');
    const messageInput = document.getElementById('comment-message');
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!message) {
      return;
    }

    const comments = loadComments();
    comments.push({
      name: name || 'Anonymous',
      message,
      date: new Date().toISOString(),
    });

    saveComments(comments);
    renderComments();
    form.reset();
  });

  renderComments();
}

function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  if (!navToggle || !siteNav || !navBackdrop) {
    return;
  }

  const setNavState = (open) => {
    siteNav.classList.toggle('open', open);
    navBackdrop.classList.toggle('visible', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.contains('open');
    setNavState(!isOpen);
  });

  navBackdrop.addEventListener('click', () => setNavState(false));

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavState(false));
  });

  const navClose = siteNav.querySelector('.nav-close');
  if (navClose) {
    navClose.addEventListener('click', () => setNavState(false));
  }
}

initScrollAnimations();
initSmoothScrolling();
initMobileNav();
initCommunityPage();
initStepLesson();
