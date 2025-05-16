// این تابع را بالای فایل اضافه کن
function updateCurrentLaptopDisplay() {
  const select = document.getElementById("laptopSelect");
  const selectedText = select.options[select.selectedIndex].text;
  document.getElementById("currentLaptopDisplay").innerText = `شما در ${selectedText} هستید`;
}

// وقتی صفحه لود شد، اولین بار آپدیت کنیم و مقدار ذخیره‌شده را بارگذاری کنیم
window.onload = function() {
  const savedLaptopId = localStorage.getItem("selectedLaptopId");
  if (savedLaptopId) {
    document.getElementById("laptopSelect").value = savedLaptopId;
  }
  updateCurrentLaptopDisplay();
  listenForMessages(); // بعد از بارگذاری، فقط پیام‌های مربوطه را گوش بده
}

// دکمه ذخیره پیش فرض
document.getElementById("saveDefault").addEventListener("click", function() {
  const selectedLaptopId = document.getElementById("laptopSelect").value;
  localStorage.setItem("selectedLaptopId", selectedLaptopId);
  alert("شناسه لپتاب ذخیره شد!");
  updateCurrentLaptopDisplay();
  listenForMessages(); // وقتی ذخیره کردیم، گوش دادن پیام‌ها را هم اپدیت کن
});

// تابع ارسال پیام
document.getElementById("messageInput").addEventListener("input", function() {
  const messageText = document.getElementById("messageInput").value.trim();
  if (messageText === "") return;

  const laptopId = document.getElementById("laptopSelect").value;
  const message = {
    sender: "لپتاب من",
    text: messageText,
    laptopId: laptopId, // شناسه لپتاب همراه پیام
    timestamp: Date.now()
  };

  firebase.database().ref("messages").push(message);
  document.getElementById("messageInput").value = "";
});

// تابع برای دریافت فقط پیام‌های گروه خودم
let messagesListener = null;

function listenForMessages() {
  const laptopId = document.getElementById("laptopSelect").value;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = ""; // پاک کن

  // اگر Listener قبلی هست، خاموش کن
  if (messagesListener) {
    messagesListener.off();
  }

  // فقط پیام‌هایی که laptopId برابر است بیاور
  const query = firebase.database().ref("messages").orderByChild("laptopId").equalTo(laptopId);

  messagesListener = query;
  query.on("child_added", function(snapshot) {
    const message = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.innerText = `${message.text}`;
    messagesDiv.appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 60000);
  });
}
document.getElementById("resetMessages").addEventListener("click", function() {
  const confirmReset = confirm("آیا مطمئن هستید می‌خواهید همه پیام‌ها را حذف کنید؟ این کار غیرقابل بازگشت است.");
  if (confirmReset) {
    firebase.database().ref("messages").remove().then(function() {
      document.getElementById("messages").innerHTML = ""; // صفحه را هم پاک کن
    }).catch(function(error) {
      alert("خطا در حذف پیام‌ها: " + error.message);
    });
  }
});
document.getElementById('sendHelloMessage').addEventListener('click', function() {
  // متن سلام را به فیلد ورودی اضافه می‌کنیم
  const messageInput = document.getElementById('messageInput');
  messageInput.value = 'بسته شد صفحات'; // پیام سلام را وارد فیلد می‌کنیم
  
  // سپس پیام را ارسال می‌کنیم
  const messageText = messageInput.value.trim();
  if (messageText === "") return;

  const laptopId = document.getElementById("laptopSelect").value;
  const message = {
    sender: "لپتاب من",
    text: messageText,
    laptopId: laptopId, // شناسه لپتاب همراه پیام
    timestamp: Date.now()
  };

  // ارسال پیام به Firebase
  firebase.database().ref("messages").push(message);
  
  // بعد از ارسال، فیلد ورودی را خالی می‌کنیم
  messageInput.value = '';
});
