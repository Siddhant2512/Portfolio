document.addEventListener('DOMContentLoaded', function() {
    const certifications = [
        { name: 'Certification 1', file: '../Certifications/CERTIFICATE_LANDING_PAGE~CHHTGSGE92QC.jpeg' },
        { name: 'Certification 2', file: '../Certifications/CERTIFICATE_LANDING_PAGE~KFDQ3ZLKQFWZ.jpeg' },
        { name: 'Certification 3', file: '../Certifications/CERTIFICATE_LANDING_PAGE~E4FKK6W87T2N.jpeg' },
        // Add more certifications as needed
    ];

    const container = document.querySelector('.certifications-container');
    const overlay = document.getElementById('certification-overlay');
    const overlayImage = document.getElementById('overlay-image');
    const closeOverlay = document.querySelector('.close-overlay');

    certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'certification-card';
        card.draggable = true;
        card.innerHTML = `
            <img src="Certifications/${cert.file}" alt="${cert.name}">
            <h4>${cert.name}</h4>
        `;
        container.appendChild(card);

        card.addEventListener('click', () => {
            overlayImage.src = `Certifications/${cert.file}`;
            overlay.style.display = 'flex';
        });

        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });

    closeOverlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    function dragStart(e) {
        this.style.opacity = '0.4';
        e.dataTransfer.setData('text/plain', this.innerHTML);
    }

    function dragEnd(e) {
        this.style.opacity = '1';
    }

    container.addEventListener('dragover', dragOver);
    container.addEventListener('drop', drop);

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggedElement = document.createElement('div');
        draggedElement.className = 'certification-card';
        draggedElement.draggable = true;
        draggedElement.innerHTML = data;
        draggedElement.addEventListener('dragstart', dragStart);
        draggedElement.addEventListener('dragend', dragEnd);
        draggedElement.addEventListener('click', () => {
            overlayImage.src = draggedElement.querySelector('img').src;
            overlay.style.display = 'flex';
        });
        e.target.closest('.certifications-container').appendChild(draggedElement);
    }
});
