chrome.storage.local.get('message', function(result) {
  if (result.message) {
    alert('پیام جدید: ' + result.message);
  }
});

function sendMessage(msg) {
  chrome.storage.local.set({ 'message': msg });
  alert('پیام ارسال شد: ' + msg);
}

document.body.insertAdjacentHTML('beforeend', '<button id="send">ارسال پیام</button>');

document.getElementById('send').addEventListener('click', function() {
  const msg = 'پیام جدید از پروفایل';
  sendMessage(msg);
});
// این تابع را بالای فایل اضافه کن
function updateCurrentLaptopDisplay() {
  const select = document.getElementById("laptopSelect");
  const selectedText = select.options[select.selectedIndex].text;
  document.getElementById("currentLaptopDisplay").innerText = `شما در ${selectedText} هستید`;
}

// وقتی صفحه لود شد، اولین بار آپدیت کنیم و مقدار ذخیره‌شده را بارگذاری کنیم
window.onload = function() {
  const selectedLaptopId = localStorage.getItem("selectedLaptopId");
  
  if (selectedLaptopId) {
    document.getElementById("laptopSelect").value = selectedLaptopId;
  }
  
  updateCurrentLaptopDisplay();
}

// وقتی دکمه ذخیره را زدی، بعد از ذخیره نمایش هم آپدیت شود
document.getElementById("saveDefault").addEventListener("click", function() {
  const selectedLaptopId = document.getElementById("laptopSelect").value;
  localStorage.setItem("selectedLaptopId", selectedLaptopId);
  alert("شناسه لپتاب ذخیره شد!");
  updateCurrentLaptopDisplay();
});
