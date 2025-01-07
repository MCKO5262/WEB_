// Get the logged in artist's ID from localStorage or session
const getLoggedInArtistId = () => {
    const artistData = JSON.parse(localStorage.getItem('artistData') || '{}');
    return artistData.id || null;
  };
  // Fetch orders for the specific artist
  async function fetchOrders() {
    try {
      const response = await fetch('http://localhost:3000/api/orders');
      const result = await response.json();
  
      if (response.ok) {
        const artistId = getLoggedInArtistId();
        // Filter orders for the logged-in artist if an artist is logged in
        const filteredOrders = artistId 
          ? result.data.filter(order => order.artist_id === artistId)
          : result.data;
          
        console.log('Filtered orders:', filteredOrders);
        return filteredOrders;
      } else {
        console.error('Error fetching orders:', result.message);
        return [];
      }
    } catch (error) {
      console.error('Network error:', error);
      return [];
    }
  }
  
  // Calendar functionality
  class Calendar {
    constructor() {
      this.currentDate = new Date();
      this.orders = [];
      this.weekStart = this.getWeekStart(this.currentDate);
      this.weekEnd = this.getWeekEnd(this.currentDate);
      
      // DOM elements
      this.orderList = document.getElementById('order-list');
      this.prevWeekBtn = document.getElementById('prev-week');
      this.nextWeekBtn = document.getElementById('next-week');
      this.currentWeekDisplay = document.getElementById('current-week');
      
      // Initialize
      this.initialize();
    }
  
    async initialize() {
      this.setupEventListeners();
      await this.loadOrders();
      this.updateWeekDisplay();
      this.updateCalendarEvents();
    }
  
    setupEventListeners() {
      this.prevWeekBtn.addEventListener('click', () => {
        this.navigateWeek(-1);
      });
  
      this.nextWeekBtn.addEventListener('click', () => {
        this.navigateWeek(1);
      });
    }
  
    async loadOrders() {
      this.orders = await fetchOrders();
      this.updateOrderList();
    }
  
    getWeekStart(date) {
      const start = new Date(date);
      const day = start.getDay();
      const diff = start.getDate() - day + (day === 0 ? -6 : 1);
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      return start;
    }
  
    getWeekEnd(date) {
      const end = new Date(this.getWeekStart(date));
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return end;
    }
  
    formatDate(date) {
      return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  
    updateWeekDisplay() {
      const weekStart = this.formatDate(this.weekStart);
      const weekEnd = this.formatDate(this.weekEnd);
      this.currentWeekDisplay.textContent = `${weekStart} - ${weekEnd}`;
    }
  
    navigateWeek(direction) {
      this.currentDate.setDate(this.currentDate.getDate() + (direction * 7));
      this.weekStart = this.getWeekStart(this.currentDate);
      this.weekEnd = this.getWeekEnd(this.currentDate);
      this.updateWeekDisplay();
      this.updateCalendarEvents();
    }
  
    isDateInCurrentWeek(dateStr) {
      const date = new Date(dateStr);
      return date >= this.weekStart && date <= this.weekEnd;
    }
  
    updateOrderList() {
      this.orderList.innerHTML = '';
      const today = new Date();
  
      const upcomingOrders = this.orders
        .filter(order => new Date(order.event_date) >= today)
        .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  
      upcomingOrders.forEach(order => {
        const li = this.createOrderListItem(order);
        this.orderList.appendChild(li);
      });
    }
  
    createOrderListItem(order) {
      const li = document.createElement('li');
      const orderDate = new Date(order.event_date);
  
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
      checkbox.checked = order.order_status === "checked";
      checkbox.addEventListener('change', () => {
        this.updateOrderStatus(order.id, checkbox.checked ? "checked" : "pending");
      });
  
      const label = document.createElement('label');
      label.textContent = order.event_name_and_features;
  
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'Дэлгэрэнгүй';
      detailsButton.className = 'more-btn';
      detailsButton.addEventListener('click', () => {
        this.showOrderDetails(order);
      });
  
      li.appendChild(checkbox);
      li.appendChild(time);
      li.appendChild(label);
      li.appendChild(detailsButton);
  
      return li;
    }
  
    async updateOrderStatus(orderId, newStatus) {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newStatus })
        });
  
        if (response.ok) {
          await this.loadOrders();
          this.updateCalendarEvents();
        } else {
          console.error('Failed to update order status');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  
    updateCalendarEvents() {
      const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      
      // Clear existing events
      weekdays.forEach(day => {
        const dayElement = document.getElementById(`${day}_a`);
        if (dayElement) {
          dayElement.innerHTML = '';
        }
      });
  
      // Add events to calendar
      this.orders.forEach(order => {
        if (this.isDateInCurrentWeek(order.event_date)) {
          const orderDate = new Date(order.event_date);
          const dayIndex = orderDate.getDay();
          const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
          const dayId = `${weekdays[adjustedIndex]}_a`;
  
          const dayElement = document.getElementById(dayId);
          if (dayElement) {
            const eventDiv = this.createEventElement(order);
            dayElement.appendChild(eventDiv);
          }
        }
      });
    }
  
    createEventElement(order) {
      const eventDiv = document.createElement('div');
      eventDiv.className = `event ${order.order_status === 'cancelled' ? 'cancelled' : ''}`;
      
      const orderDate = new Date(order.event_date);
      const timeStr = orderDate.toLocaleTimeString('mn-MN', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      eventDiv.innerHTML = `
        <span class="time">${timeStr}</span>
        <span class="title">${order.event_name_and_features}</span>
      `;
  
      eventDiv.addEventListener('click', () => {
        this.showOrderDetails(order);
      });
  
      return eventDiv;
    }
  
    showOrderDetails(order) {
      // Create modal content
      const modalHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>Захиалгын дэлгэрэнгүй</h2>
            <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <p><strong>Үйл явдал:</strong> ${order.event_name_and_features}</p>
            <p><strong>Байршил:</strong> ${order.event_location}</p>
            <p><strong>Огноо:</strong> ${new Date(order.event_date).toLocaleString('mn-MN')}</p>
            <p><strong>Төлөв:</strong> ${order.order_status}</p>
            <p><strong>Үргэлжлэх хугацаа:</strong> ${order.event_duration}</p>
            <p><strong>Нийт дүн:</strong> ${order.total_amount?.toLocaleString()} ₮</p>
          </div>
        </div>
      `;
  
      // Show modal
      const modal = document.getElementById('bookingModal');
      modal.innerHTML = modalHTML;
      modal.style.display = 'block';
  
      // Add close handlers
      const closeBtn = modal.querySelector('.close');
      closeBtn.onclick = () => modal.style.display = 'none';
      window.onclick = (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    }
  }
  
  // Initialize calendar when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
  });