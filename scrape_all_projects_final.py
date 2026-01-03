#!/usr/bin/env python3
"""
Final comprehensive scraper with correct URLs
"""

import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
from pathlib import Path
import re
import time

BASE_URL = "https://www.bcampbelldesigns.com"
OUTPUT_DIR = Path("public/images/projects")

# Correct URL mapping from homepage
PROJECT_URL_MAP = {
    "caesars-palace-online-casino": "/portfolio/caesars-palace-online",
    "icyveins": "/portfolio/icy-veins",
    "the-national-forest-foundation": "/portfolio/nff-case-study",
    "tabstats-dashboard": "/portfolio/tabstats-dashboard-companion",
    "tabstats-design-system": "/portfolio/tabstats-website",
    "addicting-games-mobile": "/portfolio/ag-mobile-application",
    "steam-mobile-app-redesign": "/portfolio/steam-mobile-case-study",
    "overlayed": "/portfolio/overlayed-dash-overlay",
    "mathgames": "/portfolio/mg-gamified-learning",
    "addicting-games-dev-portal": "/portfolio/ag-developer-portal",
    "lcs-web-app-2022": "/portfolio/lcs-web-app",
    "valorant-dashboard": "/portfolio/valorant-dashboard",
    "enthusiast-gaming": "/portfolio/enthusiast-gaming-ads",
    "rocket-stream-concept": "/portfolio/rocket-stream-concept",
    "ableton-learning-platform": "/portfolio/ableton-learning-case-study",
    "amazon-luna-concept": "/portfolio/amazon-luna-concept",
    "hertz-car-rental": "/portfolio/hertz-car-rental",
    "aidium-first-aid": "/portfolio/aidium-case-study",
    "chat-application": "/portfolio/chat-application",
    "paypal-redesign": "/portfolio/paypal-redesign-lightdark",
    "nft-concept-site": "/portfolio/nft-concept-site",
    "cloud-mining-concept": "/portfolio/cloud-mining-concept",
    "other-digital-art": "/portfolio/digital-art",
}

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        if not url.startswith('http'):
            url = urljoin(BASE_URL, url)
        
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, timeout=30, headers=headers, stream=True)
        response.raise_for_status()
        
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
                ext = '.png'
        
        if not filepath.endswith(ext):
            filepath = os.path.splitext(filepath)[0] + ext
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return filepath
    except Exception as e:
        print(f"      [ERROR] {e}")
        return None

def extract_content(soup):
    """Extract structured content from page."""
    content = {
        "title": "",
        "subtitle": "",
        "description": "",
        "timeline": "",
        "role": "",
        "outcome": "",
        "goals": [],
        "research": {"method": "", "findings": [], "oldVersion": None}
    }
    
    # Title
    h1 = soup.find('h1')
    if h1:
        content["title"] = h1.get_text(strip=True)
        # Check for subtitle in next h2/h3
        next_heading = h1.find_next_sibling(['h2', 'h3'])
        if next_heading:
            content["subtitle"] = next_heading.get_text(strip=True)
    
    # Description/Overview
    overview_text = soup.find(string=re.compile(r'Project Overview|Overview', re.I))
    if overview_text:
        parent = overview_text.find_parent()
        if parent:
            desc = parent.find_next(['p', 'div'])
            if desc:
                content["description"] = desc.get_text(strip=True)
    
    # Timeline
    timeline_elem = soup.find(string=re.compile(r'Project Timeline|Timeline', re.I))
    if timeline_elem:
        parent = timeline_elem.find_parent()
        if parent:
            timeline_val = parent.find_next(['p', 'div', 'span'])
            if timeline_val:
                content["timeline"] = timeline_val.get_text(strip=True)
    
    # Role
    role_elem = soup.find(string=re.compile(r'My role|Role|My Role', re.I))
    if role_elem:
        parent = role_elem.find_parent()
        if parent:
            role_val = parent.find_next(['p', 'div'])
            if role_val:
                content["role"] = role_val.get_text(strip=True)
    
    # Goals
    goals_elem = soup.find(string=re.compile(r'Goals|Goal', re.I))
    if goals_elem:
        parent = goals_elem.find_parent()
        if parent:
            goals_list = parent.find_next(['ul', 'ol'])
            if goals_list:
                for li in goals_list.find_all('li'):
                    goal = li.get_text(strip=True)
                    if goal:
                        content["goals"].append(goal)
    
    # Research
    research_elem = soup.find(string=re.compile(r'Data Analysis|User Research|Research', re.I))
    if research_elem:
        parent = research_elem.find_parent()
        if parent:
            method_p = parent.find_next('p')
            if method_p:
                content["research"]["method"] = method_p.get_text(strip=True)
            
            findings_elem = parent.find(string=re.compile(r'Findings', re.I))
            if findings_elem:
                findings_parent = findings_elem.find_parent()
                if findings_parent:
                    findings_list = findings_parent.find_next(['ul', 'ol'])
                    if findings_list:
                        for li in findings_list.find_all('li'):
                            finding = li.get_text(strip=True)
                            if finding:
                                content["research"]["findings"].append(finding)
    
    return content

def extract_and_download_images(soup, project_id, base_url):
    """Extract images and download them locally."""
    images = {"oldVersion": None, "detailed": [], "designSystem": []}
    
    all_images = soup.find_all('img')
    project_dir = OUTPUT_DIR / project_id
    design_system_dir = project_dir / "design-system"
    
    seen_urls = set()
    
    for img in all_images:
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        if not src or src.startswith('data:') or src in seen_urls:
            continue
        
        seen_urls.add(src)
        
        if not src.startswith('http'):
            src = urljoin(base_url, src)
        
        filename = os.path.basename(urlparse(src).path).lower()
        if any(skip in filename for skip in ['logo', 'icon', 'favicon', 'avatar', 'social', 'brandon']):
            continue
        
        # Download Squarespace images
        if 'squarespace' in src.lower() or 'squarespace-cdn' in src.lower():
            original_filename = unquote(os.path.basename(urlparse(src).path))
            slugged_name = slugify(original_filename)
            
            parent_text = ""
            if img.find_parent():
                parent_text = img.find_parent().get_text().lower()
            
            if 'design system' in parent_text or 'component' in parent_text:
                filepath = design_system_dir / f"{slugged_name}.png"
                local_path = f"public/images/projects/{project_id}/design-system/{slugged_name}.png"
                if download_image(src, str(filepath)):
                    images["designSystem"].append(local_path)
            elif 'overwolf' in filename.lower() or 'old' in filename.lower() or 'intro' in filename.lower():
                filepath = project_dir / "old-version.png"
                local_path = f"public/images/projects/{project_id}/old-version.png"
                if download_image(src, str(filepath)):
                    images["oldVersion"] = local_path
            else:
                filepath = project_dir / f"{slugged_name}.png"
                local_path = f"public/images/projects/{project_id}/{slugged_name}.png"
                if download_image(src, str(filepath)):
                    images["detailed"].append(local_path)
    
    # Remove duplicates
    images["detailed"] = list(dict.fromkeys(images["detailed"]))
    images["designSystem"] = list(dict.fromkeys(images["designSystem"]))
    
    return images

def scrape_project(project_id, project_url):
    """Scrape a single project."""
    print(f"\n[{project_id}]")
    print(f"  URL: {BASE_URL}{project_url}")
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        full_url = urljoin(BASE_URL, project_url)
        response = requests.get(full_url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        content = extract_content(soup)
        print(f"  Title: {content['title']}")
        
        print(f"  Downloading images...")
        images = extract_and_download_images(soup, project_id, full_url)
        print(f"    - Detailed: {len(images['detailed'])}")
        print(f"    - Design System: {len(images['designSystem'])}")
        if images['oldVersion']:
            print(f"    - Old Version: Yes")
        
        return {
            "project_id": project_id,
            "content": content,
            "images": images
        }
    except Exception as e:
        print(f"  ERROR: {e}")
        return None

def main():
    """Main function."""
    print("="*70)
    print("Scraping All Projects")
    print("="*70)
    
    all_data = {}
    
    for project_id, project_url in PROJECT_URL_MAP.items():
        result = scrape_project(project_id, project_url)
        if result:
            all_data[project_id] = result
        time.sleep(1)  # Be nice to server
    
    # Save to JSON
    with open("all_projects_scraped.json", 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*70}")
    print(f"Complete! Scraped {len(all_data)} projects")
    print(f"Saved to: all_projects_scraped.json")
    print(f"{'='*70}")

if __name__ == "__main__":
    main()
