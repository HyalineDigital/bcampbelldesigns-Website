"""
Script to scrape project thumbnail images from bcampbelldesigns.com
and download them to public/images/portfolio with proper naming.
"""

import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

# Base URL
BASE_URL = "https://www.bcampbelldesigns.com/"

# Output directory
OUTPUT_DIR = "public/images/portfolio"

# Project title mapping (website title -> our project title)
PROJECT_MAPPING = {
    "Caesars Palace Online Casino": "caesars-palace-online-casino",
    "IcyVeins": "icyveins",
    "The National Forest Foundation": "the-national-forest-foundation",
    "Tabstats - Dashboard": "tabstats-dashboard",
    "Tabstats - Design System": "tabstats-design-system",
    "Addicting Games Mobile": "addicting-games-mobile",
    "Steam Mobile App Redesign": "steam-mobile-app-redesign",
    "Overlayed": "overlayed",
    "MathGames": "mathgames",
    "Addicting Games Dev Portal": "addicting-games-dev-portal",
    "LCS Web App 2022": "lcs-web-app-2022",
    "Valorant Dashboard": "valorant-dashboard",
    "Enthusiast Gaming": "enthusiast-gaming",
    "Rocket Stream Concept": "rocket-stream-concept",
    "Ableton Learning Platform": "ableton-learning-platform",
    "Amazon Luna Concept": "amazon-luna-concept",
    "Hertz Car Rental": "hertz-car-rental",
    "Aidium First Aid": "aidium-first-aid",
    "Chat Application": "chat-application",
    "Paypal Redesign": "paypal-redesign",
    "NFT Concept Site": "nft-concept-site",
    "Cloud Mining Concept": "cloud-mining-concept",
    "Other Digital Art": "other-digital-art",
}

def slugify(text):
    """Convert text to a URL-friendly slug."""
    # Convert to lowercase
    text = text.lower()
    # Replace spaces and special characters with hyphens
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    # Remove leading/trailing hyphens
    return text.strip('-')

def normalize_title(title):
    """Normalize title for matching (case-insensitive, strip whitespace)."""
    return title.strip().lower()

def find_project_images(soup, project_title):
    """
    Find project images from the soup. Tries multiple strategies:
    1. Look for project cards/items with matching title
    2. Look for images in project sections
    3. Look for thumbnail images
    4. Match by filename patterns
    """
    images = []
    normalized_title = normalize_title(project_title)
    
    # Extract key words from title (words longer than 3 chars)
    key_words = [word.lower() for word in project_title.split() if len(word) > 3]
    
    # Strategy 1: Find project cards/items by title text
    # Look for elements containing the project title
    project_elements = soup.find_all(string=re.compile(re.escape(project_title), re.IGNORECASE))
    
    for element in project_elements:
        # Navigate up to find the parent container
        parent = element.parent
        for _ in range(7):  # Go up max 7 levels
            if parent is None:
                break
            # Look for images in this container
            imgs = parent.find_all('img')
            for img in imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
                if src and not src.startswith('data:'):
                    images.append(src)
            # Also check for background images in style attributes
            if parent.get('style'):
                bg_match = re.search(r'url\(["\']?([^"\')]+)["\']?\)', parent.get('style', ''))
                if bg_match:
                    images.append(bg_match.group(1))
            parent = parent.parent
    
    # Strategy 2: Look for project cards with data attributes or classes
    project_cards = soup.find_all(['div', 'article', 'section', 'li'], 
                                  class_=re.compile(r'project|portfolio|work|item|card|gallery', re.I))
    
    for card in project_cards:
        # Check if this card contains our project title
        card_text = card.get_text().lower()
        if normalized_title in card_text or any(
            word in card_text for word in key_words
        ):
            imgs = card.find_all('img')
            for img in imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
                if src and not src.startswith('data:'):
                    images.append(src)
            # Check for background images
            if card.get('style'):
                bg_match = re.search(r'url\(["\']?([^"\')]+)["\']?\)', card.get('style', ''))
                if bg_match:
                    images.append(bg_match.group(1))
    
    # Strategy 3: Look for all images and try to match by filename
    all_imgs = soup.find_all('img')
    for img in all_imgs:
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
        if src and not src.startswith('data:'):
            # Check if filename contains project keywords
            filename = os.path.basename(urlparse(src).path).lower()
            if any(keyword in filename for keyword in key_words):
                images.append(src)
    
    # Strategy 4: Check for links that might contain project pages
    links = soup.find_all('a', href=True)
    for link in links:
        link_text = link.get_text().lower()
        href = link.get('href', '')
        if normalized_title in link_text or any(word in link_text for word in key_words):
            # Follow the link to find images (if it's a project detail page)
            if href and not href.startswith('#') and not href.startswith('mailto:'):
                # This would require additional requests - skip for now
                pass
    
    # Remove duplicates and filter out small images (likely icons)
    unique_images = []
    seen = set()
    for img_url in images:
        if img_url in seen:
            continue
        seen.add(img_url)
        # Skip very small images (likely icons/logos)
        if any(skip in img_url.lower() for skip in ['logo', 'icon', 'favicon', 'avatar', 'social']):
            continue
        unique_images.append(img_url)
    
    return unique_images

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        # Handle relative URLs
        if not url.startswith('http'):
            url = urljoin(BASE_URL, url)
        
        response = requests.get(url, timeout=30, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()
        
        # Determine file extension from URL or content-type
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
                ext = '.jpg'  # Default
        
        # Update filepath with extension
        if not filepath.endswith(ext):
            filepath = os.path.splitext(filepath)[0] + ext
        
        # Save the image
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Downloaded: {os.path.basename(filepath)}")
        return True
    except Exception as e:
        print(f"✗ Error downloading {url}: {e}")
        return False

def main():
    """Main scraping function."""
    print(f"Scraping portfolio images from {BASE_URL}")
    print(f"Output directory: {OUTPUT_DIR}\n")
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    try:
        # Fetch the main page
        print("Fetching main page...")
        response = requests.get(BASE_URL, timeout=30, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        print("✓ Page loaded successfully\n")
        
        # Process each project
        downloaded = 0
        failed = []
        
        for project_title, slug in PROJECT_MAPPING.items():
            print(f"Processing: {project_title}")
            
            # Find images for this project
            images = find_project_images(soup, project_title)
            
            if not images:
                print(f"  ⚠ No images found for '{project_title}'")
                failed.append(project_title)
                continue
            
            # Use the first image found (usually the thumbnail)
            image_url = images[0]
            if len(images) > 1:
                print(f"  Found {len(images)} images, using first one")
            
            # Download the image
            filepath = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
            if download_image(image_url, filepath):
                downloaded += 1
            else:
                failed.append(project_title)
            
            # Be polite - small delay between requests
            time.sleep(0.5)
        
        # Summary
        print(f"\n{'='*60}")
        print(f"Summary:")
        print(f"  Downloaded: {downloaded}/{len(PROJECT_MAPPING)}")
        if failed:
            print(f"\n  Failed to find/download:")
            for title in failed:
                print(f"    - {title}")
        print(f"{'='*60}\n")
        
        if failed:
            print("Note: Some images were not found. You may need to:")
            print("  1. Check the website structure manually")
            print("  2. Download images manually and place them in the output directory")
            print("  3. Update the script to match your site's HTML structure")
        
    except requests.RequestException as e:
        print(f"Error fetching website: {e}")
        print("\nTroubleshooting:")
        print("  1. Check your internet connection")
        print("  2. Verify the URL is correct and accessible")
        print("  3. The site might be blocking automated requests")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()
