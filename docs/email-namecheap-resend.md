# Email on Namecheap + Vercel + Resend

Your **website** is on Vercel. Your **domain DNS** stays in Namecheap. **Resend** only sends mail (contact form, password reset). **Namecheap Email Forwarding** receives mail sent to `contact@kiduspetros.com` and forwards it to Gmail.

These can work together. Forwarding usually breaks when Resend setup changes Namecheap **Mail Settings** away from **Email Forwarding**.

## Fix inbound forwarding (contact@ → Gmail)

### 1. Restore Namecheap Email Forwarding MX

1. [Namecheap](https://www.namecheap.com/) → **Domain List** → **Manage** `kiduspetros.com`
2. **Advanced DNS**
3. **Mail Settings** dropdown → select **Email Forwarding** (not Custom MX, not Gmail)
4. **Save all changes** — Namecheap will restore its MX records automatically

### 2. Confirm the forwarder exists

1. Same domain → **Domain** tab (not Advanced DNS)
2. **Redirect Email** → **Add Forwarder** (if missing)
   - **Alias:** `contact`
   - **Forward to:** `yosefabay03@gmail.com`
3. Save

### 3. Do not enable Resend Inbound on the root domain

In Resend → Domains → `kiduspetros.com`:

- **Receiving / Inbound** must be **OFF** for the root domain, or it will compete with Namecheap MX and steal incoming mail.

## Keep Resend for sending (app emails)

Resend records belong in **Host Records**, not by replacing **Mail Settings**.

### Safe Resend DNS (root domain)

In Namecheap **Advanced DNS** → **Host Records**, you should have (from Resend dashboard):

| Type | Host | Purpose |
|------|------|---------|
| TXT | `resend._domainkey` | DKIM (sending) |
| TXT | `send` | SPF for bounce path on `send` subdomain |
| MX | `send` | Bounce/return path only (`feedback-smtp.*.amazonses.com`) |

**Do not** add an MX record on `@` (root) for Resend if you use Namecheap forwarding.

### SPF: one TXT record on `@`

You can only have **one** SPF TXT record on the root host `@`.

Namecheap forwarding needs:

```text
v=spf1 include:spf.efwd.registrar-servers.com ~all
```

If Resend asks for root SPF, **merge** (do not replace):

```text
v=spf1 include:spf.efwd.registrar-servers.com include:amazonses.com ~all
```

Never delete Namecheap’s forwarding SPF unless you have merged the above.

## Website DNS (Vercel) — unchanged

In **Host Records**, keep Vercel records (examples):

| Type | Host | Value |
|------|------|-------|
| A | `@` | Vercel IP (or use ALIAS if shown) |
| CNAME | `www` | `cname.vercel-dns.com` |

Email (MX) and the website (A/CNAME) are separate; Vercel does not host your inbox.

## Render env vars (backend)

| Variable | Value |
|----------|--------|
| `RESEND_API_KEY` | From Resend |
| `EMAIL_FROM` | `Kidus Petros <contact@kiduspetros.com>` |
| `CONTACT_NOTIFICATION_EMAIL` | `yosefabay03@gmail.com` |
| `FRONTEND_URL` | `https://kiduspetros.com` |

Contact form: saved in admin **Messages** + email to `CONTACT_NOTIFICATION_EMAIL`.

## Test

1. **Forwarding:** From another address (not `yosefabay03@gmail.com`), email `contact@kiduspetros.com` → should arrive in Gmail.
2. **Contact form:** Submit on the site → message in admin + email to `yosefabay03@gmail.com`.

DNS can take up to a few hours; usually minutes.

## If forwarding still fails

- Nameservers must be Namecheap (**BasicDNS** / **PremiumDNS**), not only Vercel nameservers. If the domain uses Vercel nameservers, configure forwarding in Vercel DNS or move MX back to Namecheap.
- In Advanced DNS, ensure no extra `@` MX records point to Amazon/Resend/Google.
- Resend domain → disable **Receiving** on root domain.
