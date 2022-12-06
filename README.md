# reboot-if-gpu-free

```bash
npm i -g reboot-if-gpu-free
reboot-if-gpu-free
```

## Run script everyday to avoid machine hangup

```bash
sudo vi
```

Run every 8:00AM:

```crontab
00 8 * * * reboot-if-gpu-free
```
