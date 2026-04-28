let visited = {
  patience: false,
  fear: false,
  logs: false
};

function playClick(){
  document.getElementById("clickSound").play();
}

function typeWriter(el, text, speed=25){
  el.innerHTML = "";
  let i=0;
  function typing(){
    if(i < text.length){
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

function openModule(type){
  playClick();

  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  modal.style.display = "flex";
  modal.classList.add("show");

  visited[type] = true;

  // --- صبر
  if(type === "patience"){
    content.innerHTML = `
    در حال بررسی ماژول صبر...
    <div class="progress"><div class="progress-bar" id="bar"></div></div>
    `;

    let w = 0;
    let int = setInterval(()=>{
      w += 5;
      document.getElementById("bar").style.width = w + "%";

      if(w >= 60){
        clearInterval(int);
        setTimeout(()=>{
          typeWriter(content,
            "⏱️ نههه! مث اینکه هنوز باید تمرین بشه روی صبر... 😄\nبریم بعدی"
          );
        },5000);
      }
    },200);
  }

  // --- ترس
  if(type === "fear"){
    content.innerHTML = "شروع مواجهه کنترل‌شده...\n\n🎢";

    setTimeout(()=>{
      typeWriter(content,
        "سطح مواجهه: ۲٪ 😅\nپیشرفت خوبه!"
      );
    },2000);
  }

  // --- لاگ
  if(type === "logs"){
    typeWriter(content,
      "جلسه ۱: افزایش آگاهی\n" +
      "جلسه ۳: کاهش اضطراب\n" +
      "جلسه ۵: بینش جدید 🔓\n\n" +
      "404: مشکل خاصی یافت نشد 😄"
    );
  }
}

function openFinal(){
  const allDone = visited.patience && visited.fear && visited.logs;

  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  modal.style.display = "flex";
  modal.classList.add("show");

  if(!allDone){
    typeWriter(content,
      "🔒 این بخش هنوز قفله!\n\n" +
      "اول بقیه بخش‌ها رو ببین 🙂"
    );
    return;
  }

  document.getElementById("successSound").play();

  typeWriter(content,
    "سیستم پایدار شد ✔️\n\n" +
    "باگ‌ها کمتر شدند\n" +
    "بینش‌ها بیشتر شدند\n\n" +
    "روز روانشناس مبارک 🌱\n" +
    "ممنون بابت همه چیز ❤️"
  );

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
}

document.getElementById("modal").onclick = function(){
  this.style.display = "none";
  this.classList.remove("show");
};