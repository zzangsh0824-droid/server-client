// Socket.IO 서버 주소 (중앙 서버 IP로 수정)
const SERVER_URL = "http://<중앙서버-IP>:3000";
const PI_ID = "pi1";  // 라즈베리파이 ID 예) pi1,pi2...

const socket = io(SERVER_URL);

// HTML 요소 참조
const carNumberEl = document.getElementById("carNumber");
const arrowEl = document.getElementById("arrow");

let resetTimer = null; // 타이머 저장용 변수

// 서버에 자신을 등록
socket.emit("register", { id: PI_ID });

// 서버에서 화살표 업데이트 명령 수신
socket.on("update-display", (data) => {
  const { car_number, direction } = data;

  // 차량번호 표시
  carNumberEl.textContent = car_number || "-";

 // 방향에 맞게 화살표 표시
  let arrowSymbol = "⬜";
  if (direction === "left") arrowSymbol = "⬅️";
  else if (direction === "right") arrowSymbol = "➡️";
  else if (direction === "up") arrowSymbol = "⬆️";
  else if (direction === "down") arrowSymbol = "⬇️";

  // 표시
  arrowEl.textContent = arrowSymbol;

    //  이전 타이머 있으면 초기화
  if (resetTimer) clearTimeout(resetTimer);

  // 3초 후에 다시 ⬜로 복귀
  resetTimer = setTimeout(() => {
    arrowEl.textContent = "⬜";
    carNumberEl.textContent = "-";
  }, 3000);
});