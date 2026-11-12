
// =====================================
// MOBILE MENU
// =====================================

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
}

function hideMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}

menuToggle.addEventListener("click", openMenu);
closeMenu.addEventListener("click", hideMenu);
overlay.addEventListener("click", hideMenu);

// Close menu when clicking navigation links

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", hideMenu);
});

// =====================================
// PRINT RECEIPT
// =====================================

const printButton = document.getElementById("printButton");

printButton.addEventListener("click", function () {
    window.print();
});

// =====================================
// COPY WIFI PASSWORD
// =====================================

const copyButton = document.getElementById("copyButton");
const wifiPassword = document.getElementById("wifiPassword");
const copyMessage = document.getElementById("copyMessage");

copyButton.addEventListener("click", async function () {

    const password = wifiPassword.textContent.trim();

    try {
        await navigator.clipboard.writeText(password);

        copyMessage.textContent = "Password copied successfully!";

        copyButton.innerHTML = "✓ Copied";

        setTimeout(() => {
            copyMessage.textContent = "";
            copyButton.innerHTML = `
                <img src="./assets/images/icon-wifi.svg" alt="">
                Copy
            `;
        }, 2000);

    } catch (error) {

        copyMessage.textContent =
            "Unable to copy. Please copy manually.";

    }

});

// =====================================
// ADD TO CALENDAR
// =====================================

const calendarButton = document.getElementById("calendarButton");

calendarButton.addEventListener("click", function () {

    const eventDetails = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Maison Soleil//Booking//EN",
        "BEGIN:VEVENT",
        "UID:MS-2026-0421-AH@maisons-soleil.com",
        "DTSTAMP:20261112T000000Z",
        "DTSTART:20270425T150000",
        "DTEND:20270429T110000",
        "SUMMARY:Stay at Maison Soleil - La Garrigue",
        "LOCATION:12 Rue des Oliviers, Cassis, France",
        "DESCRIPTION:Your confirmed stay at Maison Soleil.",
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob(
        [eventDetails],
        { type: "text/calendar;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "maison-soleil-booking.ics";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    downloadLink.remove();

    URL.revokeObjectURL(url);

});
