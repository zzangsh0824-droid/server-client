const SERVER_URL = "http://<중앙서버-IP>:3000";
const PI_ID = "pi1"; 

const socket = io(SERVER_URL);
const carNumberEl = document.getElementById("carNumber");
const arrowEl = document.getElementById("arrow");
let resetTimer = null;

socket.emit("register", { id: PI_ID });

socket.on("update-display", (data) => {
  const { car_number, direction } = data;
  carNumberEl.textContent = car_number || "-";

  let arrowHTML = "";
  
  if (direction === "right" || direction === "left" ||
      direction === "up" || direction === "down") {
    arrowHTML = `
      <div class="arrow-container ${direction}">
        <div class="arrow"></div>
        <div class="arrow"></div>
        <div class="arrow"></div>
      </div>
    `;
  
    
  } else {
    arrowHTML = "⬜";
  }

  arrowEl.innerHTML = arrowHTML;

  if (resetTimer) clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    arrowEl.innerHTML = "⬜";
    carNumberEl.textContent = "-";
  }, 3000);
});