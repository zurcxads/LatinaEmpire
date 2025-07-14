# Creating Your First Content in Sanity Studio

## Step 1: Access Your Studio

Once your Studio is set up at your chosen URL (e.g., `https://latina-empire-studio.sanity.studio`), you'll see:

- **Events** - For managing event listings
- **Ambassadors** - For ambassador profiles  
- **Blog Posts** - For article content

## Step 2: Create Your First Event

### Click "Events" → "Create new Event"

Fill in these key fields:
- **Title**: "Latina Empire Leadership Workshop 2024"
- **Slug**: Click "Generate" (creates: latina-empire-leadership-workshop-2024)
- **Description**: Write a detailed description
- **Short Description**: Brief summary for previews
- **Location**: "Miami, FL"
- **Date**: Select a future date
- **Start Time**: "9:00 AM"
- **End Time**: "5:00 PM"
- **Ticket Price**: "$297"
- **Ticket Link**: Add your ticket URL
- **Location Address**: Full address
- **Is Past Event**: Leave unchecked for upcoming events

### Add Images:
- **Event Image**: Upload a main event image
- **Banner Image**: Upload a banner for the event page

### Host Information:
- **Host Name**: "Elena Rodriguez"
- **Host Title**: "Founder & CEO"
- **Host Image**: Upload host photo

Click **Publish** when ready!

## Step 3: Create Your First Ambassador

### Click "Ambassadors" → "Create new Ambassador"

Essential fields:
- **Name**: "Maria Gonzalez"
- **Slug**: Click "Generate"
- **Title**: "Senior Marketing Director"
- **Location**: "Los Angeles, CA"
- **Country**: "United States"
- **Quote**: Add an inspiring quote
- **Short Bio**: 2-3 sentences
- **Full Bio**: Detailed background
- **Years in Program**: 3
- **Events Hosted**: 12
- **Member Since**: "2021"

### Add Social Media:
- **Instagram**: username (without @)
- **LinkedIn**: username or full URL
- **Website**: Full URL

### Skills & Languages:
- **Languages**: ["English", "Spanish"]
- **Expertise**: ["Marketing", "Leadership", "Brand Strategy"]

### Images:
- **Profile Image**: Professional headshot
- **Banner Image**: Background image for profile

## Step 4: Create Your First Blog Post

### Click "Blog Posts" → "Create new Blog Post"

Key fields:
- **Title**: "5 Leadership Lessons Every Latina Professional Needs"
- **Slug**: Click "Generate"
- **Excerpt**: Brief summary (appears in previews)
- **Content**: Full article content
- **Author**: "Elena Rodriguez"
- **Author Title**: "Founder & CEO"
- **Date**: Today's date
- **Read Time**: "8 min read"
- **Category**: Select from dropdown (e.g., "Leadership")
- **Tags**: ["leadership", "career", "professional development"]
- **Featured**: Check if this should be featured
- **Featured Image**: Upload article image

## Step 5: Verify Content Appears

After creating content:

1. **Check your website** - content should appear automatically
2. **Test API endpoints**:
   - `/api/events` - should show your new event
   - `/api/ambassadors` - should show your new ambassador
   - `/api/blog` - should show your new blog post

## Pro Tips:

### SEO Optimization:
- Always fill in slugs (they create your URLs)
- Use descriptive titles and excerpts
- Add relevant tags and categories

### Image Best Practices:
- Use high-quality images (Sanity will optimize them)
- Images should be at least 1200px wide
- Use JPG for photos, PNG for graphics

### Content Strategy:
- Create a content calendar
- Use consistent categories and tags
- Feature your best content

## What Happens Next:

Your content will:
- ✅ Appear instantly on your website
- ✅ Be optimized for all devices
- ✅ Load fast from Sanity's global CDN
- ✅ Be easily editable anytime

## Need Help?

If content doesn't appear:
1. Check that you clicked "Publish" (not just "Save")
2. Verify your website is loading from Sanity (not JSON files)
3. Check browser developer tools for any errors

Your integration is fully functional - start creating content and watch your website come alive!