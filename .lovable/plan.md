# Plan: Fix empty content in inquiry emails

## Problem
Inquiry emails arrive at studiothumbcrafter@gmail.com, but the message body is empty — the visitor's name, email, and project details don't show.

## Cause
The form sends fields named `name`, `email`, `details`, `requirements`, and the template body references `{{name}}`, `{{email}}`, `{{details}}`, `{{requirements}}` — which look matched. When a matched setup still sends empty content, the usual culprits are: the template's **Content** box (not the Settings tab) missing the variables, variables pasted with different spelling/spacing (e.g. `{{ name }}` with extra spaces works, but `{{Name}}` or `{{user_name}}` does not), or the template saved to a different tab than the one being tested.

## Steps
1. Update the EmailJS template yourself (dashboard, template `template_90ecp2b`):
   - Open **Email Templates → your template → Content** (the big text box, not Settings).
   - Make sure it contains exactly:
     ```
     Name: {{name}}
     Email: {{email}}
     Video details: {{details}}
     Requirements: {{requirements}}
     ```
   - Also set the **Subject** to something like: `New inquiry from {{name}}`
   - Save the template.
2. On my side, make the form data more robust so the email is useful even if a variable is missed:
   - Add a hidden `message` field to the form that combines all inquiry details into one block, since `{{message}}` is EmailJS's most standard variable — so you can rely on a single `{{message}}` line in the template too.
   - Keep the four individual fields as they are.
3. Retest the full flow in the preview: submit a test inquiry and confirm the email arrives with all content visible.

## Notes
- No new keys or services needed — the connection already works.
- If the email is still empty after step 1, I'll switch the form to send a single combined `message` field only, which is the most reliable EmailJS setup.
