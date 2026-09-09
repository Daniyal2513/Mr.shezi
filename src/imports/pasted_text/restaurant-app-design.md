Create a modern, high-conversion, responsive single-page web application design and frontend architecture for "Mr. Shezi Restaurant" (a multi-cuisine restaurant specializing in BBQ, Mandi, Fast Food, Karahi, and Platters).

### 1. Brand Identity & Visual Design System
* **Color Hierarchy (60-30-10 Golden Rule):**
  * **60% Dominant Base:** Clean modern white / light neutral backdrop (`#FFFFFF` to `#F8F9FA`) with generous whitespace.
  * **30% Secondary Elements:** Deep charcoal/black (`#1A1A1A`) for navigation bars, card structures, high-contrast borders, and primary readable text.
  * **10% Brand Accent Pop:** Vibrant mustard yellow (`#F5A623`) and fiery red-orange (`#E64A19` / `#FF5722`) matching the physical neon restaurant signage, used exclusively for primary CTAs, promotional badges, pricing tags, active tabs, and highlight borders.
* **Background Artistry:**
  * Subtle, low-opacity, continuous floating food line-art vectors (burgers, BBQ skewers, pizza slices, karahi bowls) drifting gently in parallax as the user scrolls, creating visual depth without distracting from legibility.
* **Typography Hierarchy (60-30-10 Rule):**
  * **Headings (Display/H1-H3):** Tight-kerning, extra-bold Sans-Serif font (e.g., `Inter Display` or `Cabinet Grotesk` with letter-spacing `-0.03em`) for a premium culinary feel.
  * **Body Copy:** Balanced regular/medium weights (`Inter` or `Plus Jakarta Sans`, 400/500 weight) with clear line height for menu descriptions.
  * **Micro-copy & Badges:** Uppercase bold tracked fonts for tags (e.g., "POPULAR", "SPICY", "CHEF'S SPECIAL").

---

### 2. Onboarding Experience (Location Modal)
* **First-Visit Screen Blocker:**
  * Clean modal overlay over a blurred background on first load.
  * Card design themed in brand colors (white card, dark borders, orange/yellow CTA).
  * Prompts user: "Select your delivery location or branch (Karachi / Garden West Area)".
  * Dropdown selector + GPS autodetect button + "Done / Proceed to Menu" CTA.
  * Once submitted, smooth fade-out animation into the main one-page interface.

---

### 3. Header & Navigation (Sticky & Animated)
* **Navbar Layout:**
  * Left: Mr. Shezi logo badge.
  * Center: Smooth anchor-scroll links:
    * `Home`
    * `About Us`
    * `Menu`
    * `Track Order`
    * `Place Order`
    * `Client Reviews`
  * Right: Interactive `Cart` button with dynamic item-count badge and total price preview.
* **Sticky Micro-Interaction:** Navbar shrinks with a subtle glassmorphism effect on scroll.

---

### 4. Page Sections Architecture (One-Pager Flow)

* **Hero Section:**
  * Dynamic headline: "Authentic Flavors, Irresistible Taste."
  * High-res food showcase featuring platters, injected broast, loaded pizzas, and karahis.
  * Quick-action buttons: "Order Now" (scrolls to menu) & "Track My Order".

* **About Us Section:**
  * Brief visual storytelling highlighting Mr. Shezi's rich menu (160+ dishes: BBQ, Platters, Handi, Broast, and Fast Food) with hygiene and speed metrics.

* **Dynamic Menu & Interactive Slider:**
  * **Category Slider Bar:** Horizontal sticky scroll bar featuring category pills (e.g., BBQ Platters, Fast Food & Zingers, Broast, Karahi & Handi, Pizza & Starters, Rice & Mandi, Desserts & Beverages).
  * **Category Navigation:** Clicking any category smoothly auto-scrolls down to its dedicated section on the same page.
  * **Comprehensive Menu Cards:**
    * High-quality dish preview image, item name, portion size, and clear PKR pricing.
    * Animated "Add to Cart" button with instantaneous micro-feedback (plus/minus quantity toggle).
  * **Floating Sticky Bottom Bar:** Whenever at least 1 item is added, a sleek bottom drawer pops up showing: `[ X items | Rs. XXXX ] -> [ View Cart & Checkout ]`.

* **Place Order & Interactive Checkout Section:**
  * Multi-step checkout card:
    * **Step 1:** Order review (customizable notes, extra sauces/condiments).
    * **Step 2:** Customer details (Name, delivery address, phone number).
    * **Step 3:** Payment gateway selection:
      * Card Payment (Credit/Debit)
      * Online Transfer / Mobile Wallet
      * Cash on Delivery (COD)
    * Single-click confirmation trigger.

* **Live Order Tracking Section:**
  * Interactive tracking module with a search field: "Enter your Order ID / Phone Number".
  * Visual dynamic stepper timeline:
    * `Order Confirmed` ➔ `In the Kitchen` ➔ `Rider Dispatched` ➔ `Delivered`
  * Live status card with estimated delivery countdown and rider contact option.

* **Client Reviews Section:**
  * Social-proof testimonial grid displaying real customer reviews, star ratings (4.5+ average), and tags (e.g., "Best Mandi", "Juicy Broast", "Value Platters").

---

### 5. UI/UX Micro-Interactions & Responsiveness
* All cards feature smooth hover states (subtle scale `transform: scale(1.02)` and soft drop-shadow).
* Completely fluid mobile-first layout with tap-friendly touch targets.
* Rapid loading states with skeleton screens for images and smooth CSS scroll-behavior.