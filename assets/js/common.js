// ハンバーガーメニューの開閉機能
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.sp-menu-button');
  const modalMenu = document.getElementById('modal-menu');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalLinks = document.querySelectorAll('.modal-nav a');

  // モーダルを閉じる関数
  function closeModal() {
    modalMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ハンバーガーボタンのクリックイベント
  if (menuButton && modalMenu) {
    menuButton.addEventListener('click', function() {
      modalMenu.classList.toggle('active');

      // モーダルが開いているときはbodyのスクロールを無効化
      if (modalMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // バツボタンのクリックイベント
  if (modalCloseBtn && modalMenu) {
    modalCloseBtn.addEventListener('click', function() {
      closeModal();
    });
  }

  // モーダル内のリンクをクリックしたときにモーダルを閉じる
  if (modalLinks.length > 0 && modalMenu) {
    modalLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // 外部リンクの場合は即座に閉じない（遷移を待つ）
        if (link.getAttribute('target') === '_blank') {
          setTimeout(function() {
            closeModal();
          }, 100);
        } else {
          closeModal();
        }
      });
    });
  }

  // モーダルの背景（コンテンツエリア以外）をクリックしたときに閉じる
  if (modalMenu) {
    modalMenu.addEventListener('click', function(e) {
      if (e.target === modalMenu) {
        closeModal();
      }
    });
  }
});
