"use strict";

const PDF_SIGNATURE = "%PDF-";
const objectUrls = new WeakMap();

function isPdf(file) {
	return file && file.size >= PDF_SIGNATURE.length;
}

async function hasPdfSignature(file) {
	if (!isPdf(file)) return false;

	const header = await file.slice(0, PDF_SIGNATURE.length).text();
	return header === PDF_SIGNATURE;
}

document.querySelectorAll("[data-pdf-input]").forEach((input) => {
	input.addEventListener("change", async () => {
		const file = input.files[0];
		const card = input.closest(".document-card");
		const frame = card.querySelector("iframe");
		const emptyState = card.querySelector(".pdf-empty-state");
		const link = card.querySelector(`[data-pdf-link="${input.dataset.pdfInput}"]`);

		if (!(await hasPdfSignature(file))) {
			input.value = "";
			return;
		}

		const previousUrl = objectUrls.get(input);
		if (previousUrl) URL.revokeObjectURL(previousUrl);

		const fileUrl = URL.createObjectURL(file);
		objectUrls.set(input, fileUrl);
		frame.src = fileUrl;
		frame.hidden = false;
		emptyState.hidden = true;
		link.href = fileUrl;
		link.hidden = false;
	});
});