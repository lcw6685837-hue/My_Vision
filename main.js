// =======================================================
// 🚀 이창우의 위대한 여정 - 통합 자바스크립트 엔진 (main.js)
// =======================================================

// -------------------------------------------------------
// 1. 대시보드 데이터 및 렌더링 (index.html)
// -------------------------------------------------------
const dashboardData = [
  {
    icon: "📖",
    title: "Bible Transcription",
    progress: 50,
    color: "bg-blue-500",
  },
  {
    icon: "💻",
    title: "Web Dev Mastery",
    progress: 80,
    color: "bg-emerald-500",
  },
  { icon: "⚾", title: "50km/h Pitching", progress: 30, color: "bg-rose-500" },
  { icon: "🎵", title: "Guitar Master", progress: 20, color: "bg-purple-500" },
  { icon: "🗣️", title: "English Speaker", progress: 40, color: "bg-amber-500" },
];

const dashboardGrid = document.getElementById("dashboard-grid");
if (dashboardGrid) {
  dashboardGrid.innerHTML = dashboardData
    .map(
      (item) => `
        <div class="glass-card p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer hover:-translate-y-1" onclick="openModal('${item.title}')">
            <div class="text-3xl mb-3">${item.icon}</div>
            <h3 class="text-white font-bold text-sm mb-3">${item.title}</h3>
            <div class="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                <div class="${item.color} h-2 rounded-full" style="width: ${item.progress}%"></div>
            </div>
            <div class="text-right text-xs text-slate-400 font-bold">${item.progress}%</div>
        </div>
    `,
    )
    .join("");
}

function openModal(title) {
  const overlay = document.getElementById("modal-overlay");
  const container = document.getElementById("modal-content-container");
  if (overlay && container) {
    container.innerHTML = `<h2 class="text-2xl font-black text-white mb-4">${title} 상세 현황</h2><p class="text-slate-400">현재 ${title} 목표를 향해 순항 중입니다.</p>`;
    overlay.classList.add("active");
  }
}

function closeModal(event) {
  if (event.target.id === "modal-overlay") {
    document.getElementById("modal-overlay").classList.remove("active");
  }
}

// -------------------------------------------------------
// 2. Journey Details (index.html)
// -------------------------------------------------------
const journeyData = [
  { title: "The Beginning", desc: "위대한 여정의 첫걸음을 내딛다." },
  { title: "First Milestone", desc: "첫 번째 주요 목표를 달성하다." },
];
const journeyGrid = document.getElementById("journey-grid");
if (journeyGrid) {
  journeyGrid.innerHTML = journeyData
    .map(
      (item) => `
        <div class="bg-[#0f172a] p-6 rounded-2xl border border-white/5 shadow-lg">
            <h3 class="text-white font-bold mb-2">${item.title}</h3>
            <p class="text-slate-400 text-sm">${item.desc}</p>
        </div>
    `,
    )
    .join("");
}

// -------------------------------------------------------
// 3. Insight Vault (index.html) - 🌟 오타 수정 완료! 🌟
// -------------------------------------------------------
const insights = [
  { title: "GitHub API 완전 정복", link: "#" },
  { title: "실전 프론트엔드 UI/UX 가이드", link: "#" },
];
const insightList = document.getElementById("insight-bookmark-list");
if (insightList) {
  insightList.innerHTML = insights
    .map(
      (item) => `
        <a href="${item.link}" class="block bg-white/5 p-4 rounded-xl text-slate-300 hover:bg-white/10 transition text-sm font-medium border border-white/5 shadow-md">
            🔖 ${item.title}
        </a>
    `,
    )
    .join("");
}

// -------------------------------------------------------
// 💌 16. 뉴스레터 구독 폼 이벤트 (Formspree API 통신)
// -------------------------------------------------------
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const successScreen = document.getElementById("nl-success");
    const emailInput = document.getElementById("nl-email");
    const formData = new FormData(newsletterForm);

    try {
      const response = await fetch(newsletterForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        successScreen.classList.remove("hidden");
        setTimeout(() => {
          successScreen.classList.add("hidden");
          emailInput.value = "";
        }, 3000);
      } else {
        alert("구독 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      alert("통신 오류가 발생했습니다.");
    }
  });
}

// -------------------------------------------------------
// 📘 17-1. Book Explorer (Open Library API 연동)
// -------------------------------------------------------
const bookSearchBtn = document.getElementById("book-search-btn");
const bookSearchInput = document.getElementById("book-search-input");
const bookResults = document.getElementById("book-results");

if (bookSearchBtn && bookResults) {
  bookSearchBtn.addEventListener("click", async () => {
    const query = bookSearchInput.value.trim();
    if (!query) return alert("검색할 책 제목이나 키워드를 입력해주세요!");

    bookResults.innerHTML = `
            <div class="text-center py-10 text-blue-400">
                <i class="fas fa-circle-notch fa-spin text-4xl mb-4"></i>
                <p class="text-sm font-bold">Open Library 서버에서 도서 데이터를 가져오는 중...</p>
            </div>
        `;

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=3`,
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        bookResults.innerHTML = `<p class="text-slate-400 py-10">앗! '${query}'에 대한 검색 결과가 없습니다.</p>`;
        return;
      }

      let html = '<div class="grid grid-cols-1 gap-4 text-left relative z-10">';
      data.docs.forEach((book) => {
        const title = book.title;
        const author = book.author_name
          ? book.author_name[0]
          : "알 수 없는 저자";
        const publishYear = book.first_publish_year
          ? `${book.first_publish_year}년 출판`
          : "";
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150x200?text=No+Cover";

        html += `
                    <div class="flex gap-5 items-center bg-[#0f172a] p-4 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors shadow-lg">
                        <img src="${coverUrl}" alt="Book Cover" class="w-16 h-24 object-cover rounded-lg shadow-md border border-white/10">
                        <div>
                            <h4 class="text-white font-bold text-base mb-1 line-clamp-1">${title}</h4>
                            <p class="text-blue-400 text-xs font-bold mb-1">${author}</p>
                            <p class="text-slate-500 text-xs">${publishYear}</p>
                        </div>
                    </div>
                `;
      });
      html += "</div>";
      bookResults.innerHTML = html;
    } catch (error) {
      bookResults.innerHTML = `<p class="text-rose-400 py-10">통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>`;
    }
  });

  bookSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") bookSearchBtn.click();
  });
}

// -------------------------------------------------------
// 📸 17-2. Image Explorer (LoremFlickr API 연동)
// -------------------------------------------------------
const imgSearchBtn = document.getElementById("img-search-btn");
const imgKeywordInput = document.getElementById("img-keyword");
const imgResults = document.getElementById("img-results");

if (imgSearchBtn && imgResults) {
  imgSearchBtn.addEventListener("click", () => {
    const keyword = imgKeywordInput.value.trim() || "nature";

    imgResults.innerHTML = `
            <div class="col-span-2 text-center py-10 text-purple-400">
                <i class="fas fa-circle-notch fa-spin text-4xl mb-4"></i>
                <p class="text-sm font-bold">전 세계 서버에서 '${keyword}' 이미지를 찾는 중...</p>
            </div>
        `;

    setTimeout(() => {
      imgResults.innerHTML = "";

      for (let i = 1; i <= 4; i++) {
        const randomLock = Math.floor(Math.random() * 10000);
        const imgUrl = `https://loremflickr.com/600/400/${keyword}?lock=${randomLock}`;

        const imgCard = `
                    <div class="overflow-hidden rounded-2xl shadow-xl border border-white/10 group bg-[#0f172a] relative aspect-[4/3]">
                        <div class="absolute inset-0 flex items-center justify-center -z-10">
                            <i class="fas fa-spinner fa-spin text-slate-600 text-2xl"></i>
                        </div>
                        <img src="${imgUrl}" alt="${keyword}" 
                             class="w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:scale-110"
                             onload="this.classList.remove('opacity-0')">
                    </div>
                `;
        imgResults.insertAdjacentHTML("beforeend", imgCard);
      }
    }, 500);
  });

  imgKeywordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") imgSearchBtn.click();
  });
}
