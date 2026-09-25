"""Refresh the small source-linked updates panel without editing curated interests."""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "updates.js"
SCHEDULE_URL = "https://appare-official.jp/contents/schedule"
RADIO_URL = "https://fmftp.lekumo.biz/spice/appare/"
NAMES = ("朝比奈れい", "永堀ゆめ", "藤宮めい", "七瀬れあ", "藍井すず", "橋本あみ", "北野あむ", "森川なつ", "坂本りさ")


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
            if match:
                year, month, day = (int(value) for value in match.groups())
                self.day = f"{year:04d}-{month:02d}-{day:02d}"
            else:
                self.day = ""
            self.capture = ""
        elif tag == "h3" and self.capture == "entry":
            name = next((name for name in NAMES if name in self.text), None)
            url = urljoin(RADIO_URL, self.href)
            parsed = urlparse(url)
            if self.day and name and parsed.netloc == "fmftp.lekumo.biz" and re.fullmatch(r"/spice/\d{4}/\d{2}/appare-[a-z0-9]+\.html", parsed.path):
                self.items.append({"date": self.day, "name": name, "url": url})
            self.capture = ""


def fetch(url):
    request = Request(url, headers={"User-Agent": "AppareRadar/1.0 (public fan site; source linked)"})
    with urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8")


def main():
    today = datetime.now(ZoneInfo("Asia/Tokyo")).date().isoformat()
    try:
        schedule = ScheduleParser()
        schedule.feed(fetch(SCHEDULE_URL))
        radio = RadioParser()
        radio.feed(fetch(RADIO_URL))
        if not schedule.items or not radio.items:
            raise ValueError(f"No items found: schedule={len(schedule.items)}, radio={len(radio.items)}")
        events = []
        seen = set()
        for item in sorted(schedule.items, key=lambda item: item["date"]):
            if item["date"] < today or item["href"] in seen:
                continue
            seen.add(item["href"])
            events.append({"date": item["date"], "title": item["title"], "url": urljoin(SCHEDULE_URL, item["href"])})
            if len(events) == 9:
                break
        posts = []
        seen.clear()
        for item in sorted(radio.items, key=lambda item: item["date"], reverse=True):
            if item["url"] in seen or item["date"] > today:
                continue
            seen.add(item["url"])
            posts.append(item)
            if len(posts) == 6:
                break
        if not posts:
            raise ValueError("No dated member posts found")
        contents = {"checked": today, "events": events, "posts": posts}
        output = "// Generated from public official schedule and FM FUJI posts.\nwindow.APPARE_UPDATES = " + json.dumps(contents, ensure_ascii=False, indent=2) + ";\n"
        OUTPUT.write_text(output, encoding="utf-8")
        print(f"Saved {len(events)} events and {len(posts)} posts for {today}")
    except Exception as error:
        print(f"Source refresh failed; keeping the previous verified file: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
