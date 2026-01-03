# Project Image Scraper Instructions

## Quick Start

1. **Install dependencies** (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the scraper**:
   ```bash
   python scrape_project_images.py
   ```

## What the Script Does

1. **Reads your projects** from `data/projects.ts`
2. **Scrapes** `https://www.bcampbelldesigns.com/` for project thumbnails
3. **Matches** images to projects using fuzzy title matching
4. **Downloads** images to `public/images/projects/`
5. **Renames** files to SEO-friendly slugs (e.g., `caesars-palace-online-casino.jpg`)
6. **Outputs** updated `image` paths for your `projects.ts` file

## Output

After running, the script will:
- Download images to `public/images/projects/`
- Print updated `image` field values you can copy into `projects.ts`
- Show a summary of successful downloads and any failures

## Manual Steps

If some images aren't found automatically:
1. Manually download them from your old site
2. Place them in `public/images/projects/`
3. Name them using the slug format (e.g., `project-title.jpg`)
4. Update the `image` field in `projects.ts` to `/images/projects/project-title.jpg`
