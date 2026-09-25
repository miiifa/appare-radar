"""Refresh the source-linked schedule and radio-post cards on the static site."""

from __future__ import annotations

import html
import re
import sys
from datetime import date, datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "index.html"
SCHEDULE_URL = "https://appare-official.jp/contents/schedule"
RADIO_URL = "https://fmftp.lekumo.biz/spice/appare/"
NAMES = ("朝比奈れい", "永堀ゆめ", "藤宮めい", "七瀬れあ", "藍井すず", "橋本あみ", "北野あむ", "森川なつ", "坂本りさ")
WEEKDAYS = "月火水木金土日"
# Short prompts are editorial notes written after reading these exact posts.
# Posts absent from this list receive a neutral prompt and their original link.
POST_TOPICS = {
    "/spice/2026/09/appare-c4c7.html": ("ラジオ卒業を前に、印象に残った放送を振り返る。", "Mスパで一番思い出に残ってる話は？"),
    "/spice/2026/09/appare-dc00.html": ("乃木坂46の一曲を選曲。", "『帰り道は遠回りしたくなる』のどこが好き？"),
    "/spice/2026/09/appare-aa8d.html": ("塩パンに夢中。", "最高の塩パン、見つかった？"),
    "/spice/2026/09/appare-80e4.html": ("生誕祭に合わせた紫のネイル。", "あの色、どうやって決めたの？"),
    "/spice/2026/08/appare-c4c7.html": ("夢限大みゅーたいぷの曲を紹介。", "この曲でとくに好きなところは？"),
    "/spice/2026/08/appare-fe41.html": ("椎名林檎の曲を紹介。", "今年の夏に聴きたくなった曲は？"),
    "/spice/2026/08/appare-755e.html": ("ツアーファイナルと生誕祭を振り返る。", "あの日のステージで印象に残った場面は？"),
    "/spice/2026/08/appare-dc00.html": ("Merry BAD TUNE.の曲を選曲。", "『86 SUMMER FILM』で心に残ったところは？"),
    "/spice/2026/07/appare-aa8d.html": ("夏にやりたいことを語る。", "今年の夏、やってみたかったことは？"),
    "/spice/2026/07/appare-c4d6.html": ("夏に聴くYUIの話。", "夏の定番曲、何が好き？"),
}


class ScheduleParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = []
        self.depth = 0
        self.current = None
        self.title_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        if tag == "li" and "contents-list-item" in classes and not self.depth:
            self.current = {"href": "", "date": "", "title": ""}
            self.depth = 1
        elif self.depth:
            self.depth += 1
            if tag == "a":
                self.current["href"] = attrs.get("href", "")
            elif tag == "time":
                self.current["date"] = attrs.get("datetime", "")
            elif tag == "h3" and "contents-list-title" in classes:
                self.title_depth = self.depth

    def handle_data(self, data):
        if self.current is not None and self.title_depth:
            self.current["title"] += data

    def handle_endtag(self, tag):
        if not self.depth:
            return
        if self.depth == self.title_depth:
            self.title_depth = 0
        self.depth -= 1
        if not self.depth:
            item = self.current
            if item and re.fullmatch(r"/contents/\d+", item["href"]) and re.fullmatch(r"\d{4}-\d\d-\d\d", item["date"]) and item["title"].strip():
                item["title"] = " ".join(item["title"].split())
                self.items.append(item)
            self.current = None


class RadioParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = []
        self.day = ""
        self.capture = ""
        self.text = ""
        self.href = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        if tag == "h2" and "date-header" in classes:
            self.capture, self.text = "day", ""
        elif tag == "h3" and "entry-header" in classes:
            self.capture, self.text, self.href = "entry", "", ""
        elif tag == "a" and self.capture == "entry":
            self.href = attrs.get("href", "")

    def handle_data(self, data):
        if self.capture:
            self.text += data

    def handle_endtag(self, tag):
        if tag == "h2" and self.capture == "day":
            match = re.search(r"(\d{4})年\s*(\d+)月\s*(\d+)日", self.text)
            self.day = date(*(int(v) for v in match.groups())).isoformat() if match else ""
            self.capture = ""
        elif tag == "h3" and self.capture == "entry":
            name = next((n for n in NAMES if n in self.text), None)
            url = urljoin(RADIO_URL, self.href)
            parsed = urlparse(url)
            if self.day and name and parsed.netloc == "fmftp.lekumo.biz" and re.fullmatch(r"/spice/\d{4}/\d{2}/appare-[a-z0-9]+\.html", parsed.path):
                self.items.append({"date": self.day, "name": name, "href": url})
            self.capture = ""


def fetch(url):
    request = Request(url, headers={"User-Agent": "AppareRadar/1.0 (public fan site; source linked)"})
    with urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8")


def safe(value):
    return html.escape(value, quote=True)


def short_date(value):
    d = date.fromisoformat(value)
    return f"{d.month}/{d.day} {WEEKDAYS[d.weekday()]}"


def render_events(items, today):
    seen = set()
    cards = []
    for item in sorted(items, key=lambda x: x["date"]):
        if item["date"] < today.isoformat() or item["href"] in seen:
            continue
        seen.add(item["href"])
        d = safe(item["date"])
        title = safe(item["title"])
        url = safe(urljoin(SCHEDULE_URL, item["href"]))
        cards.append(f'<article class="card" data-until="{d}"><time datetime="{d}">{short_date(d)}</time><h3>{title}</h3><p>会場・時間・特典会の参加方法は公式案内を確認してね。ライブや次のチェキで話したい出来事の入口に。</p><a href="{url}" target="_blank" rel="noopener noreferrer">公式の詳細を見る ↗</a></article>')
        if len(cards) == 9:
            break
    if not items:
        raise ValueError("公式予定の解析結果が空です")
    body = "".join(cards) if cards else '<p class="trip-empty">現在、公式の近日予定は掲載されていません。公式スケジュールをご確認ください。</p>'
    return f'<!-- AUTO_EVENTS_START --><div class="grid" id="official-events">{body}</div><!-- AUTO_EVENTS_END -->'


def render_posts(items, today):
    if not items:
        raise ValueError("ラジオ投稿の解析結果が空です")
    seen = set()
    cards = []
    for item in sorted(items, key=lambda x: x["date"], reverse=True):
        if item["href"] in seen or item["date"] > today.isoformat():
            continue
        seen.add(item["href"])
        d, name, url = safe(item["date"]), safe(item["name"]), safe(item["href"])
        topic = POST_TOPICS.get(urlparse(item["href"]).path)
        prompt = f'{safe(topic[0])} チェキでは「{safe(topic[1])}」' if topic else '元の投稿を読んで、気になった話題を一つ選ぼう。チェキでは「この話、もう少し聞きたい！」から。'
        cards.append(f'<article class="card"><time datetime="{d}">{short_date(d)} 投稿</time><h3>{name}のラジオ投稿</h3><p>{prompt}</p><a href="{url}" target="_blank" rel="noopener noreferrer">本人の投稿を読む ↗</a></article>')
        if len(cards) == 6:
            break
    if not cards:
        raise ValueError("過去のラジオ投稿がありません")
    last_day = max(item["date"] for item in items)
    age = (today - date.fromisoformat(last_day)).days
    status = "新しい投稿がない期間は、過去の投稿を日付付きで掲載しています。" if age > 21 else "投稿ごとの日付を確認してから話題にしてね。"
    return f'<!-- AUTO_POSTS_START --><p class="source-note">ラジオ投稿の最終掲載日：<time datetime="{safe(last_day)}">{short_date(last_day)}</time>。{status}</p><div class="grid" id="recent-posts">{"".join(cards)}</div><!-- AUTO_POSTS_END -->'


def replace_block(source, marker, replacement):
    pattern = rf"<!-- AUTO_{marker}_START -->.*?<!-- AUTO_{marker}_END -->"
    result, count = re.subn(pattern, lambda _: replacement, source, count=1, flags=re.S)
    if count != 1:
        raise ValueError(f"サイトの AUTO_{marker} 範囲が見つかりません")
    return result


def main():
    today = datetime.now(ZoneInfo("Asia/Tokyo")).date()
    source = SITE.read_text(encoding="utf-8")
    changed = []
    errors = []
    for marker, url, parser_type, renderer in (
        ("EVENTS", SCHEDULE_URL, ScheduleParser, render_events),
        ("POSTS", RADIO_URL, RadioParser, render_posts),
    ):
        try:
            parser = parser_type()
            parser.feed(fetch(url))
            source = replace_block(source, marker, renderer(parser.items, today))
            changed.append(marker)
            print(f"{marker}: {len(parser.items)} entries parsed")
        except Exception as error:
            errors.append(f"{marker}: {error}")
            print(f"{marker}: source unavailable; retaining last verified cards: {error}", file=sys.stderr)
    if changed:
        SITE.write_text(source, encoding="utf-8")
    if errors:
        print("; ".join(errors), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
