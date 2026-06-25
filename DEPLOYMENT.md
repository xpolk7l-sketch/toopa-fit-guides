# نشر موقع TOOPA — Deployment Guide

موقع TOOPA مبني على TanStack Start (SSR) ويعمل كخادم Node.js على المنفذ `3000`.
ملفات النشر الجاهزة:

- `Dockerfile` — بناء متعدد المراحل (Bun build → Node 20 runtime).
- `docker-compose.yml` — يشغّل التطبيق + Nginx كـ reverse proxy.
- `nginx/conf.d/toopa.conf` — إعدادات Nginx مع gzip و caching و security headers.
- `.env.example` — قالب متغيرات البيئة.

---

## 1) متغيرات البيئة المطلوبة

| المتغير | الوصف |
| --- | --- |
| `VITE_SUPABASE_URL` | رابط مشروع Lovable Cloud (عام) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | المفتاح العام (publishable / anon) |
| `VITE_SUPABASE_PROJECT_ID` | معرف المشروع |
| `SUPABASE_URL` | نفس الرابط (للخادم) |
| `SUPABASE_PUBLISHABLE_KEY` | نفس المفتاح العام (للخادم) |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح الخدمة — للخادم فقط، لا يُكشف للمتصفح |

انسخ `.env.example` إلى `.env` واملأ القيم.

---

## 2) التشغيل المحلي عبر Docker

```bash
cp .env.example .env
# عبّئ القيم في .env

docker compose build
docker compose up -d
docker compose logs -f
```

الموقع يفتح على: <http://localhost> (Nginx على 80) أو <http://localhost:3000> (التطبيق مباشرة).

لإيقافه:
```bash
docker compose down
```

---

## 3) النشر على Coolify

1. **أنشئ مشروع جديد** في Coolify ← **+ New Resource** ← **Application**.
2. اختر مصدر المستودع (GitHub / GitLab / Public Repo) ووجّهه إلى هذا المستودع.
3. **Build Pack:** اختر **Dockerfile** (Coolify سيكتشف `Dockerfile` تلقائياً).
4. **Port Exposes:** `3000`.
5. **Environment Variables:** أضف كل المتغيرات من الجدول أعلاه. علّم على **Build Time** لكل متغير يبدأ بـ `VITE_` (مطلوب لأن Vite يحقن قيمها وقت البناء).
6. **Domains:** أضف نطاقك (مثال: `toopa.com`) وفعّل **Generate SSL Certificate** (Let's Encrypt تلقائياً عبر Traefik المدمج في Coolify).
7. **Health Check Path:** `/` ، Port: `3000`.
8. اضغط **Deploy**. عند انتهاء البناء يصبح الموقع متاحاً على نطاقك مع HTTPS.

> ملاحظة: Coolify يدير reverse proxy و SSL تلقائياً، لذا **لا تحتاج خدمة Nginx** عند النشر على Coolify — استخدم `Dockerfile` فقط (تجاهل `docker-compose.yml` و `nginx/`).

### تحديثات لاحقة
- Push إلى الفرع المربوط → Coolify يعيد البناء تلقائياً (إن فعّلت Auto Deploy / webhook).
- أو اضغط **Redeploy** يدوياً.

---

## 4) النشر على Ubuntu VPS (يدوياً)

تم اختباره على Ubuntu 22.04 / 24.04.

### 4.1 تجهيز السيرفر

```bash
# اتصل بالسيرفر
ssh root@YOUR_SERVER_IP

# حدّث النظام
apt update && apt upgrade -y

# ثبّت Docker + Compose plugin
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin git ufw

# جدار حماية
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

### 4.2 جلب الكود والتشغيل

```bash
mkdir -p /opt/toopa && cd /opt/toopa
git clone <YOUR_REPO_URL> .

cp .env.example .env
nano .env   # عبّئ القيم

docker compose build
docker compose up -d
```

تحقق من الحالة:
```bash
docker compose ps
docker compose logs -f toopa
curl -I http://localhost
```

### 4.3 ربط النطاق

وجّه DNS (سجل A) من نطاقك إلى IP السيرفر، ثم انتظر الانتشار.

### 4.4 تفعيل HTTPS عبر Certbot (مستحسن)

نُوقف حاوية nginx مؤقتاً ونستبدل إعدادها بإعداد يدعم Let's Encrypt:

```bash
apt install -y certbot

# أوقف nginx الحاوية مؤقتاً لتحرير المنفذ 80
docker compose stop nginx

certbot certonly --standalone -d toopa.com -d www.toopa.com \
  --agree-tos -m admin@toopa.com --non-interactive

# اربط شهادات Let's Encrypt داخل حاوية nginx
```

أضف في `docker-compose.yml` تحت خدمة `nginx`:
```yaml
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
```

ثم أضف ملف `nginx/conf.d/toopa-ssl.conf`:
```nginx
server {
    listen 443 ssl http2;
    server_name toopa.com www.toopa.com;

    ssl_certificate     /etc/letsencrypt/live/toopa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/toopa.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://toopa:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}

server {
    listen 80;
    server_name toopa.com www.toopa.com;
    return 301 https://$host$request_uri;
}
```

ثم:
```bash
docker compose up -d
```

تجديد تلقائي للشهادات:
```bash
echo "0 3 * * * certbot renew --pre-hook 'docker compose -f /opt/toopa/docker-compose.yml stop nginx' --post-hook 'docker compose -f /opt/toopa/docker-compose.yml start nginx'" | crontab -
```

### 4.5 التحديثات

```bash
cd /opt/toopa
git pull
docker compose build
docker compose up -d
docker image prune -f
```

---

## 5) استكشاف الأخطاء

| المشكلة | الحل |
| --- | --- |
| `502 Bad Gateway` من Nginx | `docker compose logs toopa` — تحقق من بدء الخادم على `0.0.0.0:3000` |
| متغيرات `VITE_*` فارغة بعد البناء | لا بد من تمريرها **وقت البناء** (Coolify: علّم Build Time؛ docker compose: موجودة في البيئة قبل `build`) |
| رفع الإيصال يفشل | تأكد من `client_max_body_size 25m` في Nginx ومن صلاحيات bucket `receipts` في Lovable Cloud |
| رسالة `Expected 3 parts in JWT` | تستخدم مفتاح خدمة (sb_secret_) في قراءة Data API — استخدم `SUPABASE_PUBLISHABLE_KEY` بدلاً منه |

---

تم بحمد الله ✨
