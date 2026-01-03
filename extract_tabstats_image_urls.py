#!/usr/bin/env python3
"""
Script to extract actual image URLs from the Tabstats Dashboard case study page
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json

BASE_URL = "https://www.bcampbelldesigns.com/portfolio/tabstats-dashboard-companion"

def main():
    """Extract image URLs from the page."""
    print("=" * 70)
    print("Extracting Tabstats Dashboard Image URLs")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}\n")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(BASE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        print("[OK] Page loaded successfully\n")
        
        # Find all images
        all_images = soup.find_all('img')
        
        # Image categories
        detailed_view_images = []
        design_system_images = []
        other_images = []
        
        # Keywords to identify image types
        detailed_keywords = [
            'home', 'favorites', 'match-view', 'no-recent', 'timeline', 
            'scoreboard', 'player-not-found', 'player-stats', 'cheaters',
            'matchmaking', 'profile-switch', 'recent-searches', 'search-results',
            'spectate', 'companion-app', 'overwolf'
        ]
        
        design_system_keywords = [
            'damage-report', 'general', 'match-details', 'match-view',
            'profile', 'scoreboard', 'search', 'settings', 'table-items',
            'application-frame', 'companion-app'
        ]
        
        print("Found images:\n")
        
        for img in all_images:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if not src or src.startswith('data:'):
                continue
            
            # Handle relative URLs
            if not src.startswith('http'):
                src = urljoin(BASE_URL, src)
            
            filename = urlparse(src).path.lower()
            
            # Skip small images (icons, logos)
            if any(skip in filename for skip in ['logo', 'icon', 'favicon', 'avatar', 'social', 'brandon']):
                continue
            
            # Categorize images
            is_detailed = any(keyword in filename for keyword in detailed_keywords)
            is_design_system = any(keyword in filename for keyword in design_system_keywords)
            
            if 'overwolf' in filename:
                print(f"  [OLD VERSION] {src}")
                other_images.append(src)
            elif is_design_system:
                print(f"  [DESIGN SYSTEM] {src}")
                design_system_images.append(src)
            elif is_detailed or 'tabstats' in filename or 'companion' in filename:
                print(f"  [DETAILED VIEW] {src}")
                detailed_view_images.append(src)
            else:
                # Check parent context
                parent = img.find_parent()
                if parent:
                    parent_text = parent.get_text().lower()
                    if 'design system' in parent_text or 'component' in parent_text:
                        print(f"  [DESIGN SYSTEM] {src}")
                        design_system_images.append(src)
                    elif 'detailed view' in parent_text or 'mockup' in parent_text:
                        print(f"  [DETAILED VIEW] {src}")
                        detailed_view_images.append(src)
                    else:
                        print(f"  [OTHER] {src}")
                        other_images.append(src)
        
        # Output JSON structure
        print("\n" + "=" * 70)
        print("Image URLs (JSON format):")
        print("=" * 70)
        print("\nDetailed View Images:")
        print(json.dumps(detailed_view_images, indent=2))
        print("\nDesign System Images:")
        print(json.dumps(design_system_images, indent=2))
        print("\nOther Images:")
        print(json.dumps(other_images, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
