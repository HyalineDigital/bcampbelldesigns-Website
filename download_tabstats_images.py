#!/usr/bin/env python3
"""
Script to download all Tabstats Dashboard images from Squarespace CDN to local storage
"""

import os
import requests
from pathlib import Path
from urllib.parse import urlparse
import re

OUTPUT_DIR = Path("public/images/projects/tabstats")
DESIGN_SYSTEM_DIR = OUTPUT_DIR / "design-system"

# All image URLs from project.html
IMAGES = {
    "oldVersion": "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/8bc0d54c-c7e3-4ec4-a1f6-9936c205eeb6/r6_intro.png",
    "detailed": [
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/e0fa28b8-c721-4605-b437-d2bd9dbf241d/Home+-+No+Ads.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/80d26d03-4187-4161-805e-cc60d3c0d0de/Favorites.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/9a00bc35-4c0a-4084-be7c-0dc2efe0bcb0/Match+View+-+Overview.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/c7660d66-61d1-4536-b295-8eaa738c0d2e/Match+View+-+Timeline.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/a2da5683-57ef-462e-bd9d-bbe2f581c4f5/In-Game+-+Advanced+Scoreboard.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/2b4233e9-f29a-4cb4-8bc0-263ac8705b80/Player+Not+Found.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/44f179c5-d825-4da2-8a7a-ba43ddc09ebe/In-Game+-+Player+Stats.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/894dc890-a709-43dd-9f0e-276b4705b4ce/In-Game+-+Cheaters+Detected.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/45cce174-a9a7-4006-9faf-72b2e48501b7/Main+Menu+-+Matchmaking.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/25275c36-4c8c-483a-89bd-d04311fd9079/Spectate+Mode+-+Post+Round.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/594ede11-1282-4390-ae68-efd7202ecde2/Companion+App.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/2a2480fc-2424-452e-a22f-c3607d7cb26d/Companion+App-1.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/af850ddd-3d4d-45f0-bafa-7e4fc03dab4b/Companion+App-2.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/c3dbafe4-9210-4518-b60a-20973dc44355/Companion+App-3.png"
    ],
    "designSystem": [
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/644ee72c-4301-46e1-9f16-2dc8065e7f7f/Damage+Report.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/aed1aa5b-d90e-42ba-9f2c-65194fe0a622/General.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/54dae1bb-b98b-4cb5-92d1-446649b7931a/Match+Details.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/1ed0695e-c369-4dac-b13b-54760d30e56d/Match+View.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/19819f80-1cf4-4646-85d6-d1bc8da09ed8/Profile.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/8018f7f8-40d2-49ca-85fc-15f3ae0f36d3/Scoreboard.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/22a91ccb-3646-44e3-a7e0-ecb79d36eedc/Search.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/34e05837-67e7-45c6-bf45-ca0aa295072b/Settings.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/1fc5a542-fdd9-425a-a66b-f502c33c5610/Table+Items.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/54166d13-d3e0-42a8-8ede-7d221480d56d/Application+Frame.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/43535ef3-e70a-4107-8f8a-a46fb6f88a95/No+Recent+Searches.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/7e3209a3-f0cc-4035-b756-9d78ca2a2529/Profile+Switch.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/5133152f-6ec8-4c48-ae8e-788f013a90b7/Profile+Switch-1.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/2a70c0d2-ceca-491a-87d5-a4b48147f4a5/Recent+Searches.png",
        "https://images.squarespace-cdn.com/content/v1/6274d644bcaad930540f2409/98228ade-0cf9-4eef-bc53-e55fcd700f69/Search+Results.png"
    ]
}

def slugify_filename(url):
    """Extract and slugify filename from URL."""
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    # Decode URL encoding
    from urllib.parse import unquote
    filename = unquote(filename)
    # Replace spaces and special chars with hyphens
    filename = re.sub(r'[^\w\s-]', '', filename)
    filename = re.sub(r'[-\s]+', '-', filename)
    filename = filename.lower()
    return filename

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        print(f"Downloading: {os.path.basename(filepath)}...")
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        
        # Determine file extension from content type or URL
        ext = os.path.splitext(urlparse(url).path)[1]
        if not ext or ext not in ['.jpg', '.jpeg', '.png', '.webp']:
            content_type = response.headers.get('content-type', '')
            if 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'png' in content_type:
                ext = '.png'
            elif 'webp' in content_type:
                ext = '.webp'
            else:
                ext = '.png'
        
        if not filepath.endswith(ext):
            filepath = os.path.splitext(filepath)[0] + ext
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        file_size = os.path.getsize(filepath)
        print(f"  [OK] Saved: {filepath} ({file_size:,} bytes)")
        return filepath
    except Exception as e:
        print(f"  [ERROR] Failed to download {url}: {e}")
        return None

def main():
    """Main download function."""
    print("=" * 70)
    print("Downloading Tabstats Dashboard Images from Squarespace")
    print("=" * 70)
    print(f"Output Directory: {OUTPUT_DIR.absolute()}\n")
    
    # Create output directories
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    DESIGN_SYSTEM_DIR.mkdir(parents=True, exist_ok=True)
    
    downloaded = []
    
    # Download old version image
    print("\n[1] Downloading Old Overwolf Version...")
    old_version_filename = slugify_filename(IMAGES["oldVersion"])
    old_version_path = OUTPUT_DIR / old_version_filename
    if download_image(IMAGES["oldVersion"], str(old_version_path)):
        downloaded.append(("oldVersion", str(old_version_path)))
    
    # Download detailed view images
    print(f"\n[2] Downloading {len(IMAGES['detailed'])} Detailed View Images...")
    for i, url in enumerate(IMAGES["detailed"], 1):
        filename = slugify_filename(url)
        filepath = OUTPUT_DIR / filename
        if download_image(url, str(filepath)):
            downloaded.append(("detailed", str(filepath)))
    
    # Download design system images
    print(f"\n[3] Downloading {len(IMAGES['designSystem'])} Design System Images...")
    for i, url in enumerate(IMAGES["designSystem"], 1):
        filename = slugify_filename(url)
        filepath = DESIGN_SYSTEM_DIR / filename
        if download_image(url, str(filepath)):
            downloaded.append(("designSystem", str(filepath)))
    
    # Summary
    print(f"\n{'=' * 70}")
    print(f"Summary:")
    print(f"  Successfully downloaded: {len(downloaded)} images")
    print(f"  Saved to: {OUTPUT_DIR.absolute()}")
    print(f"{'=' * 70}\n")
    
    print("Downloaded files:")
    for category, path in downloaded:
        print(f"  - {path}")

if __name__ == "__main__":
    main()
