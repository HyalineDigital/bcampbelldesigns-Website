# Design Vision & Art Direction
## bcampbelldesigns.com Portfolio Redesign

---

## 1. The Aesthetic & Vibe

### Concept Name: **"Neo-Minimal Precision"**

A design direction that combines **Swiss precision** with **gaming dynamism**—where clean, methodical layouts meet subtle, sophisticated motion. This aesthetic positions you as a designer who understands both the technical rigor of enterprise product design and the engaging, user-centric approach of gaming/entertainment platforms.

### Visual Strategy: Bridging Two Worlds

**The Challenge:** Your portfolio spans **IcyVeins** (gaming/esports) and **Caesars Palace** (premium entertainment) to **National Forest Foundation** (mission-driven work). We need an aesthetic that doesn't pigeonhole you into one category.

**The Solution:** Use a **premium baseline** (clean, minimal, high-end) with **strategic moments of dynamism**. Think of it like a luxury car: refined and sophisticated at rest, but hints at power and precision when you interact with it.

- **Base State:** Clean, minimal, lots of whitespace, refined typography
- **Interactive State:** Subtle but noticeable animations that feel intentional and polished
- **Gaming Projects:** Can lean slightly darker/edgier without breaking the system
- **Enterprise Projects:** Can feel more spacious and premium
- **Mission-Driven Projects:** Can feel warmer, more approachable

This creates a **portfolio that adapts its energy** based on context while maintaining a consistent, professional identity.

### Color Palette

#### Primary Palette
- **Background (Light Mode):** `#FFFFFF` (Pure white) with subtle `#FAFAFA` for sections
- **Background (Dark Mode):** `#0A0A0A` (Near-black) with `#141414` for elevated sections
- **Primary Text (Light):** `#171717` (Charcoal black—slightly softer than pure black)
- **Primary Text (Dark):** `#EDEDED` (Off-white for reduced eye strain)
- **Secondary Text:** `#6B6B6B` (Mid-gray for descriptions, metadata)

#### Accent Colors (Strategic & Minimal)
1. **Electric Blue** `#2563EB` 
   - Primary accent for links, hover states, CTAs
   - High contrast, accessible
   - Works for both gaming (tech-forward) and enterprise (trust, stability)

2. **Accent Gradient** (for special moments)
   - `#2563EB` → `#7C3AED` (Blue to Purple)
   - Used sparingly: hero text, featured project highlights, key interactions
   - Adds that "fancy" touch without overwhelming

#### Support Colors
- **Success/Positive:** `#10B981` (Emerald—minimal use)
- **Warning/Caution:** `#F59E0B` (Amber—minimal use)
- **Border/Divider:** `#E5E5E5` (Light Mode) / `#262626` (Dark Mode)

**Dark Mode Strategy:** Default to **dark mode** with a toggle. Dark mode feels more premium for a designer's portfolio and aligns with gaming/esports aesthetics while still feeling sophisticated enough for enterprise clients.

---

## 2. Typography & Layout

### Font Pairing

#### Heading Font: **Inter** (Google Fonts)
- **Why:** Geometric, highly legible, feels modern without being trendy
- **Weights:** 600 (Semibold) for section headers, 700 (Bold) for hero, 800 (Extra Bold) for rare emphasis
- **Use Cases:** Page titles, project titles, section headers

#### Body Font: **Inter** (same family, different weight)
- **Why:** Consistency is key. Inter works beautifully at all sizes. No font-switching means better performance and a cleaner feel.
- **Weights:** 400 (Regular) for body, 500 (Medium) for emphasis, 600 (Semibold) for small caps/labels
- **Use Cases:** Descriptions, paragraphs, metadata

**Alternative Consideration:** If you want more distinction, use **Manrope** (headings) + **Inter** (body). Manrope has slightly more character while remaining professional.

#### Typography Scale
- **Hero Title:** `clamp(3rem, 8vw, 6rem)` (fluid, massive on large screens)
- **Section Headers:** `clamp(2rem, 5vw, 3.5rem)`
- **Project Titles:** `clamp(1.5rem, 3vw, 2rem)`
- **Body Text:** `1.125rem` (18px) for comfortable reading
- **Small Text/Metadata:** `0.875rem` (14px)

**Letter Spacing:**
- Headings: `-0.02em` (tighter for modern feel)
- Body: `0` (default)
- Small caps/labels: `0.05em` (slightly spaced)

### The Grid: **Asymmetric Bento Box System**

Not a strict masonry, not a boring uniform grid. Instead, a **flexible, asymmetric grid** inspired by Bento boxes (like Apple's design language) but with dynamic sizing based on project importance.

#### Grid Strategy:
- **Featured Projects (Homepage):** Mix of large (2 columns × 2 rows) and standard (1 column × 1 row) cards
- **All Projects (Work Page):** Uniform cards (1:1 aspect ratio) with optional filtering
- **Responsive Behavior:**
  - Mobile: Single column, full width
  - Tablet: 2 columns
  - Desktop: 3 columns (or mixed sizes on homepage)

#### Card Aspect Ratios:
- **Large Featured:** 16:9 (landscape, for hero projects)
- **Standard:** 4:3 (classic portfolio ratio)
- **Small/Secondary:** 1:1 (square, for supporting projects)

**Rationale:** The asymmetric approach creates visual interest and hierarchy without being chaotic. The strict 4:3 ratio for most cards ensures consistency, while the occasional large card breaks monotony and emphasizes key work.

---

## 3. Motion Design (The "Fancy" Part)

### Hero Section Animation

**Sequence (Total: ~1.2 seconds):**

1. **Initial State (0ms):** Page loads, everything hidden
2. **Background Fade (0-300ms):** Smooth fade-in of background color
3. **Name Enters (200-600ms):** 
   - "Brandon Campbell" slides up from `y: 30px` with opacity fade
   - Easing: `easeOut`, Duration: `400ms`
   - Font weight animates from 400 → 700 (subtle, adds impact)
4. **Tagline Enters (500-900ms):**
   - "UI/UX & Product Designer" fades in + slides up (`y: 20px`)
   - Slight delay creates hierarchy
5. **Description Enters (700-1100ms):**
   - Body text fades in, no slide (more subtle)
6. **Subtle Pulse (1100ms+):**
   - Optional: Very subtle, slow-moving gradient overlay on text (if using gradient accent)

**Technical Notes:**
- Use `framer-motion` `staggerChildren` for sequential reveal
- Reduce motion for users with `prefers-reduced-motion`
- No animation on scroll—keep hero static for initial impact

### Hover Effects: Project Cards

**Multi-Stage Interaction:**

1. **Rest State:**
   - Card sits flat with subtle shadow (`0 4px 6px rgba(0,0,0,0.05)`)
   - Image has slight desaturation (90% saturation) for that "premium" muted look

2. **Hover State (Mouse Enter):**
   - **Card Lift:** Translates `y: -12px` over `300ms` with `easeOut` easing
   - **Shadow Elevation:** Shadow grows to `0 20px 40px rgba(0,0,0,0.12)` (card feels elevated)
   - **Image Scale:** Image scales to `1.08` (slight zoom-in) with `transform-origin: center`
   - **Image Saturation:** Returns to 100% (image "comes alive")
   - **Overlay:** Subtle dark overlay appears (`rgba(0,0,0,0.1)`) over image
   - **Cursor Change:** Cursor becomes a custom "arrow-diagonal" icon (optional, adds polish)

3. **Content Reveal (If Applicable):**
   - Category tag slides up slightly
   - Project title gets a subtle underline animation (draws from left to right)
   - Description text becomes slightly bolder (400 → 500 weight)

4. **Exit (Mouse Leave):**
   - Reverse animation, slightly faster (`250ms`) for snappy feel

**Advanced Option (for "fancy" factor):**
- If project has multiple images: On hover, image crossfades to second image after 1 second
- Creates a "preview" effect that encourages clicking

### Page Transitions

**Homepage → Case Study Page:**

1. **Exit Animation (Homepage):**
   - Clicking a project card triggers:
     - Selected card scales up slightly (`1.05`) and fades out (`opacity: 0`)
     - Other cards fade out simultaneously (`opacity: 0`, `duration: 300ms`)
     - Background fades to target page color (if different)

2. **Shared Element Transition:**
   - The clicked project's image expands from its card position to fill the viewport
   - Creates a "zoom into project" effect
   - Uses `framer-motion` `AnimateSharedLayout` or `layoutId` prop

3. **Enter Animation (Case Study Page):**
   - Hero image of case study fades in (from the expanded image)
   - Content slides up from bottom (`y: 40px` → `y: 0`) with stagger
   - Page feels like it "unfolds" from the selected project

**Case Study → Homepage:**

- Reverse animation: Image collapses back to grid position
- Smooth, feels like "zooming out"

**Technical Implementation:**
- Use Framer Motion's `AnimatePresence` for page transitions
- Add a subtle page blur during transition (optional, adds depth)
- Duration: `600ms` total (fast enough to feel responsive, slow enough to feel intentional)

---

## 4. Wireframe Description: Homepage User Journey

### Top-to-Bottom Walkthrough

#### **1. Navigation Bar (Sticky, Top)**
- **Position:** Fixed at top, becomes visible on scroll (fade-in)
- **Content:** 
  - Left: "BC" or "Brandon Campbell" (logo/text, minimal)
  - Right: Navigation links (Work | About | Contact)
  - Optional: Dark mode toggle (icon, top-right)
- **Style:** Transparent background with backdrop blur on scroll
- **Behavior:** Links have subtle underline animation on hover

#### **2. Hero Section (Full Viewport Height)**
- **Layout:** Centered vertically and horizontally
- **Content:**
  - **Large Hero Text:** "Brandon Campbell" (massive, bold, gradient or solid)
  - **Tagline:** "UI/UX & Product Designer" (smaller, lighter weight)
  - **Short Description:** One-line value prop (e.g., "Crafting thoughtful digital experiences through user-centered design")
  - **Optional CTA:** "View Work" button (subtle, outlined style) that smoothly scrolls to projects
- **Background:** Solid color (white or dark) with optional subtle gradient overlay
- **Animation:** As described in Motion Design section

#### **3. Featured Projects Grid (Main Content)**
- **Section Header:**
  - "Selected Works" (large, bold)
  - Brief subtitle (e.g., "A curated selection of recent design work")
  - Centered, generous spacing above grid

- **Grid Layout:**
  - **Desktop:** 3-column grid with one large featured card (spans 2 columns × 2 rows) and standard cards
  - **Example Layout:**
    ```
    [   Large Featured   ] [ Standard ]
    [   (IcyVeins)       ] [ Standard ]
    [ Standard ] [ Standard ] [ Standard ]
    ```
  - Cards have hover effects as described
  - Each card shows: Image, Category tag, Title, Brief description

- **Scroll Behavior:**
  - Cards animate in as user scrolls (staggered entrance)
  - Smooth, subtle animations (no jarring pop-ins)

#### **4. About Teaser (Optional, Before Footer)**
- **Layout:** Split screen or centered text block
- **Content:** 
  - "About" section title
  - 2-3 sentence teaser about your background/philosophy
  - "Read More" link → About page
- **Visual:** Minimal, lots of whitespace

#### **5. Footer**
- **Content:**
  - Social links (LinkedIn, Medium, etc.) as icons
  - Copyright notice
  - Optional: Email contact
- **Style:** Minimal, subtle, doesn't compete with main content

### Navigation Behavior

- **Sticky Nav:** Navigation stays fixed while scrolling
- **Smooth Scroll:** Internal links use smooth scroll behavior
- **Active States:** Current page link is highlighted (subtle underline or color change)
- **Mobile:** Hamburger menu (animated, slides in from right)

### Responsive Considerations

- **Mobile (< 768px):** 
  - Single column layout
  - Hero text scales down but remains prominent
  - Navigation becomes hamburger menu
  - All cards full-width, stacked

- **Tablet (768px - 1024px):**
  - 2-column grid
  - Hero remains full-height but text scales appropriately

- **Desktop (> 1024px):**
  - Full asymmetric grid as described
  - Maximum content width: `1280px` (prevents text from being too wide)

---

## Design Principles Summary

1. **Less is More:** Every element earns its place. No decorative elements without purpose.
2. **Motion with Purpose:** Animations enhance usability and delight, never distract.
3. **Performance First:** Fast load times and smooth 60fps animations are non-negotiable.
4. **Accessibility:** WCAG AA compliance. Keyboard navigation, screen reader friendly, reduced motion support.
5. **Professional Yet Dynamic:** The site should feel like it could equally impress a gaming studio or a Fortune 500 company.

---

## Next Steps

Once you approve this direction (or request tweaks), we'll:
1. Build out the design system (color tokens, typography scale, spacing system)
2. Implement the components with these specifications
3. Create a style guide for consistency
4. Test animations and interactions
5. Optimize for performance and accessibility

**Ready for your feedback!** 🎨

