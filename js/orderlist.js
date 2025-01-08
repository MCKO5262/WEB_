
let currentOrderId = null;
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderCode = urlParams.get("orderNumber");

    if (orderCode) {
        fetchOrderDetails(orderCode);
    }
});

async function fetchOrderDetails(orderCode) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/orders/check/${orderCode}`
        );
        const data = await response.json();

        document.getElementById("loading").style.display = "none";

        if (data.success && data.data) {
            displayOrderDetails(data.data);
        } else {
            showError("Захиалга олдсонгүй. Буцаад шалгана уу.");
        }
    } catch (error) {
        showError("Алдаа гарлаа. Буцаад дахин оролдоно уу.");
    }
}

function showError(message) {
    const Aldaa = document.getElementById("Aldaa");
    Aldaa.textContent = message;
    Aldaa.style.display = "block";
}

function displayOrderDetails(order) {
    currentOrderId = order.id;
    const container = document.getElementById("Zmedeelel");

    const statusText = {
        pending: "Хүлээгдэж байна",
        cancelled: "Цуцлагдсан",
        confirmed: "Баталгаажсан",
        completed: "Дууссан",
    };

    const html = `
                <div class="order-card">
                  <artist-profile artist-id="${order.artistId}"></artist-profile>
                    <div class="order-header">
                        <h2>Захиалгын дэлгэрэнгүй</h2>
                        <span class="status-badge status-${order.status}">
                            ${statusText[order.status] || order.status}
                        </span>
                    </div>
                    <div class="order-details">
                        <div>
                            <div class="detail-group">
                                <div class="detail-label">Захиалгын код:</div>
                                <div>${order.orderCode}</div>
                            </div>
                            <div class="detail-group">
                                <div class="detail-label">Захиалагч:</div>
                                <div>${order.customerName}</div>
                            </div>
                            <div class="detail-group">
                                <div class="detail-label">Нийт дүн:</div>
                                <div>${order.totalAmount}₮</div>
                            </div>
                        </div>
                        <div>
                            <div class="detail-group">
                                <div class="detail-label">Арга хэмжээний огноо:</div>
                                <div>${new Date(
                                    order.event.date
                                ).toLocaleDateString()}</div>
                            </div>
                            <div class="detail-group">
                                <div class="detail-label">Хэрэгтэй хугацаа:</div>
                                <div>${order.event.artistAvailability}</div>
                            </div>
                            <div class="detail-group">
                                <div class="detail-label">Байршил:</div>
                                <div>${order.event.location}</div>
                            </div>
                        </div>
                    </div>
                    ${order.status === "pending"
            ? `<button class="cancel-btn" onclick="showCancelModal()">Захиалга цуцлах</button>`
            : ""
        }
                </div>
            `;

    container.innerHTML = html;
}

window.showCancelModal = function () {
    document.getElementById("cancelModal").style.display = "block";
};

window.closeModal = function () {
    document.getElementById("cancelModal").style.display = "none";
};

window.confirmCancel = async function () {
    try {
        const orderCode = new URLSearchParams(window.location.search).get(
            "orderNumber"
        );
        const response = await fetch(
            `http://localhost:3000/api/orders/cancel/${orderCode}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "cancelled" }),
            }
        );

        if (response.ok) {
            await fetchOrderDetails(orderCode);
        } else {
            showError("Захиалга цуцлахад алдаа гарлаа");
        }
    } catch (error) {
        showError("Алдаа гарлаа");
    } finally {
        closeModal();
    }
};
document.querySelector(".cancel-btn").addEventListener("click", showCancelModal);
document.querySelector(".confirm-btn").addEventListener("click", confirmCancel);
