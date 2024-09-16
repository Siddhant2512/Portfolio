const certifications = [
    { name: "SQL for Data Science", file: "CERTIFICATE_LANDING_PAGE~CHHTGSGE92QC.jpeg" },
    { name: "Python for Data Science/AI", file: "CERTIFICATE_LANDING_PAGE~KFDQ3ZLKQFWZ.jpeg" },
    { name: "Tools for Data Science", file: "CERTIFICATE_LANDING_PAGE~E4FKK6W87T2N.jpeg" },
    // Add more certifications as needed
];

function loadCertifications() {
    console.log("Loading certifications...");
    const container = document.querySelector('.certifications-container');
    if (!container) {
        console.error("Certifications container not found!");
        return;
    }

    // Clear existing content to prevent duplication
    container.innerHTML = '';

    certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'certification-card';
        
        const imgPath = `Certifications/${cert.file}`;
        console.log(`Loading image: ${imgPath}`);
        
        card.innerHTML = `
            <img src="${imgPath}" alt="${cert.name}" loading="lazy" 
                 onerror="this.onerror=null; this.src='images/placeholder.jpg'; console.error('Error loading image:', '${imgPath}');"
                 onload="console.log('Image loaded successfully:', '${imgPath}');">
            <h4>${cert.name}</h4>
        `;
        
        card.addEventListener('click', () => showOverlay(imgPath));
        container.appendChild(card);
    });
    console.log("Certifications loaded.");
}

function showOverlay(imageSrc) {
    console.log(`Showing overlay for: ${imageSrc}`);
    const overlay = document.getElementById('certification-overlay');
    const overlayImage = document.getElementById('overlay-image');
    overlayImage.src = imageSrc;
    overlay.style.display = 'flex';
}

document.querySelector('.close-overlay').addEventListener('click', () => {
    document.getElementById('certification-overlay').style.display = 'none';
});

// Close overlay when clicking outside the image
document.getElementById('certification-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'certification-overlay') {
        e.target.style.display = 'none';
    }
});

// Remove the DOMContentLoaded event listener from here
