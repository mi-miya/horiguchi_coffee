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

  // ページトップボタンの機能
  const pageTopBtn = document.getElementById('page-top-btn');
  const footer = document.querySelector('footer');

  // スムーズスクロールの設定（CSS側にも設定）
  if (pageTopBtn) {
    // CSSでのスムーズスクロール設定
    document.documentElement.style.scrollBehavior = 'smooth';

    // ページトップボタンのクリックイベント
    pageTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // スクロール位置を監視してボタンの表示/非表示を制御
    function togglePageTopButton() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // スクロール位置がゼロの場合は非表示
      if (scrollTop === 0) {
        pageTopBtn.classList.remove('active');
        return;
      }

      // footerの位置を取得
      if (footer) {
        const footerTop = footer.offsetTop;
        const footerHeight = footer.offsetHeight;
        const scrollBottom = scrollTop + windowHeight;

        // footerの大部分が見えるようになってから非表示（footerの高さの80%が見えるまで表示）
        if (scrollBottom >= footerTop + footerHeight * 0.8) {
          pageTopBtn.classList.remove('active');
          return;
        }
      }

      // 通常のスクロール中は表示
      pageTopBtn.classList.add('active');
    }

    // スクロールイベントでボタンの表示/非表示を制御
    window.addEventListener('scroll', togglePageTopButton);

    // 初回読み込み時にもチェック
    togglePageTopButton();
  }
});
