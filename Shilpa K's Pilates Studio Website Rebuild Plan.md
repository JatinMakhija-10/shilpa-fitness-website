# Shilpa K's Pilates Studio: Website Rebuild Plan

Prepared for Shilpa Kanodia. Version 1.0, 9 October 2026.

Basis: two website audits (4.5/10 and 5.5/10), the live site at shilpakanodia.com, the Face Yoga membership specification, five reference designs and shape-pilates.com.

## 1. Summary

**Goal.** Turn the site from a list of services into a system that takes a visitor from "is this for me" to a booked trial class.

**Two products in one build.**

1. The studio website (Phases 1 to 2): local lead generation for Goregaon, Malad and Kandivali.
2. The Face Yoga membership (Phase 3): paid online live classes with seven-day replays.

**Where the site stands today.**

- One page, one URL, built with Lovable. Services are anchors on that page, so nothing can rank on its own.
- Generic hero headline that fits any wellness studio.
- "Plans & Pricing" shows four plan names and no prices.
- Eleven different button labels for the same action (Book Trial, Book Your Trial, Book a Trial Class, Check Availability, Chat Now, WhatsApp Now and others).
- Testimonials are first name plus area, with no photo, date, link or review source.
- No FAQ, no service pages, no blog, no map, no credentials, no first-session explanation.
- Three studio photos and one portrait of Shilpa.

**Two things to confirm before work starts.**

1. The brief pasted into this chat describes the current site as having a strong funnel and clear pricing. Both audits and the live page say otherwise (no prices shown, scattered CTAs). This plan follows the audits.
2. The membership specification says the existing site is a custom Next.js build. The live site is a Lovable project. Confirm which codebase actually exists before scoping Phase 3.

**Proposed targets (set the real baseline in week 1; none exists today).**

| Metric | Target |
| --- | --- |
| Mobile Lighthouse performance | 90 or higher |
| Largest Contentful Paint on 4G mid-range Android | under 2.5 s |
| Trial enquiries per 100 visitors | baseline + 50% within 90 days of launch |
| Google reviews | 40 new real reviews within 90 days |
| Pages indexed with unique titles | 25 or more within 60 days |
| Enquiries that include a chosen service and area | 90% |

## 2. Decisions to lock first

Nothing below should be guessed by the designer or developer.

| # | Decision | Recommendation | Owner |
| --- | --- | --- | --- |
| 1 | Show prices on the site? | Yes. Show price, sessions, group size and validity for group plans. Keep 1-to-1 as "from" pricing if rates vary. | Shilpa |
| 2 | Is the studio only in Goregaon? | The site lists "Goregaon, Mumbai" as the location and serves Malad and Kandivali. Confirm whether batches run outside Goregaon. This decides how many location pages are honest to build. | Shilpa |
| 3 | Verified credentials | Collect certificates, years teaching, specialisations. Anything unverified stays off the site. | Shilpa |
| 4 | Trial class fee | Site says "fee adjustable in package". State the amount and the rule in plain words. | Shilpa |
| 5 | Group size | Site says small groups. Put the real number on the site. | Shilpa |
| 6 | Booking method at launch | Form plus WhatsApp. Real-time slot booking comes in Phase 2. | Jatin and Shilpa |
| 7 | Photo and video shoot | One half-day shoot with real clients (shot list in Section 15). Stock photos are not acceptable for hero, About or gallery. | Shilpa |
| 8 | Client consent | Written consent for names, photos and videos in testimonials. | Shilpa |
| 9 | Language | English first. Decide whether Hindi or Marathi versions are wanted later. | Shilpa |
| 10 | Face Yoga positioning | Studio class, online membership, or both. The membership spec assumes online. | Shilpa |
| 11 | Domain, hosting, accounts | Confirm who owns the domain, Google Business Profile, Instagram and WhatsApp Business account. | Shilpa |
| 12 | Codebase | Lovable or custom Next.js? See Section 1. | Jatin |

## 3. Positioning

**The problem to solve.** The audits agree: the site explains what the studio offers but not why a visitor should pick Shilpa. The fix is positioning plus proof, not decoration.

**Draft positioning (must be true before it is used).**

> The studio you can walk into as a complete beginner, taught in small groups by one coach who learns your name, your body and your history in the first class.

This rests on facts the current site already claims: small groups, personal attention, non-intimidating, safe for beginners, specialist classes for rehab and pregnancy. Shilpa confirms each one in the interview (Appendix B).

**Four core customers.** The audit asks for three to four. The current site lists eight. Merge them:

| Customer | What they fear | What they need to see | Landing page | CTA |
| --- | --- | --- | --- | --- |
| Desk-bound professional with back or neck pain | Making it worse; wasting money; not enough time | A clear plan, 45 minute batches, rehab credentials, timings near work | Rehab Pilates | Book a trial |
| Pregnant or new mother | Safety; being the only pregnant person; the baby's wellbeing | Trimester structure, doctor approval step, Shilpa's prenatal training | Prenatal Pilates | Book a trial |
| Gym-intimidated beginner | Looking foolish; not keeping up | A real first-session walkthrough, small group photos, a beginner batch | Pilates | Book a trial |
| Face Yoga seeker | Wasting time on something that does not work | Honest claims, a demo video, what a session involves | Face Yoga | Book a trial or Join online |

Nutrition guidance stays as a supporting line inside service pages, not a fifth pillar. The audit flags the broad targeting as a weakness.

## 4. Design direction

### 4.1 What to take from each reference

| Reference | Take | Leave |
| --- | --- | --- |
| EMPWR (warm neutral coaching site) | Beige and stone palette, split hero with a tall photo, large outlined marquee text between sections, "How it works" in three numbered steps, a "What's included" list | The thin uppercase body text, which is hard to read on phones |
| Fexuo (blush yoga site) | Full-bleed hero photo with white headline on the left, "programs made for women" framing, soft pink panels, stat tiles | Rounded card repetition, which the audit calls out as template-like |
| PeakFit (dark and orange coaching site) | Three-tier pricing with the middle plan highlighted, FAQ accordion, blog card row, oversized footer wordmark, transformation slider | The orange and black palette and the male-fitness tone |
| Dark fitness dashboard | Member portal layout: glass cards for streak, sessions this month, next class, replay countdown | Dark theme for the public site |
| Hot Core Pilates (maroon and pink) | Heavy display type with one script accent word, pill buttons, deep plum band with review cards, bold "Book your first class" repetition | The loud type scale, which is too aggressive for rehab and prenatal audiences |

**Resulting direction: warm editorial.** Calm neutral base from EMPWR, one deep plum accent from Hot Core, blush reserved for Face Yoga. Large photography does the work that cards do on a template.

### 4.2 Design system

| Token | Value | Use |
| --- | --- | --- |
| Cream | #F5F0E8 | Page background |
| Stone | #E4DACB | Alternate bands |
| Clay | #B8A38C | Lines and decoration only (fails contrast for text on cream) |
| Ink | #1E1A17 | All body text |
| Plum | #4A1D26 | Primary button, dark band, footer |
| Blush | #E8C9CB | Face Yoga sections, review band |

- **Headings:** Fraunces (variable serif). One italic accent word per page heading, used sparingly.
- **Body:** Manrope, 17 to 18 px on mobile, line height 1.6.
- **Buttons:** Plum pill, cream text, 48 px minimum height. Secondary is an outlined pill. WhatsApp is a text link with an icon.
- **Cards:** Allowed only for pricing, FAQ and member dashboard. Everywhere else use full-width bands, split layouts and photography.
- **Spacing:** An 8 px scale. Whitespace must look chosen: section padding of 96 px desktop and 64 px mobile, no empty columns.
- **Photography:** Natural light, real clients, real movement, faces visible when the client consents. No stock images in the hero, About or gallery.
- **Motion:** Fade and rise on scroll, 400 ms, disabled when the visitor prefers reduced motion. One muted hero loop of 6 to 8 seconds, under 2 MB, with a still poster.
- **Accessibility:** WCAG 2.2 AA, visible focus states, alt text that describes the movement, tap targets of 44 px or more.

## 5. What to borrow from Shape Pilates

Shape is an online membership (GBP 7.50 a month, 200 to 250 on-demand classes, weekly live classes, an app). Shilpa is a local studio with an online Face Yoga plan. Borrow the structure, not the scale.

| Shape Pilates does | Apply to Shilpa |
| --- | --- |
| One membership, one clear "Join" button | One primary "Book a trial" button, one "Join online" button on Face Yoga pages |
| Class library filtered by level, length, focus and mood | Phase 3 replay library with filters: level, length, focus (face, back, core, prenatal) |
| Live schedule as its own page | A public "Class schedule" page by batch, area and level |
| Short, warm member quotes with a first name and age line | Full-name reviews with area and date, beginner story first |
| Press logos strip | Only if real. If no press, use the Google rating and review count instead |
| Weekly plans and challenges | A 7-day beginner plan and a 14-day Face Yoga challenge as lead magnets |
| Kitchen recipes as a content pillar | A short "Eat well in an Indian kitchen" journal series, tied to the nutrition guidance already offered |
| Calm tone, short sentences, "even 10 minutes" framing | The same voice rules in Section 9 |
| App in the stores | Not in scope. A mobile-first member portal covers the need. |

## 6. Sitemap and navigation

```
Home
Pilates
  Group classes
  Semi-private
  Personal 1-to-1
Rehab Pilates
Prenatal Pilates
Face Yoga
  Studio classes
  Online membership (Phase 3)
Pricing
Schedule and locations
  Goregaon
  Malad (only if real batches exist)
  Kandivali (only if real batches exist)
About Shilpa
Reviews
Journal (blog)
FAQ
Book a trial
Member portal /my-classes (Phase 3)
Legal: Privacy, Terms, Cancellation, Recording notice
```

**Header.** Logo left. Links: Pilates, Rehab, Prenatal, Face Yoga, Pricing, About, Journal. Right side: WhatsApp icon and a plum "Book a trial" button. Mobile: logo, WhatsApp icon, menu. Sticky bottom bar after the hero scrolls out (see 7.16).

**Footer.** Services, locations with address and landmark, hours, Instagram (@pilatescoachshilpa), FAQ, legal links, a final "Book a trial" band and a large wordmark (PeakFit style).

## 7. Home page, section by section

Order follows the audit's conversion journey: recognition, differentiation, experience, proof, choice, action.

**7.1 Hero.**

- Purpose: tell the right person they are in the right place within five seconds.
- Layout: split. Left on cream with headline, one sentence, button and trust strip. Right a tall photo of Shilpa coaching a real client. On mobile the photo goes on top at about 50% of the screen height.
- Headline options to test (all rely on facts already on the site):
  - A: "Pilates for women who never felt at home in a gym."
  - B: "A stronger back, better posture, and a coach who knows your name."
  - C: "Beginner Pilates in Goregaon, in small groups."
- Support line: one sentence naming the services and the three areas.
- Buttons: "Book a trial" (primary), "WhatsApp Shilpa" (text link).
- Remove the three-line ticks ("Safe for beginners" and so on) from the hero. Move them to the trust strip.

**7.2 Trust strip.** One line under the hero. Four slots: Google rating with count, certification name, years teaching, clients coached. Show only verified figures. If a number does not exist yet, drop the slot rather than inventing it.

**7.3 Recognition ("This is for you if").**

- Four short statements, one per core customer, each with a photo and a link to its page.
- Layout: alternating image and text rows, not a grid of cards.
- Copy rule: write the situation, not the benefit. Example: "You sit for nine hours and your lower back tells you about it by 4 pm."

**7.4 Meet Shilpa (short).**

- Portrait of her coaching, three facts (training, years, specialisations), two sentences in her own voice, link to the About page.
- This replaces the current generic bio.

**7.5 How a class with Shilpa works (method).**

- Three principles in her words, taken from the interview. Large type, no icons.
- A short video of her explaining the approach, 30 to 45 seconds, captioned.

**7.6 Services.**

- Four full-width rows (Pilates, Rehab, Prenatal, Face Yoga), each with a photo of the actual movement, who it is for, what a session involves and a link.
- Face Yoga row uses the blush background.

**7.7 Your first session (4 steps).**

- EMPWR's three-step format, extended to four: 1. Message us, 2. Short intake (goals, injuries, pregnancy, doctor notes), 3. Trial class, 4. Choose a plan.
- Under each step, one line on what the client does and one on what Shilpa does.
- Add a "What to wear and bring" line.

**7.8 Proof.**

- Google rating and count, then a rail of three to six real reviews with full name (with consent), area, date and the service.
- One featured story with a photo and a specific detail, for example "I could sit through a two-hour meeting by week five."
- Link to the Reviews page.

**7.9 Pricing preview.**

- Three tiers, middle one highlighted as recommended (PeakFit pattern): Monthly Group, 3-Month, Semi-Private. 1-to-1 shown as a separate line below.
- Each tier lists price, sessions per week, group size, validity and a "Book a trial" button.
- Link to the full Pricing page.

**7.10 Schedule and locations.**

- Map, address, landmark, nearest station, parking note and batch timings.
- Area chips for Goregaon, Malad, Kandivali. Each chip opens the relevant location content only if batches exist there.

**7.11 Gallery.**

- Eight to ten images. At least six show people and movement. Equipment shots limited to two.
- Layout: masonry or an alternating wide and tall crop, no uniform grid.

**7.12 FAQ.**

- Eight questions: beginner suitability, what to wear, class length, class size, trial details, fees, prenatal rules, injury suitability.
- Accordion, first item open. FAQ schema in the page markup.

**7.13 Journal preview.** Three recent posts, each ending in a trial CTA on the post page.

**7.14 Final call to action.**

- Plum band. "Book a trial" button, short form below (name, WhatsApp number, area, service).
- One line on what happens next: "Shilpa replies within X hours with a slot." Shilpa sets the reply time.

**7.15 Footer.** See Section 6.

**7.16 Mobile sticky bar.**

- Appears after the hero leaves the screen. "Book a trial" (about 65% width) and WhatsApp (outline).
- Hidden while the booking form is on screen. Safe-area padding for iPhones.
