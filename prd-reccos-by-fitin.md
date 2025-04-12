# **Product Requirement Document: Reccos by Fitin**

Version: Final 1.0  
Date: 2025-04-12  
Author: Eshan Jain  
Status: Approved for Development

---

### **1\. Introduction**

**1.1. Overview:**   
Reccos by Fitin is a strategic digital product within the Fitin Club ecosystem (fitin.club). It's designed as a curated, trusted repository of healthy food and beverage products, serving as practical alternatives to everyday dietary items (e.g., bread, ketchup, sweets, snacks). The platform empowers users to easily discover, research, and save healthier options that align with their goals and Fitin Club's philosophy of integrating sustainable health habits seamlessly into their lives.

**1.2. Background:**   
Fitin Club is dedicated to making healthy living accessible and sustainable. A significant challenge for our users and the wider health-conscious community is navigating the complex food market to find genuinely healthy choices. Misleading labels, overwhelming variety, and lack of time hinder progress towards better dietary habits. Reccos by Fitin directly tackles this by providing a clear, searchable, and expert-vetted database of recommended products, simplifying healthier eating choices and complementing Fitin Club's coaching services.

**1.3. Goals:**

* **Business Goals:**  
  * Enhance Fitin Club member value, engagement, and retention by providing a practical tool.  
  * Generate qualified leads for Fitin Club's personalized coaching services via an integrated WhatsApp connection point.  
  * Establish Fitin Club as an authoritative resource and thought leader in the practical healthy eating space.  
  * Drive organic user acquisition through Search Engine Optimization (SEO) over time.  
  * Increase the overall value proposition of the Fitin Club ecosystem.  
  * (Future Goal): Explore ethical affiliate partnerships for sustainable revenue generation.  
      
* **Product Goals:**  
  * Deliver a comprehensive, accurate, and intuitive search platform for healthy food alternatives.  
  * Enable users to efficiently find products by name, brand, category, meal type, and specific dietary attributes (tags).  
  * Provide a simple and effective "My Diet" bookmarking feature for users to save products for quick reference, shopping lists, or discussion with coaches.  
  * Create a low-friction pathway for users to request personalized guidance from Fitin coaches based on their saved products.  
  * Offer an efficient, secure, and user-friendly admin interface for managing the core data (products, categories, meal types) and user base.  
  * Build a technically sound foundation optimized for scalability and future SEO growth.

### **2\. Target Audience & User Personas**

**2.1. Primary Audience:**

* Existing Fitin Club members seeking practical product recommendations aligned with their coaching plans.  
* Health-conscious individuals actively researching healthier food swaps and alternatives online.  
* Individuals managing specific dietary needs (e.g., low-carb, gluten-free, vegan, high-protein, diabetic-friendly) needing compliant product suggestions available in their market.  
* Users looking for healthier options for specific meal times (e.g., healthy breakfast choices, guilt-free snacks, better dessert alternatives).


**2.2. User Personas (Examples):**

* **Priya (32, Busy Professional):** A Fitin Club member trying to lose weight. Struggles with finding healthy snacks and quick meal components during busy workdays. Needs quick, reliable recommendations easily searchable and available online. Values convenience and coach alignment.  
* **Rajesh (45, Health-Conscious Dad):** Not yet a Fitin member but follows health trends. Wants to reduce sugar and processed foods for his family. Needs easy-to-find alternatives for staples like breakfast cereals, ketchup, and evening snacks. Searches online for specific product types and brands.  
* **Anika (28, Fitness Enthusiast):** Tracks macros meticulously. Seeks high-protein, low-sugar alternatives for post-workout recovery and meal prep. Values detailed nutritional information and ingredient transparency. Often compares multiple product options before purchasing.

### **3\. User Problems & Use Cases**

**3.1. User Problems:**

* Difficulty discerning genuinely healthy products from those with misleading marketing/labels.  
* Time-consuming process of researching and comparing healthy alternatives across various brands and platforms.  
* Lack of a single, trusted, unbiased source for curated healthy product recommendations aligned with practical health goals.  
* Forgetting previously discovered suitable healthy options.  
* Needing a concrete list of potential products to discuss suitability with a diet coach.  
* Finding specific products that fit multiple criteria (e.g., "gluten-free bread available on Amazon").

**3.2. Key Use Cases:**

* **Searching for Alternatives**: User searches for "low carb bread" or "sugar-free chocolate".  
* **Browsing by Category**: User explores the "Healthy Snacks" or "Beverages" category.  
* **Filtering by Meal Type:** User filters for "Breakfast" options and applies a "High Protein" tag.  
* **Filtering by Multiple Criteria**: User searches for "Snacks", filters by "Vegan" and "Gluten-Free", and sorts by name.  
* **Finding Specific Brands/Products**: User searches for "Yogabar" or "Whole Truth Foods Muesli".  
* **Saving Products**: User finds a suitable almond milk and several protein bars, adding them to their "My Diet" list.  
* **Reviewing Saved Items**: User accesses "My Diet" before placing an online grocery order to remember choices.  
* **Accessing Purchase Links**: User clicks the Amazon deeplink on a product detail page to view or buy the item.  
* **Seeking Personalized Advice**: User reviews their "My Diet" list and clicks the button to connect with a Fitin coach via WhatsApp for specific recommendations.  
* **Admin Adding Product**: Admin adds a new keto flour, including brand, category ("Baking"), meal type ("All Day"), description, nutrition facts, ingredients, image, tags ("Keto-Friendly", "Low Carb", "Gluten-Free"), and deeplinks to its purchase page on Amazon and the brand's website.  
* **Admin Managing Taxonomies**: Admin adds a new "Condiments" category or edits the description of the "Snack" meal type.  
* **Admin Managing Users**: Admin updates a user's role from "Member" to "Admin".

### **4\. Functional Requirements**

**4.1. Core Platform**

* **FR1. Landing Page:**  
  * Clearly articulate the value proposition of Reccos by Fitin: "Discover Healthy Food Alternatives Recommended by Fitin Club".  
  * Prominent Call-to-Action (CTA) for Sign Up / Login.  
  * Visually aligned with fitin.club branding.  
  * May feature example categories or popular products.  
  * Links: Contact, Privacy Policy, Terms of Service, fitin.club (main site), Login/Sign Up.

* **FR2. Authentication (Login/Sign-up Flow):**  
  * Sign Up: Email & Password registration. Required: Name, Email, Password. Optional: Phone Number (consider privacy policy). Handled via Supabase Auth.  
  * Login: Email & Password login via Supabase Auth.  
  * Password Reset: Standard "Forgot Password" flow via email.  
  * Session Management: Secure session handling via Supabase Auth tokens.

* **FR3. Shared Components:**  
  * Header (Logged-Out): Logo (links to Landing Page), Login, Sign Up, Join Fitin (http://fitin.club/), Support (Contact Page).  
  * Header (Logged-In Member): Logo (links to Product Search Page), Home (Product Search Page), My Diet, Profile, Join Fitin (http://fitin.club/), Support (Contact Page), Logout.  
  * Header (Logged-In Admin): Logo (links to Product Search Page), Home (Product Search Page), Product Dashboard, Users, Categories, Meal Types, Profile, Support (Contact Page), Logout.  
  * Footer: Copyright © Fitin Club \[Year\], Links to Privacy Policy, Terms of Service, Contact Us, fitin.club.

**4.2. User-Facing Features (Member Role)**

* FR4. Product Search Page (Primary User Hub):  
  * FR4.1. Search Bar: Prominent search input for keywords (product name, brand, category). Implement auto-suggestions/type-ahead based on product names, brands, categories. Graceful handling of no results.  
      
  * FR4.2. Filtering: Ability to apply multiple filters simultaneously. Filters panel clearly visible.  
    * Category: Multi-select checkboxes/pills (Data from categories table).  
    * Meal Type: Multi-select checkboxes/pills (Data from meal\_types table).  
    * Brand: Multi-select checkboxes/pills (Dynamically populated from distinct brand\_name in products).  
    * Dietary Tags: Multi-select checkboxes/pills (Populated from distinct tags in products.dietary\_tags array. e.g., Low Carb, High Protein, Gluten-Free, Vegan, Sugar-Free, Keto-Friendly, Organic, Dairy-Free).  
        
  * FR4.3. Sorting: Dropdown to sort results. Options: Relevance (default), Name (A-Z), Name (Z-A). (Future: Date Added, Popularity).  
      
  * FR4.4. Product Listing Display: Grid or list view (user choice potentially future). Each item shows: Product Image (thumbnail), Product Name, Brand Name, Key Dietary Tags, Category. Includes an "Add to Diet" icon/button. Clicking the item navigates to the Product Detail Page (FR5). Pagination for large result sets.

* **FR5. Product Detail Page (PDP):**  
  * Dedicated page for a single product. Clean, readable layout.  
      
  * FR5.1. Core Information: Product Name (H1 tag), Brand Name, High-Quality Product Image(s) (carousel if multiple).  
      
  * FR5.2. Detailed Description: Full product description (rich text potentially future).  
      
  * FR5.3. Nutritional Information: Clearly presented table/section showing key facts per serving (Serving Size, Calories, Protein, Carbs, Net Carbs \[if applicable\], Fat, Saturated Fat, Sugar, Fiber). Sourced from products.nutritional\_info.  
      
  * FR5.4. Ingredients List: Display the full ingredients list.  
      
  * FR5.5. Dietary Tags: List all applicable dietary tags clearly.  
      
  * FR5.6. Category & Meal Types: Display assigned category and meal type(s).  
      
  * FR5.7. Platform Links ("Where to Buy"): Section displaying buttons/links for each platform.  
    * Each link uses the specific deeplink URL stored in products.platform\_links to open the exact product page on the external site (e.g., Amazon, BigBasket, Brand's own store) in a new tab.  
    * Displays the platform name (e.g., "Buy on Amazon").

    

  * FR5.8. "Add to Diet" Button: Prominent button. Toggles state (e.g., "Add to My Diet" / "Added ✓ / Remove"). Persists user's choice in user\_saved\_products.  
      
* FR6. My Diet Page:  
  * Displays a list/grid of all products the logged-in user has saved.  
  * Each item shows basic info (Image, Name, Brand) and links back to its PDP (FR5).  
  * Provides a clear "Remove" button/icon for each product.  
  * FR6.1. "Get Diet Recommendation" Button:  
    * Prominent CTA: "Get Diet Recommendation from Fitin Coaches".  
    * Action: Redirects user to Fitin Coach WhatsApp: https://wa.me/8700509361.  
    * (Recommended) Pre-fill a message: "Hi Fitin Coach, I'd like help incorporating products from my Reccos list." (Avoid sending user PII directly in URL).

* FR7. User Profile Page:  
  * Displays: Name, Email (read-only), "Joined Since" (registration date).  
  * (Future) Link to Account Settings (Password change, etc.).


**4.3. Admin-Facing Features (Admin Role)**

* FR8. Admin Login: Secure login mechanism distinct from member login, accessible only to users with the 'ADMIN' role.  
    
* FR9. Admin Dashboard: Main landing page for admins. Provides quick links/overview to: Manage Products, Manage Categories, Manage Meal Types, Manage Users. (Future: Basic stats).  
    
* FR10. Product Management:  
  * FR10.1. View All Products: Paginated table displaying all products. Columns: Image Thumbnail, Name, Brand, Category, Meal Types, Status, Date Modified. Functionality: Search/Filter (by Name, Brand, Category, Meal Type, Status), Edit, Delete (soft delete preferred).  
      
  * FR10.2. Add/Edit Product Form: Comprehensive form with validation.  
    * Fields: Product Name (Text, Required), Brand Name (Text, Required), Category (Dropdown/Select from categories, Required), Meal Types (Multi-select from meal\_types, Required), Description (Text Area), Ingredients List (Text Area), Nutritional Information (JSONB input / Structured fields \- Required), Product Image (Upload to Supabase Storage), Dietary Tags (Tags input \- allow predefined & careful addition of new ones), Platform Links (Repeater field for \[{ "name": "Platform Name", "url": "DEEPLINK\_URL" }\] \- URL validation needed), Status (Dropdown: Draft, Published \- Required), Slug (auto-generated from name, editable).

* FR11. Category Management:  
  * FR11.1. View/Add/Edit/Delete Categories: Simple CRUD interface for the categories table (Name, Description, Slug). Prevent deletion if products are assigned.


* FR12. Meal Type Management:  
  * FR12.1. View/Add/Edit/Delete Meal Types: Simple CRUD interface for the meal\_types table (Name, Slug). Prevent deletion if products are assigned via the join table.


* FR13. User Management:  
  * FR13.1. View All Users: Paginated table. Columns: Name, Email, Phone (if available), Role, Joined Date. Functionality: Search/Filter (by Name, Email, Role).  
      
  * FR13.2. Edit User: Ability to modify Name, Phone (if applicable), and User Role (Member/Admin).  
      
  * FR13.3. Delete User: Ability to delete users (consider implications \- soft delete preferred).  
      
  * FR13.4. Add User: Manual user creation capability (optional).  
    

**4.4. Other Pages**

* FR14. Contact Page: Simple form (Name, Email, Subject, Message) submitting to a designated Fitin Club email or backend endpoint. Display contact info (Fitin Club support email/phone).  
    
* FR15. Join Fitin Redirect: Menu item/link that directly navigates the user to [http://fitin.club/](http://fitin.club/).


### **5\. Non-Functional Requirements**

**5.1. Performance:**

* Search results and page loads (LCP) should be under 3 seconds.  
* Database queries optimized using appropriate indexing (see Schema section).  
* Efficient loading of images (optimized formats like WebP, appropriate sizing).


**5.2. Scalability:**

* Architecture must support growth to 10,000+ products and 50,000+ users without major refactoring. Leverage serverless scaling of Vercel and Supabase capabilities.

**5.3. Usability & Accessibility:**

* Intuitive navigation, clear information hierarchy.  
* Fully responsive design (Desktop, Tablet, Mobile).  
* Adherence to WCAG 2.1 Level AA accessibility standards (color contrast, keyboard navigation, ARIA attributes where needed, semantic HTML).  
* Reflect Fitin Club's supportive and easy-to-understand communication style.

**5.4. Security:**

* Secure authentication and session management via Supabase Auth.  
* Implementation of Row Level Security (RLS) in Supabase to enforce data access policies (users only see their saved items, admins have broader access).  
* Protection against common web vulnerabilities (XSS, CSRF, etc.) using framework features and best practices.  
* HTTPS enforced.  
* Data privacy compliance (relevant regulations like GDPR if applicable).

**5.5. Maintainability:**

* Well-structured, documented TypeScript code generated/managed via Cursor AI.  
* Consistent coding style enforced (e.g., via ESLint/Prettier).  
* Codebase managed in GitHub with a clear branching strategy (e.g., Gitflow).  
* Utilize reusable components.

**5.6. Reliability:**

* High availability leveraging Vercel and Supabase infrastructure.  
* Graceful error handling and user feedback for failures (e.g., failed data fetch).

**5.7. Search Engine Optimization (SEO):**

* Goal: Drive organic traffic by ranking for product and category-specific search terms.  
* Requirements:  
  * Semantic HTML5.  
  * Dynamic meta tags (Title, Description) for PDPs, Category pages, Meal Type pages. (e.g., PDP Title: "\[Product Name\] \- Healthy \[Category\] Alternative | Reccos by Fitin").  
  * User-friendly and keyword-rich URL structures (e.g., /product/\[product-slug\], /category/\[category-slug\], /meal-type/\[meal-type-slug\]). Utilize slugs defined in the DB.  
  * Generation of robots.txt and dynamic sitemap.xml (including all published product, category, meal type pages).  
  * Internal linking between related products/categories.  
  * Optimize images (ALT tags, file size).  
  * Fast page load speeds (Core Web Vitals).  
  * (Post-MVP) Implement Product Schema.org structured data on PDPs.

### **6\. Design & UX Considerations**

**6.1. Branding:**   
Strict adherence to Fitin Club's visual identity (fitin.club as reference: logo, colors, typography, imagery style, tone of voice \- supportive, clear, expert, actionable).

**6.2. User Interface:**   
Clean, minimalist, modern, trustworthy. Emphasis on high-quality product images and scannable information (nutrition, tags). Avoid clutter.

**6.3. Information Architecture:**   
Logical site structure and navigation. Easy discovery path (Search/Browse \-\> Filter \-\> List \-\> Detail). Clear distinction between user and admin areas.

**6.4. Mobile-First Approach:**   
Design and develop prioritizing the mobile experience, ensuring full functionality and readability on smaller screens, then adapt for tablet/desktop.

### **7\. Data & Analytics Requirements**

**7.1. Key Metrics to Track:**

* User Acquisition: Signups, Organic Traffic sources (via Google Analytics/Search Console).  
* Engagement: Logins, Searches performed (top queries, queries with no results), PDP Views (top products), Filter/Tag usage (popular criteria), "Add to Diet" actions, "My Diet" page views.  
* Conversion: Clicks on platform deeplinks (per product, per platform), Clicks on "Get Diet Recommendation" WhatsApp button.  
* Admin Activity: Product additions/updates frequency.  
* Technical: Page load times, Bounce Rate.

**7.2. Tools:**   
Vercel Analytics (built-in), Google Analytics (essential for SEO and detailed user behavior), Supabase query logs/dashboard.

### **8\. Technical Stack & Architecture**

8**.1. Development Assistance:** Cursor AI (Leveraging its understanding of the selected stack).

**8.2. Frontend Framework**: Next.js (React) \- Chosen for built-in routing, SSR/SSG for SEO, API routes, Vercel synergy, performance, and large community support.

**8.3. UI Styling**: Tailwind CSS \- Utility-first CSS framework for rapid development and consistent design implementation.

**8.4. UI Components**: Shadcn/ui \- Accessible, customizable React components built on Tailwind CSS and Radix UI for building the UI efficiently.

**8.5. State Management**: React Context API for simple global state (like auth status), Zustand or Valtio for more complex client-side state if needed. Leverage Next.js Server Components and Route Handlers extensively.

**8.6. Language**: TypeScript \- For strong typing, improved code quality, maintainability, and enhanced AI assistance.

**8.7. Backend-as-a-Service (BaaS)**: Supabase

* Database: PostgreSQL  
* Authentication: Supabase Auth (Email/Password)  
* Storage: Supabase Storage (for product images)  
* APIs: Auto-generated REST API via PostgREST, Supabase JS client library. Supabase Edge Functions if custom server-side logic beyond basic CRUD is needed.  
* Security: Row Level Security (RLS) policies are critical and must be implemented.

**8.8. Version Control**: GitHub.

**8.9. Deployment**: Vercel (Native integration with Next.js and GitHub).

### **9\. Database Schema (Supabase/PostgreSQL)**

public.categories

* id (UUID, PK, default: gen\_random\_uuid())  
* name (Text, Not Null, Unique)  
* description (Text, Nullable)  
* slug (Text, Not Null, Unique) \- Indexed  
* created\_at (Timestamptz, default: now())  
* updated\_at (Timestamptz, default: now())

public.meal\_types

* id (UUID, PK, default: gen\_random\_uuid())  
* name (Text, Not Null, Unique)  
* slug (Text, Not Null, Unique) \- Indexed  
* created\_at (Timestamptz, default: now())  
* updated\_at (Timestamptz, default: now())

public.products

* id (UUID, PK, default: gen\_random\_uuid())  
* name (Text, Not Null) \- Indexed (for search)  
* slug (Text, Not Null, Unique) \- Indexed  
* brand\_name (Text, Not Null) \- Indexed (for filtering/search)  
* description (Text, Nullable)  
* ingredients (Text, Nullable)  
* image\_url (Text, Nullable) \- Path/URL in Supabase Storage  
* category\_id (UUID, Not Null, FK references categories(id)) \- Indexed  
* nutritional\_info (JSONB, Nullable, default: '{}') \- Structure:   
* dietary\_tags (TEXT\[\], Nullable, default: '{}') \- Indexed (GIN index for array searching)  
* platform\_links (JSONB, Nullable, default: '\[\]') \- Structure:   
* status (ENUM('DRAFT', 'PUBLISHED'), Not Null, Default: 'DRAFT') \- Indexed  
* created\_at (Timestamptz, default: now())  
* updated\_at (Timestamptz, default: now())  
* created\_by (UUID, Nullable, FK references auth.users(id))

public.product\_meal\_types (Join Table)

* product\_id (UUID, Not Null, FK references products(id) ON DELETE CASCADE)  
* meal\_type\_id (UUID, Not Null, FK references meal\_types(id) ON DELETE CASCADE)  
* PRIMARY KEY (product\_id, meal\_type\_id) \- Implicitly indexed

public.user\_saved\_products ("My Diet")

* user\_id (UUID, Not Null, FK references auth.users(id) ON DELETE CASCADE)  
* product\_id (UUID, Not Null, FK references products(id) ON DELETE CASCADE)  
* saved\_at (Timestamptz, default: now())  
* PRIMARY KEY (user\_id, product\_id) \- Implicitly indexed

(Note: *auth.users table is managed by Supabase Auth. Custom user profile data like full\_name, phone\_number, role can be stored in auth.users.raw\_user\_meta\_data or a separate public.profiles table linked via the user\_id)*

### **10\. Release Criteria / Definition of Done (MVP)**

* All functional requirements for Member and Admin roles (Sections 4.2, 4.3) are implemented, tested, and functional as described.  
* Core platform elements (Landing, Auth, Headers, Footer, Contact) are complete.  
* Product Search includes functioning Search, Filter (Category, Meal Type, Brand, Tags), and Sort capabilities.  
* Product Detail Pages display all required information, including working deeplinks.  
* "My Diet" functionality (Add, View, Remove, WhatsApp CTA) is working correctly.  
* Admin can fully manage Products (incl. meal types, tags, images, deeplinks), Categories, Meal Types, and Users (incl. roles).  
* Basic SEO foundations are in place (Semantic HTML, Dynamic Meta Tags for PDP/Category/Meal Type, robots.txt, sitemap.xml, clean URLs).  
* Responsive design is verified across target devices (Desktop, Tablet, Mobile) and major browsers (Chrome, Firefox, Safari).  
* Supabase Row Level Security policies are implemented and tested for data security.  
* Code reviewed, merged to the main branch on GitHub, and deployed successfully to Vercel production.  
* Essential analytics (Signups, Page Views, Searches, Adds to Diet, WhatsApp Clicks) are tracked.  
* Initial database populated with a minimum of 50-100 high-quality, diverse products with accurate data and verified deeplinks.  
* No critical or blocker bugs outstanding.

### **11\. Future Considerations / Out of Scope for V1**

* User ratings and reviews for products.  
* Advanced filtering (e.g., by specific nutrient ranges, allergens).  
* Personalized product recommendations ("You might also like...").  
* Direct e-commerce integration (beyond deeplinks).  
* Affiliate link tracking and management.  
* Barcode scanning feature (likely mobile app).  
* Integration with user health data/goals from the core Fitin Club platform (if applicable).  
* Enhanced user profile/account settings.  
* Advanced admin dashboard analytics.  
* Social sharing features for products.  
* Product comparison feature.  
* Allowing user suggestions for products to be added.  
* Implementation of Schema.org structured data.

### **12\. Glossary**

* BaaS: Backend-as-a-Service  
* CTA: Call to Action  
* CRUD: Create, Read, Update, Delete  
* Deeplink: A specific URL that directs to a product's purchase page on an external platform.  
* MVP: Minimum Viable Product  
* PDP: Product Detail Page  
* PRD: Product Requirement Document  
* RLS: Row Level Security  
* SEO: Search Engine Optimization  
* Slug: A user-friendly and URL-safe string derived from a name (e.g., "low-carb-bread").  
* UI: User Interface  
* UX: User Experience

