"""
Script to scrape the about page from bcampbelldesigns.com
"""

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path

BASE_URL = "https://www.bcampbelldesigns.com/about"
OUTPUT_DIR = Path("public/images/about")

def scrape_about_page():
    """Scrape the about page content and images."""
    print(f"Scraping about page from {BASE_URL}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(BASE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Create output directory
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        
        # Extract text content
        print("\n=== TEXT CONTENT ===")
        
        # Find main content area
        main_content = soup.find('main') or soup.find('article') or soup.find('div', class_=lambda x: x and ('content' in x.lower() or 'about' in x.lower()))
        
        if main_content:
            # Get all text
            paragraphs = main_content.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])
            for p in paragraphs:
                text = p.get_text(strip=True)
                if text:
                    print(text)
        
        # Extract images
        print("\n=== IMAGES ===")
        images = soup.find_all('img')
        downloaded_images = []
        
        for img in images:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if src and not src.startswith('data:'):
                # Handle relative URLs
                if not src.startswith('http'):
                    src = urljoin(BASE_URL, src)
                
                # Download image
                try:
                    img_response = requests.get(src, headers=headers, timeout=30)
                    img_response.raise_for_status()
                    
                    # Get filename
                    filename = os.path.basename(urlparse(src).path)
                    if not filename or '.' not in filename:
                        filename = f"about-image-{len(downloaded_images) + 1}.jpg"
                    
                    filepath = OUTPUT_DIR / filename
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    downloaded_images.append(f"/images/about/{filename}")
                    print(f"✓ Downloaded: {filename}")
                except Exception as e:
                    print(f"✗ Error downloading {src}: {e}")
        
        # Print structured content
        print("\n=== STRUCTURED CONTENT ===")
        print("Use this content to build the about page:")
        print("\nContent extracted successfully!")
        
        return {
            'html': str(soup),
            'images': downloaded_images
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    scrape_about_page()
