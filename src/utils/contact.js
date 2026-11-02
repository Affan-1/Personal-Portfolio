// Robust email helper that handles environments without desktop email clients
export function openEmailDirectly(email = 'affanmuhammad926@gmail.com', subject = 'Connecting from your Portfolio') {
  // 1. Copy to clipboard immediately
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(email).catch(() => {});
  }

  // 2. Open Gmail Web composer directly in new tab (best cross-platform experience)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
  const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

  // 3. Also trigger standard OS mailto for native email clients (like Outlook or Apple Mail)
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }
}
