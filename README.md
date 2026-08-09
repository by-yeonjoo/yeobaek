# YEOBAEK (여백) V2 — Brand Website

> **"소음의 시대, 가장 깊은 침묵을 팝니다."**  
> 채우지 않음의 미학. 가장 한국적인 것이 가장 세계적인 것. DEEPONDÉ 프리미엄 니치 향수 브랜드 **YEOBAEK**의 가로 스크롤 브랜드 웹사이트입니다.

---

## 🔗 Live Demo & Links

- 🌐 **웹사이트 (GitHub Pages)**: [https://by-yeonjoo.github.io/yeobaek/](https://by-yeonjoo.github.io/yeobaek/)
- 📦 **GitHub Repository**: [https://github.com/by-yeonjoo/yeobaek](https://github.com/by-yeonjoo/yeobaek)

---

## ✨ Key Features (핵심 기능)

### 1. ↔️ 커스텀 가로 스크롤 (Horizontal Scroll Engine)
- **세로 휠 ➔ 가로 이동 자동 변환**: 사용자의 일반적인 세로 마우스 휠(Wheel) 입력이나 트랙패드 동작을 가로(Horizontal) 이동으로 실시간 변환합니다.
- **Smooth Interpolation (느림의 미학)**: 감각적이고 부드러운 관성 가속/감속 스크롤 인터폴레이션을 적용하여 고급 럭셔리 브랜드 웹진 느낌의 경험을 제공합니다.
- **모바일 웹 지원**: 모바일/터치 기기 환경에서는 시맨틱 터치 스크롤에 맞춰 유연하게 반응합니다.

### 2. 🎬 스마트 핑퐁 비디오 재생 (Ping-Pong Video Playback)
- **히어로 섹션 달항아리 비디오**: 정방향 재생 완료 시 역방향(Reverse)으로 부드럽게 되감기된 후 다시 정방향으로 재생되는 핑퐁(Ping-Pong) 반복 알고리즘을 적용했습니다.
- **디코더 과부하 방지**: 60fps 강제 시킹 대신 정방향 네이티브 재생 + 역방향 Throttled Seeking을 조합하여 브라우저 버벅임 없는 쾌적한 비디오 루프를 구현했습니다.

### 3. 🖼️ 한 화면 일관 레이아웃 (Consistent Split Layout)
- **Collection 라인업 패널**: **[왼쪽: 브랜드 텍스트 정보 | 오른쪽: 대형 원형 비디오 마스크]** 구조를 전 제품(Moon Soil, Kiln Breath, Void Air)에 통일 적용하여 직관적이고 시원한 뷰포트 몰입감을 제공합니다.
- **Craft 패널 오버레이**: 풀스크린 백그라운드 영상 위에 글래스모피즘(Backdrop Filter) 오버레이 카드를 정갈하게 정돈하여 3가지 보틀 컨셉(Silhouette, Material, Fragment)을 소개합니다.

### 4. 🧭 어댑티브 UI & 인디케이터 (Adaptive Navigation)
- **적응형 네비게이션**: 각 패널의 배경 톤(Bright/Dark)을 실시간으로 감지하여 상단 로고 및 네비게이션 텍스트 컬러가 자동으로 반전 전환됩니다.
- **스크롤 인디케이터**: 상단 가로 진행률 프로그레스 바(Progress Bar) 및 우측 패널 도트 인디케이터로 현재 위치를 한눈에 파악할 수 있습니다.

---

## 🎨 Design System

| 요소 | 사양 |
|------|------|
| **Color (Primary)** | Pure White (`#FFFFFF`), Ivory (`#FAF8F5`) |
| **Color (Accent)** | Warm Light Brown (`#C4A882`), Cream (`#D4C4B0`) |
| **Color (Text)** | Deep Charcoal (`#1A1A1A`), Muted Brown (`#8C7864`) |
| **Typography (EN)** | `Cormorant Garamond` (세련된 세리프), `Playfair Display` |
| **Typography (KR)** | `Noto Serif KR` (얇은 명조체 - 정갈한 한국 미학) |
| **Visual Concept** | 조선 백자 달항아리(Moon Jar)의 비움과 시간의 잔향 |

---

## 📂 Project Structure

```
site/
├── README.md         # 프로젝트 명세 및 배포 정보
├── index.html        # 메인 가로 스크롤 HTML 구조
├── css/
│   └── style.css     # 가로 레이아웃 및 디자인 시스템 스타일
├── js/
│   └── main.js       # 커스텀 가로 스크롤 & 비디오 핑퐁 엔진
├── img/              # 이미지 리소스
└── mov/              # 고화질 브랜드 비디오 리소스
```

---

© 2026 **YEOBAEK**. The Scent of Deep Silence.
