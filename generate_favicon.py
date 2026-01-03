"""
Script to generate favicon files from bc-logo.png
Creates multiple sizes for different devices and browsers.
"""

from PIL import Image
import os

# Input logo path
LOGO_PATH = "public/images/bc-logo.png"
APP_DIR = "app"

# Favicon sizes to generate
FAVICON_SIZES = {
    "icon.png": 32,
    "icon-16x16.png": 16,
    "icon-32x32.png": 32,
    "apple-icon.png": 180,  # Apple touch icon
}

def generate_favicons():
    """Generate favicon files from the logo."""
    if not os.path.exists(LOGO_PATH):
        print(f"Error: Logo not found at {LOGO_PATH}")
        return False
    
    # Open the logo
    try:
        logo = Image.open(LOGO_PATH)
        # Convert to RGBA if needed
        if logo.mode != 'RGBA':
            logo = logo.convert('RGBA')
        
        # Create app directory if it doesn't exist
        os.makedirs(APP_DIR, exist_ok=True)
        
        # Generate each favicon size
        for filename, size in FAVICON_SIZES.items():
            # Resize with high-quality resampling
            resized = logo.resize((size, size), Image.Resampling.LANCZOS)
            output_path = os.path.join(APP_DIR, filename)
            resized.save(output_path, "PNG")
            print(f"Generated: {output_path} ({size}x{size})")
        
        # Also create a favicon.ico file (multi-size ICO)
        # Create a list of sizes for the ICO file
        ico_sizes = [16, 32, 48]
        ico_images = []
        for size in ico_sizes:
            resized = logo.resize((size, size), Image.Resampling.LANCZOS)
            ico_images.append(resized)
        
        ico_path = os.path.join(APP_DIR, "favicon.ico")
        ico_images[0].save(
            ico_path,
            format='ICO',
            sizes=[(s, s) for s in ico_sizes]
        )
        print(f"Generated: {ico_path} (multi-size ICO)")
        
        print("\nAll favicon files generated successfully!")
        return True
        
    except Exception as e:
        print(f"Error generating favicons: {e}")
        return False

if __name__ == "__main__":
    generate_favicons()

