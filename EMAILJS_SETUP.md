# EmailJS Setup Guide

This portfolio website uses EmailJS to handle contact form submissions without requiring a backend server.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio website contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** in the API Keys section

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

2. Replace the placeholder values with your actual IDs

## Step 6: Test the Contact Form

1. Start your development server: `npm start`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the test message

## Security Notes

- Never commit your `.env` file to version control
- For production deployments, set environment variables in your hosting platform:
  - **Vercel**: Project Settings → Environment Variables
  - **Netlify**: Site Settings → Environment Variables

## Troubleshooting

### Common Issues:

1. **Form not sending**: Check browser console for errors
2. **Template variables not working**: Ensure variable names match exactly
3. **CORS errors**: Make sure your domain is added to EmailJS allowed origins

### Error Messages:

- `Invalid service ID`: Double-check your service ID
- `Template not found`: Verify your template ID
- `Forbidden`: Check your public key and allowed origins

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 1 email service
- 1 email template

For higher volume, consider upgrading to a paid plan.

## Support

If you encounter issues:
1. Check the [EmailJS Documentation](https://www.emailjs.com/docs/)
2. Visit their [Support Center](https://www.emailjs.com/support/)
3. Check this project's GitHub issues
