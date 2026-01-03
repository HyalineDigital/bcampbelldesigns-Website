#!/usr/bin/env python3
"""
Script to scrape project thumbnail images from bcampbelldesigns.com
and match them to projects in projects.ts, then download and rename them.
"""

import os
import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path
from difflib import SequenceMatcher

# Configuration
BASE_URL = "https://www.bcampbelldesigns.com/"
OUTPUT_DIR = Path("public/images/projects")
PROJECTS_TS_PATH = Path("data/projects.ts")

def slugify(text):
    """Convert text to a URL-friendly slug."""
    text = text.lower()
    # Remove special characters except spaces and hyphens
    text = re.sub(r'[^\w\s-]', '', text)
    # Replace spaces and multiple hyphens with single hyphen
    text = re.sub(r'[-\s]+', '-', text)
    # Remove leading/trailing hyphens
    return text.strip('-')

def similarity(a, b):
    """Calculate similarity ratio between two strings."""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def extract_projects_from_ts():
    """Extract project data from projects.ts file."""
    projects = []
    try:
        with open(PROJECTS_TS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract project objects using regex
        # Look for patterns like: { id: "...", title: "...", ... }
        pattern = r'{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[^}]+image:\s*"([^"]+)"'
        matches = re.finditer(pattern, content, re.DOTALL)
        
        for match in matches:
            project_id = match.group(1)
            title = match.group(2)
            current_image = match.group(3)
            projects.append({
                'id': project_id,
                'title': title,
                'current_image': current_image
            })
        
        print(f"✓ Found {len(projects)} projects in projects.ts")
        return projects
    except Exception as e:
        print(f"✗ Error reading projects.ts: {e}")
        # Fallback: return known projects
        return [
            {"id": "caesars-palace-online-casino", "title": "Caesars Palace Online Casino"},
            {"id": "icyveins", "title": "IcyVeins"},
            {"id": "the-national-forest-foundation", "title": "The National Forest Foundation"},
            {"id": "tabstats-dashboard", "title": "Tabstats - Dashboard"},
            {"id": "tabstats-design-system", "title": "Tabstats - Design System"},
            {"id": "addicting-games-mobile", "title": "Addicting Games Mobile"},
            {"id": "steam-mobile-app-redesign", "title": "Steam Mobile App Redesign"},
            {"id": "overlayed", "title": "Overlayed"},
            {"id": "mathgames", "title": "MathGames"},
            {"id": "addicting-games-dev-portal", "title": "Addicting Games Dev Portal"},
            {"id": "lcs-web-app-2022", "title": "LCS Web App 2022"},
            {"id": "valorant-dashboard", "title": "Valorant Dashboard"},
            {"id": "enthusiast-gaming", "title": "Enthusiast Gaming"},
            {"id": "rocket-stream-concept", "title": "Rocket Stream Concept"},
            {"id": "ableton-learning-platform", "title": "Ableton Learning Platform"},
            {"id": "amazon-luna-concept", "title": "Amazon Luna Concept"},
            {"id": "hertz-car-rental", "title": "Hertz Car Rental"},
            {"id": "aidium-first-aid", "title": "Aidium First Aid"},
            {"id": "chat-application", "title": "Chat Application"},
            {"id": "paypal-redesign", "title": "Paypal Redesign"},
            {"id": "nft-concept-site", "title": "NFT Concept Site"},
            {"id": "cloud-mining-concept", "title": "Cloud Mining Concept"},
            {"id": "other-digital-art", "title": "Other Digital Art"},
        ]

def find_project_images(soup, project_title):
    """
    Find project images from the soup using multiple strategies.
    Returns list of image URLs.
    """
    images = []
    normalized_title = normalize_title(project_title)
    key_words = [word.lower() for word in project_title.split() if len(word) > 3]
    
    # Strategy 1: Find project cards/items by title text
    project_elements = soup.find_all(string=re.compile(re.escape(project_title), re.IGNORECASE))
    
    for element in project_elements:
        parent = element.parent
        for _ in range(7):
            if parent is None:
                break
            imgs = parent.find_all('img')
            for img in imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
                if src and not src.startswith('data:'):
                    images.append(src)
            if parent.get('style'):
                bg_match = re.search(r'url\(["\']?([^"\')]+)["\']?\)', parent.get('style', ''))
                if bg_match:
                    images.append(bg_match.group(1))
            parent = parent.parent
    
    # Strategy 2: Look for project cards with matching classes
    project_cards = soup.find_all(['div', 'article', 'section', 'li'], 
                                  class_=re.compile(r'project|portfolio|work|item|card|gallery', re.I))
    
    for card in project_cards:
        card_text = card.get_text().lower()
        if normalized_title in card_text or any(word in card_text for word in key_words):
            imgs = card.find_all('img')
            for img in imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
                if src and not src.startswith('data:'):
                    images.append(src)
    
    # Strategy 3: Match by filename
    all_imgs = soup.find_all('img')
    for img in all_imgs:
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
        if src and not src.startswith('data:'):
            filename = os.path.basename(urlparse(src).path).lower()
            if any(keyword in filename for keyword in key_words):
                images.append(src)
    
    # Remove duplicates and filter
    unique_images = []
    seen = set()
    for img_url in images:
        if img_url in seen:
            continue
        seen.add(img_url)
        # Skip small images (likely icons/logos)
        if any(skip in img_url.lower() for skip in ['logo', 'icon', 'favicon', 'avatar', 'social']):
            continue
        unique_images.append(img_url)
    
    return unique_images

def normalize_title(title):
    """Normalize title for matching."""
    return title.strip().lower()

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        if not url.startswith('http'):
            url = urljoin(BASE_URL, url)
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        
        # Determine file extension
        ext = os.path.splitext(urlparse(url).path)[1]
        if not ext or ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
            content_type = response.headers.get('content-type', '')
            if 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'png' in content_type:
                ext = '.png'
            elif 'webp' in content_type:
                ext = '.webp'
            else:
                ext = '.jpg'
        
        if not filepath.endswith(ext):
            filepath = os.path.splitext(filepath)[0] + ext
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        file_size = os.path.getsize(filepath)
        print(f"  ✓ Downloaded: {os.path.basename(filepath)} ({file_size:,} bytes)")
        return filepath
    except Exception as e:
        print(f"  ✗ Error downloading {url}: {e}")
        return None

def main():
    """Main scraping function."""
    print("=" * 70)
    print("Project Image Scraper")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Output Directory: {OUTPUT_DIR.absolute()}\n")
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Get projects from projects.ts
    projects = extract_projects_from_ts()
    
    try:
        # Fetch the main page
        print("Fetching main page...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(BASE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        print("✓ Page loaded successfully\n")
        
        # Process each project
        downloaded = {}
        failed = []
        
        for project in projects:
            project_title = project['title']
            project_id = project['id']
            print(f"Processing: {project_title}")
            
            # Find images for this project
            images = find_project_images(soup, project_title)
            
            if not images:
                print(f"  ⚠ No images found")
                failed.append(project_title)
                continue
            
            # Use the first/best image found
            image_url = images[0]
            if len(images) > 1:
                print(f"  Found {len(images)} images, using first one")
            
            # Create filename using project ID (already in kebab-case)
            filename = project_id + ".jpg"
            filepath = OUTPUT_DIR / filename
            
            # Download the image
            downloaded_path = download_image(image_url, str(filepath))
            if downloaded_path:
                downloaded[project_id] = {
                    'title': project_title,
                    'filename': filename,
                    'path': f"/images/projects/{filename}"
                }
            else:
                failed.append(project_title)
        
        # Summary
        print(f"\n{'=' * 70}")
        print(f"Summary:")
        print(f"  Successfully downloaded: {len(downloaded)}/{len(projects)}")
        if failed:
            print(f"\n  Failed to find/download:")
            for title in failed:
                print(f"    - {title}")
        print(f"{'=' * 70}\n")
        
        # Generate updated projects.ts content
        print("=" * 70)
        print("UPDATED PROJECTS.TS CONTENT")
        print("=" * 70)
        print("\nCopy this into your projects.ts file, replacing the 'image' field for each project:\n")
        
        for project_id, data in downloaded.items():
            print(f'    // {data["title"]}')
            print(f'    image: "{data["path"]}",')
            print()
        
        if failed:
            print(f"\n// Projects that need manual image assignment:")
            for title in failed:
                project_id = slugify(title)
                print(f'    // {title}')
                print(f'    image: "/images/projects/{project_id}.jpg", // TODO: Add image manually')
                print()
        
        print("=" * 70)
        
    except requests.RequestException as e:
        print(f"Error fetching website: {e}")
        print("\nTroubleshooting:")
        print("  1. Check your internet connection")
        print("  2. Verify the URL is correct and accessible")
        print("  3. The site might be blocking automated requests")
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
