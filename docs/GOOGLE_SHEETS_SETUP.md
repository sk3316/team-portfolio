# Google Sheets Dynamic Data Source & PPT Generation Guide

This guide explains how to connect your **Google Sheet** as the single source of truth for your team portfolio. Once connected, whenever anyone in your team edits their row in the shared Google Sheet, both the **website frontend** and the **generated PowerPoint presentations (.pptx)** automatically update on Vercel without touching code or redeploying!

---

## 🚀 3-Step Quick Setup

### Step 1: Download the Starter CSV Template
You don't need to create the spreadsheet columns manually. We provide a pre-populated CSV template with all 20 existing team members and all columns:
- **Direct Download in App**: Click the **"Sheets Sync"** button in the top navigation bar, then click **"Download Starter CSV Template"**.
- **Or via Browser URL**: Navigate to `http://localhost:3000/api/export-template` (or `https://your-vercel-domain.com/api/export-template`) to download `CX_Studio_Team_Template.csv`.

---

### Step 2: Create & Share Your Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Click **File > Import > Upload** and choose `CX_Studio_Team_Template.csv`.
3. Choose **"Replace current sheet"** and click **Import Data**.
4. Name your sheet (e.g. `CX Studio - Team Profiles`).
5. Click **Share** (top right) and set General Access to **"Anyone with the link can view"**.
   *(Alternatively: Click **File > Share > Publish to web**, select **CSV**, and click Publish).*
6. Share this sheet link with your team members so everyone can edit and update their profile details!

---

### Step 3: Connect to Vercel or Local Environment

#### A. For Local Development (`.env.local`)
Copy your Google Sheet URL from your browser address bar:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                      (Sheet ID)
```

Create or edit `.env.local` in your project root:
```bash
# Option 1: Just provide the Sheet ID:
GOOGLE_SHEET_ID="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"

# OR Option 2: Provide the full Google Sheets URL:
# GOOGLE_SHEET_URL="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
```

#### B. For Production on Vercel
1. Go to your **Vercel Project Dashboard**.
2. Navigate to **Settings > Environment Variables**.
3. Add a new variable:
   - **Key**: `GOOGLE_SHEET_ID`
   - **Value**: Your Google Sheet ID
   - **Environments**: Production, Preview, Development
4. Click **Save** and trigger a quick redeploy.

---

## 📊 Spreadsheet Columns Reference

| Column | Description | Example |
| :--- | :--- | :--- |
| `id` | Unique identifier | `m-1` or `arjun-mehta` |
| `name` | Consultant Full Name | `Arjun Mehta` |
| `role` | Job Designation / Title | `SAP CRM & Service Lead` |
| `subTeamIds` | Assigned discipline(s) | `crm, functional` |
| `email` | Corporate email address | `arjun.mehta@cxstudio.io` |
| `phone` | Phone number | `+91 98450 11201` |
| `avatarUrl` | Headshot image URL (Direct URL, Google Drive share link, or `=IMAGE(...)`) | `https://drive.google.com/file/d/...` or `https://...` |
| `bio` | Bio / Executive Summary | `Leads CRM and S/4HANA Service functional streams...` |
| `skills` | Comma-separated skills | `SAP CRM 7.0, S/4HANA Service, BRF+, Web UI` |
| `qualifications` | Pipe `\|` separated degrees | `B.Tech, Computer Science - IIT Madras \| MBA - IIM Bangalore` |
| `certifications` | Pipe `\|` separated certs | `SAP Certified Application Associate \| S/4HANA Service 1909` |
| `badges` | Comma-separated badge logos (`SAP, AWS, Salesforce, Azure, MuleSoft, GCP, Kubernetes, Docker, TOGAF`). If omitted, badges are automatically inferred from the member's certifications! | `SAP, AWS, Salesforce` |
| `project1_title` | Featured Project 1 Headline | `Intelligent Service Ticket Routing` |
| `project1_category` | Solution Category | `Service Automation` |
| `project1_description`| Project scope and metrics | `Rule-based auto-triage engine using BRF+ and SAP Business Workflow...` |
| `project1_technologies`| Technologies used | `BRF+, SAP Business Workflow, Web UI, ABAP OO` |
| `project2_title` | Featured Project 2 Headline | `Field Service Mobility Rollout` |
| `project2_category` | Category | `Mobility & FSM` |
| `project2_description`| Project 2 scope | `Integrated SAP FSM with S/4HANA Service...` |
| `project2_technologies`| Tech used | `SAP FSM, OData, S/4HANA, BTP` |
| `project3_title` | Featured Project 3 Headline (Optional) | `Real-time Customer Data Platform` |
| `project3_category` | Project 3 Category | `Data & AI` |
| `project3_description`| Project 3 scope | `Configured real-time SAP CDP ingestion pipelines...` |
| `project3_technologies`| Project 3 technologies | `SAP CDP, Event Mesh, BTP, Kafka` |
| `project4_title` | Featured Project 4 Headline (Optional) | `Enterprise B2B Headless Commerce` |
| `project4_category` | Project 4 Category | `Commerce Cloud` |
| `project4_description`| Project 4 scope | `Architected headless Spartacus storefront...` |
| `project4_technologies`| Project 4 technologies | `Spartacus, Angular, OCC REST, Hybris` |
| `linkedin` | LinkedIn Profile URL | `https://linkedin.com/in/...` |

---

## 🌟 Adding New Teams & New Projects

### 1. Creating a New Team / Discipline
To add a new team, you do **not** need to touch the code!
Simply enter the new team ID in the `subTeamIds` column for any member (e.g. `ai`, `genai`, `security`, `devops`).
The system automatically:
- Discovers the new team.
- Adds it to the rotary wheel on the right side.
- Allows filtering members by that new team.

### 2. Adding Project 3, Project 4, etc.
In your Google Sheet, you can add `project3_title`, `project3_category`, `project3_description`, `project3_technologies` (and up to `project6_*`).
- **On the Website**: All featured projects appear dynamically in the interactive project card grid on the member's profile.
- **In PowerPoint (.pptx)**: The PPT generator automatically adjusts vertical layout heights and typography to fit 1, 2, 3, or 4 projects cleanly on the corporate 1-page slide without text overflow.

### 3. Adding Pictures / Profile Photos (Google Drive or Web URLs)
Why can't you directly copy-paste an image (Ctrl+V) into a Google Sheet cell?
> Google Sheets' automated CSV / GViz data feed is **text-only**. When an image is pasted directly into a cell, Google Sheets strips binary image pixels and exports the cell as empty text `""`.

**The 3 Easy Ways to Add Pictures:**
1. **Google Drive Link (Recommended & Easiest for Teams)**:
   - Upload any photo or logo to your Google Drive.
   - Right-click the file > **Share** > set General Access to **"Anyone with the link can view"** > click **Copy link**.
   - Paste that link directly into the `avatarUrl` column (e.g. `https://drive.google.com/file/d/1XyZ.../view?usp=sharing`).
   - *Our system automatically converts it to high-speed Google CDN streams (`lh3.googleusercontent.com/d/ID`) so it renders immediately in the UI and PPT!*
2. **Direct Web Image URL**:
   - Right-click any photo online (LinkedIn, GitHub avatar, company directory) > **Copy image address**.
   - Paste the URL directly into the `avatarUrl` column.
3. **`=IMAGE("https://...")` Formula**:
   - You can also write the standard Google Sheets formula `=IMAGE("https://...")` inside the cell; our parser extracts and displays the image automatically.

---

## 🔄 How Caching & Instant Sync Work

- **Automatic Vercel Edge Caching**: Next.js automatically caches the spreadsheet data using Incremental Static Regeneration (`revalidate = 60`). When team members edit cells, Vercel updates the live site within ~60 seconds.
- **Manual "Sync Now" Button**: Clicking the **"Sheets Sync"** button in the header opens the sync manager modal. Clicking **"Sync Now"** immediately bypasses the cache and pulls the latest spreadsheet edits on demand.
- **Zero-Downtime Fallback**: If Google Sheets is temporarily unreachable or misconfigured, the application automatically falls back to the verified codebase data in `data/portfolio-data.ts`. The website never crashes or shows a blank screen.
- **Direct PPT Integration**: Clicking **"Download PPT"** on any member card or in the **PPT Studio** immediately uses the updated bio, projects, certifications, and skills from the Google Sheet to generate the corporate 1-page `.pptx` presentation.
