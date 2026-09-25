// Every statement here has an individual source. Older interviews are dated on screen.
// A suggested outing is never presented as a place the member visited.
const interest = (kind, title, note, date, source, activity, activityUrl, activityLabel, relation, question, until = '', moreText = '', moreUrl = '', moreLabel = '') => ({
  kind, title, note, date, source, activity, activityUrl, activityLabel, relation, question, until, moreText, moreUrl, moreLabel
});

window.APPARE_MEMBERS = [
  {
    id: 'rei', name: '朝比奈れい', nickname: 'れいちむ', color: '#ed5267', initial: 'れ',
    lead: '映画を観て、ドライブして、おいしいものを食べる。ラーメンは「重たい」タイプが好み。',
    interests: [
      interest('食べる', '重たいラーメン', '文化放送で濃厚なラーメンを特に好きと話した。別の投稿では、名前を明かしていないお気に入りの店へ七瀬れあを連れて行った。', '本人の発言 · 2023/12・2025/9', 'https://www.joqr.co.jp/qr/article/109046/', '自分の好きな濃厚系の一杯を食べてみる。本人のお気に入りの店名は公表されていない。', 'https://fmftp.lekumo.biz/spice/2025/09/appare-43c8.html', '七瀬と行った話', '同じ好みから試す', 'こってり系なら、最近の推しの一杯は？'),
      interest('観る', '映画鑑賞', '公式プロフィールに挙げている趣味。好きな映画のタイトルやジャンルまで確認できる資料は見つかっていない。', '公式プロフィール · 現在', 'https://appare-official.jp/profiles', '自分が最近観てよかった映画を一本用意して、感想から話してみる。', 'https://appare-official.jp/profiles', '趣味の出典', '好きからの提案', '最近観て「これはよかった！」と思った映画は？'),
      interest('出かける', 'ドライブとわんちゃん', '公式の趣味は「車を運転すること、わんちゃん」。好きなドライブコースや犬種まではプロフィールに載っていない。', '公式プロフィール · 現在', 'https://appare-official.jp/profiles', '海辺のドライブ先を自分で探してみる。三浦の城ヶ島は散策案内があるが、本人のドライブ先として紹介されたわけではない。', 'https://www.city.miura.kanagawa.jp/soshiki/kankoshokoka/kankoshokoka_kanko/hikingdrive/7401.html', '三浦市の散策案内', '趣味からの提案', '運転していて好きな景色は？')
    ]
  },
  {
    id: 'yume', name: '永堀ゆめ', nickname: 'ゆめめ', color: '#36bfa4', initial: 'ゆ',
    lead: '「シルバニアの赤ちゃん」が特に好き。ジブリや季節の曲にも、本人の言葉がある。',
    interests: [
      interest('もの', 'シルバニアファミリーの赤ちゃん', 'プロフィールの「シルバニア」より具体的に、赤ちゃんのかわいさと握ったときの手触りが好きと話している。', '本人の発言 · 2023/10', 'https://www.joqr.co.jp/qr/article/104984/', '東京ソラマチの公式イベントで赤ちゃんの展示・グッズを見てみる。本人の訪問情報はない。', 'https://morino-ouchi.jp/news/popup/wakuwakufesta-solamachi2026.html', '催事の案内', '好きからの提案', 'いま一番気に入っている赤ちゃんは？', '2026-10-12'),
      interest('観る', '『耳をすませば』', '「一番好きな作品」と紹介し、挿入歌「カントリー・ロード」をラジオで選曲。どの場面が一番かまでは語っていない。', '本人の発言 · 2026/6', 'https://fmftp.lekumo.biz/spice/2026/06/appare-fe41.html', '4K版の映画館上映は10/23〜11/12。本人の好きな作品をスクリーンで観る機会。', 'https://www.ghibli.jp/info/015304/', '上映の公式案内', '本人が好きな作品', '『耳をすませば』で心に残っている場面は？', '2026-11-12', '聖蹟桜ヶ丘には作品ゆかりの街歩きマップもある。本人が訪れた場所ではない。', 'https://seiseki.tokyo/seiseki_map.html', '街歩きマップ'),
      interest('食べる', 'チーズ炙りサーモン握り', 'シルバニアと並んで本人が挙げた好きな食べ物。特定のお店や商品は紹介していない。', '本人の発言 · 2023/10', 'https://www.joqr.co.jp/qr/article/104984/', '回転寿司などで同じネタを食べてみる。店名はあなたの行きやすい所から。', 'https://www.joqr.co.jp/qr/article/104984/', '好きの出典', '好きからの提案', 'チーズ炙りサーモン、どこが一番好き？'),
      interest('聴く', '春の曲と街の桜', '春が一番好きな季節と話し、街でふと見つける桜に触れて松任谷由実「春よ、来い」を選曲。', '本人の発言 · 2026/4', 'https://fmftp.lekumo.biz/spice/2026/04/appare-fe41.html', '曲を聴いて季節の景色を探す。季節が違うときは投稿を読むだけでも。', 'https://fmftp.lekumo.biz/spice/2026/04/appare-fe41.html', '選曲した投稿', '本人が選曲', '春の景色で好きなところは？')
    ]
  },
  {
    id: 'mei', name: '藤宮めい', nickname: 'めいぽむ', color: '#a9a6bb', initial: 'め',
    lead: '「食べること」の中身は桜味。作品ならハチワレや『コナン』の好きなキャラも明言。',
    interests: [
      interest('食べる', '桜味と桜ラテ', '橋本あみと見つけた桜味の商品を報告し合う。桜ラテの魅力を広めたいとも書いている。', '本人の投稿 · 2026/3', 'https://fmftp.lekumo.biz/spice/2026/03/appare-2404.html', 'サクラカフェ日暮里のメニューには桜ラテがある。本人たちが行った店ではないので提供状況を確認。', 'https://www.sakura-cafe.asia/nippori/menu/', 'お店のメニュー', '好きからの店の提案', '今年おいしかった桜味はあった？'),
      interest('もの', 'ちいかわのハチワレ', '2023年の本人インタビューでは、ちいかわの中でもハチワレが特に好きで、グッズをたくさん持っていると話した。', '本人の発言 · 2023/10', 'https://www.joqr.co.jp/qr/article/104980/', '公式のちいかわマーケットでハチワレのグッズを見てみる。現在の一番の推しかは本人に確認を。', 'https://chiikawamarket.jp/', '公式ショップ', '好きからの提案', 'いまもハチワレのグッズ集めてる？'),
      interest('観る', '『名探偵コナン』の松田陣平・灰原哀', '七瀬れあとコナンの話をした投稿で、松田陣平を推し、灰原哀も好きと明言。好きな理由までは記されていない。', '本人の投稿 · 2026/4', 'https://fmftp.lekumo.biz/spice/2026/04/appare-2404.html', 'キャラクターが登場する作品を観て、自分の好きな場面を持って行く。', 'https://fmftp.lekumo.biz/spice/2026/04/appare-2404.html', '本人の投稿', '本人が言及した作品', '松田陣平のどんなところが好き？'),
      interest('聴く', 'AAA「ぼくの憂鬱と不機嫌な彼女」', '昔よく聴いていたAAAの曲がSNSで流れてきて、懐かしくなって再び聴いていると紹介。', '本人の投稿 · 2026/3', 'https://fmftp.lekumo.biz/spice/2026/03/appare-2404.html', '曲を聴いてから投稿を読む。自分が懐かしくなる曲も一つ考えておく。', 'https://avex.jp/aaa/discography/detail.php?id=1009601', '楽曲の案内', '本人が選曲', '久しぶりに聴いて懐かしくなった曲、ほかにもある？')
    ]
  },
  {
    id: 'rea', name: '七瀬れあ', nickname: 'れあたん', color: '#efbc37', initial: 'れ',
    lead: '選ぶ音楽に「ここが好き」がある。乃木坂46もMerry BAD TUNE.も、理由まで追える。',
    interests: [
      interest('聴く', '乃木坂46「帰り道は遠回りしたくなる」', 'Dメロから落ちサビが好き。生誕祭のカバー候補でもあったと本人が話している。', '本人の投稿 · 2026/9', 'https://fmftp.lekumo.biz/spice/2026/09/appare-dc00.html', '一曲通して聴き、本人が挙げたDメロから落ちサビを意識してみる。', 'https://fmftp.lekumo.biz/spice/2026/09/appare-dc00.html', '選曲した投稿', '本人が選曲', 'あの曲をカバー候補にしたとき、何が決め手だった？'),
      interest('聴く', 'Merry BAD TUNE.「86 SUMMER FILM」', '好きだった日南りとの卒業公演でこの曲を聴き、自分の思いを重ねて涙が出たと書いた。アイドルのステージへの思いも詳しい。', '本人の投稿 · 2026/8', 'https://fmftp.lekumo.biz/spice/2026/08/appare-dc00.html', '曲と本人の文章に触れる。重い話になりそうなら、まず自分の感想から。', 'https://fmftp.lekumo.biz/spice/2026/08/appare-dc00.html', '選曲した投稿', '本人が選曲', '「86 SUMMER FILM」のどんなところが心に残る？'),
      interest('観る', '劇場版『名探偵コナン』とMISIA', '2026年の劇場版を観て、主題歌「ラストダンスあなたと」が映画の余韻をまとめるように響いたと紹介。', '本人の投稿 · 2026/5', 'https://fmftp.lekumo.biz/spice/2026/05/appare-dc00.html', '映画か主題歌を楽しんで感想を持って行く。上映・配信の状況は公式で確認。', 'https://www.misia.jp/musiclist/17580', '主題歌の公式情報', '本人が観た作品', 'あの主題歌は、誰の視点の歌に感じた？'),
      interest('食べる', 'チョコレートと牛乳', '文化放送では、食事のシメや間食にチョコを食べ、牛乳と合わせるのが好きと話した。', '本人の発言 · 2023/12', 'https://www.joqr.co.jp/qr/article/109043/', '自分の好きなチョコを牛乳と一緒に味わう。銘柄までは本人の指定なし。', 'https://www.joqr.co.jp/qr/article/109043/', '好きの出典', '好きからの提案', '牛乳と合わせるならどんなチョコが好き？')
    ]
  },
  {
    id: 'suzu', name: '藍井すず', nickname: 'すずぽん', color: '#518bde', initial: 'す',
    lead: 'ただ「音楽好き」ではなく、作詞・作曲や編曲の音まで意識して聴く。',
    interests: [
      interest('聴く', '夢限大みゅーたいぷ「これはぼくたちの生存のあらすじ」', '田淵智也のまっすぐな歌詞・曲が好きで何度も聴く。堀江晶太の編曲にも触れている。', '本人の投稿 · 2026/8', 'https://fmftp.lekumo.biz/spice/2026/08/appare-c4c7.html', '配信先で曲を聴き、歌詞と編曲で気になったところを一つ見つける。', 'https://bushiroad-music.com/musics/oursurvival/', '楽曲の公式情報', '本人が選曲', 'この曲で、歌詞と編曲のどっちを最初に聴いた？'),
      interest('聴く', 'VOLTACTION「Watercolor」', 'Novelbrightの沖聡次郎が提供した曲。バンドの特色が楽曲に現れるところを好きだと話している。', '本人の投稿 · 2026/4', 'https://fmftp.lekumo.biz/spice/2026/04/appare-c4c7.html', '「Watercolor」を聴いて、提供者の音らしさを自分なりに探す。', 'https://fmftp.lekumo.biz/spice/2026/04/appare-c4c7.html', '選曲した投稿', '本人が選曲', '「Watercolor」のどこにNovelbrightらしさを感じた？'),
      interest('過ごす', '休みの前夜とメンバー', '2023年の文化放送では、休みの前夜に夜更かしする時間とAppare!のメンバー全員が好きと話した。', '本人の発言 · 2023/10', 'https://www.joqr.co.jp/qr/article/104976/', 'ラジオ投稿を読み、最近の過ごし方に変化があるかを尋ねてみる。', 'https://www.joqr.co.jp/qr/article/104976/', '当時の本人の言葉', '本人が発言', '休みの前夜、最近はどう過ごすのが好き？')
    ]
  },
  {
    id: 'ami', name: '橋本あみ', nickname: 'あみち', color: '#e984b4', initial: 'あ',
    lead: '音楽は＝LOVE。桜味は藤宮めいと報告し合う仲で、ピンクは「運命の色」。',
    interests: [
      interest('聴く', '＝LOVE「モラトリアム」', '本人のラジオ投稿で選曲し、＝LOVEが大好きと改めて書いている。', '本人の投稿 · 2026/5', 'https://fmftp.lekumo.biz/spice/2026/05/appare-c4d6.html', 'MVを観る。撮影に使われた白金台のStellatoへ行くなら営業案内も確認。本人が訪れた店ではない。', 'https://www.global-dining.com/news/2026/03/25/1652/', 'MVロケ地の発表', '好きな曲のロケ地', '「モラトリアム」の好きな場面は？'),
      interest('食べる', '桜味の商品', '藤宮めいと「これあったよ」と報告し合うほど、二人とも桜味が好き。', '本人たちの投稿 · 2026/3', 'https://fmftp.lekumo.biz/spice/2026/03/appare-2404.html', '桜味の商品を見つけて食べてみる。店や商品を本人が推薦したという意味ではない。', 'https://fmftp.lekumo.biz/spice/2026/03/appare-2404.html', '二人の話', '好きからの提案', '今年めいちゃんと報告し合った桜味、何がよかった？'),
      interest('もの', 'ピンク色', '2023年には、何か選ぶときにピンクを選びがちで、メンバーカラーの桃色を「運命の色」と話した。', '本人の発言 · 2023/12', 'https://www.joqr.co.jp/qr/article/109048/', '自分の持ち物に桃色を一つ取り入れてみる。特定の製品を本人が使ったという情報ではない。', 'https://www.joqr.co.jp/qr/article/109048/', '好きの出典', '好きからの提案', '最近買ったピンクのもの、何かある？'),
      interest('食べる', 'ピノ・クーリッシュ・チョコミント・パピコ', '2025年の文化放送の「好きなアイス」への回答。四つを挙げたという記録で、現在の順位は不明。', '番組での発言 · 2025/9', 'https://www.joqr.co.jp/ic/article/159568/', '気になるアイスを自分で試して、どれが好みか話してみる。', 'https://www.joqr.co.jp/ic/article/159568/', '番組レポート', '本人が挙げた商品', '今いちばん食べたいアイスはどれ？')
    ]
  },
  {
    id: 'amu', name: '北野あむ', nickname: 'あむあむ', color: '#9c72cf', initial: 'あ',
    lead: '『ハイキュー!!』は自身のバレー部時代と重なる作品。ネイルも色と質感を選んでいる。',
    interests: [
      interest('観る', '『ハイキュー!!』とスキマスイッチ「Ah! yeah!」', '学生時代はバレー部で、アニメも大好き。主題歌を聴くと当時を思い出すと書き、すずも作品が好きなので選曲した。', '本人の投稿 · 2026/4', 'https://fmftp.lekumo.biz/spice/2026/04/appare-e909.html', '作品や主題歌に触れて、自分の好きな試合やシーンを一つ考える。', 'https://fmftp.lekumo.biz/spice/2026/04/appare-e909.html', '選曲した投稿', '本人が好きな作品', '『ハイキュー!!』で一番好きな試合は？'),
      interest('もの', '紫のマグネットネイル', '生誕祭に合わせて紫に。パーツが多いものだけでなく、シンプルで短いネイルもかわいいと話した。', '本人の投稿 · 2026/9', 'https://fmftp.lekumo.biz/spice/2026/09/appare-80e4.html', '紫のマグネットネイルを見て質感の違いを楽しむ。似た色の製品は本人の使用銘柄ではない。', 'https://shop-cosmedebeaute.com/collections/gmgby-gm/products/gmg3-ec03', '色味の参考商品', '好みからの参考', '生誕祭のネイル、どんなイメージで決めた？'),
      interest('食べる・出かける', '甘いものとドライブ', '公式プロフィールで挙げる二つの趣味。好きなスイーツの店名やドライブコースは今のところ確認できていない。', '公式プロフィール · 現在', 'https://appare-official.jp/profiles', '自分の好きな甘いものを一つ見つけて、話のきっかけにする。', 'https://appare-official.jp/profiles', '趣味の出典', '好きからの提案', '最近食べておいしかった甘いものは？')
    ]
  },
  {
    id: 'natsu', name: '森川なつ', nickname: 'なちゅ', color: '#e99752', initial: 'な',
    lead: 'プロフィールは岩盤浴と食べること。ラジオでは、幼い頃からのロックの好きが具体的。',
    interests: [
      interest('聴く', 'Janne Da Arc「feel the wind」', '物心がついた頃から聴く大好きな曲。紹介記事を書いているときも流していたと本人が記した。', '本人の投稿 · 2026/3', 'https://fmftp.lekumo.biz/spice/2026/03/appare-755e.html', '曲を聴いて、好きなフレーズを一つ見つける。', 'https://www.youtube.com/watch?v=Bd7xGUCrPCs', '公式動画', '本人が選曲', '小さい頃から聴いている曲、ほかにもある？'),
      interest('聴く', 'ONE OK ROCK「完全感覚Dreamer」', 'ラジオで選曲し、その日の朝にも聴いたと投稿。昔からの音楽の好みとあわせて追える。', '本人の投稿 · 2026/6', 'https://fmftp.lekumo.biz/spice/2026/06/appare-755e.html', 'この曲を聴き、どこで気分が上がるか自分なりに考える。', 'https://fmftp.lekumo.biz/spice/2026/06/appare-755e.html', '選曲した投稿', '本人が選曲', '朝に聴きたい曲、ほかには何がある？'),
      interest('出かける', '岩盤浴', '公式プロフィールに明記。具体的な施設や本人の訪問先は確認できていない。', '公式プロフィール · 現在', 'https://appare-official.jp/profiles', '岩盤浴を体験してみる。たとえばスパ ラクーアは岩盤浴エリアを設けているが、本人が行った場所ではない。利用条件を確認。', 'https://www.laqua.jp/spa/information/', '施設の利用案内', '趣味からの提案', '岩盤浴ではどんなふうに過ごすのが好き？')
    ]
  },
  {
    id: 'risa', name: '坂本りさ', nickname: 'りーちゃん', color: '#62b8d9', initial: 'り',
    lead: '「パン好き」の中でも、塩パンのじゅわっとした食感が好き。そうめんのアレンジにも興味。',
    interests: [
      interest('食べる', 'じゅわっとした塩パン', '最近ハマったパンの中でも塩パンが好きで、理想の一個を探している。ファンにもおすすめを聞きたいと書いた。', '本人の投稿 · 2026/9', 'https://fmftp.lekumo.biz/spice/2026/09/appare-aa8d.html', '本所吾妻橋の塩パン専門店で自分の好みを探す。本人が訪れた店という情報ではない。', 'https://azumabashi.net/%E5%A1%A9%E3%83%91%E3%83%B3%E5%B1%8B-%E3%80%80%E3%83%91%E3%83%B3%E3%83%BB%E3%83%A1%E3%82%BE%E3%83%B3/', '商店会の店案内', '好きからの店の提案', '理想の塩パン、もう見つかった？ 私は〇〇のが好きだったよ'),
      interest('食べる', 'そうめんのアレンジ', 'ノーマルも好きだが、さまざまなアレンジを試したいと投稿。具体的な具材までは書かれていない。', '本人の投稿 · 2026/6', 'https://fmftp.lekumo.biz/spice/2026/06/appare-aa8d.html', '家で自分のそうめんアレンジを試して感想を用意する。', 'https://fmftp.lekumo.biz/spice/2026/06/appare-aa8d.html', '本人の投稿', '好きからの提案', '最近試しておいしかったそうめんアレンジは？'),
      interest('過ごす', 'サウナと料理', 'どちらも公式プロフィールの趣味。好みの施設や得意料理は公式プロフィールだけでは特定できない。', '公式プロフィール · 現在', 'https://appare-official.jp/profiles', '自分の好きな料理やサウナの入り方を話題にしてみる。', 'https://appare-official.jp/profiles', '趣味の出典', '好きからの提案', '最近作っておいしかった料理は？')
    ]
  }
];
