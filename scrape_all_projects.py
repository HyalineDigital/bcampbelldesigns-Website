#!/usr/bin/env python3
"""
Comprehensive script to scrape all project pages from bcampbelldesigns.com,
download images locally, and extract content for project.html
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

# Project ID to URL mapping (based on common patterns)
PROJECT_URLS = {
    "caesars-palace-online-casino": "/portfolio/caesars-palace-online-casino",
    "icyveins": "/portfolio/icyveins",
    "the-national-forest-foundation": "/portfolio/the-national-forest-foundation-case-study",
    "tabstats-dashboard": "/portfolio/tabstats-dashboard-companion",
    "tabstats-design-system": "/portfolio/tabstats-ui-ux-design-product-design",
    "addicting-games-mobile": "/portfolio/addicting-games-mobile",
    "steam-mobile-app-redesign": "/portfolio/steam-mobile-app-redesign-case-study",
    "overlayed": "/portfolio/overlayed",
    "mathgames": "/portfolio/mathgames",
    "addicting-games-dev-portal": "/portfolio/addicting-games-dev-portal",
    "lcs-web-app-2022": "/portfolio/lcs-web-app-2022",
    "valorant-dashboard": "/portfolio/valorant-dashboard",
    "enthusiast-gaming": "/portfolio/enthusiast-gaming",
    "rocket-stream-concept": "/portfolio/rocket-stream-concept",
    "ableton-learning-platform": "/portfolio/ableton-learning-platform-case-study",
    "amazon-luna-concept": "/portfolio/amazon-luna-concept",
    "hertz-car-rental": "/portfolio/hertz-car-rental-price-comparison-concept",
    "aidium-first-aid": "/portfolio/aidium-first-aid-training-application",
    "chat-application": "/portfolio/chat-application",
    "paypal-redesign": "/portfolio/paypal-redesign-light-dark",
    "nft-concept-site": "/portfolio/nft-concept-site",
    "cloud-mining-concept": "/portfolio/cloud-mining-concept-site",
    "other-digital-art": "/portfolio/other-digital-art",
}

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def download_image(url, filepath, project_id):
    """Download an image from URL to filepath."""
    try:
        if not url.startswith('http'):
            url = urljoin(BASE_URL, url)
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, timeout=30, headers=headers, stream=True)
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
                ext = '.png'
        
        if not filepath.endswith(ext):
            filepath = os.path.splitext(filepath)[0] + ext
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        file_size = os.path.getsize(filepath)
        print(f"    [OK] {os.path.basename(filepath)} ({file_size:,} bytes)")
        return filepath
    except Exception as e:
        print(f"    [ERROR] {e}")
        return None

def extract_text_content(soup):
    """Extract text content from the page."""
    content = {
        "title": "",
        "subtitle": "",
        "description": "",
        "timeline": "",
        "role": "",
        "outcome": "",
        "goals": [],
        "research": {
            "method": "",
            "findings": [],
            "oldVersion": None
        }
    }
    
    # Try to find main title
    h1 = soup.find('h1')
    if h1:
        content["title"] = h1.get_text(strip=True)
    
    # Try to find subtitle (h2 or h3 after h1)
    if h1:
        next_sibling = h1.find_next_sibling(['h2', 'h3'])
        if next_sibling:
            content["subtitle"] = next_sibling.get_text(strip=True)
    
    # Look for project overview
    overview = soup.find(string=re.compile(r'Project Overview|Overview', re.I))
    if overview:
        parent = overview.find_parent()
        if parent:
            desc = parent.find_next(['p', 'div'])
            if desc:
                content["description"] = desc.get_text(strip=True)
    
    # Look for timeline
    timeline_label = soup.find(string=re.compile(r'Project Timeline|Timeline', re.I))
    if timeline_label:
        parent = timeline_label.find_parent()
        if parent:
            timeline_text = parent.find_next(['p', 'div', 'span'])
            if timeline_text:
                content["timeline"] = timeline_text.get_text(strip=True)
    
    # Look for role
    role_label = soup.find(string=re.compile(r'My role|Role|My Role', re.I))
    if role_label:
        parent = role_label.find_parent()
        if parent:
            role_text = parent.find_next(['p', 'div'])
            if role_text:
                content["role"] = role_text.get_text(strip=True)
    
    # Look for goals
    goals_label = soup.find(string=re.compile(r'Goals|Goal', re.I))
    if goals_label:
        parent = goals_label.find_parent()
        if parent:
            goals_list = parent.find_next(['ul', 'ol'])
            if goals_list:
                for li in goals_list.find_all('li'):
                    goal_text = li.get_text(strip=True)
                    if goal_text:
                        content["goals"].append(goal_text)
    
    # Look for research section
    research_label = soup.find(string=re.compile(r'Data Analysis|User Research|Research', re.I))
    if research_label:
        parent = research_label.find_parent()
        if parent:
            # Get method
            method_p = parent.find_next('p')
            if method_p:
                content["research"]["method"] = method_p.get_text(strip=True)
            
            # Get findings
            findings_label = parent.find(string=re.compile(r'Findings', re.I))
            if findings_label:
                findings_parent = findings_label.find_parent()
                if findings_parent:
                    findings_list = findings_parent.find_next(['ul', 'ol'])
                    if findings_list:
                        for li in findings_list.find_all('li'):
                            finding = li.get_text(strip=True)
                            if finding:
                                content["research"]["findings"].append(finding)
    
    return content

def extract_images(soup, project_id, base_url):
    """Extract all images from the page and download them."""
    images = {
        "oldVersion": None,
        "detailed": [],
        "designSystem": []
    }
    
    all_images = soup.find_all('img')
    project_dir = OUTPUT_DIR / project_id
    design_system_dir = project_dir / "design-system"
    
    for img in all_images:
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        if not src or src.startswith('data:'):
            continue
        
        # Handle relative URLs
        if not src.startswith('http'):
            src = urljoin(base_url, src)
        
        # Skip small images (icons, logos, avatars)
        filename = os.path.basename(urlparse(src).path).lower()
        if any(skip in filename for skip in ['logo', 'icon', 'favicon', 'avatar', 'social', 'brandon']):
            continue
        
        # Skip if it's a Squarespace CDN image (we'll download it)
        if 'squarespace-cdn.com' in src or 'squarespace.com' in src:
            # Extract filename from URL
            parsed = urlparse(src)
            original_filename = unquote(os.path.basename(parsed.path))
            slugged_name = slugify(original_filename)
            
            # Determine category based on context or filename
            parent_text = ""
            if img.find_parent():
                parent_text = img.find_parent().get_text().lower()
            
            if 'design system' in parent_text or 'component' in parent_text:
                filepath = design_system_dir / f"{slugged_name}.png"
                local_path = f"public/images/projects/{project_id}/design-system/{slugged_name}.png"
                if download_image(src, str(filepath), project_id):
                    images["designSystem"].append(local_path)
            elif 'overwolf' in filename.lower() or 'old' in filename.lower():
                filepath = project_dir / f"old-version.png"
                local_path = f"public/images/projects/{project_id}/old-version.png"
                if download_image(src, str(filepath), project_id):
                    images["oldVersion"] = local_path
            else:
                filepath = project_dir / f"{slugged_name}.png"
                local_path = f"public/images/projects/{project_id}/{slugged_name}.png"
                if download_image(src, str(filepath), project_id):
                    images["detailed"].append(local_path)
    
    return images

def scrape_project(project_id, project_url):
    """Scrape a single project page."""
    print(f"\n{'='*70}")
    print(f"Scraping: {project_id}")
    print(f"URL: {BASE_URL}{project_url}")
    print(f"{'='*70}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        full_url = urljoin(BASE_URL, project_url)
        response = requests.get(full_url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract content
        content = extract_text_content(soup)
        
        # Extract and download images
        print("\nDownloading images...")
        images = extract_images(soup, project_id, full_url)
        
        return {
            "project_id": project_id,
            "content": content,
            "images": images
        }
        
    except Exception as e:
        print(f"ERROR: {e}")
        return None

def main():
    """Main scraping function."""
    print("="*70)
    print("Scraping All Project Pages from bcampbelldesigns.com")
    print("="*70)
    
    all_projects_data = {}
    
    for project_id, project_url in PROJECT_URLS.items():
        result = scrape_project(project_id, project_url)
        if result:
            all_projects_data[project_id] = result
        
        # Be nice to the server
        time.sleep(2)
    
    # Save results to JSON
    output_file = "scraped_projects_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_projects_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*70}")
    print(f"Scraping complete!")
    print(f"Results saved to: {output_file}")
    print(f"{'='*70}\n")
    
    # Print summary
    print("Summary:")
    for project_id, data in all_projects_data.items():
        print(f"  {project_id}:")
        print(f"    - Title: {data['content']['title']}")
        print(f"    - Images: {len(data['images']['detailed'])} detailed, {len(data['images']['designSystem'])} design system")
        if data['images']['oldVersion']:
            print(f"    - Old version image: Yes")

if __name__ == "__main__":
    main()
