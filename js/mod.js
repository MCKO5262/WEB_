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
        <span>${order.eventDetails.eventNameAndFeatures || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Захиалагчийн овог нэр:</strong> 
        <span>${order.userInfo.fullName || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Утасны дугаар:</strong> 
        <span>${order.userInfo.phone || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Байршил:</strong> 
        <span>${order.eventDetails.eventLocation || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Огноо:</strong> 
        <span>${formatDate(order.eventDetails.eventDate)}</span>
      </div>
      <div class="detail-item">
        <strong>Цаг:</strong> 
        <span>${formatTime(order.eventDetails.eventDate)}</span>
      </div>
      <div class="detail-item">
        <strong>Төлбөр хийх төрөл:</strong> 
        <span>${order.paymentDetails.paymentMethod || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Сонсогчдийн дундаж нас:</strong> 
        <span>${order.audienceDetails.averageAge || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Үзэгчдийн тоо:</strong> 
        <span>${order.audienceDetails.audienceCount || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Тоглох хугацаа:</strong> 
        <span>${order.eventDetails.eventDuration || ''}</span>
      </div>
      <div class="detail-item">
        <strong>Хэдэн минутын өмнө бэлэн байх:</strong> 
        <span>${order.eventDetails.artistAvailability || ''} минутын өмнө</span>
      </div>
    </div>
  `;

  modalBody.innerHTML = detailsHTML;
  modal.style.display = 'block';

  // Modal хаах функцууд
  const closeModal = () => {
    modal.style.display = 'none';
  };

  closeBtn.onclick = closeModal;
  closeModalBtn.onclick = closeModal;

  // Modal-аас гадуур дарахад хаах
  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
}

// "Дэлгэрэнгүй" товчийг HTML-д нэмэх
const addDetailButtons = () => {
  const orderItems = document.querySelectorAll('.cancel-btn');
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