const MAX_PDF_SIZE = 10 * 1024 * 1024;
const PDF_SIGNATURE = "%PDF-";

async function isPdfFile(file) {
    if (!file || file.size > MAX_PDF_SIZE) return false;

    const header = await file.slice(0, PDF_SIGNATURE.length).text();
    return header === PDF_SIGNATURE;
}

function showPdfError(card, message) {
    const emptyState = card.querySelector(".pdf-empty-state");
    const status = card.querySelector(".pdf-status");

    emptyState.hidden = false;
    status.textContent = message;
    status.hidden = false;
}

document.querySelectorAll("[data-pdf-input]").forEach((input) => {
    input.addEventListener("change", async () => {
        const file = input.files[0];
        const card = input.closest(".document-card");
        const frame = card.querySelector("iframe");
        const emptyState = card.querySelector(".pdf-empty-state");
        const status = card.querySelector(".pdf-status");
        const link = card.querySelector(`[data-pdf-link="${input.dataset.pdfInput}"]`);
        const previousUrl = frame.dataset.objectUrl;

        status.hidden = true;
        if (previousUrl) URL.revokeObjectURL(previousUrl);

        if (!(await isPdfFile(file))) {
            frame.removeAttribute("src");
            frame.hidden = true;
            link.hidden = true;
            showPdfError(card, "Please choose a PDF smaller than 10 MB.");
            return;
        }

        const fileUrl = URL.createObjectURL(file);
        frame.dataset.objectUrl = fileUrl;
        frame.src = fileUrl;
        frame.hidden = false;
        emptyState.hidden = true;
        link.href = fileUrl;
        link.hidden = false;
    });
});
