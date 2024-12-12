import { OrderService } from './order-service.js';
import './order-list.js';  // Add this import
import './order-card.js';  // Add this import
export class AppElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.orders = [];
    }
  
    connectedCallback() {
      this.fetchOrders();
      this.render();
      this.setupEventListeners();
    }
  
    async fetchOrders() {
      try {
        this.orders = await OrderService.getOrders();
        this.render();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  
    setupEventListeners() {
      window.addEventListener('orderCancelled', (e) => {
        this.orders = this.orders.filter(order => order.id !== e.detail.orderId);
        this.render();
      });
  
      // Add theme toggle functionality
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.updateTheme(darkModeMediaQuery.matches);
      darkModeMediaQuery.addEventListener('change', e => this.updateTheme(e.matches));
    }
  
    updateTheme(isDark) {
      if (isDark) {
        this.setAttribute('dark-mode', '');
      } else {
        this.removeAttribute('dark-mode');
      }
      this.shadowRoot.querySelector('order-list')?.setAttribute('dark-mode', isDark ? '' : null);
    }
  
    render() {
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: var(--bc2);
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          }
    
          :host([dark-mode]) {
            background-color: var(--dark-bg);
            color: var(--dark-text);
          }
    
          
        </style>
    
        <div id="orderListContainer">
          <order-list></order-list>
        </div>
      `;
    
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    
      const orderList = this.shadowRoot.querySelector('order-list');
      if (orderList) {
        orderList.orders = this.orders;
      }
    }
  }
customElements.define('app-root', AppElement);