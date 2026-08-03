import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import cors from 'cors';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// Initialize Stripe only if the key exists, but allow server to boot without it for UI testing
let stripe: Stripe | null = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16' as any, // use appropriate API version
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing for our API routes
  app.use(express.json());
  app.use(cors());

  // API Routes
  app.post('/api/create-checkout-session', async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured on the server.' });
    }

    try {
      const { amount, description } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: description || 'DCP Repair Service Deposit',
              },
              unit_amount: amount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/?success=true`,
        cancel_url: `${req.protocol}://${req.get('host')}/?canceled=true`,
      });

      res.json({ id: session.id });
    } catch (error: any) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/repair-intake', async (req, res) => {
    try {
      const { name, email, company, serviceInterest, message, dataSecureGuarantee } = req.body;
      
      const githubToken = process.env.GITHUB_TOKEN;
      const githubRepo = process.env.GITHUB_REPO; // e.g. "username/repo"

      let githubIssueUrl = null;

      if (githubToken && githubRepo) {
        const issueTitle = `Repair Request: ${company || name} - ${serviceInterest}`;
        const issueBody = `
## Repair Intake Request

**Name:** ${name}
**Email:** ${email}
**Organization:** ${company || 'N/A'}
**Service Interest:** ${serviceInterest}
**Data Secure Guarantee Requested:** ${dataSecureGuarantee ? 'Yes' : 'No'}

### Device Symptoms / Repair Brief:
${message}
        `;

        const githubRes = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
            labels: ['repair-intake', serviceInterest],
          }),
        });

        if (githubRes.ok) {
          const githubData = await githubRes.json();
          githubIssueUrl = githubData.html_url;
        } else {
          console.error('Failed to create GitHub issue:', await githubRes.text());
        }
      }

      res.json({ 
        success: true, 
        message: 'Repair intake received successfully.',
        githubIssueUrl 
      });
    } catch (error: any) {
      console.error('Intake error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/repair-status/:issueNumber', async (req, res) => {
    try {
      const { issueNumber } = req.params;
      const githubToken = process.env.GITHUB_TOKEN;
      const githubRepo = process.env.GITHUB_REPO;

      if (!githubToken || !githubRepo) {
        return res.status(503).json({ error: 'GitHub integration not configured on server.' });
      }

      const response = await fetch(`https://api.github.com/repos/${githubRepo}/issues/${issueNumber}`, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) return res.status(404).json({ error: 'Ticket not found.' });
        throw new Error('Failed to fetch ticket from GitHub.');
      }

      const data = await response.json();
      res.json({
        title: data.title,
        state: data.state,
        created_at: data.created_at,
        updated_at: data.updated_at,
        labels: data.labels.map((l: any) => l.name),
        html_url: data.html_url
      });
    } catch (error: any) {
      console.error('Status fetch error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Important: Use * for express v4 to catch all non-API routes and serve index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
