const orders_more = [
  { id: 1,
    status: 0,
    "userInfo": {
      "fullName": "Бат-Эрдэнэ Дөлгөөн",
      "phone": "99123456",
      "email": "dolgoon.b@example.com",
      "organizationName": "Технологийн шийдэл ХХК",
      "representativeName": "Мөнх-Эрдэнэ Баярсайхан",
      "billingAddress": "billing@example.com"
    },
    "eventDetails": {
      "eventType": "concert",
      "eventNameAndFeatures": "Жазз хөгжмийн үдэш",
      "eventDate": "2024-11-30T18:00",
      "eventLocation": "Улаанбаатар, Сүхбаатар дүүрэг, Соёлын төв",
      "eventDuration": "2 цаг 30 минут",
      "artistAvailability": 60
    },
    "audienceDetails": {
      "audienceCount": "101-200",
      "averageAge": "26-30",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Тэмүүлэнгийн хамтлаг",
      "workedWithArtistBefore": "yes",
      "previousWorkInfo": "2022 онд хамтарсан тоглолт зохион байгуулсан"
    },
    "paymentDetails": {
      "totalAmount": 2000000,
      "paymentMethod": "bank",
      "paymentSchedule": "Тоглолтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Тайз, гэрэлтүүлгийн нэмэлт тохиргоо",
      "technicalRequirements": "2 ширхэг утасгүй микрофон, өсгөгч төхөөрөмж",
      "additionalComments": "Гарааны хугацаа уртасгах боломжтой эсэхийг лавлана уу."
    }
  },
  
  { id: 2,
    status: 0,
    "userInfo": {
      "fullName": "Ганболд Ариунзаяа",
      "phone": "88001234",
      "email": "ariunzaya.g@example.com",
      "organizationName": "Улаанбаатар Холдинг ХХК",
      "representativeName": "Дашдэмбэрэл Ганболд",
      "billingAddress": "finance@ubholding.mn"
    },
    "eventDetails": {
      "eventType": "corporate",
      "eventNameAndFeatures": "Компаний 10 жилийн ой",
      "eventDate": "2024-12-10T15:00",
      "eventLocation": "Шангри-Ла зочид буудал, Улаанбаатар",
      "eventDuration": "4 цаг",
      "artistAvailability": 90
    },
    "audienceDetails": {
      "audienceCount": "200plus",
      "averageAge": "31-40",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Соёлын элч хамтлаг",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 5000000,
      "paymentMethod": "cash",
      "paymentSchedule": "Захиалгын өдөр"
    },
    "specialRequests": {
      "specialRequest": "Гэрэлтүүлэг, нэмэлт тайзны тохируулга",
      "technicalRequirements": "Сүүлийн үеийн дууны төхөөрөмж",
      "additionalComments": "Үзэгчдийн зогсоолыг илүү оновчтой болгох хүсэлтэй."
    }
  },
  
  { id: 3,
    status: 0,
    "userInfo": {
      "fullName": "Энхтүвшин Тэмүүлэн",
      "phone": "99887766",
      "email": "temuulen.e@example.com",
      "organizationName": "Мэдээллийн Технологийн Парк",
      "representativeName": "Нямдорж Эрдэнэтулга",
      "billingAddress": "billing@itpark.mn"
    },
    "eventDetails": {
      "eventType": "festival",
      "eventNameAndFeatures": "Хөгжмийн наадам - 2024",
      "eventDate": "2024-12-25T20:00",
      "eventLocation": "Улаанбаатар, Үндэсний Соёл Амралтын Хүрээлэн",
      "eventDuration": "5 цаг",
      "artistAvailability": 120
    },
    "audienceDetails": {
      "audienceCount": "200plus",
      "averageAge": "19-25",
      "eventStyle": "Энгийн, хөгжилтэй"
    },
    "artistDetails": {
      "artistName": "Soundwave хамтлаг",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 10000000,
      "paymentMethod": "bank",
      "paymentSchedule": "Тоглолтын өмнө"
    },
    "specialRequests": {
      "specialRequest": "Гадна талбайд суурилуулах тайз, LED дэлгэц",
      "technicalRequirements": "DJ төхөөрөмж, тусгай гэрэлтүүлэг",
      "additionalComments": "Эвент эхлэхээс 2 цагийн өмнө системийг туршиж дуусгах."
    }
  },

{ id: 4,
  status: 0,
  "userInfo": {
    "fullName": "Мөнхжаргал Халиун",
    "phone": "88112233",
    "email": "haliun.m@example.com",
    "organizationName": "",
    "representativeName": "",
    "billingAddress": "haliun.m@personal.com"
  },
  "eventDetails": {
    "eventType": "private",
    "eventNameAndFeatures": "Төрсөн өдрийн үдэшлэг",
    "eventDate": "2024-11-28T19:00",
    "eventLocation": "Хан-Уул дүүрэг, 19-р хороолол, Сити ресторан",
    "eventDuration": "3 цаг",
    "artistAvailability": 30
  },
  "audienceDetails": {
    "audienceCount": "51-100",
    "averageAge": "26-30",
    "eventStyle": "Энгийн, баярын"
  },
  "artistDetails": {
    "artistName": "Мөнгөн Шагай хамтлаг",
    "workedWithArtistBefore": "yes",
    "previousWorkInfo": "2023 онд хувийн арга хэмжээний үеэр хамтарсан."
  },
  "paymentDetails": {
    "totalAmount": 3500000,
    "paymentMethod": "card",
    "paymentSchedule": "Тоглолтын дараа"
  },
  "specialRequests": {
    "specialRequest": "Төрсөн өдрийн тусгай слайд шоу",
    "technicalRequirements": "Нэмэлт проектор, өндөр чанартай микрофон",
    "additionalComments": "Арга хэмжээний төгсгөлд 5 минутын галын наадам нэмэх."
  }
},
{
    "id": 5,
    status: 0,
    "userInfo": {
      "fullName": "Батцэцэг Нарантуяа",
      "phone": "99001122",
      "email": "narantuya.b@example.com",
      "organizationName": "Бизнес Академи",
      "representativeName": "Баттулга Түвшинжаргал",
      "billingAddress": "billing@bizacademy.mn"
    },
    "eventDetails": {
      "eventType": "training",
      "eventNameAndFeatures": "Багийн бүтээмж нэмэгдүүлэх сургалт",
      "eventDate": "2025-01-15T10:00",
      "eventLocation": "Номин Холл, Улаанбаатар",
      "eventDuration": "6 цаг",
      "artistAvailability": 60
    },
    "audienceDetails": {
      "audienceCount": "101-200",
      "averageAge": "31-40",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Эрдэнэт Манлайлах Баг",
      "workedWithArtistBefore": "yes",
      "previousWorkInfo": "2023 онд танилцуулах сургалтын үеэр хамтран ажилласан."
    },
    "paymentDetails": {
      "totalAmount": 8000000,
      "paymentMethod": "bank",
      "paymentSchedule": "Сургалтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Багийн тусгай тэмдэглэгээ",
      "technicalRequirements": "Проектор, тайзны микрофон, өндөр чанартай гэрэлтүүлэг",
      "additionalComments": "Кофе амралтын үеэр нэмэлт ундааны үйлчилгээ хэрэгтэй."
    }
  },
  {
    "id": 6,
    status: 0,
    "userInfo": {
      "fullName": "Сарантуяа Хүслэн",
      "phone": "88889999",
      "email": "khuslen.s@example.com",
      "organizationName": "Медиа Групп ХХК",
      "representativeName": "Энхбаатар Ганбаяр",
      "billingAddress": "finance@mediagroup.mn"
    },
    "eventDetails": {
      "eventType": "concert",
      "eventNameAndFeatures": "Оддын үдэш - 2024",
      "eventDate": "2024-12-31T21:00",
      "eventLocation": "Улаанбаатар, Соёлын төв өргөө",
      "eventDuration": "7 цаг",
      "artistAvailability": 150
    },
    "audienceDetails": {
      "audienceCount": "200plus",
      "averageAge": "26-40",
      "eventStyle": "Тансаг, баярын"
    },
    "artistDetails": {
      "artistName": "Гэрэлт Дуу Хамтлаг",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 15000000,
      "paymentMethod": "cash",
      "paymentSchedule": "Захиалгын өдөр"
    },
    "specialRequests": {
      "specialRequest": "Гэрэл болон дууны динамик эффект",
      "technicalRequirements": "Өндөр чанартай дууны систем",
      "additionalComments": "Шинэ жилийн цаг тооллын тайзны тусгай үзүүлбэр зохион байгуулах."
    }
  },
  {
    "id": 7,
    status: 0,
    "userInfo": {
      "fullName": "Төгсжаргал Энхмөнх",
      "phone": "99117755",
      "email": "enkhmunkh.t@example.com",
      "organizationName": "",
      "representativeName": "",
      "billingAddress": "enkhmunkh.t@personal.com"
    },
    "eventDetails": {
      "eventType": "wedding",
      "eventNameAndFeatures": "Хуримын ёслол",
      "eventDate": "2024-12-13T18:00",
      "eventLocation": "Хүннү Молл, Баянгол ресторан",
      "eventDuration": "5 цаг",
      "artistAvailability": 45
    },
    "audienceDetails": {
      "audienceCount": "101-200",
      "averageAge": "20-40",
      "eventStyle": "Романтик, баярын"
    },
    "artistDetails": {
      "artistName": "Амьд Хөгжим Төрөлх Тал",
      "workedWithArtistBefore": "yes",
      "previousWorkInfo": "2022 оны найзын хурим дээр хамтран ажилласан."
    },
    "paymentDetails": {
      "totalAmount": 6000000,
      "paymentMethod": "card",
      "paymentSchedule": "Тоглолтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Хуримын тангараг унших үеийн хөгжим",
      "technicalRequirements": "Өндөр чанартай дууны болон гэрэлтүүлгийн тоног төхөөрөмж",
      "additionalComments": "Арга хэмжээний турш уран илтгэлийн дуу шингээх функц хэрэгтэй."
    }
  },
  {
    "id": 8,
    "status": 0,
    "userInfo": {
      "fullName": "Даваадорж Ариунтуяа",
      "phone": "99123456",
      "email": "ariuntuya.d@example.com",
      "organizationName": "Монгол Соёл ХХК",
      "representativeName": "Санжмятав Ганбат",
      "billingAddress": "billing@mongolculture.mn"
    },
    "eventDetails": {
      "eventType": "concert",
      "eventNameAndFeatures": "Эрдэмийн үдэш",
      "eventDate": "2025-01-01T19:00",
      "eventLocation": "Соёлын төв, Улаанбаатар",
      "eventDuration": "3 цаг",
      "artistAvailability": 60
    },
    "audienceDetails": {
      "audienceCount": "200plus",
      "averageAge": "31-40",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Бадмаарагийн Хөгжимчид",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 7500000,
      "paymentMethod": "bank",
      "paymentSchedule": "Тоглолтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Гэрэлтүүлгийн тусгай эффект",
      "technicalRequirements": "Проектор, өсгөгч төхөөрөмж",
      "additionalComments": "Эхлэл цагийг хойшлуулах боломжийг шалгаж өгнө үү."
    }
  },
  {
    "id": 9,
    "status": 0,
    "userInfo": {
      "fullName": "Отгонбаяр Тэмүүлэн",
      "phone": "99887766",
      "email": "temuulen.o@example.com",
      "organizationName": "Энержи Групп",
      "representativeName": "Намсрайжав Баттөр",
      "billingAddress": "billing@energy.mn"
    },
    "eventDetails": {
      "eventType": "corporate",
      "eventNameAndFeatures": "Шинэ оны баяр",
      "eventDate": "2025-01-03T18:00",
      "eventLocation": "Шангри-Ла, Улаанбаатар",
      "eventDuration": "4 цаг",
      "artistAvailability": 120
    },
    "audienceDetails": {
      "audienceCount": "101-200",
      "averageAge": "26-35",
      "eventStyle": "Баярын"
    },
    "artistDetails": {
      "artistName": "The Peak Band",
      "workedWithArtistBefore": "yes",
      "previousWorkInfo": "2024 оны арга хэмжээнд хамтран ажилласан."
    },
    "paymentDetails": {
      "totalAmount": 12000000,
      "paymentMethod": "cash",
      "paymentSchedule": "Тоглолтын өмнө"
    },
    "specialRequests": {
      "specialRequest": "Шинэ жилийн тусгай тайз",
      "technicalRequirements": "DJ тоног төхөөрөмж",
      "additionalComments": "Тайзны дуугаралтыг урьдчилан шалгах хэрэгтэй."
    }
  },
  {
    "id": 10,
    "status": 0,
    "userInfo": {
      "fullName": "Бат-Эрдэнэ Нандинчимэг",
      "phone": "99112233",
      "email": "nandin.b@example.com",
      "organizationName": "",
      "representativeName": "",
      "billingAddress": "nandin.b@personal.com"
    },
    "eventDetails": {
      "eventType": "birthday",
      "eventNameAndFeatures": "Төрсөн өдрийн үдэшлэг",
      "eventDate": "2025-01-02T17:00",
      "eventLocation": "Citi ресторан, Улаанбаатар",
      "eventDuration": "2 цаг",
      "artistAvailability": 30
    },
    "audienceDetails": {
      "audienceCount": "51-100",
      "averageAge": "20-30",
      "eventStyle": "Энгийн, баярын"
    },
    "artistDetails": {
      "artistName": "Soul Sound Studio",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 3500000,
      "paymentMethod": "card",
      "paymentSchedule": "Тоглолтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Тусгай хөгжим",
      "technicalRequirements": "2 микрофон, жижиг тайз",
      "additionalComments": "Цагийн хязгаар нэмэх боломжийг лавлана уу."
    }
  },
  {
    "id": 11,
    "status": 0,
    "userInfo": {
      "fullName": "Сэргэлэн Содбилэг",
      "phone": "88112244",
      "email": "sodbileg.s@example.com",
      "organizationName": "Уран Соёл",
      "representativeName": "Жанчив Баттулга",
      "billingAddress": "billing@artculture.mn"
    },
    "eventDetails": {
      "eventType": "exhibition",
      "eventNameAndFeatures": "Уран бүтээлийн үзэсгэлэн",
      "eventDate": "2025-01-04T11:00",
      "eventLocation": "Соёлын төв, Улаанбаатар",
      "eventDuration": "5 цаг",
      "artistAvailability": 90
    },
    "audienceDetails": {
      "audienceCount": "101-150",
      "averageAge": "35-50",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Бат-Эрдэнэ Энхсайхан",
      "workedWithArtistBefore": "no",
      "previousWorkInfo": ""
    },
    "paymentDetails": {
      "totalAmount": 5000000,
      "paymentMethod": "bank",
      "paymentSchedule": "Тоглолтын өмнө"
    },
    "specialRequests": {
      "specialRequest": "Тусгай гэрэлтүүлэг",
      "technicalRequirements": "LED дэлгэц",
      "additionalComments": "Тайзны бэлэн байдлыг урьдчилан шалгах."
    }
  },
  {
    "id": 12,
    "status": 0,
    "userInfo": {
      "fullName": "Мөнх-Эрдэнэ Уянга",
      "phone": "88112299",
      "email": "uyanga.m@example.com",
      "organizationName": "Бизнес Инноваци",
      "representativeName": "Сүрэнбат Ганбаатар",
      "billingAddress": "finance@biz.mn"
    },
    "eventDetails": {
      "eventType": "training",
      "eventNameAndFeatures": "Багийн сургалт",
      "eventDate": "2025-01-05T14:00",
      "eventLocation": "Бизнес төв, Улаанбаатар",
      "eventDuration": "4 цаг",
      "artistAvailability": 60
    },
    "audienceDetails": {
      "audienceCount": "101-200",
      "averageAge": "30-40",
      "eventStyle": "Албан ёсны"
    },
    "artistDetails": {
      "artistName": "Инноваци баг",
      "workedWithArtistBefore": "yes",
      "previousWorkInfo": "2024 оны сургалтын арга хэмжээнд хамтарсан."
    },
    "paymentDetails": {
      "totalAmount": 6000000,
      "paymentMethod": "cash",
      "paymentSchedule": "Тоглолтын дараа"
    },
    "specialRequests": {
      "specialRequest": "Видео бичлэг хийх",
      "technicalRequirements": "Проектор, микрофон",
      "additionalComments": "Кофе амралтын хэсэг нэмэх."
    }
  }
];

// DOM elements
const orderList = document.getElementById('order-list');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const currentWeekDisplay = document.getElementById('current-week');

// Current date and week tracking
let currentDate = new Date();
let currentWeekStart = getWeekStart(currentDate);
let currentWeekEnd = getWeekEnd(currentDate);

// Helper functions
function getWeekStart(date) {
const start = new Date(date);
const day = start.getDay();
const diff = start.getDate() - day + (day === 0 ? -6 : 1);
start.setDate(diff);
return start;
}

function getWeekEnd(date) {
const end = new Date(getWeekStart(date));
end.setDate(end.getDate() + 6);
return end;
}

function formatDate(date) {
return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function updateWeekDisplay() {
const weekStart = formatDate(currentWeekStart);
const weekEnd = formatDate(currentWeekEnd);
currentWeekDisplay.textContent = `${weekStart} - ${weekEnd}`;
}

function isDateInCurrentWeek(dateStr) {
const date = new Date(dateStr);
return date >= currentWeekStart && date <= currentWeekEnd;
}

function updateOrderList() {
orderList.innerHTML = '';
const today = new Date();

// Захиалгуудыг огноогоор эрэмбэлэх
const sortedOrders = orders_more
    .filter(order => new Date(order.eventDetails.eventDate) >= today) // Зөвхөн одоо болон ирээдүйн захиалгууд
    .sort((a, b) => {
        const dateA = new Date(a.eventDetails.eventDate);
        const dateB = new Date(b.eventDetails.eventDate);
        return dateA - dateB; // Өсөх дарааллаар эрэмбэлэх
    });

sortedOrders.forEach(order => {
    const orderDate = new Date(order.eventDetails.eventDate);
    const li = document.createElement('li');
    
    const time = document.createElement('p');
    time.className = 'time';
    time.textContent = orderDate.toLocaleString('mn-MN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = order.status === 1;
    checkbox.addEventListener('change', () => {
        order.status = checkbox.checked ? 1 : 0;
        updateCalendarEvents();
    });
    
    const label = document.createElement('label');
    label.textContent = order.eventDetails.eventNameAndFeatures;
    
    const button = document.createElement('button');
    button.textContent = 'Дэлгэрэнгүй';
    button.className = 'more-btn';
    button.addEventListener('click', () => {
        console.log('Show details for order:', order.id);
    });
    
    li.appendChild(checkbox);
    li.appendChild(time);
    li.appendChild(label);
    li.appendChild(button);
    
    orderList.appendChild(li);
});
}

function updateCalendarEvents() {
// Calendar цэвэрлэх
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
weekdays.forEach(day => {
    const dayElement = document.getElementById(`${day}_a`);
    dayElement.innerHTML = '';
});

// Зөвхөн status=1 захиалгуудыг calendar дээр харуулах
orders_more.forEach(order => {
    if (order.status === 1) { // Зөвхөн check хийсэн захиалгууд
        const orderDate = new Date(order.eventDetails.eventDate);
        
        if (isDateInCurrentWeek(order.eventDetails.eventDate)) {
            const dayIndex = orderDate.getDay();
            const dayId = weekdays[dayIndex === 0 ? 6 : dayIndex - 1] + '_a';
            const dayElement = document.getElementById(dayId);
            
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.textContent = `${orderDate.getHours()}:${String(orderDate.getMinutes()).padStart(2, '0')} - ${order.eventDetails.eventNameAndFeatures}`;
            
            dayElement.appendChild(eventDiv);
        }
    }
});
}

// Event listeners
prevWeekBtn.addEventListener('click', () => {
currentDate.setDate(currentDate.getDate() - 7);
currentWeekStart = getWeekStart(currentDate);
currentWeekEnd = getWeekEnd(currentDate);
updateWeekDisplay();
updateOrderList();
updateCalendarEvents();
});

nextWeekBtn.addEventListener('click', () => {
currentDate.setDate(currentDate.getDate() + 7);
currentWeekStart = getWeekStart(currentDate);
currentWeekEnd = getWeekEnd(currentDate);
updateWeekDisplay();
updateOrderList();
updateCalendarEvents();
});



// HTML дотор modal div-ийг нэмнэ
const modalHtml = `
<div id="bookingModal" class="modal">
<div class="modal-content">
<div class="modal-header">
  <h2>Захиалгын дэлгэрэнгүй</h2>
  <span class="close">&times;</span>
</div>
<div class="modal-body">
</div>
<div class="modal-footer">
  <button id="cancelOrder" class="cancel-btn">Цуцлах</button>
  <button id="closeModal">Буцах</button>
</div>
</div>
</div>
`;


// HTML рүү modal-ийг inject хийх
document.body.insertAdjacentHTML('beforeend', modalHtml);

// Modal-тай ажиллах функцууд
function showBookingDetails(order) {
const modal = document.getElementById('bookingModal');
const modalBody = modal.querySelector('.modal-body');
const closeBtn = modal.querySelector('.close');
const closeModalBtn = document.getElementById('closeModal');
const cancelOrderBtn = document.getElementById('cancelOrder');

// Огноо форматлах функц
const formatDate = (dateString) => {
if (!dateString) return '';
try {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('mn-MN');
} catch (error) {
  return '';
}
};

// Цаг форматлах функц
const formatTime = (dateString) => {
if (!dateString) return '';
try {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('mn-MN', {
    hour: '2-digit',
    minute: '2-digit'
  });
} catch (error) {
  return '';
}
};

// Modal-д харуулах мэдээллийг бэлдэх
const detailsHTML = `
<div class="details-container">
  <div class="detail-item">
    <strong>Үйл явдлын нэр:</strong> 
    <span>${order.eventDetails?.eventNameAndFeatures || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Захиалагчийн овог нэр:</strong> 
    <span>${order.userInfo?.fullName || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Утасны дугаар:</strong> 
    <span>${order.userInfo?.phone || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Байршил:</strong> 
    <span>${order.eventDetails?.eventLocation || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Огноо:</strong> 
    <span>${formatDate(order.eventDetails?.eventDate)}</span>
  </div>
  <div class="detail-item">
    <strong>Цаг:</strong> 
    <span>${formatTime(order.eventDetails?.eventDate)}</span>
  </div>
  <div class="detail-item">
    <strong>Төлбөр хийх төрөл:</strong> 
    <span>${order.paymentDetails?.paymentMethod || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Сонсогчдийн дундаж нас:</strong> 
    <span>${order.audienceDetails?.averageAge || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Үзэгчдийн тоо:</strong> 
    <span>${order.audienceDetails?.audienceCount || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Тоглох хугацаа:</strong> 
    <span>${order.eventDetails?.eventDuration || ''}</span>
  </div>
  <div class="detail-item">
    <strong>Хэдэн минутын өмнө бэлэн байх:</strong> 
    <span>${order.eventDetails?.artistAvailability || ''} минутын өмнө</span>
  </div>
</div>
`;

modalBody.innerHTML = detailsHTML;
modal.style.display = 'block';

// Modal хаах функц
const closeModal = () => {
modal.style.display = 'none';
};

// Захиалга цуцлах функц
const cancelOrder = () => {
order.status = -1;
closeModal();
// Захиалгын жагсаалтыг шинэчлэх
window.location.reload();
};

closeBtn.onclick = closeModal;
closeModalBtn.onclick = closeModal;
cancelOrderBtn.onclick = cancelOrder;

// Modal-аас гадуур дарахад хаах
window.onclick = (event) => {
if (event.target === modal) {
  closeModal();
}
};
}

// "Дэлгэрэнгүй" товчийг HTML-д нэмэх
const addDetailButtons = () => {
const orderItems = document.querySelectorAll('.more-btn'); // '.detail-btn'-г '.more-btn' болгож өөрчилсөн
orderItems.forEach((button, index) => {
button.addEventListener('click', () => {
  // orders_more array-аас тухайн захиалгыг олж авах
  const order = orders_more[index];
  showBookingDetails(order);
});
});
};

// DOM бэлэн болсны дараа товчнуудыг нэмэх
document.addEventListener('DOMContentLoaded', addDetailButtons);
// Initialize
updateWeekDisplay();
updateOrderList();
updateCalendarEvents();