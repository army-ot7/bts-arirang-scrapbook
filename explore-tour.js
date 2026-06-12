let wallMessages = [];
let wallStartIndex = 0;

const WALL_VISIBLE_COUNT = 5;
const WALL_MESSAGE_LIMIT = 120;

const TOTAL_CITIES = 34;

/* CAMBIA ESTE NOMBRE SI TU TABLA DE ARMY SPACE SE LLAMA DIFERENTE */
const ARMY_TABLE = "army_posts";



function getImage(post) {
  if (post.image_urls && Array.isArray(post.image_urls) && post.image_urls.length > 0) {
    return post.image_urls[0];
  }

  if (post.image_url) {
    return post.image_url;
  }

  if (post.photo_url) {
    return post.photo_url;
  }

  return "";
}

function isImage(url) {

  if (!url) return false;

  const lowerUrl = url.toLowerCase();

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif"
  ];

  const videoExtensions = [
    ".mp4",
    ".mov",
    ".webm",
    ".m4v",
    ".avi"
  ];

  if (videoExtensions.some(ext => lowerUrl.includes(ext))) {
    return false;
  }

  return imageExtensions.some(ext => lowerUrl.includes(ext));
}

async function loadExploreData() {
  await loadTourProgress();
  await loadScrapbookPhotos();
  await loadArmyFeatured();
  await loadArmyWallMessages();
  
  setupNextMemoryButton();
}

/* =========================
   TOUR PROGRESS
========================= */

function loadTourProgress() {
  const completedSpan = document.getElementById("completed-cities");
  const totalSpan = document.getElementById("total-cities");
  const leftSpan = document.getElementById("cities-left");
  const list = document.getElementById("tour-progress-list");
  const statCities = document.getElementById("stat-cities");

  if (!completedSpan || !totalSpan || !leftSpan || !list) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedCities = tourData.filter(stop => {
    const lastDate = new Date(stop.dates[stop.dates.length - 1]);
    lastDate.setHours(23, 59, 59, 999);
    return lastDate < today;
  });

  completedSpan.textContent = completedCities.length;
  totalSpan.textContent = tourData.length;
  leftSpan.textContent = tourData.length - completedCities.length;

  if (statCities) {
    statCities.textContent = `${completedCities.length} / ${tourData.length}`;
  }

  list.innerHTML = "";

  completedCities
    .slice(-7)
    .reverse()
    .forEach(stop => {
      const item = document.createElement("a");
      item.className = "progress-city completed";
      item.href = stop.page;
      item.innerHTML = `
        <span class="progress-dot"></span>
        <span>${stop.city.toUpperCase()}</span>
      `;
      list.appendChild(item);
    });
}

/* =========================
   TOUR SCRAPBOOK
========================= */

async function getImageShape(url) {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = function () {
      if (img.naturalHeight > img.naturalWidth) {
        resolve("portrait");
      } else {
        resolve("landscape");
      }
    };

    img.onerror = function () {
      resolve("landscape");
    };

    img.src = url;
  });
}



async function loadScrapbookPhotos() {
  const container = document.getElementById("scrapbook-photos");
  const statPhotos = document.getElementById("stat-photos");
  const statMemories = document.getElementById("stat-memories");

  if (!container) return;

  const { data, error } = await supabaseClient
    .from("fan_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Scrapbook error:", error);
    return;
  }

  const posts = (data || []).filter(post => {
    const image = getImage(post);
    return image && isImage(image);
  });

  const randomPosts = [...posts].sort(() => Math.random() - 0.5);

  const portraitPosts = [];
  const landscapePosts = [];

  for (const post of randomPosts) {
    const shape = await getImageShape(getImage(post));

    if (shape === "portrait") {
      portraitPosts.push(post);
    } else {
      landscapePosts.push(post);
    }
  }

  const scrapbookLayout = [
    portraitPosts[0],
    portraitPosts[1],
    landscapePosts[0],
    landscapePosts[1],
    landscapePosts[2],
    portraitPosts[2],
    portraitPosts[3]
  ].filter(Boolean);

  container.innerHTML = "";

  scrapbookLayout.forEach((post, index) => {
    const number = index + 1;

    const shape =
      number === 1 || number === 2 || number === 6 || number === 7
        ? "portrait"
        : "landscape";

    const card = document.createElement("div");
    card.className = `scrapbook-photo arc-${number} ${shape}`;

    card.innerHTML = `
      <img src="${getImage(post)}" alt="Tour scrapbook memory">
      <p>${post.city || "Tour"} • Day ${post.day || ""}</p>
    `;

    container.appendChild(card);
  });

  if (statPhotos) statPhotos.textContent = posts.length;
  
}

function setupNextMemoryButton() {

  const button =
    document.getElementById("next-memory-btn");

  if(!button) return;

  button.onclick = function(e){

    e.preventDefault();

    const pages = [

      "seoul.html",
      "tokyo.html",
      "busan.html",
      "tampa.html",
      "elpaso.html",
      "mexicocity.html",
      "stanford.html",
      "toronto.html",
      "chicago.html",
      "losangeles.html",
      "madrid.html",
      "paris.html",
      "london.html",
      "brussels.html",
      "munich.html",
      "bangkok.html",
      "singapore.html",
      "jakarta.html",
      "hongkong.html",
      "sydney.html",
      "melbourne.html",
      "kaohsiung.html",
      "bulacan.html",
      "bogota.html",
      "lima.html",
      "santiago.html",
      "buenosaires.html",
      "saopaulo.html"

    ];

    const randomPage =
      pages[Math.floor(Math.random() * pages.length)];

    window.location.href = randomPage;

  };
}

/* =========================
   FEATURED MEMORIES FROM ARMY SPACE
========================= */

async function loadArmyFeatured() {
  const featuredContainer = document.getElementById("featured-memories");
  const bestContainer = document.getElementById("best-moment-card");

  const { data, error } = await supabaseClient
    .from(ARMY_TABLE)
    .select("*");

  if (error) {
    console.log("Army featured error:", error);
    return;
  }

  const posts = (data || []).filter(post => {
    const image = getImage(post);
    return image && isImage(image);
  });

  const statMemories = document.getElementById("stat-memories");

  if (statMemories) {
  statMemories.textContent = data.length;
  }
  const randomPosts = [...posts].sort(() => Math.random() - 0.5);

  if (featuredContainer) {
    featuredContainer.innerHTML = "";

    randomPosts.slice(0, 3).forEach(post => {
      const card = document.createElement("div");
      card.className = "memory-card";

      const text =
        post.caption ||
        post.post_text ||
        post.content ||
        post.text ||
        post.message ||
        "";

      card.innerHTML = `
        <img src="${getImage(post)}" alt="Featured memory">
        <div class="memory-content">
          <p>${text}</p>
          <span>❤️ ${post.likes || 0} Likes</span>
        </div>
      `;

      featuredContainer.appendChild(card);
    });
  }

  if (bestContainer && posts.length > 0) {
    const best = [...posts].sort((a, b) => {
      return (b.likes || 0) - (a.likes || 0);
    })[0];

    const bestText =
      best.caption ||
      best.post_text ||
      best.content ||
      best.text ||
      best.message ||
      "";

    bestContainer.innerHTML = `
      <img src="${getImage(best)}" alt="Best moment">
      <div class="best-caption">
        ${bestText}
      </div>
    `;
  }
}

/* =========================
   MODAL
========================= */

function openMessageModal() {
  const modal = document.getElementById("messageModal");
  if (modal) modal.classList.add("active");
}

function closeMessageModal() {
  const modal = document.getElementById("messageModal");
  if (modal) modal.classList.remove("active");
}

async function postArmyWallMessage() {
  const nameInput = document.getElementById("wall-name");
  const countryInput = document.getElementById("wall-country");
  const messageInput = document.getElementById("wall-message");

  const name = nameInput.value.trim();
  const country = countryInput.value.trim();
  const message = messageInput.value.trim();

  let wallMessages = [];
  let wallStartIndex = 0;
  const WALL_VISIBLE_COUNT = 5;
  const WALL_MESSAGE_LIMIT = 120;

  if (!name || !country || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (message.length > WALL_MESSAGE_LIMIT) {
  alert("Message is too long. Max 120 characters.");
  return;
}

  const { error } = await supabaseClient
    .from("army_wall_messages")
    .insert([
      {
        name: name,
        country: country,
        message: message
      }
    ]);

  if (error) {
    console.log("Army wall insert error:", error);
    alert("Message could not be posted.");
    return;
  }

  nameInput.value = "";
  countryInput.value = "";
  messageInput.value = "";

  closeMessageModal();
  loadArmyWallMessages();
}

async function loadArmyWallMessages() {
  const wall = document.getElementById("army-wall");
  const statCountries = document.getElementById("stat-countries");

  if (!wall) return;

  const { data, error } = await supabaseClient
    .from("army_wall_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Army wall load error:", error);
    return;
  }

  wallMessages = data || [];
  wallStartIndex = 0;

  renderArmyWallMessages();

  const countries = [
    ...new Set(
      wallMessages
        .map(item => item.country)
        .filter(country => country && country.trim() !== "")
    )
  ];

  if (statCountries) {
    statCountries.textContent = countries.length;
  }
}
function renderArmyWallMessages() {
  const wall = document.getElementById("army-wall");
  if (!wall) return;

  wall.innerHTML = "";

  const visibleMessages = wallMessages.slice(
    wallStartIndex,
    wallStartIndex + WALL_VISIBLE_COUNT
  );

  visibleMessages.forEach(item => {
    const note = document.createElement("div");
    note.className = "army-note";

    note.innerHTML = `
      <h4>📍 ${item.country}</h4>
      <p>${item.message}</p>
      <span>by ${item.name}</span>
      <img src="images/decor/flower-red.png" class="note-flower">
    `;

    wall.appendChild(note);
  });

  if (wallMessages.length > WALL_VISIBLE_COUNT) {
    const nextButton = document.createElement("button");
    nextButton.className = "wall-next-btn";
    nextButton.textContent = ">";

    nextButton.onclick = function () {
      wallStartIndex += WALL_VISIBLE_COUNT;

      if (wallStartIndex >= wallMessages.length) {
        wallStartIndex = 0;
      }

      renderArmyWallMessages();
    };

    wall.appendChild(nextButton);
  }
}

document.addEventListener("DOMContentLoaded", loadExploreData);