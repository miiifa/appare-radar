# Appare! レーダー

チェキ会で話すネタを探すための非公式 Appare! ファンサイトです。9人の「好き」を選んで、本人が話した具体的な対象・理由、同じものを楽しむ方法、会話の入り口を一緒に読めます。

公開先: https://miiifa.github.io/appare-radar/

## 毎朝の更新

`.github/workflows/daily-update.yml` が毎日 09:00 JST に `scripts/update_site.py` を実行します。公式スケジュールの近日予定と FM FUJI の Appare! 投稿一覧を取得し、`data/updates.js` を置き換え、変更があればコミットして GitHub Pages に公開します。GitHub の定期実行は開始時刻に遅れる場合があります。Actions の `workflow_dispatch` から手動実行もできます。

取得や解析に失敗した日は `data/updates.js` を変更せず、Actions に失敗を表示します。期限の過ぎた予定・期間限定の寄り道は、サイト閲覧時にも日本時間で非表示になります。

ラジオ番組の投稿が止まった場合は、過去の投稿を日付付きで表示します。取得した投稿本文から好みを自動推測しません。メンバーの趣味・本人の言葉・体験の提案は `data/editorial.js` に個別の出典と年月を付けて人が編集します。本人が訪問した場所と、ファン向けに選んだ店を混同しないでください。

## ローカルでの確認

`python scripts/update_site.py` で取得結果を確認できます。Python 3.12 の標準ライブラリだけを使用します。外部サイトへ接続できる環境で実行してください。
