import dotenv from "dotenv";
dotenv.config()

import cron from 'node-cron';
export function jobs() {

  // Run every 14 minutes
  cron.schedule('*/14 * * * *', async () => {
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const response = await fetch(`${siteUrl}`, {
        method: 'GET', // or GET depending on your endpoint
      });
      console.log("^^^^^^^^^^^^^^^^^^^^^^^")
      console.log(`[Keep-Alive Cron] Ping status: ${response.status}`);
    } catch (error) {
      console.error('[Keep-Alive Cron] Failed to ping health check:', error);
    }
  });
}

