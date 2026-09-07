# Global PPT Generation from JSON

## 1. Overview & Purpose

This feature enables **instant, automated PowerPoint (.pptx) presentation generation** for any consultant or candidate profile stored in the application's verified JSON database (`data/portfolio-data.ts`).

### Zero-Upload Architecture
- **No template upload needed**: The application directly renders the pixel-perfect PowerPoint slide matching the official corporate format specified by your reference image.
- **Single Source of Truth**: Data is extracted strictly from the codebase (`data/portfolio-data.ts`), eliminating external JSON tampering and security vulnerabilities.
- **1-Click Instant Download**:
  - **Rotary Dial (Hover)**: Hovering over any candidate's avatar immediately shows their name, role, and a 1-click **"Download PPT"** button.
  - **Profile Showcase (CenterStage)**: The active candidate card features a prominent **"Download PPT"** button in the header bar.
  - **Slide Preview Studio**: Accessible via "PPT Studio" in the top navigation bar for full 16:9 slide previews across all candidates.

---

## 2. Official PPT Slide Format Specification

The generated slide strictly adheres to the corporate executive format:

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ Name : <Candidate Name>                                                              │
├────────────────────────────────┬─────────────────────────────────────────────────────┤
│  [ Avatar Circle ]             │  [ Professional Experience ]                        │
│                                │  Bio summary paragraph detailing years of hands-on │
│  DESIGNATION: <Role>           │  experience, integration scope, and delivery.       │
│  Phone: <Phone / yet to be>    │                                                     │
│  EMAIL: <Email / yet to be>    │  Tools & Technology: <Comma-separated tools>        │
│                                ├─────────────────────────────────────────────────────┤
│  [ Qualifications ]            │  [ Key Engagements ]                                │
│  - Degree, College (Year)      │  • Worked as <Role> on <Project>, designed and      │
│                                │    developed end-to-end integration solutions...    │
│  [ Certificate ]               │                                                     │
│  • Certification 1             │  • Worked as <Role> on <Project 2>, handled complex │
│  • Certification 2             │    mappings, UAT, and post-production support...    │
│                                │                                                     │
│  [ Skill Set ]                 │                                                     │
│  • Skill 1                     │                                                     │
│  • Skill 2                     │                                                     │
└────────────────────────────────┴─────────────────────────────────────────────────────┘
```

### Visual Specifications
- **Slide Canvas**: Widescreen 16:9 (`LAYOUT_WIDE`, 13.333" x 7.5").
- **Header Banners**: Solid Cyan-Azure (`#0090D6`) with bold white text.
- **Right Content Background**: Light Gray container (`#F5F6F8`).
- **Typography**: Clean Calibri / Segoe UI, crisp dark body text (`#222222`).
- **Boundaries**: Strictly bounded coordinates with zero element bleed or border overlap.

---

## 3. Architecture & Data Flow

```
               [Verified Codebase JSON]
             (data/portfolio-data.ts)
                         │
                         ▼
             [Lenient Data Normalizer]
           (lib/pptx/normalizeMemberData.ts)
                         │
                         ▼
             [Native PPTX Generator]
           (lib/pptx/nativePptxGenerator.ts)
                         │
                         ▼
            [Instant .pptx File Download]
```

---

## 4. How to Use the Feature in the Website

1. **Hover Download on Candidate Dial**:
   - In the left rotary dial, hover your mouse over any candidate avatar.
   - Click **"Download PPT"** to immediately download that candidate's presentation in the official format.
2. **Direct Download on Active Profile (`CenterStage`)**:
   - Click the **"Download PPT"** button in the candidate profile header bar.
3. **Slide Preview Studio**:
   - Click **"PPT Studio"** in the top navigation bar to preview any candidate's slide before downloading.

---

## 5. File Structure Reference

```
team-portfolio/
├── docs/
│   └── PPT_GENERATION_FEATURE.md     # Feature specification guide
├── lib/
│   └── pptx/
│       ├── types.ts                   # TypeScript interfaces
│       ├── normalizeMemberData.ts     # Lenient sanitization & fallbacks
│       └── nativePptxGenerator.ts     # Exact corporate 1-page PPT generator
└── components/
    ├── LeftMemberDial.tsx             # Hover "Download PPT" on each candidate node
    ├── CenterStage.tsx                # Card header "Download PPT" button
    ├── Header.tsx                     # Top navigation "PPT Studio" launcher
    └── PPTStudioModal.tsx             # Studio modal with live preview
```
