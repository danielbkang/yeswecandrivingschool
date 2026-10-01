import os
from PIL import Image, ImageDraw, ImageFont

# Canvas dimensions (Standard OpenGraph 1200x630)
W, H = 1200, 630
img = Image.new("RGBA", (W, H), (245, 247, 250, 255))
draw = ImageDraw.Draw(img)

# Colors
PRIMARY = (47, 180, 87)          # #2FB457
PRIMARY_DARK = (30, 135, 62)     # #1E873E
PRIMARY_SOFT = (235, 249, 239)   # #EBF9EF
PRIMARY_BORDER = (187, 240, 204) # #BBF0CC
NAVY = (15, 23, 42)              # #0F172A
SLATE = (51, 65, 85)             # #334155
MUTED = (100, 116, 139)          # #64748B
WHITE = (255, 255, 255)
KAKAO = (254, 229, 0)
KAKAO_TEXT = (25, 25, 25)

# Fonts
font_dir = "C:/Windows/Fonts"
font_bold_path = os.path.join(font_dir, "malgunbd.ttf")
font_reg_path = os.path.join(font_dir, "malgun.ttf")

font_badge = ImageFont.truetype(font_bold_path, 21)
font_brand = ImageFont.truetype(font_bold_path, 34)
font_title = ImageFont.truetype(font_bold_path, 44)
font_sub = ImageFont.truetype(font_reg_path, 25)
font_feature_title = ImageFont.truetype(font_bold_path, 22)
font_feature_desc = ImageFont.truetype(font_reg_path, 17)
font_footer = ImageFont.truetype(font_bold_path, 22)
font_url = ImageFont.truetype(font_bold_path, 21)

# Outer Card with clean rounded border
card_m = 28
draw.rounded_rectangle(
    [(card_m, card_m), (W - card_m, H - card_m)],
    radius=20,
    fill=WHITE,
    outline=PRIMARY_BORDER,
    width=2
)

# Top accent line
draw.rounded_rectangle(
    [(card_m, card_m), (W - card_m, card_m + 10)],
    radius=5,
    fill=PRIMARY
)

# Logo Circle and Y mark
cx, cy, r = 100, 115, 42
draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=PRIMARY)

# Draw "Y" shape inside circle
y_pts = [
    (cx - 28, cy - 26),
    (cx - 13, cy - 26),
    (cx, cy + 2),
    (cx + 13, cy - 26),
    (cx + 28, cy - 26),
    (cx + 7, cy + 14),
    (cx + 7, cy + 28),
    (cx - 7, cy + 28),
    (cx - 7, cy + 14),
]
draw.polygon(y_pts, fill=WHITE)

# Brand Name
draw.text((160, 88), "Yes We Can Driving School", fill=NAVY, font=font_brand)

# Badge next to logo
badge_x, badge_y = 160, 134
badge_text = "ICBC 공인 전문 운전연수 • 코퀴틀람 & 트라이시티"
bbox = font_badge.getbbox(badge_text)
bw = bbox[2] - bbox[0] + 24
bh = bbox[3] - bbox[1] + 12
draw.rounded_rectangle(
    [(badge_x, badge_y), (badge_x + bw, badge_y + bh)],
    radius=14,
    fill=PRIMARY_SOFT,
    outline=PRIMARY_BORDER,
    width=1
)
draw.text((badge_x + 12, badge_y + 4), badge_text, fill=PRIMARY_DARK, font=font_badge)

# Main Headline
main_title = "합격의 순간까지, 가장 안전하고 편안한 1:1 맞춤 운전"
draw.text((65, 214), main_title, fill=NAVY, font=font_title)

# Subtitle
sub_text = "포트 코퀴틀람 ICBC 도로주행 시험 완벽 대비 | 안전 보조 브레이크 차량 | 한국어·영어 친절 지도"
draw.text((67, 280), sub_text, fill=SLATE, font=font_sub)

# 3 Feature Cards (No emojis to ensure crisp native font rendering)
features = [
    ("안전 보조 브레이크", "초보자도 안심하는 1:1 방어운전 집중 교육"),
    ("포트 코퀴틀람 ICBC", "실제 시험 코스 주요 교차로 완전 정복"),
    ("100% 한/영 바이링구얼", "언어 장벽 없는 친절하고 편안한 코칭"),
]

pill_y = 345
pill_w = 340
pill_h = 112

for i, (title, desc) in enumerate(features):
    px = 65 + i * 365
    draw.rounded_rectangle(
        [(px, pill_y), (px + pill_w, pill_y + pill_h)],
        radius=14,
        fill=(248, 250, 252),
        outline=(226, 232, 240),
        width=1
    )
    # Check bullet mark
    draw.ellipse([(px + 18, pill_y + 20), (px + 36, pill_y + 38)], fill=PRIMARY_SOFT, outline=PRIMARY_BORDER)
    draw.text((px + 23, pill_y + 19), "v", fill=PRIMARY_DARK, font=font_feature_title)
    draw.text((px + 46, pill_y + 18), title, fill=PRIMARY_DARK, font=font_feature_title)
    draw.text((px + 20, pill_y + 60), desc, fill=MUTED, font=font_feature_desc)

# Bottom Contact Bar
bar_y = 485
bar_h = 76
draw.rounded_rectangle(
    [(65, bar_y), (W - 65, bar_y + bar_h)],
    radius=16,
    fill=PRIMARY_SOFT,
    outline=PRIMARY_BORDER,
    width=1
)

# Phone Tag
draw.text((90, bar_y + 24), "전화 상담: +1 604-816-7070", fill=NAVY, font=font_footer)

# Kakao Tag Pill
draw.rounded_rectangle(
    [(490, bar_y + 14), (810, bar_y + bar_h - 14)],
    radius=18,
    fill=KAKAO
)
draw.text((512, bar_y + 24), "카카오톡 1:1 오픈채팅", fill=KAKAO_TEXT, font=font_footer)

# Web URL
draw.text((845, bar_y + 26), "yeswecandrivingschool.ca", fill=PRIMARY_DARK, font=font_url)

# Output directory
out_dir = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "og-image.png")

# Save as optimized PNG
img_rgb = img.convert("RGB")
img_rgb.save(out_path, "PNG", optimize=True)
print(f"Refined OG Image saved: {out_path} ({os.path.getsize(out_path)} bytes)")
