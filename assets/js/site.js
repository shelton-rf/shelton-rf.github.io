"use strict";

const PDF_SIGNATURE = "%PDF-";
const objectUrls = new WeakMap();
const pdfUrls = {
	resume: new URL("../../documents/resume_cp-3.pdf", import.meta.url).href,
	"business-plan": new URL("../../documents/BusinessPlan-2.pdf", import.meta.url).href
};

document.querySelectorAll("[data-pdf-viewer]").forEach((frame) => {
	const documentName = frame.dataset.pdfViewer;
	const pdfUrl = pdfUrls[documentName];
	if (!pdfUrl) return;

	frame.src = pdfUrl;
	frame.hidden = false;
	document.querySelector(`[data-pdf-empty-state="${documentName}"]`).hidden = true;
	document.querySelector(`[data-pdf-open="${documentName}"]`).href = pdfUrl;
	document.querySelector(`[data-pdf-download="${documentName}"]`).href = pdfUrl;
});

function isPdf(file) {
	return file && file.size >= PDF_SIGNATURE.length;
}

async function hasPdfSignature(file) {
	if (!isPdf(file)) return false;

	const header = await file.slice(0, PDF_SIGNATURE.length).text();
	return header === PDF_SIGNATURE;
}

document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
	tab.addEventListener("click", () => {
		const selectedAuth = tab.dataset.authTab;

		document.querySelectorAll("[data-auth-tab]").forEach((item) => {
			const isSelected = item === tab;
			item.classList.toggle("is-active", isSelected);
			item.setAttribute("aria-selected", String(isSelected));
		});

		document.querySelectorAll("[data-auth-form]").forEach((form) => {
			form.hidden = form.dataset.authForm !== selectedAuth;
		});
	});
});

document.querySelectorAll("[data-auth-form]").forEach((form) => {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const status = document.querySelector("[data-auth-status]");
		status.textContent = "This static preview does not transmit credentials. Connect /api/auth to an audited identity service before enabling access.";
	});
});

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