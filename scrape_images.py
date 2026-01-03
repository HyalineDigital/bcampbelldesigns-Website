#!/usr/bin/env python3
"""
Script to scrape project thumbnail images from bcampbelldesigns.com
and save them to a local 'images' folder.
"""

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
from pathlib import Path

# Configuration
BASE_URL = "https://www.bcampbelldesigns.com/"
IMAGES_DIR = Path("images")
OUTPUT_DIR = IMAGES_DIR / "scraped"

def setup_directories():
    """Create output directory if it doesn't exist."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR.absolute()}")

def get_page_content(url):
    """Fetch the HTML content from a URL."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def is_image_url(url):
    """Check if URL points to an image."""
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
    parsed = urlparse(url)
    path = parsed.path.lower()
    return any(path.endswith(ext) for ext in image_extensions)

def download_image(image_url, filename):
    """Download an image from URL and save it."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(image_url, headers=headers, timeout=30, stream=True)
        response.raise_for_status()
        
        filepath = OUTPUT_DIR / filename
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        file_size = filepath.stat().st_size
        print(f"  ✓ Downloaded: {filename} ({file_size:,} bytes)")
        return True
    except requests.RequestException as e:
        print(f"  ✗ Failed to download {image_url}: {e}")
        return False

def sanitize_filename(url):
    """Create a safe filename from URL."""
    parsed = urlparse(url)
    # Get the filename from path
    filename = os.path.basename(parsed.path)
    
    # If no filename, create one from the full path
    if not filename or '.' not in filename:
        # Create a hash-based filename or use a default
        path_parts = [p for p in parsed.path.split('/') if p]
        if path_parts:
            filename = '_'.join(path_parts[-2:]) + '.jpg'
        else:
            filename = 'image.jpg'
    
    # Sanitize filename
    filename = re.sub(r'[^\w\-_\.]', '_', filename)
    
    # Ensure it has an extension
    if '.' not in filename:
        filename += '.jpg'
    
    return filename

def scrape_images_from_page(url):
    """Scrape all project thumbnail images from a page."""
    print(f"\nScraping images from: {url}")
    
    html_content = get_page_content(url)
    if not html_content:
        return []
    
    soup = BeautifulSoup(html_content, 'html.parser')
    image_urls = set()
    
    # Find all img tags
    img_tags = soup.find_all('img')
    print(f"Found {len(img_tags)} <img> tags")
    
    for img in img_tags:
        # Get src attribute
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        
        if not src:
            continue
        
        # Handle relative URLs
        absolute_url = urljoin(url, src)
        
        # Skip data URIs and very small images (likely icons)
        if src.startswith('data:'):
            continue
        
        # Check if it's an image URL
        if is_image_url(absolute_url):
            image_urls.add(absolute_url)
    
    # Also check for background images in CSS
    style_tags = soup.find_all(attrs={'style': True})
    for tag in style_tags:
        style = tag.get('style', '')
        # Look for url(...) patterns
        urls = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', style)
        for url_match in urls:
            absolute_url = urljoin(BASE_URL, url_match)
            if is_image_url(absolute_url):
                image_urls.add(absolute_url)
    
    # Check style tags and link tags with rel="stylesheet"
    for style_tag in soup.find_all('style'):
        urls = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', style_tag.string or '')
        for url_match in urls:
            absolute_url = urljoin(BASE_URL, url_match)
            if is_image_url(absolute_url):
                image_urls.add(absolute_url)
    
    print(f"Found {len(image_urls)} unique image URLs")
    
    # Filter out common non-project images (logos, icons, etc.)
    project_images = []
    skip_patterns = ['logo', 'icon', 'avatar', 'favicon', 'social', 'button', 'arrow', 'chevron']
    
    for img_url in image_urls:
        # Skip if URL contains common non-project keywords
        url_lower = img_url.lower()
        if any(pattern in url_lower for pattern in skip_patterns):
            continue
        
        # Try to identify project thumbnails (often in specific directories)
        if any(pattern in url_lower for pattern in ['project', 'portfolio', 'work', 'gallery', 'thumb']):
            project_images.append(img_url)
        # Also include images that seem substantial (not icons)
        elif 'thumb' in url_lower or 'image' in url_lower or any(ext in url_lower for ext in ['.jpg', '.jpeg', '.png']):
            project_images.append(img_url)
    
    # If filtering removed too many, use all images
    if len(project_images) < len(image_urls) * 0.3:
        print("  Note: Using all images (filtering may have been too aggressive)")
        project_images = list(image_urls)
    
    return project_images

def main():
    """Main function to scrape images."""
    print("=" * 60)
    print("Portfolio Image Scraper")
    print("=" * 60)
    
    setup_directories()
    
    # Scrape from main page
    project_images = scrape_images_from_page(BASE_URL)
    
    # Also try common portfolio/work pages
    additional_pages = [
        f"{BASE_URL}work",
        f"{BASE_URL}portfolio",
        f"{BASE_URL}projects",
    ]
    
    for page_url in additional_pages:
        additional_images = scrape_images_from_page(page_url)
        project_images.extend(additional_images)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_images = []
    for img in project_images:
        if img not in seen:
            seen.add(img)
            unique_images.append(img)
    
    print(f"\n{'=' * 60}")
    print(f"Total unique images found: {len(unique_images)}")
    print(f"{'=' * 60}\n")
    
    # Download images
    downloaded_count = 0
    for i, image_url in enumerate(unique_images, 1):
        print(f"[{i}/{len(unique_images)}] {image_url}")
        filename = sanitize_filename(image_url)
        
        # Handle duplicate filenames
        base_name, ext = os.path.splitext(filename)
        counter = 1
        original_filename = filename
        while (OUTPUT_DIR / filename).exists():
            filename = f"{base_name}_{counter}{ext}"
            counter += 1
        
        if download_image(image_url, filename):
            downloaded_count += 1
    
    print(f"\n{'=' * 60}")
    print(f"Download complete!")
    print(f"Successfully downloaded: {downloaded_count}/{len(unique_images)} images")
    print(f"Saved to: {OUTPUT_DIR.absolute()}")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()

