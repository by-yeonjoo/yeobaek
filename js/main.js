/* ===== YEOBAEK V2 — Horizontal Scroll Brand Website ===== */
/* Custom smooth horizontal scroll with wheel-to-horizontal conversion */

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('scrollContainer');
    const progressBar = document.getElementById('progressBar');
    const nav = document.getElementById('nav');
    const hGuideThumb = document.getElementById('hGuideThumb');
    const panels = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.nav-link');
    const isMobile = window.innerWidth <= 768;

    // ===== Custom Smooth Horizontal Scroll =====
    // Transform vertical wheel → horizontal movement with smooth interpolation
    let currentX = 0;
    let targetX = 0;
    let isScrolling = false;
    const scrollSpeed = 1.2;  // Wheel sensitivity multiplier
    const smoothness = 0.08;  // Lower = smoother/slower interpolation

    function getMaxScroll() {
        return container.scrollWidth - window.innerWidth;
    }

    // Wheel event → update target position
    if (!isMobile) {
        window.addEventListener('wheel', (e) => {
            e.preventDefault();

            // Use deltaY (vertical wheel) as horizontal movement
            const delta = e.deltaY || e.deltaX;
            targetX += delta * scrollSpeed;

            // Clamp to bounds
            const maxScroll = getMaxScroll();
            targetX = Math.max(0, Math.min(targetX, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                smoothScroll();
            }
        }, { passive: false });

        // Also support horizontal touchpad/trackpad gestures
        window.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                targetX += e.deltaX * scrollSpeed;
                const maxScroll = getMaxScroll();
                targetX = Math.max(0, Math.min(targetX, maxScroll));

                if (!isScrolling) {
                    isScrolling = true;
                    smoothScroll();
                }
            }
        }, { passive: false });
    }

    // Smooth scroll animation loop
    function smoothScroll() {
        const diff = targetX - currentX;

        if (Math.abs(diff) < 0.5) {
            currentX = targetX;
            container.style.transform = `translateX(${-currentX}px)`;
            updateUI();
            isScrolling = false;
            return;
        }

        currentX += diff * smoothness;
        container.style.transform = `translateX(${-currentX}px)`;
        updateUI();

        requestAnimationFrame(smoothScroll);
    }

    // ===== Touch Support (Mobile fallback is vertical, but adding horizontal swipe for tablets) =====
    let touchStartX = 0;
    let touchStartY = 0;

    if (!isMobile) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            const dx = touchStartX - e.touches[0].clientX;
            const dy = touchStartY - e.touches[0].clientY;

            // If horizontal swipe is dominant
            if (Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault();
                targetX += dx * 1.5;
                const maxScroll = getMaxScroll();
                targetX = Math.max(0, Math.min(targetX, maxScroll));
                touchStartX = e.touches[0].clientX;

                if (!isScrolling) {
                    isScrolling = true;
                    smoothScroll();
                }
            }
        }, { passive: false });
    }

    // ===== Keyboard Navigation =====
    window.addEventListener('keydown', (e) => {
        if (isMobile) return;
        const step = window.innerWidth * 0.8;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetX += step;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetX -= step;
        }

        const maxScroll = getMaxScroll();
        targetX = Math.max(0, Math.min(targetX, maxScroll));

        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    });

    // ===== UI Updates =====
    function updateUI() {
        const maxScroll = getMaxScroll();
        const progress = maxScroll > 0 ? (currentX / maxScroll) * 100 : 0;

        // Progress bar
        progressBar.style.width = progress + '%';

        // Horizontal guide thumb
        if (hGuideThumb) {
            hGuideThumb.style.left = (progress / 100 * 74) + 'px';
        }

        // Update active nav link
        updateActiveNav();

        // Check reveals
        checkReveals();

        // Update nav color based on current panel
        updateNavColor();
    }

    // ===== Active Navigation & Panel Visual State =====
    function updateActiveNav() {
        const centerX = currentX + window.innerWidth / 2;
        let activeTarget = '';

        panels.forEach(panel => {
            const panelLeft = panel.offsetLeft;
            const panelRight = panelLeft + panel.offsetWidth;

            const isCurrent = (centerX >= panelLeft && centerX < panelRight);
            panel.classList.toggle('active-panel', isCurrent);

            if (isCurrent) {
                activeTarget = panel.dataset.nav || '';
                // 현재 active 패널 내부의 모든 reveal 요소를 즉시 선명하게 표시
                panel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                    el.classList.add('visible');
                });
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === activeTarget);
        });

        // Update section indicator dots
        updateIndicatorDots(activeTarget);
    }

    // ===== Nav Color (light/dark based on panel background) =====
    function updateNavColor() {
        const centerX = currentX + window.innerWidth / 2;
        let isDark = false;

        panels.forEach(panel => {
            const panelLeft = panel.offsetLeft;
            const panelRight = panelLeft + panel.offsetWidth;

            if (centerX >= panelLeft && centerX < panelRight) {
                isDark = panel.classList.contains('panel--dark');
            }
        });

        nav.classList.toggle('nav--dark', isDark);
        nav.classList.toggle('nav--light', !isDark);
    }

    // ===== Reveal on Horizontal Scroll =====
    function checkReveals() {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            // 화면 뷰포트에 겹치기 직전이거나 진입해 있으면 무조건 visible 클래스 적용
            if (rect.left < window.innerWidth * 1.15 && rect.right > -100) {
                el.classList.add('visible');
            }
        });
    }

    // ===== Section Indicator Dots =====
    const sectionIds = ['hero', 'philosophy', 'collection', 'craft', 'space', 'contact'];
    const indicatorContainer = document.getElementById('sectionIndicator');

    sectionIds.forEach(id => {
        const dot = document.createElement('button');
        dot.className = 'indicator-dot';
        dot.dataset.section = id;
        dot.setAttribute('aria-label', id);
        dot.addEventListener('click', () => scrollToSection(id));
        indicatorContainer.appendChild(dot);
    });

    function updateIndicatorDots(activeTarget) {
        const dots = indicatorContainer.querySelectorAll('.indicator-dot');
        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === activeTarget);
        });
    }

    // ===== Scroll to Section =====
    function scrollToSection(sectionName) {
        const targetPanel = document.querySelector(`[data-nav="${sectionName}"]`);
        if (!targetPanel) return;

        targetX = targetPanel.offsetLeft;
        const maxScroll = getMaxScroll();
        targetX = Math.max(0, Math.min(targetX, maxScroll));

        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    }

    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            scrollToSection(target);

            // Close mobile menu if open
            const hamburger = document.getElementById('navHamburger');
            const navLinksWrap = document.getElementById('navLinks');
            if (hamburger && navLinksWrap) {
                hamburger.classList.remove('active');
                navLinksWrap.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Logo click → scroll to start
    document.getElementById('navLogo').addEventListener('click', (e) => {
        e.preventDefault();
        targetX = 0;
        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    });

    // ===== Mobile Hamburger =====
    const hamburger = document.getElementById('navHamburger');
    const navLinksWrap = document.getElementById('navLinks');

    if (hamburger && navLinksWrap) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksWrap.classList.toggle('active');
            document.body.style.overflow = navLinksWrap.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ===== Auto Video Playback Control =====
    function controlVideoPlayback() {
        document.querySelectorAll('video').forEach(video => {
            if (video.id === 'heroVideo') return; // 히어로 영상은 별도 핑퐁 제어
            const rect = video.getBoundingClientRect();
            // 화면에 30% 이상 노출되면 재생, 화면 밖으로 멀어지면 일시정지
            if (rect.left < window.innerWidth * 1.2 && rect.right > -window.innerWidth * 0.2) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }

    // 스크롤 및 주기적 체크
    setInterval(controlVideoPlayback, 600);

    // ===== Hero Title Character Animation =====
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.textContent = '';
        [...text].forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'hero-char';
            span.textContent = ch;
            span.style.setProperty('--i', i);
            heroTitle.appendChild(span);
        });
        setTimeout(() => heroTitle.classList.add('hero-chars-in'), 600);
    }

    // ===== Hero Video Ping-Pong Playback =====
    // 정방향: 네이티브 play() 사용 (부드럽고 안정적)
    // 역방향: throttled seek (~15fps) 방식으로 되감기
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        let isReversing = false;
        let reverseRAF = null;
        let lastSeekTime = 0;
        const SEEK_INTERVAL = 66; // ~15fps (66ms 간격) — 디코더 과부하 방지

        // 정방향 재생 시작
        function playForward() {
            isReversing = false;
            if (reverseRAF) {
                cancelAnimationFrame(reverseRAF);
                reverseRAF = null;
            }
            heroVideo.currentTime = 0;
            heroVideo.play().catch(() => {});
        }

        // 역방향 되감기 시작
        function startReverse() {
            isReversing = true;
            heroVideo.pause();
            lastSeekTime = performance.now();
            reverseRAF = requestAnimationFrame(reverseStep);
        }

        // 역방향 프레임 업데이트 (throttled)
        function reverseStep(now) {
            const elapsed = now - lastSeekTime;

            if (elapsed >= SEEK_INTERVAL) {
                const step = elapsed / 1000; // 초 단위
                const newTime = heroVideo.currentTime - step;
                lastSeekTime = now;

                if (newTime <= 0.05) {
                    // 처음에 도달 → 다시 정방향 재생
                    playForward();
                    return;
                }

                heroVideo.currentTime = newTime;
            }

            reverseRAF = requestAnimationFrame(reverseStep);
        }

        // 영상이 끝까지 재생되면 역방향으로 전환
        heroVideo.addEventListener('ended', () => {
            startReverse();
        });

        // 초기 재생 시작
        heroVideo.play().catch(() => {});
    }

    // ===== Window Resize =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const maxScroll = getMaxScroll();
            if (currentX > maxScroll) {
                currentX = maxScroll;
                targetX = maxScroll;
                container.style.transform = `translateX(${-currentX}px)`;
            }
        }, 200);
    });

    // ===== Initial State =====
    updateUI();
    updateActiveNav();
    checkReveals();

    // Mark initial reveals as visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.left < window.innerWidth * 1.5) {
            el.classList.add('visible');
        }
    });

});
