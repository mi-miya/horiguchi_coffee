// ハンバーガーメニューの開閉機能
document.addEventListener('DOMContentLoaded', function() {
  // 商品タイトルの上に「producing area / brand name」を挿入
  const productTitle = document.querySelector('.__secondary .__title');
  if (productTitle) {
    const categoryLabel = document.createElement('div');
    categoryLabel.className = '__category-label';
    categoryLabel.textContent = 'producing area / brand name';
    productTitle.parentNode.insertBefore(categoryLabel, productTitle);
  }

  // カートボタンのテキストを変更
  const cartButton = document.querySelector('.c-button-submit.__js-add-cart');
  if (cartButton) {
    cartButton.textContent = 'カートに追加する';
  }

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

  // アコーディオンメニューの機能（商品詳細ページ用）
  const accordionTable = document.querySelector('.c-table-dl');
  if (accordionTable) {
    const accordionRows = accordionTable.querySelectorAll('tbody tr');

    accordionRows.forEach(function(row) {
      const th = row.querySelector('th');
      const td = row.querySelector('td');

      if (th && td) {
        // thをクリック可能にする
        th.style.cursor = 'pointer';
        th.setAttribute('role', 'button');
        th.setAttribute('aria-expanded', 'false');
        th.setAttribute('tabindex', '0');

        // デフォルトではtdを非表示
        td.style.display = 'none';

        // クリックイベント
        function toggleAccordion() {
          const isExpanded = th.getAttribute('aria-expanded') === 'true';

          if (isExpanded) {
            // 閉じる
            td.style.display = 'none';
            th.setAttribute('aria-expanded', 'false');
            th.classList.remove('accordion-open');
          } else {
            // 開く
            td.style.display = 'block';
            th.setAttribute('aria-expanded', 'true');
            th.classList.add('accordion-open');
          }
        }

        th.addEventListener('click', toggleAccordion);

        // キーボード操作（EnterとSpaceキー）
        th.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        });
      }
    });
  }

  // タブ切り替え機能（FEATURESセクション用）
  window.switchTab = function(button, tabId) {
    // ボタンが属するタブコンテナを取得
    const tabContainer = button.closest('.features-tab-container');
    if (!tabContainer) return;

    // 同じコンテナ内のすべてのタブボタンからactiveクラスを削除
    const buttonsInContainer = tabContainer.querySelectorAll('.features-tab-button');
    buttonsInContainer.forEach(function(btn) {
      btn.classList.remove('active');
    });

    // クリックされたボタンにactiveクラスを追加
    button.classList.add('active');

    // 同じコンテナ内のすべてのタブコンテンツを非表示
    const contentsInContainer = tabContainer.querySelectorAll('.features-tab-content');
    contentsInContainer.forEach(function(content) {
      content.style.display = 'none';
    });

    // 選択されたタブのコンテンツを表示（同じコンテナ内のもののみ）
    const selectedContent = tabContainer.querySelector('#' + tabId);
    if (selectedContent) {
      selectedContent.style.display = 'block';
    }
  };

  // 次のタブに移動する機能
  window.switchToNextTab = function(button, nextTabId) {
    // ボタンが属するタブコンテナを取得
    const tabContainer = button.closest('.features-tab-container');
    if (!tabContainer) return;

    // 指定されたタブIDに対応するタブボタンを探す
    const nextTabButton = tabContainer.querySelector('.features-tab-button[data-tab="' + nextTabId + '"]');
    if (nextTabButton) {
      // 見つかったタブボタンでswitchTabを呼び出す
      switchTab(nextTabButton, nextTabId);
    } else {
      // 次のタブが見つからない場合（最後のタブの場合）、最初のタブに戻る
      const firstTabButton = tabContainer.querySelector('.features-tab-button');
      if (firstTabButton) {
        const firstTabId = firstTabButton.getAttribute('data-tab');
        switchTab(firstTabButton, firstTabId);
      }
    }
  };
});
