#!/usr/bin/env python3
"""
First, extract actual project URLs from the homepage
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json

BASE_URL = "https://www.bcampbelldesigns.com"

def get_project_urls():
    """Extract project URLs from the homepage."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(BASE_URL, headers=headers, timeout=30)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all links that point to portfolio pages
    project_urls = {}
    
    # Look for links in the portfolio grid
    links = soup.find_all('a', href=True)
    
    for link in links:
        href = link.get('href', '')
        if '/portfolio/' in href:
            # Get the project title from the link or nearby text
            title = link.get_text(strip=True)
            if title:
                # Convert title to project ID (slug)
                project_id = title.lower().replace(' ', '-').replace('&', '').replace(':', '')
                project_id = project_id.replace('--', '-').strip('-')
                
                # Handle full URL or relative
                if not href.startswith('http'):
                    href = urljoin(BASE_URL, href)
                
                project_urls[project_id] = {
                    "title": title,
                    "url": href
                }
    
    return project_urls

if __name__ == "__main__":
    urls = get_project_urls()
    print(json.dumps(urls, indent=2))
