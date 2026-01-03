#!/usr/bin/env python3
"""
Script to scrape Tabstats Dashboard case study images from bcampbelldesigns.com
"""

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path
import re

BASE_URL = "https://www.bcampbelldesigns.com/portfolio/tabstats-dashboard-companion"
OUTPUT_DIR = Path("public/images/projects/tabstats")
DESIGN_SYSTEM_DIR = OUTPUT_DIR / "design-system"

def slugify_filename(filename):
    """Convert filename to URL-friendly slug."""
    # Remove extension
    name, ext = os.path.splitext(filename)
    # Convert to lowercase and replace spaces/special chars with hyphens
    name = re.sub(r'[^\w\s-]', '', name.lower())
    name = re.sub(r'[-\s]+', '-', name)
    return f"{name}{ext}"

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
        print(f"  ✓ Downloaded: {os.path.basename(filepath)} ({file_size:,} bytes)")
        return filepath
    except Exception as e:
        print(f"  ✗ Error downloading {url}: {e}")
        return None

def main():
    """Main scraping function."""
    print("=" * 70)
    print("Tabstats Dashboard Image Scraper")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Output Directory: {OUTPUT_DIR.absolute()}\n")
    
    # Create output directories
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    DESIGN_SYSTEM_DIR.mkdir(parents=True, exist_ok=True)
    
    try:
        # Fetch the page
        print("Fetching case study page...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(BASE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        print("✓ Page loaded successfully\n")
        
        # Find all images
        all_images = soup.find_all('img')
        downloaded = []
        
        # Image filename patterns to look for
        detailed_view_patterns = [
            'home', 'favorites', 'match-view', 'no-recent', 'timeline', 
            'scoreboard', 'player-not-found', 'player-stats', 'cheaters',
            'matchmaking', 'profile-switch', 'recent-searches', 'search-results',
            'spectate', 'companion-app', 'overwolf'
        ]
        
        design_system_patterns = [
            'damage-report', 'general', 'match-details', 'match-view',
            'profile', 'scoreboard', 'search', 'settings', 'table-items',
            'application-frame', 'companion-app'
        ]
        
        print("Searching for images...\n")
        
        for img in all_images:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if not src or src.startswith('data:'):
                continue
            
            # Handle relative URLs
            if not src.startswith('http'):
                src = urljoin(BASE_URL, src)
            
            filename = os.path.basename(urlparse(src).path).lower()
            
            # Skip small images (icons, logos)
            if any(skip in filename for skip in ['logo', 'icon', 'favicon', 'avatar', 'social']):
                continue
            
            # Determine if it's a design system image or detailed view
            is_design_system = any(pattern in filename for pattern in design_system_patterns)
            is_detailed_view = any(pattern in filename for pattern in detailed_view_patterns)
            
            if 'overwolf' in filename.lower():
                # Old Overwolf version
                filepath = OUTPUT_DIR / "old-overwolf-version.png"
            elif is_design_system:
                # Save to design-system folder
                slugged_name = slugify_filename(filename)
                filepath = DESIGN_SYSTEM_DIR / slugged_name
            elif is_detailed_view or 'tabstats' in filename or 'companion' in filename:
                # Save to main tabstats folder
                slugged_name = slugify_filename(filename)
                # Clean up the name
                slugged_name = slugged_name.replace('tabstats-', '').replace('companion-app', 'companion-app')
                filepath = OUTPUT_DIR / slugged_name
            else:
                # Try to determine from context
                parent_text = img.find_parent().get_text().lower() if img.find_parent() else ''
                if 'design system' in parent_text or 'component' in parent_text:
                    slugged_name = slugify_filename(filename)
                    filepath = DESIGN_SYSTEM_DIR / f"design-system-{slugged_name}"
                else:
                    slugged_name = slugify_filename(filename)
                    filepath = OUTPUT_DIR / slugged_name
            
            # Download the image
            if download_image(src, str(filepath)):
                downloaded.append(str(filepath))
        
        # Summary
        print(f"\n{'=' * 70}")
        print(f"Summary:")
        print(f"  Successfully downloaded: {len(downloaded)} images")
        print(f"  Saved to: {OUTPUT_DIR.absolute()}")
        print(f"{'=' * 70}\n")
        
        if downloaded:
            print("Downloaded images:")
            for img_path in downloaded:
                print(f"  - {img_path}")
        
    except requests.RequestException as e:
        print(f"Error fetching website: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
