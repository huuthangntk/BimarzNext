# 🚀 Aptabase Self-Hosted Deployment Guide

Complete guide for deploying Aptabase at **https://aptbase.sume.one**

---

## 📋 Prerequisites Checklist

- ✅ Domain configured: `aptbase.sume.one`
- ✅ SMTP tested and working (mail.privateemail.com)
- ✅ Docker and Docker Compose installed
- ⏳ SSL certificate (Let's Encrypt recommended)
- ⏳ Reverse proxy (Nginx/Caddy recommended)

---

## 🔧 Step 1: Prepare Environment Variables

### 1.1 Copy the environment template

```bash
# In your Aptabase deployment directory
cp aptabase-env-template.txt .env
```

### 1.2 Verify your `.env` file contains:

```bash
# Core
BASE_URL=https://aptbase.sume.one
AUTH_SECRET=3qN53pPN3/3kZ1mkvtOWwWVTiFOBdz8i1WQpx0O8gPc=

# Database (PostgreSQL) - URI format
DATABASE_URL=postgresql://aptabase:sTr0NGp4ssw0rd@aptabase_db:5432/aptabase

# Analytics (ClickHouse) - HTTP URI format
CLICKHOUSE_URL=http://aptabase:sTr0NGp4ssw0rd@aptabase_events_db:8123

# SMTP (✅ Tested & Working)
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_USERNAME=hi@sume.one
SMTP_PASSWORD=M@nKHARAM5589
SMTP_FROM_ADDRESS=hi@sume.one

# OAuth (Optional - leave empty for now)
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=
```

---

## 🐳 Step 2: Deploy with Docker Compose

### 2.1 Use the improved docker-compose.yml

Replace your current `docker-compose.yml` with `docker-compose-improved.yml`:

```bash
mv docker-compose.yml docker-compose-old.yml.backup
mv docker-compose-improved.yml docker-compose.yml
```

### 2.2 Start the services

```bash
# Pull latest images
docker-compose pull

# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f
```

### 2.3 Verify services are running

```bash
# Check all containers
docker-compose ps

# Should see 3 services running:
# - aptabase_postgres (PostgreSQL)
# - aptabase_clickhouse (ClickHouse)
# - aptabase_app (Aptabase)
```

---

## 🌐 Step 3: Configure Reverse Proxy (HTTPS)

### Option A: Using Caddy (Recommended - Auto SSL)

Create `Caddyfile`:

```caddy
aptbase.sume.one {
    reverse_proxy localhost:3000
    
    encode gzip
    
    log {
        output file /var/log/caddy/aptbase.log
    }
}
```

Start Caddy:
```bash
caddy run --config Caddyfile
```

### Option B: Using Nginx with Certbot

Create `/etc/nginx/sites-available/aptbase`:

```nginx
server {
    listen 80;
    server_name aptbase.sume.one;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and get SSL:
```bash
sudo ln -s /etc/nginx/sites-available/aptbase /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d aptbase.sume.one
```

---

## ✅ Step 4: Verify Deployment

### 4.1 Check health endpoints

```bash
# Check Aptabase health
curl http://localhost:3000/health

# Check PostgreSQL
docker-compose exec aptabase_db pg_isready -U aptabase

# Check ClickHouse
curl http://localhost:8123/ping
```

### 4.2 Access the application

1. Open browser: **https://aptbase.sume.one**
2. You should see the Aptabase login/registration page
3. Create your admin account

---

## 🔐 Step 5: Configure OAuth (Optional)

### 5.1 GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App:
   - **Homepage URL**: `https://aptbase.sume.one`
   - **Callback URL**: `https://aptbase.sume.one/auth/github/callback`
3. Copy Client ID and Secret to `.env`:
   ```bash
   OAUTH_GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxx
   OAUTH_GITHUB_CLIENT_SECRET=ghp_xxxxxxxxxxxx
   ```

### 5.2 Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client:
   - **Authorized JavaScript origins**: `https://aptbase.sume.one`
   - **Authorized redirect URIs**: `https://aptbase.sume.one/auth/google/callback`
3. Copy Client ID and Secret to `.env`:
   ```bash
   OAUTH_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
   OAUTH_GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
   ```

### 5.3 Restart to apply OAuth changes

```bash
docker-compose restart aptabase
```

---

## 🔒 Step 6: Security Hardening

### 6.1 Change default passwords

**IMPORTANT**: Update the default database passwords!

Edit `.env`:
```bash
# Generate strong passwords
POSTGRES_PASSWORD=$(openssl rand -base64 32)
CLICKHOUSE_PASSWORD=$(openssl rand -base64 32)

# Update connection strings accordingly (URI format)
DATABASE_URL=postgresql://aptabase:NEW_POSTGRES_PASSWORD@aptabase_db:5432/aptabase
CLICKHOUSE_URL=http://aptabase:NEW_CLICKHOUSE_PASSWORD@aptabase_events_db:8123
```

Recreate containers:
```bash
docker-compose down -v  # ⚠️ This will delete data!
docker-compose up -d
```

### 6.2 Firewall configuration

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable

# Block direct access to Aptabase port
sudo ufw deny 3000/tcp
```

### 6.3 Regular backups

Create backup script `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backup/aptabase"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup PostgreSQL
docker-compose exec -T aptabase_db pg_dump -U aptabase aptabase > "$BACKUP_DIR/postgres_$DATE.sql"

# Backup ClickHouse
docker-compose exec -T aptabase_events_db clickhouse-client --query="BACKUP DATABASE default TO Disk('backups', 'clickhouse_$DATE')"

echo "Backup completed: $DATE"
```

Schedule with cron:
```bash
# Daily backups at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## 📊 Step 7: Monitoring

### 7.1 View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f aptabase
docker-compose logs -f aptabase_db
docker-compose logs -f aptabase_events_db
```

### 7.2 Monitor resource usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

---

## 🐛 Troubleshooting

### Issue: Aptabase won't start

**Check logs:**
```bash
docker-compose logs aptabase
```

**Common causes:**
- Database not ready → Wait for healthchecks to pass
- Wrong DATABASE_URL format → Verify connection string
- Missing AUTH_SECRET → Check .env file

### Issue: Can't connect to database

**Test connections:**
```bash
# PostgreSQL
docker-compose exec aptabase_db psql -U aptabase -d aptabase -c "SELECT 1;"

# ClickHouse
docker-compose exec aptabase_events_db clickhouse-client --query="SELECT 1"
```

### Issue: SMTP emails not sending

**Test SMTP:**
```bash
# Use the test script we created earlier
# It already verified your SMTP works!
```

**Check Aptabase logs for email errors:**
```bash
docker-compose logs aptabase | grep -i smtp
```

### Issue: OAuth not working

**Verify callback URLs:**
- GitHub: `https://aptbase.sume.one/auth/github/callback`
- Google: `https://aptbase.sume.one/auth/google/callback`

**Check environment variables loaded:**
```bash
docker-compose exec aptabase env | grep OAUTH
```

---

## 📝 Configuration Summary

### ✅ Completed:
- [x] Domain configured (aptbase.sume.one)
- [x] SMTP tested and working
- [x] Environment variables prepared
- [x] Docker Compose configuration ready

### ⏳ Next Steps:
- [ ] Deploy Docker containers
- [ ] Configure reverse proxy with SSL
- [ ] Create admin account
- [ ] Optional: Configure OAuth providers
- [ ] Optional: Change default passwords
- [ ] Optional: Set up backups

---

## 🆘 Support Resources

- **Aptabase Docs**: https://aptabase.com/docs
- **GitHub Issues**: https://github.com/aptabase/aptabase/issues
- **Docker Docs**: https://docs.docker.com/

---

## 📞 Your Configuration Details

- **Domain**: https://aptbase.sume.one
- **SMTP Provider**: PrivateEmail (mail.privateemail.com)
- **From Email**: hi@sume.one
- **Database**: PostgreSQL 15 + ClickHouse 23.8
- **Container Runtime**: Docker Compose

---

**🎉 Good luck with your deployment!**

After deployment, you can start tracking analytics from your applications using the Aptabase SDKs.

