This is the the Developer Manual for the 377 Project: Cat Wisdom. This document is intended for future developers who will take over this codebase. It explains how to install, run, and maintain the application.

Installation Guide

    What you need:

        Node.js v18+

        Git

        Vercel account (for deployment)

        Supabase account (for database)

    1. Clone the repository:

        git clone https://github.com/elizabethpoon/377-Project.git
        cd 377-Project

    2. Install dependencies:

        npm install

        This installs @supabase/supabase-js, which is used in the /api backend route.

    3. Set up environment variables:

        Create a .env file at the root:

        SUPABASE_URL=https://your-project-id.supabase.co
        SUPABASE_KEY=your-anon-key

        On Vercel, set these in the Environment Variables section.

Running the Application

    Frontend:

        simply open index.html in a browser.

    Backend:

        API routes are implemented as Vercel serverless functions inside /api. These are automatically deployed when pushed to GitHub and linked to Vercel.
API Reference

    Base URL (on Vercel): https://your-site-name.vercel.app/api/favorites

    GET /api/favorites
    Returns an array of all saved cat facts
    Example response:
    [
        { "id": 1, "fact": "Cats sleep 70% of their lives" }
    ]

    POST /api/favorites
    Saves a new fact to Supabase
    Body:
    {
        "fact": "Cats have five toes on their front paws"
    }
    Returns saved record or error

    DELETE /api/favorites
    Deletes a fact by id
    Body:
    {
        "id": 1
    }

    PATCH is not currently used but could be implemented to edit facts.

Known Issues

    No duplicate checking: same fact can be saved multiple times.

    No authentication: all facts are public and deletable.

    Responsive layout works but could be improved on very small screens.

Future Roadmap

    Add PATCH endpoint for editing saved facts

    Add search/filter by keyword

    Add user authentication so each user has their own saved list

    Add trivia quiz scoring and leaderboard

    Write automated tests (unit and integration)

