document.addEventListener('DOMContentLoaded', () => {
    const goBackBtn = document.getElementById('goBackBtn');
    if (goBackBtn) {
      goBackBtn.addEventListener('click', () => {
        window.history.back();
      });
    }
  });
  