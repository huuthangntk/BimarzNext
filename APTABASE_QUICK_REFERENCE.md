# 🚀 Aptabase Deployment - Quick Reference

## 📦 Files Created

1. **aptabase-env-template.txt** - Complete environment variables (rename to `.env`)
2. **docker-compose-improved.yml** - Improved Docker Compose config (rename to `docker-compose.yml`)
3. **APTABASE_DEPLOYMENT_GUIDE.md** - Complete deployment guide

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Setup Environment
```bash
# Copy and rename environment file
cp aptabase-env-template.txt .env

# Copy improved docker-compose
cp docker-compose-improved.yml docker-compose.yml
```

### 2️⃣ Start Services
```bash
docker-compose up -d
docker-compose logs -f
```

### 3️⃣ Configure SSL (Choose one)

**Caddy (Easiest):**
```bash
echo "aptbase.sume.one { reverse_proxy localhost:3000 }" > Caddyfile
caddy run --config Caddyfile
```

**Nginx:**
```bash
sudo certbot --nginx -d aptbase.sume.one
```

---

## 🔑 Your Credentials

### Database Connection Strings (URI Format)
```
PostgreSQL:
  DATABASE_URL=postgresql://aptabase:sTr0NGp4ssw0rd@aptabase_db:5432/aptabase

ClickHouse:
  CLICKHOUSE_URL=http://aptabase:sTr0NGp4ssw0rd@aptabase_events_db:8123
```

### SMTP (✅ Tested & Working)
```
Host: mail.privateemail.com
Port: 587
Username: hi@sume.one
Password: M@nKHARAM5589
From: hi@sume.one
```

### URLs
```
Application: https://aptbase.sume.one
Local Access: http://localhost:3000

GitHub OAuth Callback: https://aptbase.sume.one/auth/github/callback
Google OAuth Callback: https://aptbase.sume.one/auth/google/callback
```

---

## 🛠️ Useful Commands

### Docker Management
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart aptabase

# Check service status
docker-compose ps

# Update images
docker-compose pull
docker-compose up -d
```

### Database Access
```bash
# PostgreSQL
docker-compose exec aptabase_db psql -U aptabase -d aptabase

# ClickHouse
docker-compose exec aptabase_events_db clickhouse-client
```

### Backups
```bash
# PostgreSQL backup
docker-compose exec -T aptabase_db pg_dump -U aptabase aptabase > backup_$(date +%Y%m%d).sql

# Restore PostgreSQL
docker-compose exec -T aptabase_db psql -U aptabase -d aptabase < backup_20240118.sql
```

### Debugging
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' aptabase_app

# View container resource usage
docker stats

# Check environment variables
docker-compose exec aptabase env

# Test SMTP connection
docker-compose logs aptabase | grep -i smtp
```

---

## 🔐 OAuth Setup (Optional)

### GitHub OAuth
1. Go to: https://github.com/settings/developers
2. Create OAuth App
3. Homepage: `https://aptbase.sume.one`
4. Callback: `https://aptbase.sume.one/auth/github/callback`
5. Add to `.env`:
   ```bash
   OAUTH_GITHUB_CLIENT_ID=your_client_id
   OAUTH_GITHUB_CLIENT_SECRET=your_client_secret
   ```

### Google OAuth
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client
3. Authorized Origins: `https://aptbase.sume.one`
4. Callback: `https://aptbase.sume.one/auth/google/callback`
5. Add to `.env`:
   ```bash
   OAUTH_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   OAUTH_GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret
   ```

**Restart after adding OAuth:**
```bash
docker-compose restart aptabase
```

---

## ⚠️ Security Reminders

### Before Production:

1. **Change Default Passwords**
   ```bash
   # Generate new passwords
   openssl rand -base64 32
   
   # Update in .env (URI format):
   DATABASE_URL=postgresql://aptabase:NEW_PASSWORD@aptabase_db:5432/aptabase
   CLICKHOUSE_URL=http://aptabase:NEW_PASSWORD@aptabase_events_db:8123
   ```

2. **Secure `.env` file**
   ```bash
   chmod 600 .env
   ```

3. **Enable Firewall**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw deny 3000/tcp
   sudo ufw enable
   ```

4. **Set up Automated Backups**
   - Schedule daily database backups
   - Store backups off-server
   - Test restore procedure

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't access https://aptbase.sume.one | Check reverse proxy, SSL cert, DNS |
| Aptabase won't start | Check logs: `docker-compose logs aptabase` |
| Database connection error | Verify DATABASE_URL in .env, check db health |
| SMTP not working | We already tested it works! Check logs |
| OAuth not working | Verify callback URLs match exactly |
| High memory usage | ClickHouse is memory-intensive, increase RAM |
| Slow queries | Check ClickHouse performance, may need tuning |

---

## 📊 Health Checks

```bash
# All services healthy?
docker-compose ps

# Aptabase responding?
curl http://localhost:3000/health

# PostgreSQL ready?
docker-compose exec aptabase_db pg_isready -U aptabase

# ClickHouse responding?
curl http://localhost:8123/ping
```

---

## 📁 File Structure

```
your-deployment-dir/
├── .env                          # Environment variables (from aptabase-env-template.txt)
├── docker-compose.yml            # Docker config (from docker-compose-improved.yml)
├── Caddyfile (optional)          # Caddy reverse proxy config
├── backup.sh (optional)          # Backup script
└── backups/                      # Backup storage directory
    ├── postgres_20240118.sql
    └── clickhouse_20240118/
```

---

## ✅ Deployment Checklist

- [ ] Copy `aptabase-env-template.txt` to `.env`
- [ ] Copy `docker-compose-improved.yml` to `docker-compose.yml`
- [ ] Run `docker-compose up -d`
- [ ] Configure reverse proxy (Caddy or Nginx)
- [ ] Set up SSL certificate
- [ ] Access https://aptbase.sume.one
- [ ] Create admin account
- [ ] (Optional) Configure GitHub OAuth
- [ ] (Optional) Configure Google OAuth
- [ ] (Optional) Change default passwords
- [ ] (Optional) Set up backups
- [ ] (Optional) Configure monitoring

---

## 🎯 Next Steps After Deployment

1. **Create Admin Account** - First user becomes admin
2. **Create Your First App** - Get your App Key
3. **Install SDK** - In your application
4. **Start Tracking** - Send events from your app
5. **View Analytics** - Check your dashboard

---

## 📞 Support

- **Aptabase Docs**: https://aptabase.com/docs
- **GitHub**: https://github.com/aptabase/aptabase
- **Community**: https://github.com/aptabase/aptabase/discussions

---

**Last Updated**: 2025-01-18  
**Deployment**: https://aptbase.sume.one  
**Status**: SMTP ✅ Tested | OAuth ⏳ Pending | Deployment ⏳ Ready

