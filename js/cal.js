const orders_more = [
    { id: 1,
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
    }
    
];

function loadOrder() {
  const orderList = document.getElementById('order-list');

  const orderItems = orders_more.map(order => {
    const listItem = document.createElement('li');
    listItem.className = 'order-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `order-${order.id}`;
    checkbox.addEventListener('change', () => toggleEvent(order));

    // Create time element showing full event date
    const time = document.createElement('p');
    time.className = 'time';
    time.textContent = order.eventDetails.eventDate;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    // Only show event details in label
    label.textContent = order.eventDetails.eventNameAndFeatures;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Дэлгэрэнгүй';
    cancelBtn.className = 'cancel-btn';

    // Append elements in the desired order
    listItem.appendChild(checkbox);
    listItem.appendChild(time);
    listItem.appendChild(label);
    listItem.appendChild(cancelBtn);

    return listItem;
  });

  orderList.append(...orderItems);
}

document.addEventListener('DOMContentLoaded', loadOrder);

function toggleEvent(order) {
// Захиалгын өдөрт тохирсон element ID-г авах
const dayId = getDayId(order.eventDetails.eventDate);
const dayElement = document.getElementById(dayId + '_a'); // Тухайн өдрийн элемент олж авах
if (dayElement) {
  const eventElement = document.querySelector(`#event-${order.id}`); // Захиалгын event элементийг шалгах
  if (eventElement) {
    eventElement.remove(); // Event байгаа бол устгах
  } else {
    // Event байхгүй бол шинэ event үүсгэх
    const newEvent = document.createElement('div'); // <div> элемент үүсгэх
    newEvent.className = 'event'; // Класс нэмэх
    newEvent.id = `event-${order.id}`; // ID оноох
    // Тухайн үйл явдлын цаг болон нэрийг харуулах
    newEvent.textContent = `${formatTime(order.eventDetails.eventDate)} - ${order.eventDetails.eventNameAndFeatures}`;
    dayElement.appendChild(newEvent); // Шинэ event-ийг өдрийн элементэд нэмэх
  }
}
}

function getDayId(dateString) {
// Огнооны объект үүсгэх
const date = new Date(dateString);
const day = date.getDay(); // Өдрийн дугаарыг авах (0: Ням, ..., 6: Бямба)
const dayIds = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
return dayIds[day]; // Өдрийн нэртэй тохирсон ID-г буцаах
}

function formatDate(dateString) {
// Огнооны объект үүсгэх
const date = new Date(dateString);
// YYYY-MM-DD форматаар огноог буцаах
return date.toISOString().split('T')[0];
}

function formatTime(dateString) {
// Огнооны объект үүсгэх
const date = new Date(dateString);
// HH:MM форматаар цагийг буцаах
return date.toTimeString().split(':').slice(0, 2).join(':');
}

// HTML баримт бичгийг бүрэн ачаалсны дараа loadOrder функцийг ажиллуулах
document.addEventListener('DOMContentLoaded', loadOrder);




