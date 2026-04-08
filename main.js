/* --- [Great Journey Pro V8.12 - main.js] --- */
const DASHBOARD_SHEET_ID = "1ipu4Xoh2zv8ZCajsfSaxgvQXc4v3xZGfpX9TAL-3Tdg";
const BOOKMARK_SHEET_ID = "1mhINUzxEgg5HjraEnwfcP8aRdiiXZO7i4r1B8ZIdQ1E";

const myData = [
  {
    category: "FAITH",
    title: "신앙의 여정",
    progress: "0",
    percent: 0,
    unit: "권 필사",
    image: "image_111ce.jpg",
    desc: "성경 필사를 통해 매일의 삶가운데 하나님을 만나는 시간을 가집니다.",
  },
  {
    category: "KNOWLEDGE",
    title: "지식의 여정",
    progress: "0",
    percent: 0,
    unit: "시간 코딩",
    image: "image_222ce.jpg",
    desc: "독서와 코딩, 최신 기술 습득의 시간을 통해 엔지니어 역량을 강화합니다.",
  },
  {
    category: "LEADERSHIP",
    title: "리더십의 여정",
    progress: "0",
    percent: 0,
    unit: "회 강연",
    image: "image_333ce.jpg",
    desc: "직장후배와의 소통을 통해 지식을 공유하고 영향력을 펼치는 리더가 되어갑니다.",
  },
  {
    category: "CHALLENGE",
    title: "도전의 여정",
    progress: "0",
    percent: 0,
    unit: "개 자격증",
    image: "image_444ce.jpg",
    desc: "전문분야의 자격취득을 향한 끊임없는 도전입니다.",
  },
  {
    category: "PASSION",
    title: "열정의 여정",
    progress: "0",
    percent: 0,
    unit: "km/h 구속",
    image: "image_555ce.jpg",
    desc: "나이는 숫자에 불과합니다. 110km/h를 향한 뜨거운 열정.",
  },
];

const modalData = {
  FAITH: {
    num: "01",
    title: "The Journey of Faith",
    desc: "Writing the Bible by hand is a meditative process that grounds my spirit.",
    stat1Val: "Book of Numbers",
    stat1Lbl: "CURRENT BOOK",
    stat2Val: "0%",
    stat2Lbl: "COMPLETION",
    img: "image_111ce.jpg",
    reverse: false,
  },
  KNOWLEDGE: {
    num: "02",
    title: "The Journey of Knowledge",
    desc: "Reading 100 books is not just about accumulating information, but about expanding my worldview.",
    stat1Val: "10",
    stat1Lbl: "BOOKS READ",
    stat2Val: "KR / EN",
    stat2Lbl: "LANGUAGES",
    img: "image_222ce.jpg",
    reverse: true,
  },
  LEADERSHIP: {
    num: "03",
    title: "The Journey of Leadership",
    desc: "True leadership is not about being in charge, but about taking care of those in your charge.",
    stat1Val: "1 / 20",
    stat1Lbl: "MENTEES",
    stat2Val: "15+",
    stat2Lbl: "PROJECTS LED",
    img: "image_333ce.jpg",
    reverse: false,
  },
  CHALLENGE: {
    num: "04",
    title: "The Journey of Challenge",
    desc: "Obtaining the Gas Master Craftsman and Electrical Engineer certifications proves that technical mastery has no age limit.",
    stat1Val: "In Progress",
    stat1Lbl: "STATUS",
    stat2Val: "2026",
    stat2Lbl: "TARGET DATE",
    img: "image_444ce.jpg",
    reverse: false,
  },
  PASSION: {
    num: "05",
    title: "The Journey of Passion",
    desc: "Pitching a baseball at 110km/h requires physical discipline and perfect mechanics.",
    stat1Val: "95 km/h",
    stat1Lbl: "CURRENT SPEED",
    stat2Val: "110 km/h",
    stat2Lbl: "TARGET SPEED",
    img: "image_555ce.jpg",
    reverse: true,
  },
};

// 구글 시트 연동 (대시보드)
async function fetchDashboardSheet() {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${DASHBOARD_SHEET_ID}/gviz/tq?tqx=out:csv`,
    );
    const rows = (await response.text()).split(/\r?\n/).slice(1);
    rows.forEach((row) => {
      const cols = row
        .split(",")
        .map((col) => col.replace(/(^"|"$)/g, "").trim());
      if (cols.length >= 3) {
        const target = myData.find((item) => item.category === cols[0]);
        if (target) {
          target.progress = cols[1];
          target.percent = parseInt(cols[2], 10) || 0;
          if (modalData[cols[0]] && cols[0] === "FAITH")
            modalData[cols[0]].stat2Val = cols[2] + "%";
        }
      }
    });
    renderDashboard();
  } catch (e) {
    renderDashboard();
  }
}

// 구글 시트 연동 (북마크)
async function fetchBookmarkSheet() {
  const listContainer = document.getElementById("insight-bookmark-list");
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${BOOKMARK_SHEET_ID}/gviz/tq?tqx=out:csv`,
    );
    const rows = (await response.text()).split(/\r?\n/).slice(1);
    listContainer.innerHTML = "";

    rows.forEach((row) => {
      const cols = row
        .split(",")
        .map((col) => col.replace(/(^"|"$)/g, "").trim());
      if (cols.length >= 2 && cols[1].startsWith("http")) {
        try {
          let faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(cols[1]).hostname}&sz=64`;
          const li = document.createElement("li");
          li.className =
            "bg-white/[0.01] border border-white/[0.03] p-4 rounded-2xl transition-all hover:border-blue-500/30 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-lg";
          li.innerHTML = `<a href="${cols[1]}" target="_blank" class="flex items-center gap-4 text-slate-200 hover:text-blue-400 font-bold text-sm w-full"><img src="${faviconUrl}" class="w-8 h-8 rounded-lg bg-white p-1 shadow-sm" onerror="this.src='https://www.google.com/s2/favicons?domain=google.com&sz=64'" alt="logo"><span class="truncate">${cols[0]}</span></a>`;
          listContainer.appendChild(li);
        } catch (err) {}
      }
    });
  } catch (e) {
    listContainer.innerHTML = `<li class="text-red-400 text-sm">북마크 로드 실패</li>`;
  }
}

// 대시보드 렌더링
function renderDashboard() {
  document.getElementById("dashboard-grid").innerHTML = myData
    .map(
      (item) => `
        <div class="image-card" onclick="openModal('${item.category}')">
            <div class="image-card-img-box"><img src="${item.image}" onerror="this.src='https://via.placeholder.com/300x100'"></div>
            <div class="flex flex-col gap-1 mt-2">
                <span class="text-[9px] font-black text-blue-400 tracking-widest">${item.category}</span>
                <div class="flex justify-between items-end"><h3 class="text-white font-bold text-xs">${item.title}</h3><span class="text-lg font-black text-white">${item.percent}%</span></div>
            </div>
            <div class="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden mt-1"><div class="progress-fill" style="width: 0%" data-percent="${item.percent}%"></div></div>
        </div>
    `,
    )
    .join("");

  document.getElementById("journey-grid").innerHTML = myData
    .map(
      (item) => `
        <div class="journey-card">
            <div class="journey-img-box"><img src="${item.image}" onerror="this.src='https://via.placeholder.com/100'"></div>
            <div>
                <span class="text-xs font-black text-blue-400 tracking-[0.2em] mb-1.5 block">${item.category}</span>
                <h4 class="text-lg font-bold text-white mb-2">${item.title}</h4>
                <p class="text-sm text-slate-400 leading-relaxed">${item.desc}</p>
            </div>
        </div>
    `,
    )
    .join("");

  setTimeout(() => {
    document.querySelectorAll(".progress-fill").forEach((bar) => {
      bar.style.width = bar.getAttribute("data-percent");
    });
  }, 300);
}

// 모달 제어
function openModal(category) {
  const data = modalData[category];
  const container = document.getElementById("modal-content-container");
  const textOrder = data.reverse ? "order-2" : "order-1";
  const imgOrder = data.reverse
    ? "order-1 md:order-first"
    : "order-1 md:order-last";
  const numPosition = data.reverse ? "right: 1rem;" : "left: -1rem;";

  container.innerHTML = `
        <i class="fas fa-times modal-close-btn" onclick="closeModal(event, true)"></i>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
            <div class="relative z-10 ${textOrder}">
                <span class="modal-bg-number font-jakarta" style="${numPosition}">${data.num}</span>
                <h2 class="text-3xl font-black text-white mb-4 relative z-10 tracking-tight">${data.title}</h2>
                <p class="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">${data.desc}</p>
                <div class="grid grid-cols-2 gap-4 relative z-10">
                    <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"><h4 class="text-blue-400 font-bold text-lg mb-1">${data.stat1Val}</h4><span class="text-[9px] font-black tracking-widest text-slate-500 uppercase block">${data.stat1Lbl}</span></div>
                    <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"><h4 class="text-blue-400 font-bold text-lg mb-1">${data.stat2Val}</h4><span class="text-[9px] font-black tracking-widest text-slate-500 uppercase block">${data.stat2Lbl}</span></div>
                </div>
            </div>
            <div class="w-full h-64 md:h-[350px] rounded-2xl overflow-hidden border border-white/5 relative z-10 ${imgOrder}"><img src="${data.img}" class="w-full h-full object-cover"></div>
        </div>
    `;
  document.getElementById("modal-overlay").classList.add("active");
}

function closeModal(event, forceClose = false) {
  if (forceClose || event.target === document.getElementById("modal-overlay")) {
    document.getElementById("modal-overlay").classList.remove("active");
  }
}

// VIP 폼 검증
const vipForm = document.getElementById("vip-form");
if (vipForm) {
  const vipUser = document.getElementById("vip-username");
  const vipEmail = document.getElementById("vip-email");
  const vipPass = document.getElementById("vip-password");
  const vipConfirm = document.getElementById("vip-confirm-password");

  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    formControl.querySelector("small").innerText = message;
  }
  function showSuccess(input) {
    input.parentElement.className = "form-control success";
  }
  function checkEmail(input) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
      return true;
    }
    showError(input, "올바른 이메일 형식이 아닙니다.");
    return false;
  }

  vipForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    if (vipUser.value.trim().length < 2) {
      showError(vipUser, "이름은 2글자 이상이어야 합니다.");
      isValid = false;
    } else {
      showSuccess(vipUser);
    }
    if (!checkEmail(vipEmail)) {
      isValid = false;
    }
    if (vipPass.value.trim().length < 6) {
      showError(vipPass, "비밀번호는 6자리 이상이어야 합니다.");
      isValid = false;
    } else {
      showSuccess(vipPass);
    }
    if (vipConfirm.value.trim() === "" || vipPass.value !== vipConfirm.value) {
      showError(vipConfirm, "비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      showSuccess(vipConfirm);
    }
    if (isValid) {
      alert(
        `🎉 축하합니다, ${vipUser.value}님!\n위대한 여정의 VIP 멤버로 등록되었습니다!`,
      );
      vipForm.reset();
      document
        .querySelectorAll(".form-control")
        .forEach((el) => (el.className = "form-control"));
    }
  });
}

// 비밀번호 생성기
const pwResult = document.getElementById("pw-result");
if (pwResult) {
  const pwCopy = document.getElementById("pw-copy");
  const pwLength = document.getElementById("pw-length");
  const pwLengthVal = document.getElementById("pw-length-val");
  const pwUpper = document.getElementById("pw-upper");
  const pwLower = document.getElementById("pw-lower");
  const pwNumber = document.getElementById("pw-number");
  const pwSymbol = document.getElementById("pw-symbol");
  const pwGenerate = document.getElementById("pw-generate");
  const pwStrengthText = document.getElementById("pw-strength-text");
  const pwStrengthBar = document.getElementById("pw-strength-bar");

  const UP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOW_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const NUM_CHARS = "0123456789";
  const SYM_CHARS = "!@#$%^&*()_+~|}{[]:;?><,./-=";

  pwLength.addEventListener("input", (e) => {
    pwLengthVal.innerText = e.target.value;
    updateStrength();
  });
  [pwUpper, pwLower, pwNumber, pwSymbol].forEach((el) =>
    el.addEventListener("change", updateStrength),
  );

  pwGenerate.addEventListener("click", () => {
    let chars = "";
    if (pwUpper.checked) chars += UP_CHARS;
    if (pwLower.checked) chars += LOW_CHARS;
    if (pwNumber.checked) chars += NUM_CHARS;
    if (pwSymbol.checked) chars += SYM_CHARS;
    if (chars === "") {
      pwResult.value = "옵션을 선택하세요!";
      updateStrength(true);
      return;
    }
    let pw = "";
    const len = +pwLength.value;
    for (let i = 0; i < len; i++) {
      pw += chars[Math.floor(Math.random() * chars.length)];
    }
    pwResult.value = pw;
    updateStrength();
  });

  pwCopy.addEventListener("click", () => {
    if (!pwResult.value || pwResult.value === "옵션을 선택하세요!") return;
    navigator.clipboard.writeText(pwResult.value).then(() => {
      const originalIcon = pwCopy.innerHTML;
      pwCopy.innerHTML =
        '<i class="fas fa-check text-emerald-400 text-2xl"></i>';
      setTimeout(() => (pwCopy.innerHTML = originalIcon), 2000);
    });
  });

  function updateStrength(isError = false) {
    if (isError) {
      pwStrengthText.innerText = "Error";
      pwStrengthText.className =
        "text-sm font-black text-red-500 uppercase tracking-widest";
      pwStrengthBar.className =
        "h-full transition-all duration-500 ease-out bg-red-500 w-full shadow-[0_0_10px_rgba(239,68,68,0.8)]";
      return;
    }
    let strengthCount = 0;
    const len = +pwLength.value;
    if (pwUpper.checked) strengthCount++;
    if (pwLower.checked) strengthCount++;
    if (pwNumber.checked) strengthCount++;
    if (pwSymbol.checked) strengthCount++;
    let level = "Weak",
      color = "bg-red-500",
      width = "33%",
      shadow = "rgba(239,68,68,0.8)",
      textColor = "text-red-500";
    if (len >= 12 && strengthCount >= 3) {
      level = "Strong";
      color = "bg-emerald-500";
      width = "100%";
      shadow = "rgba(16,185,129,0.8)";
      textColor = "text-emerald-400";
    } else if (len >= 8 && strengthCount >= 2) {
      level = "Medium";
      color = "bg-yellow-400";
      width = "66%";
      shadow = "rgba(250,204,21,0.8)";
      textColor = "text-yellow-400";
    } else if (strengthCount === 0) {
      level = "None";
      color = "bg-slate-600";
      width = "0%";
      shadow = "rgba(0,0,0,0)";
      textColor = "text-slate-500";
    }

    pwStrengthText.innerText = level;
    pwStrengthText.className = `text-sm font-black ${textColor} uppercase tracking-widest`;
    pwStrengthBar.className = `h-full transition-all duration-500 ease-out ${color}`;
    pwStrengthBar.style.width = width;
    pwStrengthBar.style.boxShadow = `0 0 10px ${shadow}`;
  }
}

// To-Do App 로직
const todoInput = document.getElementById("todo-input");
if (todoInput) {
  const addTodoBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const itemsLeft = document.getElementById("items-left");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const taskDate = document.getElementById("task-date");

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  taskDate.innerText = new Date().toLocaleDateString("en-US", options);

  let todos = JSON.parse(localStorage.getItem("great_journey_todos")) || [];
  let currentFilter = "all";

  function renderTodos() {
    todoList.innerHTML = "";
    let filteredTodos = todos;
    if (currentFilter === "active")
      filteredTodos = todos.filter((t) => !t.completed);
    else if (currentFilter === "completed")
      filteredTodos = todos.filter((t) => t.completed);

    filteredTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] ${todo.completed ? "completed" : ""}`;

      const leftDiv = document.createElement("div");
      leftDiv.className = "flex items-center gap-3";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox flex-shrink-0";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const span = document.createElement("span");
      span.className = "text-base font-medium text-slate-300";
      span.innerText = todo.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash text-lg"></i>';
      deleteBtn.className = "text-slate-600 hover:text-red-400 transition p-2";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);
      li.appendChild(leftDiv);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });

    const activeCount = todos.filter((t) => !t.completed).length;
    itemsLeft.innerText = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;
    localStorage.setItem("great_journey_todos", JSON.stringify(todos));
  }

  function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") return;
    todos.push({ id: Date.now(), text: text, completed: false });
    todoInput.value = "";
    renderTodos();
  }

  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    renderTodos();
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  }

  addTodoBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach((b) => {
        b.classList.remove(
          "active",
          "text-blue-400",
          "border-bottom",
          "border-blue-400",
        );
        b.classList.add("text-slate-500");
      });
      e.target.classList.add("active", "text-blue-400");
      e.target.classList.remove("text-slate-500");
      e.target.style.borderBottom = "2px solid #60a5fa";

      filterBtns.forEach((b) => {
        if (b !== e.target) b.style.borderBottom = "none";
      });

      currentFilter = e.target.getAttribute("data-filter");
      renderTodos();
    });
  });
}

// 문서 로드 시 초기화 실행
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("dashboard-grid")) {
    fetchDashboardSheet();
    fetchBookmarkSheet();
  }
  if (document.getElementById("pw-result")) updateStrength();
  if (document.getElementById("todo-input")) {
    renderTodos();
    document.querySelector(".filter-btn.active").style.borderBottom =
      "2px solid #60a5fa";
  }
});
// ==========================================
// 💌 16. 뉴스레터 구독 폼 이벤트 (고급 API 통신)
// ==========================================
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        // e.preventDefault(); // 화면이 폼스프리로 넘어가는 것(새로고침) 방지!
        
        const successScreen = document.getElementById('nl-success');
        const emailInput = document.getElementById('nl-email');
        
        // 입력된 폼 데이터 포장하기
        const formData = new FormData(newsletterForm);

        try {
            // Formspree 우체통으로 데이터 몰래 보내기 (Fetch API)
            const response = await fetch(newsletterForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            // 편지가 무사히 도착했다면?
            if (response.ok) {
                successScreen.classList.remove('hidden'); // 성공 팝업 띄우기!
                
                // 3초 뒤에 팝업 숨기고 입력칸 비우기
                setTimeout(() => {
                    successScreen.classList.add('hidden');
                    emailInput.value = '';
                }, 3000);
            } else {
                alert("구독 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            alert("통신 오류가 발생했습니다.");
        }
    });
}